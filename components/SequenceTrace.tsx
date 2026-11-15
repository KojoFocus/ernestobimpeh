"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

type Kind = "ok" | "retry" | "error";
type Step = { label: string; kind: Kind };
type Lane = { name: string; note: string; steps: Step[] };
type Pt = { x: number; y: number };

const lanes: Lane[] = [
  {
    name: "Student A",
    note: "Smooth procedure, wrong value recorded. A conceptual gap?",
    steps: [
      { label: "Rinse", kind: "ok" },
      { label: "Fill burette", kind: "ok" },
      { label: "Add indicator", kind: "ok" },
      { label: "Titrate", kind: "ok" },
      { label: "Read", kind: "ok" },
      { label: "Record", kind: "error" },
    ],
  },
  {
    name: "Student B",
    note: "Repeated adjustments before the same error. Trouble with the instrument?",
    steps: [
      { label: "Rinse", kind: "ok" },
      { label: "Fill burette", kind: "ok" },
      { label: "Add indicator", kind: "ok" },
      { label: "Titrate", kind: "ok" },
      { label: "Retry", kind: "retry" },
      { label: "Retry", kind: "retry" },
      { label: "Record", kind: "error" },
    ],
  },
];

const START = 0.4;
const DRAW = 2.8;
const NOTE_DELAY = START + DRAW + 0.5;

const ARIA =
  "Two illustrative titration action sequences. Student A follows the procedure smoothly but records a wrong value. Student B retries twice before the same error.";

/**
 * One student's sequence, drawn from `a` to `b`. Both lanes share the same start and end,
 * so the two errors line up whatever the number of steps. `label` places each step's text.
 */
function Sequence({
  steps,
  a,
  b,
  label,
  animate,
}: {
  steps: Step[];
  a: Pt;
  b: Pt;
  label: (p: Pt, kind: Kind) => Pt & { anchor: "start" | "middle" };
  animate: boolean;
}) {
  const n = steps.length - 1;

  return (
    <>
      <motion.line
        x1={a.x}
        y1={a.y}
        x2={b.x}
        y2={b.y}
        stroke="var(--color-burette)"
        strokeWidth={3}
        initial={animate ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ delay: START, duration: DRAW, ease: "linear" }}
      />
      {steps.map((step, i) => {
        const p = { x: a.x + ((b.x - a.x) * i) / n, y: a.y + ((b.y - a.y) * i) / n };
        const t = START + DRAW * (i / n);
        const l = label(p, step.kind);
        const error = step.kind === "error";
        return (
          <motion.g
            key={i}
            initial={animate ? { opacity: 0, scale: 0.4 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: t, duration: 0.25 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          >
            {error && animate && (
              <motion.circle
                cx={p.x}
                cy={p.y}
                r={11}
                fill="none"
                stroke="var(--color-endpoint)"
                strokeWidth={2}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 2.6, opacity: 0 }}
                transition={{ delay: t + 0.2, duration: 1.1, ease: "easeOut" }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              />
            )}
            <circle
              cx={p.x}
              cy={p.y}
              r={error ? 11 : 8}
              fill={error ? "var(--color-endpoint)" : step.kind === "retry" ? "#fbfcfc" : "var(--color-burette)"}
              stroke={step.kind === "retry" ? "var(--color-burette)" : "none"}
              strokeWidth={3}
            />
            <text
              x={l.x}
              y={l.y}
              fontSize={13}
              textAnchor={l.anchor}
              fill={error ? "var(--color-endpoint)" : "var(--color-muted)"}
              fontWeight={error ? 600 : 400}
            >
              {step.label}
            </text>
          </motion.g>
        );
      })}
    </>
  );
}

/* Wide screens: one row per student, read left to right. */
const H = { x0: 150, x1: 880, track: 920, rows: [100, 230] };

function Horizontal({ animate }: { animate: boolean }) {
  return (
    <svg viewBox="0 0 960 300" className="block w-full" role="img" aria-label={ARIA}>
      {lanes.map((lane, li) => {
        const y = H.rows[li];
        return (
          <g key={lane.name}>
            <text x={0} y={y + 5} fontSize={15} fontWeight={600} fill="var(--color-ink)">
              {lane.name}
            </text>
            <line x1={H.x0} x2={H.track} y1={y} y2={y} stroke="var(--color-rule)" strokeWidth={3} />
            <Sequence
              steps={lane.steps}
              a={{ x: H.x0, y }}
              b={{ x: H.x1, y }}
              label={(p) => ({ x: p.x, y: p.y + 32, anchor: "middle" })}
              animate={animate}
            />
            <motion.text
              x={H.x0}
              y={y - 28}
              fontSize={15}
              fill="var(--color-ink)"
              initial={animate ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ delay: NOTE_DELAY, duration: 0.6 }}
            >
              {lane.note}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}

/* Phones: one column per student, read top to bottom, notes as wrapping text below. */
const V = { cols: [18, 188], y0: 52, y1: 316, track: 340 };

function Vertical({ animate }: { animate: boolean }) {
  return (
    <>
      <svg
        viewBox="0 0 340 352"
        className="mx-auto block w-full max-w-[400px]"
        role="img"
        aria-label={ARIA}
      >
        {lanes.map((lane, li) => {
          const x = V.cols[li];
          return (
            <g key={lane.name}>
              <text x={x - 11} y={20} fontSize={15} fontWeight={600} fill="var(--color-ink)">
                {lane.name}
              </text>
              <line x1={x} x2={x} y1={V.y0} y2={V.track} stroke="var(--color-rule)" strokeWidth={3} />
              <Sequence
                steps={lane.steps}
                a={{ x, y: V.y0 }}
                b={{ x, y: V.y1 }}
                label={(p, kind) => ({ x: p.x + (kind === "error" ? 22 : 19), y: p.y + 4.5, anchor: "start" })}
                animate={animate}
              />
            </g>
          );
        })}
      </svg>
      <div className="mx-auto mt-2 max-w-[400px] space-y-2 text-sm leading-snug">
        {lanes.map((lane) => (
          <motion.p
            key={lane.name}
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ delay: NOTE_DELAY, duration: 0.6 }}
          >
            <span className="font-semibold">{lane.name}.</span> {lane.note}
          </motion.p>
        ))}
      </div>
    </>
  );
}

export default function SequenceTrace() {
  const reduce = useReducedMotion();
  const [run, setRun] = useState(0);
  const animate = !reduce;

  return (
    <figure className="notebook rounded-[3px] border border-rule">
      {/* `key={run}` remounts the drawing so the replay button starts it again. */}
      <div key={run}>
        <div className="hidden md:block">
          <Horizontal animate={animate} />
        </div>
        <div className="px-4 pb-4 pt-5 md:hidden">
          <Vertical animate={animate} />
        </div>
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-rule bg-paper px-4 py-3 text-sm text-muted">
        <span>Illustrative concept, not real student data.</span>
        {animate && (
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className="rounded-[3px] border border-burette px-3 py-1 font-medium text-burette transition-colors hover:bg-burette hover:text-white"
          >
            Replay the sequence
          </button>
        )}
      </figcaption>
    </figure>
  );
}
