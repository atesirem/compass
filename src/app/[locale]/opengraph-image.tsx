import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { OG_SIZE, OgCard } from "@/components/OgCard";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Pusula";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return new ImageResponse(<OgCard site={t("Site.name")} title={t("Home.heroTitle")} subtitle={t("Home.heroText")} />, { ...size });
}
