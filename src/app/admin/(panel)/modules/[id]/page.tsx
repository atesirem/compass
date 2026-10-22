import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { DeleteModuleForm } from "../../../_components/DeleteModuleForm";
import { ModuleForm, type ModuleFormValues } from "../../../_components/ModuleForm";

export const dynamic = "force-dynamic";

export default async function EditModulePage({ params }: PageProps<"/admin/modules/[id]">) {
  await requireAdmin();
  const { id } = await params;

  let values: ModuleFormValues;
  let moduleId: string | null = null;

  if (id === "new") {
    const last = await db.module.aggregate({ _max: { position: true } });
    values = { slug: "", position: (last._max.position ?? -1) + 1, icon: "", translations: {} };
  } else {
    const found = await db.module.findUnique({ where: { id }, include: { translations: true } });
    if (!found) notFound();
    moduleId = found.id;
    values = {
      slug: found.slug,
      position: found.position,
      icon: found.icon ?? "",
      translations: Object.fromEntries(found.translations.map((t) => [t.locale, { title: t.title, summary: t.summary }])),
    };
  }

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-2 text-sm text-fg-muted">
        <Link href="/admin/modules" className="hover:underline">
          Modules
        </Link>{" "}
        / {moduleId ? "Edit" : "New"}
      </nav>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">{moduleId ? "Edit module" : "New module"}</h1>
      <ModuleForm key={id} moduleId={moduleId} values={values} />
      {moduleId && <DeleteModuleForm moduleId={moduleId} />}
    </>
  );
}
