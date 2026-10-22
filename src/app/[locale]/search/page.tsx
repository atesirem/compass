import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SearchForm } from "@/components/SearchForm";
import { Link } from "@/i18n/navigation";
import { pickTranslation, searchGuides } from "@/lib/content";

export const dynamic = "force-dynamic";

// Result pages are endless variations of the same list: keep them out of the index
export const metadata: Metadata = { robots: { index: false, follow: true } };

export default async function SearchPage({ params, searchParams }: PageProps<"/[locale]/search">) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  const raw = query.q;
  const q = (Array.isArray(raw) ? raw[0] : raw)?.trim().slice(0, 100) ?? "";
  const t = await getTranslations({ locale, namespace: "Search" });
  const results = q.length >= 2 ? await searchGuides(q) : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-6 text-4xl font-bold tracking-tight">{t("title")}</h1>
      <SearchForm locale={locale} defaultValue={q} />

      <div className="mt-8" aria-live="polite">
        {q.length === 0 ? null : q.length < 2 ? (
          <p className="text-fg-muted">{t("hint")}</p>
        ) : (
          <>
            <p className="mb-4 text-sm text-fg-muted">{t("results", { count: results.length })}</p>
            {results.length === 0 ? (
              <p>{t("none")}</p>
            ) : (
              <ul className="space-y-3">
                {results.map((g) => {
                  const { translation } = pickTranslation(g.translations, locale);
                  const { translation: mod } = pickTranslation(g.module.translations, locale);
                  return (
                    <li key={g.id}>
                      <Link
                        href={`/guides/${g.slug}`}
                        className="block rounded-[20px] border border-line bg-surface p-5 transition hover:border-fg hover:shadow-lg"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wider text-accent">{mod?.title}</span>
                        <span className="mt-1 block text-xl font-bold tracking-tight">{translation?.title}</span>
                        <span className="mt-1 block text-fg-muted">{translation?.summary}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
