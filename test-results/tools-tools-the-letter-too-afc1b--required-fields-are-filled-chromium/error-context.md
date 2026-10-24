# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tools.spec.ts >> tools >> the letter tool builds a German letter once required fields are filled
- Location: tests/e2e/tools.spec.ts:22:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByLabel('Posta kodu ve şehir', { exact: true }).first()

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "Pusula" [ref=e4] [cursor=pointer]:
        - /url: /tr
      - generic [ref=e9]:
        - navigation "Dil" [ref=e10]:
          - link "TR" [ref=e11] [cursor=pointer]:
            - /url: /tr/tools/letters
          - link "DE" [ref=e12] [cursor=pointer]:
            - /url: /de/tools/letters
          - link "EN" [ref=e13] [cursor=pointer]:
            - /url: /en/tools/letters
        - button "Koyu temaya geç" [ref=e14]
    - navigation "Ana menü" [ref=e17]:
      - list [ref=e18]:
        - listitem [ref=e19]:
          - link "Rehberler" [ref=e20] [cursor=pointer]:
            - /url: /tr#modules
        - listitem [ref=e21]:
          - link "Yol haritası" [ref=e22] [cursor=pointer]:
            - /url: /tr/roadmap
        - listitem [ref=e23]:
          - link "Zaman çizelgesi" [ref=e24] [cursor=pointer]:
            - /url: /tr/timeline
        - listitem [ref=e25]:
          - link "Araçlar" [ref=e26] [cursor=pointer]:
            - /url: /tr/tools
        - listitem [ref=e27]:
          - link "Blog" [ref=e28] [cursor=pointer]:
            - /url: /tr/blog
        - listitem [ref=e29]:
          - link "Kanallar" [ref=e30] [cursor=pointer]:
            - /url: /tr/channels
        - listitem [ref=e31]:
          - link "Sözlük" [ref=e32] [cursor=pointer]:
            - /url: /tr/glossary
        - listitem [ref=e33]:
          - link "Ara" [ref=e34] [cursor=pointer]:
            - /url: /tr/search
  - main [ref=e35]:
    - generic [ref=e36]:
      - heading "Dilekçe ve fesih şablonları" [level=1] [ref=e37]
      - paragraph [ref=e38]: Alanları doldur, Almanca mektubu kopyala veya yazdır. Girdiğin bilgiler tarayıcında kalır; hiçbir yere gönderilmez.
      - generic [ref=e39]:
        - form "Bilgileri doldur" [ref=e40]:
          - generic [ref=e41]:
            - text: Mektup türü
            - combobox "Mektup türü" [ref=e42]:
              - option "Sözleşme feshi (telefon, internet, spor salonu, enerji…)" [selected]
              - option "Kira sözleşmesi feshi"
              - option "İtiraz (Widerspruch) dilekçesi"
              - option "Randevu talebi"
          - paragraph [ref=e43]: Sözleşmendeki fesih süresini ve biçimini kontrol et. Kanıt için postayla, iadeli taahhütlü göndermeyi veya gönderimi belgelemeyi düşün.
          - generic [ref=e44]:
            - text: Ad Soyad
            - generic [ref=e45]: (zorunlu)
            - textbox "Ad Soyad (zorunlu)" [ref=e46]: Ayşe Yılmaz
          - generic [ref=e47]:
            - text: Sokak ve numara
            - generic [ref=e48]: (zorunlu)
            - textbox "Sokak ve numara (zorunlu)" [active] [ref=e49]: Musterstraße 1
          - generic [ref=e50]:
            - text: Posta kodu ve şehir
            - generic [ref=e51]: (zorunlu)
            - textbox "Posta kodu ve şehir (zorunlu)" [ref=e52]
          - generic [ref=e53]:
            - text: Alıcı (kurum / şirket)
            - generic [ref=e54]: (zorunlu)
            - textbox "Alıcı (kurum / şirket) (zorunlu)" [ref=e55]
          - generic [ref=e56]:
            - text: Alıcı sokak (isteğe bağlı)
            - textbox "Alıcı sokak (isteğe bağlı)" [ref=e57]
          - generic [ref=e58]:
            - text: Alıcı posta kodu ve şehir (isteğe bağlı)
            - textbox "Alıcı posta kodu ve şehir (isteğe bağlı)" [ref=e59]
          - generic [ref=e60]:
            - text: Müşteri veya sözleşme numarası
            - generic [ref=e61]: (zorunlu)
            - textbox "Müşteri veya sözleşme numarası (zorunlu)" [ref=e62]
          - generic [ref=e63]:
            - text: İstediğin bitiş tarihi (isteğe bağlı)
            - textbox "İstediğin bitiş tarihi (isteğe bağlı)" [ref=e64]
          - button "Temizle" [ref=e65]
        - region [ref=e66]:
          - heading "Mektup (Almanca)" [level=2] [ref=e67]
          - generic [ref=e68]:
            - paragraph [ref=e69]: Zorunlu alanları doldurduğunda mektup burada görünür.
            - status [ref=e70]: "Eksik zorunlu alanlar: Posta kodu ve şehir, Alıcı (kurum / şirket), Müşteri veya sözleşme numarası"
          - paragraph [ref=e71]: Bu şablonlar genel örneklerdir; hukuki danışmanlık değildir. Önemli durumlarda (fesih, itiraz, ev başvurusu) mektubu göndermeden önce Almanca bilen birine okut.
  - contentinfo [ref=e72]:
    - generic [ref=e74]:
      - paragraph [ref=e75]: Bu sitedeki bilgiler genel bilgilendirme amaçlıdır; hukuki, mali veya tıbbi tavsiye değildir. Kurallar değişebilir, lütfen resmi kaynakları kontrol et.
      - navigation "Yasal bilgiler" [ref=e76]:
        - link "Impressum" [ref=e77] [cursor=pointer]:
          - /url: /tr/impressum
        - link "Datenschutz" [ref=e78] [cursor=pointer]:
          - /url: /tr/datenschutz
        - link "Sorumluluk reddi" [ref=e79] [cursor=pointer]:
          - /url: /tr/haftungsausschluss
      - navigation "Site bilgisi" [ref=e80]:
        - link "Hakkında" [ref=e81] [cursor=pointer]:
          - /url: /tr/about
        - link "Resmi bağlantılar" [ref=e82] [cursor=pointer]:
          - /url: /tr/links
        - link "İletişim" [ref=e83] [cursor=pointer]:
          - /url: /tr/contact
  - alert [ref=e84]
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { E2E_EDITOR } from "./constants";
  3   | import { db } from "./db";
  4   | import { login } from "./helpers";
  5   | 
  6   | test.describe("tools", () => {
  7   |   test("the tools hub links to every tool", async ({ page }) => {
  8   |     await page.goto("/tr/tools");
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
> 27  |     await page.getByLabel("Posta kodu ve şehir", { exact: true }).first().fill("10115 Berlin");
      |                                                                           ^ Error: locator.fill: Test timeout of 60000ms exceeded.
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
  109 |     await expect(page.getByRole("option", { name: /published.*admins only/ })).toBeDisabled();
  110 |   });
  111 | });
  112 | 
```