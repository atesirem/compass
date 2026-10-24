import { previewDrafts } from "@/lib/preview";
import type { Metadata, Viewport } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";
import { InstallButton } from "@/components/InstallButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { CompassMark } from "@/components/Logo";
import { SiteNav } from "@/components/SiteNav";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/seo";
import { getNonce } from "@/lib/nonce";
import { THEME_SCRIPT } from "@/lib/theme-script";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin", "latin-ext"], variable: "--font-space-grotesk" });

export const viewport: Viewport = {
  themeColor: "#0a2a33",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Site" });
  return {
    title: { default: t("name"), template: `%s | ${t("name")}` },
    description: t("tagline"),
    metadataBase: new URL(siteUrl()),
    applicationName: t("name"),
    openGraph: { siteName: t("name"), type: "website", locale },
    appleWebApp: { capable: true, title: t("name"), statusBarStyle: "black-translucent" },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale });
  // Client components in the layout only need the navigation texts; pages add what else they use
  const messages = await getMessages();
  const nonce = await getNonce();

  return (
    <html lang={locale} className={spaceGrotesk.variable} suppressHydrationWarning>
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-dvh flex-col bg-page font-sans text-fg antialiased">
        <NextIntlClientProvider messages={{ Nav: messages.Nav }}>
          {previewDrafts() && (
            <p className="bg-amber-300 px-4 py-2 text-center text-sm font-semibold text-black print:hidden">
              Önizleme modu: taslak rehberler ve yazılar da görünüyor. Bu sayfa henüz yayında değil.
            </p>
          )}
          <header className="bg-brand text-on-brand print:hidden">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
              <Link href="/" className="flex items-center gap-3 text-2xl font-bold tracking-tight">
                <CompassMark />
                {t("Site.name")}
              </Link>
              <div className="flex items-center gap-1 sm:gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
            <SiteNav locale={locale} />
          </header>

          <main className="flex-1">{children}</main>

          <footer className="bg-brand text-on-brand-muted print:hidden">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl space-y-4">
                <p className="text-sm leading-relaxed">{t("Disclaimer")}</p>
                <nav aria-label={t("Footer.legalNav")} className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-on-brand">
                  <Link href="/impressum" className="hover:underline">{t("Footer.imprint")}</Link>
                  <Link href="/datenschutz" className="hover:underline">{t("Footer.privacy")}</Link>
                  <Link href="/haftungsausschluss" className="hover:underline">{t("Footer.disclaimer")}</Link>
                </nav>
                <nav aria-label={t("Footer.moreNav")} className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-on-brand">
                  <Link href="/about" className="hover:underline">{t("Footer.about")}</Link>
                  <Link href="/links" className="hover:underline">{t("Footer.links")}</Link>
                  <Link href="/contact" className="hover:underline">{t("Footer.contact")}</Link>
                </nav>
              </div>
              <InstallButton />
            </div>
          </footer>
        </NextIntlClientProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
