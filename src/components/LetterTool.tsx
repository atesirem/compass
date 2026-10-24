"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { buildLetter, LETTER_FIELDS, missingFields, type LetterId, type LetterValues } from "@/lib/letters";

const inputClass = "mt-1 w-full rounded-lg border border-line bg-page px-3 py-2 text-base text-fg placeholder:text-fg-muted/70 focus:border-accent";

// Fill-in form that builds a German letter. Everything happens in the browser; nothing is stored or sent.
export function LetterTool({ ids }: { ids: LetterId[] }) {
  const t = useTranslations("Letters");
  const [id, setId] = useState<LetterId>(ids[0]);
  const [values, setValues] = useState<LetterValues>({});
  const [copied, setCopied] = useState(false);

  const missing = missingFields(id, values);
  // Built on every change; the date is read once per render which is fine for a letter draft
  const letter = useMemo(() => (missing.length === 0 ? buildLetter(id, values) : ""), [id, values, missing.length]);

  function set(key: string, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    setCopied(false);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4 print:hidden" aria-label={t("fillIn")}>
        {ids.length > 1 && (
          <label className="block font-semibold">
            {t("choose")}
            <select
              value={id}
              onChange={(e) => {
                setId(e.target.value as LetterId);
                setCopied(false);
              }}
              className={inputClass}
            >
              {ids.map((x) => (
                <option key={x} value={x}>
                  {t(`templates.${x}`)}
                </option>
              ))}
            </select>
          </label>
        )}
        <p className="rounded-2xl bg-surface px-4 py-3 text-sm leading-relaxed text-fg-muted">{t(`notes.${id}`)}</p>

        {LETTER_FIELDS[id].map((f) => {
          const label = t(`fields.${f.key}`);
          return (
            <label key={f.key} className="block font-semibold">
              {label}
              {f.required && <span className="font-normal text-fg-muted"> ({t("required")})</span>}
              {f.type === "textarea" ? (
                <textarea value={values[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)} rows={4} className={inputClass} />
              ) : (
                <input
                  type={f.type === "date" ? "date" : f.type === "number" ? "number" : "text"}
                  min={f.type === "number" ? 1 : undefined}
                  value={values[f.key] ?? ""}
                  onChange={(e) => set(f.key, e.target.value)}
                  className={inputClass}
                />
              )}
            </label>
          );
        })}
        <button type="button" onClick={() => setValues({})} className="min-h-11 rounded-full border border-line px-5 text-sm font-semibold hover:border-fg">
          {t("reset")}
        </button>
      </form>

      <section aria-labelledby="letter-preview">
        <h2 id="letter-preview" className="text-xl font-bold print:hidden">
          {t("preview")}
        </h2>
        {letter ? (
          <>
            <pre lang="de" className="mt-3 whitespace-pre-wrap rounded-2xl border border-line bg-surface p-5 font-sans text-base leading-relaxed print:border-0 print:p-0">
              {letter}
            </pre>
            <div className="mt-4 flex flex-wrap items-center gap-3 print:hidden">
              <button type="button" onClick={copy} className="min-h-11 rounded-full bg-cta px-6 font-semibold text-on-cta hover:bg-cta-hover">
                {copied ? t("copied") : t("copy")}
              </button>
              <button type="button" onClick={() => window.print()} className="min-h-11 rounded-full border border-line px-6 font-semibold hover:border-fg">
                {t("print")}
              </button>
            </div>
          </>
        ) : (
          <div className="mt-3 rounded-2xl bg-surface px-5 py-4 text-fg-muted print:hidden">
            <p>{t("pendingFill")}</p>
            <p className="mt-2 text-sm" role="status">
              {t("missing", { fields: missing.map((k) => t(`fields.${k}`)).join(", ") })}
            </p>
          </div>
        )}
        <p className="mt-6 text-sm text-fg-muted print:hidden">{t("disclaimer")}</p>
      </section>
    </div>
  );
}
