import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { alternatesFor, openGraphFor } from "@/lib/seo";
import { OFFICIAL_LINKS } from "@/lib/tools";

export async function generateMetadata({ params }: PageProps<"/[locale]/links">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Links" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: alternatesFor(locale, "/links"),
    openGraph: openGraphFor(locale, "/links", { title: t("title"), description: t("intro") }),
  };
}

const GROUPS = ["general", "residence", "work", "money", "law"] as const;

export default async function LinksPage({ params }: PageProps<"/[locale]/links">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Links" });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 max-w-2xl text-lg text-fg-muted">{t("intro")}</p>

      {GROUPS.map((group) => {
        const items = OFFICIAL_LINKS.filter((l) => l.group === group);
        return (
          <section key={group} className="mt-10">
            <h2 className="text-2xl font-bold tracking-tight">{t(`groups.${group}`)}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {items.map((l) => (
                <li key={l.id}>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full flex-col gap-1 rounded-[20px] border border-line bg-surface p-5 transition hover:border-fg hover:shadow-lg"
                  >
                    <span className="leading-snug">{t(`items.${l.id}`)}</span>
                    <span className="mt-auto pt-2 text-sm font-semibold text-accent">{t("open")} ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
