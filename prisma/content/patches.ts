// Additions to guides that already exist in the database. Each patch inserts a section before an anchor
// line, only once (detected by the marker), so repeated runs and manual edits are safe.
export type ContentPatch = {
  slug: string;
  locale: string;
  marker: string; // the inserted section's heading; if it is already in the text, the patch is skipped
  before: string; // insert directly before this heading
  section: string;
};

export const contentPatches: ContentPatch[] = [
  {
    slug: "anmeldung",
    locale: "tr",
    marker: "## Süre ve yaptırım",
    before: "## Sonuç",
    section: `## Süre ve yaptırım
Kanuna göre (§ 17 BMG) taşındıktan sonra **iki hafta** içinde kayıt yaptırman gerekir. Ev sahibinin de taşınmanı aynı süre içinde yazılı veya elektronik olarak onaylaması gerekir (**Wohnungsgeberbestätigung**, § 19 BMG). Geç kalırsan para cezası verilebilir; kaynaklara göre üst sınır **1.000 €**'dur (§ 54 BMG). Resmi bir ev sahibi onay şablonu yoktur, sadece formlar vardır.

`,
  },
  {
    slug: "anmeldung",
    locale: "de",
    marker: "## Frist und Folgen",
    before: "## Ergebnis",
    section: `## Frist und Folgen
Nach dem Gesetz (§ 17 BMG) musst du dich innerhalb von **zwei Wochen** nach dem Einzug anmelden. Dein Vermieter muss den Einzug innerhalb derselben Frist schriftlich oder elektronisch bestätigen (**Wohnungsgeberbestätigung**, § 19 BMG). Bei Verspätung kann ein Bußgeld verhängt werden; laut Quellen bis zu **1.000 Euro** (§ 54 BMG). Eine amtliche Vorlage für die Bestätigung gibt es nicht, nur Vordrucke.

`,
  },
  {
    slug: "anmeldung",
    locale: "en",
    marker: "## Deadline and penalty",
    before: "## Result",
    section: `## Deadline and penalty
By law (§ 17 BMG) you must register within **two weeks** of moving in. Your landlord must confirm your move-in in writing or electronically within the same period (**Wohnungsgeberbestätigung**, § 19 BMG). A late registration can be fined; according to sources up to **1,000 euros** (§ 54 BMG). There is no official template for the confirmation, only forms.

`,
  },
  {
    slug: "work-visa-18b",
    locale: "tr",
    marker: "## Ausbildung yoluyla gelmek",
    before: "## Sık yapılan hatalar",
    section: `## Ausbildung yoluyla gelmek
Üniversite diplomanın veya mesleki eğitimin yoksa, Almanya'da **Ausbildung** (çift sistemli mesleki eğitim) yaparak da bu yola girebilirsin: eğitim için **§ 16a** ile oturum izni alırsın, eğitimi bitirince **§ 18a** ile nitelikli çalışan olarak devam edersin. Ayrıntı için **Ausbildung nedir?** ve **Ausbildung vizesi** rehberlerine bak.

`,
  },
  {
    slug: "kindergeld",
    locale: "tr",
    marker: "## Çocuğun mesleki eğitimi (Ausbildung)",
    before: "## Maliyet ve süre",
    section: `## Çocuğun mesleki eğitimi (Ausbildung)
Çocuğun 18 yaşından sonra **ilk mesleki eğitimini (Ausbildung)** yapıyorsa Kindergeld genellikle **25 yaşına kadar** sürer. Çocuğun Almanya'da, bir AB ülkesinde veya AEA'da yaşaması şartı aynen geçerlidir.

Çocuğun kendi geliri konusunda kaynaklar çelişiyor: biri yıllık 8.004 € sınırından söz ediyor, diğeri bu sınırın 1 Ocak 2012'de kalktığını söylüyor.

TODO: Çocuğun gelir sınırını ve çalışma saati kuralını § 32 Abs. 4 EStG ve Familienkasse'den doğrula.

`,
  },
  {
    slug: "family-health-insurance",
    locale: "tr",
    marker: "## Çocuğun Ausbildung'u",
    before: "## Sık yapılan hatalar",
    section: `## Çocuğun Ausbildung'u
Çocuğun **Ausbildung** yapıyorsa kural değişir: çırak, eğitim sözleşmesinin başlamasıyla kendi adına **zorunlu sigortalı** olur (sağlık, bakım, emeklilik, işsizlik) ve ebeveynin aile sigortası **sona erer**. **Okul ve üniversite öğrencileri** ise aile sigortasında 25 yaşına kadar kalabilir.

TODO: § 10 Abs. 2 SGB V'den yaş sınırlarını ve çırak için aile sigortasının tam şartlarını doğrula.

`,
  },
  {
    slug: "health-insurance-basics",
    locale: "tr",
    marker: "## Çıraklar (Auszubildende)",
    before: "## Yasal sigorta nasıl çalışır?",
    section: `## Çıraklar (Auszubildende)
**Ausbildung** yapıyorsan, eğitim sözleşmesinin başladığı andan itibaren yasal sağlık, bakım, emeklilik ve işsizlik sigortasına **otomatik zorunlu** girersin. Genel oranlı prim (%14,6) işveren ve çırak arasında yarı yarıya paylaşılır; aylık eğitim ücreti 325 € veya altındaysa prim işverene aittir (belediye sayfasına göre). Çırak için yıllık gelir sınırı (Versicherungspflichtgrenze) geçerli sayılmaz.

TODO: Çıraklar için sigorta sınırının geçerliliğini ve 325 € kuralını SGB V/SGB IV'ten doğrula.

`,
  },
  {
    slug: "b1-german-exams",
    locale: "tr",
    marker: "## Ausbildung için Almanca",
    before: "## Adım adım",
    section: `## Ausbildung için Almanca
AB dışından **Ausbildung** vizesi için genellikle en az **B1** istenir (hazırlık kursu planlanmamışsa). Kabul edilen sertifikalar arasında Goethe-Institut, telc ve TestDaF sertifikaları sayılıyor. Mesleki okullar sıklıkla **B2** önerir; bu yüzden hedef düzeyi eğitim yerinden öğren.

TODO: Ausbildung vizesi için kabul edilen sertifikaların resmi listesini Auswärtiges Amt veya temsilcilikten ekle.

`,
  },
];

