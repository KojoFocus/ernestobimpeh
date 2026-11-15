"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Copies the address for visitors whose "Email me" link opens nothing (webmail users).
 * If the browser blocks clipboard access, the button shows the address so it can be copied by hand.
 */
export default function CopyEmail({ email, className }: { email: string; className?: string }) {
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
      timer.current = setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("failed");
    }
  }

  const label = state === "copied" ? "Copied" : state === "failed" ? email : "Copy email";

  return (
    <button type="button" onClick={copy} title={email} className={className}>
      {/* The hidden label reserves the width so the button does not shrink on "Copied". */}
      <span className="grid">
        <span aria-hidden="true" className="invisible col-start-1 row-start-1">
          Copy email
        </span>
        <span className={`col-start-1 row-start-1 ${state === "failed" ? "select-all" : ""}`}>
          {label}
        </span>
      </span>
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? "Email address copied" : ""}
      </span>
    </button>
  );
}
