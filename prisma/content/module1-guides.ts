// Turkish drafts for Module 1 (pre-arrival and visas). Written from plan/07-verification-round-2.md.
// Every guide is created as DRAFT without a verified date. Lines starting with "TODO:" mark facts that
// still need an official source; they block publishing until removed.
export type GuideSeed = {
  slug: string;
  position: number;
  stage: "PRE_ARRIVAL" | "FIRST_WEEK" | "FIRST_MONTH" | "FIRST_SIX_MONTHS" | "LONG_TERM";
  sourceUrls: string[];
  title: string;
  summary: string;
  body: string;
};

const GII = "https://www.gesetze-im-internet.de";

export const module1Guides: GuideSeed[] = [
  {
    slug: "blue-card",
    position: 0,
    stage: "PRE_ARRIVAL",
    sourceUrls: [
      `${GII}/aufenthg_2004/__18g.html`,
      `${GII}/svbezgrv_2026/BJNR1160A0025.html`,
      `${GII}/aufenthg_2004/__18c.html`,
    ],
    title: "Mavi Kart (Blaue Karte EU): şartlar ve başvuru",
    summary: "Üniversite diploması olanlar için çalışma ve oturum izni: maaş eşiği, şartlar ve adımlar.",
    body: `## Kısaca
**Blaue Karte EU** (AB Mavi Kart), üniversite diploması olan nitelikli çalışanlar için Almanya'da çalışma ve oturum izni. Maaşın belirli bir eşiği geçmesi ve diplomanın Almanya'da tanınması gerekir. Aile bireyleri için kolaylıklar sunar ve süresiz oturuma kısa bir yol açar.

## Kimler için geçerli?
- Diploman Almanya'da tanınıyor veya bir Alman diplomasına denk sayılıyor olmalı (kontrol için **anabin** veritabanı; bkz. diploma denkliği rehberi).
- İş sözleşmen veya bağlayıcı iş teklifin en az 6 ay süreli olmalı.
- Brüt yıllık maaşın en az **{{setting:blueCardSalaryGeneral}}** olmalı (2026 eşiği).
- **İndirimli eşik ({{setting:blueCardSalaryReduced}}):** belirli meslek gruplarında (ISCO-08 grupları 132, 133, 134, 21, 221, 222, 225, 226, 23, 25) veya diplomanı en fazla 3 yıl önce bitirdiysen geçerli. Bu durumda **Bundesagentur für Arbeit** (Federal Çalışma Ajansı) onayı gerekir.
- **Diploması olmayan BT uzmanları:** ISCO 133 veya 25 grubunda son 7 yılda en az 3 yıl deneyim ve denk beceriyle ayrı bir yol var.
- Kanunda "eksik meslekler listesi" diye bir kavram yok. İndirimli eşik, yukarıdaki sabit meslek grupları ve yeni mezunlar içindir.

## Maaş eşiği nasıl belirlenir?
Eşik, her yıl **emeklilik sigortası prim tavanının** belirli bir yüzdesi olarak hesaplanır: genel eşik %50, indirimli eşik %45,3. Bu yüzden her yıl değişir. Başvuru yılına ait eşiğe bak; Bundesanzeiger'daki duyuru her yıl Aralık'ta yayımlanır.

## Adım adım
1. Diplomanın tanındığını kontrol et (anabin veya ilgili denklik başvurusu).
2. İş sözleşmesi veya bağlayıcı iş teklifi al. Brüt maaşın, başvuru yılındaki eşiği geçtiğinden emin ol.
3. Türkiye'den başvuruyorsan, Almanya'nın Türkiye'deki temsilciliğinde vize randevusu al (randevu için iDATA) ve başvur.
4. Gereken durumlarda Federal Çalışma Ajansı onayı, Ausländerbehörde (yabancılar dairesi) üzerinden alınır.
5. Giriş yaptıktan sonra **Anmeldung** (ikametgah kaydı) yap ve Ausländerbehörde'de oturum iznini al.

TODO: Adımların ayrıntısını ve sırasını temsilciliğin ilgili Merkblatt'ından doğrula.

## Gerekli belgeler
TODO: Temsilciliğin resmi Mavi Kart belge listesini ekle.

## Maliyet ve süre
- Vize ve oturum izni ücretleri: TODO
- İşlem süresi: TODO
- Mavi Kart'ın geçerlilik süresi: TODO

## Sık yapılan hatalar
- Başka yılın eşiğine bakmak: eşik her yıl yeniden hesaplanır.
- Sözleşmenin 6 aydan kısa olması: bu durumda Mavi Kart şartı sağlanmaz.
- Diploma denkliğini en sona bırakmak: başvuruyu geciktirebilir.

## Dikkat etmen gerekenler
- Mavi Kart sahibinin eşi için **A1 Almanca belgesi** istenmez (aile birleşimi rehberine bak).
- Süresiz oturum için kısa yol vardır: çalışmanın ve emeklilik primi ödemenin **27. ayında** (A1 Almanca ile) veya **21. ayında** (B1 Almanca ile) başvurabilirsin. Ayrıntı için süresiz oturum rehberine bak.
- Başka bir AB ülkesinde Mavi Kart ile geçirilen süreler bu 27/21 aya sayılmaz.

## Sonraki adım
Almanya'ya vardıktan sonra ilk iş **Anmeldung** rehberine bak.
`,
  },
  {
    slug: "work-visa-18b",
    position: 1,
    stage: "PRE_ARRIVAL",
    sourceUrls: [`${GII}/aufenthg_2004/__18b.html`, `${GII}/aufenthg_2004/__18.html`, `${GII}/aufenthg_2004/__18c.html`],
    title: "Nitelikli çalışan vizesi (§ 18a/§ 18b): Mavi Kart dışındaki yol",
    summary: "Maaşın Mavi Kart eşiğinin altında kalıyorsa nitelikli çalışan oturum izni ve süresiz oturuma yolu.",
    body: `## Kısaca
Mavi Kart şartlarını (maaş eşiği) sağlamıyorsan ama mesleki nitelikte bir işin varsa **Fachkräfte-Aufenthaltserlaubnis** (nitelikli çalışan oturum izni) başvurusu yapabilirsin. **§ 18b**, üniversite diploması olanlar; **§ 18a** ise mesleki eğitimi (Ausbildung) olanlar içindir.

## Kimler için geçerli?
- Niteliğine uygun, somut bir iş teklifin veya sözleşmen olmalı.
- Eğitimin Almanya'da tanınmalı veya denk sayılmalı (diploma için anabin; mesleki eğitim için ilgili tanıma kurumu).
- Meslek düzenlenmiş bir meslekse (ör. doktor, hemşire, öğretmen) gerekli meslek izni olmalı.
- Gereken durumlarda Federal Çalışma Ajansı onayı alınır.
- **45 yaş üstü:** İlk oturum izninde, yeterli yaşlılık güvencen yoksa brüt maaşın 2026 için en az **{{setting:salary45Plus}}** olması gerekir. Bu kural §§ 18a/18b içindir, Mavi Kart için değil.

## Adım adım
1. Eğitimin tanınma durumunu kontrol et (anabin veya Anerkennung).
2. Niteliğine uygun iş sözleşmesi veya bağlayıcı teklif al.
3. Türkiye'deki temsilciliğe vize başvurusu yap (randevu iDATA üzerinden).
4. Ausländerbehörde ve gerekiyorsa Federal Çalışma Ajansı süreci yürütür.
5. Girişten sonra Anmeldung ve oturum izni işlemlerini tamamla.

**Hızlandırılmış süreç (§ 81a):** İşveren, senin vekâletinle Ausländerbehörde'ye başvurup süreci hızlandırmayı seçebilir. Bu zorunlu değil; yeterli süre varsa normal süreç de işler.

TODO: Hızlandırılmış süreç ücretini ve koşullarını ilgili Ausländerbehörde veya Make it in Germany sayfasından doğrula.

## Gerekli belgeler
TODO: Temsilciliğin resmi belge listesini ekle.

## Maliyet ve süre
- Ücretler: TODO
- İşlem süresi: TODO

## Oturum izninin süresi
İzin genellikle **4 yıl** için verilir; sözleşme süresi daha kısaysa sözleşme süresi ve 6 ay. İş erken biterse geçerlilik, işin bitişinden en az 6 ay sonrasına düşebilir.

## Süresiz oturum
Bu izinle **3 yıl** sonra süresiz oturum (**Niederlassungserlaubnis**) başvurusu yapılabilir; şartlar: en az 36 ay emeklilik primi ve yeterli Almanca (B1). Almanya'da mesleki eğitim veya üniversite bitirdiysen süre 2 yıl ve 24 ay. Ayrıntı için süresiz oturum rehberine bak.

## Sık yapılan hatalar
- Mavi Kart eşiği sağlanabilecekken bu yolu seçmek: Mavi Kart'ın kısa süresiz oturum yolu vardır.
- Düzenlenmiş meslekte meslek iznini geç almak.

## Sonraki adım
Mavi Kart rehberiyle karşılaştır, sonra aile birleşimi ve Anmeldung rehberlerine bak.
`,
  },
  {
    slug: "opportunity-card",
    position: 4,
    stage: "PRE_ARRIVAL",
    sourceUrls: [
      `${GII}/aufenthg_2004/__20a.html`,
      `${GII}/aufenthg_2004/__20b.html`,
      "https://www.arbeitsagentur.de/vor-ort/zav/working-and-living-in-germany/newsletter-iss/02-2026/chancenkarte",
    ],
    title: "Fırsat Kartı (Chancenkarte): iş aramak için Almanya'ya gel",
    summary: "Puan sistemi, şartlar, finansman kanıtı ve çalışma hakları.",
    body: `## Kısaca
**Chancenkarte** (Fırsat Kartı), Almanya'da iş aramak veya diploma denkliği için adım atmak üzere verilen oturum izni (§ 20a). İki yoldan alınır: ya nitelikli çalışan (**Fachkraft**) olarak ya da **puan sistemiyle**.

## Kimler için geçerli?
- **Yol 1, Fachkraft:** Diploman veya mesleki eğitimin Almanya'da tanınmış.
- **Yol 2, puan:** En az **{{setting:chancenkarteMinPoints}} puan** gerekir; ayrıca tanınmış bir yabancı mesleki eğitim veya diploman olmalı.
- Her iki yolda: **basit Almanca (A1) veya İngilizce B2** (puan yolunda) ve geçimini sağlayabileceğini göstermen gerekir.
- Geçim kanıtı: **bloke hesap (Sperrkonto)**, ayda yaklaşık **{{setting:chancenkarteBlockedAccountMonthly}}** (2026), veya bir Verpflichtungserklärung (üçüncü kişinin yükümlülük beyanı).

TODO: Bloke hesap tutarını Auswärtiges Amt veya temsilcilik sayfasından doğrula.

## Puan tablosu (özet)
TODO: Aşağıdaki tabloyu AufenthG ekindeki (Anlage) resmi tabloyla karşılaştır; kaynak şu an Bundesagentur sayfasıdır.

- Yabancı niteliğin kısmi tanınması: 4
- Almanca: B2 = 3, B1 = 2, A2 = 1
- İngilizce C1: 1
- İş deneyimi: 5+ yıl = 3, 2+ yıl = 2
- Aranan meslek grubunda çalışma: 1
- Yaş: 35 altı = 2, 40 altı = 1
- Son 5 yılda Almanya'da en az 6 ay yasal ikamet: 1
- Eş/partner de başvuruyorsa: 1

## Adım adım
1. Hangi yola uyduğunu belirle (Fachkraft mı, puan mı).
2. Diploma/eğitim tanınma durumunu ve Almanca/İngilizce belgelerini hazırla.
3. Geçim kanıtını (bloke hesap) oluştur.
4. Temsilcilikte vize randevusu al ve başvur.
5. Girişten sonra Anmeldung yap, süreyi iş aramak için kullan.

## Neler yapabilirsin?
- Haftada en fazla **20 saate kadar** yan iş (serbest meslek değil).
- Deneme çalışması: her seferinde en fazla **2 hafta**, niteliğine uygun işe yönelik.

## Süre
- İlk kart **en fazla 1 yıl** verilir.
- Uzatma: Almanya'da niteliğine uygun bir sözleşmen veya bağlayıcı teklifin varsa ve Federal Çalışma Ajansı onayı alınırsa **en fazla 2 yıl daha**.
- Yeniden başvuru, önceki kart süresi kadar Almanya dışında kalmayı gerektirir.

## Dikkat etmen gerekenler
- Chancenkarte sahipleri **Kindergeld** hakkı kazanmaz (bkz. Kindergeld rehberi).
- Hükümet yıllık kontenjan sınırı getirebilir (§ 20a Abs. 7).

TODO: Başvuru ücretini ve temsilcilik belge listesini ekle.

## Sonraki adım
İş bulursan **§ 18a/§ 18b** veya **Mavi Kart** rehberine geç.
`,
  },
  {
    slug: "family-reunion-spouse",
    position: 5,
    stage: "PRE_ARRIVAL",
    sourceUrls: [`${GII}/aufenthg_2004/__30.html`, "https://tuerkei.diplo.de/tr-de/service/05-visaeinreise/2728584-2728584"],
    title: "Aile birleşimi: eşin Almanya'ya gelmesi (§ 30)",
    summary: "Yabancı uyruklu eşe katılma şartları, A1 Almanca belgesi ve istisnaları, Türkiye'den başvuru.",
    body: `## Kısaca
**Familiennachzug** (aile birleşimi) ile eşin, Almanya'da yaşayan eşine katılmak için vize alabilir. Bu rehber, Almanya'da yaşayan eşin **Alman vatandaşı olmadığı** durumu (§ 30 AufenthG) anlatır.

## Kimler için geçerli?
- Her iki eş de en az **18 yaşında** olmalı.
- Gelen eş **basit düzeyde Almanca** ile anlaşabilmeli (uygulamada **A1**; kanun "A1" demez, "basit Almanca" der).
- Almanya'da yaşayan eşin belirli bir oturum izni olmalı: süresiz oturum, AB uzun dönem ikametgah, **Mavi Kart**, ICT kartı gibi izinler veya belirli koşullarla başka izinler.

TODO: Konut ve geçim güvencesi şartlarını §§ 5 ve 29 AufenthG'den ekle.

## A1 belgesi gerekmeyen durumlar
Kanun yedi istisna sayar; en önemlileri:
- Almanya'daki eş **Mavi Kart**, ICT/Mobile-ICT kartı veya § 18a, § 18b gibi bazı nitelikli çalışan izinlerine sahipse.
- Gelen eş hastalık veya engel nedeniyle Almanca öğrenemiyorsa.
- Entegrasyon ihtiyacı belirgin biçimde düşükse.
- Uyruk nedeniyle uzun süreli vizesiz giriş hakkı varsa.
- Özel bireysel durumlar, Almanca öğrenmeyi gelmeden önce imkânsız veya makul olmaktan çıkarıyorsa.

TODO: § 18a, 18b ve 19c için istisnanın kapsadığı pozisyon tiplerini kanun metninden tam oku.

Mavi Kart sahibinin eşi için A1 belgesi kesin olarak istenmez.

## Türkiye'den başvuru
Almanya'nın Türkiye'deki temsilcilikleri (Merkblatt 01F) şunları ister:
- A1 Almanca belgesi (istisna yoksa)
- Türkçe belgelerin **Almanca çevirisi**
- Uluslararası evlilik cüzdanı (**Formül B**): apostil gerekmez
- **Tam Tekmil Vukuatlı Nüfus Kayıt Örneği**
- Önceki evlilikler varsa mahkeme kararı için apostil ve çeviri
- Vize ücreti: **{{setting:familyVisaFee}}**

TODO: Bu listeyi temsilcilik sayfasının güncel halinden doğrula; bazı kategorilerde başvuru Auslandsportal üzerinden yapılıyor.

## Adım adım
1. İstisna olup olmadığına bak; yoksa A1 sınavına hazırlan ve belgeni al.
2. Evlilik, nüfus kaydı ve diğer belgeleri hazırla; Almanca çevirilerini yaptır.
3. Temsilcilikte randevu al ve vize başvurusunu yap.
4. Vize onaylanınca gir, **Anmeldung** yap ve Ausländerbehörde'de oturum iznini al.

## Zor durumlar
Kanun, özel bir zorluk (**Härtefall**) halinde izin verilebileceğini söyler (§ 30 Abs. 2). Bu durum her dosyada ayrıca değerlendirilir.

## Çocuklar
TODO: Çocukların birleşimi (§ 32 AufenthG) bu taslakta henüz yok; ayrı bir bölüm olarak ekle.

## Sonraki adım
Geldikten sonra **Kita** ve **Kindergeld** rehberlerine bak.
`,
  },
  {
    slug: "kindergeld",
    position: 6,
    stage: "FIRST_MONTH",
    sourceUrls: [`${GII}/estg/__62.html`, `${GII}/estg/__63.html`, `${GII}/estg/__66.html`],
    title: "Kindergeld (çocuk parası): kimler alır, nasıl başvurulur",
    summary: "Aylık tutar, yabancılar için hangi oturum izinleri hak verir ve Türkiye'de kalan çocuk.",
    body: `## Kısaca
**Kindergeld**, çocuğu olan ebeveynlere her ay ödenen devlet yardımı. 2026'da çocuk başına ayda **{{setting:kindergeldPerChild}}**. Başvuru **Familienkasse**'ye (Federal Çalışma Ajansı'na bağlı) yapılır.

## Kimler için geçerli?
AB dışından gelenlerde hak, **oturum izninin türüne** bağlıdır (§ 62 EStG):
- **Hak veren izinler:** süresiz oturum, AB uzun dönem ikametgah, **Mavi Kart**, ICT kartı ve çalışmaya izin veren (veya vermiş olan) en az 6 ay süreli oturum izinleri. Bir nitelikli çalışan izni (§ 18a/§ 18b) bu gruba girer.
- **Hak vermeyenler veya kısıtlılar:** **Chancenkarte**, au pair, mevsimlik çalışma, ve (koşullara bağlı) öğrenim, tanınma ve iş arama izinleri. Yani Chancenkarte sahibi ve genellikle öğrenci Kindergeld alamaz.
- Hem senin hem çocuğun **vergi kimlik numarası (Steuer-ID)** olmalı.

## Çocuk nerede yaşamalı?
Çocuk **Almanya'da, bir AB ülkesinde veya AEA'da** yaşamalı. Türkiye'de kalan çocuk genellikle sayılmaz; istisna dar kapsamlıdır (ebeveynin hane halkında yaşayan çocuk gibi).

## Adım adım
1. **Anmeldung** yap ve Steuer-ID'lerin (senin ve çocuğunun) geldiğinden emin ol.
2. Oturum izninin Kindergeld hakkı veren türde olduğunu kontrol et.
3. Familienkasse'ye başvur.

TODO: Başvuru formunun adını, çevrimiçi başvuru yolunu ve gereken belgeleri Familienkasse veya Arbeitsagentur sayfasından ekle.

## Maliyet ve süre
- Tutar: çocuk başına ayda **{{setting:kindergeldPerChild}}** (2026).
- İşlem süresi: TODO

## Sık yapılan hatalar
- Steuer-ID gelmeden başvuru yapmaya çalışmak.
- Chancenkarte veya öğrenci iznine sahipken hak beklemek.
- Çocuk Türkiye'deyken başvurmak.

## Dikkat etmen gerekenler
Tutar her yıl değişebilir; 2027 tutarı henüz doğrulanmadı. Tutarı sitede ayarlardan güncelliyoruz.

## Sonraki adım
Çocuk bakımı için **Kita** rehberine bak.
`,
  },
  {
    slug: "kita-gutschein",
    position: 7,
    stage: "FIRST_SIX_MONTHS",
    sourceUrls: [
      "https://www.berlin.de/sen/jugend/familie-und-kinder/kindertagesbetreuung/kita-gutschein/",
      "https://service.berlin.de/dienstleistung/324873/standort/327383/",
    ],
    title: "Kita (kreş/anaokulu) ve Kita-Gutschein: Berlin örneği",
    summary: "Kita yeri aramak, Kita-Gutschein almak ve Berlin'de başvuru adımları; diğer eyaletlerde farklıdır.",
    body: `## Kısaca
**Kita** (Kindertagesstätte) kreş ve anaokulunun genel adı. Kayıt kuralları **eyalete ve şehre göre değişir**. Bu rehber örnek olarak **Berlin**'i anlatır; başka bir şehirdeysen ilgili Jugendamt'a veya şehir portalına bak.

## Berlin'de Kita-Gutschein
**Kita-Gutschein** (Kita bakım belgesi), çocuğunun Kita'da bakım hakkını belgeleyen belge. Başvuru, ikamet ettiğin ilçenin **Jugendamt**'ına yapılır.

**Şartlar:**
- Berlin'de ikamet
- Velayet; tüm velilerin onayı
- Çocuk en az **8 haftalık**

**Zamanlama:** İlk başvuru, bakım başlangıcından en erken **9 ay**, en geç **2 ay** önce yapılır.

## Bakım hakkı
- Çocuk **1 yaşını doldurunca** günde **7 saate kadar** yarım gün/kısmi bakım için ihtiyaç kanıtı gerekmez.
- **7 saatten fazla** bakım veya **ilk yaşta** bakım için ihtiyaç kanıtı gerekir (iş, öğrenim, eğitim veya aile durumu).
- Bakım seviyeleri: yarım gün 4-5 saat, kısmi 5-7 saat, tam gün 7-9 saat, genişletilmiş 9 saatten fazla.
- 1 yaşından itibaren **kızamık aşısı** kanıtı istenir.

## Adım adım
1. İlçendeki Jugendamt'ın çevrimiçi formunu doldur veya yazdır.
2. Tüm velilerle imzala; Jugendamt'a elden ver veya postayla gönder.
3. Gutschein postayla gelir.
4. Gutschein'le bir Kita'yla **bakım sözleşmesi** imzala.

## Maliyet
Berlin, bakımın büyük ölçüde ücretsiz olduğunu belirtiyor; yemek payı alınıyor (yaklaşık ayda 23 €). Bir Senato belgesi bazı durumlarda gelire bağlı katkıdan söz ediyor.

TODO: Güncel ücret düzenini berlin.de'den doğrula; belirsiz olan kısmı Jugendamt'a yönlendir.

## Oturum izni şartı
TODO: Belirli bir oturum izni türü şartı bulunamadı; Jugendamt'a sorulmalı.

## Dikkat etmen gerekenler
- **Diğer eyaletlerde** sistem farklıdır: Kita-Navigator, doğrudan Kita'ya kayıt veya şehir portalı. Berlin'i genelleme.
- Berlin'de yeni bir Gutschein portalı Eylül 2026 civarı için duyuruldu; hizmet sayfasında kesinti duyurusu vardı. Başvuru yolunu güncel kontrol et.
- Yer bulmak Gutschein'den ayrı bir iştir: erken ara.

## Sonraki adım
**Kindergeld** rehberine bak.
`,
  },
  {
    slug: "ausbildung-basics",
    position: 2,
    stage: "PRE_ARRIVAL",
    sourceUrls: [
      "https://www.arbeitsagentur.de/arbeiten-in-deutschland/ausbildung-in-deutschland",
      "https://www.bibb.de/mindestausbildungsverguetung",
      "https://www.ihk.de/ihklw/produkte/fachkraefte-sichern/auslaendische-auszubildende-beschaeftigen-5802148",
    ],
    title: "Ausbildung nedir? Almanya'da çift sistemli mesleki eğitim",
    summary: "Nasıl işler, ne kadar sürer, ne kadar kazandırır ve bitince ne olur.",
    body: `## Kısaca
**Ausbildung**, Almanya'da çoğu mesleğe giden **çift sistemli (duales System) mesleki eğitimdir**. Uygulama bir şirkette (**Ausbildungsbetrieb**), teori bir mesleki okulda (**Berufsschule**) yapılır; ikisi dönüşümlü ilerler. Eğitim boyunca ücret alırsın (**Ausbildungsvergütung**).

## Nasıl işler?
- **Süre:** Çoğunlukla 2 ile 3,5 yıl; genellikle 3 yıl.
- **Başlangıç:** Eğitimler çoğunlukla sabit tarihlerde, sonbahar veya ilkbaharda başlar.
- **Bitiş:** Eğitim, ilgili odanın (IHK veya HWK) bitirme sınavıyla sona erer.
- **Ücret:** Eğitim süresince aylık brüt ücret ödenir. Yasal asgari ücret, 2026'da başlayan eğitimler için yıllara göre: 1. yıl **{{setting:minTrainingPayYear1}}**, 2. yıl **{{setting:minTrainingPayYear2}}**, 3. yıl **{{setting:minTrainingPayYear3}}**, 4. yıl **{{setting:minTrainingPayYear4}}**. Toplu sözleşme (Tarifvertrag) kapsamındaki işyerleri bu asgarinin altında olan tarifeyi uygulayabilir; tarifesiz işyerleri ise sektör ve bölge tarifesinin en fazla %20 altına inebilir.
- **Maliyet:** Eğitimin kendisi ücretsizdir; kira ve yaşam masraflarını sen karşılarsın.

## Kimler için geçerli?
- **AB vatandaşları** ek izin olmadan Ausbildung yapabilir.
- **AB dışından gelenler** için vize ve oturum izni gerekir (bkz. Ausbildung vizesi rehberi).
- Çoğu işveren belirli bir **okul diploması** ister. Yabancı diplomalar resmi olarak çevrilmeli ve tanınmalıdır (**anabin**).
- Almanca düzeyi: AB dışından başvuruda genellikle en az **B1**.

TODO: Hangi mesleklerin (Ausbildungsberufe) hangi okul diplomasıyla başlanabildiğini Bundesagentur für Arbeit veya BIBB listesinden ekle.

## Adım adım
1. Bir meslek seç ve o mesleğin eğitim şartlarını öğren.
2. Okul diplomanın tanındığını kontrol et (anabin, gerekirse denklik başvurusu).
3. Almanca düzeyini B1 veya üstüne çıkar ve sertifika al.
4. **Ausbildungsplatz** (eğitim yeri) ara ve başvur: genellikle Almanca özgeçmiş ve motivasyon mektubuyla.
5. **Ausbildungsvertrag** (eğitim sözleşmesi) imzala.
6. Türkiye'den geliyorsan sözleşmeyle vize başvurusu yap.

TODO: Güvenilir ilan kaynaklarını (Bundesagentur, IHK/HWK ilan borsaları) ve başvuru belgelerinin listesini ekle.

## Eğitim bittikten sonra
- Eğitimini başarıyla bitirince mesleğinde nitelikli çalışan olarak devam edebilirsin (**§ 18a**, bkz. nitelikli çalışan rehberi).
- **Almanya'da** mesleki eğitim veya üniversite bitirenler için süresiz oturumda kısa yol vardır: 2 yıl ve 24 ay emeklilik primi. Ayrıntı süresiz oturum rehberinde.
- Eğitim sırasında verilen oturum izni, eğitimin süresiyle sınırlıdır; **Ausbildung süresiz oturum vermez**.

## Sık yapılan hatalar
- Diploma denkliğini en sona bırakmak.
- Almanca düzeyini geç hazırlamak: mesleki okullar B2 bile önerebilir.
- Sözleşme olmadan vize yoluna girmek: eğitim vizesi çoğunlukla somut bir eğitim yerini ister.

## Sonraki adım
**Ausbildung vizesi** rehberine bak.
`,
  },
  {
    slug: "ausbildung-visa-16a",
    position: 3,
    stage: "PRE_ARRIVAL",
    sourceUrls: [
      `${GII}/aufenthg_2004/__16a.html`,
      `${GII}/aufenthg_2004/__17.html`,
      "https://www.ihk.de/blueprint/servlet/resource/blob/7138474/5158607351b808c2ffccb3c420d7e872/ba-16a-aufenthg-data.pdf",
      "https://stadt.muenchen.de/service/info/aufenthaltserlaubnis-suche-nach-ausbildungsplatz/10374590/",
    ],
    title: "Ausbildung vizesi ve oturum izni (§ 16a, § 17)",
    summary: "Eğitim sözleşmesiyle oturum izni, Almanca şartı, geçim şartı ve eğitim yeri arama vizesi.",
    body: `## Kısaca
Almanya'da mesleki eğitim (**Ausbildung**) için **§ 16a AufenthG** uyarınca **Berufsausbildung oturum izni** alınır. Somut bir eğitim yerin varsa bu izin geçerlidir. Henüz eğitim yerin yoksa, yer aramak için ayrı bir izin (**§ 17**) vardır.

## § 16a: eğitim yerin varsa
- **Eğitim yeri:** Şirket içi eğitimde genellikle **Ausbildungsvertrag** (eğitim sözleşmesi) ile kanıtlanır.
- **Çalışma Ajansı onayı:** İzin, yasal şartlar sağlandığında ve **Bundesagentur für Arbeit** onayı varsa (veya onaysız çalışma mümkünse) verilir.
- **Almanca:** Uygulamada genellikle yaklaşık **B1** istenir. Mesleki okullar sıklıkla B2 önerir; bakım mesleklerinde bazen B2 gerekir (eyalete göre). Kanıt: Goethe-Institut, telc veya TestDaF gibi bir sertifika ya da işverenin tutarlılığı kontrol edilen beyanı.
- **Geçim:** Eğitim ücreti çoğu zaman yeterli olur. Bir IHK belgesi, BAföG oranına bağlı olarak aylık brüt **{{setting:trainingLivingCostsMonthly}}** tutarını veriyor (Haziran 2026 itibarıyla); indirimli veya ücretsiz konaklama hesaba katılabilir.
- **Okul diploması:** Yabancı diplomanın tanındığını göstermen gerekebilir.

TODO: Geçim tutarını ve diğer şartları § 16a metninden ve yetkili Ausländerbehörde'den doğrula; bu tutar ikincil bir kaynaktan geliyor.

## Çalışma ve süre
- Eğitim sırasında haftada **20 saate kadar** ek iş, ayrıca izin gerekmeden yapılabilir (kaynağa göre).
- Oturum izni **eğitim süresiyle sınırlı** verilir; eğitimle süresiz oturum alınmaz.

## § 17: eğitim yeri arama
**Eğitim yeri arama vizesi**, Almanya'ya gelip yerinde eğitim yeri aramana izin verir.

Kaynaklar çelişiyor:
- Münih şehri: en fazla **6 ay** ve bu sürede çalışma yok.
- Make it in Germany: giriş **9 aya kadar**, haftada **20 saate kadar** çalışma.

TODO: Süreyi, çalışma hakkını, yaş ve Almanca şartlarını § 17 metninden ve Auswärtiges Amt'tan doğrula; çelişkiyi çöz.

## Adım adım
1. Eğitim sözleşmesini imzala.
2. Almanca sertifikanı ve diploma denkliğini hazırla.
3. Türkiye'deki temsilcilikte randevu al ve vize başvurusunu yap.
4. Gereken durumda Çalışma Ajansı onayı **Ausländerbehörde** üzerinden alınır.
5. Girişten sonra **Anmeldung** yap ve oturum izni işlemlerini tamamla.

TODO: Temsilciliğin resmi belge listesini, ücretleri ve işlem süresini ekle.

## Sık yapılan hatalar
- Sözleşme olmadan § 16a başvurusu yapmak: § 16a somut eğitim yeri ister, aramak için § 17.
- Geçim şartını yalnızca maaşla değil, güncel resmi tutarla karşılaştırmamak.

## Dikkat etmen gerekenler
- Eğitim sözleşmesi feshedilirse oturum izninin durumunun ne olacağını önceden öğren.

TODO: Eğitimin feshi durumunda oturum izninin akıbetini kanuna ve güncel içtihada göre doğrula.

## Sonraki adım
**Ausbildung nedir?** rehberine geri dön veya **sağlık sigortası** rehberine bak (çırak yasal sigortaya girer).
`,
  },
];
