import { describe, expect, it } from "vitest";
import { recommendInsurance, type InsuranceAnswers } from "./insurance";

const base: InsuranceAnswers = {
  occupation: "employed",
  hasFamily: false,
  hasCar: false,
  hasPet: "none",
  ownsValuables: false,
  travelsAbroad: false,
  relyOnIncome: false,
};
const ids = (a: InsuranceAnswers, priority: string) => recommendInsurance(a).filter((i) => i.priority === priority).map((i) => i.id);

describe("recommendInsurance", () => {
  it("always lists health and care insurance as mandatory", () => {
    expect(ids(base, "mandatory")).toEqual(["health", "care"]);
  });
  it("adds car liability for car owners and dog liability for dog owners", () => {
    expect(ids({ ...base, hasCar: true, hasPet: "dog" }, "mandatory")).toEqual(expect.arrayContaining(["carLiability", "dogLiability"]));
    expect(ids({ ...base, hasPet: "cat" }, "mandatory")).not.toContain("dogLiability");
  });
  it("recommends disability insurance only when income is relied upon and not for students", () => {
    expect(ids({ ...base, relyOnIncome: true }, "recommended")).toContain("disability");
    expect(ids({ ...base, relyOnIncome: true, occupation: "student" }, "recommended")).not.toContain("disability");
  });
  it("sorts mandatory first", () => {
    const list = recommendInsurance({ ...base, hasCar: true });
    expect(list[0].priority).toBe("mandatory");
    expect(list.at(-1)?.priority).toBe("consider");
  });
});
