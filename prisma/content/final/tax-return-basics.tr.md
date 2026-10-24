---
slug: tax-return-basics
module: everyday-life
position: 3
stage: FIRST_SIX_MONTHS
status: REVIEW
verified: 2026-10-24
title: Vergi beyannamesi (Steuererklärung) temelleri
summary: Kimler beyanname vermek zorunda, süreler ne zaman, ELSTER nedir ve ücretsiz veya ucuz yardım nereden alınır?
sources:
  - https://www.gesetze-im-internet.de/estg/__46.html
  - https://www.gesetze-im-internet.de/ao_1977/__149.html
  - https://www.gesetze-im-internet.de/estg/__9a.html
  - https://finanzamt.brandenburg.de/sixcms/media.php/9/Merkblatt%20f%C3%BCr%20Lohnsteuerhilfevereine.pdf
---
## Kısaca
**Steuererklärung** (vergi beyannamesi) bir önceki yılın gelirini Finanzamt'a bildirmektir. Bazı durumlarda zorunludur; zorunlu değilsen de çoğu zaman gönüllü vererek vergi iadesi alabilirsin. Bu rehber genel bilgidir, kişisel vergi danışmanlığı değildir. Vergi kimlik numarası ve vergi sınıfları için bkz. Vergi kimlik numarası ve vergi sınıfları rehberi.

## Kimler vermek zorunda?
§ 46 Abs. 2 EStG'ye göre çalışanlar özellikle şu durumlarda beyanname vermek zorundadır:
- Maaş vergisine tabi olmayan diğer gelirin veya **Progressionsvorbehalt**'a tabi gelir ve yardımların toplamı {{setting:everydayTaxFilingThreshold}} üzerinde olması.
- Aynı anda birden fazla işverenden maaş alınması (birleştirilmediyse).
- Sağlık ve bakım sigortası iadelerinin {{setting:everydayTaxFilingThreshold}} üzerinde olması (belirli gelir koşuluyla).
- Evli çiftlerde eşlerden birinin Steuerklasse V veya VI'da olması ya da Steuerklasse IV'ün Faktor ile kullanılması.
- Maaş vergisi hesaplamasında **Freibetrag** (§ 39a) girilmiş olması.
- Bazı tek seferlik ödemelerde özel hesaplama yapılmış olması (§ 39c Abs. 3).
- Bazı evlilik durumu değişiklikleri.

Bunların dışında beyanname **gönüllüdür** (**Antrag auf Veranlagung**, § 46 Abs. 2 Nr. 8). Gönüllü beyan genellikle iade getirir ama garanti etmez.

## Süreler
- Kendin verirsen: izleyen yılın **31 Temmuz**'una kadar (§ 149 AO).
- **Steuerberater** veya **Lohnsteuerhilfeverein** ile verirsen: ikinci yılın Şubat ayının son gününe kadar.
- 2025 vergi yılı için: 31 Temmuz 2026 geçti. Danışman yolu için süre **1 Mart 2027**'dir, çünkü 28 Şubat 2027 pazar günüdür.
- Finanzamt daha erken verilmesini isteyebilir (§ 149 Abs. 4).

## ELSTER kaydı
**ELSTER**, vergi idaresinin çevrimiçi sistemidir. Kayıt için elster.de'de hesap açarsın; etkinleştirme kodu posta ile gelir. Kodu girip şifre belirler ve sertifika dosyanı indirip güvenli yerde saklarsın.

TODO: ELSTER kayıt adımları ve posta süresi (yaklaşık iki hafta) ikincil kaynağa (eyalet vergi idaresi rehberi, 09.2025) dayanıyor; elster.de sayfaları okunamadı, kontrol et. eID ile giriş seçeneğini de doğrula.

## Ücretsiz veya ucuz yardım
**Lohnsteuerhilfeverein** (maaş vergisi yardım derneği), sadece üyelerine, ağırlıklı olarak maaş geliri ve ilgili gelirler için danışmanlık verir. Yalnızca üyelik aidatı alır; aidat iadeye veya işin kapsamına bağlı değildir. Geliri bu kapsamın dışına taşıyorsa dernek tüm beyannameyi hazırlayamayabilir.

## Gelir vergisinde bilmen gerekenler
- **Arbeitnehmer-Pauschbetrag:** Yıllık {{setting:everydayEmployeeLumpSum}}; kanıt göstermeden düşülür. Gerçek masrafların bundan yüksekse kalem kalem gösterebilirsin.
- **Steuerklassen** (genel bakış): I bekâr; II çocuğunu tek başına büyüten; III evli, daha çok kazanan; IV evli, benzer gelir; V III'ün karşılığı; VI ikinci iş. Evli çiftler III/V veya IV/IV seçebilir. Ayrıntılar için bkz. Vergi kimlik numarası ve vergi sınıfları rehberi.

## Sık yapılan hatalar
- Süreyi kaçırmak ve gecikme zammı ödemek.
- Gönüllü beyan hakkını bilmemek.
- Kodu postayla gelecek diye ELSTER kaydını son güne bırakmak.

## Sonraki adım
Gelirin karmaşıksa bir Steuerberater veya Lohnsteuerhilfeverein'e danış.

TODO: Gönüllü beyan süresi (Festsetzungsfrist 4 yıl, § 169/170 AO; 2025 için 31 Aralık 2029) kanun metninden doğrulanmadı.
TODO: Gecikme zammı (Verspätungszuschlag, § 152 AO) tutarı kanun metninden doğrulanmadı.
TODO: Geliş yılında yurt dışı gelirin Progressionsvorbehalt ile etkisi için birincil kaynak bul.
TODO: 2026 vergi yılı süreleri (2 Ağustos 2027 ve 29 Şubat 2028) kendi hesabımız; doğrula.
TODO: Steuerklassen genel bakışı ikincil kaynaklara (§ 38b EStG okunmadı) dayanıyor; kontrol et.
