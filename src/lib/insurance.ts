// "Which insurance do I need?" quiz: answers in, a list of insurance types with a priority out.
// Only general categories, no products or providers. Texts live in messages Insurance.*.
export type Occupation = "employed" | "student" | "selfEmployed" | "jobseeker";

export type InsuranceAnswers = {
  occupation: Occupation;
  hasFamily: boolean; // partner or children in the household
  hasCar: boolean;
  hasPet: "none" | "cat" | "dog";
  ownsValuables: boolean; // furniture, electronics etc. you could not easily replace
  travelsAbroad: boolean;
  relyOnIncome: boolean; // your household lives from your work income
};

export type Priority = "mandatory" | "recommended" | "consider";
export type InsuranceId =
  | "health"
  | "care"
  | "liability"
  | "carLiability"
  | "dogLiability"
  | "disability"
  | "household"
  | "legal"
  | "travelHealth"
  | "accident";

export type InsuranceItem = { id: InsuranceId; priority: Priority };

const ORDER: Record<Priority, number> = { mandatory: 0, recommended: 1, consider: 2 };

export function recommendInsurance(a: InsuranceAnswers): InsuranceItem[] {
  const items: InsuranceItem[] = [
    // Health and long-term care insurance are compulsory for everyone living in Germany
    { id: "health", priority: "mandatory" },
    { id: "care", priority: "mandatory" },
    { id: "liability", priority: "recommended" },
  ];
  if (a.hasCar) items.push({ id: "carLiability", priority: "mandatory" });
  // Dog liability is required in some states and common practice in others
  if (a.hasPet === "dog") items.push({ id: "dogLiability", priority: "mandatory" });
  if (a.occupation !== "student" && a.relyOnIncome) items.push({ id: "disability", priority: "recommended" });
  else items.push({ id: "disability", priority: "consider" });
  if (a.ownsValuables) items.push({ id: "household", priority: "recommended" });
  else items.push({ id: "household", priority: "consider" });
  if (a.travelsAbroad) items.push({ id: "travelHealth", priority: "recommended" });
  items.push({ id: "legal", priority: "consider" });
  if (a.hasFamily) items.push({ id: "accident", priority: "consider" });

  return items.sort((x, y) => ORDER[x.priority] - ORDER[y.priority]);
}
