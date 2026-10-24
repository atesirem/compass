import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { PdfMerger } from "@/components/PdfMerger";
import { alternatesFor, openGraphFor } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/tools/pdf">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pdf" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: alternatesFor(locale, "/tools/pdf"),
    openGraph: openGraphFor(locale, "/tools/pdf", { title: t("title"), description: t("intro") }),
  };
}

export default async function Page({ params }: PageProps<"/[locale]/tools/pdf">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pdf" });
  const messages = await getMessages();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mb-8 mt-3 text-lg text-fg-muted">{t("intro")}</p>
      <NextIntlClientProvider messages={{ Pdf: messages.Pdf } as never}>
        <PdfMerger fileName={t("fileName")} />
      </NextIntlClientProvider>
    </div>
  );
}
