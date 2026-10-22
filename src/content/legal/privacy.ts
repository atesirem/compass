import type { Operator } from "./operator";
import type { LegalDoc, LegalDocBuilders } from "./types";

function controller(o: Operator): string[] {
  return [o.name, o.street, `${o.postalCodeCity}, ${o.country}`, o.email];
}

const de = (o: Operator): LegalDoc => ({
  title: "Datenschutzerklärung",
  sections: [
    {
      heading: "1. Verantwortlicher",
      paragraphs: ["Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der DSGVO ist:"],
      list: controller(o),
    },
    {
      heading: "2. Überblick",
      paragraphs: [
        "Diese Website verwendet keine Analyse- oder Tracking-Dienste, keine Werbenetzwerke und keine eingebetteten Inhalte von Drittanbietern. Schriftarten werden von unserem eigenen Server ausgeliefert. Es werden nur die unten beschriebenen Daten verarbeitet.",
      ],
    },
    {
      heading: "3. Hosting und Server-Logfiles",
      paragraphs: [
        `Die Website wird bei ${o.hostingProvider} gehostet (Serverstandort: ${o.hostingLocation}). Beim Aufruf der Seiten werden technisch notwendig Daten in Server-Logfiles verarbeitet: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, übertragene Datenmenge, Browsertyp und Betriebssystem. Die Verarbeitung dient der Sicherheit und dem stabilen Betrieb (Art. 6 Abs. 1 lit. f DSGVO). Die Logfiles werden nach ${o.logRetentionDays} Tagen gelöscht. Mit dem Hosting-Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.`,
      ],
    },
    {
      heading: "4. Cookies und lokaler Speicher",
      paragraphs: [
        "Der öffentliche Bereich setzt keine Cookies. Im lokalen Speicher deines Browsers wird nur dann ein Eintrag „theme“ (hell oder dunkel) angelegt, wenn du den Darstellungsmodus selbst umschaltest. Er verlässt dein Gerät nicht und dient ausschließlich dazu, deine Auswahl beim nächsten Besuch beizubehalten. Das ist ein von dir ausdrücklich gewünschter Dienst und nach § 25 Abs. 2 TDDDG ohne Einwilligung zulässig.",
        "Wenn du die Funktion „Fahrplan“ nutzt, werden deine Angaben und die abgehakten Aufgaben unter dem Schlüssel „roadmap-v1“ ebenfalls nur im lokalen Speicher deines Browsers gespeichert. Sie werden nicht an unseren Server übertragen und dienen nur dazu, deine Liste beim nächsten Besuch wiederherzustellen. Du kannst sie jederzeit über „Zurücksetzen“ oder die Browsereinstellungen löschen.",
        "Für die Offline-Nutzung (installierbare Web-App) speichert dein Browser bereits besuchte Seiten und Dateien in einem Cache auf deinem Gerät. Du kannst diesen jederzeit über die Browsereinstellungen löschen oder die App deinstallieren.",
        "Der interne Verwaltungsbereich (nur für Redaktionsmitglieder) verwendet ein technisch notwendiges Sitzungs-Cookie, das nach spätestens 8 Stunden abläuft.",
        "Beim Anmelden im internen Verwaltungsbereich speichern wir zur Abwehr von Angriffen (Art. 6 Abs. 1 lit. f DSGVO) die eingegebene E-Mail-Adresse, die IP-Adresse und den Zeitpunkt jedes Anmeldeversuchs für höchstens 24 Stunden. Für Redaktionsmitglieder speichern wir außerdem E-Mail-Adresse, Rolle und einen gehashten Passwortwert.",
      ],
    },
    {
      heading: "5. Kontaktaufnahme",
      paragraphs: [
        "Wenn du uns per E-Mail kontaktierst, verarbeiten wir deine Angaben zur Bearbeitung der Anfrage (Art. 6 Abs. 1 lit. f bzw. lit. b DSGVO). Die Daten werden gelöscht, sobald die Anfrage erledigt ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
      ],
    },
    {
      heading: "6. Deine Rechte",
      paragraphs: [
        "Du hast das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO). Wende dich dazu an die oben genannte Adresse. Außerdem hast du das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, zum Beispiel bei der Behörde deines Bundeslandes (Übersicht auf bfdi.bund.de).",
      ],
    },
    {
      heading: "7. Sicherheit und Änderungen",
      paragraphs: [
        "Die Übertragung erfolgt verschlüsselt über HTTPS. Es findet keine automatisierte Entscheidungsfindung oder Profilbildung statt. Wenn neue Funktionen hinzukommen (zum Beispiel Nutzerkonten, Newsletter oder eingebettete Inhalte), wird diese Erklärung vorher angepasst und, wo erforderlich, deine Einwilligung eingeholt.",
      ],
    },
  ],
});

