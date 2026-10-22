"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import type { ActionResult } from "./types";

export async function saveSettingAction(_prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const key = String(formData.get("key") ?? "").trim();
  if (!/^[A-Za-z0-9_]+$/.test(key)) return { error: "Key: letters, numbers and underscores only" };
  const value = String(formData.get("value") ?? "");
  if (!value) return { error: "Value is required" };
  const note = String(formData.get("note") ?? "").trim() || null;

  await db.setting.upsert({ where: { key }, update: { value, note }, create: { key, value, note } });
  revalidatePath("/admin", "layout");
  return { saved: true };
}

export async function deleteSettingAction(formData: FormData) {
  await requireAdmin();
  // deleteMany: a double click or an already deleted key must not end in an error page
  await db.setting.deleteMany({ where: { key: String(formData.get("key")) } });
  revalidatePath("/admin", "layout");
}
