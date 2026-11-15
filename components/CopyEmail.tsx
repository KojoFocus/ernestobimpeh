"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A small copy icon that sits right after the email address, for visitors whose mailto link
 * opens nothing (webmail users). It swaps to a tick when copied. The address itself is shown
 * as text, so if the browser blocks the clipboard the visitor can still select it by hand.
 */
export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      title={state === "copied" ? "Copied" : "Copy email address"}
      aria-label="Copy email address"
      className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-burette transition-colors hover:bg-burette/10"
    >
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {state === "copied" ? (
          <path d="M3 8.5l3.2 3.2L13 5" />
        ) : (
          <>
            <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
            <path d="M10.5 5.5V4A1.5 1.5 0 0 0 9 2.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5" />
          </>
        )}
      </svg>
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? "Email address copied" : state === "failed" ? "Could not copy. Select the address instead." : ""}
      </span>
    </button>
  );
}
