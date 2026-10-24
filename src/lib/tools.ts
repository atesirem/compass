// Registry of the tools: one place for the hub page, the sitemap and the roadmap links.
export const TOOLS = ["lid", "holidays", "insurance", "rental", "letters", "pdf"] as const;
export type ToolId = (typeof TOOLS)[number];

export const TOOL_PATHS: Record<ToolId, string> = {
  lid: "/tools/lid",
  holidays: "/tools/holidays",
  insurance: "/tools/insurance-quiz",
  rental: "/tools/rental-application",
  letters: "/tools/letters",
  pdf: "/tools/pdf",
};

// External pages of the BAMF used by the LiD page (official source of the questions)
export const BAMF_LINKS = {
  center: "https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/OnlineTestcenter/online-testcenter-node.html",
  catalog: "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Einbuergerung/gesamtfragenkatalog-lebenindeutschland.html",
  course: "https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/Abschlusspruefung/abschlusspruefung-node.html",
} as const;

// Official sites linked from the "Official links" page, grouped by topic (labels live in the messages)
export const OFFICIAL_LINKS: { group: "general" | "residence" | "work" | "money" | "law"; id: string; url: string }[] = [
  { group: "general", id: "makeit", url: "https://www.make-it-in-germany.com/" },
  { group: "general", id: "handbook", url: "https://handbookgermany.de/" },
  { group: "residence", id: "bamf", url: "https://www.bamf.de/" },
  { group: "residence", id: "aa", url: "https://www.auswaertiges-amt.de/" },
  { group: "work", id: "ba", url: "https://www.arbeitsagentur.de/" },
  { group: "work", id: "anabin", url: "https://anabin.kmk.org/" },
  { group: "work", id: "zab", url: "https://www.kmk.org/zab" },
  { group: "money", id: "elster", url: "https://www.elster.de/" },
  { group: "money", id: "bzst", url: "https://www.bzst.de/" },
  { group: "money", id: "bafin", url: "https://www.bafin.de/" },
  { group: "money", id: "vz", url: "https://www.verbraucherzentrale.de/" },
  { group: "money", id: "rb", url: "https://www.rundfunkbeitrag.de/" },
  { group: "money", id: "bahn", url: "https://www.bahn.de/" },
  { group: "law", id: "gesetze", url: "https://www.gesetze-im-internet.de/" },
];
