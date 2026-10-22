// Turkish drafts for Module 3 (language, courses, exams). Written from the research of 2026-10-22.
// Every guide is created as DRAFT without a verified date. "TODO:" marks facts that still need an official source.
import type { GuideSeed } from "./module1-guides";

const GII = "https://www.gesetze-im-internet.de";

export const module3Guides: GuideSeed[] = [
  {
    slug: "integration-course",
    position: 0,
    stage: "FIRST_SIX_MONTHS",
    sourceUrls: [
      `${GII}/aufenthg_2004/__44.html`,
      "https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/integrationskurse-node.html",
      "https://fimportal.de/api/v0/xzufi-services/B100019/102854636/de/pdf",
    ],
    title: "Integrationskurs: kimler katılabilir, ne kadar sürer, ne kadar tutar?",
    summary: "700 saatlik kurs, katılım hakkı, katılım payı ve ücret muafiyeti; 2026'da gönüllü katılımdaki kısıtlamalar.",
    body: `## Kısaca
**Integrationskurs** (uyum kursu), Almanca öğretir ve Almanya'nın hukuk düzeni, kültürü ve tarihi hakkında bilgi verir. Genel kurs **700 ders saatinden** oluşur (1 ders saati = 45 dakika): **600 saat dil kursu** ve **100 saat Orientierungskurs** (yönelim kursu). Dil hedefi **B1** seviyesidir. Kurs iki sınavla biter; ikisini de geçersen **Zertifikat Integrationskurs** alırsın.

## Kimler için geçerli?
Kanuna göre (§ 44 AufenthG) şu kişilerin **katılım hakkı** vardır:
- Almanya'da kalıcı olarak bulunan ve **ilk kez bir oturum izni (Aufenthaltserlaubnis)** alanlar: örneğin çalışma, aile birleşimi veya insani sebeplerle.
- Kalıcı kalma genellikle, izin en az **1 yıl** için verildiğinde veya 18 aydan uzun süredir oturum iznin varsa kabul edilir.
- Hak, oturum izninin verilişinden **1 yıl sonra sona erer.** Bu yüzden erken başvur.
- **Hak yok:** okula giden gençler, belirgin biçimde düşük entegrasyon ihtiyacı olanlar veya yeterli Almanca bilenler.

TODO: **Mavi Kart** sahiplerinin ve diğer Aufenthaltstitel türlerinin katılım hakkı olup olmadığını § 44 metninden ve BAMF sayfasından doğrula.

## 2026'da dikkat: gönüllü katılım
Kanunda hakkı olmayanlar (**§ 44 Abs. 4**) gönüllü olarak başvurabilir ve bu, boş yer ve bütçeye bağlıdır. Kaynaklara göre 2026'nın başında BAMF bu gönüllü başvuruları bütçe nedeniyle durdurdu; daha sonra yeniden açıldığı bildirildi. Bir yönetmelik değişikliğinin Temmuz 2026'da yürürlüğe girdiği ve öncelikli gruplar belirlediği bildiriliyor.

TODO: Bu gelişmeleri bamf.de'den doğrula; güncel durum rehberde net yazılmadan yayına alma.

## Maliyet
- Katılımcı payı: ders saati başına **{{setting:integrationCourseFeePerUnit}}**. Bu, BAMF'ın ödediği bedelin yarısıdır ve yönergeyle değişebilir.
- Hesaplama (doğrulanacak): 700 ders saati × ücret = yaklaşık 1.600 €.
- **Ücret muafiyeti:** İşsizlik parası, Bürgergeld veya sosyal yardım alıyorsan muafiyet başvurusu yapabilirsin. **Geriye dönük olmaz**, kurs başlamadan ve kayıtla birlikte iste.
- **%50 iade:** Kursu kendin ödediysen ve süresinde sertifikayı aldıysan BAMF'tan iade isteyebilirsin (bkz. iade rehberi).

TODO: Muafiyet başvurusunun güncel adımlarını ve işlem süresini BAMF'tan doğrula.

## Adım adım
1. Oturum izninle birlikte **katılım hakkını (Berechtigung)** al; belgeyi **Ausländerbehörde** verir.
2. Bir kurs sağlayıcısı (**Kursträger**) seç; ilçendeki sağlayıcıları BAMF'ın arama aracından bulabilirsin.
3. Kursa kayıt ol (muafiyet hakkın varsa aynı anda başvur).
4. 600 saatlik dil kursu ve 100 saatlik Orientierungskurs'u tamamla.
5. Sınavlara gir: dil sınavı (DTZ, **B1**) ve **Leben in Deutschland** testi.
6. İkisini de geçersen **Zertifikat Integrationskurs** alırsın. Bu sertifika, %50 iadenin ön şartıdır.

## Kurs çeşitleri
**Özel kurslar** (kadınlar, ebeveynler, okuma-yazma ihtiyacı olanlar) 1.000 ders saatine kadar çıkabilir. **Yoğun kurslar** daha kısadır; saat sayısı kaynaklarda farklı veriliyor (430 veya 500).

TODO: Kurs çeşitlerinin güncel saat sayılarını BAMF'tan doğrula.

## Sık yapılan hatalar
- 1 yıllık hak süresini kaçırmak.
- Muafiyeti kurs başladıktan sonra istemek: geriye dönük olmaz.
- Sınavları geçmeden iade beklemek: sertifika şart.

## Sonraki adım
**%50 iade** ve **B1 sınavları** rehberlerine bak.
`,
  },
  {
    slug: "integration-course-refund",
    position: 1,
    stage: "FIRST_SIX_MONTHS",
    sourceUrls: [
      "https://www.bayernportal.de/dokumente/leistung/3857355259192",
      "https://fimportal.de/api/v0/xzufi-services/B100019/102854640/de/pdf",
      "https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/integrationskurse-node.html",
    ],
    title: "Integrationskurs ücretinin %50'si nasıl geri alınır?",
    summary: "İade şartları, süre ve başvuru yolu.",
    body: `## Kısaca
Integrationskurs'un katılımcı payını **kendin ödediysen** ve kursu ve sınavları süresi içinde başarıyla bitirdiysen, BAMF bu payın **%50'sini** iade edebilir.

## Kimler için geçerli?
- Kursu **ödeyerek** (kısmen veya tamamen) almış olmalısın.
- **Zertifikat Integrationskurs**'u aldın: yani dil sınavını (DTZ, B1) ve **Leben in Deutschland** testini geçtin.
- Sertifikayı **süre içinde** almış olmalısın: ilk katılım hakkının verilişinden itibaren **genel veya yoğun kurslarda 2 yıl**, **özel kurslarda 3 yıl**. Bu süre, 1 Şubat 2023'ten sonra verilen katılım hakları için aktarılan bilgidir.
- **İade yok:** kursu baştan sona ücretsiz aldıysan veya sertifikayı alamadıysan.
- Kursun bir kısmında muafiyetin varsa iade **orantılı** yapılır.

TODO: 2 ve 3 yıllık sürenin ve 1 Şubat 2023 tarihinin güncel BAMF/IntV metnindeki karşılığını doğrula.

## Adım adım
1. Kursu bitir ve sertifikayı al.
2. Kurs ödemelerinin belgelerini (makbuz, banka dekontu) sakla.
3. **BAMF'a başvur:** Bundesverwaltung portalından çevrimiçi veya yazılı olarak.
4. Çevrimiçi başvuru için **eID (kimlik/oturum kartının çevrimiçi kimlik işlevi ve PIN)** veya ELSTER yazılım sertifikası gerekir.
5. BAMF eksik belge isteyebilir, sonra karar verir. Olumluysa iade, belirttiğin banka hesabına yapılır.

TODO: Başvuru formunun adını, gerekli belgelerin tam listesini ve işlem süresini BAMF'tan ekle.

## Muafiyet mi, iade mi?
Bürgergeld, işsizlik parası veya sosyal yardım alıyorsan iade yerine **ücret muafiyeti** iste. Muafiyet **kurs başlamadan** ve kayıtla birlikte istenmelidir; geriye dönük olmaz. İade ise ödediğin ücretler için geçerlidir.

## Sık yapılan hatalar
- Sürenin sayacının katılım hakkının verildiği tarihte başladığını bilmemek.
- Makbuzları saklamamak.
- eID PIN'ini öğrenmeden çevrimiçi başvuruya kalkışmak.

## Sonraki adım
**Leben in Deutschland testi** rehberine bak.
`,
  },
  {
    slug: "b1-german-exams",
    position: 2,
    stage: "FIRST_SIX_MONTHS",
    sourceUrls: [
      "https://www.goethe.de/ins/rw/de/spr/prf/gzb1.cfm",
      "https://www.goethe.de/pro/relaunch/prf/pt/Durchfuehrungsbestimmungen_B1.pdf",
      "https://migrando.de/blog/einbuergerung/sprachzertifikat/",
    ],
    title: "B1 Almanca sınavları: DTZ, Goethe, telc ve hangisi kabul edilir?",
    summary: "B1 sertifikalarının nerede gerektiği, sınav yapısı ve doğrulanması gerekenler.",
    body: `## Kısaca
**B1** düzeyi, Almanya'da birçok işlem için istenir: süresiz oturum, vatandaşlık ve Integrationskurs'un bitişi. B1'i farklı sınavlarla kanıtlayabilirsin; hangisinin kabul edildiğini **başvuracağın kuruma** sormak gerekir.

## Kimler için geçerli?
- **Integrationskurs katılımcıları:** Dil kursu **DTZ (Deutsch-Test für Zuwanderer)** ile biter. Bu sınav, kursun bitiş sınavının dil bölümüdür.
- **Kursa girmeyenler:** B1 için Goethe-Institut veya telc gibi sağlayıcıların B1 sınavlarına girebilirsin.
- **B1'in gerekli olduğu yerler:** Süresiz oturum (Mavi Kart sahiplerinde B1, bekleme süresini 27 aydan 21 aya indirir; diğer yollarda B1 aranır) ve Einbürgerung (vatandaşlık).

## Goethe-Zertifikat B1 (örnek yapı)
Goethe'nin kendi bilgisine göre sınav dört modülden oluşur ve ayrı ayrı veya birlikte alınabilir:
- **Lesen** (okuma) yaklaşık 65 dakika
- **Hören** (dinleme) yaklaşık 40 dakika
- **Schreiben** (yazma) 60 dakika
- **Sprechen** (konuşma): çiftli sınavda yaklaşık 15, tekli sınavda yaklaşık 10 dakika

Dört modülü bir sınav tarihinde veya bir yıl içinde geçersen tüm modülleri gösteren bir belge alırsın. Goethe, bu sertifikayı **süresiz oturum** ve **vatandaşlık** için kanıt olarak gösterir.

## DTZ
TODO: DTZ'nin sınav yapısını, süresini, geçme şartlarını ve tekrar kurallarını telc veya Goethe/BAMF'ın resmi sayfasından ekle (bu araştırmada bulunamadı).

## Hangi sertifika kabul edilir?
- Kabul listesi kuruma göre değişebilir. Vatandaşlık için **Einbürgerungsbehörde**, süresiz oturum için **Ausländerbehörde** doğru adrestir.
- telc ve DTZ sertifikalarının tüm kurumlarda kabul edilip edilmediği bu araştırmada doğrulanmadı.

TODO: Vatandaşlık ve süresiz oturum için kabul edilen B1 sertifikalarının resmi listesini (BAMF/Bundesministerium des Innern/ilgili yönetmelik) ekle.

## Adım adım
1. Hangi kurum için B1 gerektiğini belirle.
2. O kuruma kabul edilen sertifikayı sor ve yazılı al.
3. Kursa ya da sınava hazırlan ve sınava kaydol.
4. Sertifikanın aslını sakla; başvuruda genellikle kopya veya asıl istenir.

## Sık yapılan hatalar
- Sertifikayı almadan önce kurumun kabul edip etmediğini sormamak.
- Sertifikanın geçerlilik süresi olduğunu varsaymak: bu kurum ve sağlayıcıya göre değişir.

## Sonraki adım
**Leben in Deutschland testi** rehberine bak.
`,
  },
  {
    slug: "life-in-germany-test",
    position: 3,
    stage: "LONG_TERM",
    sourceUrls: [
      `${GII}/inttestv/__10.html`,
      "https://www.vhs-saarbruecken.de/fileadmin/user_upload/DaF/EB_Informationsblatt_2026.pdf",
      "https://service.berlin.de/dienstleistung/351180/",
    ],
    title: "Leben in Deutschland testi ve Einbürgerungstest",
    summary: "İki sınavın farkı, soru sayısı, geçme notu (15 ve 17), kayıt ve ücret.",
    body: `## Kısaca
**Leben in Deutschland** testi, Almanya'nın hukuk düzeni, toplumu ve tarihi hakkında çoktan seçmeli bir sınavdır. Aynı soru havuzu iki amaçla kullanılır:
- **Orientierungskurs testi:** Integrationskurs'un bitiş sınavının ikinci bölümü.
- **Einbürgerungstest:** Vatandaşlık başvurusu için.
İkisinde de geçme notu farklıdır.

## Geçme notları
- **Orientierungskurs testi:** 33 sorudan en az **15** doğru.
- **Einbürgerungstest:** 33 sorudan en az **17** doğru (Einbürgerungstestverordnung § 10).

## Sınav nasıl?
- **33 soru**; bunların **30'u tüm Almanya için**, **3'ü yaşadığın eyalet için**.
- Her sorunun dört cevap seçeneği var; süre **60 dakika** olarak aktarılıyor.
- Soru kataloğu toplam **310 sorudur**: 300 federal, her eyalet için 10 soru.
- Resmi soru kataloğu ve çevrimiçi alıştırma BAMF'ın sitesindedir.

TODO: Orientierungskurs testinin süresini ve yapısını BAMF'tan doğrula (bu araştırmada Einbürgerungstest kaynaklıdır).

## Kimler için geçerli?
- **Integrationskurs** alıyorsan Orientierungskurs testi kursun parçasıdır.
- **Vatandaşlık** için Einbürgerungstest gerekir. Bazı kişiler testten muaf olabilir.

TODO: Einbürgerungstest muafiyet durumlarını (örneğin Almanya'da okul bitirenler) § 10 StAG ve BAMF'tan doğrula.

## Maliyet
Einbürgerungstest ücreti deneme başına yaklaşık **{{setting:einbuergerungstestFee}}** olarak aktarılıyor. Ücret sağlayıcıya göre değişebilir.

## Adım adım (Einbürgerungstest)
Berlin'deki VHS uygulamasına göre; başka şehirlerde ayrıntılar farklı olabilir.

1. Bir **Volkshochschule (VHS)** veya yetkili sınav yerinde sınav kaydı için randevu al.
2. Kayıtta **Teilnehmermeldebogen** formunu doldur (VHS yardım eder); geçerli bir kimlik belgesi gerekir.
3. Ücreti öde ve **kayıt onayını** al; sınav günü yanında getir.
4. Sınava gir. Geçersen BAMF kişisel sonucunu belgeleyen **bir belge** verir.
5. Geçemezsen testi tekrarlayabilirsin.

TODO: Sınav tarihlerinin nasıl bildirildiğini ve sonuç belgesinin süresini BAMF'tan doğrula.

## Sık yapılan hatalar
- İki sınavın geçme notlarını karıştırmak (15 ve 17).
- Eyalet sorularını (3 soru) hazırlamamak.
- Kimliği unutmak.

## Sonraki adım
Vatandaşlık şartlarını **süresiz oturum ve vatandaşlık** modülündeki rehberlerden oku.
`,
  },
];
