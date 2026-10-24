import { expect, test } from "@playwright/test";
import { E2E_EDITOR } from "./constants";
import { db } from "./db";
import { login } from "./helpers";

test.describe("tools", () => {
  test("the tools hub links to every tool", async ({ page }) => {
    await page.goto("/tr/tools");
    await expect(page.getByRole("heading", { level: 1, name: "Araçlar" })).toBeVisible();
    for (const href of ["/tr/tools/lid", "/tr/tools/holidays", "/tr/tools/insurance-quiz", "/tr/tools/rental-application", "/tr/tools/letters", "/tr/tools/pdf"]) {
      await expect(page.locator(`main a[href="${href}"]`)).toHaveCount(1);
    }
  });

  test("the LiD page links to the official BAMF pages", async ({ page }) => {
    await page.goto("/tr/tools/lid");
    const links = page.locator('main a[href^="https://www.bamf.de/"]');
    expect(await links.count()).toBeGreaterThanOrEqual(3);
    await expect(links.first()).toHaveAttribute("rel", /noopener/);
  });

  test("the letter tool builds a German letter once required fields are filled", async ({ page }) => {
    await page.goto("/tr/tools/letters");
    await expect(page.getByText("Eksik zorunlu alanlar")).toBeVisible();
    await page.getByLabel("Ad Soyad", { exact: false }).first().fill("Ayşe Yılmaz");
    await page.getByLabel("Sokak ve numara").fill("Musterstraße 1");
    await page.getByLabel("Posta kodu ve şehir", { exact: true }).first().fill("10115 Berlin");
    await page.getByLabel("Alıcı (kurum / şirket)").fill("Strom AG");
    await page.getByLabel("Müşteri veya sözleşme numarası").fill("K-123");
    const letter = page.locator("pre");
    await expect(letter).toContainText("Kündigung des Vertrags K-123");
    await expect(letter).toContainText("Mit freundlichen Grüßen");
  });

  test("the insurance quiz marks car liability as mandatory only for car owners", async ({ page }) => {
    await page.goto("/tr/tools/insurance-quiz");
    await expect(page.getByText("Araç trafik sigortası")).toHaveCount(0);
    await page.getByRole("group", { name: "Araban var mı?" }).getByText("Evet").click();
    await expect(page.getByText("Araç trafik sigortası")).toBeVisible();
  });

  test("the PDF merger needs files before it can merge", async ({ page }) => {
    await page.goto("/tr/tools/pdf");
    await expect(page.getByRole("button", { name: "Birleştir ve indir" })).toBeDisabled();
    await expect(page.getByText("Henüz dosya eklenmedi.")).toBeVisible();
  });
});

test.describe("blog and channels", () => {
  const slug = `e2e-post-${Date.now()}`;

  test.beforeAll(async () => {
    await db.post.create({
      data: { slug, locale: "tr", kind: "EXPERIENCE", status: "PUBLISHED", title: "E2E deneyim yazısı", summary: "Test özeti", bodyMarkdown: "## Merhaba\n\nTest metni.", authorName: "Test", tags: ["e2e"], publishedAt: new Date() },
    });
    await db.post.create({
      data: { slug: `${slug}-draft`, locale: "tr", kind: "ARTICLE", status: "DRAFT", title: "E2E taslak yazı", summary: "x", bodyMarkdown: "gizli", authorName: "Test", tags: [] },
    });
    await db.channel.create({ data: { kind: "RECOMMENDED", platform: "podcast", name: "E2E Podcast", url: "https://example.org/podcast", description: "Test", topic: "podcast", language: "tr", sponsored: true, published: true } });
    await db.channel.create({ data: { kind: "OWN", platform: "tiktok", name: "E2E Gizli Kanal", url: "https://www.tiktok.com/@e2e", description: "x", topic: "language", language: "tr", published: false } });
  });

  test.afterAll(async () => {
    await db.post.deleteMany({ where: { slug: { startsWith: "e2e-post-" } } });
    await db.channel.deleteMany({ where: { name: { startsWith: "E2E" } } });
  });

  test("the blog lists published posts only and the post page shows the experience note", async ({ page }) => {
    await page.goto("/tr/blog");
    await expect(page.getByRole("link", { name: "E2E deneyim yazısı" })).toBeVisible();
    await expect(page.getByText("E2E taslak yazı")).toHaveCount(0);

    await page.getByRole("link", { name: "E2E deneyim yazısı" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "E2E deneyim yazısı" })).toBeVisible();
    await expect(page.getByText("kişisel deneyimidir")).toBeVisible();
  });

  test("an unpublished post is a 404", async ({ page }) => {
    const res = await page.goto(`/tr/blog/${slug}-draft`);
    expect(res?.status()).toBe(404);
  });

  test("channels show published ones with ad label and safe link attributes, never hidden ones", async ({ page }) => {
    await page.goto("/tr/channels");
    const card = page.getByRole("listitem").filter({ hasText: "E2E Podcast" });
    await expect(card.getByText("Reklam")).toBeVisible();
    const link = card.getByRole("link");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer nofollow sponsored");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(page.getByText("E2E Gizli Kanal")).toHaveCount(0);
  });
});

test.describe("admin: posts and channels", () => {
  test("they need a signed-in staff member", async ({ page }) => {
    for (const path of ["/admin/posts", "/admin/posts/new", "/admin/channels"]) {
      await page.goto(path);
      await expect(page).toHaveURL(/\/admin\/login$/);
    }
  });

  test("editors can write posts but cannot change channels or publish", async ({ page }) => {
    await login(page, E2E_EDITOR);
    await page.goto("/admin/channels");
    await expect(page.getByText("Only admins can change channels.")).toBeVisible();
    await expect(page.getByText("Add a channel")).toHaveCount(0);

    await page.goto("/admin/posts/new");
    await expect(page.getByRole("option", { name: /published.*admins only/ })).toBeDisabled();
  });
});
