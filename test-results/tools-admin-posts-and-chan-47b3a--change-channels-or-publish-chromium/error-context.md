# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tools.spec.ts >> admin: posts and channels >> editors can write posts but cannot change channels or publish
- Location: tests/e2e/tools.spec.ts:102:7

# Error details

```
Error: expect(locator).toBeDisabled() failed

Locator:  getByRole('option', { name: /published.*admins only/ })
Expected: disabled
Received: enabled
Timeout:  5000ms

Call log:
  - Expect "toBeDisabled" getByRole('option', { name: /published.*admins only/ }) with timeout 5000ms
  - waiting for getByRole('option', { name: /published.*admins only/ })
    14 × locator resolved to <option disabled value="PUBLISHED">…</option>
       - unexpected value "enabled"

```

```yaml
- complementary:
  - link "Pusula admin":
    - /url: /admin
  - navigation "Admin":
    - link "Dashboard":
      - /url: /admin
    - link "Guides":
      - /url: /admin/guides
    - link "Blog posts":
      - /url: /admin/posts
    - link "Channels":
      - /url: /admin/channels
    - link "Modules":
      - /url: /admin/modules
    - link "Glossary":
      - /url: /admin/glossary
    - link "Writing guide":
      - /url: /admin/writing-guide
    - link "Settings":
      - /url: /admin/settings
  - link "View site ↗":
    - /url: /
  - button "Dark theme"
  - button "Log out"
  - text: e2e-editor@local.test editor
- main:
  - navigation "Breadcrumb":
    - link "Blog posts":
      - /url: /admin/posts
    - text: / New
  - heading "New post" [level=1]
  - text: Title *
  - textbox "Title *"
  - text: Summary
  - textbox "Summary Shown in the list, in search results and when the post is shared."
  - text: Shown in the list, in search results and when the post is shared. Text (Markdown)
  - button "Write"
  - button "Preview"
  - button "H2"
  - button "Bold"
  - button "Quote"
  - button "List"
  - button "Link"
  - textbox "Text (Markdown)"
  - paragraph: "Write in the first person for experience posts. Lines that start with TODO: block publishing. Images are not supported; use links."
  - complementary:
    - text: Language of the post
    - combobox "Language of the post":
      - option "Türkçe" [selected]
      - option "Deutsch"
      - option "English"
    - text: Type
    - combobox "Type":
      - option "Experience (personal story)" [selected]
      - option "Article"
    - text: Author
    - textbox "Author Shown publicly. A first name or nickname is enough."
    - text: Shown publicly. A first name or nickname is enough. Tags
    - textbox "Tags Comma separated, at most 8.":
      - /placeholder: banka, c24
    - text: Comma separated, at most 8. Related guide (slug)
    - textbox "Related guide (slug) A link to this guide is shown under the post when the guide is published.":
      - /placeholder: open-bank-account
    - text: A link to this guide is shown under the post when the guide is published. Slug
    - textbox "Slug"
    - text: Status
    - combobox "Status":
      - option "draft" [selected]
      - option "review"
      - option "published (admins only)" [disabled]
    - heading "Ready to publish?" [level=2]
    - list:
      - listitem: ○ Title
      - listitem: ○ Summary
      - listitem: ○ Author name
      - listitem: ○ Text
      - listitem: ✓ No TODO lines left
    - paragraph: Drafts can be saved at any time.
    - button "Save post"
- alert
```

# Test source

