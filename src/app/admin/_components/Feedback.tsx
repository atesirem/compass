"use client";

import { useFormStatus } from "react-dom";
import type { ActionResult } from "../_actions/types";
import { ui } from "./ui";

export function Flash({ state }: { state: ActionResult | undefined }) {
  if (state?.error) {
    return (
      <p role="alert" className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-900 dark:bg-red-500/20 dark:text-red-200">
        {state.error}
      </p>
    );
  }
  if (state?.saved) {
    return (
      <p role="status" className="rounded-lg bg-emerald-100 px-3 py-2 text-sm text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200">
        Saved.
      </p>
    );
  }
  return null;
}

// Submit button that disables itself while the surrounding form action runs
export function SubmitButton({ children, className = ui.btnPrimary }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? "..." : children}
    </button>
  );
}

// Asks for confirmation in the browser before the form is submitted
export function ConfirmSubmit({
  children,
  message,
  className = ui.btnDanger,
}: {
  children: React.ReactNode;
  message: string;
  className?: string;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
