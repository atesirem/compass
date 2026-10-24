# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public.spec.ts >> public site >> draft guides and unknown pages return 404
- Location: tests/e2e/public.spec.ts:69:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 200
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { alertOf } from "./helpers";
  3   | 
  4   | test.describe("public site", () => {
  5   |   test("home redirects to Turkish and shows hero, nav and modules", async ({ page }) => {
  6   |     await page.goto("/");
  7   |     await expect(page).toHaveURL(/\/tr$/);
  8   |     await expect(page.getByRole("heading", { level: 1 })).toContainText("Almanya");
  9   |     await expect(page.getByRole("navigation", { name: "Ana menü" }).getByRole("link")).toHaveCount(5);
  10  |     await expect(page.locator("#modules li").first()).toBeVisible();
  11  |   });
  12  | 
  13  |   test("an English browser is sent to the English site", async ({ browser }) => {
  14  |     const context = await browser.newContext({ locale: "en-US" });
  15  |     const page = await context.newPage();
  16  |     await page.goto("/");
  17  |     await expect(page).toHaveURL(/\/en$/);
  18  |     await context.close();
  19  |   });
  20  | 
  21  |   test("language switch changes the text and the URL", async ({ page }) => {
  22  |     await page.goto("/tr");
  23  |     await page.getByRole("navigation", { name: "Dil" }).getByRole("link", { name: "DE" }).click();
  24  |     await expect(page).toHaveURL(/\/de$/);
  25  |     await expect(page.getByRole("heading", { level: 1 })).toContainText("Deutschland");
  26  |   });
  27  | 
  28  |   test("theme toggle switches and remembers the theme", async ({ page }) => {
  29  |     await page.goto("/tr");
  30  |     await page.getByRole("button", { name: "Koyu temaya geç" }).click();
  31  |     await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  32  |     await page.reload();
  33  |     await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  34  |   });
  35  | 
  36  |   test("search finds the published guide and ignores short queries", async ({ page }) => {
  37  |     await page.goto("/tr/search?q=anmeld");
  38  |     await expect(page.getByRole("link", { name: /Anmeldung/ })).toBeVisible();
  39  |     await page.goto("/tr/search?q=a");
  40  |     await expect(page.getByText("En az 2 harf yaz.")).toBeVisible();
  41  |     await page.goto("/tr/search?q=qqqqzzzz");
  42  |     await expect(page.getByText("Sonuç yok")).toBeVisible();
  43  |   });
  44  | 
  45  |   test("timeline lists the five stages", async ({ page }) => {
  46  |     await page.goto("/tr/timeline");
  47  |     await expect(page.locator("main ol > li h2")).toHaveText(["Gelmeden önce", "İlk hafta", "İlk ay", "İlk 6 ay", "Uzun vade"]);
  48  |   });
  49  | 
  50  |   test("glossary filters terms and links by anchor", async ({ page }) => {
  51  |     await page.goto("/tr/glossary");
  52  |     const all = await page.locator("dl > div").count();
  53  |     expect(all).toBeGreaterThan(10);
  54  |     await page.goto("/tr/glossary?q=kindergeld");
  55  |     expect(await page.locator("dl > div").count()).toBeLessThan(all);
  56  |     await page.goto("/de/glossary#meldebescheinigung");
  57  |     await expect(page.locator("#meldebescheinigung dd")).toContainText("Bescheinigung");
  58  |   });
  59  | 
  60  |   test("guide page shows the verification notice, sources and a glossary tooltip", async ({ page }) => {
  61  |     await page.goto("/tr/guides/anmeldung");
  62  |     await expect(page.getByRole("heading", { level: 1 })).toContainText("Anmeldung");
  63  |     await expect(page.locator("article").getByText(/doğrulan|Son doğrulama/).first()).toBeVisible();
  64  |     await page.getByRole("link", { name: "Wohnungsgeberbestätigung" }).first().hover();
  65  |     await expect(page.getByRole("tooltip").first()).toBeVisible();
  66  |     await expect(page.getByRole("heading", { name: "Resmi kaynaklar" })).toBeVisible();
  67  |   });
  68  | 
  69  |   test("draft guides and unknown pages return 404", async ({ request }) => {
> 70  |     expect((await request.get("/tr/guides/blue-card")).status()).toBe(404);
      |                                                                  ^ Error: expect(received).toBe(expected) // Object.is equality
  71  |     expect((await request.get("/tr/modules/does-not-exist")).status()).toBe(404);
  72  |   });
  73  | 
  74  |   test("legal pages exist in all languages and the footer links to them", async ({ page, request }) => {
  75  |     for (const locale of ["tr", "de", "en"]) {
  76  |       for (const path of ["impressum", "datenschutz", "haftungsausschluss"]) {
  77  |         expect((await request.get(`/${locale}/${path}`)).status()).toBe(200);
  78  |       }
  79  |     }
  80  |     await page.goto("/tr");
  81  |     await expect(page.locator("footer").getByRole("link", { name: "Impressum" })).toBeVisible();
  82  |   });
  83  | });
  84  | 
  85  | test.describe("roadmap", () => {
  86  |   test("creates a dated list, remembers ticks and resets", async ({ page }) => {
  87  |     await page.goto("/tr/roadmap");
  88  |     await page.getByRole("button", { name: "Yol haritasını oluştur" }).click();
  89  |     await expect(alertOf(page)).toContainText("Geliş tarihini seç.");
  90  | 
  91  |     await page.selectOption("select", "blueCard");
  92  |     await page.getByLabel("Eşim", { exact: true }).check();
  93  |     await page.getByLabel("Süresiz oturum", { exact: true }).check();
  94  |     await page.fill("input[type=date]", "2026-01-15");
  95  |     await page.getByRole("button", { name: "Yol haritasını oluştur" }).click();
  96  |     await expect(page.getByText(/\d+ \/ \d+ görev tamam/)).toBeVisible();
  97  | 
  98  |     await page.locator("#task-anmeldung").check();
  99  |     await page.reload();
  100 |     await expect(page.locator("#task-anmeldung")).toBeChecked();
  101 | 
  102 |     page.once("dialog", (d) => d.accept());
  103 |     await page.getByRole("button", { name: "Sıfırla" }).click();
  104 |     await expect(page.getByText("Kendin hakkında")).toBeVisible();
  105 |   });
  106 | });
  107 | 
```