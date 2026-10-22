import { PrismaClient } from "@prisma/client";
import { module1Guides } from "./content/module1-guides";
import { module1Settings } from "./content/module1-settings";
import { module2Guides } from "./content/module2-guides";
import { module2Settings } from "./content/module2-settings";
import { module3Guides } from "./content/module3-guides";
import { module3Settings } from "./content/module3-settings";
import type { GuideSeed } from "./content/module1-guides";
import { module4Guides } from "./content/module4-guides";
import { module4Settings } from "./content/module4-settings";
import { module5Guides } from "./content/module5-guides";
import { module5Settings } from "./content/module5-settings";
import { module6Guides } from "./content/module6-guides";
import { module6Settings } from "./content/module6-settings";
import { contentFixes, contentPatches } from "./content/patches";
import { guideTranslations } from "./content/translations";

const db = new PrismaClient();

const modules: { slug: string; guides: GuideSeed[]; settings: { key: string; value: string; note: string }[] }[] = [
  { slug: "pre-arrival", guides: module1Guides, settings: module1Settings },
  { slug: "health-insurance", guides: module2Guides, settings: module2Settings },
  { slug: "language-exams", guides: module3Guides, settings: module3Settings },
  { slug: "first-six-months", guides: module4Guides, settings: module4Settings },
  { slug: "residence-citizenship", guides: module5Guides, settings: module5Settings },
  { slug: "turkey-specific", guides: module6Guides, settings: module6Settings },
];

// Creates missing settings and draft guides. Existing rows are never overwritten,
// so edits made in the admin panel are safe.
// Modules that are not part of the base seed (prisma/seed.ts) are created here if missing
const extraModules = [
  {
    slug: "turkey-specific",
    icon: "🇹🇷",
    position: 5,
    tr: { title: "Türkiye'den Gelenlere Özel", summary: "Apostil, yeminli tercüme, diploma denkliği ve Türkiye'de kalan aile için kurallar." },
    de: { title: "Besonderheiten für Menschen aus der Türkei", summary: "Apostille, beglaubigte Übersetzungen, Anerkennung von Abschlüssen und Regeln für Familie in der Türkei." },
    en: { title: "For People from Turkey", summary: "Apostille, sworn translations, degree recognition and rules for family staying in Turkey." },
  },
];

async function main() {
  for (const e of extraModules) {
    if (await db.module.findUnique({ where: { slug: e.slug } })) continue;
    await db.module.create({
      data: {
        slug: e.slug,
        icon: e.icon,
        position: e.position,
        translations: {
          create: [
            { locale: "tr", ...e.tr },
            { locale: "de", ...e.de },
            { locale: "en", ...e.en },
          ],
        },
      },
    });
    console.log(`Module created: ${e.slug}`);
  }

  for (const m of modules) {
    for (const s of m.settings) {
      if (!(await db.setting.findUnique({ where: { key: s.key } }))) await db.setting.create({ data: s });
    }

    const mod = await db.module.findUniqueOrThrow({ where: { slug: m.slug } });
    let created = 0;
    for (const g of m.guides) {
      const existing = await db.guide.findUnique({ where: { slug: g.slug } });
      if (existing) {
        // Only the order is synced; text and status stay as edited in the admin
        if (existing.position !== g.position) await db.guide.update({ where: { id: existing.id }, data: { position: g.position } });
        continue;
      }
      await db.guide.create({
        data: {
          slug: g.slug,
          moduleId: mod.id,
          position: g.position,
          status: "DRAFT",
          stage: g.stage,
          sourceUrls: g.sourceUrls,
          translations: { create: { locale: "tr", title: g.title, summary: g.summary, bodyMarkdown: g.body } },
        },
      });
      created += 1;
    }
    console.log(`${m.slug}: ${created} guide(s) created, ${m.guides.length - created} already existed.`);
  }

  // German and English versions: created once, flagged for a native-speaker review
  let translated = 0;
  for (const t of guideTranslations) {
    const guide = await db.guide.findUnique({ where: { slug: t.slug } });
    if (!guide) continue;
    const exists = await db.guideTranslation.findUnique({ where: { guideId_locale: { guideId: guide.id, locale: t.locale } } });
    if (exists) continue;
    await db.guideTranslation.create({
      data: { guideId: guide.id, locale: t.locale, title: t.title, summary: t.summary, bodyMarkdown: t.body, needsReview: true },
    });
    translated += 1;
  }
  console.log(`Translations created: ${translated}.`);

  let patched = 0;
  for (const patch of contentPatches) {
    const row = await db.guideTranslation.findFirst({ where: { locale: patch.locale, guide: { slug: patch.slug } } });
    if (!row || row.bodyMarkdown.includes(patch.marker)) continue;
    const at = row.bodyMarkdown.indexOf(patch.before);
    if (at === -1) {
      console.warn(`Patch skipped (anchor not found): ${patch.slug} -> ${patch.before}`);
      continue;
    }
    const body = row.bodyMarkdown.slice(0, at) + patch.section + row.bodyMarkdown.slice(at);
    await db.guideTranslation.update({ where: { id: row.id }, data: { bodyMarkdown: body } });
    patched += 1;
  }
  console.log(`Content patches applied: ${patched}.`);

  let fixed = 0;
  for (const fix of contentFixes) {
    const row = await db.guideTranslation.findFirst({ where: { locale: fix.locale, guide: { slug: fix.slug } } });
    if (!row || !row.bodyMarkdown.includes(fix.find)) continue;
    await db.guideTranslation.update({ where: { id: row.id }, data: { bodyMarkdown: row.bodyMarkdown.replace(fix.find, fix.replace) } });
    fixed += 1;
  }
  console.log(`Content fixes applied: ${fixed} of ${contentFixes.length}.`);
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
