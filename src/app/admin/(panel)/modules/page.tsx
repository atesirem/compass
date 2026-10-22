import Link from "next/link";
import { db } from "@/lib/db";
import { LocaleDots } from "../../_components/Badges";
import { ui } from "../../_components/ui";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ModulesPage() {
  await requireAdmin();
  const modules = await db.module.findMany({
    orderBy: { position: "asc" },
    include: { translations: { select: { locale: true, title: true } }, _count: { select: { guides: true } } },
  });

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight">Modules</h1>
        <Link href="/admin/modules/new" className={ui.btnCta}>
          New module
        </Link>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
        <table className="w-full min-w-[560px]">
          <thead className="border-b border-line">
            <tr>
              <th className={ui.th}>#</th>
              <th className={ui.th}>Module</th>
              <th className={ui.th}>Languages</th>
              <th className={ui.th}>Guides</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {modules.map((m) => (
              <tr key={m.id} className="hover:bg-page">
                <td className={`${ui.td} text-fg-muted`}>{m.position}</td>
                <td className={ui.td}>
                  <Link href={`/admin/modules/${m.id}`} className="font-semibold underline-offset-2 hover:underline">
                    {m.icon} {m.translations.find((t) => t.locale === "tr")?.title ?? m.slug}
                  </Link>
                  <div className="text-xs text-fg-muted">{m.slug}</div>
                </td>
                <td className={ui.td}>
                  <LocaleDots present={m.translations.map((t) => t.locale)} />
                </td>
                <td className={ui.td}>{m._count.guides}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
