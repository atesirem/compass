// German letter generators: the output is always German, whatever language the page is shown in.
export type LetterId = "rentalApplication" | "cancelContract" | "cancelLease" | "objection" | "appointment";

export type LetterField = { key: string; type?: "text" | "textarea" | "date" | "number"; required?: boolean };

export const COMMON_SENDER_FIELDS: LetterField[] = [
  { key: "senderName", required: true },
  { key: "senderStreet", required: true },
  { key: "senderCity", required: true },
];

export const LETTER_FIELDS: Record<LetterId, LetterField[]> = {
  rentalApplication: [
    ...COMMON_SENDER_FIELDS,
    { key: "senderEmail" },
    { key: "senderPhone" },
    { key: "landlordName" },
    { key: "flatAddress", required: true },
    { key: "persons", type: "number" },
    { key: "occupation" },
    { key: "moveIn", type: "date" },
    { key: "about", type: "textarea" },
    { key: "docs" },
  ],
  cancelContract: [
    ...COMMON_SENDER_FIELDS,
    { key: "recipientName", required: true },
    { key: "recipientStreet" },
    { key: "recipientCity" },
    { key: "contractRef", required: true },
    { key: "endDate", type: "date" },
  ],
  cancelLease: [
    ...COMMON_SENDER_FIELDS,
    { key: "recipientName", required: true },
    { key: "recipientStreet" },
    { key: "recipientCity" },
    { key: "flatAddress", required: true },
    { key: "endDate", type: "date" },
  ],
  objection: [
    ...COMMON_SENDER_FIELDS,
    { key: "recipientName", required: true },
    { key: "recipientStreet" },
    { key: "recipientCity" },
    { key: "fileRef", required: true },
    { key: "noticeDate", type: "date", required: true },
    { key: "reason", type: "textarea" },
  ],
  appointment: [
    ...COMMON_SENDER_FIELDS,
    { key: "senderEmail" },
    { key: "recipientName", required: true },
    { key: "recipientStreet" },
    { key: "recipientCity" },
    { key: "fileRef" },
    { key: "reason", type: "textarea", required: true },
  ],
};

export type LetterValues = Record<string, string>;

// 2026-03-05 -> 05.03.2026; anything that is not an ISO date is returned unchanged
export function formatGermanDate(value: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : value;
}

const v = (values: LetterValues, key: string) => (values[key] ?? "").trim();

function sender(values: LetterValues): string {
  return [v(values, "senderName"), v(values, "senderStreet"), v(values, "senderCity")].filter(Boolean).join("\n");
}

function recipient(values: LetterValues): string {
  return [v(values, "recipientName"), v(values, "recipientStreet"), v(values, "recipientCity")].filter(Boolean).join("\n");
}

function frame(values: LetterValues, subject: string, body: string, today: Date, to = recipient(values)): string {
  const date = formatGermanDate(today.toISOString().slice(0, 10));
  const city = v(values, "senderCity").replace(/^\d{4,5}\s*/, "");
  return [sender(values), "", to, "", `${city ? `${city}, ` : ""}${date}`, "", subject, "", body, "", `Mit freundlichen Grüßen`, "", "", v(values, "senderName")]
    .join("\n");
}

