import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { OG_SIZE, OgCard } from "@/components/OgCard";
import { getGuide, pickTranslation } from "@/lib/content";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Pusula";

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const guide = await getGuide(slug);
  const translation = guide ? pickTranslation(guide.translations, locale).translation : undefined;
  const moduleTitle = guide ? pickTranslation(guide.module.translations, locale).translation?.title : undefined;

  return new ImageResponse(
    <OgCard site={t("Site.name")} title={translation?.title ?? t("Site.name")} subtitle={translation?.summary} kicker={moduleTitle} />,
    { ...size },
  );
}
