import type { Metadata } from "next";
import { getFormatter, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { db } from "@/lib/db";
import { alternatesFor, openGraphFor } from "@/lib/seo";
import { visibleStatus } from "@/lib/preview";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[locale]/blog">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: alternatesFor(locale, "/blog"),
    openGraph: openGraphFor(locale, "/blog", { title: t("title"), description: t("intro") }),
  };
}

const KINDS = ["EXPERIENCE", "ARTICLE"] as const;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function BlogPage({ params, searchParams }: PageProps<"/[locale]/blog">) {
  const [{ locale }, query] = await Promise.all([params, searchParams]);
  const t = await getTranslations({ locale, namespace: "Blog" });
  const format = await getFormatter({ locale });

  const kind = KINDS.find((k) => k === first(query.type));
  const tag = first(query.tag)?.trim().toLowerCase().slice(0, 30) || undefined;

  const posts = await db.post.findMany({
    where: { status: visibleStatus(), ...(kind ? { kind } : {}), ...(tag ? { tags: { has: tag } } : {}) },
    orderBy: { publishedAt: "desc" },
  });
  // Posts in the reader's language first, then the others (newest first within each group)
  const sorted = [...posts].sort((a, b) => Number(b.locale === locale) - Number(a.locale === locale));

  const chip = (active: boolean) =>
    `inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-semibold transition ${
      active ? "border-brand bg-brand text-on-brand" : "border-line hover:border-fg"
    }`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 max-w-2xl text-lg text-fg-muted">{t("intro")}</p>

      <nav aria-label={t("filterLabel")} className="mt-8 flex flex-wrap gap-2">
        <Link href={tag ? { pathname: "/blog", query: { tag } } : "/blog"} className={chip(!kind)} aria-current={!kind ? "page" : undefined}>
          {t("all")}
        </Link>
        {KINDS.map((k) => (
          <Link
            key={k}
            href={{ pathname: "/blog", query: { type: k, ...(tag ? { tag } : {}) } }}
            className={chip(kind === k)}
            aria-current={kind === k ? "page" : undefined}
          >
            {t(`kinds.${k}`)}
          </Link>
        ))}
        {tag && (
          <Link href={kind ? { pathname: "/blog", query: { type: kind } } : "/blog"} className={chip(true)}>
            {t("tagFilter", { tag })} ✕<span className="sr-only"> {t("clearTag")}</span>
          </Link>
        )}
      </nav>

      {sorted.length === 0 ? (
        <p className="mt-10 rounded-2xl bg-surface px-5 py-6 text-fg-muted">{t("empty")}</p>
      ) : (
        <ul className="mt-8 space-y-5">
          {sorted.map((p) => (
            <li key={p.id}>
              <article className="rounded-[20px] border border-line bg-surface p-6 transition hover:border-fg hover:shadow-lg">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-accent/15 px-2.5 py-1 text-accent">{t(`kinds.${p.kind}`)}</span>
                  {p.locale !== locale && <span className="rounded-full bg-line px-2.5 py-1 text-fg-muted">{t(`lang.${p.locale}`)}</span>}
                </div>
                <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight">
                  <Link href={`/blog/${p.slug}`} className="hover:underline">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 text-fg-muted">{p.summary}</p>
                <p className="mt-3 text-sm text-fg-muted">
                  {t("by", { author: p.authorName })}
                  {p.publishedAt && <> · {format.dateTime(p.publishedAt, { dateStyle: "long" })}</>}
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
