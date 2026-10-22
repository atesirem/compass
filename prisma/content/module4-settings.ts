// Volatile facts used by the Module 4 guides via {{setting:key}}. Created only if missing.
export const module4Settings: { key: string; value: string; note: string }[] = [
  { key: "deutschlandticketPrice", value: "63 €", note: "Monthly price since 1 Jan 2026 (finanztip, muenchen.de). From 2027 a price index applies; amount not official yet." },
  { key: "rundfunkbeitragMonthly", value: "18,36 €", note: "Broadcasting contribution per dwelling and month in 2026 (Beitragsservice via finanztip/fimportal). A 2027 proposal exists (KEF), not final." },
  { key: "schufaBonitaetsAuskunftPrice", value: "29,95 €", note: "Price of the paid SCHUFA BonitätsAuskunft for tenancy applications per comparison portal. Check meineschufa.de before buying." },
  { key: "employeeAllowance", value: "1.230 €", note: "Arbeitnehmer-Pauschbetrag per year, deducted automatically (§ 9a EStG)." },
  { key: "homeofficeDaily", value: "6 €", note: "Home office flat rate per day (§ 4 Abs. 5 Nr. 6c EStG)." },
  { key: "homeofficeMax", value: "1.260 €", note: "Maximum home office flat rate per year (§ 4 Abs. 5 Nr. 6c EStG)." },
];
