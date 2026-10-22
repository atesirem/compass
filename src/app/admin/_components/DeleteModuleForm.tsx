"use client";

import { useActionState } from "react";
import { deleteModuleAction } from "../_actions/modules";
import type { ActionResult } from "../_actions/types";
import { ConfirmSubmit, Flash } from "./Feedback";

export function DeleteModuleForm({ moduleId }: { moduleId: string }) {
  const [state, action] = useActionState<ActionResult | undefined, FormData>(deleteModuleAction, undefined);

  return (
    <form action={action} className="mt-10 max-w-3xl space-y-3 border-t border-line pt-4">
      <input type="hidden" name="id" value={moduleId} />
      <Flash state={state} />
      <ConfirmSubmit message="Delete this module? This cannot be undone.">Delete this module</ConfirmSubmit>
    </form>
  );
}
