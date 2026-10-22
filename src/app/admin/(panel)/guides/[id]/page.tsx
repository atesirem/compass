import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { db } from "@/lib/db";
import { LOCALES, type AppLocale } from "@/lib/guide-health";
import { deleteGuideAction } from "../../../_actions/guides";
import { ConfirmSubmit } from "../../../_components/Feedback";
import { GuideForm, type GuideFormValues } from "../../../_components/GuideForm";

export const dynamic = "force-dynamic";

export default async function EditGuidePage({ params, searchParams }: PageProps<"/admin/guides/[id]">) {
  const [{ id }, query, user] = await Promise.all([params, searchParams, requireStaff()]);

  const [modules, settingRows] = await Promise.all([
    db.module.findMany({ orderBy: { position: "asc" }, select: { id: true, slug: true } }),
    db.setting.findMany(),
  ]);
  const settings = Object.fromEntries(settingRows.map((s) => [s.key, s.value]));
  const glossary = await db.glossaryTerm.findMany({ include: { translations: { where: { locale: "tr" } } } });
  const terms = glossary.flatMap((g) => (g.translations[0] ? [{ german: g.german, meaning: g.translations[0].meaning }] : []));

  const emptyTranslations = Object.fromEntries(
    LOCALES.map((l) => [l, { title: "", summary: "", body: "", needsReview: false }]),
  ) as GuideFormValues["translations"];

  let initial: GuideFormValues;
  let guideId: string | null = null;
  let publicHref: string | null = null;

  if (id === "new") {
    initial = {
      slug: "",
      moduleId: modules[0]?.id ?? "",
      status: "DRAFT",
      stage: "",
      lastVerifiedAt: "",
      sourceUrls: "",
      translations: emptyTranslations,
    };
  } else {
    const guide = await db.guide.findUnique({ where: { id }, include: { translations: true } });
    if (!guide) notFound();
    guideId = guide.id;
    if (guide.status === "PUBLISHED") publicHref = `/tr/guides/${guide.slug}`;

    const translations = { ...emptyTranslations };
    for (const t of guide.translations) {
      translations[t.locale as AppLocale] = { title: t.title, summary: t.summary, body: t.bodyMarkdown, needsReview: t.needsReview };
    }
    initial = {
      slug: guide.slug,
      moduleId: guide.moduleId,
      status: guide.status,
      stage: guide.stage ?? "",
      lastVerifiedAt: guide.lastVerifiedAt ? guide.lastVerifiedAt.toISOString().slice(0, 10) : "",
      sourceUrls: guide.sourceUrls.join("\n"),
      translations,
    };
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-2 text-sm text-fg-muted">
        <Link href="/admin/guides" className="hover:underline">
          Guides
        </Link>{" "}
        / {guideId ? "Edit" : "New"}
      </nav>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">{guideId ? "Edit guide" : "New guide"}</h1>
      <GuideForm
        // A fresh form instance whenever another guide is opened
        key={id}
        guideId={guideId}
        role={user.role}
        modules={modules}
        settings={settings}
        terms={terms}
        initial={initial}
        publicHref={publicHref}
        justCreated={query.created === "1"}
      />
      {guideId && user.role === "ADMIN" && (
        <form action={deleteGuideAction} className="mt-10 border-t border-line pt-4">
          <input type="hidden" name="id" value={guideId} />
          <ConfirmSubmit message="Delete this guide and all its translations? This cannot be undone.">
            Delete this guide
          </ConfirmSubmit>
        </form>
      )}
    </>
  );
}
