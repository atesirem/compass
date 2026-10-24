import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { E2E_ADMIN } from "./constants";
import { login } from "./helpers";

const PUBLIC_PAGES = ["/tr", "/de", "/en", "/tr/guides/anmeldung", "/tr/timeline", "/tr/glossary", "/tr/search?q=anmeld", "/tr/roadmap", "/tr/tools", "/tr/tools/lid", "/tr/tools/insurance-quiz", "/tr/tools/letters", "/tr/tools/pdf", "/tr/blog", "/tr/channels", "/tr/about", "/tr/contact", "/tr/links", "/tr/impressum", "/tr/datenschutz"];

async function scan(page: Page) {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  return results.violations
    .filter((v) => v.impact === "serious" || v.impact === "critical")
    .map((v) => `${v.id} (${v.impact}): ${v.nodes.length} node(s), e.g. ${v.nodes[0]?.target.join(" ")}`);
}

for (const theme of ["light", "dark"] as const) {
  test.describe(`accessibility, ${theme} theme`, () => {
    test.beforeEach(async ({ page }) => {
      await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
    });

    for (const path of PUBLIC_PAGES) {
      test(`public ${path}`, async ({ page }) => {
        await page.goto(path);
        await page.waitForLoadState("networkidle");
        expect(await scan(page)).toEqual([]);
      });
    }

    test("admin login and dashboard", async ({ page }) => {
      await page.goto("/admin/login");
      expect(await scan(page)).toEqual([]);
      await login(page, E2E_ADMIN);
      expect(await scan(page)).toEqual([]);
      await page.goto("/admin/guides");
      await page.waitForLoadState("networkidle");
      expect(await scan(page)).toEqual([]);
    });
  });
}
