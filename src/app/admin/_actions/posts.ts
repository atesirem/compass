"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireStaff } from "@/lib/auth";
import { db } from "@/lib/db";
import { hasTodoMarkers, TODO_MARKER } from "@/lib/guide-template";
import type { ActionResult } from "./types";

const slugPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const postSchema = z.object({
  slug: z.string().regex(slugPattern, "Slug: lowercase letters, numbers and dashes only").max(120),
  locale: z.enum(["tr", "de", "en"]),
  kind: z.enum(["EXPERIENCE", "ARTICLE"]),
  status: z.enum(["DRAFT", "REVIEW", "PUBLISHED"]),
  title: z.string().trim().min(1, "A title is required").max(200, "The title is too long"),
  summary: z.string().trim().max(500, "The summary is too long"),
  bodyMarkdown: z.string().max(200_000, "The text is too long"),
  authorName: z.string().trim().min(1, "An author name is required").max(80),
  tags: z.string().max(300),
  guideSlug: z.string().trim().max(120).refine((v) => v === "" || slugPattern.test(v), "Related guide slug is not valid"),
});

export async function savePostAction(
  postId: string | null,
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requireStaff();

  const parsed = postSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const data = parsed.data;

  // Editors prepare posts; only admins publish or change published posts
  if (user.role === "EDITOR") {
    if (data.status === "PUBLISHED") return { error: "Only admins can publish. Set the status to Review." };
    if (postId) {
      const existing = await db.post.findUnique({ where: { id: postId }, select: { status: true } });
      if (existing?.status === "PUBLISHED") return { error: "Only admins can edit published posts." };
    }
  }

  const tags = [...new Set(data.tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean))];
  if (tags.length > 8 || tags.some((t) => t.length > 30)) return { error: "Use at most 8 tags of up to 30 characters" };

  if (data.status === "PUBLISHED") {
    if (!data.summary) return { error: "A published post needs a summary" };
    if (!data.bodyMarkdown.trim()) return { error: "A published post needs text" };
    if (hasTodoMarkers(data.bodyMarkdown)) return { error: `Remove every "${TODO_MARKER}" line from the text before publishing` };
  }

  const existing = postId ? await db.post.findUnique({ where: { id: postId }, select: { publishedAt: true } }) : null;
  const base = {
    slug: data.slug,
    locale: data.locale,
    kind: data.kind,
    status: data.status,
    title: data.title,
    summary: data.summary,
    bodyMarkdown: data.bodyMarkdown,
    authorName: data.authorName,
    tags,
    guideSlug: data.guideSlug || null,
    // The publication date is set once, on the first publish
    publishedAt: data.status === "PUBLISHED" ? (existing?.publishedAt ?? new Date()) : (existing?.publishedAt ?? null),
  };

  let savedId: string;
  try {
    const post = postId ? await db.post.update({ where: { id: postId }, data: base }) : await db.post.create({ data: base });
    savedId = post.id;
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { error: "This slug is already used by another post" };
    }
    return { error: "Could not save the post" };
  }

  revalidatePath("/admin", "layout");
  // redirect() throws, so it must stay outside the try block
  if (!postId) redirect(`/admin/posts/${savedId}?created=1`);
  return { saved: true };
}

export async function deletePostAction(formData: FormData) {
  const user = await requireStaff();
  if (user.role !== "ADMIN") return;
  await db.post.deleteMany({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin", "layout");
  redirect("/admin/posts");
}
