import bcrypt from "bcryptjs";
import { E2E_ADMIN, E2E_EDITOR } from "./constants";
import { db } from "./db";

export default async function globalSetup() {
  // The tests create staff accounts with known passwords: refuse to run against anything but a local database
  const url = process.env.DATABASE_URL ?? "";
  if (!/@(localhost|127\.0\.0\.1)[:/]/.test(url) && process.env.E2E_ALLOW_REMOTE_DB !== "1") {
    throw new Error("E2E tests need a local DATABASE_URL (localhost). Refusing to run against another database.");
  }
  for (const [user, role] of [
    [E2E_ADMIN, "ADMIN"],
    [E2E_EDITOR, "EDITOR"],
  ] as const) {
    const passwordHash = await bcrypt.hash(user.password, 10);
    await db.user.upsert({ where: { email: user.email }, update: { passwordHash, role }, create: { email: user.email, passwordHash, role } });
  }
  await db.loginAttempt.deleteMany({});
  await db.$disconnect();
}
