import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getModuleWithGuides, pickTranslation } from "@/lib/content";
import { alternatesFor, openGraphFor } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[locale]/modules/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const found = await getModuleWithGuides(slug);
  if (!found) return {};
  const { translation } = pickTranslation(found.translations, locale);
  const path = `/modules/${slug}`;
  return {
    title: translation?.title,
    description: translation?.summary,
    alternates: alternatesFor(locale, path),
    openGraph: openGraphFor(locale, path, { title: translation?.title, description: translation?.summary }),
    // A module without published guides is a thin page: keep it out of search results
    robots: found.guides.length === 0 ? { index: false, follow: true } : undefined,
  };
}

export default async function ModulePage({ params }: PageProps<"/[locale]/modules/[slug]">) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const found = await getModuleWithGuides(slug);
  if (!found) notFound();

  const { translation } = pickTranslation(found.translations, locale);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">
        {found.icon} {translation?.title}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-fg-muted">{translation?.summary}</p>

      <h2 className="mb-5 mt-10 text-2xl font-bold tracking-tight">{t("Module.guides")}</h2>
      {found.guides.length === 0 ? (
        <p className="text-fg-muted">{t("Module.empty")}</p>
      ) : (
        <ul className="space-y-3">
          {found.guides.map((g) => {
            const { translation: gt } = pickTranslation(g.translations, locale);
            return (
              <li key={g.id}>
                <Link href={`/guides/${g.slug}`} className="block rounded-[20px] border border-line bg-surface p-6 transition hover:border-fg hover:shadow-lg">
                  <div className="text-xl font-bold tracking-tight">{gt?.title}</div>
                  <p className="mt-1 text-base text-fg-muted">{gt?.summary}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
