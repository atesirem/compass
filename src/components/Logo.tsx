// Compass mark used in the header and footer
export function CompassMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="2.5" />
      <path d="M24 8l6 16-6 16-6-16z" fill="#ff7a59" />
      <circle cx="24" cy="24" r="2.6" fill="var(--brand)" />
    </svg>
  );
}

// Large decorative compass for the home hero
export function CompassIllustration() {
  return (
    <svg viewBox="0 0 400 400" width="100%" className="max-w-[400px]" aria-hidden="true">
      <circle cx="200" cy="200" r="188" fill="none" stroke="#2c5a60" strokeWidth="2" />
      <circle cx="200" cy="200" r="150" fill="#0e343e" stroke="#3e6b6f" strokeWidth="2" />
      <circle cx="200" cy="200" r="104" fill="none" stroke="#2c5a60" strokeWidth="1.5" strokeDasharray="3 9" />
      <g stroke="#5f8a8a" strokeWidth="3">
        <path d="M200 12v26M200 362v26M12 200h26M362 200h26" />
      </g>
      <g stroke="#2c5a60" strokeWidth="2">
        <path d="M67 67l18 18M333 67l-18 18M67 333l18-18M333 333l-18-18" />
      </g>
      <path d="M200 80l34 120-34 120-34-120z" fill="#ff7a59" />
      <path d="M200 80l34 120H166z" fill="#ff9277" />
      <circle cx="200" cy="200" r="9" fill="var(--brand)" stroke="#eaf4f2" strokeWidth="3" />
    </svg>
  );
}
