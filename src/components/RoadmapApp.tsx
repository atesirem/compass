"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Link } from "@/i18n/navigation";
import {
  buildRoadmap,
  GOALS,
  isProfile,
  parseDate,
  PERMITS,
  STAGES,
  type Goal,
  type Permit,
  type Profile,
  type RoadmapItem,
} from "@/lib/roadmap";

const STORAGE_KEY = "roadmap-v1";
const CHANGE_EVENT = "roadmap-change";

type Stored = { profile: Profile; done: Record<string, boolean> };

// The roadmap lives only in the browser: localStorage, never sent to the server
function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function readRaw(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function write(value: Stored | null) {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage can be blocked: the roadmap then lasts until the page is closed
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function parseStored(raw: string): Stored | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { profile?: unknown; done?: unknown };
    if (!isProfile(parsed.profile)) return null;
    const done = parsed.done && typeof parsed.done === "object" ? (parsed.done as Record<string, boolean>) : {};
    return { profile: parsed.profile, done };
  } catch {
    return null;
  }
}

export function RoadmapApp({ publishedGuides }: { publishedGuides: string[] }) {
  const raw = useSyncExternalStore(subscribe, readRaw, () => "");
  const stored = useMemo(() => parseStored(raw), [raw]);
  const [editing, setEditing] = useState(false);

  if (!stored || editing) {
    return (
      <ProfileForm
        initial={stored?.profile}
        onSubmit={(profile) => {
          write({ profile, done: stored?.done ?? {} });
          setEditing(false);
        }}
      />
    );
  }

  return (
    <RoadmapView
      stored={stored}
      publishedGuides={publishedGuides}
      onToggle={(id, value) => write({ ...stored, done: { ...stored.done, [id]: value } })}
      onEdit={() => setEditing(true)}
    />
  );
}

