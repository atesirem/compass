import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { alternatesFor, openGraphFor } from "@/lib/seo";
import { TOOL_PATHS, TOOLS } from "@/lib/tools";

export async function generateMetadata({ params }: PageProps<"/[locale]/tools">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tools" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: alternatesFor(locale, "/tools"),
    openGraph: openGraphFor(locale, "/tools", { title: t("title"), description: t("intro") }),
  };
}

export default async function ToolsPage({ params }: PageProps<"/[locale]/tools">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Tools" });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 max-w-2xl text-lg text-fg-muted">{t("intro")}</p>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((id) => (
          <li key={id}>
            <Link
              href={TOOL_PATHS[id]}
              className="flex h-full flex-col gap-2 rounded-[20px] border border-line bg-surface p-6 transition hover:border-fg hover:shadow-lg"
            >
              <span className="text-xl font-bold leading-tight tracking-tight">{t(`items.${id}.title`)}</span>
              <span className="text-base leading-relaxed text-fg-muted">{t(`items.${id}.text`)}</span>
              <span className="mt-auto pt-2 text-sm font-semibold text-accent">{t("open")} →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
