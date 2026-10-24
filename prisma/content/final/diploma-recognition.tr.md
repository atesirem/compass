---
slug: diploma-recognition
status: REVIEW
verified: 2026-10-24
title: Diploma denkliği: anabin, ZAB değerlendirmesi ve meslek denkliği
summary: Üç farklı şey: anabin, ZAB Zeugnisbewertung ve Anerkennung. Hangisi ne zaman gerekir?
sources:
  - https://anabin.kmk.org
  - https://zab.kmk.org/en/statement-comparability
  - https://zab.kmk.org/en/statement-comparability/fees
  - https://zab.kmk.org/en/statement-comparability/application
  - https://www.anerkennung-in-deutschland.de
  - http://www.anerkennung-in-deutschland.de/html/de/pro/anerkennungszuschuss.php
  - https://www.gesetze-im-internet.de/bqfg/__2.html
  - https://www.gesetze-im-internet.de/aufenthg_2004/__18g.html
  - https://tuerkei.diplo.de/tr-de/service/05-visaeinreise/2617130-2617130
---
## Kısaca
"Diploma denkliği" tek bir işlem değildir. Almanya'da üç ayrı yol var; hangisinin gerekli olduğu **hedefe** (iş, Mavi Kart, düzenli meslek, üniversite) bağlıdır.

## 1. anabin: önce buraya bak
**anabin**, ZAB'ın yabancı okullar ve diplomalar veritabanıdır. Almanya Dışişleri'nin Türkiye vize sayfasına göre hem üniversite hem diploma anabin'de aranır: üniversite "H+" ve diploma "gleichwertig / entspricht" ise genellikle ek işlem gerekmez; üniversite "H+/-" ise diplomanın o üniversite için listelenmiş olması gerekir; diploma listede yoksa veya değerlendirmesi yoksa bireysel **ZAB Zeugnisbewertung** gerekir. Kendi üniversiteni ve diplomanı anabin'de ara; durumu başvurduğun kuruma göre teyit et.
ZAB diplomanın sahte olup olmadığını denetlemez; gerçeklik apostil veya legalizasyonla kanıtlanır.

TODO: Türk üniversitelerinin anabin'deki güncel durumu (H+, H+/-, H-) anabin.kmk.org dinamik bir veritabanı olduğu için buradan okunamadı; her okuyucu kendi okulunu aramalı. Genel bir liste yazılmadı.

