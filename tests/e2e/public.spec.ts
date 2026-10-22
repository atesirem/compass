import { expect, test } from "@playwright/test";
import { alertOf } from "./helpers";

test.describe("public site", () => {
  test("home redirects to Turkish and shows hero, nav and modules", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/tr$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Almanya");
    await expect(page.getByRole("navigation", { name: "Ana menü" }).getByRole("link")).toHaveCount(5);
    await expect(page.locator("#modules li").first()).toBeVisible();
  });

  test("an English browser is sent to the English site", async ({ browser }) => {
    const context = await browser.newContext({ locale: "en-US" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
    await context.close();
  });

  test("language switch changes the text and the URL", async ({ page }) => {
    await page.goto("/tr");
    await page.getByRole("navigation", { name: "Dil" }).getByRole("link", { name: "DE" }).click();
    await expect(page).toHaveURL(/\/de$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Deutschland");
  });

  test("theme toggle switches and remembers the theme", async ({ page }) => {
    await page.goto("/tr");
    await page.getByRole("button", { name: "Koyu temaya geç" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("search finds the published guide and ignores short queries", async ({ page }) => {
    await page.goto("/tr/search?q=anmeld");
    await expect(page.getByRole("link", { name: /Anmeldung/ })).toBeVisible();
    await page.goto("/tr/search?q=a");
    await expect(page.getByText("En az 2 harf yaz.")).toBeVisible();
    await page.goto("/tr/search?q=qqqqzzzz");
    await expect(page.getByText("Sonuç yok")).toBeVisible();
  });

  test("timeline lists the five stages", async ({ page }) => {
    await page.goto("/tr/timeline");
    await expect(page.locator("main ol > li h2")).toHaveText(["Gelmeden önce", "İlk hafta", "İlk ay", "İlk 6 ay", "Uzun vade"]);
  });

  test("glossary filters terms and links by anchor", async ({ page }) => {
    await page.goto("/tr/glossary");
    const all = await page.locator("dl > div").count();
    expect(all).toBeGreaterThan(10);
    await page.goto("/tr/glossary?q=kindergeld");
    expect(await page.locator("dl > div").count()).toBeLessThan(all);
    await page.goto("/de/glossary#meldebescheinigung");
    await expect(page.locator("#meldebescheinigung dd")).toContainText("Bescheinigung");
  });

  test("guide page shows the verification notice, sources and a glossary tooltip", async ({ page }) => {
    await page.goto("/tr/guides/anmeldung");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Anmeldung");
    await expect(page.locator("article").getByText(/doğrulan|Son doğrulama/).first()).toBeVisible();
    await page.getByRole("link", { name: "Wohnungsgeberbestätigung" }).first().hover();
    await expect(page.getByRole("tooltip").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Resmi kaynaklar" })).toBeVisible();
  });

  test("draft guides and unknown pages return 404", async ({ request }) => {
    expect((await request.get("/tr/guides/blue-card")).status()).toBe(404);
    expect((await request.get("/tr/modules/does-not-exist")).status()).toBe(404);
  });

  test("legal pages exist in all languages and the footer links to them", async ({ page, request }) => {
    for (const locale of ["tr", "de", "en"]) {
      for (const path of ["impressum", "datenschutz", "haftungsausschluss"]) {
        expect((await request.get(`/${locale}/${path}`)).status()).toBe(200);
      }
    }
    await page.goto("/tr");
    await expect(page.locator("footer").getByRole("link", { name: "Impressum" })).toBeVisible();
  });
});

test.describe("roadmap", () => {
  test("creates a dated list, remembers ticks and resets", async ({ page }) => {
    await page.goto("/tr/roadmap");
    await page.getByRole("button", { name: "Yol haritasını oluştur" }).click();
    await expect(alertOf(page)).toContainText("Geliş tarihini seç.");

    await page.selectOption("select", "blueCard");
    await page.getByLabel("Eşim", { exact: true }).check();
    await page.getByLabel("Süresiz oturum", { exact: true }).check();
    await page.fill("input[type=date]", "2026-01-15");
    await page.getByRole("button", { name: "Yol haritasını oluştur" }).click();
    await expect(page.getByText(/\d+ \/ \d+ görev tamam/)).toBeVisible();

    await page.locator("#task-anmeldung").check();
    await page.reload();
    await expect(page.locator("#task-anmeldung")).toBeChecked();

    page.once("dialog", (d) => d.accept());
    await page.getByRole("button", { name: "Sıfırla" }).click();
    await expect(page.getByText("Kendin hakkında")).toBeVisible();
  });
});
