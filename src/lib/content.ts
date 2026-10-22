import { cache } from "react";
import { db } from "@/lib/db";
import { routing } from "@/i18n/routing";

// Pick the translation for the locale, falling back to the default locale
export function pickTranslation<T extends { locale: string }>(
  translations: T[],
  locale: string,
): { translation: T | undefined; isFallback: boolean } {
  const exact = translations.find((t) => t.locale === locale);
  if (exact) return { translation: exact, isFallback: false };
  const fallback = translations.find((t) => t.locale === routing.defaultLocale);
  return { translation: fallback, isFallback: true };
}

export function getModules() {
  return db.module.findMany({
    orderBy: { position: "asc" },
    include: {
      translations: true,
      _count: { select: { guides: { where: { status: "PUBLISHED" } } } },
    },
  });
}

export const getModuleWithGuides = cache((slug: string) => {
  return db.module.findUnique({
    where: { slug },
    include: {
      translations: true,
      guides: {
        where: { status: "PUBLISHED" },
        orderBy: { position: "asc" },
        include: { translations: true },
      },
    },
  });
});

// Cached per request: generateMetadata and the page both need the same guide
export const getGuide = cache((slug: string) => {
  return db.guide.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { translations: true, module: { include: { translations: true } } },
  });
});

export const STAGES = ["PRE_ARRIVAL", "FIRST_WEEK", "FIRST_MONTH", "FIRST_SIX_MONTHS", "LONG_TERM"] as const;
export type Stage = (typeof STAGES)[number];

// Published guides grouped by timeline stage, in module and guide order
export function getTimelineGuides() {
  return db.guide.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ module: { position: "asc" } }, { position: "asc" }],
    include: { translations: true, module: { include: { translations: true } } },
  });
}

// Published guides whose title, summary or text contains the query (any language).
// Title matches come first, then summary matches, then text matches.
export async function searchGuides(query: string) {
  // Long strings only make the scan slower; real searches are short
  const q = query.trim().slice(0, 100);
  if (q.length < 2) return [];

  const guides = await db.guide.findMany({
    where: {
      status: "PUBLISHED",
      translations: {
        some: {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { summary: { contains: q, mode: "insensitive" } },
            { bodyMarkdown: { contains: q, mode: "insensitive" } },
          ],
        },
      },
    },
    include: { translations: true, module: { include: { translations: true } } },
    take: 50,
  });

  const needle = q.toLowerCase();
  const rank = (g: (typeof guides)[number]) => {
    if (g.translations.some((t) => t.title.toLowerCase().includes(needle))) return 0;
    if (g.translations.some((t) => t.summary.toLowerCase().includes(needle))) return 1;
    return 2;
  };
  return guides.sort((a, b) => rank(a) - rank(b));
}

export function getGlossary() {
  return db.glossaryTerm.findMany({ orderBy: { german: "asc" }, include: { translations: true } });
}

// Anchor id for a glossary term, shared by the glossary page and the in-guide links
export function termAnchor(german: string): string {
  return german
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
