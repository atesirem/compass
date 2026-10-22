// Turkish drafts for Module 5 (permanent residence and citizenship). Written from the research of
// 2026-10-22 (plan/07-verification-round-2.md plus new searches). Every guide is created as DRAFT.
// "TODO:" marks facts that still need an official source.
import type { GuideSeed } from "./module1-guides";

const GII = "https://www.gesetze-im-internet.de";

export const module5Guides: GuideSeed[] = [
  {
    slug: "permanent-residence-overview",
    position: 0,
    stage: "LONG_TERM",
    sourceUrls: [`${GII}/aufenthg_2004/__9.html`, `${GII}/aufenthg_2004/__9a.html`, `${GII}/aufenthg_2004/__18c.html`, `${GII}/aufenthv/__44.html`],
    title: "Süresiz oturum izni (Niederlassungserlaubnis): hangi yolla alınır?",
    summary: "Genel yol, nitelikli çalışan yolu ve Mavi Kart yolu: süreler, emeklilik primi ve ücret.",
    body: `## Kısaca
**Niederlassungserlaubnis**, süresiz oturum iznidir: süre sınırı yoktur ve çalışmaya kural olarak sınırsız izin verir. Üç ana yol vardır; hangisinin geçerli olduğu oturum izninin türüne bağlıdır.

## Üç yol
| Yol | Süre | Emeklilik primi | Not |
|-----|------|-----------------|-----|
| **Genel yol** (§ 9) | **5 yıl** oturum izni | **60 ay** | Çoğu oturum izni türü için |
| **Nitelikli çalışan** (§ 18c Abs. 1) | **3 yıl** (§ 18a, § 18b, § 18d veya § 18g izni) | **36 ay** | Yeterli Almanca |
| Nitelikli çalışan, **Almanya'da eğitimli** | **2 yıl** | **24 ay** | Almanya'da mesleki eğitim veya üniversite bitirdiysen |
| **Mavi Kart** (§ 18c Abs. 2) | **27 ay** (A1 ile) veya **21 ay** (B1 ile) | Aynı sürelerde | Bkz. Mavi Kart ile süresiz oturum rehberi |

Çocuk bakımı veya evde bakım dönemleri emeklilik primi sürelerinde sayılabilir (§ 9).

## Genel şartlar (§ 9 Abs. 2)
- Yeterli **geçim güvencesi**.
- Yeterli **Almanca** ve Almanya'nın hukuk ve toplum düzenine dair **temel bilgi**. **Integrationskurs'u** başarıyla bitirdiysen bu iki şart kanıtlanmış sayılır.
- Yeterli **konut**.
- Çalışma izni, kamu güvenliği ve diğer yasal şartlar.
- Hastalık veya engel nedeniyle karşılanamayan şartlar aranmaz. Basit Almanca konuşabiliyorsan ve Integrationskurs hakkın yoksa dil şartı da aranmaz.

TODO: § 9 Abs. 2'deki şartların tam listesini ve "yeterli Almanca"nın B1'e karşılık geldiğini § 2 Abs. 11 AufenthG ve BAMF/Ausländerbehörde kaynaklarından doğrula.

## Maliyet
Ücret, duruma göre (§ 44 AufenthV):
- Diğer tüm durumlarda: **{{setting:niederlassungFeeStandard}}**
- Serbest çalışanlar (§ 21 Abs. 4): **{{setting:niederlassungFeeSelfEmployed}}**
- Yüksek nitelikli (§ 18c Abs. 3): **{{setting:niederlassungFeeHighlyQualified}}**

TODO: 22 Temmuz 2026 tarihli kanunla yönetmelikte yapılan değişikliğin ücretleri etkileyip etkilemediğini doğrula.

## Daueraufenthalt-EU
**Daueraufenthalt-EU** (AB uzun dönem ikametgah, § 9a), süresiz oturuma benzer ve ayrıca **başka bir AB ülkesine taşınma** kolaylığı sağlar. Şartları Niederlassungserlaubnis'e yakındır ve kimi durumda biraz daha zordur. İkisi birlikte de bulunabilir.

TODO: § 9a şartlarını ve Niederlassungserlaubnis'ten farkını kanun metninden doğrula.

## Adım adım
1. Hangi yola uyduğunu belirle (oturum izninin türü ve geçen süre).
2. Emeklilik primi aylarını **Rentenversicherung** kaydından kontrol et.
3. Almanca belgeni hazırla (Integrationskurs sertifikası veya B1).
4. **Ausländerbehörde**'den randevu al ve başvur.

TODO: Başvuru belgelerini, işlem süresini ve randevu alma yolunu şehrinin Ausländerbehörde sayfasından ekle (bu araştırmada bulunamadı).

## Sık yapılan hatalar
- Emeklilik primi aylarını (ör. Mavi Kart'ta 27/21 ay) başka AB ülkesindeki sürelerle karıştırmak.
- Yeterli Almancanın hangi sertifikayla kanıtlanacağını sormamak.
- Süresiz oturum yerine vatandaşlık düşünüyorsan, ikisinin farklı şartları olduğunu unutmak.

## Sonraki adım
**Mavi Kart ile süresiz oturum** veya **vatandaşlık şartları** rehberine bak.
`,
  },
  {
    slug: "blue-card-permanent-residence",
    position: 1,
    stage: "LONG_TERM",
    sourceUrls: [`${GII}/aufenthg_2004/__18c.html`, "https://stadt.muenchen.de/service/info/auslanderbehorde/1080810/", "https://www.visaguard.berlin/blue-card-overview/blaue-karte-niederlassungserlaubnis"],
    title: "Mavi Kart ile süresiz oturum: 27 ay veya 21 ay",
    summary: "Mavi Kart sahipleri için kısa yol, emeklilik primi şartı ve Almanca düzeyi.",
    body: `## Kısaca
**Blaue Karte EU** (Mavi Kart) sahipleri, **§ 18c Abs. 2 AufenthG** uyarınca standart yoldan çok daha önce **Niederlassungserlaubnis** (süresiz oturum) alabilir.

## Süreler
- **27 ay:** Nitelikli bir işte çalışarak ve emeklilik primi ödeyerek, **basit Almanca (A1)** ile.
- **21 ay:** Aynı şartlarla, **B1 Almanca** ile.
- Eski kural daha uzundu: 33 ay (A1) ve 27 ay (B1). Bu sürelerin 2023'teki reformdan sonra kısaldığı bildirilir.

## Şartlar
- Süre boyunca **Mavi Kart** ile **nitelikli bir işte** çalışmış olmalısın.
- Aynı süre boyunca **emeklilik sigortası primi** ödenmiş olmalı; primi olmayan aylar sayılmaz.
- Çalışma kesintisiz **sosyal sigortalı** olmalı (21 ay yolunda bir kaynak bunu özellikle belirtir).
- **Başka bir AB ülkesinde** Mavi Kart ile geçirilen süreler bu 27/21 aya **sayılmaz**.

TODO: § 18c Abs. 2'deki ek şartları (geçim, konut vb.) ve süre hesaplamasında kesinti toleransını kanundan doğrula.

## Örnek zaman çizelgesi
1. Mavi Kart ile işe başlarsın (ay 0).
2. Ay 21'de B1 belgen ve 21 aylık prim kaydın varsa başvur.
3. B1 yoksa, ay 27'de A1 ile başvur.

## Adım adım
1. Prim aylarını **Rentenversicherung** kaydından kontrol et.
2. B1 sertifikanı hazırla (bkz. B1 sınavları rehberi).
3. **Ausländerbehörde**'ye başvur.

## Dikkat etmen gerekenler
- Mavi Kart sahibinin eşi için de aile birleşiminde kolaylıklar vardır (A1 belgesi istenmez, bkz. aile birleşimi rehberi).
- Süresiz oturum, vatandaşlıktan ayrı bir kazanımdır.

## Sonraki adım
**Süresiz oturum genel bakış** ve **vatandaşlık şartları** rehberine bak.
`,
  },
  {
    slug: "naturalization-requirements",
    position: 2,
    stage: "LONG_TERM",
    sourceUrls: [
      `${GII}/stag/__10.html`,
      `${GII}/stag/__9.html`,
      "https://www.bundesregierung.de/breg-de/aktuelles/kabinett-einbuergerung-2350620",
      "https://www.asyl.net/themen/staatsangehoerigkeit-und-einbuergerung/voraussetzungen-der-einbuergerung/anspruchseinbuergerung",
    ],
    title: "Alman vatandaşlığı (Einbürgerung): şartlar",
    summary: "5 yıl şartı, B1, Einbürgerungstest, geçim güvencesi ve eşi Alman olanlar için kısa yol.",
    body: `## Kısaca
**Einbürgerung**, Alman vatandaşlığına geçiştir. Kural olarak yasal hak (**Anspruchseinbürgerung**, § 10 StAG) şu şartlarla doğar. 2024 reformundan sonra çifte vatandaşlık serbesttir (bkz. çifte vatandaşlık rehberi).

## Şartlar
- **5 yıl** yasal ve olağan ikamet. (Önceden 8 yıldı.)
- **3 yıllık "özel başarı" yolu kaldırıldı:** Federal hükümetin sitesine göre kanun **30 Ekim 2025**'te yürürlüğe girdi. Eski yazılarda geçen 3 yıl artık geçerli değil.
- Geçerli bir **oturum hakkı** (**Aufenthaltstitel**) ve Almanya'da yasal ikamet.
- **Almanca: B1** (**C1 gerekmez**).
- **Einbürgerungstest** (bkz. LiD testi rehberi): 33 sorudan en az 17.
- **Geçim güvencesi:** Kendini ve bakmakla yükümlü olduklarını **Bürgergeld (SGB II) veya sosyal yardım (SGB XII)** olmadan geçindirebilmelisin. Ana istisna: şu anda **tam zamanlı** çalışıyorsan ve son 24 ayın **20 ayını tam zamanlı** çalıştıysan. Ayrıca eş ve küçük çocuklar için benzer bir kural ve eski "misafir işçi" kuşağı için bir istisna var.
- **Sabıka şartları:** Mahkumiyet yok (ayrıntılar aşağıda TODO).
- **Özgür demokratik düzene bağlılık** beyanı ve Almanya'nın tarihsel sorumluluğuna dair beyan (§ 10 Abs. 1 Nr. 1 ve 1a).
- **Hukuk ve toplum düzenine dair bilgi** (test ile kanıtlanır).

TODO: Geçim şartı istisnalarını, sabıka eşiklerini ve beyanların tam metnini § 10 StAG'den ve Federal İçişleri Bakanlığı uygulama notlarından doğrula (bu bölümün kaynakları 2023-2024 tarihli).

## Eşi Alman olanlar (§ 9 StAG)
Alman bir kişiyle evliysen: **3 yıl** ikamet ve **2 yıllık evlilik** yeterli olabilir; evlilik 3 yılı geçmişse ikamet süresi kamu yararı gerekçesiyle kısalabilir.

TODO: § 9 StAG şartlarını (Almanca, geçim, diğer) kanundan ekle.

## Ücret
Yetişkinler için **{{setting:naturalizationFeeAdult}}**, geliri olmayan küçük çocuklar için **{{setting:naturalizationFeeMinor}}**. Ücret genellikle idare istediğinde ödenir. Bazı eyaletler ücretin artırılmasını talep etti; karar alınmadı.

## Adım adım
1. Şartlara uyup uymadığını kontrol et (süre, B1, test, geçim).
2. Belgelerini hazırla (bkz. vatandaşlık başvuru süreci rehberi).
3. Einbürgerungsbehörde'ye başvur.

## Sık yapılan hatalar
- 3 yıllık yoldan söz eden eski yazılara güvenmek.
- Geçim şartı istisnasını (tam zamanlı 20/24 ay) bilmemek.
- Başvurudan önce Almanca belgesi ve test sonucunu hazırlamamak.

## Sonraki adım
**Çifte vatandaşlık ve Türkiye** ile **başvuru süreci** rehberlerine bak.
`,
  },
  {
    slug: "dual-citizenship-turkey",
    position: 3,
    stage: "LONG_TERM",
    sourceUrls: [
      "https://www.bundesregierung.de/breg-de/aktuelles/kabinett-einbuergerung-2350620",
      "https://tuerkei-recht.de/downloads/Staatsangehoerigkeit_tuerkische.pdf",
      "https://www.anwalt.de/rechtstipps/doppelte-staatsbuergerschaft-kann-ich-die-tuerkische-staatsangehoerigkeit-wieder-annehmen-ohne-die-deutsche-zu-verlieren-270655.html",
    ],
    title: "Çifte vatandaşlık ve Türkiye: Türk vatandaşlığı ve Mavi Kart (Türkiye)",
    summary: "Alman tarafında çifte vatandaşlık serbest. Türkiye tarafında ne söylenebilir, ne doğrulanmalı?",
    body: `## Kısaca
27 Haziran 2024'te yürürlüğe giren reformla Almanya'da vatandaşlığa geçerken önceki vatandaşlığı **bırakma zorunluluğu kalktı**. Yani Alman vatandaşı olurken Türk vatandaşlığını koruyabilirsin. Bu rehber Türkiye tarafının neleri içerdiğini özetler; kesin bilgi için Türk konsolosluğuna başvurmak gerekir.

## Almanya tarafı
- **Çifte vatandaşlık** genel olarak serbesttir; önceki vatandaşlıktan çıkma şartı aranmaz.
- **Çocuk için "seçim yükümlülüğü" (Optionspflicht)** kalktı (ikincil kaynağa göre; doğrulanacak).

TODO: Çifte vatandaşlık kuralının (§ 12 StAG ve ilgili değişiklik, BGBl. 2024 I Nr. 104) metnini kanundan doğrula; Optionspflicht'in kaldırıldığını da.

## Türkiye tarafı (doğrulanmadı)
İkincil kaynaklara göre:
- Türkiye çifte vatandaşlığa izin veriyor.
- Eskiden Alman vatandaşlığı için gereken "çıkma izni belgesi (Çıkma-İzin-Belgesi)" ve konsolosluktan **Beibehaltungsgenehmigung** (vatandaşlığı koruma izni) süreci, 2024 reformundan sonra gereksiz sayılıyor.
- Önceden Türk vatandaşlığını kaybedenler **Mavi Kart (Türkiye)** sahibi olabilir ya da hak sahibidir. Mavi Kart sahipleri, seçme hakkı ve devlet memurluğu dışında Türk vatandaşlarına çok yakın haklara sahiptir. Bazı kaynaklar, belirli şartlarla Türk vatandaşlığını geri alma yollarından söz eder.

TODO: Bu bölümdeki her ifadeyi Türkiye Cumhuriyeti resmi kaynaklarından (Dışişleri, Nüfus ve Vatandaşlık İşleri, konsolosluk sayfaları) doğrula; doğrulanmadan yayınlama. Mavi Kart başvuru adımları ve belgeleri ekle.

## Adım adım
1. Alman vatandaşlığı başvurusunda önceki vatandaşlığın korunacağını belirt.
2. Vatandaşlık verildikten sonra Türk konsolosluğunun güncel kurallarını öğren ve gerekli bildirimi yap.
3. Mavi Kart hakkın varsa başvur.

## Sık yapılan hatalar
- 2024 öncesi kuralları (çıkma izni) günümüze uygulamak.
- Türk tarafıyla ilgili bir işlemi konsolosluğa sormadan yapmak.

## Dikkat etmen gerekenler
Bu rehber hukuki tavsiye değildir. Kimlik, miras, askerlik, kamu görevi gibi konular için bir avukata veya konsolosluğa danış.

## Sonraki adım
**Vatandaşlık başvuru süreci** rehberine bak.
`,
  },
  {
    slug: "naturalization-process",
    position: 4,
    stage: "LONG_TERM",
    sourceUrls: [
      "https://www.innenministerium.bayern.de/assets/stmi/mui/einbürgerung.pdf",
      "https://aschaffenburg.de/dokumente/Buerger-in-Aschaffenburg/Buergerservice/Voraussetzungen-und-Checkliste.pdf",
    ],
    title: "Vatandaşlık başvurusu: belgeler, ücret ve süreç",
    summary: "Başvuru adımları, ücret ve belgelerde dikkat edilecekler; uygulama şehirden şehre farklıdır.",
    body: `## Kısaca
Başvuru, ikamet ettiğin yerdeki **Einbürgerungsbehörde** (vatandaşlık makamı) üzerinden yapılır. Belgeler, randevu ve çevrimiçi başvuru imkânı **şehirden şehre** değişir.

## Belgeler (örnek uygulamalar)
- Yabancı resmi belgeler **çevrilmiş** olmalı.
- Bazı makamlar belgelerin **aslını** ve **randevuyla** şahsen teslimini ister.
- Duruma göre ek belgeler istenebilir.

TODO: Tipik belge listesini (kimlik, doğum belgesi, Meldebescheinigung, gelir belgeleri, Almanca ve test sertifikaları, sabıka kaydı vb.) bir resmi makam kontrol listesiyle ekle. Türkiye'den gelen belgeler için (nüfus kaydı, doğum belgesi, evlilik belgesi) apostil ve çeviri şartlarını ayrıca doğrula.

## Ücret
Yetişkin için **{{setting:naturalizationFeeAdult}}**, küçük çocuk için **{{setting:naturalizationFeeMinor}}**. Ücret genellikle makamın talebinden sonra ödenir.

## Adım adım
1. Şartlara uyduğundan emin ol (bkz. vatandaşlık şartları).
2. Belgeleri hazırla, gerekirse çevirt.
3. Yaşadığın şehrin Einbürgerungsbehörde sayfasından başvuru yolunu öğren (çevrimiçi veya randevulu).
4. Başvuruyu yap, ücreti istendiğinde öde.
5. Onaydan sonra **Einbürgerungsurkunde** (vatandaşlık belgesi) alırsın; pasaport ve kimlik için başvur.
6. Türkiye tarafındaki gerekli bildirimleri yap (bkz. çifte vatandaşlık rehberi).

TODO: İşlem süresini, çevrimiçi başvuru durumunu ve tören/teslim sürecini kaynakla ekle; bu araştırmada süre bulunamadı ve şehre göre çok değişiyor.

## Sık yapılan hatalar
- Çevrilmemiş yabancı belgelerle başvurmak.
- Belgelerin asıl mı kopya mı istendiğini sormamak.
- Randevusuz gitmek.

## Dikkat etmen gerekenler
Başvuru, süresiz oturum başvurusundan ayrıdır. Almanya'da kalıcılık için süresiz oturum yeterli olabilir; vatandaşlığın ek hakları ve yükümlülükleri vardır.
`,
  },
];
