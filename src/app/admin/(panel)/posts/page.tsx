import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { db } from "@/lib/db";
import { StatusBadge } from "../../_components/Badges";
import { ui } from "../../_components/ui";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  await requireStaff();
  const posts = await db.post.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight">Blog posts</h1>
        <Link href="/admin/posts/new" className={ui.btnCta}>
          New post
        </Link>
      </div>
      <p className="mb-4 text-sm text-fg-muted">{posts.length} post(s)</p>
      <div className={`${ui.card} overflow-x-auto p-0`}>
        <table className="w-full">
          <thead>
            <tr>
              <th className={ui.th}>Title</th>
              <th className={ui.th}>Type</th>
              <th className={ui.th}>Language</th>
              <th className={ui.th}>Status</th>
              <th className={ui.th}>Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {posts.map((p) => (
              <tr key={p.id}>
                <td className={ui.td}>
                  <Link href={`/admin/posts/${p.id}`} className="font-semibold hover:underline">
                    {p.title}
                  </Link>
                </td>
                <td className={ui.td}>{p.kind === "EXPERIENCE" ? "experience" : "article"}</td>
                <td className={`${ui.td} uppercase`}>{p.locale}</td>
                <td className={ui.td}>
                  <StatusBadge status={p.status} />
                </td>
                <td className={ui.td}>{p.updatedAt.toISOString().slice(0, 10)}</td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className={`${ui.td} text-fg-muted`}>
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