// Builds the letter text. `today` is a parameter so the output can be tested.
export function buildLetter(id: LetterId, values: LetterValues, today = new Date()): string {
  switch (id) {
    case "rentalApplication": {
      const lines = [
        "Sehr geehrte Damen und Herren,",
        "",
        `hiermit bewerbe ich mich um die Wohnung in ${v(values, "flatAddress")}.`,
      ];
      const facts: string[] = [];
      if (v(values, "persons")) facts.push(`Der Haushalt besteht aus ${v(values, "persons")} Person${v(values, "persons") === "1" ? "" : "en"}.`);
      if (v(values, "occupation")) facts.push(`Beruflich bin ich als ${v(values, "occupation")} tätig.`);
      if (v(values, "moveIn")) facts.push(`Ich würde die Wohnung gern zum ${formatGermanDate(v(values, "moveIn"))} beziehen.`);
      if (facts.length) lines.push("", facts.join(" "));
      if (v(values, "about")) lines.push("", v(values, "about"));
      if (v(values, "docs")) lines.push("", `Meine Unterlagen (${v(values, "docs")}) füge ich diesem Schreiben bei.`);
      const contact = [v(values, "senderEmail") && `E-Mail: ${v(values, "senderEmail")}`, v(values, "senderPhone") && `Telefon: ${v(values, "senderPhone")}`].filter(Boolean).join(", ");
      lines.push("", `Über eine Einladung zur Besichtigung würde ich mich sehr freuen.${contact ? ` Sie erreichen mich unter: ${contact}.` : ""}`);
      const to = v(values, "landlordName");
      return frame(values, `Bewerbung um die Wohnung ${v(values, "flatAddress")}`, lines.join("\n"), today, to);
    }
    case "cancelContract": {
      const end = v(values, "endDate") ? `zum ${formatGermanDate(v(values, "endDate"))}, hilfsweise` : "";
      const body = [
        "Sehr geehrte Damen und Herren,",
        "",
        `hiermit kündige ich den Vertrag mit der Nummer ${v(values, "contractRef")} ${end ? `${end} ` : ""}fristgerecht zum nächstmöglichen Zeitpunkt.`,
        "",
        "Bitte bestätigen Sie mir die Kündigung und das Beendigungsdatum schriftlich.",
      ].join("\n");
      return frame(values, `Kündigung des Vertrags ${v(values, "contractRef")}`, body, today);
    }
    case "cancelLease": {
      const end = v(values, "endDate") ? `zum ${formatGermanDate(v(values, "endDate"))}, hilfsweise ` : "";
      const body = [
        "Sehr geehrte Damen und Herren,",
        "",
        `hiermit kündige ich das Mietverhältnis über die Wohnung ${v(values, "flatAddress")} ${end}fristgerecht zum nächstmöglichen Zeitpunkt.`,
        "",
        "Bitte bestätigen Sie mir den Eingang der Kündigung und das Beendigungsdatum schriftlich. Gern vereinbare ich mit Ihnen einen Termin für die Wohnungsübergabe.",
      ].join("\n");
      return frame(values, `Kündigung des Mietverhältnisses ${v(values, "flatAddress")}`, body, today);
    }
    case "objection": {
      const body = [
        "Sehr geehrte Damen und Herren,",
        "",
        `gegen Ihren Bescheid vom ${formatGermanDate(v(values, "noticeDate"))} (Aktenzeichen: ${v(values, "fileRef")}) lege ich hiermit Widerspruch ein.`,
        ...(v(values, "reason") ? ["", `Begründung: ${v(values, "reason")}`] : ["", "Eine Begründung reiche ich innerhalb der Widerspruchsfrist nach."]),
        "",
        "Bitte bestätigen Sie mir den Eingang des Widerspruchs schriftlich.",
      ].join("\n");
      return frame(values, `Widerspruch gegen den Bescheid vom ${formatGermanDate(v(values, "noticeDate"))}, Az. ${v(values, "fileRef")}`, body, today);
    }
    case "appointment": {
      const body = [
        "Sehr geehrte Damen und Herren,",
        "",
        `ich bitte um einen Termin${v(values, "fileRef") ? ` in meiner Angelegenheit (Aktenzeichen: ${v(values, "fileRef")})` : ""}.`,
        "",
        `Anlass: ${v(values, "reason")}`,
        "",
        `Bitte teilen Sie mir mögliche Termine mit${v(values, "senderEmail") ? ` (E-Mail: ${v(values, "senderEmail")})` : ""}.`,
      ].join("\n");
      return frame(values, "Terminanfrage", body, today);
    }
  }
}

// Which required fields are still empty
export function missingFields(id: LetterId, values: LetterValues): string[] {
  return LETTER_FIELDS[id].filter((f) => f.required && !v(values, f.key)).map((f) => f.key);
}
