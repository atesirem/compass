"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

const MAX_FILES = 20;
const MAX_TOTAL_MB = 50;

type Item = { id: number; file: File };

function kindOf(file: File): "pdf" | "jpg" | "png" | null {
  const name = file.name.toLowerCase();
  if (file.type === "application/pdf" || name.endsWith(".pdf")) return "pdf";
  if (file.type === "image/jpeg" || /\.jpe?g$/.test(name)) return "jpg";
  if (file.type === "image/png" || name.endsWith(".png")) return "png";
  return null;
}

// Merges PDFs and images into one PDF entirely in the browser (pdf-lib). Nothing is uploaded.
export function PdfMerger({ fileName }: { fileName: string }) {
  const t = useTranslations("Pdf");
  const [items, setItems] = useState<Item[]>([]);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const nextId = useRef(1);
  const input = useRef<HTMLInputElement>(null);

  function add(list: FileList | null) {
    if (!list) return;
    const incoming = [...list];
    const bad = incoming.find((f) => !kindOf(f));
    if (bad) return setMessage({ text: t("unsupported", { name: bad.name }), error: true });
    if (items.length + incoming.length > MAX_FILES) return setMessage({ text: t("tooMany", { max: MAX_FILES }), error: true });
    const total = [...items.map((i) => i.file), ...incoming].reduce((sum, f) => sum + f.size, 0);
    if (total > MAX_TOTAL_MB * 1024 * 1024) return setMessage({ text: t("tooBig", { size: MAX_TOTAL_MB }), error: true });
    setItems((cur) => [...cur, ...incoming.map((file) => ({ id: nextId.current++, file }))]);
    setMessage(null);
    if (input.current) input.current.value = "";
  }

  function move(index: number, delta: number) {
    setItems((cur) => {
      const next = [...cur];
      const target = index + delta;
      if (target < 0 || target >= next.length) return cur;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function merge() {
    setBusy(true);
    setMessage(null);
    let current = "";
    try {
      // Loaded on demand so the library is not part of every page
      const { PDFDocument } = await import("pdf-lib");
      const out = await PDFDocument.create();
      for (const { file } of items) {
        current = file.name;
        const bytes = new Uint8Array(await file.arrayBuffer());
        const kind = kindOf(file);
        if (kind === "pdf") {
          const doc = await PDFDocument.load(bytes);
          const pages = await out.copyPages(doc, doc.getPageIndices());
          pages.forEach((p) => out.addPage(p));
        } else {
          const img = kind === "png" ? await out.embedPng(bytes) : await out.embedJpg(bytes);
          // Fit the image onto an A4 page, keeping its proportions
          const [pw, ph] = [595.28, 841.89];
          const scale = Math.min((pw - 40) / img.width, (ph - 40) / img.height, 1);
          const w = img.width * scale;
          const h = img.height * scale;
          out.addPage([pw, ph]).drawImage(img, { x: (pw - w) / 2, y: (ph - h) / 2, width: w, height: h });
        }
      }
      const blob = new Blob([new Uint8Array(await out.save())], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
      setMessage({ text: t("done"), error: false });
    } catch {
      setMessage({ text: t("failed", { name: current }), error: true });
    } finally {
      setBusy(false);
    }
  }

  const btn = "min-h-10 rounded-full border border-line px-4 text-sm font-semibold hover:border-fg disabled:opacity-40";

  return (
    <div>
      <label className="block rounded-[20px] border-2 border-dashed border-line bg-surface p-8 text-center">
        <span className="inline-flex min-h-11 items-center rounded-full bg-cta px-6 font-semibold text-on-cta">{t("add")}</span>
        <span className="mt-3 block text-sm text-fg-muted">{t("dropHint", { max: MAX_FILES, size: MAX_TOTAL_MB })}</span>
        <input
          ref={input}
          type="file"
          multiple
          accept="application/pdf,image/jpeg,image/png,.pdf,.jpg,.jpeg,.png"
          onChange={(e) => add(e.target.files)}
          className="sr-only"
          aria-label={t("add")}
        />
      </label>

      {items.length === 0 ? (
        <p className="mt-6 text-fg-muted">{t("empty")}</p>
      ) : (
        <ol className="mt-6 space-y-2">
          {items.map((item, i) => (
            <li key={item.id} className="flex flex-wrap items-center gap-2 rounded-2xl border border-line bg-surface px-4 py-3">
              <span className="min-w-0 flex-1 break-all font-medium">
                {i + 1}. {item.file.name}
              </span>
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className={btn} aria-label={`${t("up")}: ${item.file.name}`}>
                ↑
              </button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className={btn} aria-label={`${t("down")}: ${item.file.name}`}>
                ↓
              </button>
              <button type="button" onClick={() => setItems((cur) => cur.filter((x) => x.id !== item.id))} className={btn} aria-label={`${t("remove")}: ${item.file.name}`}>
                ✕
              </button>
            </li>
          ))}
        </ol>
      )}

      <button type="button" onClick={merge} disabled={busy || items.length === 0} className="mt-6 min-h-11 rounded-full bg-cta px-6 font-semibold text-on-cta hover:bg-cta-hover disabled:opacity-50">
        {busy ? t("working") : t("merge")}
      </button>
      {message && (
        <p role={message.error ? "alert" : "status"} className={`mt-4 rounded-lg px-4 py-3 text-sm ${message.error ? "bg-red-100 text-red-900 dark:bg-red-500/20 dark:text-red-200" : "bg-emerald-100 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200"}`}>
          {message.text}
        </p>
      )}
      <p className="mt-6 text-sm text-fg-muted">{t("privacy")}</p>
      <p className="mt-2 text-sm text-fg-muted">{t("tip")}</p>
    </div>
  );
}
