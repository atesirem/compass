import Link from "next/link";
import { CompassMark } from "@/components/Logo";
import { ThemeToggleButton } from "@/components/ThemeToggle";
import { requireStaff } from "@/lib/auth";
import { logoutAction } from "../_actions/auth";
import { AdminNav } from "../_components/AdminNav";
import { RoleBadge } from "../_components/Badges";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireStaff();

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <aside className="flex flex-col gap-4 bg-brand p-3 text-on-brand lg:sticky lg:top-0 lg:h-dvh lg:w-64 lg:shrink-0 lg:p-5">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 text-xl font-bold tracking-tight">
            <CompassMark size={30} />
            Hedefly <span className="text-sm font-medium text-on-brand-muted">admin</span>
          </Link>
          <div className="lg:hidden">
            <ThemeToggleButton labelToLight="Light theme" labelToDark="Dark theme" />
          </div>
        </div>

        <AdminNav role={user.role} />

        <div className="mt-auto hidden flex-col gap-3 border-t border-brand-line pt-4 lg:flex">
          <Link href="/" target="_blank" className="text-sm font-medium text-on-brand-muted hover:text-white">
            View site ↗
          </Link>
          <div className="flex items-center justify-between gap-2">
            <ThemeToggleButton labelToLight="Light theme" labelToDark="Dark theme" />
            <form action={logoutAction}>
              <button className="text-sm font-medium text-on-brand-muted hover:text-white">Log out</button>
            </form>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-on-brand-muted">
            <span className="truncate">{user.email}</span>
            <RoleBadge role={user.role} />
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto w-full max-w-6xl">{children}</div>
        <div className="mt-10 flex items-center justify-between gap-3 border-t border-line pt-4 text-xs text-fg-muted lg:hidden">
          <span className="truncate">{user.email}</span>
          <form action={logoutAction}>
            <button className="font-semibold underline">Log out</button>
          </form>
        </div>
      </main>
    </div>
  );
}
