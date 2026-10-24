import { describe, expect, it } from "vitest";
import { channelRel, isPlatform, parseChannelUrl } from "./channels";

describe("parseChannelUrl", () => {
  it("accepts https links", () => {
    expect(parseChannelUrl("https://www.tiktok.com/@name")?.hostname).toBe("www.tiktok.com");
  });
  it("rejects other schemes, credentials and bare hosts", () => {
    expect(parseChannelUrl("http://example.com")).toBeNull();
    expect(parseChannelUrl("javascript:alert(1)")).toBeNull();
    expect(parseChannelUrl("https://user:pw@example.com")).toBeNull();
    expect(parseChannelUrl("https://localhost")).toBeNull();
    expect(parseChannelUrl("not a url")).toBeNull();
  });
});

describe("channelRel", () => {
  it("adds nofollow for recommended and sponsored for paid links", () => {
    expect(channelRel({ kind: "OWN", sponsored: false })).toBe("noopener noreferrer");
    expect(channelRel({ kind: "RECOMMENDED", sponsored: true })).toBe("noopener noreferrer nofollow sponsored");
  });
});

describe("isPlatform", () => {
  it("knows the platform list", () => {
    expect(isPlatform("tiktok")).toBe(true);
    expect(isPlatform("myspace")).toBe(false);
  });
});
