import { Children, isValidElement, useId, type ReactNode } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type GlossaryTip = { german: string; meaning: string; href?: string };

function textOf(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) => (typeof child === "string" ? child : isValidElement<{ children?: ReactNode }>(child) ? textOf(child.props.children) : ""))
    .join("");
}

// A glossary term shown with a hover/focus tooltip and, when a link is given, a link to the glossary
function TermTip({ tip, children }: { tip: GlossaryTip; children: ReactNode }) {
  const id = useId();
  const label = tip.href ? (
    <a href={tip.href} aria-describedby={id} className="border-b border-dotted border-accent">
      {children}
    </a>
  ) : (
    <span tabIndex={0} aria-describedby={id} className="border-b border-dotted border-accent">
      {children}
    </span>
  );

  return (
    <span className="group relative">
      {label}
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-10 mt-1 hidden w-64 rounded-lg bg-brand px-3 py-2 text-sm font-normal leading-snug text-on-brand shadow-lg group-focus-within:block group-hover:block"
      >
        {tip.meaning}
      </span>
    </span>
  );
}

// Renders guide markdown with the site's typography. Used by the public guide page and the admin preview.
// Bold text that matches a glossary term becomes a tooltip.
export function GuideBody({ markdown, terms = [] }: { markdown: string; terms?: GlossaryTip[] }) {
  const byName = new Map(terms.map((t) => [t.german.toLowerCase(), t]));

  return (
    <div className="space-y-3 text-lg leading-relaxed [&_a]:text-accent [&_a]:underline [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_li]:ml-5 [&_li]:list-disc [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:text-base [&_td]:border [&_td]:border-line [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-line [&_th]:bg-surface [&_th]:px-3 [&_th]:py-2 [&_th]:text-left">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          strong({ children }) {
            const tip = byName.get(textOf(children).trim().toLowerCase());
            return <strong>{tip ? <TermTip tip={tip}>{children}</TermTip> : children}</strong>;
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
