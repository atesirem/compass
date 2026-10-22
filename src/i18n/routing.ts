import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "de", "en"],
  defaultLocale: "tr",
  // hreflang is emitted per page from the page metadata (src/lib/seo.ts), so the automatic Link headers are off
  alternateLinks: false,
});

export type Locale = (typeof routing.locales)[number];
