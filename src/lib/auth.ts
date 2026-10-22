import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { readSession } from "@/lib/session";

// Load the logged-in staff user (ADMIN or EDITOR) or send them to the login page.
// Call this in EVERY admin page and server action: a layout check alone is skipped on client-side navigation.
// The user is re-read from the database, so deleted users, role changes and password changes take effect at once.
// Cached per request, so calling it in the layout, the page and an action costs one query.
export const requireStaff = cache(async () => {
  const session = await readSession();
  if (!session) redirect("/admin/login");

  const user = await db.user.findUnique({ where: { id: session.userId } });
  if (!user || (user.role !== "ADMIN" && user.role !== "EDITOR")) redirect("/admin/login");

  // A password change signs out every session that was issued before it
  if (session.issuedAt < Math.floor(user.passwordUpdatedAt.getTime() / 1000)) redirect("/admin/login");

  return user;
});

// Only ADMIN users may manage users, modules and settings, and publish guides
export async function requireAdmin() {
  const user = await requireStaff();
  if (user.role !== "ADMIN") redirect("/admin");
  return user;
}
