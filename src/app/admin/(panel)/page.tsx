import Link from "next/link";
import { db } from "@/lib/db";
import { findSettingKeys, LOCALES, verificationState } from "@/lib/guide-health";
import { LocaleDots, StatusBadge, VerificationBadge } from "../_components/Badges";
import { ui } from "../_components/ui";
import { requireStaff } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  await requireStaff();
  const [guides, settings, bodies] = await Promise.all([
    db.guide.findMany({
      orderBy: { updatedAt: "desc" },
      include: { translations: { select: { locale: true, title: true, needsReview: true } } },
    }),
    db.setting.findMany({ select: { key: true } }),
    db.guideTranslation.findMany({ select: { bodyMarkdown: true, guide: { select: { id: true, slug: true } } } }),
  ]);

  const titleOf = (g: (typeof guides)[number]) => g.translations.find((t) => t.locale === "tr")?.title ?? g.slug;
  const published = guides.filter((g) => g.status === "PUBLISHED");

  const counts = {
    total: guides.length,
    published: published.length,
    review: guides.filter((g) => g.status === "REVIEW").length,
    draft: guides.filter((g) => g.status === "DRAFT").length,
  };

  // Things an editor should fix next
  const awaitingReview = guides.filter((g) => g.translations.some((t) => t.needsReview));
  const needsVerification = published.filter((g) => verificationState(g.lastVerifiedAt) !== "fresh");
  const missingTranslations = published.filter((g) => LOCALES.some((l) => !g.translations.some((t) => t.locale === l)));

  const knownKeys = new Set(settings.map((s) => s.key));
  const missingSettings = new Map<string, Set<string>>();
  for (const b of bodies) {
    for (const key of findSettingKeys(b.bodyMarkdown)) {
      if (!knownKeys.has(key)) missingSettings.set(key, (missingSettings.get(key) ?? new Set()).add(b.guide.slug));
    }
  }

  const stats = [
    { label: "Published", value: counts.published },
    { label: "In review", value: counts.review },
    { label: "Drafts", value: counts.draft },
    { label: "All guides", value: counts.total },
  ];

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Link href="/admin/guides/new" className={ui.btnCta}>
          New guide
        </Link>
      </div>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Guide counts">
        {stats.map((s) => (
          <div key={s.label} className={ui.card}>
            <p className="text-sm font-medium text-fg-muted">{s.label}</p>
            <p className="mt-1 text-4xl font-bold tracking-tight">{s.value}</p>
          </div>
        ))}
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className={ui.card}>
          <h2 className="text-lg font-bold">Needs attention</h2>
          <ul className="mt-4 space-y-5 text-sm">
            <li>
              <p className="font-semibold">Published guides to verify ({needsVerification.length})</p>
              {needsVerification.length === 0 ? (
                <p className="text-fg-muted">All published guides were verified recently.</p>
              ) : (
                <ul className="mt-2 space-y-1">
                  {needsVerification.slice(0, 6).map((g) => (
                    <li key={g.id} className="flex items-center justify-between gap-2">
                      <Link href={`/admin/guides/${g.id}`} className="underline-offset-2 hover:underline">
                        {titleOf(g)}
                      </Link>
                      <VerificationBadge state={verificationState(g.lastVerifiedAt)} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <p className="font-semibold">Published guides missing a translation ({missingTranslations.length})</p>
              {missingTranslations.length === 0 ? (
                <p className="text-fg-muted">Every published guide exists in TR, DE and EN.</p>
              ) : (
                <ul className="mt-2 space-y-1">
                  {missingTranslations.slice(0, 6).map((g) => (
                    <li key={g.id} className="flex items-center justify-between gap-2">
                      <Link href={`/admin/guides/${g.id}`} className="underline-offset-2 hover:underline">
                        {titleOf(g)}
                      </Link>
                      <LocaleDots present={g.translations.map((t) => t.locale)} />
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <p className="font-semibold">Translations awaiting language review ({awaitingReview.length})</p>
              {awaitingReview.length === 0 ? (
                <p className="text-fg-muted">No translation is waiting for a native-speaker check.</p>
              ) : (
                <ul className="mt-2 space-y-1">
                  {awaitingReview.slice(0, 6).map((g) => (
                    <li key={g.id} className="flex items-center justify-between gap-2">
                      <Link href={`/admin/guides/${g.id}`} className="underline-offset-2 hover:underline">
                        {titleOf(g)}
                      </Link>
                      <LocaleDots
                        present={g.translations.map((t) => t.locale)}
                        review={g.translations.filter((t) => t.needsReview).map((t) => t.locale)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <p className="font-semibold">Unknown setting placeholders ({missingSettings.size})</p>
              {missingSettings.size === 0 ? (
                <p className="text-fg-muted">All {"{{setting:...}}"} placeholders have a value.</p>
              ) : (
                <ul className="mt-2 space-y-1">
                  {[...missingSettings].map(([key, slugs]) => (
                    <li key={key}>
                      <code className="rounded bg-line px-1.5 py-0.5">{key}</code>{" "}
                      <span className="text-fg-muted">used in {[...slugs].join(", ")}</span>
                    </li>
                  ))}
                  <li>
                    <Link href="/admin/settings" className="font-semibold underline">
                      Add them in Settings
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </section>

        <section className={ui.card}>
          <h2 className="text-lg font-bold">Recently edited</h2>
          {guides.length === 0 ? (
            <p className="mt-4 text-sm text-fg-muted">No guides yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {guides.slice(0, 7).map((g) => (
                <li key={g.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                  <div className="min-w-0">
                    <Link href={`/admin/guides/${g.id}`} className="block truncate font-semibold underline-offset-2 hover:underline">
                      {titleOf(g)}
                    </Link>
                    <span className="text-xs text-fg-muted">{g.updatedAt.toISOString().slice(0, 10)}</span>
                  </div>
                  <StatusBadge status={g.status} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
