import type { Operator } from "./operator";
import type { LegalDoc, LegalDocBuilders, LegalSection } from "./types";

function addressLines(o: Operator): string[] {
  return [o.name, o.street, `${o.postalCodeCity}, ${o.country}`];
}

function contactLines(o: Operator, labels: { email: string; phone: string; vat: string }): string[] {
  return [
    `${labels.email}: ${o.email}`,
    ...(o.phone ? [`${labels.phone}: ${o.phone}`] : []),
    ...(o.vatId ? [`${labels.vat}: ${o.vatId}`] : []),
  ];
}

const de = (o: Operator): LegalDoc => ({
  title: "Impressum",
  sections: [
    { heading: "Angaben gemäß § 5 DDG", list: addressLines(o) },
    { heading: "Kontakt", list: contactLines(o, { email: "E-Mail", phone: "Telefon", vat: "Umsatzsteuer-ID" }) },
    {
      heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
      list: addressLines(o),
    },
    {
      heading: "Haftung für Inhalte",
      paragraphs: [
        "Die Inhalte dieser Website dienen der allgemeinen Information und werden mit Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität kann jedoch keine Gewähr übernommen werden. Die Informationen ersetzen keine Rechts-, Steuer- oder sonstige Fachberatung. Maßgeblich sind stets die Angaben der zuständigen Behörden.",
      ],
    },
    {
      heading: "Haftung für Links",
      paragraphs: [
        "Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte kein Einfluss besteht. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Bei Bekanntwerden von Rechtsverletzungen werden entsprechende Links umgehend entfernt.",
      ],
    },
    {
      heading: "Urheberrecht",
      paragraphs: [
        "Die durch den Betreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Vervielfältigung, Bearbeitung und Verbreitung bedürfen der schriftlichen Zustimmung des Betreibers.",
      ],
    },
  ],
});

const en = (o: Operator): LegalDoc => ({
  title: "Legal notice (Impressum)",
  intro:
    "This translation is provided for convenience. The German version (Impressum) is the legally binding one.",
  sections: [
    { heading: "Information pursuant to § 5 DDG", list: addressLines(o) },
    { heading: "Contact", list: contactLines(o, { email: "Email", phone: "Phone", vat: "VAT ID" }) },
    { heading: "Responsible for content pursuant to § 18 (2) MStV", list: addressLines(o) },
    {
      heading: "Liability for content",
      paragraphs: [
        "The content of this website is for general information and is prepared with care. No guarantee is given for its accuracy, completeness or timeliness. The information does not replace legal, tax or other professional advice. The statements of the competent authorities are always decisive.",
      ],
    },
    {
      heading: "Liability for links",
      paragraphs: [
        "This website contains links to external third-party websites whose content we cannot influence. The respective provider is always responsible for the content of linked pages. No legal violations were apparent when the links were created. Links will be removed promptly if violations become known.",
      ],
    },
    {
      heading: "Copyright",
      paragraphs: [
        "Content and works created by the operator on this website are subject to German copyright law. Third-party contributions are marked as such. Reproduction, editing and distribution require the operator's written consent.",
      ],
    },
  ],
});

const tr = (o: Operator): LegalDoc => ({
  title: "Yasal bildirim (Impressum)",
  intro: "Bu çeviri kolaylık içindir. Hukuken bağlayıcı olan sürüm Almanca Impressum'dur.",
  sections: [
    { heading: "DDG § 5 uyarınca bilgiler", list: addressLines(o) },
    { heading: "İletişim", list: contactLines(o, { email: "E-posta", phone: "Telefon", vat: "KDV numarası (USt-IdNr.)" }) },
    { heading: "İçerikten sorumlu kişi (MStV § 18 fıkra 2)", list: addressLines(o) },
    {
      heading: "İçerik sorumluluğu",
      paragraphs: [
        "Bu sitenin içeriği genel bilgilendirme amaçlıdır ve özenle hazırlanır. Doğruluğu, eksiksizliği ve güncelliği için garanti verilmez. Bilgiler hukuki, vergisel veya başka bir uzman danışmanlığın yerini tutmaz. Her zaman yetkili kurumların açıklamaları esastır.",
      ],
    },
    {
      heading: "Bağlantıların sorumluluğu",
      paragraphs: [
        "Bu site, içeriğine etki edemediğimiz üçüncü tarafların sitelerine bağlantılar içerir. Bağlantı verilen sayfaların içeriğinden her zaman ilgili sağlayıcı sorumludur. Bağlantı verildiği sırada hukuka aykırılık görülmemiştir. İhlal öğrenildiğinde ilgili bağlantılar derhal kaldırılır.",
      ],
    },
    {
      heading: "Telif hakkı",
      paragraphs: [
        "Site işletmecisi tarafından hazırlanan içerikler Alman telif hukukuna tabidir. Üçüncü kişilerin katkıları ayrıca belirtilir. Çoğaltma, düzenleme ve yayma işletmecinin yazılı iznini gerektirir.",
      ],
    },
  ],
});

export const imprint: LegalDocBuilders = { de, en, tr };
export type { LegalSection };
