"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { LOCALES } from "@/lib/guide-health";
import type { ActionResult } from "./types";

export async function saveTermAction(
  termId: string | null,
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();

  const german = String(formData.get("german") ?? "").trim();
  if (!german) return { error: "The German term is required" };

  const meanings = LOCALES.map((locale) => ({
    locale,
    meaning: String(formData.get(`meaning_${locale}`) ?? "").trim(),
  })).filter((m) => m.meaning);
  if (meanings.length === 0) return { error: "Add at least one meaning" };

  try {
    await db.$transaction(async (tx) => {
      const term = termId
        ? await tx.glossaryTerm.update({ where: { id: termId }, data: { german } })
        : await tx.glossaryTerm.create({ data: { german } });
      for (const m of meanings) {
        await tx.glossaryTermTranslation.upsert({
          where: { termId_locale: { termId: term.id, locale: m.locale } },
          update: m,
          create: { ...m, termId: term.id },
        });
      }
      const removed = LOCALES.filter((l) => !meanings.some((m) => m.locale === l));
      await tx.glossaryTermTranslation.deleteMany({ where: { termId: term.id, locale: { in: [...removed] } } });
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { error: "This term already exists" };
    }
    return { error: "Could not save the term" };
  }

  revalidatePath("/admin/glossary");
  return { saved: true };
}

export async function deleteTermAction(formData: FormData) {
  await requireAdmin();
  await db.glossaryTerm.deleteMany({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/glossary");
}