const en = (o: Operator): LegalDoc => ({
  title: "Privacy policy",
  intro: "This translation is provided for convenience. The German version (Datenschutzerklärung) is the legally binding one.",
  sections: [
    {
      heading: "1. Controller",
      paragraphs: ["The controller of data processing on this website within the meaning of the GDPR is:"],
      list: controller(o),
    },
    {
      heading: "2. Overview",
      paragraphs: [
        "This website uses no analytics or tracking services, no advertising networks and no embedded third-party content. Fonts are delivered from our own server. Only the data described below is processed.",
      ],
    },
    {
      heading: "3. Hosting and server log files",
      paragraphs: [
        `The website is hosted by ${o.hostingProvider} (server location: ${o.hostingLocation}). When pages are requested, the following data is processed in server log files as technically necessary: IP address, date and time, requested page, amount of data transferred, browser type and operating system. This serves security and stable operation (Art. 6(1)(f) GDPR). Log files are deleted after ${o.logRetentionDays} days. A data processing agreement under Art. 28 GDPR exists with the hosting provider.`,
      ],
    },
    {
      heading: "4. Cookies and local storage",
      paragraphs: [
        "The public area sets no cookies. An entry called “theme” (light or dark) is stored in your browser's local storage only if you switch the display mode yourself. It never leaves your device and only keeps your choice for your next visit. This is a service you explicitly requested and is permitted without consent under § 25(2) TDDDG.",
        "If you use the “Roadmap” feature, your answers and the tasks you tick off are likewise stored only in your browser's local storage under the key “roadmap-v1”. They are not transmitted to our server and only serve to restore your list on your next visit. You can delete them at any time with “Reset” or in your browser settings.",
        "For offline use (installable web app), your browser stores pages and files you already visited in a cache on your device. You can delete it at any time in your browser settings or uninstall the app.",
        "The internal admin area (editorial team only) uses a technically necessary session cookie that expires after 8 hours at most.",
        "When someone signs in to the internal admin area, we store the entered email address, the IP address and the time of every sign-in attempt for at most 24 hours to defend against attacks (Art. 6(1)(f) GDPR). For editorial team members we also store the email address, the role and a hashed password value.",
      ],
    },
    {
      heading: "5. Contacting us",
      paragraphs: [
        "If you contact us by email, we process your details to handle your request (Art. 6(1)(f) or (b) GDPR). The data is deleted once the request is resolved and no statutory retention duties apply.",
      ],
    },
    {
      heading: "6. Your rights",
      paragraphs: [
        "You have the right of access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and objection (Art. 21 GDPR). Contact the address above. You also have the right to lodge a complaint with a data protection supervisory authority, for example the one of your federal state (overview at bfdi.bund.de).",
      ],
    },
    {
      heading: "7. Security and changes",
      paragraphs: [
        "Data is transmitted encrypted via HTTPS. There is no automated decision-making or profiling. If new features are added (for example user accounts, newsletters or embedded content), this policy will be updated beforehand and your consent obtained where required.",
      ],
    },
  ],
});

