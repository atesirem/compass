"use client";

import { useActionState } from "react";
import { saveTermAction } from "../_actions/glossary";
import type { ActionResult } from "../_actions/types";
import { LOCALE_LABELS, LOCALES } from "@/lib/guide-health";
import { Flash, SubmitButton } from "./Feedback";
import { ui } from "./ui";

export function TermForm({
  termId,
  german = "",
  meanings = {},
}: {
  termId: string | null;
  german?: string;
  meanings?: Record<string, string>;
}) {
  const [state, action] = useActionState<ActionResult | undefined, FormData>(saveTermAction.bind(null, termId), undefined);

  return (
    <form action={action} className="space-y-3">
      <label className={ui.label}>
        German term
        <input name="german" defaultValue={german} required className={`${ui.input} mt-1`} />
      </label>
      <div className="grid gap-3 sm:grid-cols-3">
        {LOCALES.map((l) => (
          <label key={l} className={ui.label}>
            {LOCALE_LABELS[l]}
            <textarea name={`meaning_${l}`} defaultValue={meanings[l] ?? ""} rows={2} className={`${ui.input} mt-1`} />
          </label>
        ))}
      </div>
      <Flash state={state} />
      <SubmitButton className={ui.btnPrimary}>{termId ? "Save term" : "Add term"}</SubmitButton>
    </form>
  );
}
