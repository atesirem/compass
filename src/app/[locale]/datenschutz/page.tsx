import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { privacy } from "@/content/legal/privacy";
import type { Locale } from "@/i18n/routing";

export const generateMetadata = legalMetadata(privacy, "datenschutz");

export default async function Page({ params }: PageProps<"/[locale]/datenschutz">) {
  const { locale } = await params;
  return <LegalPage builders={privacy} locale={locale as Locale} path="datenschutz" />;
}
