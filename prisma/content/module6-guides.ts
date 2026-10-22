// Turkish drafts for the Turkey-specific module. Written from the research of 2026-10-22
// (plan/07-verification-round-2.md plus new searches). Every guide is created as DRAFT.
// "TODO:" marks facts that still need an official source.
import type { GuideSeed } from "./module1-guides";

export const module6Guides: GuideSeed[] = [
  {
    slug: "turkish-documents-apostille",
    position: 0,
    stage: "PRE_ARRIVAL",
    sourceUrls: [
      "https://www.auswaertiges-amt.de/de/service/fragenkatalog-node/-/606802",
      "https://bfaa.diplo.de/resource/blob/2645870/3676f50bce4d3ccae38f83a9bcfd2007/dhi-tuerkei-data.pdf",
      "https://www.hcch.net",
    ],
    title: "Türk belgeleri: apostil, Formül A/B ve nüfus kayıt örneği",
    summary: "Almanya'da hangi Türk belgesi apostil ister, hangisi ister değil ve çok dilli belgeler nasıl alınır?",
    body: `## Kısaca
Almanya'daki kurumlar (Ausländerbehörde, Einbürgerungsbehörde, elçilik) Türkiye'den gelen belgelerde çoğu zaman **belgenin gerçekliğini** isteyen bir kanıt arar. Bu kanıt belgeye göre **apostil** olabilir veya hiçbir şey gerekmeyebilir. Yanlış belgeyi almak zaman kaybettirir; önce kuruma ne istediğini sor.

## Apostil nedir?
**Apostille** (Lahey Sözleşmesi, 1961), bir belgenin gerçekliğini ve imzaya yetkili olanı doğrulayan bir ek sayfa ya da kaşedir. Sözleşmeye taraf devletlerde eski usul "legalizasyon" yerini apostile bırakır. Apostil, belgeyi veren devletin belirlediği bir makam tarafından verilir.

TODO: Türkiye'nin Lahey Apostil Sözleşmesi'ne taraf olduğunu HCCH durum tablosundan doğrula; apostili Türkiye'de hangi makamın (Valilik/Kaymakamlık) verdiğini resmi T.C. kaynağından ekle.

## Çok dilli nüfus belgeleri: apostil gerekmez
Türkiye ve Almanya, **CIEC Viyana Sözleşmesi (1976, no. 16)** gereği çok dilli personel durumu belgelerini tanır. Bu belgeler Almanya'da **her türlü şekil şartından muaftır**, yani **apostil gerekmez**:
- **Formül A:** Uluslararası doğum belgesi.
- **Formül B:** Uluslararası evlilik belgesi (**Evlenme Kayıt Örneği**).
- Ölüm belgesi (çok dilli).

Bunlar **Nüfus Müdürlüğü**'nden alınır; evliliğin kayıtlı olması gerekir. Önemli not: Türkiye'de evlenince verilen **aile cüzdanı (uluslararası aile kütüğü)** Almanya'da **tanınmaz**; onun yerine birkaç adet **Formül B** al.

## Nüfus kayıt örneği
**Nüfus Kayıt Örneği**, nüfus kaydından resmi bir çıktıdır (kısa veya uzun biçim). Aile birleşimi için temsilcilikler **Tam Tekmil Vukuatlı Nüfus Kayıt Örneği** ister. Nüfus Müdürlüğü'nden veya **e-Devlet** üzerinden alınabilir; üçüncü kişi için noter onaylı vekâlet gerekir.

TODO: Almanya'daki Einbürgerungsbehörde ve Ausländerbehörde için hangi nüfus belgesinin (kısa/uzun, Formül A/B) istendiğini ve belgenin ne kadar eski olabileceğini kurumlardan doğrula.

## Çeviri
Çok dilli formda olmayan belgeler için Almanca **yeminli çeviri** gerekir; bazı durumlarda çeviriyle birlikte apostil istenir. Ayrıntı için yeminli tercüme rehberine bak.

## Adım adım
1. Hangi kurum için ve hangi amaçla belge gerektiğini yaz.
2. Kuruma hangi belgenin (hangi formül), apostilli mi, hangi çeviriyle kabul edildiğini sor ve yazılı al.
3. Nüfus Müdürlüğü veya e-Devlet'ten Formül A/B ya da kayıt örneğini al.
4. Gerekliyse apostil iste.
5. Almanca çeviri yaptır.

## Sık yapılan hatalar
- Aile cüzdanını yeterli sanmak.
- Çok dilli belge varken gereksiz yere apostil almak, ya da tersi.
- Belgeyi çok erken alıp süresinin dolması (kurum eskilik şartı koyabilir).

## Sonraki adım
**Yeminli tercüme** ve **vatandaşlık başvuru süreci** rehberlerine bak.
`,
  },
  {
    slug: "sworn-translation",
    position: 1,
    stage: "PRE_ARRIVAL",
    sourceUrls: [
      "https://bfaa.diplo.de/resource/blob/2645870/3676f50bce4d3ccae38f83a9bcfd2007/dhi-tuerkei-data.pdf",
      "https://www.justiz-dolmetscher.de",
    ],
    title: "Yeminli tercüme: Almanya'da hangi çeviri kabul edilir?",
    summary: "Almanya'da yetkili tercüman, Türkiye'de yapılan çeviriler ve kuruma sorulacaklar.",
    body: `## Kısaca
Almanya'daki kurumlar yabancı belgeler için genellikle **resmi onaylı Almanca çeviri** ister. Hangi çevirinin kabul edildiği kuruma ve belgeye göre değişir. Bu yüzden çeviri yaptırmadan önce kuruma sormak en güvenli yoldur.

## Almanya'da kimin çevirisi geçerli?
- Almanya'daki makamlar için çeviri, **Almanya'da resmen yetkilendirilmiş (ermächtigt / öffentlich bestellt / vereidigt)** bir tercümandan veya Alman büyükelçiliğinden gelmelidir. İngilizce bunun istisnasıdır.
- Belgedeki **yabancı dildeki onaylar** (apostil, mühür) çeviriye dahil edilmelidir.
- Tercüman bulmak için **Justiz-Dolmetscher-Portal** (justiz-dolmetscher.de) kullanılır. Eyaletlere göre unvan farklı olabilir.

## Türkiye'de yapılan çeviriler
Almanya'nın Türkiye'deki temsilcilikleri, çok dilli forma sahip olmayan belgeler için **yeminli tercüman tarafından yapılmış, apostilli, resmi onaylı çeviri** ister (evlilik ve aile işlemleri için). Türkiye'deki yeminli tercümanlar sıklıkla noterlerle çalışır; bir hizmet sağlayıcıya göre noter onayı çeviriyi hem Türkiye'de hem uluslararası geçerli kılar.

TODO: Türkiye'de yapılmış (noter onaylı) bir çevirinin Almanya'daki Ausländerbehörde, Einbürgerungsbehörde ve diğer kurumlarca kabul edilip edilmediğini kurumlardan veya resmi kaynaktan doğrula. Bu bilgi şu an yalnızca çeviri şirketlerinin sayfalarından geliyor.

## Maliyet ve süre
TODO: Ortalama ücret ve süre için resmi veya tarafsız bir kaynak ekle (şu an bulunamadı).

## Adım adım
1. Kuruma sor: yabancı belgeyi hangi çeviriyle (Almanya'da yetkili tercüman mı, Türkiye'de yeminli mi) ve apostille birlikte mi kabul ediyor?
2. Belgeyi hazırla (gerekiyorsa apostil).
3. Justiz-Dolmetscher-Portal'dan yetkili bir tercüman seç veya kurumun önerdiğini kullan.
4. Çeviri, belge ve apostil birlikte teslim edilir.

## Sık yapılan hatalar
- Çeviriyi kuruma sormadan yaptırmak.
- Apostilin çeviriye girmesini unutmak.
- Çok dilli belge varken gereksiz çeviri yaptırmak.

## Sonraki adım
**Türk belgeleri ve apostil** rehberine geri dön.
`,
  },
  {
    slug: "diploma-recognition",
    position: 2,
    stage: "PRE_ARRIVAL",
    sourceUrls: [
      "https://anabin.kmk.org",
      "https://zab.kmk.org",
      "https://www.anerkennung-in-deutschland.de",
      "https://www.make-it-in-germany.com/de/arbeiten-in-deutschland/anerkennung/anerkennungsverfahren/print",
    ],
    title: "Diploma denkliği: anabin, ZAB değerlendirmesi ve meslek denkliği",
    summary: "Üç farklı şey: anabin, ZAB Zeugnisbewertung ve Anerkennung. Hangisi ne zaman gerekir?",
    body: `## Kısaca
"Diploma denkliği" tek bir işlem değildir. Almanya'da üç ayrı yol var; hangisinin gerekli olduğu **hedefe** (iş, Mavi Kart, mesleğin düzenli olması, üniversite) bağlıdır.

## 1. anabin: önce buraya bak
**anabin**, Almanya'daki ZAB'ın veritabanıdır: yabancı okulların ve diplomaların Alman sistemindeki durumunu gösterir. Birçok üniversite denkliği önce anabin'de kontrol eder. Diploman ve okulun orada Alman diplomasına denk görünmesi çoğu zaman yeterlidir.

TODO: Türk üniversiteleri ve lisans/yüksek lisans diplomalarının anabin'deki durumunu (H+, H+/-, H-) ve hangilerinin denk sayıldığını anabin'den doğrula; ayrıca Mavi Kart için anabin durumunun yeterli olup olmadığını § 18g/ilgili kaynaktan ekle.

## 2. ZAB Zeugnisbewertung (diploma değerlendirmesi)
- Diploman anabin'de yoksa veya "şartlı" görünüyorsa **ZAB**'a **Zeugnisbewertung** başvurusu yapabilirsin.
- Sadece **tamamlanmış** yüksek öğrenim için yapılır.
- Bu **karşılaştırmalı bir derecelendirmedir**, **meslek tanıması değildir**. Daha çok düzenlenmemiş meslekler için işe yarar.
- Başvuru çevrimiçi yapılır ve ZAB sitesinde hesap gerekir. Ücret: ilk başvuru **{{setting:zabFeeFirst}}**, her ek başvuru **{{setting:zabFeeFurther}}** (eski metinlerde 200/100 €). Süre genellikle **3 ay**.

## 3. Anerkennung (mesleki tanıma)
- **Meslek eğitimi** (Ausbildung) ve **düzenlenmiş meslekler** (doktor, hemşire, öğretmen vb.) için **Anerkennung** gerekir; düzenlenmemiş mesleklerde zorunlu değildir.
- 1 Nisan 2012'den beri yurt dışında alınmış, devletçe tanınmış mesleki diplomaya sahip herkesin, uyrukluk ve oturum durumundan bağımsız, diplomasının **değerlendirilmesini isteme hakkı** vardır.
- Resmi portal: **anerkennung-in-deutschland.de** (doğru kurumu bulan "Anerkennungsfinder").
- Sonuç: **tam**, **kısmi** veya **denklik yok**. Kısmi denklikte uyum eğitimi, staj veya sınav istenebilir.
- Maliyet: kurum ve mesleğe göre yaklaşık **100-600 €**, ayrıca çeviri ve onay masrafları; bazı durumlarda destek için **{{setting:recognitionSubsidyMax}}**'ya kadar iade mümkündür ve başvuru işlem başlamadan yapılmalıdır. İşlem, belgeler tamamlandıktan sonra yaklaşık **3 ay** sürer.

TODO: Maliyet ve destek bilgilerini kurumun ve Make it in Germany'nin güncel sayfasından ve destek programının resmi kaynağından doğrula.

## Hangisini ne zaman?
- **Mavi Kart (üniversite diploması):** Önce anabin; gerekirse ZAB.
- **Düzenlenmiş meslek (örn. hemşirelik, öğretmenlik):** Anerkennung şart.
- **Ausbildung veya meslek eğitimi:** Anerkennung.
- **Üniversite başvurusu:** Üniversitenin istediği değerlendirme (çoğu üniversite anabin'e bakar).

## Çeviri ve belgeler
Diploma ve transkript belgelerinin genellikle resmi çevirisi gerekir. Eksik belge veya çeviri süreci geciktirir.

TODO: Türkiye'ye özel gereken belgeleri (YÖK onayı, mühür/onay, apostil) ilgili kurumlardan doğrula.

## Adım adım
1. Hedefini belirle (iş, Mavi Kart, düzenlenmiş meslek, üniversite).
2. anabin'de diplomanı ve okulunu ara.
3. Gerekirse ZAB'a veya ilgili tanıma kurumuna başvur.
4. Belgeleri ve çevirileri tamamla.
5. Kararı bekle; kısmi denklikte uyum şartlarını öğren.

## Sık yapılan hatalar
- ZAB değerlendirmesini meslek tanıması sanmak.
- Düzenlenmiş meslekte tanımayı erken başlatmamak.
- Destek için başvuruyu işlem başladıktan sonra yapmak.

## Sonraki adım
**Mavi Kart** veya **Ausbildung** rehberlerine geri dön.
`,
  },
  {
    slug: "family-in-turkey-overview",
    position: 3,
    stage: "FIRST_MONTH",
    sourceUrls: [
      "https://www.gesetze-im-internet.de/estg/__63.html",
      "https://www.gesetze-im-internet.de/sgb_5/__10.html",
      "https://www.gesetze-im-internet.de/aufenthg_2004/__30.html",
    ],
    title: "Aile Türkiye'de kalıyorsa: Kindergeld, sağlık sigortası ve vize",
    summary: "Eşin veya çocuğun Türkiye'de olması durumunda sigorta, çocuk parası ve aile birleşimi için özet.",
    body: `## Kısaca
Eşin veya çocuğun henüz Türkiye'deyse, Almanya'daki bazı haklar **ikamet yerine** bağlıdır. Bu özet, diğer rehberlerdeki ana noktaları bir araya getirir; ayrıntı için ilgili rehberlere bak.

## Kindergeld
Çocuk **Almanya'da, bir AB ülkesinde veya AEA'da** yaşamalı (§ 63 EStG). Türkiye'de kalan çocuk **genellikle sayılmaz**; istisna dar kapsamlıdır (ebeveynin hane halkında yaşayan çocuk gibi).

TODO: Türkiye-Almanya sosyal güvenlik anlaşmasının Kindergeld'e etkisini kaynakla doğrula (şimdilik "etkisi yok" varsayımı, doğrulanmadı).

## Sağlık sigortası (aile sigortası)
Aile sigortasında aile bireyinin **Almanya'da yaşaması** şarttır (§ 10 SGB V). Türkiye'deki eş veya çocuk bu yolla sigortalanamaz; AB/AEA kuralları veya ikili anlaşmalar istisna getirebilir.

TODO: Türkiye-Almanya sosyal güvenlik anlaşmasının sağlık sigortasına etkisini kasa veya DVKA kaynağıyla doğrula.

## Vize ve aile birleşimi
Eşinin Almanya'ya gelmesi için **aile birleşimi vizesi** gerekir (§ 30 AufenthG). Çoğu durumda **A1 Almanca** belgesi istenir; Mavi Kart sahibinin eşi için bu şart aranmaz. Türkiye'deki temsilcilik belgeleri ister (çeviriler, Formül B, nüfus kayıt örneği).

## Neden önemli?
Aile Türkiye'deyken Almanya'daki bazı yardım ve sigortalar çalışmaz. Aile geldikten sonra **Anmeldung**, **sigorta**, **Kindergeld** ve **Kita** adımlarını sırayla yapman gerekir.

## Adım adım
1. Aile birleşimi vizesi için gerekenleri (A1, belgeler) hazırla.
2. Aile Almanya'ya gelince **Anmeldung** yap.
3. Aile sigortası ve Kindergeld başvurularını yap.
4. Çocuk için **Kita** veya okul kaydını yaptır.

## Sık yapılan hatalar
- Aile Türkiye'deyken Kindergeld ve aile sigortası beklemek.
- Aile birleşimi belgelerini gecikmeli hazırlamak.

## Sonraki adım
**Aile birleşimi**, **Kindergeld** ve **aile sigortası** rehberlerine bak.
`,
  },
];
