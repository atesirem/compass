import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { db } from "@/lib/db";
import { alternatesFor, openGraphFor } from "@/lib/seo";
import { BAMF_LINKS } from "@/lib/tools";
import { visibleStatus } from "@/lib/preview";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[locale]/tools/lid">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Lid" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: alternatesFor(locale, "/tools/lid"),
    openGraph: openGraphFor(locale, "/tools/lid", { title: t("title"), description: t("intro") }),
  };
}

const LINK_KEYS = ["center", "catalog", "course"] as const;

export default async function LidPage({ params }: PageProps<"/[locale]/tools/lid">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Lid" });
  const facts = t.raw("facts") as string[];
  const tips = t.raw("tips") as string[];

  // Link to our own guides only when they are published
  const published = await db.guide.findMany({
    where: { slug: { in: ["life-in-germany-test", "integration-course"] }, status: visibleStatus() },
    select: { slug: true },
  });
  const has = (slug: string) => published.some((g) => g.slug === slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 text-lg leading-relaxed text-fg-muted">{t("intro")}</p>

      <h2 className="mb-4 mt-10 text-2xl font-bold tracking-tight">{t("linksTitle")}</h2>
      <ul className="space-y-3">
        {LINK_KEYS.map((key) => (
          <li key={key}>
            <a
              href={BAMF_LINKS[key]}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-[20px] border border-line bg-surface p-5 transition hover:border-fg hover:shadow-lg"
            >
              <span className="text-xl font-bold tracking-tight">{t(`links.${key}.title`)} ↗</span>
              <span className="mt-1 block text-fg-muted">{t(`links.${key}.text`)}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="rounded-[20px] border border-line bg-surface p-6">
          <h2 className="text-xl font-bold tracking-tight">{t("factsTitle")}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-[20px] border border-line bg-surface p-6">
          <h2 className="text-xl font-bold tracking-tight">{t("tipsTitle")}</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            {tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ol>
        </section>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {has("life-in-germany-test") && (
          <Link href="/guides/life-in-germany-test" className="inline-flex min-h-11 items-center rounded-full bg-cta px-6 font-semibold text-on-cta hover:bg-cta-hover">
            {t("guideLink")}
          </Link>
        )}
        {has("integration-course") && (
          <Link href="/guides/integration-course" className="inline-flex min-h-11 items-center rounded-full border border-line px-6 font-semibold hover:border-fg">
            {t("coursesLink")}
          </Link>
        )}
      </div>

      <p className="mt-10 rounded-2xl bg-surface px-5 py-4 text-sm leading-relaxed text-fg-muted">{t("note")}</p>
    </div>
  );
}
