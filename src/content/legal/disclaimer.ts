import type { LegalDocBuilders } from "./types";

export const disclaimer: LegalDocBuilders = {
  de: () => ({
    title: "Haftungsausschluss und Hinweise zur Nutzung",
    sections: [
      {
        heading: "Keine Rechts-, Steuer- oder Gesundheitsberatung",
        paragraphs: [
          "Hedefly bietet allgemeine Informationen für Menschen, die nach Deutschland kommen oder dort leben. Die Inhalte sind keine Rechtsberatung, Steuerberatung, Finanzberatung oder medizinische Beratung und ersetzen diese nicht. Für eine Beurteilung deines Einzelfalls wende dich an die zuständige Behörde, eine Beratungsstelle oder eine fachkundige Person.",
        ],
      },
      {
        heading: "Regeln ändern sich",
        paragraphs: [
          "Gesetze, Fristen, Beträge und Verfahren ändern sich häufig und unterscheiden sich je nach Bundesland und Behörde. Jeder Ratgeber nennt das Datum der letzten Prüfung und die verwendeten Quellen. Ist kein Prüfdatum angegeben, wurde der Inhalt noch nicht mit offiziellen Quellen abgeglichen. Prüfe wichtige Angaben immer bei der zuständigen Stelle.",
        ],
      },
      {
        heading: "Übersetzungen",
        paragraphs: [
          "Inhalte werden auf Türkisch, Deutsch und Englisch angeboten. Die Sprachfassungen können sich in Details unterscheiden oder zeitlich auseinanderliegen. Maßgeblich sind die deutschsprachigen Angaben der Behörden.",
        ],
      },
      {
        heading: "Externe Links",
        paragraphs: [
          "Für Inhalte externer Websites sind deren Betreiber verantwortlich. Zu Werbung oder bezahlten Empfehlungen: Aktuell gibt es keine. Sollte sich das ändern, wird es klar gekennzeichnet.",
        ],
      },
      {
        heading: "Haftung",
        paragraphs: [
          "Für Schäden, die durch die Nutzung oder Nichtnutzung der bereitgestellten Informationen entstehen, wird nur bei Vorsatz und grober Fahrlässigkeit gehaftet. Die Haftung für die Verletzung von Leben, Körper und Gesundheit sowie nach zwingenden gesetzlichen Vorschriften bleibt unberührt.",
        ],
      },
    ],
  }),
  en: () => ({
    title: "Disclaimer and notes on use",
    intro: "This translation is provided for convenience. The German version is the legally binding one.",
    sections: [
      {
        heading: "No legal, tax or medical advice",
        paragraphs: [
          "Hedefly provides general information for people who move to or live in Germany. The content is not, and does not replace, legal, tax, financial or medical advice. For an assessment of your individual case, contact the responsible authority, a counselling service or a qualified professional.",
        ],
      },
      {
        heading: "Rules change",
        paragraphs: [
          "Laws, deadlines, amounts and procedures change often and differ by federal state and authority. Every guide shows the date of its last check and the sources used. If no date is shown, the content has not yet been compared with official sources. Always confirm important details with the responsible office.",
        ],
      },
      {
        heading: "Translations",
        paragraphs: [
          "Content is offered in Turkish, German and English. The language versions can differ in details or be updated at different times. The German-language statements of the authorities are decisive.",
        ],
      },
      {
        heading: "External links",
        paragraphs: [
          "The operators of external websites are responsible for their content. There is currently no advertising or paid recommendation on this site. If that changes, it will be clearly marked.",
        ],
      },
      {
        heading: "Liability",
        paragraphs: [
          "Liability for damage arising from the use or non-use of the information provided is limited to intent and gross negligence. Liability for injury to life, body or health and liability under mandatory statutory provisions remain unaffected.",
        ],
      },
    ],
  }),
  tr: () => ({
    title: "Sorumluluk reddi ve kullanım notları",
    intro: "Bu çeviri kolaylık içindir. Hukuken bağlayıcı olan sürüm Almanca metindir.",
    sections: [
      {
        heading: "Hukuki, vergisel veya tıbbi tavsiye değildir",
        paragraphs: [
          "Hedefly, Almanya'ya gelen veya orada yaşayan kişilere genel bilgi sunar. İçerik hukuki, vergisel, mali veya tıbbi tavsiye değildir ve bunların yerine geçmez. Kendi durumunun değerlendirilmesi için yetkili kuruma, bir danışma merkezine veya uzman bir kişiye başvur.",
        ],
      },
      {
        heading: "Kurallar değişir",
        paragraphs: [
          "Yasalar, süreler, tutarlar ve prosedürler sık değişir; eyalete ve kuruma göre farklılık gösterir. Her rehber son kontrol tarihini ve kullanılan kaynakları gösterir. Tarih yoksa içerik henüz resmi kaynaklarla karşılaştırılmamıştır. Önemli bilgileri her zaman yetkili kurumdan doğrula.",
        ],
      },
      {
        heading: "Çeviriler",
        paragraphs: [
          "İçerik Türkçe, Almanca ve İngilizce sunulur. Dil sürümleri ayrıntılarda farklılaşabilir veya farklı zamanlarda güncellenebilir. Belirleyici olan, kurumların Almanca açıklamalarıdır.",
        ],
      },
      {
        heading: "Dış bağlantılar",
        paragraphs: [
          "Dış sitelerin içeriğinden onların işletmecileri sorumludur. Şu anda sitede reklam veya ücretli öneri yoktur. Bu değişirse açıkça işaretlenecektir.",
        ],
      },
      {
        heading: "Sorumluluk",
        paragraphs: [
          "Sunulan bilgilerin kullanılmasından veya kullanılmamasından doğan zararlar için yalnızca kast ve ağır ihmal halinde sorumluluk üstlenilir. Yaşam, beden ve sağlığa verilen zararlar ile zorunlu yasal hükümler saklıdır.",
        ],
      },
    ],
  }),
};
