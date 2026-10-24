"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { GuideBody } from "@/components/GuideBody";
import { LOCALE_LABELS, LOCALES, slugify } from "@/lib/guide-health";
import { hasTodoMarkers } from "@/lib/guide-template";
import { savePostAction } from "../_actions/posts";
import type { ActionResult } from "../_actions/types";
import { Flash } from "./Feedback";
import { ui } from "./ui";

export type PostValues = {
  slug: string;
  locale: "tr" | "de" | "en";
  kind: "EXPERIENCE" | "ARTICLE";
  status: "DRAFT" | "REVIEW" | "PUBLISHED";
  title: string;
  summary: string;
  bodyMarkdown: string;
  authorName: string;
  tags: string;
  guideSlug: string;
};

const TOOLBAR = [
  { label: "H2", before: "\n## ", after: "", placeholder: "Heading" },
  { label: "Bold", before: "**", after: "**", placeholder: "bold text" },
  { label: "Quote", before: "\n> ", after: "", placeholder: "quote" },
  { label: "List", before: "\n- ", after: "", placeholder: "item" },
  { label: "Link", before: "[", after: "](https://)", placeholder: "link text" },
] as const;

export function PostForm({
  postId,
  role,
  initial,
  justCreated,
}: {
  postId: string | null;
  role: string;
  initial: PostValues;
  justCreated: boolean;
}) {
  const [values, setValues] = useState<PostValues>(initial);
  const [snapshot, setSnapshot] = useState(JSON.stringify(initial));
  const [slugTouched, setSlugTouched] = useState(Boolean(postId));
  const [preview, setPreview] = useState(false);
  const [result, setResult] = useState<ActionResult | undefined>(justCreated ? { saved: true } : undefined);
  const [pending, startTransition] = useTransition();
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const lockedForEditor = role === "EDITOR" && initial.status === "PUBLISHED";
  const dirty = JSON.stringify(values) !== snapshot;

  // Warn before leaving with unsaved changes
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  function patch(changes: Partial<PostValues>) {
    setValues((v) => {
      const next = { ...v, ...changes };
      if (changes.title !== undefined && !slugTouched) next.slug = slugify(changes.title);
      return next;
    });
  }

  function insertAtCursor(before: string, after: string, placeholder: string) {
    const el = bodyRef.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end } = el;
    const selected = values.bodyMarkdown.slice(start, end) || placeholder;
    patch({ bodyMarkdown: values.bodyMarkdown.slice(0, start) + before + selected + after + values.bodyMarkdown.slice(end) });
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  const checklist = [
    { label: "Title", ok: Boolean(values.title.trim()) },
    { label: "Summary", ok: Boolean(values.summary.trim()) },
    { label: "Author name", ok: Boolean(values.authorName.trim()) },
    { label: "Text", ok: Boolean(values.bodyMarkdown.trim()) },
    { label: "No TODO lines left", ok: !hasTodoMarkers(values.bodyMarkdown) },
  ];
  const ready = checklist.every((c) => c.ok);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const fd = new FormData();
    for (const [k, v] of Object.entries(values)) fd.set(k, v);
    startTransition(async () => {
      const res = await savePostAction(postId, undefined, fd);
      setResult(res);
      if (res?.saved) setSnapshot(JSON.stringify(values));
    });
  }

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-4">
        {lockedForEditor && (
          <p className="rounded-lg bg-amber-100 px-3 py-2 text-sm text-amber-900 dark:bg-amber-500/20 dark:text-amber-200">
            This post is published. Only admins can edit it.
          </p>
        )}
        <div className={`${ui.card} space-y-4`}>
          <label className={ui.label}>
            Title <span className="text-red-600">*</span>
            <input value={values.title} onChange={(e) => patch({ title: e.target.value })} maxLength={200} className={`${ui.input} mt-1`} />
          </label>
          <label className={ui.label}>
            Summary
            <input value={values.summary} onChange={(e) => patch({ summary: e.target.value })} maxLength={500} className={`${ui.input} mt-1`} />
            <span className={ui.hint}>Shown in the list, in search results and when the post is shared.</span>
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
                {values.bodyMarkdown.trim() ? <GuideBody markdown={values.bodyMarkdown} /> : <p className="text-fg-muted">Nothing to preview yet.</p>}
              </div>
            ) : (
              <>
                <div className="mb-2 flex flex-wrap gap-2">
                  {TOOLBAR.map((b) => (
                    <button key={b.label} type="button" onClick={() => insertAtCursor(b.before, b.after, b.placeholder)} className="rounded-md border border-line px-2.5 py-1 text-xs font-semibold hover:border-fg">
                      {b.label}
                    </button>
                  ))}
                </div>
                <textarea
                  ref={bodyRef}
                  value={values.bodyMarkdown}
                  onChange={(e) => patch({ bodyMarkdown: e.target.value })}
                  aria-label="Text (Markdown)"
                  rows={22}
                  className={`${ui.input} min-h-[360px] font-mono leading-relaxed`}
                />
                <p className={ui.hint}>
                  Write in the first person for experience posts. Lines that start with TODO: block publishing. Images are not supported; use links.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <div className={`${ui.card} space-y-4`}>
          <label className={ui.label}>
            Language of the post
            <select value={values.locale} onChange={(e) => patch({ locale: e.target.value as PostValues["locale"] })} className={`${ui.input} mt-1`}>
              {LOCALES.map((l) => (
                <option key={l} value={l}>
                  {LOCALE_LABELS[l]}
                </option>
              ))}
            </select>
          </label>
          <label className={ui.label}>
            Type
            <select value={values.kind} onChange={(e) => patch({ kind: e.target.value as PostValues["kind"] })} className={`${ui.input} mt-1`}>
              <option value="EXPERIENCE">Experience (personal story)</option>
              <option value="ARTICLE">Article</option>
            </select>
          </label>
          <label className={ui.label}>
            Author
            <input value={values.authorName} onChange={(e) => patch({ authorName: e.target.value })} maxLength={80} className={`${ui.input} mt-1`} />
            <span className={ui.hint}>Shown publicly. A first name or nickname is enough.</span>
          </label>
          <label className={ui.label}>
            Tags
            <input value={values.tags} onChange={(e) => patch({ tags: e.target.value })} placeholder="banka, c24" className={`${ui.input} mt-1`} />
            <span className={ui.hint}>Comma separated, at most 8.</span>
          </label>
          <label className={ui.label}>
            Related guide (slug)
            <input
              value={values.guideSlug}
              onChange={(e) => patch({ guideSlug: e.target.value })}
              placeholder="open-bank-account"
              className={`${ui.input} mt-1`}
            />
            <span className={ui.hint}>A link to this guide is shown under the post when the guide is published.</span>
          </label>
          <label className={ui.label}>
            Slug
            <input
              value={values.slug}
              onChange={(e) => {
                setSlugTouched(true);
                patch({ slug: e.target.value });
              }}
              className={`${ui.input} mt-1 font-mono`}
            />
          </label>
          <label className={ui.label}>
            Status
            <select value={values.status} onChange={(e) => patch({ status: e.target.value as PostValues["status"] })} className={`${ui.input} mt-1`}>
              <option value="DRAFT">draft</option>
              <option value="REVIEW">review</option>
              <option value="PUBLISHED" disabled={role === "EDITOR"}>
                published{role === "EDITOR" ? " (admins only)" : ""}
              </option>
            </select>
          </label>
        </div>

        <div className={ui.card}>
          <h2 className="text-sm font-bold">Ready to publish?</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {checklist.map((c) => (
              <li key={c.label} className={c.ok ? "text-emerald-700 dark:text-emerald-300" : "text-fg-muted"}>
                {c.ok ? "✓" : "○"} {c.label}
              </li>
            ))}
          </ul>
          {!ready && <p className="mt-2 text-xs text-fg-muted">Drafts can be saved at any time.</p>}
        </div>

        <Flash state={result} />
        <button type="submit" disabled={pending || lockedForEditor} className={`${ui.btnCta} w-full`}>
          {pending ? "..." : "Save post"}
        </button>
        {dirty && <p className="text-xs text-fg-muted">You have unsaved changes.</p>}
      </aside>
    </form>
  );
}
