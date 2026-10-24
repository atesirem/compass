import { describe, expect, it } from "vitest";
import { bridgeDays, easterSunday, holidaysFor, isoDate } from "./holidays";

const dates = (state: Parameters<typeof holidaysFor>[0], year: number) =>
  Object.fromEntries(holidaysFor(state, year).map((h) => [h.id, isoDate(h.date)]));

describe("easterSunday", () => {
  it("matches the known dates", () => {
    expect(isoDate(easterSunday(2026))).toBe("2026-04-05");
    expect(isoDate(easterSunday(2027))).toBe("2027-03-28");
  });
});

describe("holidaysFor", () => {
  it("has the 9 nationwide days everywhere", () => {
    expect(holidaysFor("HH", 2026).filter((h) => !h.local)).toHaveLength(10); // + Reformationstag
    expect(holidaysFor("NW", 2026).map((h) => h.id)).toEqual(expect.arrayContaining(["newYear", "goodFriday", "easterMonday", "labourDay", "ascension", "whitMonday", "unityDay", "christmas", "boxingDay"]));
  });
  it("computes the movable days for 2026", () => {
    const d = dates("BY", 2026);
    expect(d.goodFriday).toBe("2026-04-03");
    expect(d.ascension).toBe("2026-05-14");
    expect(d.whitMonday).toBe("2026-05-25");
    expect(d.corpusChristi).toBe("2026-06-04");
  });
  it("computes the Buß- und Bettag for Saxony", () => {
    expect(dates("SN", 2026).repentanceDay).toBe("2026-11-18");
    expect(dates("SN", 2027).repentanceDay).toBe("2027-11-17");
  });
  it("applies state specific days", () => {
    expect(dates("BE", 2027).womensDay).toBe("2027-03-08");
    expect(dates("BW", 2026).epiphany).toBe("2026-01-06");
    expect(dates("NW", 2026).epiphany).toBeUndefined();
    expect(dates("BB", 2026).easterSunday).toBe("2026-04-05");
  });
  it("flags days that apply only in parts of a state", () => {
    expect(holidaysFor("BY", 2026).find((h) => h.id === "assumption")?.local).toBe(true);
    expect(holidaysFor("SL", 2026).find((h) => h.id === "assumption")?.local).toBe(false);
    expect(holidaysFor("SN", 2026).find((h) => h.id === "corpusChristi")?.local).toBe(true);
  });
});

describe("bridgeDays", () => {
  it("suggests Friday after Ascension (Thursday) for a 4-day break", () => {
    const b = bridgeDays("NW", 2026).find((x) => x.holiday === "ascension");
    expect(b?.leaveDays).toEqual(["2026-05-15"]);
    expect(b?.totalDaysOff).toBe(4);
    expect(b?.from).toBe("2026-05-14");
    expect(b?.to).toBe("2026-05-17");
  });
  it("suggests Monday before a Tuesday holiday (Epiphany 2026, Bavaria)", () => {
    const b = bridgeDays("BY", 2026).find((x) => x.holiday === "epiphany");
    expect(b?.leaveDays).toEqual(["2026-01-05"]);
    expect(b?.totalDaysOff).toBe(4);
  });
  it("offers two options for a Wednesday holiday and ignores local days", () => {
    const wed = bridgeDays("SN", 2026).filter((x) => x.holiday === "repentanceDay");
    expect(wed).toHaveLength(2);
    expect(wed[0].totalDaysOff).toBe(5);
    expect(bridgeDays("SN", 2026).some((x) => x.holiday === "corpusChristi")).toBe(false);
  });
  it("has no suggestion for holidays on a weekend or Monday/Friday", () => {
    expect(bridgeDays("NW", 2026).some((x) => x.holiday === "unityDay")).toBe(false); // Saturday
    expect(bridgeDays("NW", 2026).some((x) => x.holiday === "labourDay")).toBe(false); // Friday
  });
});
