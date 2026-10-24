import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { LetterTool } from "@/components/LetterTool";
import { alternatesFor, openGraphFor } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/tools/rental-application">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Letters" });
  return {
    title: t("rentalTitle"),
    description: t("rentalIntro"),
    alternates: alternatesFor(locale, "/tools/rental-application"),
    openGraph: openGraphFor(locale, "/tools/rental-application", { title: t("rentalTitle"), description: t("rentalIntro") }),
  };
}

export default async function Page({ params }: PageProps<"/[locale]/tools/rental-application">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Letters" });
  const messages = await getMessages();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight print:hidden">{t("rentalTitle")}</h1>
      <p className="mb-8 mt-3 max-w-2xl text-lg text-fg-muted print:hidden">{t("rentalIntro")}</p>
      <NextIntlClientProvider messages={{ Letters: messages.Letters } as never}>
        <LetterTool ids={["rentalApplication"]} />
      </NextIntlClientProvider>
    </div>
  );
}
