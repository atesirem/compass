import { expect, test } from "@playwright/test";
import { E2E_ADMIN, E2E_EDITOR } from "./constants";
import { db } from "./db";
import { alertOf, login } from "./helpers";

test.describe("admin access", () => {
  test("pages redirect to the login when not signed in", async ({ page }) => {
    for (const path of ["/admin", "/admin/guides", "/admin/settings", "/admin/users"]) {
      await page.goto(path);
      await expect(page).toHaveURL(/\/admin\/login$/);
    }
  });

  test("wrong password shows a generic error and keeps the email", async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill("input[name=email]", E2E_ADMIN.email);
    await page.fill("input[name=password]", "definitely-wrong");
    await page.click("button:has-text('Log in')");
    await expect(alertOf(page)).toContainText("Invalid email or password");
    await expect(page.locator("input[name=email]")).toHaveValue(E2E_ADMIN.email);
  });

  test("login is blocked after five failed attempts", async ({ page }) => {
    const email = `rate-limit-${Date.now()}@local.test`;
    await page.goto("/admin/login");
    for (let i = 1; i <= 6; i++) {
      await page.fill("input[name=email]", email);
      await page.fill("input[name=password]", `wrong-${i}`);
      await Promise.all([
        page.waitForResponse((r) => r.request().method() === "POST" && r.url().includes("/admin/login")),
        page.click("button:has-text('Log in')"),
      ]);
      await page.waitForTimeout(250);
    }
    await expect(alertOf(page)).toContainText("Too many failed attempts");
    expect(await db.loginAttempt.count({ where: { email, success: false } })).toBe(5);
  });
});

test.describe("admin as admin", () => {
  test("dashboard, lists and writing guide render", async ({ page }) => {
    await login(page, E2E_ADMIN);
    for (const [path, heading] of [
      ["/admin/guides", "Guides"],
      ["/admin/modules", "Modules"],
      ["/admin/glossary", "Glossary"],
      ["/admin/settings", "Settings"],
      ["/admin/users", "Users"],
      ["/admin/writing-guide", "Writing guide"],
    ] as const) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    }
  });

  test("guide lifecycle: template, publish rules, create, delete", async ({ page }) => {
    await login(page, E2E_ADMIN);
    await page.goto("/admin/guides/new");

    await page.getByLabel("Title").fill("E2E Test Rehberi");
    await expect(page.getByLabel("Slug")).toHaveValue("e2e-test-rehberi");

    await page.getByRole("button", { name: "Insert template" }).click();
    await page.getByLabel("Status").selectOption("PUBLISHED");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(alertOf(page)).toContainText("Published guides need");

    await page.getByRole("button", { name: "Today" }).click();
    await page.getByLabel("Sources (one https URL per line)").fill("https://www.bamf.de");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(alertOf(page)).toContainText("TODO");

    await page.locator("textarea").first().fill("## Kısaca\nTest.");
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page).toHaveURL(/\/admin\/guides\/c[a-z0-9]{20,}/);

    // the published guide is visible on the public site and in search, then removed again
    await page.goto("/tr/guides/e2e-test-rehberi");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("E2E Test Rehberi");

    await page.goto("/admin/guides?q=e2e-test");
    await page.getByRole("link", { name: "E2E Test Rehberi" }).click();
    page.once("dialog", (d) => d.accept());
    await page.getByRole("button", { name: "Delete this guide" }).click();
    await expect(page).toHaveURL(/\/admin\/guides$/);
    expect(await db.guide.count({ where: { slug: "e2e-test-rehberi" } })).toBe(0);
  });

  test("a setting value flows into the preview", async ({ page }) => {
    await login(page, E2E_ADMIN);
    await page.goto("/admin/guides/new");
    await page.locator("textarea").first().fill("Preis: {{setting:deutschlandticketPrice}}");
    await page.getByRole("button", { name: "Preview" }).click();
    await expect(page.getByRole("main")).toContainText("Preis: 63");
  });
});

test.describe("admin as editor", () => {
  test("editor cannot publish and does not see the users page", async ({ page }) => {
    await login(page, E2E_EDITOR);
    await expect(page.getByRole("link", { name: "Users" })).toHaveCount(0);
    await page.goto("/admin/users");
    await expect(page).toHaveURL(/\/admin$/);
    await page.goto("/admin/guides/new");
    await expect(page.locator("option[value=PUBLISHED]")).toHaveAttribute("disabled", "");
  });
});
