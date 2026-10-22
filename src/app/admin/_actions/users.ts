"use server";

import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import type { ActionResult } from "./types";

const createSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(12, "Password must be at least 12 characters"),
  role: z.enum(["ADMIN", "EDITOR"]),
});

export async function createUserAction(_prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const parsed = createSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  try {
    await db.user.create({
      data: {
        email: parsed.data.email,
        role: parsed.data.role,
        passwordHash: await bcrypt.hash(parsed.data.password, 12),
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { error: "A user with this email already exists" };
    }
    return { error: "Could not create the user" };
  }
  revalidatePath("/admin/users");
  return { saved: true };
}

async function isLastAdmin(userId: string) {
  const admins = await db.user.findMany({ where: { role: "ADMIN" }, select: { id: true } });
  return admins.length === 1 && admins[0].id === userId;
}

export async function changeRoleAction(_prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  const me = await requireAdmin();
  const id = String(formData.get("id"));
  const role = z.enum(["ADMIN", "EDITOR"]).safeParse(formData.get("role"));
  if (!role.success) return { error: "Invalid role" };
  if (id === me.id) return { error: "You cannot change your own role" };
  if (role.data !== "ADMIN" && (await isLastAdmin(id))) return { error: "There must be at least one admin" };

  await db.user.update({ where: { id }, data: { role: role.data } });
  revalidatePath("/admin/users");
  return { saved: true };
}

export async function resetPasswordAction(_prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const password = String(formData.get("password") ?? "");
  if (password.length < 12) return { error: "Password must be at least 12 characters" };
  await db.user.update({
    where: { id: String(formData.get("id")) },
    data: { passwordHash: await bcrypt.hash(password, 12), passwordUpdatedAt: new Date() },
  });
  return { saved: true };
}

export async function deleteUserAction(_prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  const me = await requireAdmin();
  const id = String(formData.get("id"));
  if (id === me.id) return { error: "You cannot delete your own account" };
  if (await isLastAdmin(id)) return { error: "There must be at least one admin" };
  await db.user.delete({ where: { id } });
  revalidatePath("/admin/users");
  return { saved: true };
}
