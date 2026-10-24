import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { operator, placeholdersLeft } from "@/content/legal/operator";
import { alternatesFor, openGraphFor } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: alternatesFor(locale, "/contact"),
    openGraph: openGraphFor(locale, "/contact", { title: t("title"), description: t("intro") }),
  };
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  const tips = t.raw("tips") as string[];
  // The address comes from the same place as the Impressum; until it is filled in no mail link is shown
  const emailReady = !placeholdersLeft().includes("email");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 text-lg leading-relaxed text-fg-muted">{t("intro")}</p>

      <section className="mt-8 rounded-[20px] border border-line bg-surface p-6">
        <h2 className="text-sm font-semibold text-fg-muted">{t("emailLabel")}</h2>
        {emailReady ? (
          <a href={`mailto:${operator.email}`} className="mt-1 inline-block break-all text-2xl font-bold text-accent underline">
            {operator.email}
          </a>
        ) : (
          <p className="mt-1 text-fg-muted">{t("pending")}</p>
        )}
      </section>

      <h2 className="mt-10 text-2xl font-bold tracking-tight">{t("tipsTitle")}</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
        {tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-fg-muted">{t("privacy")}</p>
    </div>
  );
}
