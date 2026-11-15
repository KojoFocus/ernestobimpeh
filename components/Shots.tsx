"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Shot } from "@/lib/site";

// Screenshot thumbnails that open larger in an overlay on the page.
// - "feature": first shot wide, the rest two to a row (landscape app screens).
// - "phones": three portrait phone screens side by side.
// Each thumbnail is still a plain link to the image, so it works without JavaScript.
export default function Shots({ shots, layout }: { shots: Shot[]; layout: "feature" | "phones" }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const thumbs = useRef<(HTMLAnchorElement | null)[]>([]);
  const last = useRef(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    // When the overlay closes (Esc, the close button or a click outside), focus goes back to the thumbnail.
    const onClose = () => thumbs.current[last.current]?.focus();
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  function open(i: number) {
    last.current = i;
    setIndex(i);
    dialog.current?.showModal();
  }

  function step(by: number) {
    const i = (index + by + shots.length) % shots.length;
    last.current = i;
    setIndex(i);
  }

  const current = shots[index];
  const portrait = current.height > current.width;

  return (
    <>
      <div
        className={
          layout === "feature"
            ? "mt-6 grid grid-cols-2 gap-x-3 gap-y-4"
            : "mt-6 grid grid-cols-3 gap-x-2 gap-y-4 sm:gap-x-3"
        }
      >
        {shots.map((s, i) => {
          const wide = layout === "feature" && i === 0;
          const frame =
            layout === "phones" ? "aspect-[9/16]" : wide ? "" : "aspect-[11/6]";
          return (
            <figure key={s.src} className={wide ? "col-span-2" : undefined}>
              <a
                ref={(el) => {
                  thumbs.current[i] = el;
                }}
                href={s.src}
                onClick={(e) => {
                  e.preventDefault();
                  open(i);
                }}
                aria-label={`Enlarge: ${s.caption}`}
                className={`block cursor-zoom-in overflow-hidden rounded-[6px] border border-rule transition-colors hover:border-burette focus-visible:border-burette ${frame}`}
              >
                <Image
                  src={s.src}
                  width={s.width}
                  height={s.height}
                  alt={s.alt}
                  sizes={
                    layout === "phones"
                      ? "(min-width: 768px) 230px, 33vw"
                      : wide
                        ? "(min-width: 768px) 600px, 100vw"
                        : "(min-width: 768px) 300px, 50vw"
                  }
                  className={wide ? "block h-auto w-full" : "block h-full w-full object-cover object-top"}
                />
              </a>
              <figcaption className="mt-2 text-sm text-muted">{s.caption}</figcaption>
            </figure>
          );
        })}
      </div>

      <dialog
        ref={dialog}
        aria-label={current.caption}
        onClick={(e) => {
          // A click on the dark backdrop (the dialog element itself) closes it.
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/85"
      >
        <figure
          className={`flex max-h-[92vh] flex-col items-center gap-3 p-2 ${
            portrait ? "w-[min(92vw,460px)]" : "w-[min(92vw,1100px)]"
          }`}
        >
          <Image
            key={current.src}
            src={current.src}
            width={current.width}
            height={current.height}
            alt={current.alt}
            sizes="92vw"
            className={`h-auto rounded-[6px] ${portrait ? "max-h-[78vh] w-auto" : "max-h-[78vh] w-full object-contain"}`}
          />
          <figcaption className="flex w-full flex-wrap items-center justify-between gap-3 text-sm text-white">
            <span>
              {current.caption}
              <span className="text-white/60">
                {" "}
                · {index + 1} of {shots.length}
              </span>
            </span>
            <span className="flex gap-2">
              {shots.length > 1 && (
                <>
                  <button type="button" onClick={() => step(-1)} className="rounded-[3px] border border-white/40 px-3 py-1.5 hover:bg-white/10">
                    Previous
                  </button>
                  <button type="button" onClick={() => step(1)} className="rounded-[3px] border border-white/40 px-3 py-1.5 hover:bg-white/10">
                    Next
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                autoFocus
                className="rounded-[3px] bg-white px-3 py-1.5 font-medium text-ink hover:bg-white/90"
              >
                Close
              </button>
            </span>
          </figcaption>
        </figure>
      </dialog>
    </>
  );
}
