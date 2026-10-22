import type { VerificationState } from "@/lib/guide-health";

const BASE = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";

const STATUS_STYLES: Record<string, string> = {
  DRAFT: "bg-line text-fg-muted",
  REVIEW: "bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200",
  PUBLISHED: "bg-emerald-100 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200",
};

export function StatusBadge({ status }: { status: string }) {
  return <span className={`${BASE} ${STATUS_STYLES[status] ?? STATUS_STYLES.DRAFT}`}>{status.toLowerCase()}</span>;
}

const VERIFICATION_STYLES: Record<VerificationState, { label: string; className: string }> = {
  never: { label: "not verified", className: "bg-red-100 text-red-900 dark:bg-red-500/20 dark:text-red-200" },
  stale: { label: "needs re-check", className: "bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200" },
  fresh: { label: "verified", className: "bg-emerald-100 text-emerald-900 dark:bg-emerald-500/20 dark:text-emerald-200" },
};

export function VerificationBadge({ state }: { state: VerificationState }) {
  const { label, className } = VERIFICATION_STYLES[state];
  return <span className={`${BASE} ${className}`}>{label}</span>;
}

export function RoleBadge({ role }: { role: string }) {
  return (
    <span className={`${BASE} ${role === "ADMIN" ? "bg-brand text-on-brand" : "bg-line text-fg-muted"}`}>
      {role.toLowerCase()}
    </span>
  );
}

// Compact TR / DE / EN row: filled when the translation exists
export function LocaleDots({ present, review = [] }: { present: string[]; review?: string[] }) {
  return (
    <span className="inline-flex gap-1">
      {["tr", "de", "en"].map((l) => (
        <span
          key={l}
          title={review.includes(l) ? "needs language review" : undefined}
          className={`rounded px-1.5 py-0.5 text-[11px] font-bold uppercase ${
            review.includes(l)
              ? "bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200"
              : present.includes(l)
                ? "bg-accent/15 text-accent"
                : "text-fg-muted line-through"
          }`}
        >
          {l}
          {review.includes(l) ? "*" : ""}
          {!present.includes(l) && <span className="sr-only"> (missing)</span>}
        </span>
      ))}
    </span>
  );
}
