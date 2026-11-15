"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Copies the email address, for visitors whose mailto link opens nothing (webmail users).
 * The address is also shown as text next to it, so if the browser blocks the clipboard
 * the visitor can still select it by hand.
 */
export default function CopyEmail({
  email,
  label = "Copy",
  className,
}: {
  email: string;
  label?: string;
  className?: string;
}) {
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
    timer.current = setTimeout(() => setState("idle"), 2500);
  }

  const text = state === "copied" ? "Copied" : state === "failed" ? "Not copied" : label;
  const widest = [label, "Copied", "Not copied"].reduce((a, b) => (b.length > a.length ? b : a));

  return (
    <button type="button" onClick={copy} aria-label={`Copy ${email}`} className={className}>
      {/* The hidden label reserves the width so the button does not change size. */}
      <span className="grid">
        <span aria-hidden="true" className="invisible col-start-1 row-start-1">
          {widest}
        </span>
        <span className="col-start-1 row-start-1">{text}</span>
      </span>
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? "Email address copied" : state === "failed" ? "Could not copy. Select the address instead." : ""}
      </span>
    </button>
  );
}
