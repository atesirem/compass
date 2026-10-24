import { expect, test } from "@playwright/test";

test.describe("seo", () => {
  test("robots.txt hides admin and search and points to the sitemap", async ({ request }) => {
    const body = await (await request.get("/robots.txt")).text();
    expect(body).toContain("Disallow: /admin");
    expect(body).toContain("Disallow: /*/search");
    expect(body).toContain("Sitemap:");
  });

  test("sitemap contains only published content with hreflang", async ({ request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    expect(xml).toContain("/tr/guides/anmeldung");
    expect(xml).toContain('hreflang="x-default"');
    expect(xml).not.toContain("/guides/kindergeld");
    expect(xml).not.toContain("/admin");
  });

  test("pages declare canonical, hreflang and share image", async ({ page }) => {
    await page.goto("/de/guides/anmeldung");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/de\/guides\/anmeldung$/);
    expect(await page.locator('link[rel="alternate"][hreflang]').count()).toBeGreaterThanOrEqual(4);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.join("")).toContain("Article");
  });

  test("search results are not indexed", async ({ page }) => {
    await page.goto("/tr/search?q=anmeld");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });

  test("generated share image is a PNG", async ({ request }) => {
    const res = await request.get("/tr/guides/anmeldung/opengraph-image");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toContain("image/png");
  });
});

test.describe("security headers", () => {
  test("responses carry CSP with a nonce and the basic hardening headers", async ({ request }) => {
    const res = await request.get("/tr");
    const h = res.headers();
    expect(h["content-security-policy"]).toMatch(/script-src 'self' 'nonce-[^']+' 'strict-dynamic'/);
    expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["x-frame-options"]).toBe("DENY");
    expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  });

  test("a page loads without Content Security Policy violations", async ({ page }) => {
    const violations: string[] = [];
    page.on("console", (m) => {
      if (/Content Security Policy|Refused to/i.test(m.text())) violations.push(m.text());
    });
    for (const path of ["/tr", "/tr/guides/anmeldung", "/tr/roadmap", "/admin/login"]) {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
    }
    expect(violations).toEqual([]);
  });
});
