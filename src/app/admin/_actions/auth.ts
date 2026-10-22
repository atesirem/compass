"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { clientIp, isLoginBlocked, LOGIN_WINDOW_MINUTES, MAX_EMAIL_LENGTH, recordLoginAttempt } from "@/lib/login-limit";
import { createSession, destroySession } from "@/lib/session";

// A fixed hash so a missing user costs the same time as a wrong password
const DUMMY_HASH = "$2b$12$C6UzMDM.H6dfI/f/IKcEeO5G1m9Y3ZyPz0m7H4Qx2p1r8vJ4wqkQa";

export async function loginAction(_prev: { error?: string; email?: string } | undefined, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  // Oversized input never reaches the database or bcrypt
  if (email.length > MAX_EMAIL_LENGTH || password.length > 200) return { error: "Invalid email or password", email: email.slice(0, 80) };

  const ip = await clientIp();
  if (await isLoginBlocked(email, ip)) {
    return { error: `Too many failed attempts. Try again in ${LOGIN_WINDOW_MINUTES} minutes.`, email };
  }

  const user = await db.user.findUnique({ where: { email } });
  const ok = await bcrypt.compare(password, user?.passwordHash ?? DUMMY_HASH);

  if (!user || !ok || (user.role !== "ADMIN" && user.role !== "EDITOR")) {
    await recordLoginAttempt(email, ip, false);
    return { error: "Invalid email or password", email };
  }

  await recordLoginAttempt(email, ip, true);
  await createSession({ userId: user.id, role: user.role });
  redirect("/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}
