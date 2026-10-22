// Volatile facts used by the Module 2 guides via {{setting:key}}. Created only if missing.
export const module2Settings: { key: string; value: string; note: string }[] = [
  {
    key: "jaegThreshold",
    value: "77.400 €",
    note: "2026: annual income limit (Versicherungspflichtgrenze/JAEG) above which employees may choose private insurance. 2025 was 73.800 €. Source: SvBezGrV 2026.",
  },
  {
    key: "gkvGeneralRate",
    value: "%14,6",
    note: "General statutory health insurance contribution rate in 2026 (vdek).",
  },
  {
    key: "gkvAvgAdditionalRate",
    value: "%2,9",
    note: "Average additional contribution (Zusatzbeitrag) set by the Federal Ministry of Health for 2026. Each Krankenkasse sets its own rate.",
  },
  {
    key: "gkvContributionCeilingMonthly",
    value: "5.812,50 €",
    note: "2026 monthly ceiling up to which contributions are calculated (Beitragsbemessungsgrenze KV, 69.750 € per year).",
  },
  {
    key: "familyInsuranceIncomeLimit",
    value: "565 €",
    note: "2026: monthly income limit for free family insurance (1/7 of the Bezugsgröße 3.955 €, § 10 SGB V).",
  },
  {
    key: "minijobLimit",
    value: "603 €",
    note: "2026: monthly limit for a minijob, used for the family insurance rule (§ 10 SGB V).",
  },
];
