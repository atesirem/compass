import { beforeAll, describe, expect, it } from "vitest";
import { absoluteUrl, alternatesFor, jsonLdString, localizedPath, siteUrl } from "./seo";

beforeAll(() => {
  process.env.SITE_URL = "https://example.org/";
});

describe("seo helpers", () => {
  it("builds absolute URLs without double slashes", () => {
    expect(siteUrl()).toBe("https://example.org");
    expect(localizedPath("tr", "/")).toBe("/tr");
    expect(localizedPath("de", "/guides/anmeldung")).toBe("/de/guides/anmeldung");
    expect(absoluteUrl("en", "/timeline")).toBe("https://example.org/en/timeline");
  });

  it("lists hreflang alternates only for existing languages and points x-default to Turkish", () => {
    const alt = alternatesFor("de", "/guides/x", ["tr", "de"]);
    expect(alt.canonical).toBe("https://example.org/de/guides/x");
    expect(alt.languages).toEqual({
      tr: "https://example.org/tr/guides/x",
      de: "https://example.org/de/guides/x",
      "x-default": "https://example.org/tr/guides/x",
    });
  });

  it("escapes < in JSON-LD so data cannot close the script tag", () => {
    const out = jsonLdString({ name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("<");
    expect(JSON.parse(out).name).toContain("</script>");
  });
});
