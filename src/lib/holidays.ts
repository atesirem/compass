// Public holidays per German state and bridge-day suggestions.
// Source: state holiday laws and the DGB overview, checked 2026-10-24 (plan/20-dogrulanan-cevaplar-C...).
// Dates are computed from Easter; years outside SUPPORTED_YEARS were not checked.
export const SUPPORTED_YEARS = [2026, 2027] as const;
export const HOLIDAYS_CHECKED_ON = "2026-10-24";

export const STATES = ["BW", "BY", "BE", "BB", "HB", "HH", "HE", "MV", "NI", "NW", "RP", "SL", "SN", "ST", "SH", "TH"] as const;
export type StateCode = (typeof STATES)[number];

export type HolidayId =
  | "newYear" | "epiphany" | "womensDay" | "goodFriday" | "easterSunday" | "easterMonday" | "labourDay"
  | "ascension" | "whitSunday" | "whitMonday" | "corpusChristi" | "assumption" | "childrensDay"
  | "unityDay" | "reformationDay" | "allSaints" | "repentanceDay" | "christmas" | "boxingDay";

export type Holiday = {
  id: HolidayId;
  date: Date; // UTC midnight
  // true when the day applies only in some municipalities of the state (Corpus Christi in SN and TH, Assumption in BY)
  local: boolean;
};

// Anonymous Gregorian algorithm: Easter Sunday as UTC date
export function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day));
}

const day = (year: number, month: number, d: number) => new Date(Date.UTC(year, month - 1, d));
const addDays = (date: Date, n: number) => new Date(date.getTime() + n * 86_400_000);
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

// Wednesday before 23 November
function repentanceDay(year: number): Date {
  const nov23 = day(year, 11, 23);
  const back = ((nov23.getUTCDay() - 3 + 7) % 7) || 7;
  return addDays(nov23, -back);
}

const NATIONWIDE: HolidayId[] = ["newYear", "goodFriday", "easterMonday", "labourDay", "ascension", "whitMonday", "unityDay", "christmas", "boxingDay"];

// Where a state-specific holiday applies: full = whole state, local = only in parts of the state
const REGIONAL: Partial<Record<HolidayId, { full: StateCode[]; local?: StateCode[] }>> = {
  epiphany: { full: ["BW", "BY", "ST"] },
  womensDay: { full: ["BE", "MV"] },
  easterSunday: { full: ["BB"] },
  whitSunday: { full: ["BB"] },
  corpusChristi: { full: ["BW", "BY", "HE", "NW", "RP", "SL"], local: ["SN", "TH"] },
  assumption: { full: ["SL"], local: ["BY"] },
  childrensDay: { full: ["TH"] },
  reformationDay: { full: ["BB", "HB", "HH", "MV", "NI", "SN", "ST", "SH", "TH"] },
  allSaints: { full: ["BW", "BY", "NW", "RP", "SL"] },
  repentanceDay: { full: ["SN"] },
};

function dateOf(id: HolidayId, year: number): Date {
  const easter = easterSunday(year);
  switch (id) {
    case "newYear": return day(year, 1, 1);
    case "epiphany": return day(year, 1, 6);
    case "womensDay": return day(year, 3, 8);
    case "goodFriday": return addDays(easter, -2);
    case "easterSunday": return easter;
    case "easterMonday": return addDays(easter, 1);
    case "labourDay": return day(year, 5, 1);
    case "ascension": return addDays(easter, 39);
    case "whitSunday": return addDays(easter, 49);
    case "whitMonday": return addDays(easter, 50);
    case "corpusChristi": return addDays(easter, 60);
    case "assumption": return day(year, 8, 15);
    case "childrensDay": return day(year, 9, 20);
    case "unityDay": return day(year, 10, 3);
    case "reformationDay": return day(year, 10, 31);
    case "allSaints": return day(year, 11, 1);
    case "repentanceDay": return repentanceDay(year);
    case "christmas": return day(year, 12, 25);
    case "boxingDay": return day(year, 12, 26);
  }
}

// All holidays of a state in a year, sorted by date (local ones are flagged)
export function holidaysFor(state: StateCode, year: number): Holiday[] {
  const out: Holiday[] = NATIONWIDE.map((id) => ({ id, date: dateOf(id, year), local: false }));
  for (const [id, where] of Object.entries(REGIONAL) as [HolidayId, NonNullable<(typeof REGIONAL)[HolidayId]>][]) {
    if (where.full.includes(state)) out.push({ id, date: dateOf(id, year), local: false });
    else if (where.local?.includes(state)) out.push({ id, date: dateOf(id, year), local: true });
  }
  return out.sort((a, b) => a.date.getTime() - b.date.getTime());
}

const isWeekend = (d: Date) => d.getUTCDay() === 0 || d.getUTCDay() === 6;

export type Bridge = {
  holiday: HolidayId;
  holidayDate: string;
  leaveDays: string[]; // ISO dates to take off
  totalDaysOff: number; // consecutive days off including weekends and holidays
  from: string;
  to: string;
};

// Bridge suggestions: holidays on Tuesday, Wednesday or Thursday. Local holidays are not counted.
// Tue -> take Monday; Thu -> take Friday; Wed -> take Mon+Tue or Thu+Fri.
export function bridgeDays(state: StateCode, year: number): Bridge[] {
  const holidays = holidaysFor(state, year).filter((h) => !h.local);
  const off = new Set(holidays.map((h) => isoDate(h.date)));

  function block(leave: string[]): { from: string; to: string; total: number } {
    const free = new Set([...off, ...leave]);
    const isFree = (d: Date) => isWeekend(d) || free.has(isoDate(d));
    const start = new Date(`${leave[0]}T00:00:00Z`);
    let from = start;
    while (isFree(addDays(from, -1))) from = addDays(from, -1);
    let to = start;
    while (isFree(addDays(to, 1))) to = addDays(to, 1);
    return { from: isoDate(from), to: isoDate(to), total: Math.round((to.getTime() - from.getTime()) / 86_400_000) + 1 };
  }

  const result: Bridge[] = [];
  for (const h of holidays) {
    const dow = h.date.getUTCDay();
    let options: Date[][] = [];
    if (dow === 2) options = [[addDays(h.date, -1)]];
    else if (dow === 4) options = [[addDays(h.date, 1)]];
    else if (dow === 3) options = [[addDays(h.date, -2), addDays(h.date, -1)], [addDays(h.date, 1), addDays(h.date, 2)]];
    for (const opt of options) {
      // A leave day that is itself a holiday or in another year is no use
      const leave = opt.filter((d) => !off.has(isoDate(d)) && d.getUTCFullYear() === year).map(isoDate);
      if (leave.length !== opt.length) continue;
      const b = block(leave);
      result.push({ holiday: h.id, holidayDate: isoDate(h.date), leaveDays: leave, totalDaysOff: b.total, from: b.from, to: b.to });
    }
  }
  return result.sort((a, b) => a.holidayDate.localeCompare(b.holidayDate) || a.leaveDays[0].localeCompare(b.leaveDays[0]));
}