function ProfileForm({ initial, onSubmit }: { initial?: Profile; onSubmit: (p: Profile) => void }) {
  const t = useTranslations("Roadmap");
  const [permit, setPermit] = useState<Permit>(initial?.permit ?? "blueCard");
  const [spouse, setSpouse] = useState(initial?.spouse ?? false);
  const [children, setChildren] = useState(initial?.children ?? false);
  const [city, setCity] = useState(initial?.city ?? "");
  const [arrival, setArrival] = useState(initial?.arrival ?? "");
  const [goals, setGoals] = useState<Goal[]>(initial?.goals ?? []);
  const [error, setError] = useState(false);

  const field = "mt-1 min-h-12 w-full rounded-xl border border-line bg-surface px-4 text-base";
  const label = "block text-sm font-semibold";

  function toggleGoal(goal: Goal) {
    setGoals((current) => (current.includes(goal) ? current.filter((g) => g !== goal) : [...current, goal]));
  }

  return (
    <form
      className="space-y-6 rounded-[24px] border border-line bg-surface p-6 sm:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        if (!arrival) {
          setError(true);
          return;
        }
        onSubmit({ permit, spouse, children, city: city.trim(), arrival, goals });
      }}
    >
      <h2 className="text-2xl font-bold tracking-tight">{t("formTitle")}</h2>

      <label className={label}>
        {t("permit")}
        <select value={permit} onChange={(e) => setPermit(e.target.value as Permit)} className={field}>
          {PERMITS.map((p) => (
            <option key={p} value={p}>
              {t(`permits.${p}`)}
            </option>
          ))}
        </select>
      </label>

      <fieldset>
        <legend className={label}>{t("household")}</legend>
        <div className="mt-2 flex flex-wrap gap-4">
          <label className="flex min-h-11 items-center gap-2">
            <input type="checkbox" checked={spouse} onChange={(e) => setSpouse(e.target.checked)} className="size-5" />
            {t("spouse")}
          </label>
          <label className="flex min-h-11 items-center gap-2">
            <input type="checkbox" checked={children} onChange={(e) => setChildren(e.target.checked)} className="size-5" />
            {t("children")}
          </label>
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className={label}>
          {t("city")}
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder={t("cityPlaceholder")} maxLength={60} className={field} />
        </label>
        <label className={label}>
          {t("arrival")}
          <input
            type="date"
            value={arrival}
            onChange={(e) => {
              setArrival(e.target.value);
              setError(false);
            }}
            aria-invalid={error}
            className={field}
          />
          {error && (
            <span role="alert" className="mt-1 block text-sm text-red-600 dark:text-red-400">
              {t("required")}
            </span>
          )}
        </label>
      </div>

      <fieldset>
        <legend className={label}>{t("goals")}</legend>
        <div className="mt-2 flex flex-wrap gap-4">
          {GOALS.map((g) => (
            <label key={g} className="flex min-h-11 items-center gap-2">
              <input type="checkbox" checked={goals.includes(g)} onChange={() => toggleGoal(g)} className="size-5" />
              {t(`goalLabels.${g}`)}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="min-h-12 rounded-full bg-cta px-7 text-base font-semibold text-on-cta transition hover:bg-cta-hover"
      >
        {t("submit")}
      </button>
    </form>
  );
}

function RoadmapView({
  stored,
  publishedGuides,
  onToggle,
  onEdit,
}: {
  stored: Stored;
  publishedGuides: string[];
  onToggle: (id: string, value: boolean) => void;
  onEdit: () => void;
}) {
  const t = useTranslations("Roadmap");
  const tStages = useTranslations("Timeline.stages");
  const locale = useLocale();
  const { profile, done } = stored;

  // Midnight today, taken once when the view opens
  const [today] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const items = useMemo(() => buildRoadmap(profile), [profile]);
  const doneCount = items.filter((i) => done[i.id]).length;
  const percent = items.length === 0 ? 0 : Math.round((doneCount / items.length) * 100);

  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  const groups = STAGES.map((stage) => ({ stage, items: items.filter((i) => i.stage === stage) })).filter((g) => g.items.length > 0);

  function reset() {
    if (window.confirm(t("confirmReset"))) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      window.dispatchEvent(new Event(CHANGE_EVENT));
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold">
            {t("summary", { permit: t(`permits.${profile.permit}`), date: dateFormat.format(parseDate(profile.arrival)) })}
          </p>
          {profile.city && <p className="text-fg-muted">{profile.city}</p>}
        </div>
        <div className="flex flex-wrap gap-2 print:hidden">
          <button onClick={onEdit} className="min-h-11 rounded-full border border-line px-5 text-sm font-semibold hover:border-fg">
            {t("edit")}
          </button>
          <button onClick={() => window.print()} className="min-h-11 rounded-full border border-line px-5 text-sm font-semibold hover:border-fg">
            {t("print")}
          </button>
          <button onClick={reset} className="min-h-11 rounded-full px-4 text-sm font-semibold text-red-600 hover:underline dark:text-red-400">
            {t("reset")}
          </button>
        </div>
      </div>

      <div className="mt-6" role="group" aria-label={t("progress", { done: doneCount, total: items.length })}>
        <div className="flex items-center justify-between text-sm font-semibold">
          <span>{t("progress", { done: doneCount, total: items.length })}</span>
          <span>{percent}%</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-line">
          <div className="h-full rounded-full bg-cta transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="mt-10 space-y-10">
        {groups.map(({ stage, items: stageItems }) => (
          <section key={stage} aria-labelledby={`stage-${stage}`}>
            <h2 id={`stage-${stage}`} className="mb-3 text-2xl font-bold tracking-tight">
              {tStages(stage)}
            </h2>
            <ul className="space-y-2">
              {stageItems.map((item) => (
                <TaskRow
                  key={item.id}
                  item={item}
                  checked={Boolean(done[item.id])}
                  overdue={!done[item.id] && item.due.getTime() < today.getTime()}
                  dueLabel={dateFormat.format(item.due)}
                  guideAvailable={Boolean(item.guide && publishedGuides.includes(item.guide))}
                  onToggle={(v) => onToggle(item.id, v)}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-10 rounded-2xl bg-surface px-5 py-4 text-sm leading-relaxed text-fg-muted">{t("note")}</p>
    </div>
  );
}

function TaskRow({
  item,
  checked,
  overdue,
  dueLabel,
  guideAvailable,
  onToggle,
}: {
  item: RoadmapItem;
  checked: boolean;
  overdue: boolean;
  dueLabel: string;
  guideAvailable: boolean;
  onToggle: (value: boolean) => void;
}) {
  const t = useTranslations("Roadmap");

  return (
    <li className="rounded-2xl border border-line bg-surface px-4 py-3 print:break-inside-avoid">
      <div className="flex items-start gap-3">
        <input
          id={`task-${item.id}`}
          type="checkbox"
          checked={checked}
          onChange={(e) => onToggle(e.target.checked)}
          className="mt-1 size-6 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <label htmlFor={`task-${item.id}`} className={`block text-base font-semibold ${checked ? "text-fg-muted line-through" : ""}`}>
            {t(`tasks.${item.id}.title`)}
          </label>
          <p className="text-sm text-fg-muted">{t(`tasks.${item.id}.note`)}</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className={overdue ? "font-semibold text-red-600 dark:text-red-400" : "text-fg-muted"}>
              {overdue ? `${t("overdue")}: ${dueLabel}` : t("due", { date: dueLabel })}
            </span>
            {guideAvailable && item.guide && (
              <Link href={`/guides/${item.guide}`} className="font-semibold text-accent underline print:hidden">
                {t("guideLink")}
              </Link>
            )}
          </p>
        </div>
      </div>
    </li>
  );
}
