// Turkish drafts for Module 4 (first six months). Written from the research notes of 2026-10-22
// (plan/07-verification-round-2.md and plan/11-bank-guide.md). Every guide is created as DRAFT.
// "TODO:" marks facts that still need an official source.
import type { GuideSeed } from "./module1-guides";

const GII = "https://www.gesetze-im-internet.de";

export const module4Guides: GuideSeed[] = [
  {
    slug: "tax-id-and-tax-classes",
    position: 1,
    stage: "FIRST_MONTH",
    sourceUrls: [`${GII}/estg/__38b.html`, `${GII}/estg/__39f.html`, `${GII}/estg/__9a.html`, `${GII}/estg/__4.html`],
    title: "Steuer-ID ve vergi sınıfları (Steuerklasse I-VI)",
    summary: "Vergi kimlik numarasını nasıl alırsın, hangi vergi sınıfında olursun ve Faktorverfahren nedir?",
    body: `## Kısaca
**Steuer-ID** (vergi kimlik numarası), her kişiye bir kez verilen kalıcı numaradır. İşverenin maaşından vergi keserken bu numarayı kullanır. **Steuerklasse** (vergi sınıfı) ise maaşından ne kadar vergi kesileceğini etkiler; yıllık vergin bunun yerine beyannameyle belli olur.

## Steuer-ID nasıl gelir?
- Yurt dışından taşındıktan sonra **Anmeldung** yaptığında belediye verilerini Federal Vergi Dairesi'ne (**BZSt**) iletir; numara posta ile ikamet adresine gelir.
- Numarayı işveren senin yerine kendisi alamaz; sen vermelisin.
- İşveren senin için **ELStAM** sistemine bu numarayla kayıt yapar; ana işverende **Steuerklasse 1-5**, bu bilgi yoksa her zaman **Steuerklasse 6** uygulanır.
- Numaran henüz gelmediyse ve senin kusurun yoksa işveren **en fazla üç ay** boyunca beklenen ailevi vergi kesinti özelliklerini uygulayabilir.
- Kaybettin veya gelmedi: numara genellikle son vergi bildiriminde yazar; ayrıca ikamet ettiğin **Finanzamt** (kimlikle) veya BZSt çevrimiçi yardım eder. Yeniden gönderim yaklaşık 4 hafta sürebilir.

TODO: Numaranın Anmeldung'dan sonra kaç haftada geldiğini BZSt'nin güncel sayfasından doğrula (kaynaklar eski veya servis sağlayıcı).

## Vergi sınıfları
- **Sınıf I:** Bekârlar; evliler ama III veya IV kapsamında olmayanlar.
- **Sınıf II:** Sınıf I gibi, ayrıca tek başına çocuk büyütenler için ek indirim (**Entlastungsbetrag für Alleinerziehende**).
- **Sınıf III:** Evli, ikisi de Almanya'da tam vergi mükellefi, kalıcı ayrı değil; eşin Sınıf V'te olduğu ortak başvuruyla.
- **Sınıf IV:** Evli, ikisi de tam vergi mükellefi, kalıcı ayrı değil; evlilerde varsayılan sınıf.
- **Sınıf V:** Eşi Sınıf III'te olan kişi.
- **Sınıf VI:** İkinci ve sonraki işler.

## Faktorverfahren
Evli çiftler Sınıf III/V yerine **IV + Faktor** seçebilir: eşlerin gelirleri arasındaki fark yüzünden oluşan aylık vergi farkını azaltır. Faktör, beklenen toplam yıllık gelir vergisinin, ikisinin Sınıf IV'teki beklenen vergi toplamına oranıdır ve ancak 1'in altındaysa uygulanır.

## Beyannamede kolayca unutulanlar
- **Arbeitnehmer-Pauschbetrag:** Yıllık **{{setting:employeeAllowance}}**; kanıt göstermeden otomatik düşülür.
- **Home office günü:** Gün başına **{{setting:homeofficeDaily}}**, yılda en fazla **{{setting:homeofficeMax}}**. İşyerine gittiğin günlerde ve ayrı bir çalışma odası paketi talep edersen bu kural geçerli değildir.

## Dikkat etmen gerekenler
- "Sınıf III ve V 2030'da kaldırılacak" gibi haberler henüz kanun metninde değildir: bir reform tartışılıyor.
- Taşınma masrafları ve dil kursunun vergiden düşülebilirliği duruma bağlıdır (işle ilgiliyse).

TODO: Taşınma masrafı toplu tutarlarını (BMF yazısı) ve dil kursunun düşülebilirlik şartlarını ayrıca doğrula; şimdilik "bir Steuerberater veya Lohnsteuerhilfeverein'e danış" de.

## Adım adım
1. **Anmeldung** yap ve postadaki Steuer-ID mektubunu bekle.
2. Numarayı işverenine ilet.
3. Evliysen vergi sınıfını birlikte seçin (Finanzamt formlarıyla değişebilir).
4. Yıl sonunda vergi beyannamesi vermeyi (ELSTER) düşün.

TODO: Vergi sınıfı değiştirme adımlarını (form ve süre) Finanzamt/BMF kaynağından ekle.

## Sık yapılan hatalar
- Steuer-ID gelmeden işe başlayıp işverene bilgi vermemek: Sınıf 6 uygulanabilir.
- Evlilikte vergi sınıfını hiç düşünmemek.
`,
  },
  {
    slug: "open-bank-account",
    position: 2,
    stage: "FIRST_MONTH",
    sourceUrls: [
      "https://www.sparkasse-mittelthueringen.de/content/dam/myif/spk-mittelthueringen/work/dokumente/pdf/pdf-formulare/Checkliste_Er%C3%B6ffnung_Girokonto_EU_nichtEU_Buerger.pdf?n=true",
      "https://www.finanztip.de/podcast/startkapital/folge-1/",
      "https://www.make-it-in-germany.com/de/leben-in-deutschland/geld-versicherung/bankkonto/print",
    ],
    title: "Almanya'da banka hesabı açmak: baştan sona",
    summary: "Neden gerekli, hangi belgeler, kimlik doğrulama yöntemleri ve C24 deneyimi.",
    body: `## Kısaca
Bir Alman veya SEPA IBAN'ı, maaş, kira, sigorta ve telefon sözleşmeleri için neredeyse zorunludur. Hesap açmak, **Anmeldung**'dan sonra yapılacak ilk işlerden biridir.

## Kimler için geçerli?
Almanya'da ikamet adresi olan herkes hesap açabilir; hangi belgenin kabul edildiği bankadan bankaya değişir. AB dışından gelenlerde oturum belgesi sorulabilir (bkz. oturum kartı olmadan hesap rehberi).

## Genelde istenen belgeler
- **Pasaport** (veya kimlik).
- **Meldebescheinigung** (Anmeldung belgesi) veya ikamet adresinin kanıtı.
- **Steuer-ID** (örnek Sparkasse kontrol listesinde yer alıyor).
- **Oturum belgesi / vize** (AB dışı müşteriler için).

TODO: Bu listeyi her bankanın kendi sayfasıyla karşılaştır (bkz. banka karşılaştırması rehberi).

## Kimlik doğrulama yöntemleri
- **VideoIdent:** Uygulamada görüntülü doğrulama; şube gerekmez. Geçici belgeler çoğu zaman kabul edilmez (genel bilgi, bankaya göre değişir).
- **PostIdent:** Postane şubesinde kimlik gösterilir.
- **Şubede:** Randevuyla bankanın şubesinde.
- **Başka bir banka hesabı üzerinden:** Bazı bankalar bunu sunar.

## Adım adım
1. Anmeldung yap, Meldebescheinigung'u al.
2. Bir banka seç ve kabul ettiği belgeleri banka sayfasından kontrol et.
3. Çevrimiçi başvuruyu doldur, kimliğini doğrula.
4. IBAN'ını işverene, sigortaya ve ev sahibine ilet.

## Deneyim: C24 (kişisel deneyim, koşullar değişebilir)
TODO: Hesabın açıldığı tarihi ve kullanılan belgeleri (hangi "ikamet belgesi") ekle.

Bir kullanıcı şunu bildirdi: C24'te hesap, uygulama üzerinden pasaport ve ikamet belgesiyle online doğrulamayla yaklaşık 10-15 dakikada açıldı; şubeye gitmek gerekmedi. **Anmeldung (resmi adres kaydı) olmadan açılamadı.** Fiziksel kart hızlı geldi, Apple Pay sorunsuz çalıştı, uygulama Almanca ve İngilizce kullanıcı dostuydu. Tavsiye: Önce Anmeldung'u halledip dijital bir bankada hesap açmak; geleneksel bankaların randevu süreçlerinde vakit kaybetmemek.

TODO: C24'ün "ücretsiz", faiz ve cashback gibi güncel koşullarını C24'ün resmi sayfasından doğrula; şimdilik rehberde yazma.

## Sık yapılan hatalar
- Anmeldung'dan önce başvurmak.
- Kabul edilmeyen bir geçici belgeyle VideoIdent denemek.
- IBAN'ı işverene vermeyi geciktirmek.

## Sonraki adım
**Oturum kartı olmadan hesap** ve **Basiskonto** rehberine bak.
`,
  },
  {
    slug: "bank-account-without-residence-card",
    position: 3,
    stage: "FIRST_MONTH",
    sourceUrls: [
      "https://lxgesetze.de/zkg/31",
      "https://www.gegen-hartz.de/news/wenn-die-bank-ein-bankkonto-verweigert-das-kannst-du-jetzt-tun",
      "https://www.sparkasse-mittelthueringen.de/content/dam/myif/spk-mittelthueringen/work/dokumente/pdf/pdf-formulare/Checkliste_Er%C3%B6ffnung_Girokonto_EU_nichtEU_Buerger.pdf?n=true",
    ],
    title: "Oturum kartı olmadan banka hesabı: ne yapabilirsin? (Basiskonto hakkı)",
    summary: "Bankalar hangi belgeleri kabul ediyor, Fiktionsbescheinigung sorunu ve Basiskonto hakkı.",
    body: `## Kısaca
Almanya'da banka hesabı için bankalar kimliğini kara para aklamayı önleme kuralları (**GwG § 11**) gereği doğrulamak zorundadır. AB dışı müşterilerde birçok banka pasaporta ek olarak oturum belgesi (veya vize) ister. **Hangi belgenin kabul edildiği bankadan bankaya değişir**; tek bir kural yoktur.

## Belgeler ve uygulama
- Tipik liste (Sparkasse kontrol listesi, AB dışı müşteri): pasaport, **Meldebescheinigung**, vergi numarası ve oturum izni; kimlik yerine geçebilen bazı belgeler de listelenmiş (örneğin "Ausweisersatz" notlu eAT, Ankunftsnachweis, Duldung).
- **Fiktionsbescheinigung** (oturum başvurusu sürerken verilen geçici belge): bankalar tutarsız davranıyor; bazı bankalar kabul etmiyor veya süreci uzatıyor. BaFin bu belgeyi açıkça düzenlemiyor.
- **VideoIdent** için geçici belgeler çoğu zaman kabul edilmez (genel bilgi).
- **Anmeldung** hemen her bankada şart.

## Basiskonto hakkı (ZKG § 31)
- Tüketici hesabı sunan bankalar, hak sahibiyle **temel hesap (Basiskonto)** sözleşmesi yapmak zorundadır. Hak sahipleri: AB'de yasal olarak bulunan tüketiciler; sığınmacılar ve sınır dışı edilemeyen kişiler dahil.
- Banka başvuruyu **en geç 10 iş günü** içinde değerlendirip sözleşmeyi önermelidir ve başvuru formunu ücretsiz vermelidir.
- Ret sebepleri dardır (örneğin kişinin zaten kullanılabilir bir hesabı varsa, yanlış beyan).
- Ret olursa **BaFin**'e idari işlem başvurusu yapılabilir (ZKG § 48).
- Basiskonto için SCHUFA kontrolü gerekmez; kredili limit ve kredi kartı genelde verilmez.
- Uyarı: Pratikte kimlik belgesi sorunu Basiskonto'da da çıkabilir; bir rehber siteye göre bir banka, Fiktionsbescheinigung'u yetersiz sayarak Basiskonto başvurusunu reddetmiş.

TODO: ZKG § 33 ve § 36'dan hangi kimlik ve oturum belgelerinin istenebileceğini kanundan doğrula.

## Deneyim: C24
Bir kullanıcının bildirdiği deneyimde C24'te hesap açmak için **Anmeldung** gerekti ve hesap ikamet belgesiyle online doğrulamayla açıldı. O sırada hangi belgelerin kullanıldığı net değil.

TODO: Hesabın açıldığı tarihi, "ikamet belgesi"nin ne olduğunu (Meldebescheinigung/eAT/Fiktionsbescheinigung) ve eAT'ın olup olmadığını ekle; bu bölüm bunlarla netleşecek.

## Adım adım
1. Anmeldung yap, Meldebescheinigung'u al.
2. Bankaya **yazılı** olarak hangi belgeleri kabul ettiğini sor.
3. Kabul etmezse başka bankayı dene veya **Basiskonto** başvurusu yap (banka formu ücretsiz verir).
4. 10 iş günü içinde yanıt gelmezse veya ret olursa BaFin'e başvur.

## Sık yapılan hatalar
- Sadece bir bankayı denemek.
- Ret nedenini yazılı almamak.
- Basiskonto hakkını bilmemek.

## Sonraki adım
**Banka karşılaştırması** rehberine bak.
`,
  },
  {
    slug: "compare-banks",
    position: 4,
    stage: "FIRST_MONTH",
    sourceUrls: [
      "https://www.finanzfluss.de/vergleich/girokonto/ohne-schufa/",
      "https://www.how-to-germany.com/bank-accounts/types/",
      "https://support.n26.com/de-de/erste-schritte/konto/kann-ich-in-meinem-land-ein-n26-konto-eroffnen",
    ],
    title: "Hangi banka? Yeni gelenler için karşılaştırma",
    summary: "Dijital banka, şube bankası ve Basiskonto: nasıl karşılaştırılır; AB dışı müşteri koşulları.",
    body: `## Kısaca
Tek bir "en iyi banka" yoktur. Karşılaştırma ölçütleri: AB dışı müşteri için kabul edilen belgeler, kimlik doğrulama yöntemi (VideoIdent mi, şube mi), aylık ücret, kart ve uygulama, SCHUFA gerekliliği ve yabancı dil desteği. **Bu sayfa tarafsızdır; belirli bir banka önerilmez.**

## Üç tür
- **Dijital bankalar (C24, N26 gibi):** Çevrimiçi açılış, uygulama, şube yok.
- **Şube bankaları (Sparkasse, Commerzbank, Deutsche Bank gibi):** Genelde randevu ve şubeye gitme; AB dışı müşteriler için yazılı kontrol listeleri olabilir.
- **Basiskonto:** Hak sahiplerine bankaların vermek zorunda olduğu temel hesap.

## Bilinenler (tarihli ve kaynaklı)
TODO: Aşağıdaki tablonun her satırı bankanın kendi resmi sayfasındaki güncel bilgiyle doldurulacak ve "kontrol tarihi" sütunu eklenecek.

- **C24:** Almanya'da ikamet ve vergi mükellefiyeti şartı; kimlik doğrulama VideoIdent veya başka hesap üzerinden. Forum kullanıcıları AB dışı müşterilerden en baştan oturum belgesi istendiğini bildiriyor (doğrulanmadı). Bir kullanıcı deneyimi: Anmeldung gerekti, doğrulama 10-15 dakika sürdü.
- **N26:** Almanya'da ikamet eden müşteri, pasaport/kimlik ve video görüşme. AB dışı pasaport veya oturum izni kabulüne dair kaynak bulunamadı.
- **Sparkasse (örnek: Mittelthüringen):** AB dışı müşteri için kontrol listesi (pasaport, Meldebescheinigung, vergi numarası, oturum belgesi); şubede açılış.
- **ING, DKB, Consorsbank:** Basiskonto sunan bankalar olarak anılıyor (DKB koşullu); güncel koşullar doğrulanmadı.
- **Commerzbank, Deutsche Bank:** Yeni gelenler için kabul koşulları bulunamadı.

## SCHUFA ve limit
"SCHUFA'sız hesap", bankanın kredi bürosu kontrolü yapmaması demektir; karşılığında kredili hesap (**Dispo**) ve kredi limitli kart genelde yoktur. Yeni gelenin zaten SCHUFA geçmişi yoktur.

## Nasıl seçilir?
1. Hangi belgelere sahip olduğunu not et (pasaport, vize/eAT, Fiktionsbescheinigung, Meldebescheinigung).
2. Bankaların kendi sayfalarında AB dışı müşteri koşullarına bak.
3. Aylık ücret ve kartı karşılaştır.
4. Kabul edilmezse **Basiskonto** hakkını kullan.

## Dikkat etmen gerekenler
- Fiyatlar ve koşullar sık değişir: her bilgiyi tarihiyle oku.
- Bu karşılaştırmada ortaklık bağlantısı varsa açıkça "Reklam" olarak işaretlenir; sıralamayı komisyon belirlemez.

## Sonraki adım
**Banka hesabı açma** rehberine geri dön.
`,
  },
  {
    slug: "housing-search",
    position: 5,
    stage: "FIRST_WEEK",
    sourceUrls: [
      `${GII}/bgb/__551.html`,
      "https://www.sparkasse.de/pk/ratgeber/wohnen/mieten/mietkaution.html",
      "https://dasfinanzen.de/wie-komme-ich-an-eine-selbstauskunft",
    ],
    title: "Almanya'da ev bulmak: portallar, belgeler, depozito",
    summary: "Ev başvurusunda istenen belgeler, depozito (Kaution) kuralları ve dikkat edilecekler.",
    body: `## Kısaca
Almanya'da ev bulmak, özellikle büyük şehirlerde zaman alır. Hazır belgelerle başvurmak ve dolandırıcılık işaretlerini tanımak ilk adımdır. Kira sözleşmesi imzalanınca ev sahibi **Wohnungsgeberbestätigung** belgesini verir; bu belge **Anmeldung** için gerekir.

## Nerede aranır?
Yaygın ilan siteleri: **ImmoScout24**, **Immowelt**, **WG-Gesucht** (paylaşımlı evler için), **Kleinanzeigen**. Mahalle ağı **Nebenan.de** de ev ve eşya için kullanılır.

TODO: Bu sitelerin yabancılar için pratik farklarını ve güvenlik ipuçlarını kaynaklı ekle.

## Başvuru belgeleri
Tipik olarak şunlar istenir:
- **Mieterselbstauskunft** (kiracı bilgi formu)
- Son **3 aylık maaş bordrosu**
- **SCHUFA** belgesi (bkz. SCHUFA rehberi)
- Önceki ev sahibinden onay (**Vorvermieterbescheinigung**)
- Kimlik fotokopisi

Ev sahibi bilgi formunu genellikle **evi gördükten sonra** isteyebilir; kişisel sorular bu forma girmez.

TODO: Hangi belgelerin yasal olarak istenebileceğini ve yabancılar için işveren sözleşmesi/Mavi Kart gibi belgelerin yeri konusunu kaynakla ekle.

## Depozito (Kaution)
- En fazla **3 net soğuk kira** (**Nettokaltmiete**); fazlası geçersizdir (§ 551 BGB). Kiracı kendi isteğiyle daha fazla önerirse bu ayrı konudur.
- Kiracı depozitoyu **üç aylık eşit taksitle** ödeyebilir; ilk taksit kira başlangıcında ödenir.
- Ödeme biçimi: **Kautionskonto**, rehinli tasarruf hesabı veya banka teminat mektubu (Bürgschaft).

## Dikkat etmen gerekenler
- **Dolandırıcılık:** Evi görmeden önce depozito veya "ön ödeme" isteyen ilanlardan uzak dur.
- **Komisyon:** Emlakçı ücretini genellikle emlakçıyı görevlendiren öder (Bestellerprinzip).

TODO: Bestellerprinzip ve Mietpreisbremse'yi kanun metninden (WoVermRG, BGB) ve dolandırıcılık uyarılarını Verbraucherzentrale'den kaynakla ekle.

## Adım adım
1. Belgelerini hazırla (bordro, SCHUFA, form).
2. İlanları tara, hızlı başvur.
3. Görüş, formu doldur, sözleşmeyi dikkatle oku.
4. Depozitoyu şartlara uygun öde.
5. **Wohnungsgeberbestätigung** al ve **Anmeldung** yap.

## Sık yapılan hatalar
- Sözleşmeyi okumadan imzalamak.
- Depozito için kanunun üst sınırını bilmemek.
- Anmeldung için ev sahibinin onayını geciktirmek.

## Sonraki adım
**Anmeldung** ve **SCHUFA** rehberlerine bak.
`,
  },
  {
    slug: "schufa",
    position: 6,
    stage: "FIRST_MONTH",
    sourceUrls: ["https://www.meineschufa.de", "https://www.vergleich.de/schufa-bonitaetscheck.html", "https://www.pcwelt.de/?p=2987016"],
    title: "SCHUFA: ücretsiz veri kopyası mı, BonitätsAuskunft mı?",
    summary: "Ev başvurusu için hangi SCHUFA belgesi, ne kadar tutar ve ne kadar geçerli.",
    body: `## Kısaca
**SCHUFA**, Almanya'nın en yaygın kredi bürosudur. Ev sahipleri, bankalar ve telefon şirketleri kredibilitene buradan bakar. İki ayrı belge vardır: yalnızca bilgi amaçlı **ücretsiz veri kopyası** ve kiracı başvurusu için gereken **ücretli BonitätsAuskunft**.

## İki belge
- **Datenkopie (GDPR m. 15):** Yılda bir kez ücretsizdir. Kişisel veri bakımından çok kapsamlıdır ve **ev sahibine vermek için uygun değildir**.
- **BonitätsAuskunft / BonitätsCheck:** Ücretlidir (yaklaşık **{{setting:schufaBonitaetsAuskunftPrice}}**; satın almadan önce fiyatı kontrol et). Ev sahiplerinin istediği belge budur.

"Mieterschutz-Auskunft" resmi bir ad değildir.

## BonitätsAuskunft'un geçerliliği
Belgeyle birlikte ev sahibinin doğrulama için kullanabileceği bir kod gelir; bir kaynağa göre kod **60 gün** geçerlidir. Bazı ev sahipleri 2 veya 3 aydan eski belgeyi kabul etmez. Bu yüzden belgeyi başvurudan kısa süre önce al.

## Yeni gelenler için
Almanya'ya yeni geldiysen SCHUFA'da geçmişin yoktur; bu "olumsuz" değil "boş" anlamına gelir. Ev sahipleri bunu bordro, sözleşme ve gelir belgesiyle dengeleyebilir.

TODO: Yeni gelenler için SCHUFA'nın bilgi vermemesi durumunda ev sahibine ne sunulabileceğini kaynakla ekle; ayrıca SCHUFA'nın 17 Mart 2026'dan itibaren ücretsiz skor görüntüleme getirdiğine dair haberi (zayıf kaynak) doğrula.

## Adım adım
1. Hangisine ihtiyacın olduğunu belirle: ev başvurusu için BonitätsAuskunft.
2. SCHUFA'nın resmi sayfasından (meineschufa.de) sipariş ver.
3. Belgeyi ve doğrulama kodunu ev sahibine ilet.

## Sık yapılan hatalar
- Ücretsiz veri kopyasını ev sahibine vermek.
- Belgeyi çok erken alıp süresinin dolması.
- Sahte "ücretsiz SCHUFA" sitelerine para ödemek: resmi adresi kullan.

## Sonraki adım
**Ev bulma** rehberine geri dön.
`,
  },
  {
    slug: "driving-licence-exchange",
    position: 7,
    stage: "FIRST_SIX_MONTHS",
    sourceUrls: [
      `${GII}/fev_2010/anlage_11.html`,
      `${GII}/fev_2010/__29.html`,
      "https://service.berlin.de/dienstleistung/327537/",
    ],
    title: "Türk ehliyetini Almanya'da çevirmek (Umschreibung)",
    summary: "6 aylık süre, sınav şartı ve başvuru belgeleri (Berlin örneği).",
    body: `## Kısaca
Türkiye **Anlage 11 FeV** listesinde yer almaz; yani Türk ehliyeti AB dışı ehliyet gibi işlem görür ve Alman ehliyetine çevirmek için **teorik ve pratik sınav** gerekir. Almanya'daki ikametinin başlamasından sonra yabancı ehliyetle **6 ay** sürebilirsin.

## Süre
- Almanya'da olağan ikametin başladığı günden **6 ay** boyunca yabancı ehliyetin geçerlidir (§ 29 FeV).
- Almanya'daki toplam kalışın **12 ayı aşmayacağını** inandırıcı biçimde gösterirsen, başvuruyla süre bir kez **en fazla 6 ay** uzatılabilir.
- Sürenin tam olarak ne zaman başladığını (Anmeldung mı, ikametin fiili başlangıcı mı) kuruma sor.
- Süre dolduktan sonra o ehliyetle araç kullanmak suçtur.

## Sınav
- **Teorik ve pratik sınav** gerekir.
- **Sürücü kursu yasal zorunluluk değildir.** Uygulamada sınava başvuru genellikle bir sürücü kursu üzerinden yapılır (Berlin formu kurs ve sınav kuruluşunu soruyor).

## Başvuru belgeleri (Berlin örneği)
- Kimlik ve oturum belgesi
- Biyometrik fotoğraf
- Orijinal ehliyet
- Almanca veya İngilizce değilse çeviri
- İlk yardım belgesi
- Göz muayenesi
- Ücret: Berlin'de sınavsız 37,50 €, sınavlı 45,10 € (yalnızca idari ücret)

TODO: Ücretleri ve belge listesini yaşadığın şehrin Fahrerlaubnisbehörde sayfasından doğrula; bu liste Berlin'e aittir. Çeviri ve ilk yardım belgesi şartlarını kaynakla ekle.

## Adım adım
1. İkametinin başlangıç tarihini ve 6 ayın bitişini hesapla.
2. İlçendeki **Fahrerlaubnisbehörde** sayfasından başvuru belgelerini öğren.
3. Belgeleri hazırla (fotoğraf, ilk yardım, göz testi, çeviri).
4. Bir sürücü kursu veya sınav kuruluşuyla teorik ve pratik sınav planla.
5. Başvuruyu yap ve sınavlara gir.

## Sık yapılan hatalar
- 6 aylık süreyi kaçırmak.
- Süre dolmuşken eski ehliyetle araç kullanmak.
- Başka şehrin ücret ve belge listesine güvenmek.

## Sonraki adım
**Deutschlandticket** rehberine bak (aracın yoksa).
`,
  },
  {
    slug: "deutschlandticket",
    position: 8,
    stage: "FIRST_WEEK",
    sourceUrls: [
      "https://finanztip.de/daily/deutschlandticket-wird-2026-teurer-preis-steht-fest/",
      "https://regional.bahn.de/tickets/Deutschlandticket",
      "https://www.muenchen.de/verkehr/deutschlandticket-63-euro-ab-januar-2026",
    ],
    title: "Deutschlandticket: aylık toplu taşıma bileti",
    summary: "Fiyat, geçerlilik alanı, aboneliği iptal etme ve Jobticket.",
    body: `## Kısaca
**Deutschlandticket**, tüm Almanya'da bölgesel ve yerel toplu taşımada (otobüs, tramvay, metro, S-Bahn ve bölgesel trenler) geçerli kişisel aylık aboneliktir. Fiyat 1 Ocak 2026'dan beri aylık **{{setting:deutschlandticketPrice}}**.

## Geçerlilik
Yakın ve bölgesel trafikte geçerlidir; **ICE, IC ve EC** gibi uzun mesafe trenlerinde geçerli değildir.

## Abonelik
- **Dijital** ve **aylık iptal edilebilir** abonelik olarak sunulur (Regionalisierungsgesetz § 9).
- İptal süresi sağlayıcıya göre değişebilir; bir kaynak ayın 10'una kadar bildirimi söylüyor.

TODO: İptal süresini ulaşım birliğinin veya DB'nin resmi tarife şartlarından doğrula.

## İndirimler
- **Jobticket:** İşveren en az %25 katkı veriyorsa %5 indirim uygulanır; çalışanın ödeyeceği tutar azalır. İşveren tam katkı verirse çalışan ödemez.
- **Sosyal bilet:** Ülke genelinde bir indirim yoktur; şehre göre değişir.

TODO: Jobticket indirimini ve çalışanın ödeyeceği tutarı Deutsche Bahn'ın resmi sayfasından doğrula; belirli şehir indirimlerini şehir portallarından ekle.

## Fiyat 2027'de
2027'den itibaren fiyat bir endeksle belirlenecek. Medyada tahminler dolaşıyor ancak resmî bir tutar yok. Güncel fiyat için bu sayfadaki ayara ve resmi duyurulara bak.

## Adım adım
1. Hangi şehir ve hangi hatları kullandığını belirle.
2. Ulaşım birliğinin veya DB'nin uygulamasından abone ol.
3. Biletini dijital olarak telefona al; kontrolde göster.
4. İşverenine Jobticket olup olmadığını sor.

## Sık yapılan hatalar
- Uzun mesafe trenlerinde geçerli sanmak.
- Aboneliği iptal süresini kaçırarak bir ay fazla ödemek.

## Sonraki adım
**Rundfunkbeitrag** rehberine bak.
`,
  },
  {
    slug: "rundfunkbeitrag",
    position: 9,
    stage: "FIRST_MONTH",
    sourceUrls: ["https://www.verbraucherzentrale.nrw/rundfunkbeitrag-nrw", "https://finanztip.de/rundfunkbeitrag/"],
    title: "Rundfunkbeitrag (yayın ücreti): kaydolmak zorundasın",
    summary: "Her konut için ödenen aylık ücret, nasıl kaydolunur ve muafiyet.",
    body: `## Kısaca
**Rundfunkbeitrag** (yayın katkı payı, eski adıyla GEZ), her **konut** için ödenen aylık bir ücrettir; televizyonun veya radyonun olup olmaması önemli değildir. 2026'da aylık **{{setting:rundfunkbeitragMonthly}}** (üç ayda bir 55,08 €). Yeni taşınanların sık unuttuğu bir yükümlülüktür.

## Kimler için geçerli?
- Her konut için **bir** ücret ödenir; birden fazla kişi aynı evde yaşıyorsa ücret bölüşülebilir ama tek konut için tek ücret vardır.
- Konut için zaten ödeme yapılıyorsa (örneğin ev arkadaşın) tekrar kaydolmana gerek yoktur.
- Birden fazla yetişkinle yaşıyorsan, kimin kaydolacağını kendiniz seçersiniz.
- Özel kullanılan **ikinci konutlar** 2018'den beri ücretlendirilmez.

## Ne zaman ve nasıl?
- Konutu, taşındığın **ayın başından** itibaren kaydetmen gerekir.
- Kayıt, **ARD ZDF Deutschlandradio Beitragsservice** üzerinden çevrimiçi yapılır.

TODO: Resmi sitedeki kayıt adımlarını ve süreyi (taşınmadan sonra ne kadar sürede) Beitragsservice sayfasından doğrula.

## Muafiyet
Bürgergeld veya Grundsicherung alanlar gibi bazı gruplar başvuruyla ücretten muaf olabilir.

TODO: Muafiyet şartlarını ve gerekli kanıtları Beitragsservice'ten ekle.

## Dikkat etmen gerekenler
- Ücret 2026 sonuna kadar artırılmayacağı açıklandı; 2027 için bir öneri var ama kesin değil.
- Kayıt yapmasan bile ücret borcu doğabilir.

TODO: "Kayıt yapmasan bile borç doğar" ifadesini Beitragsservice'ten doğrula.

## Adım adım
1. Anmeldung yap.
2. Konut için Rundfunkbeitrag'ın ödenip ödenmediğini ev arkadaşlarınla kontrol et.
3. Ödenmiyorsa çevrimiçi kayıt ol.
4. Ödeme yöntemini (otomatik ödeme) seç.

## Sık yapılan hatalar
- Mektubu görmezden gelmek.
- Ev arkadaşıyla çift kayıt yapmak.
`,
  },
];
