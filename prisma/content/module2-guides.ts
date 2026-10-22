// Turkish drafts for Module 2 (health and insurance). Written from the research of 2026-10-22.
// Every guide is created as DRAFT without a verified date. "TODO:" marks facts that still need an official source.
import type { GuideSeed } from "./module1-guides";

const GII = "https://www.gesetze-im-internet.de";

export const module2Guides: GuideSeed[] = [
  {
    slug: "health-insurance-basics",
    position: 0,
    stage: "FIRST_WEEK",
    sourceUrls: [
      `${GII}/sgb_5/__5.html`,
      `${GII}/sgb_5/__6.html`,
      `${GII}/svbezgrv_2026/BJNR1160A0025.html`,
      "https://www.krankenkassen.de/meine-krankenkasse/krankenversicherung-eu/arbeitnehmer/",
      "https://www.vdek.com/politik/was-aendert-sich/gesundheitswesen-2026/",
    ],
    title: "Almanya'da sağlık sigortası: yasal mı özel mi?",
    summary: "Sağlık sigortası zorunlu. Kimler yasal sigortaya girer, ne zaman özel sigorta seçilebilir ve prim nasıl hesaplanır?",
    body: `## Kısaca
Almanya'da sağlık sigortası **zorunludur**. Çalışanların çoğu **gesetzliche Krankenversicherung (GKV)** yani yasal sağlık sigortasına girer. Kazancın belirli bir sınırın üstündeyse **private Krankenversicherung (PKV)** yani özel sigorta da bir seçenek olur.

## Kimler için geçerli?
- **Çalışanlar:** Brüt yıllık kazancın **{{setting:jaegThreshold}}** altındaysa yasal sigortaya girmek zorundasın (2026 sınırı, **Versicherungspflichtgrenze**).
- **Sınırın üstündekiler:** Gönüllü yasal sigorta ile özel sigorta arasında seçebilirsin. Yeni bir işe sınırın üstünde düzenli yıllık maaşla başlıyorsan hemen özel sigortaya geçebilirsin. Aynı işte zam sonrası geçiş genellikle ertesi yılın başında olur ve gelirin sınırın üstünde kalması gerekir.
- **Serbest çalışanlar:** Tam zamanlı serbest çalışınca zorunlu yasal sigorta biter; özel veya gönüllü yasal sigorta seçersin.

## Yasal sigorta nasıl çalışır?
- Prim gelire bağlıdır: genel oran **{{setting:gkvGeneralRate}}** artı seçtiğin kasanın kendi ek primi (**Zusatzbeitrag**). Federal Sağlık Bakanlığı 2026 için ortalama ek primi **{{setting:gkvAvgAdditionalRate}}** olarak belirledi; bu sadece referans, her kasa kendi oranını belirler.
- Prim, aylık **{{setting:gkvContributionCeilingMonthly}}** kazanca kadar hesaplanır (üstü primi artırmaz).
- Eş ve çocuklar belli şartlarla **ücretsiz** sigortalanabilir (bkz. aile sigortası rehberi). Özel sigortada böyle bir hak yoktur.

TODO: İşveren ve çalışanın prim payını (paylaşım oranını) resmi kaynaktan ekle ve bir bordro örneği ver.

## Adım adım
1. İşe başlamadan önce bir **Krankenkasse** (sağlık sigortası kasası) seç (bkz. kasa seçimi rehberi).
2. Seçtiğin kasaya üyelik başvurusu yap (**Mitgliedserklärung**).
3. Kasa seçimini işverenine bildir. Kaynağa göre seçim için iki haftalık süre öngörülür.
4. Sigorta, iş başladığı gün başlar.

TODO: Seçim yapılmazsa yeni gelen biri için ne olduğunu doğrula (kaynak, daha önce Almanya'da sigortalı olanlar için son kasayı söylüyor).

## Gerekli belgeler
TODO: Kasanın üyelik için istediği belgeleri ve **Gesundheitskarte (eGK)** sürecini ekle.

## Maliyet ve süre
- Prim: genel oran artı kasanın ek primi (yukarıya bak).
- Sigorta kartının gelme süresi: TODO

## Sık yapılan hatalar
- Kasa seçimini işe başlayana kadar ertelemek.
- Özel sigortaya geçerken eş ve çocuk için ücretsiz aile sigortasının kalkacağını bilmemek.
- Özel sigortanın uzun vadede primlerinin nasıl değişeceğini hesaba katmamak: sözleşmenin 20-40 yıl sonra size uyup uymayacağını öngörmek zordur.

## Dikkat etmen gerekenler
- Özel sigortadan yasala dönüş her zaman kolay değildir.

TODO: Özel sigortadan yasala dönüş şartlarını (yaş, gelir, süre) resmi kaynaktan ekle.

## Sonraki adım
**Kasa seçimi** ve **aile sigortası** rehberlerine bak.
`,
  },
  {
    slug: "choose-krankenkasse",
    position: 1,
    stage: "FIRST_WEEK",
    sourceUrls: [
      "https://www.aok.de/fk/sozialversicherung/krankenkassenwahlrecht/das-muessen-arbeitgeber-wissen/",
      "https://www.vdek.com/politik/was-aendert-sich/gesundheitswesen-2026/",
    ],
    title: "Sağlık sigortası kasası nasıl seçilir? (TK, AOK, Barmer…)",
    summary: "Kasalar arasındaki farklar, ek prim ve seçim süresi.",
    body: `## Kısaca
Yasal sigortada **Krankenkasse** (sağlık sigortası kasası) seçmekte özgürsün. Kasalar kanunla belirlenen temel hizmetleri aynı sunar; farklar ek primde (**Zusatzbeitrag**), ek hizmetlerde, uygulamada, bonus programlarında ve iletişimdedir.

## Kimler için geçerli?
Yasal sigortaya giren tüm çalışanlar. Yeni bir işe başladığında kasayı seçersin.

## Neye göre seçmelisin?
- **Ek prim:** Kasalar arasında fark vardır ve her yıl değişebilir. 2026 için ortalama referans değeri **{{setting:gkvAvgAdditionalRate}}**; tek tek kasalar bunun altında veya üstünde olabilir.
- **Hizmet dili ve ulaşılabilirlik:** Yabancı dil desteği, uygulama, çevrimiçi başvuru.
- **Ek hizmetler:** Bonus programları, ek kontroller, aşılar.
- **Şubenin yakınlığı:** Gerekirse yüz yüze destek.

TODO: Büyük kasaların (TK, AOK, Barmer ve diğerleri) güncel ek primlerini ve yabancı dil desteğini kendi sayfalarından tabloya ekle (tarihli, tarafsız).

## Adım adım
1. İşe başlamadan önce kasaları karşılaştır.
2. Seçtiğin kasaya üyelik başvurusu (**Mitgliedserklärung**) gönder.
3. Seçimini işverenine bildir. Seçim için iki hafta süre öngörülür.

## Kasa değiştirme
TODO: Kasa değiştirmedeki bağlılık süresini, fesih süresini ve ek prim artışında olağanüstü fesih hakkını kanundan (SGB V § 175) doğrula.

## Sık yapılan hatalar
- Sadece reklama veya markaya bakarak seçmek.
- Üyelik başvurusunu işverene bildirimden sonraya bırakmak.

## Dikkat etmen gerekenler
Ek prim her yıl yeniden belirlenir; tabloları tarihle birlikte oku.

## Sonraki adım
**Aile sigortası** rehberine bak.
`,
  },
  {
    slug: "family-health-insurance",
    position: 2,
    stage: "FIRST_MONTH",
    sourceUrls: [`${GII}/sgb_5/__10.html`, `${GII}/svbezgrv_2026/BJNR1160A0025.html`],
    title: "Aile sigortası (Familienversicherung): eş ve çocuk ücretsiz sigortalanır mı?",
    summary: "Şartlar, gelir sınırı ve Almanya dışında yaşayan aile bireyleri.",
    body: `## Kısaca
**Familienversicherung** (aile sigortası) ile yasal sigortalı kişinin eşi ve çocukları, belli şartlarla **ek prim ödemeden** sigortalanır. Sadece yasal sigortada vardır; özel sigortada aile bireyleri ayrı sigorta ister.

## Kimler için geçerli?
Kanun (§ 10 SGB V) başlıca şu şartları arar:
- Aile bireyi **Almanya'da yaşıyor** olmalı (ikamet veya olağan oturma yeri).
- Başka bir yasal sigortası olmamalı ve tam zamanlı serbest çalışan olmamalı.
- Düzenli toplam geliri aylık sınırı aşmamalı: 2026'da **{{setting:familyInsuranceIncomeLimit}}** (minijob için **{{setting:minijobLimit}}**).
- Kindergeld, BAföG ve Elterngeld bu gelire sayılmaz (kaynağa göre, doğrulanacak).

## Almanya dışında yaşayan aile bireyleri
Kanun metni, aile bireyinin Almanya'da yaşamasını şart koşar. Eşin veya çocuğun hâlâ Türkiye'deyse genel kural olarak bu sigortadan yararlanamazsın. AB/AEA koordinasyon kuralları veya ikili sosyal güvenlik anlaşmaları istisna getirebilir.

TODO: Türkiye-Almanya sosyal güvenlik anlaşmasının aile sigortasına etkisini kasaya veya resmi kaynağa (DVKA) dayanarak doğrula; şimdilik "genel olarak yok" diye bırak.

## Adım adım
1. Eş ve çocuk Almanya'ya geldikten sonra **Anmeldung** yapsın.
2. Üyesi olduğun kasaya aile sigortası başvurusu yap.
3. Gelir ve çalışma durumunu belgele.

TODO: Kasaların istediği formu ve belgeleri ekle.

## Sık yapılan hatalar
- Eşin geliri sınırı aştığı halde aile sigortası beklemek.
- Eş çalışmaya başlayınca kasaya bildirmemek: gelir sınırı aşılırsa sigorta biter.
- Özel sigortaya geçince aile sigortası kalktığını unutmak.

## Dikkat etmen gerekenler
Gelir sınırı her yıl bir referans değere göre değişir; tutarı sitede ayarlardan güncelliyoruz.

## Sonraki adım
**Doktor ve acil durumlar** rehberine bak.
`,
  },
  {
    slug: "doctors-and-emergencies",
    position: 3,
    stage: "FIRST_MONTH",
    sourceUrls: [
      "https://www.verbraucherzentrale.de/wissen/gesundheit-pflege/aerzte-und-kliniken/termin-beim-facharzt-nach-4-wochen-so-vermittelt-sie-die-nummer-116-117-12494",
      "https://www.116117.de",
      `${GII}/sgb_5/__61.html`,
      `${GII}/sgb_5/__62.html`,
    ],
    title: "Doktora gitmek ve acil durumlar: Hausarzt, 116117, 112",
    summary: "Aile hekimi, uzman randevusu, hangi durumda hangi numara aranır ve ilaç katkı payları.",
    body: `## Kısaca
Almanya'da genelde önce bir **Hausarzt** (aile hekimi) bulunur; uzman doktora çoğunlukla bu hekim yönlendirir. Acil durumlarda ise duruma göre **112**, **116117** veya acil servis kullanılır.

## Hangi numara ne zaman?
- **112:** Yaşamı tehdit eden durumlar. Bilinç kaybı, ani nefes darlığı, yeni başlayan ani göğüs ağrısı, ağır yaralanma, zehirlenme gibi.
- **116117 (ärztlicher Bereitschaftsdienst):** Hayati tehlike olmayan ama bir sonraki güne bekleyemeyecek şikâyetler. Muayenehanelerin kapalı olduğu saatlerde (gece, hafta sonu). Numara tüm ülkede aynı, alan kodu gerekmez ve ücretsiz.
- **Bereitschaftspraxis** (nöbetçi muayenehane): Çoğu yerde randevusuz gidilebilir. Gidemiyorsan 116117'den evde ziyaret isteyebilirsin.
- **Acil servis (Notaufnahme):** Hayati tehlikesi olan hastalar içindir. Soğuk algınlığı veya ishal gibi durumlar için nöbetçi hekime gitmek gerekir.

## Doktor bulmak ve randevu almak
- Hausarzt ve çocuk doktoru için **sevk (Überweisung)** gerekmez.
- **Uzman doktor:** Genelde Hausarzt'tan sevk alırsın. 116117'nin **randevu servisi**, sevkte yazılı **12 haneli aciliyet koduyla** 4 hafta içinde uzman randevusu bulur. Göz ve kadın doğum doktorları için kod gerekmez.
- Randevu servisi telefonla (116117), çevrimiçi (E-Terminservice) veya uygulamayla çalışır; ayrıca kalıcı bir Hausarzt bulmana da yardım edebilir.

TODO: **Doctolib** ve benzeri platformlarla randevu almayı, **Gesundheitskarte (eGK)** kullanımını ve ilk muayenede neyin istendiğini kaynakla ekle.

## Katkı payları (Zuzahlung)
- 18 yaşından büyükler reçeteli ilaçta bedelin **%10'unu** öder; en az **5 €**, en fazla **10 €** (ürün fiyatından fazla olamaz).
- **18 yaş altındaki çocuklar** katkı payı ödemez (yol masrafı hariç).
- Yıllık **yük sınırı (Belastungsgrenze):** Brüt hane gelirinin **%2'si**; kronik hastalar için **%1**. Sınıra ulaşınca kasa, yıl sonuna kadar katkı payı gerekmediğini belgeler.

## Sık yapılan hatalar
- Hayati tehlike olmayan durumlarda acil servise gitmek.
- Uzman randevusu için sevk ve kodu unutmak.
- Yük sınırı belgesini kasadan istememek.

## Sonraki adım
**Sigorta piramidi** rehberine bak.
`,
  },
  {
    slug: "insurance-pyramid",
    position: 4,
    stage: "FIRST_SIX_MONTHS",
    sourceUrls: [`${GII}/pflvg/`, "https://www.verbraucherzentrale.nrw/node/14154"],
    title: "Hangi sigortalar gerekli? Zorunlu, çok önerilen, isteğe bağlı",
    summary: "Sigorta piramidi: zorunlu olanlar, çoğu kişiye önerilenler ve duruma göre gerekenler.",
    body: `## Kısaca
Almanya'da çok sigorta teklif edilir. Tüketici merkezlerinin temel ilkesi: **hayati/varlığı tehdit eden riskleri sigortala, küçük zararları kendin karşıla.** Aşağıdaki sıra bir yol gösterici; gerçek ihtiyaç kişiye göre değişir.

## 1. Zorunlu olanlar
- **Krankenversicherung** (sağlık sigortası) ve **Pflegeversicherung** (bakım sigortası).
- **Kfz-Haftpflicht** (araç trafik sigortası): kayıtlı her araç için.
- Köpek sahipleri için sorumluluk sigortası **eyalete göre** zorunlu olabilir.

## 2. Çok önerilenler (yasal zorunluluk yok)
- **Privathaftpflicht** (özel sorumluluk sigortası): Başkasına verdiğin zararı karşılar. Yasal olarak zorunlu **değildir**, ama tüketici merkezleri vazgeçilmez sayar.
- **Berufsunfähigkeitsversicherung** (meslekte çalışamama sigortası): Çalışıyorsan önerilir; ne kadar erken yapılırsa prim o kadar düşüktür. Emekliler genelde gerek duymaz.

## 3. Duruma göre
- **Hausratversicherung** (ev eşyası): Eşyası az olan paylaşımlı evlerde çoğu zaman gereksizdir; büyük kaybı karşılayamayacaksan düşün.
- **Rechtsschutzversicherung** (hukuki koruma): Zorunlu veya vazgeçilmez değil; kira veya iş hukuku gibi alanlarda seçilebilir.
- **Zahnzusatzversicherung** (tamamlayıcı diş sigortası): İsteğe bağlı.

TODO: Hausrat ve Haftpflicht için tipik yıllık prim aralığını resmi/tüketici kaynağından ekle (şu an sadece ticari kaynakta var).

## Adım adım
1. Zorunlu olanların tamam olduğundan emin ol (sağlık, bakım; araç varsa Kfz-Haftpflicht).
2. Privathaftpflicht'i değerlendir.
3. Çalışıyorsan Berufsunfähigkeit'i karşılaştır.
4. Diğerlerini ihtiyacına göre seç; tek teklifle yetinme.

## Sık yapılan hatalar
- Satıcının baskısıyla gereksiz sigorta almak.
- Sorumluluk sigortasını yasal zorunluluk sanmak: zorunlu değil ama kritik.
- Primi yalnızca fiyata bakarak karşılaştırmak: kapsamı oku.

## Dikkat etmen gerekenler
- Bu rehber genel bilgidir; sigorta danışmanlığı değildir. Belirli bir ürün veya şirket önermiyoruz.
- Sigorta aracılığı Almanya'da lisansa tabidir; ticari bağlantı varsa açıkça "Reklam" olarak işaretlenir.

## Sonraki adım
**İlk 6 ay** modülündeki banka ve Steuer-ID rehberlerine bak.
`,
  },
];
