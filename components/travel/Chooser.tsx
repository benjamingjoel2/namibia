"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useId, useState } from "react";
import { journeys } from "@/data/journeys";
import { chooserQuestions, recommendStyle, styleName, styleProfiles } from "@/data/travelStyles";

/** Five quick questions that recommend self-drive, guided or fly-in. */
export function Chooser() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const reduce = useReducedMotion();
  const baseId = useId();
  const answered = Object.keys(answers).length;
  const done = answered === chooserQuestions.length;
  const result = done ? recommendStyle(answers) : null;
  const profile = result ? styleProfiles.find((p) => p.style === result.style) : null;
  const matches = result ? journeys.filter((j) => j.styles.some((s) => s.style === result.style)).slice(0, 3) : [];

  return (
    <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <form onSubmit={(e) => e.preventDefault()} aria-describedby={`${baseId}-progress`}>
        <p id={`${baseId}-progress`} className="text-sm text-muted">
          {answered} of {chooserQuestions.length} answered
        </p>
        <ol className="mt-4 space-y-8">
          {chooserQuestions.map((q, qi) => (
            <li key={q.id} className="border-t border-dashed border-line pt-6">
              <fieldset>
                <legend className="text-[1.3rem] leading-snug">
                  <span className="mr-2 text-[0.95rem] text-muted">({qi + 1})</span>
                  {q.question}
                </legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {q.options.map((o, oi) => {
                    const id = `${baseId}-${q.id}-${oi}`;
                    const checked = answers[q.id] === oi;
                    return (
                      <label
                        key={id}
                        htmlFor={id}
                        className={`cursor-pointer rounded-full border px-4 py-2 text-[0.98rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[var(--focus)] ${
                          checked ? "border-fg bg-fg text-bg" : "border-line hover:border-fg"
                        }`}
                      >
                        <input
                          id={id}
                          type="radio"
                          name={q.id}
                          className="sr-only"
                          checked={checked}
                          onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                        />
                        {o.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </li>
          ))}
        </ol>
        {answered > 0 && (
          <button type="button" onClick={() => setAnswers({})} className="mt-8 text-sm underline underline-offset-4">
            Start again
          </button>
        )}
      </form>

      <div className="lg:sticky lg:top-24 lg:self-start" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {result && profile ? (
            <motion.div
              key={result.style}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
              className="bg-bg-alt p-6 md:p-8"
            >
              <p className="label">We&rsquo;d suggest</p>
              <p className="display mt-6 text-[2.6rem] md:text-[3.4rem]">{styleName[result.style]}</p>
              <p className="statement mt-6 text-[1.4rem]">{profile.oneLine}</p>
              <p className="mt-4">{profile.honestNote}</p>
              <ScoreBars scores={result.scores} />
              {matches.length > 0 && (
                <div className="mt-8">
                  <p className="label">Journeys that suit it</p>
                  <ul className="mt-3 space-y-1">
                    {matches.map((j) => (
                      <li key={j.slug}>
                        <Link href={`/journeys/${j.slug}`} className="underline underline-offset-4">
                          {j.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="mt-8 text-sm text-muted">Not sure? Many of our trips mix styles: drive the south, fly the north.</p>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={false} className="border border-dashed border-line p-6 md:p-8">
              <p className="label">Your answer appears here</p>
              <p className="mt-4 text-muted">Answer all five questions. There are no wrong answers, only better-matched journeys.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ScoreBars({ scores }: { scores: Record<string, number> }) {
  const max = Math.max(...Object.values(scores), 1);
  return (
    <dl className="mt-8 space-y-2">
      {Object.entries(scores).map(([k, v]) => (
        <div key={k} className="grid grid-cols-[6rem_1fr_2rem] items-center gap-3 text-sm">
          <dt>{styleName[k as keyof typeof styleName]}</dt>
          <dd className="h-1.5 rounded-full bg-line/40">
            <span className="block h-full rounded-full bg-accent" style={{ width: `${(v / max) * 100}%` }} />
          </dd>
          <dd className="text-right tabular-nums text-muted">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
