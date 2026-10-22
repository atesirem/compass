import { requireStaff } from "@/lib/auth";
import { ui } from "../../_components/ui";

const RULES: { title: string; items: string[] }[] = [
  {
    title: "Voice",
    items: [
      "Turkish first; DE and EN are translated from it.",
      "Address the reader as \"sen\". Short sentences, calm tone. No hype words (harika, kolayca, garanti).",
      "Numbers always with units: 14 gün, 259 € / ay, en az 17 / 33.",
      "German terms: bold on first use with the Turkish meaning in brackets, e.g. **Anmeldung** (ikametgah kaydı). Add the term to the glossary.",
      "Sentence case headings. No emoji.",
    ],
  },
  {
    title: "Structure",
    items: [
      "Use Insert template in the editor: Kısaca, Kimler için, Adım adım, Belgeler, Maliyet ve süre, Sık hatalar, Dikkat, Sonraki adım.",
      "Remove or fill every TODO: line. Guides with TODO: lines cannot be published.",
    ],
  },
  {
    title: "Sources and accuracy",
    items: [
      "At least one https source per guide. Prefer law text and official authorities. Advice blogs and forums are not sources on their own.",
      "Set Verified on only after checking the official page yourself.",
      "Values that change (salary thresholds, prices, fees) belong in Settings and are used as {{setting:key}}. Put the source in the setting note.",
      "If you are not sure, do not write it. If sources conflict, say who to ask and add it to the fact-check list.",
      "No guarantees (\"always accepted\"). Use \"usually\" and a source.",
      "Personal experience must be labelled \"Deneyim\" with a date.",
    ],
  },
  {
    title: "Legal limits",
    items: [
      "General information only. Never assess an individual case (\"in your case you should…\").",
      "Any commercial or affiliate link needs the label \"Reklam\" (see the business model plan).",
    ],
  },
  {
    title: "Before publishing",
    items: [
      "Title, summary and text in Turkish are complete.",
      "No TODO: lines. At least one https source. Verified date set.",
      "Figures compared with the source one by one. Changing values moved to Settings.",
      "Links to related guides added. Glossary terms added.",
    ],
  },
];

export default async function WritingGuidePage() {
  await requireStaff();
  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Writing guide</h1>
      <p className="mt-1 max-w-2xl text-sm text-fg-muted">
        The short version of the content rules. The full document is plan/09-content-guidelines.md.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {RULES.map((group) => (
          <section key={group.title} className={ui.card}>
            <h2 className="text-lg font-bold">{group.title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
