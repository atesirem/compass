"use client";

import { useActionState } from "react";
import { CompassMark } from "@/components/Logo";
import { loginAction } from "../_actions/auth";
import { ui } from "../_components/ui";

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-brand px-4 py-10">
      <div className="w-full max-w-sm rounded-3xl bg-surface p-8 shadow-xl">
        <div className="mb-6 flex items-center gap-3 text-fg">
          <CompassMark size={36} />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Hedefly</h1>
            <p className="text-sm text-fg-muted">Admin login</p>
          </div>
        </div>
        <form action={action} className="space-y-4">
          <label className={ui.label}>
            Email
            <input name="email" type="email" required autoComplete="username" defaultValue={state?.email} className={`${ui.input} mt-1`} />
          </label>
          <label className={ui.label}>
            Password
            <input name="password" type="password" required autoComplete="current-password" className={`${ui.input} mt-1`} />
          </label>
          {state?.error && (
            <p role="alert" className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-900 dark:bg-red-500/20 dark:text-red-200">
              {state.error}
            </p>
          )}
          <button disabled={pending} className={`${ui.btnCta} w-full`}>
            {pending ? "..." : "Log in"}
          </button>
        </form>
      </div>
    </main>
  );
}
