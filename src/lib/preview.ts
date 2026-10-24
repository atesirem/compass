import type { GuideStatus } from "@prisma/client";

// Local preview: with PREVIEW_DRAFTS=1 the public pages also show drafts and posts in review,
// so the whole site can be looked at before anything is verified. It never works in production.
export function previewDrafts(): boolean {
  return process.env.NODE_ENV !== "production" && process.env.PREVIEW_DRAFTS === "1";
}

// Status filter for every public query (the sitemap always stays strict: published only)
export function visibleStatus(): GuideStatus | { in: GuideStatus[] } {
  return previewDrafts() ? { in: ["DRAFT", "REVIEW", "PUBLISHED"] } : "PUBLISHED";
}
