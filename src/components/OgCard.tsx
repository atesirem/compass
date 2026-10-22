// Visual used for all generated share images (1200x630). Only inline styles and flexbox are supported by ImageResponse.
export const OG_SIZE = { width: 1200, height: 630 } as const;

export function OgCard({ site, title, subtitle, kicker }: { site: string; title: string; subtitle?: string; kicker?: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a2a33",
        color: "#eaf4f2",
        padding: "64px 72px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="72" height="72" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="21" stroke="#eaf4f2" strokeWidth="2.5" />
          <path d="M24 8l6 16-6 16-6-16z" fill="#ff7a59" />
          <circle cx="24" cy="24" r="2.6" fill="#0a2a33" />
        </svg>
        <div style={{ fontSize: 44, fontWeight: 700 }}>{site}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {kicker && <div style={{ fontSize: 28, color: "#9fd0c9", fontWeight: 600 }}>{kicker}</div>}
        <div style={{ fontSize: title.length > 60 ? 56 : 72, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 30, color: "#cfe3e0", lineHeight: 1.35 }}>{subtitle.length > 140 ? `${subtitle.slice(0, 137)}...` : subtitle}</div>}
      </div>

      <div style={{ display: "flex", height: 10, width: 160, background: "#ff7a59", borderRadius: 5 }} />
    </div>
  );
}
