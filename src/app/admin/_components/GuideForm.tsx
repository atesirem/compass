"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { GuideBody, type GlossaryTip } from "@/components/GuideBody";
import { LOCALE_LABELS, LOCALES, replaceSettingKeys, slugify, type AppLocale } from "@/lib/guide-health";
import { GUIDE_TEMPLATES, hasTodoMarkers } from "@/lib/guide-template";
import { saveGuideAction } from "../_actions/guides";
import type { ActionResult } from "../_actions/types";
import { Flash } from "./Feedback";
import { ui } from "./ui";

type Translation = { title: string; summary: string; body: string; needsReview: boolean };

export type GuideFormValues = {
  slug: string;
  moduleId: string;
  status: "DRAFT" | "REVIEW" | "PUBLISHED";
  stage: string;
  lastVerifiedAt: string;
  sourceUrls: string;
  translations: Record<AppLocale, Translation>;
};

const STAGES = [
  { value: "", label: "(none)" },
  { value: "PRE_ARRIVAL", label: "Before arrival" },
  { value: "FIRST_WEEK", label: "First week" },
  { value: "FIRST_MONTH", label: "First month" },
  { value: "FIRST_SIX_MONTHS", label: "First 6 months" },
  { value: "LONG_TERM", label: "Long term" },
];

const TOOLBAR = [
  { label: "H2", before: "\n## ", after: "", placeholder: "Heading" },
  { label: "Bold", before: "**", after: "**", placeholder: "bold text" },
  { label: "List", before: "\n- ", after: "", placeholder: "item" },
  { label: "Link", before: "[", after: "](https://)", placeholder: "link text" },
] as const;

