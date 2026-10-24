"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { bridgeDays, holidaysFor, HOLIDAYS_CHECKED_ON, STATES, SUPPORTED_YEARS, type StateCode } from "@/lib/holidays";

const selectClass = "mt-1 w-full rounded-lg border border-line bg-page px-3 py-2 text-base text-fg focus:border-accent";

// State and year are chosen in the page; nothing is stored or sent
export function HolidayPlanner({ showGuideLink }: { showGuideLink: boolean }) {
  const t = useTranslations("Holidays");
  const locale = useLocale();
  const [state, setState] = useState<StateCode>("BE");
  const [year, setYear] = useState<number>(SUPPORTED_YEARS[0]);

  const fmt = useMemo(() => new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }), [locale]);
  const short = useMemo(() => new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }), [locale]);
  const fmtIso = (iso: string, f: Intl.DateTimeFormat) => f.format(new Date(`${iso}T00:00:00Z`));

  const holidays = useMemo(() => holidaysFor(state, year), [state, year]);
  const bridges = useMemo(() => bridgeDays(state, year), [state, year]);
  const hasLocal = holidays.some((h) => h.local);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
        <label className="block font-semibold">
          {t("state")}
          <select value={state} onChange={(e) => setState(e.target.value as StateCode)} className={selectClass}>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {t(`states.${s}`)}
              </option>
            ))}
          </select>
        </label>
        <label className="block font-semibold">
          {t("year")}
          <select value={year} onChange={(e) => setYear(Number(e.target.value))} className={selectClass}>
            {SUPPORTED_YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>

      <section className="mt-10" aria-labelledby="holiday-list">
        <h2 id="holiday-list" className="text-2xl font-bold tracking-tight">
          {t("holidays")}
        </h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full text-left">
            <thead className="bg-surface text-sm text-fg-muted">
              <tr>
                <th scope="col" className="px-4 py-3">{t("colDate")}</th>
                <th scope="col" className="px-4 py-3">{t("colHoliday")}</th>
                <th scope="col" className="px-4 py-3">{t("colNote")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {holidays.map((h) => {
                const iso = h.date.toISOString().slice(0, 10);
                const dow = h.date.getUTCDay();
                const note = [h.local && t("local"), (dow === 0 || dow === 6) && !h.local && t("weekend")].filter(Boolean).join(", ");
                return (
                  <tr key={h.id}>
                    <td className="whitespace-nowrap px-4 py-3 font-medium">{fmtIso(iso, fmt)}</td>
                    <td className="px-4 py-3">{t(`names.${h.id}`)}</td>
                    <td className="px-4 py-3 text-sm text-fg-muted">{note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {hasLocal && <p className="mt-3 text-sm text-fg-muted">{t("localNote")}</p>}
      </section>

      <section className="mt-10" aria-labelledby="bridge-list">
        <h2 id="bridge-list" className="text-2xl font-bold tracking-tight">
          {t("bridges")}
        </h2>
        <p className="mt-2 text-fg-muted">{t("bridgesIntro")}</p>
        {bridges.length === 0 ? (
          <p className="mt-4 rounded-2xl bg-surface px-5 py-4 text-fg-muted">{t("noBridges")}</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {bridges.map((b) => (
              <li key={`${b.holidayDate}-${b.leaveDays.join()}`} className="rounded-[20px] border border-line bg-surface p-5">
                <p className="font-bold">
                  {t(`names.${b.holiday}`)} · {fmtIso(b.holidayDate, fmt)}
                </p>
                <p className="mt-1">{t("leave", { days: b.leaveDays.map((d) => fmtIso(d, short)).join(", ") })}</p>
                <p className="mt-1 text-fg-muted">{t("result", { count: b.totalDaysOff, from: fmtIso(b.from, short), to: fmtIso(b.to, short) })}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="mt-10 rounded-2xl bg-surface px-5 py-4 text-sm leading-relaxed text-fg-muted">{t("disclaimer", { date: HOLIDAYS_CHECKED_ON })}</p>
      {showGuideLink && (
        <Link href="/guides/public-holidays-germany" className="mt-4 inline-block text-accent underline">
          {t("guide")}
        </Link>
      )}
    </div>
  );
}
