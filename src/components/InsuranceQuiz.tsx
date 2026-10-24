"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { recommendInsurance, type InsuranceAnswers, type Priority } from "@/lib/insurance";

const START: InsuranceAnswers = {
  occupation: "employed",
  hasFamily: false,
  hasCar: false,
  hasPet: "none",
  ownsValuables: false,
  travelsAbroad: false,
  relyOnIncome: true,
};

const BOOLEAN_QUESTIONS = ["hasFamily", "hasCar", "ownsValuables", "travelsAbroad", "relyOnIncome"] as const;

const BADGE: Record<Priority, string> = {
  mandatory: "bg-red-100 text-red-900 dark:bg-red-500/20 dark:text-red-200",
  recommended: "bg-amber-100 text-amber-900 dark:bg-amber-500/20 dark:text-amber-200",
  consider: "bg-line text-fg-muted",
};

const selectClass = "mt-1 w-full rounded-lg border border-line bg-page px-3 py-2 text-base text-fg focus:border-accent";

// Answers stay in the component state: nothing is stored or sent
export function InsuranceQuiz({ showGuideLink }: { showGuideLink: boolean }) {
  const t = useTranslations("Insurance");
  const [answers, setAnswers] = useState<InsuranceAnswers>(START);
  const result = recommendInsurance(answers);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5" aria-label={t("title")}>
        <label className="block font-semibold">
          {t("q.occupation")}
          <select value={answers.occupation} onChange={(e) => setAnswers({ ...answers, occupation: e.target.value as InsuranceAnswers["occupation"] })} className={selectClass}>
            {(["employed", "student", "selfEmployed", "jobseeker"] as const).map((o) => (
              <option key={o} value={o}>
                {t(`occ.${o}`)}
              </option>
            ))}
          </select>
        </label>
        <label className="block font-semibold">
          {t("q.hasPet")}
          <select value={answers.hasPet} onChange={(e) => setAnswers({ ...answers, hasPet: e.target.value as InsuranceAnswers["hasPet"] })} className={selectClass}>
            {(["none", "cat", "dog"] as const).map((o) => (
              <option key={o} value={o}>
                {t(`pet.${o}`)}
              </option>
            ))}
          </select>
        </label>
        {BOOLEAN_QUESTIONS.map((q) => (
          <fieldset key={q}>
            <legend className="font-semibold">{t(`q.${q}`)}</legend>
            <div className="mt-2 flex gap-2">
              {([true, false] as const).map((value) => (
                <label
                  key={String(value)}
                  className={`flex min-h-11 flex-1 cursor-pointer items-center justify-center rounded-full border px-4 text-sm font-semibold ${
                    answers[q] === value ? "border-brand bg-brand text-on-brand" : "border-line hover:border-fg"
                  }`}
                >
                  <input type="radio" name={q} checked={answers[q] === value} onChange={() => setAnswers({ ...answers, [q]: value })} className="sr-only" />
                  {value ? t("yes") : t("no")}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
        <button type="button" onClick={() => setAnswers(START)} className="min-h-11 rounded-full border border-line px-5 text-sm font-semibold hover:border-fg">
          {t("restart")}
        </button>
      </form>

      <section aria-labelledby="insurance-result">
        <h2 id="insurance-result" className="text-2xl font-bold tracking-tight">
          {t("result")}
        </h2>
        <ul className="mt-4 space-y-3">
          {result.map((item) => (
            <li key={item.id} className="rounded-[20px] border border-line bg-surface p-5">
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${BADGE[item.priority]}`}>{t(`priority.${item.priority}`)}</span>
              <h3 className="mt-2 text-lg font-bold leading-tight">{t(`items.${item.id}.title`)}</h3>
              <p className="mt-1 text-fg-muted">{t(`items.${item.id}.text`)}</p>
            </li>
          ))}
        </ul>
        {showGuideLink && (
          <Link href="/guides/health-insurance-basics" className="mt-5 inline-block text-accent underline">
            {t("guide")}
          </Link>
        )}
        <p className="mt-6 rounded-2xl bg-surface px-5 py-4 text-sm leading-relaxed text-fg-muted">{t("disclaimer")}</p>
      </section>
    </div>
  );
}
