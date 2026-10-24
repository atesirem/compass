import { describe, expect, it } from "vitest";
import { buildLetter, formatGermanDate, missingFields } from "./letters";

const today = new Date("2026-03-05T10:00:00Z");
const sender = { senderName: "Ayşe Yılmaz", senderStreet: "Musterstraße 1", senderCity: "10115 Berlin" };

describe("formatGermanDate", () => {
  it("formats ISO dates and leaves other text alone", () => {
    expect(formatGermanDate("2026-03-05")).toBe("05.03.2026");
    expect(formatGermanDate("bald")).toBe("bald");
  });
});

describe("buildLetter", () => {
  it("writes a cancellation with the contract number and the sender block", () => {
    const text = buildLetter("cancelContract", { ...sender, recipientName: "Strom AG", contractRef: "K-123" }, today);
    expect(text).toContain("Ayşe Yılmaz\nMusterstraße 1\n10115 Berlin");
    expect(text).toContain("Strom AG");
    expect(text).toContain("Berlin, 05.03.2026");
    expect(text).toContain("Kündigung des Vertrags K-123");
    expect(text).toContain("Mit freundlichen Grüßen");
  });
  it("mentions the requested end date in German format", () => {
    const text = buildLetter("cancelLease", { ...sender, recipientName: "Vermieter", flatAddress: "Weg 2", endDate: "2026-09-30" }, today);
    expect(text).toContain("zum 30.09.2026");
  });
  it("builds an objection that quotes the notice date and file number", () => {
    const text = buildLetter("objection", { ...sender, recipientName: "Amt", fileRef: "AZ 9", noticeDate: "2026-02-01" }, today);
    expect(text).toContain("Bescheid vom 01.02.2026");
    expect(text).toContain("Aktenzeichen: AZ 9");
  });
  it("addresses a rental application to the landlord when given", () => {
    const text = buildLetter("rentalApplication", { ...sender, flatAddress: "Allee 3", landlordName: "Herr Müller", persons: "2" }, today);
    expect(text).toContain("Herr Müller");
    expect(text).toContain("2 Personen");
  });
});

describe("missingFields", () => {
  it("lists required fields that are empty", () => {
    expect(missingFields("cancelContract", { senderName: "A" })).toEqual(["senderStreet", "senderCity", "recipientName", "contractRef"]);
  });
});