const tr = (o: Operator): LegalDoc => ({
  title: "Gizlilik politikası (Datenschutzerklärung)",
  intro: "Bu çeviri kolaylık içindir. Hukuken bağlayıcı olan sürüm Almanca Datenschutzerklärung'dur.",
  sections: [
    {
      heading: "1. Veri sorumlusu",
      paragraphs: ["Bu sitedeki veri işlemenin GDPR anlamında sorumlusu:"],
      list: controller(o),
    },
    {
      heading: "2. Genel bakış",
      paragraphs: [
        "Bu site analiz veya izleme hizmeti, reklam ağı ve üçüncü taraf gömülü içerik kullanmaz. Yazı tipleri kendi sunucumuzdan sunulur. Yalnızca aşağıda açıklanan veriler işlenir.",
      ],
    },
    {
      heading: "3. Barındırma ve sunucu kayıtları",
      paragraphs: [
        `Site ${o.hostingProvider} tarafından barındırılır (sunucu konumu: ${o.hostingLocation}). Sayfalar açılırken teknik olarak gerekli veriler sunucu kayıtlarında işlenir: IP adresi, tarih ve saat, istenen sayfa, aktarılan veri miktarı, tarayıcı türü ve işletim sistemi. Bu işlem güvenlik ve kararlı işletim içindir (GDPR m. 6/1-f). Kayıtlar ${o.logRetentionDays} gün sonra silinir. Barındırma sağlayıcısıyla GDPR m. 28 uyarınca veri işleme sözleşmesi vardır.`,
      ],
    },
    {
      heading: "4. Çerezler ve yerel depolama",
      paragraphs: [
        "Herkese açık bölüm çerez kullanmaz. Tarayıcının yerel depolamasında yalnızca, görünüm modunu (açık/koyu) sen değiştirirsen “theme” adlı bir kayıt oluşur. Bu kayıt cihazından çıkmaz ve yalnızca seçimini bir sonraki ziyaretinde korumak içindir. Bu, senin açıkça istediğin bir hizmettir ve TDDDG § 25/2 uyarınca onay gerektirmez.",
        "“Yol haritası” özelliğini kullanırsan, cevapların ve işaretlediğin görevler “roadmap-v1” anahtarıyla yine yalnızca tarayıcının yerel depolamasında saklanır. Sunucumuza iletilmez ve yalnızca bir sonraki ziyaretinde listeni geri yüklemek içindir. “Sıfırla” ile veya tarayıcı ayarlarından istediğin zaman silebilirsin.",
        "Çevrimdışı kullanım için (yüklenebilir web uygulaması) tarayıcın daha önce açtığın sayfaları ve dosyaları cihazındaki bir önbellekte saklar. Bunu tarayıcı ayarlarından istediğin zaman silebilir veya uygulamayı kaldırabilirsin.",
        "Dahili yönetim alanı (yalnızca editör ekibi) en geç 8 saat sonra sona eren, teknik olarak gerekli bir oturum çerezi kullanır.",
        "Dahili yönetim alanına giriş yapılırken, saldırılara karşı korunmak için (GDPR m. 6/1-f) girilen e-posta adresini, IP adresini ve her giriş denemesinin zamanını en fazla 24 saat saklarız. Editör ekibi üyeleri için ayrıca e-posta adresi, rol ve parolanın karma (hash) değeri saklanır.",
      ],
    },
    {
      heading: "5. İletişim",
      paragraphs: [
        "Bize e-posta ile ulaşırsan bilgilerini talebi yanıtlamak için işleriz (GDPR m. 6/1-f veya -b). Talep sonuçlandığında ve yasal saklama yükümlülüğü yoksa veriler silinir.",
      ],
    },
    {
      heading: "6. Hakların",
      paragraphs: [
        "Bilgi alma (m. 15), düzeltme (m. 16), silme (m. 17), işlemenin kısıtlanması (m. 18), veri taşınabilirliği (m. 20) ve itiraz (m. 21) haklarına sahipsin. Bunun için yukarıdaki adrese başvurabilirsin. Ayrıca bir veri koruma denetim makamına, örneğin eyaletindeki makama şikayet hakkın vardır (genel liste: bfdi.bund.de).",
      ],
    },
    {
      heading: "7. Güvenlik ve değişiklikler",
      paragraphs: [
        "Veri aktarımı HTTPS ile şifreli yapılır. Otomatik karar verme veya profil oluşturma yapılmaz. Yeni özellikler eklenirse (örneğin kullanıcı hesabı, bülten veya gömülü içerik) bu politika önceden güncellenir ve gerekirse onayın alınır.",
      ],
    },
  ],
});

export const privacy: LegalDocBuilders = { de, en, tr };
