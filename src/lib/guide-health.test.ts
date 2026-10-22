import { describe, expect, it } from "vitest";
import { findSettingKeys, replaceSettingKeys, slugify, staleCutoff, verificationState } from "./guide-health";

const now = new Date("2026-10-22T12:00:00Z");
const daysAgo = (n: number) => new Date(now.getTime() - n * 86_400_000);

describe("verificationState", () => {
  it("is never without a date, fresh within 90 days and stale after", () => {
    expect(verificationState(null, now)).toBe("never");
    expect(verificationState(daysAgo(10), now)).toBe("fresh");
    expect(verificationState(daysAgo(90), now)).toBe("fresh");
    expect(verificationState(daysAgo(91), now)).toBe("stale");
  });

  it("uses the same cutoff in queries", () => {
    expect(staleCutoff(now).getTime()).toBe(daysAgo(90).getTime());
  });
});

describe("setting placeholders", () => {
  it("finds and replaces keys, marking unknown ones", () => {
    const text = "Price {{setting:deutschlandticketPrice}} and {{setting:missingKey}}";
    expect(findSettingKeys(text)).toEqual(["deutschlandticketPrice", "missingKey"]);
    expect(replaceSettingKeys(text, { deutschlandticketPrice: "63 €" })).toBe("Price 63 € and [missingKey?]");
  });

  it("leaves text without placeholders alone", () => {
    expect(replaceSettingKeys("plain", {})).toBe("plain");
  });
});

describe("slugify", () => {
  it("transliterates Turkish and German characters", () => {
    expect(slugify("Çalışma Vizesi")).toBe("calisma-vizesi");
    expect(slugify("Ausländerbehörde & Größe")).toBe("auslanderbehorde-grosse");
    expect(slugify("  Anmeldung (İkametgah)  ")).toBe("anmeldung-ikametgah");
  });
});
