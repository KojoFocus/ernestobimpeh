"use client";

import { useEffect, useState } from "react";

type Item = { href: string; label: string };

// The menu stays at the top of the screen. It slides away while you scroll down to read and comes
// back as soon as you scroll up. Your name appears in it once the large name has scrolled away,
// and the section you are reading is underlined.
export default function Header({ name, items }: { name: string; items: Item[] }) {
  const [tucked, setTucked] = useState(false);
  const [showName, setShowName] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 6) return;
      setTucked(y > lastY && y > 240);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const h1 = document.querySelector("h1");
    if (!h1) return;
    const io = new IntersectionObserver(([e]) => setShowName(!e.isIntersecting), {
      rootMargin: "-64px 0px 0px 0px",
    });
    io.observe(h1);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // A section counts as "current" when it crosses the middle of the screen.
    const targets = ["#top", ...items.map((i) => i.href)]
      .map((h) => document.querySelector(h))
      .filter((el): el is Element => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id === "top" ? null : `#${e.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [items]);

  return (
    <header
      className={`sticky top-0 z-30 border-b transition-[transform,background-color,border-color] duration-300 focus-within:translate-y-0 motion-reduce:transition-none ${
        tucked ? "-translate-y-full" : ""
      } ${showName ? "border-rule bg-paper/90 backdrop-blur" : "border-transparent"}`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <a
          href="#top"
          tabIndex={showName ? 0 : -1}
          aria-hidden={!showName}
          className={`hidden font-semibold tracking-tight transition-opacity sm:block ${
            showName ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {name}
        </a>
        <nav aria-label="Main" className="ml-auto">
          <ul className="flex gap-5 text-sm">
            {items.map((n) => {
              const current = active === n.href;
              return (
                <li key={n.href}>
                  <a
                    href={n.href}
                    aria-current={current ? "location" : undefined}
                    className={`inline-block py-1 ${
                      current
                        ? "text-ink underline decoration-burette decoration-2 underline-offset-[6px]"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {n.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
