import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { disclaimer } from "@/content/legal/disclaimer";
import type { Locale } from "@/i18n/routing";

export const generateMetadata = legalMetadata(disclaimer, "haftungsausschluss");

export default async function Page({ params }: PageProps<"/[locale]/haftungsausschluss">) {
  const { locale } = await params;
  return <LegalPage builders={disclaimer} locale={locale as Locale} path="haftungsausschluss" />;
}
