import type { Metadata } from "next";
import { getFormatter, getTranslations } from "next-intl/server";
import { LegalDocument } from "@/components/LegalDocument";
import { LEGAL_LAST_UPDATED, operator, placeholdersLeft } from "@/content/legal/operator";
import type { LegalDocBuilders } from "@/content/legal/types";
import type { Locale } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo";

export function legalMetadata(builders: LegalDocBuilders, path: string) {
  return async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return { title: builders[locale as Locale](operator).title, alternates: alternatesFor(locale, `/${path}`), robots: { index: true, follow: true } };
  };
}

export async function LegalPage({
  builders,
  locale,
  path,
}: {
  builders: LegalDocBuilders;
  locale: Locale;
  path: string;
}) {
  const t = await getTranslations({ locale, namespace: "Legal" });
  const format = await getFormatter({ locale });
  const doc = builders[locale](operator);
  const missing = placeholdersLeft();

  return (
    <>
      {process.env.NODE_ENV !== "production" && missing.length > 0 && (
        <p role="alert" className="bg-amber-100 px-4 py-3 text-center text-sm font-medium text-amber-900">
          Dev note: fill in {missing.join(", ")} in src/content/legal/operator.ts before going live.
        </p>
      )}
      <LegalDocument
        doc={doc}
        lastUpdatedLabel={t("updated", { date: format.dateTime(new Date(LEGAL_LAST_UPDATED), { dateStyle: "long" }) })}
        germanVersion={locale === "de" ? undefined : { label: t("germanVersion"), href: `/de/${path}` }}
      />
    </>
  );
}
