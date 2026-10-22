"use client";

import { useActionState } from "react";
import { saveModuleAction } from "../_actions/modules";
import type { ActionResult } from "../_actions/types";
import { LOCALE_LABELS, LOCALES } from "@/lib/guide-health";
import { Flash, SubmitButton } from "./Feedback";
import { ui } from "./ui";

export type ModuleFormValues = {
  slug: string;
  position: number;
  icon: string;
  translations: Record<string, { title: string; summary: string }>;
};

export function ModuleForm({ moduleId, values }: { moduleId: string | null; values: ModuleFormValues }) {
  const [state, action] = useActionState<ActionResult | undefined, FormData>(saveModuleAction.bind(null, moduleId), undefined);

  return (
    <form action={action} className="max-w-3xl space-y-6">
      <div className={`${ui.card} grid gap-4 sm:grid-cols-3`}>
        <label className={ui.label}>
          Slug
          <input name="slug" defaultValue={values.slug} required className={`${ui.input} mt-1`} />
        </label>
        <label className={ui.label}>
          Position
          <input name="position" type="number" min={0} defaultValue={values.position} className={`${ui.input} mt-1`} />
        </label>
        <label className={ui.label}>
          Icon (emoji or short text)
          <input name="icon" defaultValue={values.icon} maxLength={8} className={`${ui.input} mt-1`} />
        </label>
      </div>

      {LOCALES.map((l) => (
        <fieldset key={l} className={`${ui.card} space-y-3`}>
          <legend className="px-1 text-sm font-bold">
            {LOCALE_LABELS[l]} {l === "tr" && <span className="text-red-600">*</span>}
          </legend>
          <label className={ui.label}>
            Title
            <input name={`title_${l}`} defaultValue={values.translations[l]?.title ?? ""} className={`${ui.input} mt-1`} />
          </label>
          <label className={ui.label}>
            Summary
            <textarea name={`summary_${l}`} defaultValue={values.translations[l]?.summary ?? ""} rows={2} className={`${ui.input} mt-1`} />
          </label>
        </fieldset>
      ))}

      <Flash state={state} />
      <SubmitButton className={ui.btnCta}>Save module</SubmitButton>
    </form>
  );
}