export function GuideForm({
  guideId,
  role,
  modules,
  settings,
  terms,
  initial,
  publicHref,
  justCreated,
}: {
  guideId: string | null;
  role: string;
  modules: { id: string; slug: string }[];
  settings: Record<string, string>;
  terms: GlossaryTip[];
  initial: GuideFormValues;
  publicHref: string | null;
  justCreated: boolean;
}) {
  const [values, setValues] = useState<GuideFormValues>(initial);
  const [snapshot, setSnapshot] = useState(JSON.stringify(initial));
  const [slugTouched, setSlugTouched] = useState(Boolean(guideId));
  const [locale, setLocale] = useState<AppLocale>("tr");
  const [preview, setPreview] = useState(false);
  const [result, setResult] = useState<ActionResult | undefined>(justCreated ? { saved: true } : undefined);
  const [pending, startTransition] = useTransition();
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const isEditor = role === "EDITOR";
  const lockedForEditor = isEditor && initial.status === "PUBLISHED";
  const dirty = JSON.stringify(values) !== snapshot;

  // Warn before leaving with unsaved changes
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const t = values.translations[locale];

  function patch(changes: Partial<GuideFormValues>) {
    setValues((v) => ({ ...v, ...changes }));
  }

  function patchTranslation(changes: Partial<Translation>) {
    setValues((v) => {
      const next = { ...v, translations: { ...v.translations, [locale]: { ...v.translations[locale], ...changes } } };
      // New guides get their slug from the Turkish title until the slug is edited by hand
      if (locale === "tr" && changes.title !== undefined && !slugTouched) next.slug = slugify(changes.title);
      return next;
    });
  }

  function insertAtCursor(before: string, after: string, placeholder: string) {
    const el = bodyRef.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end } = el;
    const selected = t.body.slice(start, end) || placeholder;
    patchTranslation({ body: t.body.slice(0, start) + before + selected + after + t.body.slice(end) });
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  function insertTemplate() {
    if (t.body.trim() && !window.confirm("Replace the current text with the template?")) return;
    patchTranslation({ body: GUIDE_TEMPLATES[locale] });
  }

  const sourceLines = values.sourceUrls.split("\n").map((s) => s.trim()).filter(Boolean);
  const checklist = [
    { label: "Turkish title", ok: Boolean(values.translations.tr.title.trim()) },
    { label: "Turkish text", ok: Boolean(values.translations.tr.body.trim()) },
    { label: "At least one https source", ok: sourceLines.length > 0 && sourceLines.every((s) => s.startsWith("https://")) },
    { label: "Verified date", ok: Boolean(values.lastVerifiedAt) },
    { label: "No TODO lines left", ok: !LOCALES.some((l) => hasTodoMarkers(values.translations[l].body)) },
  ];
  const optional = LOCALES.filter((l) => l !== "tr").map((l) => ({
    label: `${LOCALE_LABELS[l]} translation`,
    ok: Boolean(values.translations[l].title.trim()),
  }));
  const readyToPublish = checklist.every((c) => c.ok);

  const preparedPreview = useMemo(() => replaceSettingKeys(t.body, settings), [t.body, settings]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData();
    fd.set("slug", values.slug);
    fd.set("moduleId", values.moduleId);
    fd.set("status", values.status);
    fd.set("stage", values.stage);
    fd.set("lastVerifiedAt", values.lastVerifiedAt);
    fd.set("sourceUrls", values.sourceUrls);
    for (const l of LOCALES) {
      fd.set(`title_${l}`, values.translations[l].title);
      fd.set(`summary_${l}`, values.translations[l].summary);
      fd.set(`body_${l}`, values.translations[l].body);
      fd.set(`review_${l}`, values.translations[l].needsReview ? "1" : "0");
    }
    startTransition(async () => {
      const res = await saveGuideAction(guideId, undefined, fd);
      setResult(res);
      if (res?.saved) setSnapshot(JSON.stringify(values));
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-4">
        {lockedForEditor && (
          <p className="rounded-lg bg-amber-100 px-3 py-2 text-sm text-amber-900 dark:bg-amber-500/20 dark:text-amber-200">
            This guide is published. Only admins can edit it.
          </p>
        )}

        <div role="tablist" aria-label="Language" className="flex gap-1 rounded-full bg-line p-1">
          {LOCALES.map((l) => {
            const filled = Boolean(values.translations[l].title.trim());
            return (
              <button
                key={l}
                type="button"
                role="tab"
                aria-selected={l === locale}
                onClick={() => setLocale(l)}
                className={`flex min-h-10 flex-1 items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold transition ${
                  l === locale ? "bg-surface shadow-sm" : "text-fg-muted hover:text-fg"
                }`}
              >
                {LOCALE_LABELS[l]}
                <span aria-hidden="true" className={`size-2 rounded-full ${filled ? (values.translations[l].needsReview ? "bg-amber-500" : "bg-emerald-500") : "bg-fg-muted/30"}`} />
              </button>
            );
          })}
        </div>

        <div className={`${ui.card} space-y-4`}>
          {locale !== "tr" && (
            <label className="flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-950 dark:bg-amber-500/10 dark:text-amber-100">
              <input
                type="checkbox"
                checked={t.needsReview}
                onChange={(e) => patchTranslation({ needsReview: e.target.checked })}
                className="mt-1"
              />
              <span>
                <strong>Needs language review.</strong> Tick while this translation has not been checked by a native speaker; untick once it has.
              </span>
            </label>
          )}
          <label className={ui.label}>
            Title {locale === "tr" && <span className="text-red-600">*</span>}
            <input value={t.title} onChange={(e) => patchTranslation({ title: e.target.value })} className={`${ui.input} mt-1`} />
          </label>
          <label className={ui.label}>
            Summary
            <input value={t.summary} onChange={(e) => patchTranslation({ summary: e.target.value })} className={`${ui.input} mt-1`} />
          </label>

          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className={ui.label}>Text (Markdown)</span>
              <div className="flex gap-1 rounded-full bg-line p-1 text-xs font-semibold">
                <button type="button" onClick={() => setPreview(false)} className={`rounded-full px-3 py-1.5 ${!preview ? "bg-surface shadow-sm" : "text-fg-muted"}`}>
                  Write
                </button>
                <button type="button" onClick={() => setPreview(true)} className={`rounded-full px-3 py-1.5 ${preview ? "bg-surface shadow-sm" : "text-fg-muted"}`}>
                  Preview
                </button>
              </div>
            </div>

            {preview ? (
              <div className="min-h-[360px] rounded-lg border border-line bg-page p-5">
                {t.body.trim() ? <GuideBody markdown={preparedPreview} terms={terms} /> : <p className="text-fg-muted">Nothing to preview yet.</p>}
              </div>
            ) : (
              <>
                <div className="mb-2 flex flex-wrap gap-2">
                  {TOOLBAR.map((b) => (
                    <button key={b.label} type="button" onClick={() => insertAtCursor(b.before, b.after, b.placeholder)} className="rounded-md border border-line px-2.5 py-1 text-xs font-semibold hover:border-fg">
                      {b.label}
                    </button>
                  ))}
                  <button type="button" onClick={insertTemplate} className="rounded-md border border-line px-2.5 py-1 text-xs font-semibold hover:border-fg">
                    Insert template
                  </button>
                  {Object.keys(settings).length > 0 && (
                    <select
                      aria-label="Insert a setting value"
                      value=""
                      onChange={(e) => e.target.value && insertAtCursor(`{{setting:${e.target.value}}}`, "", "")}
                      className="rounded-md border border-line bg-page px-2 py-1 text-xs font-semibold"
                    >
                      <option value="">Insert setting…</option>
                      {Object.keys(settings).map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <textarea
                  ref={bodyRef}
                  value={t.body}
                  onChange={(e) => patchTranslation({ body: e.target.value })}
                  rows={18}
                  className={`${ui.input} min-h-[360px] font-mono leading-relaxed`}
                />
                <p className={ui.hint}>Use {"{{setting:key}}"} for values that change over time (salaries, prices).</p>
              </>
            )}
          </div>
        </div>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
        <div className={`${ui.card} space-y-4`}>
          <label className={ui.label}>
            Status
            <select value={values.status} onChange={(e) => patch({ status: e.target.value as GuideFormValues["status"] })} className={`${ui.input} mt-1`}>
              <option value="DRAFT">Draft</option>
              <option value="REVIEW">In review</option>
              <option value="PUBLISHED" disabled={isEditor}>
                Published{isEditor ? " (admin only)" : ""}
              </option>
            </select>
          </label>
          <label className={ui.label}>
            Module
            <select value={values.moduleId} onChange={(e) => patch({ moduleId: e.target.value })} className={`${ui.input} mt-1`}>
              {modules.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.slug}
                </option>
              ))}
            </select>
          </label>
          <label className={ui.label}>
            Timeline stage
            <select value={values.stage} onChange={(e) => patch({ stage: e.target.value })} className={`${ui.input} mt-1`}>
              {STAGES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <label className={ui.label}>
            Slug
            <input
              value={values.slug}
              onChange={(e) => {
                setSlugTouched(true);
                patch({ slug: e.target.value });
              }}
              className={`${ui.input} mt-1`}
            />
          </label>
        </div>

        <div className={`${ui.card} space-y-4`}>
          <label className={ui.label}>
            Verified on
            <div className="mt-1 flex gap-2">
              <input type="date" value={values.lastVerifiedAt} onChange={(e) => patch({ lastVerifiedAt: e.target.value })} className={ui.input} />
              <button type="button" onClick={() => patch({ lastVerifiedAt: new Date().toISOString().slice(0, 10) })} className={ui.btnSecondary}>
                Today
              </button>
            </div>
            <span className={ui.hint}>Set it only after checking the official sources.</span>
          </label>
          <label className={ui.label}>
            Sources (one https URL per line)
            <textarea value={values.sourceUrls} onChange={(e) => patch({ sourceUrls: e.target.value })} rows={4} className={`${ui.input} mt-1`} />
          </label>
        </div>

        <div className={ui.card}>
          <p className="text-sm font-bold">{readyToPublish ? "Ready to publish" : "Before publishing"}</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {checklist.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden="true" className={c.ok ? "text-emerald-600" : "text-red-600"}>
                  {c.ok ? "✓" : "✕"}
                </span>
                <span className="sr-only">{c.ok ? "Done:" : "Missing:"}</span>
                {c.label}
              </li>
            ))}
            {optional.map((c) => (
              <li key={c.label} className="flex items-center gap-2 text-fg-muted">
                <span aria-hidden="true">{c.ok ? "✓" : "–"}</span>
                {c.label} <span className="text-xs">(optional)</span>
              </li>
            ))}
          </ul>
        </div>

        <Flash state={result} />
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" disabled={pending || lockedForEditor} className={ui.btnCta}>
            {pending ? "Saving..." : "Save"}
          </button>
          {dirty && <span className="text-xs font-medium text-amber-700 dark:text-amber-300">Unsaved changes</span>}
          {publicHref && (
            <Link href={publicHref} target="_blank" className="ml-auto text-sm font-semibold underline underline-offset-2">
              View page ↗
            </Link>
          )}
        </div>

      </aside>
    </form>
  );
}
