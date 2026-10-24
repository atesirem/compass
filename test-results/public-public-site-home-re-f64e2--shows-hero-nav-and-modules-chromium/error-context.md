# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public.spec.ts >> public site >> home redirects to Turkish and shows hero, nav and modules
- Location: tests/e2e/public.spec.ts:5:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('navigation', { name: 'Ana menü' }).getByRole('link')
Expected: 5
Received: 8
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" getByRole('navigation', { name: 'Ana menü' }).getByRole('link') with timeout 5000ms
  - waiting for getByRole('navigation', { name: 'Ana menü' }).getByRole('link')
    14 × locator resolved to 8 elements
       - unexpected value "8"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "Pusula" [ref=e4] [cursor=pointer]:
        - /url: /tr
      - generic [ref=e9]:
        - navigation "Dil" [ref=e10]:
          - link "TR" [ref=e11] [cursor=pointer]:
            - /url: /tr
          - link "DE" [ref=e12] [cursor=pointer]:
            - /url: /de
          - link "EN" [ref=e13] [cursor=pointer]:
            - /url: /en
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
    - generic [ref=e38]:
      - paragraph [ref=e39]: Türkçe öncelikli · Deutsch · English
      - heading "Almanya'da yönünü bul." [level=1] [ref=e40]
      - paragraph [ref=e41]: Gelmeden önceki vizeden ilk yılın bürokrasisine kadar, kaynaklı ve tarihli rehberlerle sıradaki adımı gör.
      - search [ref=e43]:
        - generic [ref=e44]: Ara
        - searchbox "Ara" [ref=e45]
        - button "Ara" [ref=e46]
      - generic [ref=e47]:
        - link "Yol haritanı oluştur" [ref=e48] [cursor=pointer]:
          - /url: /tr/roadmap
        - link "Rehberlere göz at" [ref=e49] [cursor=pointer]:
          - /url: "#modules"
    - generic [ref=e62]:
      - paragraph [ref=e63]: Rotanı seç
      - heading "Modüller" [level=2] [ref=e64]
      - list [ref=e65]:
        - listitem [ref=e66]:
          - link "01 Giriş & Vize Süreçleri Mavi Kart, çalışma vizesi, Fırsat Kartı, aile birleşimi, Kindergeld ve Kita. 5 rehber" [ref=e67] [cursor=pointer]:
            - /url: /tr/modules/pre-arrival
            - generic [ref=e68]: "01"
            - generic [ref=e69]: Giriş & Vize Süreçleri
            - generic [ref=e70]: Mavi Kart, çalışma vizesi, Fırsat Kartı, aile birleşimi, Kindergeld ve Kita.
            - generic [ref=e71]: 5 rehber
        - listitem [ref=e72]:
          - link "02 Sağlık & Sigorta Yasal ve özel sigorta, aile hekimi, Doctolib ve sigorta piramidi. 3 rehber" [ref=e73] [cursor=pointer]:
            - /url: /tr/modules/health-insurance
            - generic [ref=e74]: "02"
            - generic [ref=e75]: Sağlık & Sigorta
            - generic [ref=e76]: Yasal ve özel sigorta, aile hekimi, Doctolib ve sigorta piramidi.
            - generic [ref=e77]: 3 rehber
        - listitem [ref=e78]:
          - link "03 Dil, Kurslar & Sınavlar Integrationskurs, %50 iade, DTZ ve Leben in Deutschland testi. 3 rehber" [ref=e79] [cursor=pointer]:
            - /url: /tr/modules/language-exams
            - generic [ref=e80]: "03"
            - generic [ref=e81]: Dil, Kurslar & Sınavlar
            - generic [ref=e82]: Integrationskurs, %50 iade, DTZ ve Leben in Deutschland testi.
            - generic [ref=e83]: 3 rehber
        - listitem [ref=e84]:
          - link "04 İlk 6 Ay & Günlük Yaşam Anmeldung, vergi numarası, banka, ev bulma, SCHUFA, ehliyet ve ulaşım. 5 rehber" [ref=e85] [cursor=pointer]:
            - /url: /tr/modules/first-six-months
            - generic [ref=e86]: "04"
            - generic [ref=e87]: İlk 6 Ay & Günlük Yaşam
            - generic [ref=e88]: Anmeldung, vergi numarası, banka, ev bulma, SCHUFA, ehliyet ve ulaşım.
            - generic [ref=e89]: 5 rehber
        - listitem [ref=e90]:
          - link "05 Süresiz Oturum & Vatandaşlık Niederlassungserlaubnis ve Einbürgerung süreçleri. 4 rehber" [ref=e91] [cursor=pointer]:
            - /url: /tr/modules/residence-citizenship
            - generic [ref=e92]: "05"
            - generic [ref=e93]: Süresiz Oturum & Vatandaşlık
            - generic [ref=e94]: Niederlassungserlaubnis ve Einbürgerung süreçleri.
            - generic [ref=e95]: 4 rehber
        - listitem [ref=e96]:
          - link "06 Türkiye'den Gelenlere Özel Apostil, yeminli tercüme, diploma denkliği ve Türkiye'de kalan aile için kurallar. 2 rehber" [ref=e97] [cursor=pointer]:
            - /url: /tr/modules/turkey-specific
            - generic [ref=e98]: "06"
            - generic [ref=e99]: Türkiye'den Gelenlere Özel
            - generic [ref=e100]: Apostil, yeminli tercüme, diploma denkliği ve Türkiye'de kalan aile için kurallar.
            - generic [ref=e101]: 2 rehber
        - listitem [ref=e102]:
          - link "07 Günlük Hayat ve Pratik İpuçları Resmi tatiller, pazar sessizliği, vergi beyannamesi, Pfand ve ulaşım gibi günlük hayatın kuralları. Henüz rehber yok" [ref=e103] [cursor=pointer]:
            - /url: /tr/modules/everyday-life
            - generic [ref=e104]: "07"
            - generic [ref=e105]: Günlük Hayat ve Pratik İpuçları
            - generic [ref=e106]: Resmi tatiller, pazar sessizliği, vergi beyannamesi, Pfand ve ulaşım gibi günlük hayatın kuralları.
            - generic [ref=e107]: Henüz rehber yok
      - heading "Süreç boyunca" [level=2] [ref=e108]
      - paragraph [ref=e109]: Zaman çizelgesine göre rehberlere git.
      - list [ref=e110]:
        - listitem [ref=e111]:
          - link "Gelmeden önce" [ref=e112] [cursor=pointer]:
            - /url: /tr/timeline#pre_arrival
        - listitem [ref=e113]:
          - link "İlk hafta" [ref=e114] [cursor=pointer]:
            - /url: /tr/timeline#first_week
        - listitem [ref=e115]:
          - link "İlk ay" [ref=e116] [cursor=pointer]:
            - /url: /tr/timeline#first_month
        - listitem [ref=e117]:
          - link "İlk 6 ay" [ref=e118] [cursor=pointer]:
            - /url: /tr/timeline#first_six_months
        - listitem [ref=e119]:
          - link "Uzun vade" [ref=e120] [cursor=pointer]:
            - /url: /tr/timeline#long_term
  - contentinfo [ref=e121]:
    - generic [ref=e123]:
      - paragraph [ref=e124]: Bu sitedeki bilgiler genel bilgilendirme amaçlıdır; hukuki, mali veya tıbbi tavsiye değildir. Kurallar değişebilir, lütfen resmi kaynakları kontrol et.
      - navigation "Yasal bilgiler" [ref=e125]:
        - link "Impressum" [ref=e126] [cursor=pointer]:
          - /url: /tr/impressum
        - link "Datenschutz" [ref=e127] [cursor=pointer]:
          - /url: /tr/datenschutz
        - link "Sorumluluk reddi" [ref=e128] [cursor=pointer]:
          - /url: /tr/haftungsausschluss
      - navigation "Site bilgisi" [ref=e129]:
        - link "Hakkında" [ref=e130] [cursor=pointer]:
          - /url: /tr/about
        - link "Resmi bağlantılar" [ref=e131] [cursor=pointer]:
          - /url: /tr/links
        - link "İletişim" [ref=e132] [cursor=pointer]:
          - /url: /tr/contact
  - alert [ref=e133]
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
> 9   |     await expect(page.getByRole("navigation", { name: "Ana menü" }).getByRole("link")).toHaveCount(5);
      |                                                                                        ^ Error: expect(locator).toHaveCount(expected) failed
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
  70  |     expect((await request.get("/tr/guides/blue-card")).status()).toBe(404);
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