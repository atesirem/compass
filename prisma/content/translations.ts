// German and English versions of guides that are ready for publication. Turkish is the source text.
// These are machine-assisted translations: they are created with needsReview = true and must be
// checked by a native speaker before the flag is cleared in the admin panel.
export type TranslationSeed = {
  slug: string;
  locale: "de" | "en";
  title: string;
  summary: string;
  body: string;
};

export const guideTranslations: TranslationSeed[] = [
  {
    slug: "deutschlandticket",
    locale: "de",
    title: "Deutschlandticket: das monatliche Nahverkehrsticket",
    summary: "Preis, Geltungsbereich, Kündigung des Abos und Jobticket.",
    body: `## Kurz gesagt
Das **Deutschlandticket** ist ein persönliches Monatsabo, das in ganz Deutschland im regionalen und lokalen Nahverkehr gilt (Bus, Straßenbahn, U-Bahn, S-Bahn und Regionalzüge). Seit dem 1. Januar 2026 kostet es **{{setting:deutschlandticketPrice}}** im Monat.

## Geltungsbereich
Es gilt im Nah- und Regionalverkehr. In Fernverkehrszügen wie **ICE, IC und EC** gilt es nicht.

## Abo
- Es wird als **digitales**, **monatlich kündbares** Abo angeboten (Regionalisierungsgesetz § 9).
- Kündigst du **bis zum 10. eines Monats**, endet das Abo zum Monatsende (DB). Hast du das Abo nach dem 10. abgeschlossen, gilt die Kündigung zum Ende des Folgemonats. Die Fristen sind in den Tarifbestimmungen bundesweit einheitlich geregelt.
- Kündigen kannst du im Online-Kundenportal, mit der Funktion „Abo kündigen“ im DB Navigator oder über das Kündigungsformular. Ist das Ticket noch nicht ausgestellt, kann die Bestellung nur **storniert** werden; eine Kündigung ist erst möglich, nachdem das erste Ticket ausgestellt wurde.

## Ermäßigungen
- **Jobticket:** Zahlt der Arbeitgeber mindestens 25 % zu, gibt es zusätzlich 5 % Rabatt für das Unternehmen. Die Beschäftigten zahlen dann insgesamt 30 % weniger. Seit dem 1. Januar 2026 zahlen sie **höchstens 44,10 €** (DB). Übernimmt der Arbeitgeber den vollen Preis, zahlst du nichts.
- **Sozialticket:** Es gibt keinen bundesweiten Rabatt. Die Angebote unterscheiden sich je nach Stadt; schau auf der Seite deines Verkehrsunternehmens nach.

## Preis ab 2027
Ab 2027 soll der Preis über einen Preisindex bestimmt werden. In den Medien kursieren Schätzungen, einen amtlichen Betrag gibt es noch nicht. Den aktuellen Preis findest du in der Einstellung auf dieser Seite und in offiziellen Mitteilungen.

## Schritt für Schritt
1. Finde heraus, in welcher Stadt und auf welchen Linien du unterwegs bist.
2. Schließe das Abo in der App deines Verkehrsverbunds oder der DB ab.
3. Lade das Ticket digital auf dein Handy und zeige es bei der Kontrolle vor.
4. Frag deinen Arbeitgeber, ob es ein Jobticket gibt.

## Häufige Fehler
- Zu glauben, das Ticket gelte auch im Fernverkehr.
- Die Kündigungsfrist zu verpassen und einen Monat zu viel zu zahlen.

## Nächster Schritt
Lies den Ratgeber zum **Rundfunkbeitrag**.
`,
  },
  {
    slug: "deutschlandticket",
    locale: "en",
    title: "Deutschlandticket: the monthly public transport pass",
    summary: "Price, where it is valid, cancelling the subscription and the Jobticket.",
    body: `## In short
The **Deutschlandticket** is a personal monthly subscription valid across Germany on regional and local public transport (bus, tram, underground, S-Bahn and regional trains). Since 1 January 2026 it costs **{{setting:deutschlandticketPrice}}** per month.

## Where it is valid
It covers local and regional traffic. It is **not** valid on long-distance trains such as **ICE, IC and EC**.

## Subscription
- It is offered as a **digital** subscription that can be **cancelled monthly** (Regionalisierungsgesetz § 9).
- If you cancel **by the 10th of a month**, the subscription ends at the end of that month (DB). If you took out the subscription after the 10th, the cancellation takes effect at the end of the following month. The notice periods are the same nationwide under the tariff terms.
- You can cancel in the online customer portal, with the "Abo kündigen" function in the DB Navigator app, or with the cancellation form. If the ticket has not been issued yet, the order can only be **cancelled (storniert)**; the subscription can be terminated only after the first ticket has been issued.

## Discounts
- **Jobticket:** If your employer pays at least 25 %, the company also receives a 5 % discount. Employees then pay 30 % less in total. Since 1 January 2026 they pay **at most 44.10 €** (DB). If your employer pays the full price, you pay nothing.
- **Social ticket:** There is no nationwide discount. Offers vary by city; check the website of your local transport provider.

## Price from 2027
From 2027 the price is to be set by a price index. Estimates circulate in the media, but there is no official amount yet. For the current price, see the setting on this page and official announcements.

## Step by step
1. Work out which city and which lines you use.
2. Take out the subscription in the app of your transport association or of DB.
3. Put the ticket on your phone and show it during checks.
4. Ask your employer whether there is a Jobticket.

## Common mistakes
- Assuming the ticket is valid on long-distance trains.
- Missing the cancellation deadline and paying one month too many.

## Next step
Read the guide on the **Rundfunkbeitrag** (broadcasting fee).
`,
  },
  {
    slug: "doctors-and-emergencies",
    locale: "de",
    title: "Arztbesuch und Notfälle: Hausarzt, 116117, 112",
    summary: "Hausarzt, Facharzttermin, welche Nummer in welcher Situation und Zuzahlungen bei Medikamenten.",
    body: `## Kurz gesagt
In Deutschland suchst du dir in der Regel zuerst einen **Hausarzt**; zu Fachärzten überweist meist er dich. In Notfällen wählst du je nach Situation die **112**, die **116117** oder gehst in die Notaufnahme.

## Welche Nummer wann?
- **112:** Lebensbedrohliche Situationen, etwa Bewusstlosigkeit, akute Atemnot, neu aufgetretene plötzliche Brustschmerzen, schwere Verletzungen oder Vergiftungen.
- **116117 (ärztlicher Bereitschaftsdienst):** Beschwerden, die nicht lebensbedrohlich sind, aber nicht bis zum nächsten Tag warten können. Außerhalb der Sprechzeiten der Praxen (nachts, am Wochenende). Die Nummer ist bundesweit einheitlich, ohne Vorwahl und kostenlos.
- **Bereitschaftspraxis:** Meist kannst du ohne Termin hingehen. Kannst du nicht hinkommen, kannst du über die 116117 einen Hausbesuch anfordern.
- **Notaufnahme:** Sie ist für lebensbedrohlich Erkrankte da. Bei Erkältung oder Durchfall wendest du dich besser an den Bereitschaftsdienst.

## Arzt finden und Termin bekommen
- Für Hausärzte und Kinderärzte brauchst du **keine Überweisung**.
- **Facharzt:** Normalerweise bekommst du eine Überweisung vom Hausarzt. Der **Terminservice** der 116117 vermittelt mit dem auf der Überweisung aufgedruckten **zwölfstelligen Dringlichkeitscode** innerhalb von 4 Wochen einen Facharzttermin. Bei Augen- und Frauenärzten ist kein Code nötig.
- Der Terminservice funktioniert telefonisch (116117), online (E-Terminservice) oder per App. Er kann auch bei der Suche nach einem dauerhaften Hausarzt helfen.

Über Plattformen wie **Doctolib** kannst du online Termine buchen; Doctolib gibt in eigenen Angaben an, dass der Dienst für Patientinnen und Patienten kostenlos ist. In der Praxis zeigst du deine Versichertenkarte (**elektronische Gesundheitskarte, eGK**) vor. Ist sie noch nicht angekommen, kannst du bei deiner Krankenkasse eine **Ersatzbescheinigung** anfordern.

## Zuzahlungen
- Ab 18 Jahren zahlst du bei verschreibungspflichtigen Medikamenten **10 %** des Preises, mindestens **5 €** und höchstens **10 €** (nie mehr als der Preis des Mittels).
- **Kinder unter 18 Jahren** zahlen keine Zuzahlungen (Fahrtkosten ausgenommen).
- Jährliche **Belastungsgrenze:** **2 %** des Bruttoeinkommens des Haushalts, für chronisch Kranke **1 %**. Ist die Grenze erreicht, bescheinigt dir die Krankenkasse, dass bis zum Jahresende keine Zuzahlungen mehr anfallen.

## Häufige Fehler
- Mit nicht lebensbedrohlichen Beschwerden in die Notaufnahme gehen.
- Für den Facharzttermin die Überweisung und den Code vergessen.
- Die Bescheinigung über die Belastungsgrenze nicht bei der Krankenkasse anfordern.

## Nächster Schritt
Lies den Ratgeber zur **Versicherungspyramide**.
`,
  },
  {
    slug: "doctors-and-emergencies",
    locale: "en",
    title: "Seeing a doctor and emergencies: Hausarzt, 116117, 112",
    summary: "Family doctor, specialist appointments, which number to call and co-payments for medicines.",
    body: `## In short
In Germany you usually first find a **Hausarzt** (family doctor); he or she normally refers you to specialists. In an emergency you call **112**, call **116117** or go to the emergency room, depending on the situation.

## Which number when?
- **112:** Life-threatening situations, such as loss of consciousness, sudden shortness of breath, newly started sudden chest pain, severe injuries or poisoning.
- **116117 (ärztlicher Bereitschaftsdienst, on-call medical service):** Complaints that are not life-threatening but cannot wait until the next day, outside the opening hours of practices (at night, on weekends). The number is the same nationwide, needs no area code and is free.
- **Bereitschaftspraxis (on-call practice):** In most places you can go without an appointment. If you cannot get there, you can request a home visit via 116117.
- **Emergency room (Notaufnahme):** It is for people with life-threatening conditions. For a cold or diarrhoea, go to the on-call service instead.

## Finding a doctor and getting an appointment
- For a Hausarzt or a paediatrician you **do not need a referral (Überweisung)**.
- **Specialists:** Normally you get a referral from your Hausarzt. The **appointment service** of 116117 uses the **twelve-digit urgency code** printed on the referral to arrange a specialist appointment within 4 weeks. For eye doctors and gynaecologists no code is needed.
- The appointment service works by phone (116117), online (E-Terminservice) or via an app. It can also help you find a permanent Hausarzt.

Platforms such as **Doctolib** let you book appointments online; Doctolib states in its own information that the service is free for patients. At the practice you show your insurance card (**Gesundheitskarte, eGK**). If it has not arrived yet, you can ask your health insurer for a **replacement certificate (Ersatzbescheinigung)**.

## Co-payments (Zuzahlung)
- From age 18 you pay **10 %** of the price for prescription medicines, at least **5 €** and at most **10 €** (never more than the price of the product).
- **Children under 18** pay no co-payments (travel costs excepted).
- Annual **burden limit (Belastungsgrenze):** **2 %** of the household's gross income, **1 %** for chronically ill people. Once you reach the limit, your insurer certifies that no further co-payments are due until the end of the year.

## Common mistakes
- Going to the emergency room with complaints that are not life-threatening.
- Forgetting the referral and the code for a specialist appointment.
- Not asking the insurer for the burden-limit certificate.

## Next step
Read the guide on the **insurance pyramid**.
`,
  },
];
