import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { alternatesFor } from "@/lib/seo";
import { getTimelineGuides, pickTranslation, STAGES } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[locale]/timeline">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Timeline" });
  return { title: t("title"), description: t("intro"), alternates: alternatesFor(locale, "/timeline") };
}

export default async function TimelinePage({ params }: PageProps<"/[locale]/timeline">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Timeline" });
  const guides = await getTimelineGuides();

  const groups = [
    ...STAGES.map((stage) => ({ id: stage, label: t(`stages.${stage}`), items: guides.filter((g) => g.stage === stage) })),
    { id: "OTHER", label: t("other"), items: guides.filter((g) => !g.stage) },
  ].filter((group) => group.id !== "OTHER" || group.items.length > 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 max-w-2xl text-lg text-fg-muted">{t("intro")}</p>

      <ol className="mt-10 space-y-10 border-l-2 border-line pl-6">
        {groups.map((group) => (
          <li key={group.id} id={group.id.toLowerCase()} className="relative scroll-mt-24">
            <span aria-hidden="true" className="absolute -left-[35px] top-1.5 size-4 rounded-full border-4 border-page bg-cta" />
            <h2 className="text-2xl font-bold tracking-tight">{group.label}</h2>
            {group.items.length === 0 ? (
              <p className="mt-2 text-fg-muted">{t("empty")}</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {group.items.map((g) => {
                  const { translation } = pickTranslation(g.translations, locale);
                  return (
                    <li key={g.id}>
                      <Link
                        href={`/guides/${g.slug}`}
                        className="block rounded-2xl border border-line bg-surface px-5 py-4 transition hover:border-fg"
                      >
                        <span className="font-bold">{translation?.title}</span>
                        <span className="block text-sm text-fg-muted">{translation?.summary}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
