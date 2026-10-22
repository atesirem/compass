"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { LOCALES } from "@/lib/guide-health";
import type { ActionResult } from "./types";

const moduleSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug: lowercase letters, numbers and dashes only"),
  position: z.coerce.number().int().min(0).max(999),
  icon: z.string().max(8),
});

export async function saveModuleAction(
  moduleId: string | null,
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = moduleSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  const translations = LOCALES.map((locale) => ({
    locale,
    title: String(formData.get(`title_${locale}`) ?? "").trim(),
    summary: String(formData.get(`summary_${locale}`) ?? "").trim(),
  })).filter((t) => t.title);
  if (!translations.some((t) => t.locale === "tr")) return { error: "Turkish title is required" };

  const base = { slug: parsed.data.slug, position: parsed.data.position, icon: parsed.data.icon || null };

  let savedId: string;
  try {
    savedId = await db.$transaction(async (tx) => {
      const mod = moduleId
        ? await tx.module.update({ where: { id: moduleId }, data: base })
        : await tx.module.create({ data: base });
      for (const t of translations) {
        await tx.moduleTranslation.upsert({
          where: { moduleId_locale: { moduleId: mod.id, locale: t.locale } },
          update: t,
          create: { ...t, moduleId: mod.id },
        });
      }
      const removed = LOCALES.filter((l) => !translations.some((t) => t.locale === l));
      await tx.moduleTranslation.deleteMany({ where: { moduleId: mod.id, locale: { in: [...removed] } } });
      return mod.id;
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { error: "This slug is already used by another module" };
    }
    return { error: "Could not save the module" };
  }

  revalidatePath("/admin", "layout");
  if (!moduleId) redirect(`/admin/modules/${savedId}`);
  return { saved: true };
}

export async function deleteModuleAction(_prev: ActionResult | undefined, formData: FormData): Promise<ActionResult> {
  await requireAdmin();
  const id = String(formData.get("id"));
  const guideCount = await db.guide.count({ where: { moduleId: id } });
  if (guideCount > 0) return { error: `This module still has ${guideCount} guide(s). Move or delete them first.` };
  await db.module.delete({ where: { id } });
  revalidatePath("/admin", "layout");
  redirect("/admin/modules");
}
