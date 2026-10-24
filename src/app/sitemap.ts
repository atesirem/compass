import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { db } from "@/lib/db";
import { absoluteUrl } from "@/lib/seo";
import { TOOL_PATHS } from "@/lib/tools";

export const dynamic = "force-dynamic";

const STATIC_PATHS = ["/", "/roadmap", "/timeline", "/glossary", "/tools", "/blog", "/channels", ...Object.values(TOOL_PATHS), "/about", "/contact", "/links", "/impressum", "/datenschutz", "/haftungsausschluss"];

function entry(path: string, locales: readonly string[], lastModified?: Date): MetadataRoute.Sitemap {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = absoluteUrl(l, path);
  if (locales.includes(routing.defaultLocale)) languages["x-default"] = absoluteUrl(routing.defaultLocale, path);
  return locales.map((locale) => ({ url: absoluteUrl(locale, path), lastModified, alternates: { languages } }));
}

// Only published content, and each guide only in the languages it has been written in
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [guides, modules, posts] = await Promise.all([
    db.guide.findMany({ where: { status: "PUBLISHED" }, include: { translations: { select: { locale: true } } } }),
    db.module.findMany({ where: { guides: { some: { status: "PUBLISHED" } } }, include: { translations: { select: { locale: true } } } }),
    db.post.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, locale: true, updatedAt: true } }),
  ]);

  return [
    ...STATIC_PATHS.flatMap((path) => entry(path, routing.locales)),
    ...modules.flatMap((m) => entry(`/modules/${m.slug}`, routing.locales)),
    // A post exists in one language only
    ...posts.flatMap((p) => entry(`/blog/${p.slug}`, [p.locale], p.updatedAt)),
    ...guides.flatMap((g) =>
      entry(`/guides/${g.slug}`, g.translations.map((t) => t.locale), g.lastVerifiedAt ?? g.updatedAt),
    ),
  ];
}
