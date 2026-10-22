import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

// Second header row: main sections. Scrolls sideways on narrow screens instead of wrapping.
export async function SiteNav({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "Nav" });
  const links = [
    { href: "/#modules", label: t("guides") },
    { href: "/roadmap", label: t("roadmap") },
    { href: "/timeline", label: t("timeline") },
    { href: "/glossary", label: t("glossary") },
    { href: "/search", label: t("search") },
  ];

  return (
    <nav aria-label={t("menu")} className="border-t border-brand-2">
      <ul className="mx-auto flex w-full max-w-6xl gap-1 overflow-x-auto px-2 sm:px-4">
        {links.map((l) => (
          <li key={l.href} className="shrink-0">
            <Link
              href={l.href}
              className="flex min-h-11 items-center rounded-full px-4 text-sm font-semibold text-on-brand-muted transition hover:bg-brand-2 hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
