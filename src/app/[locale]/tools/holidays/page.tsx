import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { HolidayPlanner } from "@/components/HolidayPlanner";
import { db } from "@/lib/db";
import { visibleStatus } from "@/lib/preview";
import { alternatesFor, openGraphFor } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[locale]/tools/holidays">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Holidays" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: alternatesFor(locale, "/tools/holidays"),
    openGraph: openGraphFor(locale, "/tools/holidays", { title: t("title"), description: t("intro") }),
  };
}

export default async function Page({ params }: PageProps<"/[locale]/tools/holidays">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Holidays" });
  const messages = await getMessages();
  const guide = await db.guide.findFirst({ where: { slug: "public-holidays-germany", status: visibleStatus() }, select: { id: true } });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mb-8 mt-3 max-w-2xl text-lg text-fg-muted">{t("intro")}</p>
      <NextIntlClientProvider messages={{ Holidays: messages.Holidays, Nav: messages.Nav } as never}>
        <HolidayPlanner showGuideLink={Boolean(guide)} />
      </NextIntlClientProvider>
    </div>
  );
}
