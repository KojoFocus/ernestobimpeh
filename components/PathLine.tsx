"use client";

import { motion, useReducedMotion } from "motion/react";
import { now, path } from "@/lib/site";

// Your own sequence, drawn in the same language as the research figure:
// solid dots for what you have done, an open ring for now, and a dashed line for what comes next.

const START = 0.3;
const DRAW = 2.2;

// Every element starts hidden on the server and in the browser alike, so the first render always
// matches. For visitors who turn animation off, `go` makes each step finish instantly.
type Go = (delay: number, duration: number) => { delay: number; duration: number };

/* Wide screens: a horizontal line, labels alternating above and below.
   The first dot sits on the left edge, in line with the name and text above it. */
const W = { x0: 10, xNow: 890, end: 990, y: 100 };

function Horizontal({ go }: { go: Go }) {
  const stops = path.length; // index of "now"
  const gap = (W.xNow - W.x0) / stops;
  const at = (i: number) => W.x0 + i * gap;
  const delay = (i: number) => START + DRAW * (i / stops);

  return (
    <svg
      viewBox="0 0 1000 200"
      className="block w-full"
      role="img"
      aria-label={`Milestones: ${path.map((p) => `${p.year}, ${p.label}`).join("; ")}; now, ${now.lines.join(" ")}.`}
    >
      <line x1={W.xNow} x2={W.end} y1={W.y} y2={W.y} stroke="var(--color-rule)" strokeWidth={3} strokeDasharray="6 7" />
      <motion.line
        x1={W.x0}
        x2={W.xNow}
        y1={W.y}
        y2={W.y}
        stroke="var(--color-burette)"
        strokeWidth={3}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ ...go(START, DRAW), ease: "linear" }}
      />

      {path.map((p, i) => {
        const x = at(i);
        const above = i % 2 === 0;
        // The first label starts at the dot's left edge so it does not run off the page.
        const lx = i === 0 ? x - 7 : x;
        const anchor = i === 0 ? "start" : "middle";
        return (
          <motion.g
            key={p.year + p.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={go(delay(i), 0.3)}
          >
            <circle cx={x} cy={W.y} r={7} fill="var(--color-burette)" />
            <text x={lx} y={above ? 48 : 146} textAnchor={anchor} fontSize={14} fontWeight={600} fill="var(--color-ink)">
              {p.year}
            </text>
            <text x={lx} y={above ? 68 : 166} textAnchor={anchor} fontSize={14} fill="var(--color-muted)">
              {p.label}
            </text>
          </motion.g>
        );
      })}

      <motion.a
        href={now.href}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={go(delay(stops), 0.3)}
      >
        <motion.circle
          cx={W.xNow}
          cy={W.y}
          r={9}
          fill="none"
          stroke="var(--color-burette)"
          strokeWidth={2}
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 2.4, opacity: 0 }}
          transition={{ ...go(delay(stops) + 0.2, 1.4), ease: "easeOut", repeat: 1, repeatDelay: 0.4 }}
          style={{ transformOrigin: `${W.xNow}px ${W.y}px` }}
        />
        <circle cx={W.xNow} cy={W.y} r={9} fill="var(--color-paper)" stroke="var(--color-burette)" strokeWidth={3} />
        <text x={W.xNow} y={146} textAnchor="middle" fontSize={14} fontWeight={600} fill="var(--color-burette)">
          Now
        </text>
        {now.lines.map((line, i) => (
          <text key={line} x={W.xNow} y={166 + i * 18} textAnchor="middle" fontSize={14} fill="var(--color-burette)">
            {line}
          </text>
        ))}
      </motion.a>
    </svg>
  );
}

/* Phones and tablets: the same line, running down the page. */
function Vertical({ go }: { go: Go }) {
  const items = [
    ...path.map((p) => ({ year: p.year, label: p.label, isNow: false })),
    { year: "Now", label: now.lines.join(" "), isNow: true },
  ];

  return (
    <ol>
      {items.map((item, i) => (
        <motion.li
          key={item.year + item.label}
          className="relative grid grid-cols-[3.25rem_1fr] gap-3 pb-5 pl-7 last:pb-0"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={go(START + i * 0.12, 0.3)}
        >
          {/* Segment to the next dot: solid between milestones, dashed after "now". */}
          <span
            aria-hidden="true"
            className={
              item.isNow
                ? "absolute left-[6px] top-[14px] h-8 border-l-[3px] border-dashed border-rule"
                : "absolute -bottom-[10px] left-[6px] top-[10px] w-[3px] bg-burette"
            }
          />
          <span
            aria-hidden="true"
            className={
              item.isNow
                ? "absolute left-0 top-[3px] h-[15px] w-[15px] rounded-full border-[3px] border-burette bg-paper"
                : "absolute left-[1px] top-[4px] h-[13px] w-[13px] rounded-full bg-burette"
            }
          />
          <span className={`tabular text-sm font-semibold ${item.isNow ? "text-burette" : ""}`}>{item.year}</span>
          {item.isNow ? (
            <a href={now.href} className="text-sm text-burette underline-offset-4 hover:underline">
              {item.label}
            </a>
          ) : (
            <span className="text-sm text-muted">{item.label}</span>
          )}
        </motion.li>
      ))}
    </ol>
  );
}

export default function PathLine() {
  const reduce = useReducedMotion();
  const go: Go = (delay, duration) => (reduce ? { delay: 0, duration: 0 } : { delay, duration });
  return (
    <>
      <div className="hidden lg:block">
        <Horizontal go={go} />
      </div>
      <div className="lg:hidden">
        <Vertical go={go} />
      </div>
    </>
  );
}
