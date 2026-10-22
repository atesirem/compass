import { expect, test } from "@playwright/test";
import { E2E_ADMIN, E2E_EDITOR } from "./constants";
import { db } from "./db";
import { login } from "./helpers";

test.describe("session handling", () => {
  test("an open admin tab loses access when the session disappears (client-side navigation)", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await login(page, E2E_ADMIN);

    await context.clearCookies(); // expired or revoked session, tab still open
    await page.getByRole("navigation", { name: "Admin" }).getByRole("link", { name: "Guides" }).click();

    await expect(page).toHaveURL(/\/admin\/login$/);
    await expect(page.getByText("result(s)")).toHaveCount(0);
    await context.close();
  });

  test("a password change signs out sessions issued before it", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await login(page, E2E_EDITOR);

    await db.user.update({ where: { email: E2E_EDITOR.email }, data: { passwordUpdatedAt: new Date(Date.now() + 5000) } });
    try {
      await page.goto("/admin/guides");
      await expect(page).toHaveURL(/\/admin\/login$/);
    } finally {
      await db.user.update({ where: { email: E2E_EDITOR.email }, data: { passwordUpdatedAt: new Date(Date.now() - 60_000) } });
      await context.close();
    }
  });

  test("a deleted user loses access immediately", async ({ browser }) => {
    const email = `e2e-temp-${Date.now()}@local.test`;
    const bcrypt = (await import("bcryptjs")).default;
    await db.user.create({ data: { email, role: "EDITOR", passwordHash: await bcrypt.hash("temporary-password-1", 10), passwordUpdatedAt: new Date(Date.now() - 60_000) } });

    const context = await browser.newContext();
    const page = await context.newPage();
    await login(page, { email, password: "temporary-password-1" });
    await db.user.delete({ where: { email } });
    await page.goto("/admin/guides");
    await expect(page).toHaveURL(/\/admin\/login$/);
    await context.close();
  });
});

test.describe("roles", () => {
  test("editors see settings and glossary read-only and cannot open the module list", async ({ page }) => {
    await login(page, E2E_EDITOR);

    await page.goto("/admin/settings");
    await expect(page.getByText("only admins can edit them")).toBeVisible();
    await expect(page.getByRole("button", { name: "Add" })).toHaveCount(0);

    await page.goto("/admin/glossary");
    await expect(page.getByText("only admins can edit them")).toBeVisible();
    await expect(page.getByText("Add a term")).toHaveCount(0);

    await page.goto("/admin/modules");
    await expect(page).toHaveURL(/\/admin$/);
  });

  test("admins can edit settings", async ({ page }) => {
    await login(page, E2E_ADMIN);
    await page.goto("/admin/settings");
    await expect(page.getByRole("heading", { name: "Add a setting" })).toBeVisible();
  });
});

test.describe("hardening", () => {
  test("responses do not advertise the framework", async ({ request }) => {
    const res = await request.get("/tr");
    expect(res.headers()["x-powered-by"]).toBeUndefined();
  });

  test("markdown cannot inject scripts or javascript: links into a guide preview", async ({ page }) => {
    await login(page, E2E_ADMIN);
    await page.goto("/admin/guides/new");
    await page.locator("textarea").first().fill("[x](javascript:alert(1)) <img src=x onerror=alert(1)> **bold**");
    await page.getByRole("button", { name: "Preview" }).click();
    const preview = page.getByRole("main");
    // The dangerous parts must not become real elements or links (escaped text is harmless)
    expect(await preview.locator("img").count()).toBe(0);
    expect(await preview.locator("a[href^='javascript:' i]").count()).toBe(0);
    expect(await preview.locator("[onerror]").count()).toBe(0);
    await expect(preview.locator("strong", { hasText: "bold" })).toBeVisible();
  });

  test("oversized login input is rejected without touching the database", async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill("input[name=email]", `${"a".repeat(300)}@local.test`);
    await page.fill("input[name=password]", "whatever-password");
    await page.click("button:has-text('Log in')");
    await expect(page.locator('[role="alert"]:not(#__next-route-announcer__)')).toContainText("Invalid email or password");
    expect(await db.loginAttempt.count({ where: { email: { startsWith: "aaaaaaaaaa" } } })).toBe(0);
  });
});
