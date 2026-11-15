"use client";

import { useState } from "react";
import {
  ACCURACY_BAND,
  CODE_WORDS,
  EXAMINER_TITRE,
  QUESTIONS,
  STUDENTS,
  clock,
  conceptScore,
  rightFirstShare,
  toCSV,
  type Row,
  type SimStudent,
} from "@/lib/sim/titration";

// The research question, worked through on six made-up students. One student is "followed" at a
// time: choosing one anywhere (the bar at the top, a row, a strip, a point) highlights them in
// every view below, so the reader can see the same person through each lens.

const col = "mx-auto w-full max-w-[44rem]";
const body = "text-[1.0625rem] leading-[1.75] text-ink/80";

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className={`${col} mt-24`}>
      <h2 className="text-[1.375rem] font-semibold tracking-[-0.015em] md:text-[1.5rem]">
        <span className="tabular mr-2 text-muted">{n}.</span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function describe(row: Row): string {
  const [seconds, stage, action, material, right, code, putRight, help] = row;
  const what = [clock(seconds), stage, action, material].filter(Boolean).join(" · ");
  const words = code
    .split(" ")
    .filter(Boolean)
    .map((c) => CODE_WORDS[c] ?? c)
    .join(", ");
  const result = right ? "right" : words ? `mistake: ${words}` : "mistake";
  return `${what} · ${result}${putRight ? ", put right later" : ""}${help ? " · help open" : ""}`;
}

/* ── 2. The strips: each student's steps over time ─────────────────────────── */

const MAX_T = Math.max(...STUDENTS.flatMap((s) => s.log.map((r) => r[0])));
const W = 600;
const xOf = (t: number) => 8 + (t / MAX_T) * (W - 16);

function helpSpans(log: Row[]): [number, number][] {
  const spans: [number, number][] = [];
  let start: number | null = null;
  log.forEach((row, i) => {
    if (row[7] && start === null) start = i;
    if ((!row[7] || i === log.length - 1) && start !== null) {
      const end = row[7] ? i : i - 1;
      spans.push([log[start][0], log[end][0]]);
      start = null;
    }
  });
  return spans;
}

function Strip({ s, selected, onPick, onPoint }: { s: SimStudent; selected: boolean; onPick: () => void; onPoint: (r: Row) => void }) {
  return (
    <div
      onClick={onPick}
      className={`grid cursor-pointer grid-cols-[2rem_1fr] items-center rounded-lg px-2 transition-colors ${
        selected ? "bg-ink/[0.05]" : "hover:bg-ink/[0.03]"
      }`}
    >
      <button
        type="button"
        onClick={onPick}
        aria-pressed={selected}
        aria-label={`Follow student ${s.id}`}
        className={`py-2 text-left text-[0.9375rem] font-semibold ${selected ? "text-ink" : "text-muted"}`}
      >
        {s.id}
      </button>
      <svg viewBox={`0 0 ${W} 28`} className="block h-7 w-full" aria-hidden="true">
        {helpSpans(s.log).map(([a, b], i) => (
          <rect key={i} x={xOf(a) - 7} y={6} width={xOf(b) - xOf(a) + 14} height={16} rx={8} fill="var(--color-ink)" opacity={0.07} />
        ))}
        <line x1={xOf(s.log[0][0])} x2={xOf(s.log[s.log.length - 1][0])} y1={14} y2={14} stroke="var(--color-rule)" strokeWidth={1.5} />
        {s.log.map((row, i) => {
          const wrong = row[4] === 0;
          const put = row[6] === 1;
          return (
            <circle
              key={i}
              cx={xOf(row[0])}
              cy={14}
              r={wrong ? 4.5 : 3.5}
              fill={wrong ? (put ? "var(--color-paper)" : "var(--color-endpoint)") : "var(--color-burette)"}
              stroke={wrong && put ? "var(--color-endpoint)" : "none"}
              strokeWidth={1.75}
              onMouseEnter={() => onPoint(row)}
              onClick={(e) => {
                e.stopPropagation();
                onPick();
                onPoint(row);
              }}
              className="cursor-pointer"
            />
          );
        })}
      </svg>
    </div>
  );
}

