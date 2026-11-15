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
      className={`block shrink-0 rounded-full transition-transform group-hover:scale-125 group-focus-visible:scale-125 ${
        isNow ? "h-[18px] w-[18px] border-[3px] border-burette bg-paper" : "h-3.5 w-3.5 bg-burette"
      }`}
    />
  );
}

function Text({ stop }: { stop: Stop }) {
  return (
    <>
      <span className={`block font-semibold ${stop.isNow ? "text-burette" : "text-ink"}`}>{stop.year}</span>
      <span
        className={`block ${stop.isNow ? "text-burette" : "text-muted"} ${
          stop.href ? "underline-offset-4 group-hover:text-burette group-hover:underline group-focus-visible:text-burette group-focus-visible:underline" : ""
        }`}
      >
        {stop.label}
      </span>
    </>
  );
}

/* Wide screens: one line across, labels alternating above and below. */
function Across() {
  return (
    <ol aria-label="Milestones" className="relative hidden h-[180px] items-center justify-between pr-24 lg:flex">
      <span aria-hidden="true" className="path-draw absolute left-[7px] right-[calc(6rem+9px)] top-[calc(50%-1.5px)] h-[3px] bg-burette" />
      <span aria-hidden="true" className="absolute right-0 top-[calc(50%-1.5px)] w-[calc(6rem+9px)] border-t-[3px] border-dashed border-rule" />
      {stops.map((s, i) => {
        const above = i % 2 === 0;
        const place = `${above ? "bottom-[calc(50%+16px)]" : "top-[calc(50%+16px)]"} ${
          i === 0 ? "left-0 text-left" : "left-1/2 -translate-x-1/2 text-center"
        }`;
        const label = <span className={`absolute w-max max-w-[11rem] text-sm leading-snug ${place}`}><Text stop={s} /></span>;
        return (
          <li key={s.year + s.label} className="path-stop relative flex h-full items-center" style={delay(i)}>
            {s.href ? (
              <a href={s.href} className="group relative flex items-center rounded-full focus-visible:outline-offset-[6px]">
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

/* Phones and tablets: the same line running down the page. */
function Down() {
  return (
    <ol aria-label="Milestones" className="lg:hidden">
      {stops.map((s, i) => {
        const row = "grid min-h-11 grid-cols-[3.25rem_1fr] items-start gap-3 py-1.5 pl-7 text-sm leading-snug";
        return (
          <li key={s.year + s.label} className="path-stop relative" style={delay(i)}>
            {/* Segment to the next stop: solid between milestones, dashed after "now". */}
            <span
              aria-hidden="true"
              className={
                s.isNow
                  ? "absolute left-[6px] top-[16px] h-8 border-l-[3px] border-dashed border-rule"
                  : "absolute -bottom-[16px] left-[6px] top-[16px] w-[3px] bg-burette"
              }
            />
            {s.href ? (
              <a href={s.href} className={`group relative block ${row}`}>
                <span className="absolute left-0 top-[9px]">
                  <Dot isNow={s.isNow} />
                </span>
                <Text stop={s} />
              </a>
            ) : (
              <span className={`relative block ${row}`}>
                <span className="absolute left-0 top-[9px]">
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
