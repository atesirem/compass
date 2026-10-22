import { requireStaff } from "@/lib/auth";
import { db } from "@/lib/db";
import { findSettingKeys } from "@/lib/guide-health";
import { SettingForm } from "../../_components/SettingRow";
import { ui } from "../../_components/ui";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await requireStaff();
  const canEdit = user.role === "ADMIN";
  const [settings, bodies] = await Promise.all([
    db.setting.findMany({ orderBy: { key: "asc" } }),
    db.guideTranslation.findMany({ select: { bodyMarkdown: true } }),
  ]);

  // How many texts reference each key
  const usage = new Map<string, number>();
  for (const b of bodies) {
    for (const key of new Set(findSettingKeys(b.bodyMarkdown))) usage.set(key, (usage.get(key) ?? 0) + 1);
  }
  const known = new Set(settings.map((s) => s.key));
  const missing = [...usage.keys()].filter((k) => !known.has(k));

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <p className="mt-1 max-w-2xl text-sm text-fg-muted">
        Values that change over time (salary thresholds, prices, fees). Write <code>{"{{setting:key}}"}</code> in a guide and
        update the value here once; every guide follows.
      </p>

      {missing.length > 0 && (
        <div role="alert" className="mt-6 rounded-2xl bg-amber-100 p-4 text-sm text-amber-900 dark:bg-amber-500/20 dark:text-amber-200">
          <p className="font-bold">Guides use keys that do not exist yet</p>
          <ul className="mt-2 space-y-1">
            {missing.map((k) => (
              <li key={k}>
                <code>{k}</code> (used in {usage.get(k)} text(s))
              </li>
            ))}
          </ul>
        </div>
      )}

      {canEdit ? (
        <>
          <h2 className="mb-3 mt-8 text-lg font-bold">Add a setting</h2>
          <SettingForm isNew />
        </>
      ) : (
        <p className="mt-6 rounded-2xl bg-surface px-5 py-4 text-sm text-fg-muted">
          Settings change published pages, so only admins can edit them. Ask an admin to update a value.
        </p>
      )}

      <h2 className="mb-3 mt-8 text-lg font-bold">All settings ({settings.length})</h2>
      {settings.length === 0 ? (
        <div className={`${ui.card} text-fg-muted`}>No settings yet.</div>
      ) : (
        <div className="space-y-3">
          {settings.map((s) =>
            canEdit ? (
            <SettingForm key={`${s.key}:${s.updatedAt.getTime()}`} settingKey={s.key} value={s.value} note={s.note ?? ""} usedIn={usage.get(s.key) ?? 0} />
            ) : (
              <div key={s.key} className={`${ui.card} flex flex-wrap items-baseline justify-between gap-3`}>
                <code className="text-sm">{s.key}</code>
                <span className="font-semibold">{s.value}</span>
                <span className="w-full text-xs text-fg-muted">{s.note}</span>
              </div>
            ),
          )}
        </div>
      )}
    </>
  );
}