## 2. ZAB Zeugnisbewertung (diploma değerlendirmesi)
- ZAB, dünyanın her yerindeki üniversite diplomaları için **Zeugnisbewertung** (karşılaştırılabilirlik beyanı) verir. Önce ZAB sitesindeki ön kontrolü (Pre-Check) yap.
- Bu **meslek tanıması değildir**: ZAB'ın kendi sayfasına göre belge sahibine üniversiteye kabul, ek eğitim veya düzenli bir meslekte çalışma hakkı vermez; yabancı notları Alman notuna da çevirmez.
- Ücret: **{{setting:zabFeeFirst}}** (ZAB, ücret yönetmeliği Haziran 2024'te güncellendi; eski sayfalarda 200 € yazar). Dijital kopyanı kaybedip BundID hesabına erişimin kalmadıysa belgenin yenisi (Ersatz) **{{setting:zabFeeFurther}}**. Başvuruyu geri çekersen ZAB ücretin en fazla yarısını tutabilir.
- Başvuru çevrimiçi yapılır. Belgeler PDF olarak yüklenir; ön kontrol sana belge listesini verir. Çeviri gerekirse orijinal belgenin **yerine değil, ek olarak** gönderilir.
- Süre: belgeler ve ödeme tamamlandıktan sonra genellikle en fazla 3 ay (kmk.org/ZAB bilgisi).

## 3. Anerkennung (mesleki tanıma)
- **Meslek eğitimi** (Ausbildung) ve **düzenlenmiş meslekler** (doktor, hemşire, öğretmen vb.) için Almanya'da çalışmadan önce mesleki tanıma gerekir; düzenlenmemiş mesleklerde çoğunlukla zorunlu değildir ve ZAB değerlendirmesi işe yarar.
- Yurt dışında alınmış bir meslek yeterliliği olan ve Almanya'da çalışmak isteyen herkes için tanıma kanunu geçerlidir (§ 2 BQFG, "alle Personen"; uyruk koşulu yok).
- Resmi portal: **anerkennung-in-deutschland.de** (doğru kurumu bulmak için "Anerkennungsfinder").
- Sonuç: tam, kısmi veya denklik yok. Kısmi denklikte uyum şartları (ek eğitim, sınav vb.) istenebilir.
- Ücretleri tanıma kurumu belirler; kuruma ve mesleğe göre değişir.

TODO: Tanıma kurumlarının ücret aralığı ve işlem süresi (kuruma göre değişiyor) resmi kaynaktan doğrulanmadı; Anerkennungsfinder'daki kurumdan öğren.

## Maddi destek: Anerkennungszuschuss
- Tanıma veya ZAB Zeugnisbewertung masrafları için **{{setting:recognitionSubsidyMin}} ile {{setting:recognitionSubsidyMax}}** arası geri ödeme; kalifikasyon analizi için en fazla {{setting:qualificationAnalysisSubsidyMax}}; tamamlayıcı eğitimler için kişi başı en fazla {{setting:qualificationMeasureSubsidyMax}} (kısmi denklik kararı veya uyum şartı gerekir).
- Koşullar: Almanya'da ana ikametgah; uyruk, oturum durumu ve diplomanın alındığı ülke fark etmez. Yıllık brüt gelir sınırı tek kişide {{setting:recognitionSubsidyIncomeLimitSingle}}, çiftlerde {{setting:recognitionSubsidyIncomeLimitCouple}}.
- **Tanıma veya ZAB başvurusundan önce** başvurmalısın; sonradan ödeme yapılmaz. Başvuru Zentrale Förderstelle (f-bb) üzerinden dijital yapılır. Arbeitsagentur veya Jobcenter masrafı zaten karşılıyorsa destek verilmez.

## Hangisini ne zaman?
- **Mavi Kart (üniversite diploması):** Önce anabin; gerekirse ZAB. Mavi Kart (§ 18g AufenthG) için gereken maaş eşikleri yasa metninde "yıllık Beitragsbemessungsgrenze'nin yüzdesi" olarak tanımlı; diploma koşulunun ayrıntısı için **Mavi Kart** rehberine ve başvurduğun makama bak.
- **Düzenlenmiş meslek (ör. hemşirelik, öğretmenlik):** Anerkennung.
- **Ausbildung veya meslek eğitimi:** Anerkennung.
- **Üniversite başvurusu:** Üniversitenin istediği değerlendirme; üniversiteye sor.

## Çeviri ve belgeler
Belgelerin hangi biçimde (çeviri, onay) isteneceği başvurduğun kuruma göre değişir; ZAB ön kontrolü listeyi gösterir. Eksik belge veya çeviri süreci geciktirir.

TODO: Türkiye'ye özel belge şartları (YÖK onayı, apostil, noter onayı) ZAB ve tanıma kurumlarından doğrulanmadı.

## Adım adım
1. Hedefini belirle (iş, Mavi Kart, düzenli meslek, üniversite).
2. anabin'de diplomanı ve okulunu ara.
3. Gerekirse ZAB ön kontrolünü yap ve başvur; ya da Anerkennungsfinder'dan kurumu bul.
4. Masraf desteği için **başvurudan önce** Anerkennungszuschuss'a başvur.
5. Belgeleri tamamla; kararı bekle.

## Sık yapılan hatalar
- ZAB değerlendirmesini meslek tanıması sanmak.
- Düzenlenmiş meslekte tanımayı geç başlatmak.
- Anerkennungszuschuss için başvuruyu tanıma başvurusundan sonra yapmak.
- Belgeleri çeviriyle değiştirmek (çeviri orijinalin yerine geçmez).

## Sonraki adım
**Mavi Kart** veya **Ausbildung** rehberlerine geri dön.
