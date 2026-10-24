"use client";

import { useActionState } from "react";
import { saveChannelAction } from "../_actions/channels";
import type { ActionResult } from "../_actions/types";
import { CHANNEL_LANGUAGES, PLATFORM_LABELS, PLATFORMS, TOPICS } from "@/lib/channels";
import { Flash, SubmitButton } from "./Feedback";
import { ui } from "./ui";

export type ChannelValues = {
  kind: "OWN" | "RECOMMENDED";
  platform: string;
  name: string;
  url: string;
  description: string;
  topic: string;
  language: string;
  position: number;
  sponsored: boolean;
  published: boolean;
};

export const EMPTY_CHANNEL: ChannelValues = {
  kind: "RECOMMENDED",
  platform: "tiktok",
  name: "",
  url: "",
  description: "",
  topic: "language",
  language: "tr",
  position: 0,
  sponsored: false,
  published: false,
};

export function ChannelForm({ channelId, initial = EMPTY_CHANNEL }: { channelId: string | null; initial?: ChannelValues }) {
  const [state, action] = useActionState<ActionResult | undefined, FormData>(saveChannelAction.bind(null, channelId), undefined);

  return (
    <form action={action} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className={ui.label}>
          Whose channel?
          <select name="kind" defaultValue={initial.kind} className={`${ui.input} mt-1`}>
            <option value="OWN">Ours</option>
            <option value="RECOMMENDED">Recommended (by someone else)</option>
          </select>
        </label>
        <label className={ui.label}>
          Platform
          <select name="platform" defaultValue={initial.platform} className={`${ui.input} mt-1`}>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>
                {PLATFORM_LABELS[p]}
              </option>
            ))}
          </select>
        </label>
        <label className={ui.label}>
          Topic
          <select name="topic" defaultValue={initial.topic} className={`${ui.input} mt-1`}>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className={ui.label}>
        Name
        <input name="name" defaultValue={initial.name} required maxLength={100} className={`${ui.input} mt-1`} />
      </label>
      <label className={ui.label}>
        Link
        <input name="url" type="url" defaultValue={initial.url} required placeholder="https://" className={`${ui.input} mt-1`} />
        <span className={ui.hint}>Must start with https://. It is shown as a link only; nothing is embedded.</span>
      </label>
      <label className={ui.label}>
        Short description
        <textarea name="description" defaultValue={initial.description} rows={2} maxLength={500} className={`${ui.input} mt-1`} />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={ui.label}>
          Language of the content
          <select name="language" defaultValue={initial.language} className={`${ui.input} mt-1`}>
            {CHANNEL_LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label className={ui.label}>
          Order (smaller first)
          <input name="position" type="number" min={0} max={9999} defaultValue={initial.position} className={`${ui.input} mt-1`} />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="sponsored" value="1" defaultChecked={initial.sponsored} />
        Paid or affiliate link (shown with an Ad label; only for recommended channels)
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" value="1" defaultChecked={initial.published} />
        Show on the public page
      </label>
      <Flash state={state} />
      <SubmitButton className={ui.btnPrimary}>{channelId ? "Save channel" : "Add channel"}</SubmitButton>
    </form>
  );
}
