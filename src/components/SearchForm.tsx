import { getTranslations } from "next-intl/server";

// Plain GET form (works without JavaScript)
export async function SearchForm({ locale, defaultValue = "", dark = false }: { locale: string; defaultValue?: string; dark?: boolean }) {
  const t = await getTranslations({ locale, namespace: "Search" });

  return (
    <form action={`/${locale}/search`} role="search" className="flex w-full max-w-xl flex-wrap gap-3">
      <label htmlFor="q" className="sr-only">
        {t("title")}
      </label>
      <input
        id="q"
        name="q"
        type="search"
        defaultValue={defaultValue}
        minLength={2}
        placeholder={t("placeholder")}
        className={`min-h-12 min-w-0 flex-1 rounded-full border px-5 text-base ${
          dark ? "border-brand-line bg-brand-2 text-white placeholder:text-on-brand-muted" : "border-line bg-surface text-fg"
        }`}
      />
      <button type="submit" className="min-h-12 rounded-full bg-cta px-6 text-base font-semibold text-on-cta transition hover:bg-cta-hover">
        {t("button")}
      </button>
    </form>
  );
}
