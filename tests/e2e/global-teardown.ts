import { E2E_ADMIN, E2E_EDITOR } from "./constants";
import { db } from "./db";

export default async function globalTeardown() {
  await db.user.deleteMany({ where: { email: { in: [E2E_ADMIN.email, E2E_EDITOR.email] } } });
  await db.loginAttempt.deleteMany({});
  await db.guide.deleteMany({ where: { slug: { startsWith: "e2e-" } } });
  await db.$disconnect();
}
