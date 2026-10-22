import { describe, expect, it } from "vitest";
import { buildRoadmap, dueDate, isProfile, stageOf, type Profile } from "./roadmap";

const base: Profile = { permit: "other", spouse: false, children: false, city: "", arrival: "2026-01-15", goals: [] };
const ids = (p: Profile) => buildRoadmap(p).map((i) => i.id);
const iso = (d: Date) => d.toISOString().slice(0, 10);

describe("buildRoadmap", () => {
  it("gives a short core list for an unknown permit without goals", () => {
    expect(buildRoadmap(base)).toHaveLength(12);
    expect(ids(base)).toContain("anmeldung");
    expect(ids(base)).not.toContain("visa");
  });

  it("adds tasks for a Blue Card holder with family and long-term goals (23 tasks)", () => {
    const profile: Profile = { ...base, permit: "blueCard", spouse: true, children: true, goals: ["permanentResidence", "citizenship"] };
    expect(buildRoadmap(profile)).toHaveLength(23);
    expect(ids(profile)).toEqual(expect.arrayContaining(["permBlueCard", "citizenship", "kindergeld", "kita", "taxClass", "familyInsurance"]));
    expect(ids(profile)).not.toContain("permStandard");
  });

  it("picks the permanent residence route by permit", () => {
    const goals = ["permanentResidence" as const];
    expect(ids({ ...base, permit: "skilledWorker", goals })).toContain("permSkilled");
    expect(ids({ ...base, permit: "familyReunion", goals })).toContain("permStandard");
    expect(ids({ ...base, permit: "familyReunion", goals })).not.toContain("permBlueCard");
  });

  it("links the visa task to the guide for the permit", () => {
    const visa = buildRoadmap({ ...base, permit: "ausbildung" }).find((i) => i.id === "visa");
    expect(visa?.guide).toBe("ausbildung-visa-16a");
  });

  it("sorts by due date", () => {
    const dates = buildRoadmap({ ...base, permit: "blueCard", goals: ["citizenship"] }).map((i) => i.due.getTime());
    expect(dates).toEqual([...dates].sort((a, b) => a - b));
  });
});

describe("dueDate and stageOf", () => {
  it("adds days and months to the arrival date", () => {
    expect(iso(dueDate("2026-01-15", { days: 7 }))).toBe("2026-01-22");
    expect(iso(dueDate("2026-01-15", { days: -75 }))).toBe("2025-11-01");
    expect(iso(dueDate("2026-01-15", { months: 21 }))).toBe("2027-10-15");
    expect(iso(dueDate("2026-01-15", { months: 60 }))).toBe("2031-01-15");
  });

  it("maps timing to timeline stages", () => {
    expect(stageOf({ days: -1 })).toBe("PRE_ARRIVAL");
    expect(stageOf({ days: 7 })).toBe("FIRST_WEEK");
    expect(stageOf({ days: 30 })).toBe("FIRST_MONTH");
    expect(stageOf({ days: 150 })).toBe("FIRST_SIX_MONTHS");
    expect(stageOf({ months: 12 })).toBe("LONG_TERM");
  });
});

describe("isProfile", () => {
  it("accepts a valid profile and rejects broken stored data", () => {
    expect(isProfile(base)).toBe(true);
    expect(isProfile({ ...base, arrival: "15.01.2026" })).toBe(false);
    expect(isProfile({ ...base, permit: "nope" })).toBe(false);
    expect(isProfile(null)).toBe(false);
    expect(isProfile("x")).toBe(false);
  });
});