// Minute marks as ordinary text, placed by percentage, so they stay readable on a phone.
function TimeAxis() {
  const ticks = [];
  for (let m = 0; m * 60 <= MAX_T; m += 2) ticks.push(m);
  return (
    <div className="grid grid-cols-[2rem_1fr] px-2" aria-hidden="true">
      <span />
      <div className="relative h-5 text-[0.75rem] text-muted">
        {ticks.map((m) => (
          <span
            key={m}
            className={`tabular absolute top-0.5 whitespace-nowrap ${m === 0 ? "" : "-translate-x-1/2"}`}
            style={{ left: `${(xOf(m * 60) / W) * 100}%` }}
          >
            {m === 0 ? "0" : `${m} min`}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── 4. Both together ───────────────────────────────────────────────────────── */

const X0 = 0.5;
const X1 = 1;

// Drawn at two widths: wide on larger screens, compact on phones so its text stays full size.
function Plot({ selected, onPick, w }: { selected: string; onPick: (id: string) => void; w: number }) {
  const P = { w, h: 320, left: w < 500 ? 40 : 52, right: w < 500 ? 14 : 20, top: 20, bottom: 46 };
  const sx = (v: number) => P.left + ((v - X0) / (X1 - X0)) * (P.w - P.left - P.right);
  const sy = (v: number) => P.h - P.bottom - (v / 4) * (P.h - P.top - P.bottom);
  const xTicks = w < 500 ? [0.5, 0.75, 1] : [0.5, 0.6, 0.7, 0.8, 0.9, 1];
  const a = STUDENTS.find((s) => s.id === "A")!;
  const b = STUDENTS.find((s) => s.id === "B")!;
  return (
    <svg viewBox={`0 0 ${P.w} ${P.h}`} className="block w-full" role="group" aria-label="Each student placed by steps right first time at the bench, across, and by concept check score, up.">
      {[0, 1, 2, 3, 4].map((v) => (
        <g key={v}>
          <line x1={P.left} x2={P.w - P.right} y1={sy(v)} y2={sy(v)} stroke="var(--color-ink)" strokeOpacity={0.07} />
          <text x={P.left - 12} y={sy(v) + 4} fontSize={12} textAnchor="end" fill="var(--color-muted)">
            {v}
          </text>
        </g>
      ))}
      {xTicks.map((v) => (
        <text key={v} x={sx(v)} y={P.h - P.bottom + 20} fontSize={12} textAnchor={v === 1 ? "end" : "middle"} fill="var(--color-muted)">
          {Math.round(v * 100)}%
        </text>
      ))}
      <text x={(P.left + P.w - P.right) / 2} y={P.h - 6} fontSize={12} textAnchor="middle" fill="var(--color-muted)">
        Steps right the first time, at the bench
      </text>
      <text x={14} y={(P.top + P.h - P.bottom) / 2} fontSize={12} textAnchor="middle" fill="var(--color-muted)" transform={`rotate(-90 14 ${(P.top + P.h - P.bottom) / 2})`}>
        Concept check, out of 4
      </text>

      {/* A and B: close together across, far apart up. */}
      <line x1={sx(rightFirstShare(a))} y1={sy(conceptScore(a)) - 12} x2={sx(rightFirstShare(b))} y2={sy(conceptScore(b)) + 12} stroke="var(--color-burette)" strokeDasharray="3 4" strokeOpacity={0.6} />
      {/* The note sits in the clear space left of B, between the top two rows. */}
      <text x={sx(rightFirstShare(b)) - 16} y={sy(3.5) - 4} fontSize={12} textAnchor="end" fill="var(--color-burette)">
        A and B: alike at the bench,
      </text>
      <text x={sx(rightFirstShare(b)) - 16} y={sy(3.5) + 12} fontSize={12} textAnchor="end" fill="var(--color-burette)">
        far apart on the ideas
      </text>

      {STUDENTS.map((s) => {
        const on = s.id === selected;
        const x = sx(rightFirstShare(s));
        const y = sy(conceptScore(s));
        return (
          <g
            key={s.id}
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={`Student ${s.id}: ${Math.round(rightFirstShare(s) * 100)}% of steps right first time, ${conceptScore(s)} of 4 on the concept check`}
            onClick={() => onPick(s.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onPick(s.id);
              }
            }}
            className="cursor-pointer outline-none [&:focus-visible>circle]:stroke-burette"
          >
            <circle cx={x} cy={y} r={on ? 15 : 12} fill={on ? "var(--color-burette)" : "var(--color-paper)"} stroke={on ? "var(--color-burette)" : "var(--color-ink)"} strokeOpacity={on ? 1 : 0.35} strokeWidth={1.5} />
            <text x={x} y={y + 4.5} fontSize={13} fontWeight={600} textAnchor="middle" fill={on ? "#fff" : "var(--color-ink)"}>
              {s.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── The explorer ──────────────────────────────────────────────────────────── */

export default function TitrationExplorer() {
  const [selected, setSelected] = useState("A");
  const [point, setPoint] = useState<Row | null>(null);
  const s = STUDENTS.find((x) => x.id === selected)!;
  const mistakes = s.log.filter((r) => r[4] === 0);
  const putRight = mistakes.filter((r) => r[6] === 1).length;

  const pick = (id: string) => {
    setSelected(id);
    setPoint(null);
  };

  const download = () => {
    const blob = new Blob([toCSV()], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "elementa-titration-simulated.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const rowClass = (id: string) =>
    `cursor-pointer transition-colors ${id === selected ? "bg-ink/[0.05]" : "hover:bg-ink/[0.03]"}`;

  return (
    <>
      {/* Who is being followed. Stays at the top while reading. */}
      <div className="sticky top-0 z-20 border-b border-ink/[0.07] bg-paper/90 px-6 backdrop-blur-md">
        <div className={`${col} flex items-center gap-3 py-3`}>
          <span className="text-sm text-muted">
            <span className="hidden sm:inline">Follow a student</span>
            <span className="sm:hidden">Follow</span>
          </span>
          <div className="flex gap-1">
            {STUDENTS.map((x) => (
              <button
                key={x.id}
                type="button"
                onClick={() => pick(x.id)}
                aria-pressed={x.id === selected}
                className={`h-8 w-8 rounded-full text-sm font-semibold transition-colors ${
                  x.id === selected ? "bg-burette text-white" : "text-muted hover:bg-ink/[0.06] hover:text-ink"
                }`}
              >
                {x.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6">
        <Step n={1} title="What the mark shows">
          <p className={body}>
            The examiner&rsquo;s titre for these solutions is {EXAMINER_TITRE.toFixed(2)} cm³. Full accuracy marks
            need a titre within {ACCURACY_BAND.toFixed(2)} cm³ of it. None of the six got there, so all six lose the same
            mark. On paper, that is where the story ends.
          </p>
          <table className="mt-6 w-full text-left text-[0.9375rem]">
            <thead className="text-sm text-muted">
              <tr>
                <th className="py-2 pl-2 font-normal">Student</th>
                <th className="py-2 font-normal">Titre written</th>
                <th className="py-2 font-normal">Away from the examiner&rsquo;s</th>
                <th className="py-2 pr-2 text-right font-normal">Accuracy mark</th>
              </tr>
            </thead>
            <tbody className="tabular">
              {STUDENTS.map((x) => (
                <tr key={x.id} onClick={() => pick(x.id)} className={`border-t border-ink/[0.07] ${rowClass(x.id)}`}>
                  <td className="py-2.5 pl-2 font-semibold">{x.id}</td>
                  <td className="py-2.5">{x.titre.toFixed(2)} cm³</td>
                  <td className="py-2.5 text-muted">
                    {x.titre > EXAMINER_TITRE ? "+" : "−"}
                    {Math.abs(x.titre - EXAMINER_TITRE).toFixed(2)} cm³
                  </td>
                  <td className="py-2.5 pr-2 text-right text-endpoint">Lost</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Step>

        <Step n={2} title="What the steps show">
          <p className={body}>
            Elementa records each step at the bench, in order: what was done, with what, and whether it was right. Each line
            below is one student&rsquo;s titration, start to finish. Hover over or tap a dot to read the step.
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.8125rem] text-muted" aria-label="Key">
            <li className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-burette" /> Right the first time
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-endpoint" /> Mistake
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full border-[1.75px] border-endpoint" /> Mistake put right later
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-3 w-5 rounded-full bg-ink/[0.08]" /> Help open
            </li>
          </ul>
          <div className="mt-4 space-y-0.5">
            {STUDENTS.map((x) => (
              <Strip key={x.id} s={x} selected={x.id === selected} onPick={() => pick(x.id)} onPoint={setPoint} />
            ))}
            <TimeAxis />
          </div>
          <p aria-live="polite" className="tabular mt-3 min-h-[1.5rem] text-[0.8125rem] text-muted">
            {point ? describe(point) : " "}
          </p>

          <div className="mt-6 rounded-xl bg-ink/[0.035] p-5">
            <p className="tabular text-sm text-muted">
              Student {s.id} · {s.log.length} steps · {mistakes.length} {mistakes.length === 1 ? "mistake" : "mistakes"}
              {putRight ? ` (${putRight} put right)` : ""} · {clock(s.log[s.log.length - 1][0])}
            </p>
            <p className="mt-2 text-[1rem] leading-[1.7] text-ink/85">{s.steps}</p>
            <details className="group mt-4">
              <summary className="flex w-fit cursor-pointer list-none items-center gap-2 text-[0.875rem] text-muted transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="inline-block w-3 text-center transition-transform group-open:rotate-45 motion-reduce:transition-none">
                  +
                </span>
                Every recorded step for student {s.id}
              </summary>
              <div className="mt-3 overflow-x-auto">
                <table className="tabular w-full min-w-[30rem] text-left text-[0.8125rem]">
                  <thead className="text-muted">
                    <tr>
                      <th className="py-1.5 pr-3 font-normal">Time</th>
                      <th className="py-1.5 pr-3 font-normal">Stage</th>
                      <th className="py-1.5 pr-3 font-normal">Action</th>
                      <th className="py-1.5 font-normal">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.log.map((row, i) => (
                      <tr key={i} className="border-t border-ink/[0.06] align-top">
                        <td className="py-1.5 pr-3 text-muted">{clock(row[0])}</td>
                        <td className="py-1.5 pr-3">{row[1]}</td>
                        <td className="py-1.5 pr-3">
                          {row[2]}
                          {row[3] ? <span className="text-muted"> · {row[3]}</span> : null}
                        </td>
                        <td className={`py-1.5 ${row[4] ? "text-muted" : "text-endpoint"}`}>
                          {row[4]
                            ? "right"
                            : row[5]
                                .split(" ")
                                .filter(Boolean)
                                .map((c) => CODE_WORDS[c] ?? c)
                                .join(", ") || "mistake"}
                          {row[6] ? <span className="text-muted"> · put right later</span> : null}
                          {row[7] ? <span className="text-muted"> · help open</span> : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </div>
        </Step>

        <Step n={3} title="What a short check of ideas shows">
          <p className={body}>
            Four questions on the ideas behind the experiment, asked away from the bench. Which question was missed matters
            as much as how many.
          </p>
          <ol className="mt-5 space-y-2 text-[0.9375rem] leading-relaxed text-ink/80">
            {QUESTIONS.map((q, i) => (
              <li key={i} className="grid grid-cols-[2rem_1fr]">
                <span className="tabular text-muted">Q{i + 1}</span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
          <table className="tabular mt-6 w-full text-center text-[0.9375rem]">
            <thead className="text-sm text-muted">
              <tr>
                <th className="py-2 pl-2 text-left font-normal">Student</th>
                {QUESTIONS.map((_, i) => (
                  <th key={i} className="py-2 font-normal">
                    Q{i + 1}
                  </th>
                ))}
                <th className="py-2 pr-2 text-right font-normal">Score</th>
              </tr>
            </thead>
            <tbody>
              {STUDENTS.map((x) => (
                <tr key={x.id} onClick={() => pick(x.id)} className={`border-t border-ink/[0.07] ${rowClass(x.id)}`}>
                  <td className="py-2.5 pl-2 text-left font-semibold">{x.id}</td>
                  {x.concept.map((right, i) => (
                    <td key={i} className={`py-2.5 ${right ? "text-ink/70" : "text-endpoint"}`}>
                      <span aria-hidden="true">{right ? "✓" : "✗"}</span>
                      <span className="sr-only">{right ? "right" : "wrong"}</span>
                    </td>
                  ))}
                  <td className="py-2.5 pr-2 text-right">{conceptScore(x)} / 4</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Step>

        <Step n={4} title="Both together">
          <p className={body}>
            Each student placed by how much of their bench work was right the first time, and by their concept check. Choose a
            student to read what the two together might suggest.
          </p>
        </Step>
        <div className="mx-auto mt-6 hidden max-w-[48rem] sm:block">
          <Plot selected={selected} onPick={pick} w={600} />
        </div>
        <div className="mx-auto mt-6 max-w-[48rem] sm:hidden">
          <Plot selected={selected} onPick={pick} w={360} />
        </div>
        <div className={`${col} mt-6`}>
          <div className="rounded-xl bg-ink/[0.035] p-5">
            <p className="text-sm font-semibold text-ink">Student {s.id}</p>
            <dl className="mt-3 space-y-3 text-[0.9375rem] leading-[1.7]">
              <div>
                <dt className="text-sm text-muted">The steps</dt>
                <dd className="text-ink/85">{s.steps}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">The ideas</dt>
                <dd className="text-ink/85">{s.ideas}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">What the two together might suggest</dt>
                <dd className="text-ink">{s.suggests}</dd>
              </div>
            </dl>
          </div>
        </div>

        <section className={`${col} mt-24`}>
          <h2 className="text-[1.375rem] font-semibold tracking-[-0.015em] md:text-[1.5rem]">What this sketch cannot show</h2>
          <ul className={`mt-5 space-y-3 ${body}`}>
            <li>
              These six students are made up. I wrote their records by hand to show the idea, not to test it. No real student
              appears here.
            </li>
            <li>
              The records follow the format Elementa keeps, but a real study needs consent from schools and parents, ethics
              approval, and a concept check that has itself been tested.
            </li>
            <li>A pattern like these is a starting point for a teacher&rsquo;s judgement, not a diagnosis.</li>
          </ul>
          <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.9375rem]">
            <button
              type="button"
              onClick={download}
              className="font-medium text-burette underline underline-offset-4 hover:no-underline"
            >
              Download the six records (CSV)
            </button>
            <span className="text-sm text-muted">Columns as in Elementa&rsquo;s actions download.</span>
          </p>
        </section>
      </div>
    </>
  );
}
