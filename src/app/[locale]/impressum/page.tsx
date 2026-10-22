import { LegalPage, legalMetadata } from "@/components/LegalPage";
import { imprint } from "@/content/legal/imprint";
import type { Locale } from "@/i18n/routing";

export const generateMetadata = legalMetadata(imprint, "impressum");

export default async function Page({ params }: PageProps<"/[locale]/impressum">) {
  const { locale } = await params;
  return <LegalPage builders={imprint} locale={locale as Locale} path="impressum" />;
}
