import { PrismaClient } from "@prisma/client";
import { glossaryTerms } from "./content/glossary";

const db = new PrismaClient();

// Creates missing terms only; edits made in the admin panel are never overwritten
async function main() {
  let created = 0;
  for (const t of glossaryTerms) {
    if (await db.glossaryTerm.findUnique({ where: { german: t.german } })) continue;
    await db.glossaryTerm.create({
      data: {
        german: t.german,
        translations: {
          create: [
            { locale: "tr", meaning: t.tr },
            { locale: "de", meaning: t.de },
            { locale: "en", meaning: t.en },
          ],
        },
      },
    });
    created += 1;
  }
  console.log(`Glossary: ${created} term(s) created, ${glossaryTerms.length - created} already existed.`);
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
