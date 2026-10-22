"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("language")} className="flex gap-0.5 text-sm font-semibold">
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          aria-current={l === locale ? "true" : undefined}
          className={`flex min-h-11 min-w-11 items-center justify-center rounded-full ${
            l === locale ? "bg-brand-2 text-white" : "text-on-brand-muted hover:bg-brand-2 hover:text-white"
          }`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
