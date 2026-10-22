import { db } from "@/lib/db";
import { deleteTermAction } from "../../_actions/glossary";
import { LocaleDots } from "../../_components/Badges";
import { ConfirmSubmit } from "../../_components/Feedback";
import { TermForm } from "../../_components/TermForm";
import { ui } from "../../_components/ui";
import { requireStaff } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function GlossaryPage({ searchParams }: PageProps<"/admin/glossary">) {
  const user = await requireStaff();
  const canEdit = user.role === "ADMIN";
  const params = await searchParams;
  const q = (Array.isArray(params.q) ? params.q[0] : params.q)?.trim().slice(0, 100) ?? "";

  const terms = await db.glossaryTerm.findMany({
    where: q
      ? {
          OR: [
            { german: { contains: q, mode: "insensitive" } },
            { translations: { some: { meaning: { contains: q, mode: "insensitive" } } } },
          ],
        }
      : undefined,
    orderBy: { german: "asc" },
    include: { translations: true },
  });

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Glossary</h1>
      <p className="mt-1 text-sm text-fg-muted">German bureaucracy terms with their meanings in Turkish, German and English.</p>

      {canEdit ? (
        <details className={`${ui.card} mt-6`}>
          <summary className="cursor-pointer text-sm font-bold">Add a term</summary>
          <div className="mt-4">
            <TermForm termId={null} />
          </div>
        </details>
      ) : (
        <p className="mt-6 rounded-2xl bg-surface px-5 py-4 text-sm text-fg-muted">
          Glossary terms appear as tooltips on published pages, so only admins can edit them.
        </p>
      )}

      <form role="search" className="mt-6 flex gap-3">
        <input name="q" defaultValue={q} placeholder="Search terms" aria-label="Search terms" className={ui.input} />
        <button className={ui.btnPrimary}>Search</button>
      </form>

      <p className="mt-4 text-sm text-fg-muted">{terms.length} term(s)</p>
      <ul className="mt-2 space-y-3">
        {terms.map((term) => (
          <li key={term.id}>
            <details className={ui.card}>
              <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-2">
                <span className="font-bold">{term.german}</span>
                <span className="flex items-center gap-3">
                  <span className="hidden max-w-xs truncate text-sm text-fg-muted sm:inline">
                    {term.translations.find((t) => t.locale === "tr")?.meaning}
                  </span>
                  <LocaleDots present={term.translations.map((t) => t.locale)} />
                </span>
              </summary>
              {canEdit ? (
              <div className="mt-4 space-y-4">
                <TermForm
                  termId={term.id}
                  german={term.german}
                  meanings={Object.fromEntries(term.translations.map((t) => [t.locale, t.meaning]))}
                />
                <form action={deleteTermAction}>
                  <input type="hidden" name="id" value={term.id} />
                  <ConfirmSubmit message={`Delete "${term.german}"?`}>Delete term</ConfirmSubmit>
                </form>
              </div>
              ) : (
                <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
                  {term.translations.map((t) => (
                    <div key={t.locale}>
                      <dt className="font-semibold uppercase">{t.locale}</dt>
                      <dd className="text-fg-muted">{t.meaning}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}