```ts
  9   |     await expect(page.getByRole("heading", { level: 1, name: "Araçlar" })).toBeVisible();
  10  |     for (const href of ["/tr/tools/lid", "/tr/tools/holidays", "/tr/tools/insurance-quiz", "/tr/tools/rental-application", "/tr/tools/letters", "/tr/tools/pdf"]) {
  11  |       await expect(page.locator(`main a[href="${href}"]`)).toHaveCount(1);
  12  |     }
  13  |   });
  14  | 
  15  |   test("the LiD page links to the official BAMF pages", async ({ page }) => {
  16  |     await page.goto("/tr/tools/lid");
  17  |     const links = page.locator('main a[href^="https://www.bamf.de/"]');
  18  |     expect(await links.count()).toBeGreaterThanOrEqual(3);
  19  |     await expect(links.first()).toHaveAttribute("rel", /noopener/);
  20  |   });
  21  | 
  22  |   test("the letter tool builds a German letter once required fields are filled", async ({ page }) => {
  23  |     await page.goto("/tr/tools/letters");
  24  |     await expect(page.getByText("Eksik zorunlu alanlar")).toBeVisible();
  25  |     await page.getByLabel("Ad Soyad", { exact: false }).first().fill("Ayşe Yılmaz");
  26  |     await page.getByLabel("Sokak ve numara").fill("Musterstraße 1");
  27  |     await page.getByLabel("Posta kodu ve şehir", { exact: true }).first().fill("10115 Berlin");
  28  |     await page.getByLabel("Alıcı (kurum / şirket)").fill("Strom AG");
  29  |     await page.getByLabel("Müşteri veya sözleşme numarası").fill("K-123");
  30  |     const letter = page.locator("pre");
  31  |     await expect(letter).toContainText("Kündigung des Vertrags K-123");
  32  |     await expect(letter).toContainText("Mit freundlichen Grüßen");
  33  |   });
  34  | 
  35  |   test("the insurance quiz marks car liability as mandatory only for car owners", async ({ page }) => {
  36  |     await page.goto("/tr/tools/insurance-quiz");
  37  |     await expect(page.getByText("Araç trafik sigortası")).toHaveCount(0);
  38  |     await page.getByRole("group", { name: "Araban var mı?" }).getByText("Evet").click();
  39  |     await expect(page.getByText("Araç trafik sigortası")).toBeVisible();
  40  |   });
  41  | 
  42  |   test("the PDF merger needs files before it can merge", async ({ page }) => {
  43  |     await page.goto("/tr/tools/pdf");
  44  |     await expect(page.getByRole("button", { name: "Birleştir ve indir" })).toBeDisabled();
  45  |     await expect(page.getByText("Henüz dosya eklenmedi.")).toBeVisible();
  46  |   });
  47  | });
  48  | 
  49  | test.describe("blog and channels", () => {
  50  |   const slug = `e2e-post-${Date.now()}`;
  51  | 
  52  |   test.beforeAll(async () => {
  53  |     await db.post.create({
  54  |       data: { slug, locale: "tr", kind: "EXPERIENCE", status: "PUBLISHED", title: "E2E deneyim yazısı", summary: "Test özeti", bodyMarkdown: "## Merhaba\n\nTest metni.", authorName: "Test", tags: ["e2e"], publishedAt: new Date() },
  55  |     });
  56  |     await db.post.create({
  57  |       data: { slug: `${slug}-draft`, locale: "tr", kind: "ARTICLE", status: "DRAFT", title: "E2E taslak yazı", summary: "x", bodyMarkdown: "gizli", authorName: "Test", tags: [] },
  58  |     });
  59  |     await db.channel.create({ data: { kind: "RECOMMENDED", platform: "podcast", name: "E2E Podcast", url: "https://example.org/podcast", description: "Test", topic: "podcast", language: "tr", sponsored: true, published: true } });
  60  |     await db.channel.create({ data: { kind: "OWN", platform: "tiktok", name: "E2E Gizli Kanal", url: "https://www.tiktok.com/@e2e", description: "x", topic: "language", language: "tr", published: false } });
  61  |   });
  62  | 
  63  |   test.afterAll(async () => {
  64  |     await db.post.deleteMany({ where: { slug: { startsWith: "e2e-post-" } } });
  65  |     await db.channel.deleteMany({ where: { name: { startsWith: "E2E" } } });
  66  |   });
  67  | 
  68  |   test("the blog lists published posts only and the post page shows the experience note", async ({ page }) => {
  69  |     await page.goto("/tr/blog");
  70  |     await expect(page.getByRole("link", { name: "E2E deneyim yazısı" })).toBeVisible();
  71  |     await expect(page.getByText("E2E taslak yazı")).toHaveCount(0);
  72  | 
  73  |     await page.getByRole("link", { name: "E2E deneyim yazısı" }).click();
  74  |     await expect(page.getByRole("heading", { level: 1, name: "E2E deneyim yazısı" })).toBeVisible();
  75  |     await expect(page.getByText("kişisel deneyimidir")).toBeVisible();
  76  |   });
  77  | 
  78  |   test("an unpublished post is a 404", async ({ page }) => {
  79  |     const res = await page.goto(`/tr/blog/${slug}-draft`);
  80  |     expect(res?.status()).toBe(404);
  81  |   });
  82  | 
  83  |   test("channels show published ones with ad label and safe link attributes, never hidden ones", async ({ page }) => {
  84  |     await page.goto("/tr/channels");
  85  |     const card = page.getByRole("listitem").filter({ hasText: "E2E Podcast" });
  86  |     await expect(card.getByText("Reklam")).toBeVisible();
  87  |     const link = card.getByRole("link");
  88  |     await expect(link).toHaveAttribute("rel", "noopener noreferrer nofollow sponsored");
  89  |     await expect(link).toHaveAttribute("target", "_blank");
  90  |     await expect(page.getByText("E2E Gizli Kanal")).toHaveCount(0);
  91  |   });
  92  | });
  93  | 
  94  | test.describe("admin: posts and channels", () => {
  95  |   test("they need a signed-in staff member", async ({ page }) => {
  96  |     for (const path of ["/admin/posts", "/admin/posts/new", "/admin/channels"]) {
  97  |       await page.goto(path);
  98  |       await expect(page).toHaveURL(/\/admin\/login$/);
  99  |     }
  100 |   });
  101 | 
  102 |   test("editors can write posts but cannot change channels or publish", async ({ page }) => {
  103 |     await login(page, E2E_EDITOR);
  104 |     await page.goto("/admin/channels");
  105 |     await expect(page.getByText("Only admins can change channels.")).toBeVisible();
  106 |     await expect(page.getByText("Add a channel")).toHaveCount(0);
  107 | 
  108 |     await page.goto("/admin/posts/new");
> 109 |     await expect(page.getByRole("option", { name: /published.*admins only/ })).toBeDisabled();
      |                                                                                ^ Error: expect(locator).toBeDisabled() failed
  110 |   });
  111 | });
  112 | 
```