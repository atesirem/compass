// Pre-deployment check. Run against the PRODUCTION environment: npm run check:launch
// Fails (exit code 1) while anything is left over from local development.
import { PrismaClient } from "@prisma/client";
import { operator, placeholdersLeft } from "../src/content/legal/operator";

type Check = { name: string; ok: boolean; detail?: string };

async function main() {
  const checks: Check[] = [];
  const add = (name: string, ok: boolean, detail?: string) => checks.push({ name, ok, detail });

  const left = placeholdersLeft(operator);
  add("Legal data (Impressum / privacy) complete", left.length === 0, left.length ? `missing: ${left.join(", ")}` : undefined);

  const secret = process.env.AUTH_SECRET ?? "";
  add("AUTH_SECRET is set, long and not the example value", secret.length >= 32 && !secret.includes("change-me"));

  const siteUrl = process.env.SITE_URL ?? "";
  add("SITE_URL is the public https address", /^https:\/\//.test(siteUrl) && !/localhost|127\.0\.0\.1|example\.(com|org)/.test(siteUrl), siteUrl || "not set");

  const dbUrl = process.env.DATABASE_URL ?? "";
  add("DATABASE_URL is not a local database", dbUrl !== "" && !/localhost|127\.0\.0\.1/.test(dbUrl));

  const db = new PrismaClient();
  try {
    const users = await db.user.findMany({ where: { role: { in: ["ADMIN", "EDITOR"] } }, select: { email: true, role: true } });
    const testUsers = users.filter((u) => /@local\.test$|@example\.(com|org)$/.test(u.email));
    add("No test or demo staff accounts", testUsers.length === 0, testUsers.map((u) => u.email).join(", ") || undefined);
    add("At least one admin exists", users.some((u) => u.role === "ADMIN"));

    const settings = await db.setting.findMany({ where: { OR: [{ value: "TODO" }, { key: "exampleSetting" }] }, select: { key: true } });
    add("No placeholder settings", settings.length === 0, settings.map((s) => s.key).join(", ") || undefined);

    const unverified = await db.guide.count({ where: { status: "PUBLISHED", lastVerifiedAt: null } });
    add("Every published guide has a verified date", unverified === 0, unverified ? `${unverified} guide(s) without date` : undefined);

    const todos = await db.guideTranslation.count({ where: { bodyMarkdown: { contains: "TODO:" }, guide: { status: "PUBLISHED" } } });
    add("No TODO lines in published guides", todos === 0, todos ? `${todos} translation(s)` : undefined);
  } finally {
    await db.$disconnect();
  }

  for (const c of checks) console.log(`${c.ok ? "OK  " : "FAIL"} ${c.name}${c.detail ? `  (${c.detail})` : ""}`);
  const failed = checks.filter((c) => !c.ok).length;
  console.log(failed ? `\n${failed} check(s) failed.` : "\nAll launch checks passed.");
  process.exit(failed ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
