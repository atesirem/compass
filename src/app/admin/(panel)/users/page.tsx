import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { RoleBadge } from "../../_components/Badges";
import { CreateUserForm, UserActions } from "../../_components/UserForms";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const me = await requireAdmin();
  const users = await db.user.findMany({
    where: { role: { in: ["ADMIN", "EDITOR"] } },
    orderBy: { createdAt: "asc" },
  });

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Users</h1>
      <p className="mt-1 max-w-2xl text-sm text-fg-muted">
        Admins manage everything and publish guides. Editors write and translate guides and can send them to review.
      </p>

      <h2 className="mb-3 mt-8 text-lg font-bold">Add a team member</h2>
      <CreateUserForm />

      <h2 className="mb-3 mt-8 text-lg font-bold">Team ({users.length})</h2>
      <ul className="space-y-3">
        {users.map((u) => (
          <li key={u.id} className="rounded-2xl border border-line bg-surface p-5">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="font-semibold">{u.email}</span>
              <RoleBadge role={u.role} />
              {u.id === me.id && <span className="text-xs text-fg-muted">(you)</span>}
              <span className="ml-auto text-xs text-fg-muted">since {u.createdAt.toISOString().slice(0, 10)}</span>
            </div>
            <UserActions id={u.id} role={u.role} isSelf={u.id === me.id} />
          </li>
        ))}
      </ul>
    </>
  );
}
