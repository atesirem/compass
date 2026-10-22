import { db } from "@/lib/db";

const PLACEHOLDER = /\{\{setting:([A-Za-z0-9_]+)\}\}/g;

// Replace {{setting:key}} placeholders with values from the Setting table.
// Unknown keys are left as a visible marker so editors can spot them.
export async function resolveSettings(markdown: string): Promise<string> {
  const keys = [...markdown.matchAll(PLACEHOLDER)].map((m) => m[1]);
  if (keys.length === 0) return markdown;

  const rows = await db.setting.findMany({ where: { key: { in: keys } } });
  const values = new Map(rows.map((r) => [r.key, r.value]));

  return markdown.replace(PLACEHOLDER, (_, key: string) => values.get(key) ?? `[${key}?]`);
}
