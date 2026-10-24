import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

// Public base URL of the site, without a trailing slash (set SITE_URL in the environment)
export function siteUrl(): string {
  return (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");
}

export function localizedPath(locale: string, path: string): string {
  return `/${locale}${path === "/" ? "" : path}`;
}

export function absoluteUrl(locale: string, path: string): string {
  return `${siteUrl()}${localizedPath(locale, path)}`;
}

// Canonical URL plus hreflang alternates for the languages a page really exists in
export function alternatesFor(
  locale: string,
  path: string,
  availableLocales: readonly string[] = routing.locales,
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const l of availableLocales) languages[l] = absoluteUrl(l, path);
  if (availableLocales.includes(routing.defaultLocale)) languages["x-default"] = absoluteUrl(routing.defaultLocale, path);
  return { canonical: absoluteUrl(locale, path), languages };
}

// Safe JSON for a <script type="application/ld+json"> tag (prevents closing the tag from inside the data)
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const SITE_NAME = "Hedefly";

// A page that sets its own openGraph replaces the inherited one completely, so include everything here
export function openGraphFor(
  locale: string,
  path: string,
  fields: { title?: string; description?: string; type?: "website" | "article" } = {},
): NonNullable<Metadata["openGraph"]> {
  return {
    type: fields.type ?? "website",
    siteName: SITE_NAME,
    locale,
    url: absoluteUrl(locale, path),
    title: fields.title,
    description: fields.description,
    images: [{ url: absoluteUrl(locale, "/opengraph-image"), width: 1200, height: 630 }],
  };
}
