import type { CSSProperties } from "react";
import { now, path } from "@/lib/site";

// The line of milestones under the name. Plain HTML, so it is visible before any script runs;
// the drawing and fade-in are CSS animations that only play when the visitor allows motion
// (see .path-draw and .path-stop in globals.css). Stops with an href jump to that part of the story.

type Stop = { year: string; label: string; href?: string; isNow?: boolean };

const stops: Stop[] = [...path, { year: "Now", label: now.label, href: now.href, isNow: true }];
const delay = (i: number) => ({ "--i": i }) as CSSProperties;

function Dot({ isNow }: { isNow?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`block shrink-0 rounded-full transition-transform duration-200 group-hover:scale-[1.35] group-focus-visible:scale-[1.35] motion-reduce:transition-none ${
        isNow ? "h-3.5 w-3.5 border-2 border-burette bg-paper" : "h-2.5 w-2.5 bg-burette"
      }`}
    />
  );
}

function Text({ stop }: { stop: Stop }) {
  return (
    <>
      <span className={`tabular block font-medium ${stop.isNow ? "text-burette" : "text-ink"}`}>{stop.year}</span>
      <span
        className={`block transition-colors ${stop.isNow ? "text-burette" : "text-muted"} ${
          stop.href
            ? "decoration-ink/30 underline-offset-[3px] group-hover:text-ink group-hover:underline group-focus-visible:text-ink group-focus-visible:underline"
            : ""
        }`}
      >
        {stop.label}
      </span>
    </>
  );
}

/* Wider screens: one line across the column, labels alternating above and below. */
function Across() {
  return (
    <ol aria-label="Milestones" className="relative hidden h-[168px] items-center justify-between pr-16 md:flex">
      <span aria-hidden="true" className="path-draw absolute left-[5px] right-[calc(4rem+7px)] top-[calc(50%-1px)] h-[2px] bg-burette" />
      <span aria-hidden="true" className="absolute right-0 top-[calc(50%-1px)] w-[calc(4rem+7px)] border-t-2 border-dotted border-muted/40" />
      {stops.map((s, i) => {
        const above = i % 2 === 0;
        const place = `${above ? "bottom-[calc(50%+14px)]" : "top-[calc(50%+14px)]"} ${
          i === 0 ? "left-0 text-left" : "left-1/2 -translate-x-1/2 text-center"
        }`;
        const label = (
          // Longer labels wrap onto two even lines so neighbours never touch.
          <span className={`absolute w-max max-w-[8.5rem] text-balance text-[0.8125rem] leading-snug ${place}`}>
            <Text stop={s} />
          </span>
        );
        return (
          <li key={s.year + s.label} className="path-stop relative flex h-full items-center" style={delay(i)}>
            {s.href ? (
              <a href={s.href} className="group relative flex items-center rounded-full focus-visible:outline-offset-[5px]">
                <Dot isNow={s.isNow} />
                {label}
              </a>
            ) : (
              <span className="relative flex items-center">
                <Dot isNow={s.isNow} />
                {label}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* Phones: the same line running down the page. */
function Down() {
  return (
    <ol aria-label="Milestones" className="md:hidden">
      {stops.map((s, i) => {
        const row = "grid min-h-11 grid-cols-[3rem_1fr] items-start gap-3 py-1.5 pl-6 text-[0.9375rem] leading-snug";
        return (
          <li key={s.year + s.label} className="path-stop relative" style={delay(i)}>
            {/* Segment to the next stop: solid between milestones, dotted after "now". */}
            <span
              aria-hidden="true"
              className={
                s.isNow
                  ? "absolute left-[4px] top-[18px] h-8 border-l-2 border-dotted border-muted/40"
                  : "absolute -bottom-[16px] left-[4px] top-[16px] w-[2px] bg-burette"
              }
            />
            {s.href ? (
              <a href={s.href} className={`group relative block ${row}`}>
                <span className="absolute left-0 top-[11px]">
                  <Dot isNow={s.isNow} />
                </span>
                <Text stop={s} />
              </a>
            ) : (
              <span className={`relative block ${row}`}>
                <span className="absolute left-0 top-[11px]">
                  <Dot isNow={s.isNow} />
                </span>
                <Text stop={s} />
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default function PathLine() {
  return (
    <>
      <Across />
      <Down />
    </>
  );
}
