"use client";

import { useActionState } from "react";
import { deleteSettingAction, saveSettingAction } from "../_actions/settings";
import type { ActionResult } from "../_actions/types";
import { ConfirmSubmit, Flash, SubmitButton } from "./Feedback";
import { ui } from "./ui";

export function SettingForm({
  settingKey = "",
  value = "",
  note = "",
  usedIn,
  isNew = false,
}: {
  settingKey?: string;
  value?: string;
  note?: string;
  usedIn?: number;
  isNew?: boolean;
}) {
  const [state, action] = useActionState<ActionResult | undefined, FormData>(saveSettingAction, undefined);

  return (
    <div className={`${ui.card} space-y-3`}>
      <form action={action} className="grid gap-3 md:grid-cols-[200px_160px_minmax(0,1fr)_auto] md:items-end">
        <label className={ui.label}>
          Key
          {isNew ? (
            <input name="key" required defaultValue={settingKey} placeholder="blueCardSalary" className={`${ui.input} mt-1`} />
          ) : (
            <>
              <input type="hidden" name="key" value={settingKey} />
              <code className="mt-1 block truncate rounded-lg bg-line px-3 py-2 text-sm">{settingKey}</code>
            </>
          )}
        </label>
        <label className={ui.label}>
          Value
          <input name="value" required defaultValue={value} className={`${ui.input} mt-1`} />
        </label>
        <label className={ui.label}>
          Note / source
          <input name="note" defaultValue={note} placeholder="Where does this value come from?" className={`${ui.input} mt-1`} />
        </label>
        <SubmitButton className={ui.btnPrimary}>{isNew ? "Add" : "Save"}</SubmitButton>
      </form>

      <Flash state={state} />

      {!isNew && (
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-fg-muted">
          <span>
            Used in {usedIn ?? 0} text(s) as <code>{`{{setting:${settingKey}}}`}</code>
          </span>
          <form action={deleteSettingAction}>
            <input type="hidden" name="key" value={settingKey} />
            <ConfirmSubmit
              message={
                usedIn
                  ? `"${settingKey}" is used in ${usedIn} text(s). Those will show a missing-value marker. Delete anyway?`
                  : `Delete "${settingKey}"?`
              }
            >
              Delete
            </ConfirmSubmit>
          </form>
        </div>
      )}
    </div>
  );
}