// Exact text replacements for facts that were verified against official sources after the first draft.
// Applied once per guide: skipped when the text to find is no longer present (already fixed or edited by hand).
export type ContentFix = { slug: string; locale: string; find: string; replace: string };

export const contentFixes: ContentFix[] = [
  {
    slug: "anmeldung",
    locale: "tr",
    find: "Kayıt belgen (**Meldebescheinigung**) verilir ve Steuer-ID birkaç hafta içinde postayla gelir.",
    replace: "Kayıt belgen (**Meldebescheinigung**) verilir. İlk kayıt sonrası belediye verileri vergi dairesine (BZSt) iletir ve **Steuer-ID** postayla gelir; BZSt tipik bir süre vermez, üç ay sonra gelmediyse BZSt'ye başvurabilirsin (bkz. Steuer-ID rehberi).",
  },
  {
    slug: "anmeldung",
    locale: "de",
    find: "Du erhältst die **Meldebescheinigung**, und die Steuer-ID kommt innerhalb weniger Wochen per Post.",
    replace: "Du erhältst die **Meldebescheinigung**. Nach der Erstanmeldung übermittelt die Meldebehörde deine Daten an das BZSt, und die **Steuer-ID** kommt per Post. Das BZSt nennt keine typische Dauer; kommt nach drei Monaten nichts an, kannst du dich an das BZSt wenden.",
  },
  {
    slug: "anmeldung",
    locale: "en",
    find: "You receive your registration certificate (**Meldebescheinigung**) and your tax ID arrives by post within a few weeks.",
    replace: "You receive your registration certificate (**Meldebescheinigung**). After the first registration the registration office sends your data to the BZSt and your **tax ID** arrives by post. The BZSt gives no typical time; if nothing arrives after three months you can contact the BZSt.",
  },
  {
    slug: "tax-id-and-tax-classes",
    locale: "tr",
    find: "- Kaybettin veya gelmedi: numara genellikle son vergi bildiriminde yazar; ayrıca ikamet ettiğin **Finanzamt** (kimlikle) veya BZSt çevrimiçi yardım eder. Yeniden gönderim yaklaşık 4 hafta sürebilir.\n\nTODO: Numaranın Anmeldung'dan sonra kaç haftada geldiğini BZSt'nin güncel sayfasından doğrula (kaynaklar eski veya servis sağlayıcı).",
    replace: "- Numara, belediye verileri BZSt'ye ilettikten sonra atanır. BZSt'nin resmi sayfası tipik bir süre vermez. Anmeldung'dan **üç ay sonra** hâlâ mektup gelmediyse BZSt'ye kimlik fotokopini ve Meldebestätigung'unu göndererek başvurabilirsin; BZSt belediyeyle iletişime geçer. Teslimat için soyadın **posta kutusunda yazılı** olmalı.\n- Numaranı kaybettiysen genellikle son vergi bildiriminde yazar; ayrıca ikamet ettiğin **Finanzamt** (kimlikle) veya BZSt çevrimiçi yardım eder.",
  },
  {
    slug: "health-insurance-basics",
    locale: "tr",
    find: "TODO: İşveren ve çalışanın prim payını (paylaşım oranını) resmi kaynaktan ekle ve bir bordro örneği ver.",
    replace: "Prim, **işveren ve çalışan arasında yarı yarıya** paylaşılır; kasaya özgü ek prim (**Zusatzbeitrag**) de yarı yarıya bölünür (Federal Sağlık Bakanlığı). Krankengeld (hastalık parası) hakkı olmayan üyeler için genel oran **%14,0**'dır.",
  },
  {
    slug: "health-insurance-basics",
    locale: "tr",
    find: "4. Sigorta, iş başladığı gün başlar.\n\nTODO: Seçim yapılmazsa yeni gelen biri için ne olduğunu doğrula (kaynak, daha önce Almanya'da sigortalı olanlar için son kasayı söylüyor).",
    replace: "4. Sigorta, iş başladığı gün başlar.\n\nSeçim yapmazsan ne olacağı, daha önce Almanya'da sigortalı olup olmadığına bağlıdır: daha önce sigortalı olanlar için işveren kaydı son sorumlu kasaya bildirir (AOK). Yeni gelenler için bunu işvereninle ve seçeceğin kasayla önceden netleştir.",
  },
  {
    slug: "health-insurance-basics",
    locale: "tr",
    find: "TODO: Kasanın üyelik için istediği belgeleri ve **Gesundheitskarte (eGK)** sürecini ekle.",
    replace: "Üyelik belgelerini kasalar kendileri belirler. Sigorta kartı (**Gesundheitskarte, eGK**) için güncel bir fotoğraf istenir; örneğin TK, fotoğraf iletildiyse ve önceki kasa sigorta numarasını serbest bıraktıysa kartı üyelik başlamadan otomatik gönderir.",
  },
  {
    slug: "health-insurance-basics",
    locale: "tr",
    find: "- Sigorta kartının gelme süresi: TODO",
    replace: "- Kart zamanında gelmezse kasadan **Ersatzbescheinigung** (geçici belge) iste; AOK'a göre yeni üyeler bunu elektronik olarak doğrudan muayenehaneye de ilettirebilir.",
  },
  {
    slug: "health-insurance-basics",
    locale: "tr",
    find: "TODO: Özel sigortadan yasala dönüş şartlarını (yaş, gelir, süre) resmi kaynaktan ekle.",
    replace: "Resmi kurala göre keyfi dönüş mümkün değildir: geri dönüş ancak yeniden **zorunlu sigorta (Versicherungspflicht)** doğarsa mümkündür. **55 yaşını** doldurmuş, son 5 yılda yasal sigortalı olmamış ve bu sürenin en az yarısında sigorta muafı, yükümlülükten muaf veya tam zamanlı serbest çalışan olmuş kişiler dönemez (Federal Sağlık Bakanlığı).",
  },
  {
    slug: "choose-krankenkasse",
    locale: "tr",
    find: "TODO: Kasa değiştirmedeki bağlılık süresini, fesih süresini ve ek prim artışında olağanüstü fesih hakkını kanundan (SGB V § 175) doğrula.",
    replace: "- Seçtiğin kasaya genellikle **12 ay** bağlısın.\n- 1 Ocak 2021'den beri kasa değiştirirken eski kasayı **fesih etmen gerekmez**; yeni kasaya başvurman yeterli (yalnızca yasal sigortadan çıkanlar fesih eder).\n- Kasan **ek primi artırırsa** bağlılık süresi dolmadan da ayrılabilirsin: yeni kasaya artışın geçerli olduğu ayın sonuna kadar başvur. Kasa, artışı en az bir ay önceden bildirmek zorundadır.\n- Seçimli tarifelerde (**Wahltarife**) bağlılık genellikle 1 yıl, bazı tarifelerde 3 yıldır.",
  },
  {
    slug: "doctors-and-emergencies",
    locale: "tr",
    find: "TODO: **Doctolib** ve benzeri platformlarla randevu almayı, **Gesundheitskarte (eGK)** kullanımını ve ilk muayenede neyin istendiğini kaynakla ekle.",
    replace: "**Doctolib** gibi platformlarla çevrimiçi randevu alınabilir; Doctolib kendi açıklamasında hastalar için ücretsiz olduğunu belirtiyor. Muayenehanede sigorta kartını (**Gesundheitskarte, eGK**) gösterirsin; kart henüz gelmediyse kasandan **Ersatzbescheinigung** isteyebilirsin.",
  },
  {
    slug: "deutschlandticket",
    locale: "tr",
    find: "- İptal süresi sağlayıcıya göre değişebilir; bir kaynak ayın 10'una kadar bildirimi söylüyor.\n\nTODO: İptal süresini ulaşım birliğinin veya DB'nin resmi tarife şartlarından doğrula.",
    replace: "- **Ayın 10'una kadar** iptal edersen abonelik ay sonunda biter (DB). Aboneliği 10'undan sonra yaptıysan iptal bir sonraki ayın sonuna işler. Süreler tarife şartlarında ülke genelinde aynıdır.\n- İptal: çevrimiçi müşteri portalı, DB Navigator'daki \"Abo kündigen\" veya iptal formu. Bilet henüz düzenlenmediyse sipariş yalnızca **iptal edilebilir (storniert)**; abonelik feshi ilk bilet düzenlendikten sonra yapılır.",
  },
  {
    slug: "deutschlandticket",
    locale: "tr",
    find: "- **Jobticket:** İşveren en az %25 katkı veriyorsa %5 indirim uygulanır; çalışanın ödeyeceği tutar azalır. İşveren tam katkı verirse çalışan ödemez.\n- **Sosyal bilet:** Ülke genelinde bir indirim yoktur; şehre göre değişir.\n\nTODO: Jobticket indirimini ve çalışanın ödeyeceği tutarı Deutsche Bahn'ın resmi sayfasından doğrula; belirli şehir indirimlerini şehir portallarından ekle.",
    replace: "- **Jobticket:** İşveren en az %25 katkı verirse işverene %5 indirim de uygulanır; çalışan toplamda %30 indirimli öder. 1 Ocak 2026'dan itibaren çalışanın ödeyeceği tutar **en fazla 44,10 €**'dur (DB). İşveren tam katkı verirse çalışan ödemez.\n- **Sosyal bilet:** Ülke genelinde bir indirim yoktur; şehre göre değişir, şehrin ulaşım sitesine bak.",
  },
  {
    slug: "rundfunkbeitrag",
    locale: "tr",
    find: "TODO: Resmi sitedeki kayıt adımlarını ve süreyi (taşınmadan sonra ne kadar sürede) Beitragsservice sayfasından doğrula.",
    replace: "Resmi sitede konut için çevrimiçi bir **\"Wohnung anmelden\"** formu vardır. Kayıt süresi ve yükümlülüğün başlangıcı resmi sayfada açıkça yazılı değil; finanztip ve fimportal gibi kaynaklara göre yükümlülük, taşındığın ayın başından başlar.\n\nTODO: Kayıt süresini ve yükümlülüğün başlangıcını Rundfunkbeitragsstaatsvertrag'dan veya Beitragsservice'ten doğrula.",
  },
  {
    slug: "rundfunkbeitrag",
    locale: "tr",
    find: "Bürgergeld veya Grundsicherung alanlar gibi bazı gruplar başvuruyla ücretten muaf olabilir.\n\nTODO: Muafiyet şartlarını ve gerekli kanıtları Beitragsservice'ten ekle.",
    replace: "**Grundsicherungsgeld** (eski Bürgergeld) veya yaşlılık Grundsicherung'u alanlar başvuruyla muaf olabilir. Muafiyet **otomatik değildir**, başvuru gerekir. Kanıt olarak kurumun belgesi veya onay kararının (**Bewilligungsbescheid**) kopyası gerekir; belgede alıcının adı, verilen yardım ve yardım süresi görünmelidir. **İşsizlik parası I, Wohngeld** veya **Übergangsgeld** alanlar muafiyet hakkı kazanmaz (Beitragsservice).",
  },
  {
    slug: "rundfunkbeitrag",
    locale: "tr",
    find: "- Kayıt yapmasan bile ücret borcu doğabilir.\n\nTODO: \"Kayıt yapmasan bile borç doğar\" ifadesini Beitragsservice'ten doğrula.",
    replace: "- Boş duran bir konut, belirli şartlar sağlandığı sürece kayıt zorunluluğu doğurmaz (Beitragsservice).",
  },
];
