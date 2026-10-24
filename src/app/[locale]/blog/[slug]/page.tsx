import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getFormatter, getTranslations } from "next-intl/server";
import { cache } from "react";
import { GuideBody } from "@/components/GuideBody";
import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/navigation";
import { db } from "@/lib/db";
import { absoluteUrl, alternatesFor, openGraphFor, siteUrl } from "@/lib/seo";
import { visibleStatus } from "@/lib/preview";

export const dynamic = "force-dynamic";

// Cached per request: generateMetadata and the page both need the same post
const getPost = cache((slug: string) => db.post.findFirst({ where: { slug, status: visibleStatus() } }));

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const path = `/blog/${slug}`;
  // A post exists in one language: the page in other languages points to the original and is not indexed
  const own = post.locale === locale;
  return {
    title: post.title,
    description: post.summary,
    alternates: alternatesFor(post.locale, path, [post.locale]),
    robots: own ? undefined : { index: false, follow: true },
    openGraph: openGraphFor(post.locale, path, { title: post.title, description: post.summary, type: "article" }),
  };
}

export default async function BlogPostPage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const format = await getFormatter({ locale });
  const post = await getPost(slug);
  if (!post) notFound();

  const guide = post.guideSlug
    ? await db.guide.findFirst({ where: { slug: post.guideSlug, status: visibleStatus() }, select: { slug: true } })
    : null;
  const path = `/blog/${slug}`;

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.summary,
          inLanguage: post.locale,
          author: { "@type": "Person", name: post.authorName },
          datePublished: post.publishedAt?.toISOString(),
          dateModified: post.updatedAt.toISOString(),
          mainEntityOfPage: absoluteUrl(post.locale, path),
          publisher: { "@type": "Organization", name: t("Site.name"), url: siteUrl() },
        }}
      />
      <Link href="/blog" className="text-sm font-medium text-accent hover:underline">
        ← {t("Blog.back")}
      </Link>
      <p className="mt-4">
        <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent">{t(`Blog.kinds.${post.kind}`)}</span>
      </p>
      <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight">{post.title}</h1>
      <p className="mt-3 text-lg text-fg-muted">{post.summary}</p>
      <p className="mt-4 text-sm text-fg-muted">
        {t("Blog.by", { author: post.authorName })}
        {post.publishedAt && <> · {t("Blog.published", { date: format.dateTime(post.publishedAt, { dateStyle: "long" }) })}</>}
      </p>

      {post.locale !== locale && (
        <p className="mt-4 rounded-2xl bg-surface px-5 py-3 text-sm text-fg-muted">
          {t("Blog.otherLanguage", { language: t(`Blog.lang.${post.locale}`) })}
        </p>
      )}
      {post.kind === "EXPERIENCE" && (
        <p className="mt-4 rounded-2xl bg-amber-100 px-5 py-3 text-sm font-medium text-amber-900 dark:bg-amber-500/20 dark:text-amber-200">
          {t("Blog.experienceNote")}
        </p>
      )}

      <div className="mt-8" lang={post.locale}>
        <GuideBody markdown={post.bodyMarkdown} />
      </div>

      {post.tags.length > 0 && (
        <section className="mt-10">
          <h2 className="text-sm font-semibold text-fg-muted">{t("Blog.tags")}</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Link href={{ pathname: "/blog", query: { tag } }} className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm font-semibold hover:border-fg">
                  #{tag}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {guide && (
        <section className="mt-8 rounded-[20px] border border-line bg-surface p-6">
          <h2 className="text-lg font-bold">{t("Blog.relatedGuide")}</h2>
          <Link href={`/guides/${guide.slug}`} className="mt-2 inline-block text-accent underline">
            {t("Blog.relatedGuideText")}
          </Link>
        </section>
      )}
    </article>
  );
}
