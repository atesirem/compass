// Writes prisma/content/final/*.md and settings-*.json into the database.
// Run: npm run content:sync   (add --dry to only report)
import { PrismaClient } from "@prisma/client";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { hasTodoMarkers } from "../src/lib/guide-template";

const DIR = join(__dirname, "../prisma/content/final");
const dry = process.argv.includes("--dry");
const db = new PrismaClient();

type Parsed = { meta: Record<string, string>; sources: string[]; body: string };

function parse(raw: string): Parsed {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(raw);
  if (!m) throw new Error("missing front matter");
  const meta: Record<string, string> = {};
  const sources: string[] = [];
  let inSources = false;
  for (const line of m[1].split("\n")) {
    if (/^sources:\s*$/.test(line)) { inSources = true; continue; }
    const item = /^\s+-\s+(\S+)\s*$/.exec(line);
    if (inSources && item) { sources.push(item[1]); continue; }
    inSources = false;
    const kv = /^([a-zA-Z]+):\s*(.*?)\s*(?:#.*)?$/.exec(line);
    if (kv) meta[kv[1]] = kv[2].replace(/^["'](.*)["']$/, "$1");
  }
  return { meta, sources, body: m[2].trim() + "\n" };
}

// Modules that only exist through this sync (the base seed does not create them)
const EXTRA_MODULES = [
  {
    slug: "everyday-life",
    icon: "🧭",
    position: 6,
    tr: { title: "Günlük Hayat ve Pratik İpuçları", summary: "Resmi tatiller, pazar sessizliği, vergi beyannamesi, Pfand ve ulaşım gibi günlük hayatın kuralları." },
    de: { title: "Alltag und praktische Tipps", summary: "Feiertage, Sonntagsruhe, Steuererklärung, Pfand und Verkehr: die Regeln des Alltags." },
    en: { title: "Everyday Life and Practical Tips", summary: "Public holidays, Sunday rest, tax returns, deposits and transport: the rules of daily life." },
  },
];

async function main() {
  if (!dry) {
    for (const m of EXTRA_MODULES) {
      if (await db.module.findUnique({ where: { slug: m.slug } })) continue;
      await db.module.create({
        data: {
          slug: m.slug,
          icon: m.icon,
          position: m.position,
          translations: { create: (["tr", "de", "en"] as const).map((locale) => ({ locale, ...m[locale] })) },
        },
      });
      console.log(`created module ${m.slug}`);
    }
  }
  const files = readdirSync(DIR).filter((f) => /^[a-z0-9-]+\.(tr|de|en)\.md$/.test(f)).sort();
  const settings = readdirSync(DIR).filter((f) => /^settings.*\.json$/.test(f));
  let changed = 0;

  for (const f of settings) {
    const rows = JSON.parse(readFileSync(join(DIR, f), "utf8")) as { key: string; value: string; note?: string }[];
    for (const r of rows) {
      if (!dry) await db.setting.upsert({ where: { key: r.key }, update: { value: r.value, note: r.note ?? null }, create: { key: r.key, value: r.value, note: r.note ?? null } });
    }
    console.log(`settings ${f}: ${rows.length}`);
  }

  for (const f of files) {
    const [slug, locale] = f.replace(/\.md$/, "").split(".") as [string, "tr" | "de" | "en"];
    let p: Parsed;
    try { p = parse(readFileSync(join(DIR, f), "utf8")); } catch (e) { console.error(`${f}: ${(e as Error).message}`); continue; }
    if (p.meta.slug && p.meta.slug !== slug) { console.error(`${f}: slug in front matter differs`); continue; }
    if (!p.meta.title) { console.error(`${f}: title missing`); continue; }

    let guide = await db.guide.findUnique({ where: { slug } });
    if (!guide && p.meta.module && !dry) {
      // A new guide: the front matter names its module (and optionally position and stage)
      const mod = await db.module.findUnique({ where: { slug: p.meta.module } });
      if (!mod) { console.error(`${f}: unknown module ${p.meta.module}`); continue; }
      guide = await db.guide.create({ data: { slug, moduleId: mod.id, position: Number(p.meta.position ?? 0) || 0, stage: (p.meta.stage as never) || null } });
      console.log(`created guide ${slug}`);
    }
    if (!guide) { console.error(`${f}: no guide with this slug${dry ? " (dry run: new guides are not created)" : ""}`); continue; }

    let status = (p.meta.status || "REVIEW") as "DRAFT" | "REVIEW" | "PUBLISHED";
    const verified = /^\d{4}-\d{2}-\d{2}$/.test(p.meta.verified ?? "") ? new Date(p.meta.verified) : null;
    if (locale === "tr" && status === "PUBLISHED") {
      const why = [!p.sources.length && "no source", !verified && "no verified date", hasTodoMarkers(p.body) && "TODO lines left", p.sources.some((s) => !s.startsWith("https://")) && "non-https source"].filter(Boolean);
      if (why.length) { console.warn(`${slug}: cannot be PUBLISHED (${why.join(", ")}) -> REVIEW`); status = "REVIEW"; }
    }
    if (dry) { console.log(`[dry] ${f} -> ${status}`); continue; }

    if (locale === "tr") {
      await db.guide.update({ where: { id: guide.id }, data: { status, lastVerifiedAt: verified, sourceUrls: p.sources } });
      // Other languages follow the Turkish text: they need a new language review
      await db.guideTranslation.updateMany({ where: { guideId: guide.id, locale: { not: "tr" } }, data: { needsReview: true } });
    }
    const data = { title: p.meta.title, summary: p.meta.summary ?? "", bodyMarkdown: p.body, needsReview: locale !== "tr" };
    await db.guideTranslation.upsert({ where: { guideId_locale: { guideId: guide.id, locale } }, update: data, create: { ...data, guideId: guide.id, locale } });
    changed++;
    console.log(`${f}: ${status}`);
  }
  // Timeline stage per guide (stages.json: stage -> slugs); applied last so new guides exist already
  const stagesFile = join(DIR, "stages.json");
  try {
    const stages = JSON.parse(readFileSync(stagesFile, "utf8")) as Record<string, string[]>;
    for (const [stage, slugs] of Object.entries(stages)) {
      for (const slug of slugs) {
        if (dry) continue;
        const r = await db.guide.updateMany({ where: { slug }, data: { stage: stage as never } });
        if (r.count === 0) console.warn(`stages.json: no guide ${slug} (yet)`);
      }
    }
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
  }
  console.log(`done: ${changed} text(s)`);
}

main().finally(() => db.$disconnect());
