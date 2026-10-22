// Personal roadmap: a profile (5 answers) is turned into a dated checklist.
// Task texts live in src/messages/*.json (Roadmap.tasks.<id>); this file only holds the rules and timing.

export const PERMITS = ["blueCard", "skilledWorker", "opportunityCard", "ausbildung", "familyReunion", "other"] as const;
export type Permit = (typeof PERMITS)[number];

export const GOALS = ["language", "permanentResidence", "citizenship"] as const;
export type Goal = (typeof GOALS)[number];

export type Profile = {
  permit: Permit;
  spouse: boolean;
  children: boolean;
  city: string; // optional, only shown on the printed list
  arrival: string; // ISO date, YYYY-MM-DD (planned or actual arrival)
  goals: Goal[];
};

export const STAGES = ["PRE_ARRIVAL", "FIRST_WEEK", "FIRST_MONTH", "FIRST_SIX_MONTHS", "LONG_TERM"] as const;
export type RoadmapStage = (typeof STAGES)[number];

type Due = { days: number } | { months: number };

type TaskDef = {
  id: string;
  due: Due;
  // Slug of the guide to link to; may depend on the profile
  guide?: string | ((p: Profile) => string | undefined);
  when?: (p: Profile) => boolean;
};

const VISA_GUIDES: Partial<Record<Permit, string>> = {
  blueCard: "blue-card",
  skilledWorker: "work-visa-18b",
  opportunityCard: "opportunity-card",
  ausbildung: "ausbildung-visa-16a",
  familyReunion: "family-reunion-spouse",
};

const EMPLOYEE_PERMITS: Permit[] = ["blueCard", "skilledWorker", "ausbildung"];

export const TASKS: TaskDef[] = [
  // Before arrival
  { id: "documents", due: { days: -75 }, guide: "turkish-documents-apostille" },
  { id: "diploma", due: { days: -90 }, guide: "diploma-recognition", when: (p) => ["blueCard", "skilledWorker", "opportunityCard", "ausbildung"].includes(p.permit) },
  { id: "languageVisa", due: { days: -60 }, guide: "b1-german-exams", when: (p) => ["familyReunion", "ausbildung", "opportunityCard"].includes(p.permit) },
  { id: "visa", due: { days: -45 }, guide: (p) => VISA_GUIDES[p.permit], when: (p) => p.permit !== "other" },
  { id: "blockedAccount", due: { days: -40 }, guide: "opportunity-card", when: (p) => p.permit === "opportunityCard" },
  { id: "housing", due: { days: -30 }, guide: "housing-search" },
  { id: "healthChoose", due: { days: -14 }, guide: "choose-krankenkasse", when: (p) => EMPLOYEE_PERMITS.includes(p.permit) },
  // First weeks
  { id: "anmeldung", due: { days: 7 }, guide: "anmeldung" },
  { id: "deutschlandticket", due: { days: 7 }, guide: "deutschlandticket" },
  { id: "residencePermit", due: { days: 14 }, when: (p) => p.permit !== "other" },
  { id: "bank", due: { days: 21 }, guide: "open-bank-account" },
  { id: "schufa", due: { days: 20 }, guide: "schufa" },
  // First month
  { id: "taxId", due: { days: 30 }, guide: "tax-id-and-tax-classes" },
  { id: "taxClass", due: { days: 30 }, guide: "tax-id-and-tax-classes", when: (p) => p.spouse },
  { id: "rundfunkbeitrag", due: { days: 30 }, guide: "rundfunkbeitrag" },
  { id: "doctor", due: { days: 30 }, guide: "doctors-and-emergencies" },
  { id: "familyInsurance", due: { days: 30 }, guide: "family-health-insurance", when: (p) => p.spouse || p.children },
  // First six months
  { id: "kindergeld", due: { days: 45 }, guide: "kindergeld", when: (p) => p.children },
  { id: "kita", due: { days: 45 }, guide: "kita-gutschein", when: (p) => p.children },
  { id: "integrationCourse", due: { days: 60 }, guide: "integration-course" },
  { id: "bzst", due: { days: 90 }, guide: "tax-id-and-tax-classes" },
  { id: "driving", due: { days: 150 }, guide: "driving-licence-exchange" },
  // Long term
  { id: "languageB1", due: { months: 12 }, guide: "b1-german-exams", when: (p) => p.goals.length > 0 },
  { id: "permBlueCard", due: { months: 21 }, guide: "blue-card-permanent-residence", when: (p) => p.permit === "blueCard" && p.goals.includes("permanentResidence") },
  { id: "permSkilled", due: { months: 36 }, guide: "permanent-residence-overview", when: (p) => p.permit === "skilledWorker" && p.goals.includes("permanentResidence") },
  {
    id: "permStandard",
    due: { months: 60 },
    guide: "permanent-residence-overview",
    when: (p) => ["opportunityCard", "ausbildung", "familyReunion", "other"].includes(p.permit) && p.goals.includes("permanentResidence"),
  },
  { id: "citizenship", due: { months: 60 }, guide: "naturalization-requirements", when: (p) => p.goals.includes("citizenship") },
];

// Midday avoids daylight-saving edge cases when adding days
export function parseDate(iso: string): Date {
  return new Date(`${iso}T12:00:00`);
}

export function dueDate(arrival: string, due: Due): Date {
  const date = parseDate(arrival);
  if ("days" in due) date.setDate(date.getDate() + due.days);
  else date.setMonth(date.getMonth() + due.months);
  return date;
}

export function stageOf(due: Due): RoadmapStage {
  const approxDays = "days" in due ? due.days : due.months * 30;
  if (approxDays < 0) return "PRE_ARRIVAL";
  if (approxDays <= 7) return "FIRST_WEEK";
  if (approxDays <= 30) return "FIRST_MONTH";
  if (approxDays <= 183) return "FIRST_SIX_MONTHS";
  return "LONG_TERM";
}

export type RoadmapItem = { id: string; due: Date; stage: RoadmapStage; guide?: string };

export function buildRoadmap(profile: Profile): RoadmapItem[] {
  return TASKS.filter((t) => !t.when || t.when(profile))
    .map((t) => ({
      id: t.id,
      due: dueDate(profile.arrival, t.due),
      stage: stageOf(t.due),
      guide: typeof t.guide === "function" ? t.guide(profile) : t.guide,
    }))
    .sort((a, b) => a.due.getTime() - b.due.getTime());
}

export function isProfile(value: unknown): value is Profile {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.permit === "string" &&
    (PERMITS as readonly string[]).includes(v.permit) &&
    typeof v.arrival === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(v.arrival) &&
    Array.isArray(v.goals) &&
    typeof v.spouse === "boolean" &&
    typeof v.children === "boolean"
  );
}
