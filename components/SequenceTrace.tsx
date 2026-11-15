"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Kind = "ok" | "retry" | "error";
type Step = { label: string; kind: Kind };
type Lane = { name: string; note: string; steps: Step[] };
type Pt = { x: number; y: number };

// Same order as the text above the figure: first the student who handles the burette well but
// does not understand the chemistry, then the one who understands it but struggles with the burette.
const lanes: Lane[] = [
  {
    name: "Student A",
    note: "Every step goes smoothly, but the reading recorded is wrong. Maybe the chemistry is unclear.",
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
    note: "Retries twice before recording the same wrong reading. Maybe the burette is the problem.",
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

const START = 0.3;
const DRAW = 2.8;
const NOTE_DELAY = START + DRAW + 0.5;

const ARIA =
  "An illustration of two students' titration steps. Student A goes through every step smoothly but records a wrong reading. Student B retries twice before recording the same wrong reading.";

/**
 * How the figure is shown:
 * - "still": finished drawing, no motion. What the server sends, and what visitors who turn
 *   animation off always see, so the figure is never blank while scripts load.
 * - "waiting": hidden, because the figure is still below the screen; it plays once it scrolls in.
 * - "playing": drawing itself.
 */
type Mode = "still" | "waiting" | "playing";

function motionProps<T>(mode: Mode, hidden: T, shown: T, transition: object) {
  return {
    initial: mode === "still" ? false : (hidden as never),
    animate: (mode === "waiting" ? hidden : shown) as never,
    transition: mode === "playing" ? transition : { duration: 0 },
  };
}

function Sequence({
  steps,
  a,
  b,
  label,
  mode,
}: {
  steps: Step[];
  a: Pt;
  b: Pt;
  label: (p: Pt, kind: Kind) => Pt & { anchor: "start" | "middle" };
  mode: Mode;
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
        {...motionProps(mode, { pathLength: 0 }, { pathLength: 1 }, { delay: START, duration: DRAW, ease: "linear" })}
      />
      {steps.map((step, i) => {
        const p = { x: a.x + ((b.x - a.x) * i) / n, y: a.y + ((b.y - a.y) * i) / n };
        const t = START + DRAW * (i / n);
        const l = label(p, step.kind);
        const error = step.kind === "error";
        return (
          <motion.g
            key={i}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            {...motionProps(mode, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1 }, { delay: t, duration: 0.25 })}
          >
            {error && mode === "playing" && (
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

function Across({ mode }: { mode: Mode }) {
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
              mode={mode}
            />
            <motion.text
              x={H.x0}
              y={y - 28}
              fontSize={15}
              fill="var(--color-ink)"
              {...motionProps(mode, { opacity: 0 }, { opacity: 1 }, { delay: NOTE_DELAY, duration: 0.6 })}
            >
              {lane.note}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}

/* Phones and tablets: one column per student, read top to bottom, notes as wrapping text below. */
const V = { cols: [18, 188], y0: 52, y1: 316, track: 340 };

function Down({ mode }: { mode: Mode }) {
  return (
    <>
      <svg viewBox="0 0 340 352" className="mx-auto block w-full max-w-[400px]" role="img" aria-label={ARIA}>
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
                mode={mode}
              />
            </g>
          );
        })}
      </svg>
      <div className="mx-auto mt-2 max-w-[400px] space-y-2 text-sm leading-snug">
        {lanes.map((lane) => (
          <motion.p key={lane.name} {...motionProps(mode, { opacity: 0 }, { opacity: 1 }, { delay: NOTE_DELAY, duration: 0.6 })}>
            <span className="font-semibold">{lane.name}.</span> {lane.note}
          </motion.p>
        ))}
      </div>
    </>
  );
}

export default function SequenceTrace() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [mode, setMode] = useState<Mode>("still");
  const [canAnimate, setCanAnimate] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setCanAnimate(true);
    // Only hold the drawing back if the visitor has not reached it yet.
    const top = ref.current?.getBoundingClientRect().top ?? 0;
    if (top > window.innerHeight * 0.9) setMode("waiting");
  }, []);

  useEffect(() => {
    if (mode === "waiting" && inView) setMode("playing");
  }, [mode, inView]);

  return (
    <figure ref={ref} className="notebook overflow-hidden rounded-xl ring-1 ring-ink/10">
      {/* `key={run}` restarts the drawing when Replay is pressed. */}
      <div key={run}>
        <div className="hidden px-6 py-2 lg:block">
          <Across mode={mode} />
        </div>
        <div className="px-4 pb-4 pt-5 lg:hidden">
          <Down mode={mode} />
        </div>
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 bg-paper/80 px-5 py-3 text-[0.8125rem] text-muted">
        <span>A sketch of the idea, not real student data.</span>
        {canAnimate && (
          <button
            type="button"
            onClick={() => {
              setMode("playing");
              setRun((r) => r + 1);
            }}
            className="rounded-md px-2 py-1 text-muted underline decoration-ink/25 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            Play again
          </button>
        )}
      </figcaption>
    </figure>
  );
}
