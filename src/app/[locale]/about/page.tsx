import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { alternatesFor, openGraphFor } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return {
    title: t("title"),
    description: t("intro"),
    alternates: alternatesFor(locale, "/about"),
    openGraph: openGraphFor(locale, "/about", { title: t("title"), description: t("intro") }),
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  const verify = t.raw("verify") as string[];
  const h2 = "mt-10 text-2xl font-bold tracking-tight";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
      <p className="mt-3 text-lg leading-relaxed text-fg-muted">{t("intro")}</p>

      <h2 className={h2}>{t("h1")}</h2>
      <p className="mt-3 leading-relaxed">{t("p1")}</p>

      <h2 className={h2}>{t("h2")}</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
        {verify.map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul>

      <h2 className={h2}>{t("h3")}</h2>
      <p className="mt-3 leading-relaxed">{t("p3")}</p>
      <h2 className={h2}>{t("h4")}</h2>
      <p className="mt-3 leading-relaxed">{t("p4")}</p>
      <h2 className={h2}>{t("h5")}</h2>
      <p className="mt-3 leading-relaxed">{t("p5")}</p>

      <section className="mt-10 rounded-[20px] border border-line bg-surface p-6">
        <h2 className="text-xl font-bold">{t("corrections")}</h2>
        <p className="mt-2 text-fg-muted">{t("correctionsText")}</p>
        <Link href="/contact" className="mt-4 inline-flex min-h-11 items-center rounded-full bg-cta px-6 font-semibold text-on-cta hover:bg-cta-hover">
          {t("contactLink")}
        </Link>
      </section>
    </div>
  );
}
