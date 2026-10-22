// Shared Tailwind class strings for the admin panel (all colors come from the theme tokens)
export const ui = {
  card: "rounded-2xl border border-line bg-surface p-5",
  input:
    "w-full rounded-lg border border-line bg-page px-3 py-2 text-sm text-fg placeholder:text-fg-muted/70 focus:border-accent",
  label: "block text-sm font-medium",
  hint: "mt-1 text-xs text-fg-muted",
  btnPrimary:
    "inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-on-brand transition hover:bg-brand-2 disabled:opacity-50",
  btnCta:
    "inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-cta px-5 text-sm font-semibold text-on-cta transition hover:bg-cta-hover disabled:opacity-50",
  btnSecondary:
    "inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-line px-5 text-sm font-semibold transition hover:border-fg disabled:opacity-50",
  btnDanger: "text-sm font-medium text-red-600 underline-offset-2 hover:underline dark:text-red-400",
  th: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-fg-muted",
  td: "px-4 py-3 align-middle text-sm",
} as const;
