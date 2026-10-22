import { describe, expect, it } from "vitest";
import { operator, placeholdersLeft } from "./operator";

describe("legal operator data", () => {
  it("reports every placeholder that is still unfilled", () => {
    const left = placeholdersLeft(operator);
    expect(left).toEqual(expect.arrayContaining(["name", "email"]));
  });

  it("reports nothing for complete data", () => {
    const complete = {
      ...operator,
      name: "Ada Lovelace",
      street: "Musterstr. 1",
      postalCodeCity: "10115 Berlin",
      email: "ada@example.org",
      hostingProvider: "Example Hosting",
      hostingLocation: "Frankfurt, DE",
    };
    expect(placeholdersLeft(complete)).toEqual([]);
  });
});
