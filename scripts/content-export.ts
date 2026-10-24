// Prints a guide as the final-file format. Run: npm run content:export -- <slug> [locale]
import { PrismaClient } from "@prisma/client";

const [slug, locale = "tr"] = process.argv.slice(2);
const db = new PrismaClient();

async function main() {
  if (!slug) throw new Error("usage: npm run content:export -- <slug> [tr|de|en]");
  const g = await db.guide.findUnique({ where: { slug }, include: { translations: true } });
  const t = g?.translations.find((x) => x.locale === locale);
  if (!g || !t) throw new Error(`no ${locale} text for ${slug}`);
  console.log(`---\nslug: ${slug}\nstatus: ${g.status}\nverified: ${g.lastVerifiedAt?.toISOString().slice(0, 10) ?? ""}\ntitle: ${t.title}\nsummary: ${t.summary}\nsources:\n${g.sourceUrls.map((u) => `  - ${u}`).join("\n")}\n---\n${t.bodyMarkdown}`);
}

main().catch((e) => { console.error(e.message); process.exitCode = 1; }).finally(() => db.$disconnect());
