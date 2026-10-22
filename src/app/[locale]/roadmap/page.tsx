import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { RoadmapApp } from "@/components/RoadmapApp";
import { db } from "@/lib/db";
import { alternatesFor, openGraphFor } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[locale]/roadmap">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Roadmap" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: alternatesFor(locale, "/roadmap"),
    openGraph: openGraphFor(locale, "/roadmap", { title: t("title"), description: t("intro") }),
  };
}

export default async function RoadmapPage({ params }: PageProps<"/[locale]/roadmap">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Roadmap" });
  const messages = await getMessages();

  // Links to guides appear only for guides that are published
  const published = await db.guide.findMany({ where: { status: "PUBLISHED" }, select: { slug: true } });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mb-8 mt-3 text-lg text-fg-muted print:hidden">{t("intro")}</p>
      {/* The roadmap component is the only client code that needs the long task texts */}
      <NextIntlClientProvider messages={{ Nav: messages.Nav, Roadmap: messages.Roadmap, Timeline: { stages: (messages.Timeline as { stages: unknown }).stages } } as never}>
        <RoadmapApp publishedGuides={published.map((g) => g.slug)} />
      </NextIntlClientProvider>
    </div>
  );
}
