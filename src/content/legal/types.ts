import type { Locale } from "@/i18n/routing";
import type { Operator } from "./operator";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type LegalDoc = {
  title: string;
  intro?: string;
  sections: LegalSection[];
};

// One builder per language; German is the binding version
export type LegalDocBuilders = Record<Locale, (o: Operator) => LegalDoc>;
