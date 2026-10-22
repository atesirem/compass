// A guide counts as stale when its last verification is older than this
export const STALE_AFTER_DAYS = 90;

// Guides verified before this date count as stale
export function staleCutoff(now = new Date()): Date {
  return new Date(now.getTime() - STALE_AFTER_DAYS * 86_400_000);
}

export type VerificationState = "never" | "stale" | "fresh";

export function verificationState(lastVerifiedAt: Date | null, now = new Date()): VerificationState {
  if (!lastVerifiedAt) return "never";
  const ageDays = (now.getTime() - lastVerifiedAt.getTime()) / 86_400_000;
  return ageDays > STALE_AFTER_DAYS ? "stale" : "fresh";
}

export const LOCALES = ["tr", "de", "en"] as const;
export type AppLocale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<AppLocale, string> = { tr: "Türkçe", de: "Deutsch", en: "English" };

const SETTING_PLACEHOLDER = /\{\{setting:([A-Za-z0-9_]+)\}\}/g;

// Keys of all {{setting:key}} placeholders used in a markdown text
export function findSettingKeys(markdown: string): string[] {
  return [...markdown.matchAll(SETTING_PLACEHOLDER)].map((m) => m[1]);
}

export function replaceSettingKeys(markdown: string, values: Record<string, string>): string {
  return markdown.replace(SETTING_PLACEHOLDER, (_, key: string) => values[key] ?? `[${key}?]`);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
