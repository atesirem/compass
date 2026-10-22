import type { AppLocale } from "@/lib/guide-health";

// Lines starting with this marker must be replaced or removed before a guide can be published
export const TODO_MARKER = "TODO:";

export function hasTodoMarkers(markdown: string): boolean {
  return markdown.includes(TODO_MARKER);
}

export const GUIDE_TEMPLATES: Record<AppLocale, string> = {
  tr: `## Kısaca
TODO: 2-3 cümle. Bu rehber ne anlatıyor, kimler için?

## Kimler için geçerli?
- TODO: koşul
- TODO: istisna

## Adım adım
1. TODO: ilk adım (ne yapılır, nerede)
2. TODO: ikinci adım

## Gerekli belgeler
- TODO: belge

## Maliyet ve süre
- Maliyet: TODO
- Süre: TODO

## Sık yapılan hatalar
- TODO: hata ve nasıl önlenir

## Dikkat etmen gerekenler
TODO: eyalet veya şehir farkları, süreler, riskler.

## Sonraki adım
TODO: ilgili rehbere yönlendirme.
`,
  de: `## Kurz gesagt
TODO: 2-3 Sätze. Worum geht es, für wen?

## Für wen gilt das?
- TODO: Voraussetzung
- TODO: Ausnahme

## Schritt für Schritt
1. TODO: erster Schritt (was, wo)
2. TODO: zweiter Schritt

## Benötigte Unterlagen
- TODO: Unterlage

## Kosten und Dauer
- Kosten: TODO
- Dauer: TODO

## Häufige Fehler
- TODO: Fehler und wie man ihn vermeidet

## Worauf du achten solltest
TODO: Unterschiede je Bundesland oder Stadt, Fristen, Risiken.

## Nächster Schritt
TODO: Verweis auf einen passenden Ratgeber.
`,
  en: `## In short
TODO: 2-3 sentences. What is this guide about, and who is it for?

## Who does this apply to?
- TODO: requirement
- TODO: exception

## Step by step
1. TODO: first step (what to do, where)
2. TODO: second step

## Documents you need
- TODO: document

## Cost and duration
- Cost: TODO
- Duration: TODO

## Common mistakes
- TODO: mistake and how to avoid it

## Things to watch out for
TODO: differences by state or city, deadlines, risks.

## Next step
TODO: link to a related guide.
`,
};
