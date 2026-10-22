import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFormatter, getTranslations } from "next-intl/server";
import { GuideBody, type GlossaryTip } from "@/components/GuideBody";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { getGlossary, getGuide, pickTranslation, termAnchor } from "@/lib/content";
import { verificationState } from "@/lib/guide-health";
import { absoluteUrl, alternatesFor, SITE_NAME, siteUrl } from "@/lib/seo";
import { resolveSettings } from "@/lib/settings";
import { routing } from "@/i18n/routing";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[locale]/guides/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) return {};
  const { translation, isFallback } = pickTranslation(guide.translations, locale);
  if (!translation) return {};

  const path = `/guides/${slug}`;
  const available = guide.translations.map((t) => t.locale);
  // A language without its own translation shows the Turkish text: point search engines to the original
  const canonicalLocale = isFallback ? routing.defaultLocale : locale;

  return {
    title: translation.title,
    description: translation.summary,
    alternates: { ...alternatesFor(canonicalLocale, path, available) },
    robots: isFallback ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      locale: canonicalLocale,
      url: absoluteUrl(canonicalLocale, path),
      title: translation.title,
      description: translation.summary,
      // The guide has its own generated image (opengraph-image.tsx in this folder)
      images: [{ url: absoluteUrl(canonicalLocale, `${path}/opengraph-image`), width: 1200, height: 630 }],
      modifiedTime: (guide.lastVerifiedAt ?? guide.updatedAt).toISOString(),
    },
  };
}

export default async function GuidePage({ params }: PageProps<"/[locale]/guides/[slug]">) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const format = await getFormatter({ locale });
  const guide = await getGuide(slug);
  if (!guide) notFound();

  const { translation, isFallback } = pickTranslation(guide.translations, locale);
  if (!translation) notFound();

  const body = await resolveSettings(translation.bodyMarkdown);

  // Bold German terms in the text that exist in the glossary become tooltips with a link
  const terms: GlossaryTip[] = (await getGlossary()).flatMap((term) => {
    const meaning = pickTranslation(term.translations, locale).translation?.meaning;
    return meaning ? [{ german: term.german, meaning, href: `/${locale}/glossary#${termAnchor(term.german)}` }] : [];
  });

  const state = verificationState(guide.lastVerifiedAt);
  const date = guide.lastVerifiedAt ? format.dateTime(guide.lastVerifiedAt, { dateStyle: "long" }) : "";
  const badge = {
    fresh: { text: t("Guide.verified", { date }), className: "bg-emerald-100 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200" },
    stale: { text: t("Guide.stale", { date }), className: "bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200" },
    never: { text: t("Guide.notVerified"), className: "bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200" },
  }[state];

  const path = `/guides/${slug}`;

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              headline: translation.title,
              description: translation.summary,
              inLanguage: isFallback ? routing.defaultLocale : locale,
              dateModified: (guide.lastVerifiedAt ?? guide.updatedAt).toISOString(),
              mainEntityOfPage: absoluteUrl(isFallback ? routing.defaultLocale : locale, path),
              publisher: { "@type": "Organization", name: t("Site.name"), url: siteUrl() },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: t("Site.name"), item: absoluteUrl(locale, "/") },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: pickTranslation(guide.module.translations, locale).translation?.title,
                  item: absoluteUrl(locale, `/modules/${guide.module.slug}`),
                },
                { "@type": "ListItem", position: 3, name: translation.title },
              ],
            },
          ],
        }}
      />
      <Link href={`/modules/${guide.module.slug}`} className="text-sm font-medium text-accent hover:underline">
        ← {t("Guide.back")}
      </Link>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">{translation.title}</h1>
      <p className="mt-3 text-lg text-fg-muted">{translation.summary}</p>

      <p className={`mt-4 flex items-start gap-2 rounded-2xl px-5 py-3 text-sm font-medium ${badge.className}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 shrink-0">
          {state === "fresh" ? <path d="M5 12l5 5 9-10" /> : <path d="M12 8v5M12 17h.01M10.3 3.9L2.4 18a2 2 0 001.7 3h15.8a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z" />}
        </svg>
        <span>{badge.text}</span>
      </p>
      {isFallback && <p className="mt-2 text-sm text-fg-muted">{t("Guide.translationMissing")}</p>}

      <div className="mt-6">
        <GuideBody markdown={body} terms={terms} />
      </div>

      {guide.sourceUrls.length > 0 && (
        <section className="mt-8">
          <h2 className="font-semibold">{t("Guide.sources")}</h2>
          <ul className="mt-2 text-sm">
            {guide.sourceUrls.map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block break-all py-2 text-accent underline">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
