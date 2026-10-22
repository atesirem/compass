import { describe, expect, it } from "vitest";
import { GUIDE_TEMPLATES, hasTodoMarkers } from "./guide-template";

describe("guide templates", () => {
  it("every language template is full of TODO markers so it cannot be published unchanged", () => {
    for (const locale of ["tr", "de", "en"] as const) {
      expect(hasTodoMarkers(GUIDE_TEMPLATES[locale])).toBe(true);
    }
  });

  it("detects the marker anywhere in a text", () => {
    expect(hasTodoMarkers("## Title\nTODO: check this")).toBe(true);
    expect(hasTodoMarkers("## Title\nAll done")).toBe(false);
  });
});
