import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { channelRel, PLATFORM_LABELS, TOPICS, type Platform, type Topic } from "@/lib/channels";
import { db } from "@/lib/db";
import { alternatesFor, openGraphFor } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[locale]/channels">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Channels" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: alternatesFor(locale, "/channels"),
    openGraph: openGraphFor(locale, "/channels", { title: t("title"), description: t("intro") }),
  };
}

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

type ChannelRow = Awaited<ReturnType<typeof db.channel.findMany>>[number];

function ChannelSection({ title, items, t }: { title: string; items: ChannelRow[]; t: Awaited<ReturnType<typeof getTranslations<"Channels">>> }) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {items.map((c) => {
          const platform = PLATFORM_LABELS[c.platform as Platform] ?? c.platform;
          return (
            <li key={c.id} className="flex flex-col rounded-[20px] border border-line bg-surface p-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="rounded-full bg-accent/15 px-2.5 py-1 text-accent">{platform}</span>
                <span className="rounded-full bg-line px-2.5 py-1 text-fg-muted">{t(`topics.${c.topic as Topic}`)}</span>
                {c.sponsored && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200">{t("ad")}</span>
                )}
              </div>
              <h3 className="mt-3 text-xl font-bold leading-tight tracking-tight">{c.name}</h3>
              {c.description && <p className="mt-2 text-fg-muted">{c.description}</p>}
              <p className="mt-2 text-xs text-fg-muted">{t("contentIn", { language: t(`languages.${c.language as "tr" | "de" | "en" | "other"}`) })}</p>
              <a
                href={c.url}
                target="_blank"
                rel={channelRel(c)}
                className="mt-4 inline-flex min-h-11 items-center self-start rounded-full bg-cta px-5 text-sm font-semibold text-on-cta hover:bg-cta-hover"
              >
                {t("visit", { platform })} ↗
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default async function ChannelsPage({ params, searchParams }: PageProps<"/[locale]/channels">) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  const t = await getTranslations({ locale, namespace: "Channels" });
  const topic = TOPICS.find((x) => x === first(query.topic));

  const channels = await db.channel.findMany({
    where: { published: true, ...(topic ? { topic } : {}) },
    orderBy: [{ position: "asc" }, { name: "asc" }],
  });
  const own = channels.filter((c) => c.kind === "OWN");
  const recommended = channels.filter((c) => c.kind !== "OWN");

  const chip = (active: boolean) =>
    `inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-semibold transition ${
      active ? "border-brand bg-brand text-on-brand" : "border-line hover:border-fg"
    }`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 max-w-2xl text-lg text-fg-muted">{t("intro")}</p>

      <nav aria-label={t("topic")} className="mt-8 flex flex-wrap gap-2">
        <Link href="/channels" className={chip(!topic)} aria-current={!topic ? "page" : undefined}>
          {t("allTopics")}
        </Link>
        {TOPICS.map((x) => (
          <Link key={x} href={{ pathname: "/channels", query: { topic: x } }} className={chip(topic === x)} aria-current={topic === x ? "page" : undefined}>
            {t(`topics.${x}`)}
          </Link>
        ))}
      </nav>

      {channels.length === 0 && <p className="mt-10 rounded-2xl bg-surface px-5 py-6 text-fg-muted">{t("empty")}</p>}
      <ChannelSection title={t("own")} items={own} t={t} />
      <ChannelSection title={t("recommended")} items={recommended} t={t} />

      <p className="mt-12 rounded-2xl bg-surface px-5 py-4 text-sm leading-relaxed text-fg-muted">{t("disclaimer")}</p>
      <p className="mt-4 text-sm">
        {t("suggest")}{" "}
        <Link href="/contact" className="text-accent underline">
          {t("suggestLink")}
        </Link>
      </p>
    </div>
  );
}
