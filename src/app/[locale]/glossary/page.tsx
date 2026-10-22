import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getGlossary, pickTranslation, termAnchor } from "@/lib/content";
import { alternatesFor } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[locale]/glossary">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Glossary" });
  return { title: t("title"), description: t("intro"), alternates: alternatesFor(locale, "/glossary") };
}

export default async function GlossaryPage({ params, searchParams }: PageProps<"/[locale]/glossary">) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  const raw = query.q;
  const q = (Array.isArray(raw) ? raw[0] : raw)?.trim().slice(0, 100) ?? "";
  const t = await getTranslations({ locale, namespace: "Glossary" });

  const all = await getGlossary();
  const rows = all
    .map((term) => ({ term, meaning: pickTranslation(term.translations, locale).translation?.meaning ?? "" }))
    .filter(({ term, meaning }) => !q || term.german.toLowerCase().includes(q.toLowerCase()) || meaning.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 text-lg text-fg-muted">{t("intro")}</p>

      <form role="search" className="mt-6 flex gap-3">
        <label htmlFor="gq" className="sr-only">
          {t("placeholder")}
        </label>
        <input
          id="gq"
          name="q"
          type="search"
          defaultValue={q}
          placeholder={t("placeholder")}
          className="min-h-12 min-w-0 flex-1 rounded-full border border-line bg-surface px-5 text-base"
        />
        <button className="min-h-12 rounded-full bg-brand px-6 font-semibold text-on-brand transition hover:bg-brand-2">OK</button>
      </form>

      <p className="mt-6 text-sm text-fg-muted">{t("count", { count: rows.length })}</p>
      {rows.length === 0 ? (
        <p className="mt-4">{t("empty")}</p>
      ) : (
        <dl className="mt-3 divide-y divide-line rounded-2xl border border-line bg-surface">
          {rows.map(({ term, meaning }) => (
            <div key={term.id} id={termAnchor(term.german)} className="scroll-mt-24 px-5 py-4 target:bg-page">
              <dt className="text-lg font-bold">{term.german}</dt>
              <dd className="mt-1 leading-relaxed text-fg-muted">{meaning}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
