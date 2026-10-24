"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { CHANNEL_LANGUAGES, isPlatform, parseChannelUrl, TOPICS } from "@/lib/channels";
import type { ActionResult } from "./types";

const channelSchema = z.object({
  kind: z.enum(["OWN", "RECOMMENDED"]),
  platform: z.string().refine(isPlatform, "Choose a platform"),
  name: z.string().trim().min(1, "A name is required").max(100),
  url: z.string().trim().max(500),
  description: z.string().trim().max(500, "The description is too long"),
  topic: z.enum(TOPICS),
  language: z.enum(CHANNEL_LANGUAGES),
  position: z.coerce.number().int().min(0).max(9999),
});

// Channels are links shown to everyone, so only admins change them
export async function saveChannelAction(
  channelId: string | null,
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();

  const parsed = channelSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };
  const url = parseChannelUrl(parsed.data.url);
  if (!url) return { error: "The link must be a full https:// address" };

  const data = {
    ...parsed.data,
    url: url.toString(),
    sponsored: formData.get("sponsored") === "1",
    published: formData.get("published") === "1",
  };
  // Our own channels are never paid links
  if (data.kind === "OWN") data.sponsored = false;

  try {
    if (channelId) await db.channel.update({ where: { id: channelId }, data });
    else await db.channel.create({ data });
  } catch {
    return { error: "Could not save the channel" };
  }

  revalidatePath("/admin/channels");
  return { saved: true };
}

export async function deleteChannelAction(formData: FormData) {
  await requireAdmin();
  await db.channel.deleteMany({ where: { id: String(formData.get("id")) } });
  revalidatePath("/admin/channels");
}
