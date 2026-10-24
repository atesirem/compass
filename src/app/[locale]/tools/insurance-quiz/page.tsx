import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { InsuranceQuiz } from "@/components/InsuranceQuiz";
import { db } from "@/lib/db";
import { visibleStatus } from "@/lib/preview";
import { alternatesFor, openGraphFor } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[locale]/tools/insurance-quiz">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Insurance" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: alternatesFor(locale, "/tools/insurance-quiz"),
    openGraph: openGraphFor(locale, "/tools/insurance-quiz", { title: t("title"), description: t("intro") }),
  };
}

export default async function Page({ params }: PageProps<"/[locale]/tools/insurance-quiz">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Insurance" });
  const messages = await getMessages();
  const guide = await db.guide.findFirst({ where: { slug: "health-insurance-basics", status: visibleStatus() }, select: { id: true } });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mb-8 mt-3 max-w-2xl text-lg text-fg-muted">{t("intro")}</p>
      <NextIntlClientProvider messages={{ Insurance: messages.Insurance, Nav: messages.Nav } as never}>
        <InsuranceQuiz showGuideLink={Boolean(guide)} />
      </NextIntlClientProvider>
    </div>
  );
}
