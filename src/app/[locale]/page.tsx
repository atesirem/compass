import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/JsonLd";
import { CompassIllustration } from "@/components/Logo";
import { SearchForm } from "@/components/SearchForm";
import { Link } from "@/i18n/navigation";
import { getModules, pickTranslation, STAGES } from "@/lib/content";
import { alternatesFor, openGraphFor, siteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  return {
    title: { absolute: `${(await getTranslations({ locale, namespace: "Site" }))("name")}: ${t("heroTitle")}` },
    description: t("heroText"),
    alternates: alternatesFor(locale, "/"),
    openGraph: openGraphFor(locale, "/", { title: t("heroTitle"), description: t("heroText") }),
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const modules = await getModules();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: t("Site.name"),
          url: siteUrl(),
          inLanguage: locale,
          description: t("Site.tagline"),
        }}
      />
      <section className="overflow-hidden bg-brand text-on-brand">
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
          {/* Decorative compass: a faint background on small and medium screens, fully visible beside the text on large ones */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex w-[460px] max-w-none translate-x-1/3 items-center opacity-20 lg:w-[420px] lg:translate-x-0 lg:opacity-100 xl:right-6">
            <CompassIllustration />
          </div>
          <div className="relative z-10 min-w-0 lg:max-w-[calc(100%-440px)]">
            <p className="mb-5 inline-block rounded-full border border-brand-line px-4 py-2 text-sm font-medium text-brand-accent">
              {t("Home.badge")}
            </p>
            <h1 className="text-5xl font-bold leading-none tracking-tight sm:text-7xl">{t("Home.heroTitle")}</h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-on-brand-muted sm:text-xl">{t("Home.heroText")}</p>
            <div className="mt-8">
              <SearchForm locale={locale} dark />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/roadmap"
                className="inline-flex min-h-13 items-center rounded-full bg-cta px-7 text-base font-semibold text-on-cta transition hover:bg-cta-hover"
              >
                {t("Home.ctaRoadmap")}
              </Link>
              <a
                href="#modules"
                className="inline-flex min-h-13 items-center rounded-full border border-brand-line px-7 text-base font-semibold text-on-brand transition hover:bg-brand-2"
              >
                {t("Home.ctaGuides")}
              </a>
            </div>
          </div>
        </div>
      </section>

      <div id="modules" className="mx-auto max-w-6xl scroll-mt-4 px-4 sm:px-6 py-16">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">{t("Home.modulesKicker")}</p>
        <h2 className="mb-8 text-4xl font-bold tracking-tight">{t("Home.modulesTitle")}</h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, index) => {
            const { translation } = pickTranslation(m.translations, locale);
            return (
              <li key={m.id}>
                <Link
                  href={`/modules/${m.slug}`}
                  className="flex h-full flex-col gap-3 rounded-[20px] border border-line bg-surface p-7 transition hover:border-fg hover:shadow-lg"
                >
                  <span className="text-sm font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-2xl font-bold leading-tight tracking-tight">{translation?.title}</span>
                  <span className="text-base leading-relaxed text-fg-muted">{translation?.summary}</span>
                  <span className="mt-auto pt-2 text-xs text-fg-muted">
                    {t("Home.guidesCount", { count: m._count.guides })}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <h2 className="mb-2 mt-16 text-3xl font-bold tracking-tight">{t("Home.stagesTitle")}</h2>
        <p className="mb-5 text-fg-muted">{t("Home.stagesText")}</p>
        <ul className="flex flex-wrap gap-3">
          {STAGES.map((stage) => (
            <li key={stage}>
              <Link
                href={`/timeline#${stage.toLowerCase()}`}
                className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-5 text-sm font-semibold transition hover:border-fg"
              >
                {t(`Timeline.stages.${stage}`)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
