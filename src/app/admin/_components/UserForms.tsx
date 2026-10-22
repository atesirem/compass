"use client";

import { useActionState } from "react";
import { changeRoleAction, createUserAction, deleteUserAction, resetPasswordAction } from "../_actions/users";
import type { ActionResult } from "../_actions/types";
import { ConfirmSubmit, Flash, SubmitButton } from "./Feedback";
import { ui } from "./ui";

export function CreateUserForm() {
  const [state, action] = useActionState<ActionResult | undefined, FormData>(createUserAction, undefined);
  return (
    <form action={action} className={`${ui.card} grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_160px_auto] md:items-end`}>
      <label className={ui.label}>
        Email
        <input name="email" type="email" required autoComplete="off" className={`${ui.input} mt-1`} />
      </label>
      <label className={ui.label}>
        Password (min. 12 characters)
        <input name="password" type="password" required minLength={12} autoComplete="new-password" className={`${ui.input} mt-1`} />
      </label>
      <label className={ui.label}>
        Role
        <select name="role" defaultValue="EDITOR" className={`${ui.input} mt-1`}>
          <option value="EDITOR">Editor</option>
          <option value="ADMIN">Admin</option>
        </select>
      </label>
      <SubmitButton className={ui.btnCta}>Create user</SubmitButton>
      <div className="md:col-span-4">
        <Flash state={state} />
      </div>
    </form>
  );
}

export function UserActions({ id, role, isSelf }: { id: string; role: string; isSelf: boolean }) {
  const [roleState, roleAction] = useActionState<ActionResult | undefined, FormData>(changeRoleAction, undefined);
  const [pwState, pwAction] = useActionState<ActionResult | undefined, FormData>(resetPasswordAction, undefined);
  const [delState, delAction] = useActionState<ActionResult | undefined, FormData>(deleteUserAction, undefined);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-4">
        {!isSelf && (
          <form action={roleAction} className="flex items-end gap-2">
            <input type="hidden" name="id" value={id} />
            <label className="text-xs font-medium">
              Role
              <select name="role" defaultValue={role} className={`${ui.input} mt-1 w-32`}>
                <option value="EDITOR">Editor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </label>
            <SubmitButton className={ui.btnSecondary}>Change</SubmitButton>
          </form>
        )}
        <form action={pwAction} className="flex items-end gap-2">
          <input type="hidden" name="id" value={id} />
          <label className="text-xs font-medium">
            New password
            <input name="password" type="password" minLength={12} required autoComplete="new-password" className={`${ui.input} mt-1 w-48`} />
          </label>
          <SubmitButton className={ui.btnSecondary}>Reset</SubmitButton>
        </form>
        {!isSelf && (
          <form action={delAction}>
            <input type="hidden" name="id" value={id} />
            <ConfirmSubmit message="Delete this user?">Delete user</ConfirmSubmit>
          </form>
        )}
      </div>
      <Flash state={roleState} />
      <Flash state={pwState} />
      <Flash state={delState} />
    </div>
  );
}
