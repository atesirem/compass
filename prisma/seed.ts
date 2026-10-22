import { PrismaClient, TimelineStage } from "@prisma/client";

const db = new PrismaClient();

type Tr = { title: string; summary: string };

const modules: { slug: string; icon: string; tr: Tr; de: Tr; en: Tr }[] = [
  {
    slug: "pre-arrival",
    icon: "✈️",
    tr: { title: "Giriş & Vize Süreçleri", summary: "Mavi Kart, çalışma vizesi, Fırsat Kartı, aile birleşimi, Kindergeld ve Kita." },
    de: { title: "Einreise & Visum", summary: "Blaue Karte, Arbeitsvisum, Chancenkarte, Familiennachzug, Kindergeld und Kita." },
    en: { title: "Arrival & Visas", summary: "Blue Card, work visa, Opportunity Card, family reunion, Kindergeld and Kita." },
  },
  {
    slug: "health-insurance",
    icon: "🏥",
    tr: { title: "Sağlık & Sigorta", summary: "Yasal ve özel sigorta, aile hekimi, Doctolib ve sigorta piramidi." },
    de: { title: "Gesundheit & Versicherung", summary: "Gesetzliche und private Versicherung, Hausarzt, Doctolib und die Versicherungspyramide." },
    en: { title: "Health & Insurance", summary: "Public and private insurance, family doctor, Doctolib and the insurance pyramid." },
  },
  {
    slug: "language-exams",
    icon: "🏫",
    tr: { title: "Dil, Kurslar & Sınavlar", summary: "Integrationskurs, %50 iade, DTZ ve Leben in Deutschland testi." },
    de: { title: "Sprache, Kurse & Prüfungen", summary: "Integrationskurs, 50 % Erstattung, DTZ und Leben-in-Deutschland-Test." },
    en: { title: "Language, Courses & Exams", summary: "Integration course, 50% refund, DTZ and the Life in Germany test." },
  },
  {
    slug: "first-six-months",
    icon: "🏠",
    tr: { title: "İlk 6 Ay & Günlük Yaşam", summary: "Anmeldung, vergi numarası, banka, ev bulma, SCHUFA, ehliyet ve ulaşım." },
    de: { title: "Die ersten 6 Monate & Alltag", summary: "Anmeldung, Steuer-ID, Bank, Wohnungssuche, SCHUFA, Führerschein und Mobilität." },
    en: { title: "First 6 Months & Daily Life", summary: "Registration, tax ID, bank, housing, SCHUFA, driving licence and transport." },
  },
  {
    slug: "residence-citizenship",
    icon: "📜",
    tr: { title: "Süresiz Oturum & Vatandaşlık", summary: "Niederlassungserlaubnis ve Einbürgerung süreçleri." },
    de: { title: "Niederlassungserlaubnis & Einbürgerung", summary: "Wege zur Niederlassungserlaubnis und zur Einbürgerung." },
    en: { title: "Permanent Residence & Citizenship", summary: "Paths to permanent residence and naturalisation." },
  },
];

async function main() {
  for (const [index, m] of modules.entries()) {
    await db.module.upsert({
      where: { slug: m.slug },
      update: {},
      create: {
        slug: m.slug,
        icon: m.icon,
        position: index,
        translations: {
          create: (["tr", "de", "en"] as const).map((locale) => ({ locale, ...m[locale] })),
        },
      },
    });
  }

  const firstSixMonths = await db.module.findUniqueOrThrow({ where: { slug: "first-six-months" } });

  // Sample guide so the site renders end to end; content still needs verification
  await db.guide.upsert({
    where: { slug: "anmeldung" },
    update: {},
    create: {
      slug: "anmeldung",
      moduleId: firstSixMonths.id,
      status: "PUBLISHED",
      stage: TimelineStage.FIRST_WEEK,
      sourceUrls: ["https://www.make-it-in-germany.com/en/living-in-germany/arrival/registration"],
      translations: {
        create: [
          {
            locale: "tr",
            title: "Anmeldung (İkametgah Kaydı)",
            summary: "Almanya'da taşındığın adresi resmi olarak kaydettirme adımları.",
            bodyMarkdown:
              "## Nedir?\nAnmeldung, yeni adresini Bürgeramt'a bildirmendir. Birçok işlem (banka, oturum izni, vergi no) bu kayda dayanır.\n\n## Ne zaman?\nTaşındıktan sonra genellikle **14 gün** içinde yapılır.\n\n## Gerekenler\n- Pasaport / kimlik\n- Ev sahibinden **Wohnungsgeberbestätigung** belgesi\n- Randevu (çoğu şehirde online alınır)\n\n## Sonuç\nKayıt belgen (**Meldebescheinigung**) verilir ve Steuer-ID birkaç hafta içinde postayla gelir.",
          },
          {
            locale: "en",
            title: "Anmeldung (Address Registration)",
            summary: "How to officially register the address you moved to in Germany.",
            bodyMarkdown:
              "## What is it?\nAnmeldung means registering your new address at the Bürgeramt. Many other steps (bank, residence permit, tax ID) depend on it.\n\n## When?\nUsually within **14 days** after moving in.\n\n## What you need\n- Passport / ID\n- **Wohnungsgeberbestätigung** from your landlord\n- An appointment (bookable online in most cities)\n\n## Result\nYou receive your registration certificate (**Meldebescheinigung**) and your tax ID arrives by post within a few weeks.",
          },
          {
            locale: "de",
            title: "Anmeldung (Wohnsitzanmeldung)",
            summary: "So meldest du deinen neuen Wohnsitz in Deutschland an.",
            bodyMarkdown:
              "## Was ist das?\nDie Anmeldung ist die Meldung deines neuen Wohnsitzes beim Bürgeramt. Viele weitere Schritte (Bank, Aufenthaltstitel, Steuer-ID) bauen darauf auf.\n\n## Wann?\nIn der Regel innerhalb von **14 Tagen** nach dem Einzug.\n\n## Was du brauchst\n- Reisepass / Ausweis\n- **Wohnungsgeberbestätigung** vom Vermieter\n- Einen Termin (in den meisten Städten online buchbar)\n\n## Ergebnis\nDu erhältst die **Meldebescheinigung**, und die Steuer-ID kommt innerhalb weniger Wochen per Post.",
          },
        ],
      },
    },
  });

  // Example of a volatile fact referenced from markdown via {{setting:key}}
  await db.setting.upsert({
    where: { key: "exampleSetting" },
    update: {},
    create: { key: "exampleSetting", value: "TODO", note: "Replace with real volatile facts (e.g. blue card salary)" },
  });
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
