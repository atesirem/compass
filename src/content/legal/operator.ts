// Site operator data shown in the Impressum and the privacy policy.
// Replace every value in [BRACKETS] before going live. `npm run check:legal` fails while any are left.
export type Operator = {
  name: string;
  street: string;
  postalCodeCity: string;
  country: string;
  email: string;
  phone: string;
  vatId: string;
  hostingProvider: string;
  hostingLocation: string;
  logRetentionDays: number;
};

export const operator: Operator = {
  name: "[VORNAME NACHNAME]",
  street: "[STRASSE HAUSNUMMER]",
  postalCodeCity: "[PLZ ORT]",
  country: "Deutschland",
  email: "[E-MAIL-ADRESSE]",
  phone: "", // optional; leave empty to hide
  vatId: "", // only if you have one (USt-IdNr.); leave empty to hide
  hostingProvider: "[HOSTING-ANBIETER, z. B. Vercel Inc., USA]",
  hostingLocation: "[STANDORT DER SERVER]",
  logRetentionDays: 7,
};

// Date of the last review of the legal texts
export const LEGAL_LAST_UPDATED = "2026-10-22";

export function placeholdersLeft(o: Operator = operator): string[] {
  return Object.entries(o)
    .filter(([, v]) => typeof v === "string" && /\[[A-ZÄÖÜ].*\]/.test(v))
    .map(([k]) => k);
}
