import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <Link href="/" className="mt-4 inline-block text-accent underline">
        {t("home")}
      </Link>
    </div>
  );
}
