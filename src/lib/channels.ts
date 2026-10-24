// Rules for the channel directory: which platforms exist and which links are accepted.
export const PLATFORMS = ["tiktok", "instagram", "youtube", "spotify", "apple-podcasts", "podcast", "x", "facebook", "linkedin", "website"] as const;
export type Platform = (typeof PLATFORMS)[number];

export const PLATFORM_LABELS: Record<Platform, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  youtube: "YouTube",
  spotify: "Spotify",
  "apple-podcasts": "Apple Podcasts",
  podcast: "Podcast",
  x: "X",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  website: "Website",
};

export const TOPICS = ["language", "food", "life", "bureaucracy", "work", "podcast", "other"] as const;
export type Topic = (typeof TOPICS)[number];

export const CHANNEL_LANGUAGES = ["tr", "de", "en", "other"] as const;

export function isPlatform(value: string): value is Platform {
  return (PLATFORMS as readonly string[]).includes(value);
}

// Only plain https links to a real host are accepted: no credentials, no other schemes
export function parseChannelUrl(raw: string): URL | null {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || url.username || url.password) return null;
  if (!url.hostname.includes(".")) return null;
  return url;
}

// rel attribute for outgoing links: recommended accounts get nofollow, paid ones sponsored
export function channelRel(channel: { kind: string; sponsored: boolean }): string {
  const rel = ["noopener", "noreferrer"];
  if (channel.kind !== "OWN") rel.push("nofollow");
  if (channel.sponsored) rel.push("sponsored");
  return rel.join(" ");
}
