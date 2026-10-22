"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireStaff } from "@/lib/auth";
import { db } from "@/lib/db";
import { LOCALES } from "@/lib/guide-health";
import { hasTodoMarkers, TODO_MARKER } from "@/lib/guide-template";
import type { ActionResult } from "./types";

const guideSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug: lowercase letters, numbers and dashes only"),
  moduleId: z.string().min(1, "Choose a module"),
  status: z.enum(["DRAFT", "REVIEW", "PUBLISHED"]),
  stage: z.enum(["", "PRE_ARRIVAL", "FIRST_WEEK", "FIRST_MONTH", "FIRST_SIX_MONTHS", "LONG_TERM"]),
  lastVerifiedAt: z.string().refine((v) => v === "" || (/^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v))), "Verified date is not a valid date"),
  sourceUrls: z.string().max(5000, "Too many source URLs"),
});

export async function saveGuideAction(
  guideId: string | null,
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireStaff();

  const parsed = guideSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const data = parsed.data;

  // Editors prepare content; only admins publish or change published guides
  if (user.role === "EDITOR") {
    if (data.status === "PUBLISHED") return { error: "Only admins can publish. Set the status to Review." };
    if (guideId) {
      const existing = await db.guide.findUnique({ where: { id: guideId }, select: { status: true } });
      if (existing?.status === "PUBLISHED") return { error: "Only admins can edit published guides." };
    }
  }

  const sourceUrls = data.sourceUrls
    .split("\n")
    .map((u) => u.trim())
    .filter(Boolean);
  if (sourceUrls.some((u) => !/^https:\/\//.test(u))) return { error: "Source URLs must start with https://" };

  // Rule from the plan: a published guide needs a source and a verified date
  if (data.status === "PUBLISHED" && (sourceUrls.length === 0 || !data.lastVerifiedAt)) {
    return { error: "Published guides need at least one source URL and a verified date" };
  }

  const translations = LOCALES.map((locale) => ({
    locale,
    title: String(formData.get(`title_${locale}`) ?? "").trim(),
    summary: String(formData.get(`summary_${locale}`) ?? "").trim(),
    bodyMarkdown: String(formData.get(`body_${locale}`) ?? ""),
    needsReview: formData.get(`review_${locale}`) === "1",
  })).filter((t) => t.title);

  if (translations.some((t) => t.title.length > 200 || t.summary.length > 500 || t.bodyMarkdown.length > 200_000)) {
    return { error: "A title, summary or text is too long" };
  }

  if (!translations.some((t) => t.locale === "tr")) {
    return { error: "Turkish title is required (it is the fallback language)" };
  }

  if (data.status === "PUBLISHED" && translations.some((t) => hasTodoMarkers(t.bodyMarkdown))) {
    return { error: `Remove every "${TODO_MARKER}" line from the text before publishing` };
  }

  const base = {
    slug: data.slug,
    moduleId: data.moduleId,
    status: data.status,
    stage: data.stage === "" ? null : data.stage,
    lastVerifiedAt: data.lastVerifiedAt ? new Date(data.lastVerifiedAt) : null,
    sourceUrls,
  };

  let savedId: string;
  try {
    savedId = await db.$transaction(async (tx) => {
      const guide = guideId
        ? await tx.guide.update({ where: { id: guideId }, data: base })
        : await tx.guide.create({ data: base });

      for (const t of translations) {
        await tx.guideTranslation.upsert({
          where: { guideId_locale: { guideId: guide.id, locale: t.locale } },
          update: t,
          create: { ...t, guideId: guide.id },
        });
      }
      // Clearing a title removes that translation
      const removed = LOCALES.filter((l) => !translations.some((t) => t.locale === l));
      await tx.guideTranslation.deleteMany({ where: { guideId: guide.id, locale: { in: [...removed] } } });
      return guide.id;
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { error: "This slug is already used by another guide" };
    }
    return { error: "Could not save the guide" };
  }

  revalidatePath("/admin", "layout");
  // redirect() throws, so it must stay outside the try block
  if (!guideId) redirect(`/admin/guides/${savedId}?created=1`);
  return { saved: true };
}

export async function deleteGuideAction(formData: FormData) {
  const user = await requireStaff();
  if (user.role !== "ADMIN") return;
  await db.guide.delete({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin", "layout");
  redirect("/admin/guides");
}
