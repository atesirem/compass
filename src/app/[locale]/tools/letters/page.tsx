import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { LetterTool } from "@/components/LetterTool";
import { alternatesFor, openGraphFor } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/tools/letters">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Letters" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: alternatesFor(locale, "/tools/letters"),
    openGraph: openGraphFor(locale, "/tools/letters", { title: t("title"), description: t("intro") }),
  };
}

export default async function Page({ params }: PageProps<"/[locale]/tools/letters">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Letters" });
  const messages = await getMessages();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight print:hidden">{t("title")}</h1>
      <p className="mb-8 mt-3 max-w-2xl text-lg text-fg-muted print:hidden">{t("intro")}</p>
      <NextIntlClientProvider messages={{ Letters: messages.Letters } as never}>
        <LetterTool ids={["cancelContract", "cancelLease", "objection", "appointment"]} />
      </NextIntlClientProvider>
    </div>
  );
}
