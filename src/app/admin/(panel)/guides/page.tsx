import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { STALE_AFTER_DAYS, staleCutoff, verificationState } from "@/lib/guide-health";
import { LocaleDots, StatusBadge, VerificationBadge } from "../../_components/Badges";
import { ui } from "../../_components/ui";
import { requireStaff } from "@/lib/auth";

export const dynamic = "force-dynamic";

const STATUSES = ["DRAFT", "REVIEW", "PUBLISHED"] as const;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function GuidesPage({ searchParams }: PageProps<"/admin/guides">) {
  await requireStaff();
  const params = await searchParams;
  const q = first(params.q)?.trim().slice(0, 100) ?? "";
  const status = STATUSES.find((s) => s === first(params.status));
  const moduleId = first(params.module) ?? "";
  const verification = first(params.verification) ?? "";

  const where: Prisma.GuideWhereInput = {};
  if (q) {
    where.OR = [
      { slug: { contains: q, mode: "insensitive" } },
      { translations: { some: { title: { contains: q, mode: "insensitive" } } } },
    ];
  }
  if (status) where.status = status;
  if (moduleId) where.moduleId = moduleId;
  const staleBefore = staleCutoff();
  if (verification === "never") where.lastVerifiedAt = null;
  if (verification === "stale") where.lastVerifiedAt = { lt: staleBefore };
  if (verification === "fresh") where.lastVerifiedAt = { gte: staleBefore };

  const [guides, modules] = await Promise.all([
    db.guide.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      include: { translations: { select: { locale: true, title: true, needsReview: true } }, module: { select: { slug: true } } },
    }),
    db.module.findMany({ orderBy: { position: "asc" }, select: { id: true, slug: true } }),
  ]);

  const filtered = Boolean(q || status || moduleId || verification);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight">Guides</h1>
        <Link href="/admin/guides/new" className={ui.btnCta}>
          New guide
        </Link>
      </div>

      <form className={`${ui.card} mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5`} role="search">
        <input name="q" defaultValue={q} placeholder="Search title or slug" aria-label="Search" className={`${ui.input} lg:col-span-2`} />
        <select name="status" defaultValue={status ?? ""} aria-label="Status" className={ui.input}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.toLowerCase()}
            </option>
          ))}
        </select>
        <select name="module" defaultValue={moduleId} aria-label="Module" className={ui.input}>
          <option value="">All modules</option>
          {modules.map((m) => (
            <option key={m.id} value={m.id}>
              {m.slug}
            </option>
          ))}
        </select>
        <select name="verification" defaultValue={verification} aria-label="Verification" className={ui.input}>
          <option value="">Any verification</option>
          <option value="never">Not verified</option>
          <option value="stale">Needs re-check ({STALE_AFTER_DAYS}+ days)</option>
          <option value="fresh">Verified recently</option>
        </select>
        <div className="flex gap-3 sm:col-span-2 lg:col-span-5">
          <button className={ui.btnPrimary}>Apply filters</button>
          {filtered && (
            <Link href="/admin/guides" className={ui.btnSecondary}>
              Clear
            </Link>
          )}
          <span className="ml-auto self-center text-sm text-fg-muted">{guides.length} result(s)</span>
        </div>
      </form>

      {guides.length === 0 ? (
        <div className={`${ui.card} text-center text-fg-muted`}>
          {filtered ? "No guides match these filters." : "No guides yet. Create the first one."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
          <table className="w-full min-w-[720px]">
            <thead className="border-b border-line">
              <tr>
                <th className={ui.th}>Title</th>
                <th className={ui.th}>Module</th>
                <th className={ui.th}>Status</th>
                <th className={ui.th}>Languages</th>
                <th className={ui.th}>Verification</th>
                <th className={ui.th}>Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {guides.map((g) => (
                <tr key={g.id} className="hover:bg-page">
                  <td className={ui.td}>
                    <Link href={`/admin/guides/${g.id}`} className="font-semibold underline-offset-2 hover:underline">
                      {g.translations.find((t) => t.locale === "tr")?.title ?? g.slug}
                    </Link>
                    <div className="text-xs text-fg-muted">{g.slug}</div>
                  </td>
                  <td className={ui.td}>{g.module.slug}</td>
                  <td className={ui.td}>
                    <StatusBadge status={g.status} />
                  </td>
                  <td className={ui.td}>
                    <LocaleDots present={g.translations.map((t) => t.locale)} review={g.translations.filter((t) => t.needsReview).map((t) => t.locale)} />
                  </td>
                  <td className={ui.td}>
                    <VerificationBadge state={verificationState(g.lastVerifiedAt)} />
                  </td>
                  <td className={`${ui.td} text-fg-muted`}>{g.updatedAt.toISOString().slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
