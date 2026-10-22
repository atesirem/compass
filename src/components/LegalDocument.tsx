import type { LegalDoc } from "@/content/legal/types";

// Renders a legal text (Impressum, privacy policy, disclaimer) with the site's typography
export function LegalDocument({
  doc,
  lastUpdatedLabel,
  germanVersion,
}: {
  doc: LegalDoc;
  lastUpdatedLabel: string;
  germanVersion?: { label: string; href: string };
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 [overflow-wrap:anywhere] sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{doc.title}</h1>
      <p className="mt-2 text-sm text-fg-muted">{lastUpdatedLabel}</p>

      {doc.intro && (
        <p className="mt-6 rounded-2xl bg-surface px-5 py-4 text-sm leading-relaxed text-fg-muted">
          {doc.intro}
          {germanVersion && (
            <>
              {" "}
              <a href={germanVersion.href} className="font-semibold text-accent underline">
                {germanVersion.label}
              </a>
            </>
          )}
        </p>
      )}

      <div className="mt-8 space-y-8">
        {doc.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold tracking-tight">{section.heading}</h2>
            {section.paragraphs?.map((p) => (
              <p key={p} className="mt-3 leading-relaxed">
                {p}
              </p>
            ))}
            {section.list && (
              <ul className="mt-3 space-y-1">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
