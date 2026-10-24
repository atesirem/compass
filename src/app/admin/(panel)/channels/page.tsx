import { requireStaff } from "@/lib/auth";
import { db } from "@/lib/db";
import { PLATFORM_LABELS, type Platform } from "@/lib/channels";
import { deleteChannelAction } from "../../_actions/channels";
import { ChannelForm } from "../../_components/ChannelForm";
import { ConfirmSubmit } from "../../_components/Feedback";
import { ui } from "../../_components/ui";

export const dynamic = "force-dynamic";

export default async function ChannelsAdminPage() {
  const user = await requireStaff();
  const canEdit = user.role === "ADMIN";
  const channels = await db.channel.findMany({ orderBy: [{ kind: "asc" }, { position: "asc" }, { name: "asc" }] });

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Channels</h1>
      <p className="mt-1 text-sm text-fg-muted">
        Our own social media accounts and the accounts, podcasts and sites we recommend. They appear on the public Channels page as links.
      </p>

      {canEdit ? (
        <details className={`${ui.card} mt-6`}>
          <summary className="cursor-pointer text-sm font-bold">Add a channel</summary>
          <div className="mt-4">
            <ChannelForm channelId={null} />
          </div>
        </details>
      ) : (
        <p className="mt-6 rounded-2xl bg-surface px-5 py-4 text-sm text-fg-muted">Only admins can change channels.</p>
      )}

      <p className="mt-6 text-sm text-fg-muted">{channels.length} channel(s)</p>
      <ul className="mt-2 space-y-3">
        {channels.map((c) => (
          <li key={c.id}>
            <details className={ui.card}>
              <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-2">
                <span className="font-bold">{c.name}</span>
                <span className="text-sm text-fg-muted">
                  {PLATFORM_LABELS[c.platform as Platform] ?? c.platform} · {c.kind === "OWN" ? "ours" : "recommended"} ·{" "}
                  {c.published ? "public" : "hidden"}
                </span>
              </summary>
              {canEdit ? (
                <div className="mt-4 space-y-4">
                  <ChannelForm
                    channelId={c.id}
                    initial={{
                      kind: c.kind,
                      platform: c.platform,
                      name: c.name,
                      url: c.url,
                      description: c.description,
                      topic: c.topic,
                      language: c.language,
                      position: c.position,
                      sponsored: c.sponsored,
                      published: c.published,
                    }}
                  />
                  <form action={deleteChannelAction}>
                    <input type="hidden" name="id" value={c.id} />
                    <ConfirmSubmit message={`Delete "${c.name}"?`}>Delete channel</ConfirmSubmit>
                  </form>
                </div>
              ) : (
                <p className="mt-3 break-all text-sm text-fg-muted">{c.url}</p>
              )}
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}
