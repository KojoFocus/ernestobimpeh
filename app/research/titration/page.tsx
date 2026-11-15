import type { Metadata } from "next";
import Link from "next/link";
import TitrationExplorer from "@/components/sim/TitrationExplorer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `The steps behind a wrong titre · ${site.name}`,
  description:
    "An interactive sketch of my research question: six made-up students at Elementa's titration bench lose the same mark for different reasons.",
};

const col = "mx-auto w-full max-w-[44rem]";

export default function TitrationSketch() {
  return (
    <>
      <header className="px-6">
        <div className={`${col} flex items-center justify-between gap-4 py-4 text-[0.875rem]`}>
          <Link href="/" className="font-semibold tracking-[-0.01em]">
            {site.name}
          </Link>
          <Link href="/#research" className="text-muted transition-colors hover:text-ink">
            Back to the research
          </Link>
        </div>
      </header>

      <main id="main">
        <div className="px-6">
          <div className={`${col} pb-10 pt-12 md:pt-16`}>
            <p className="text-sm text-muted">An interactive sketch · Made-up students</p>
            <h1 className="mt-3 text-[clamp(2rem,4.5vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
              The steps behind a wrong titre
            </h1>
            <p className="mt-6 text-[1.0625rem] leading-[1.75] text-ink/80">
              Six made-up students do the same titration in Elementa, and all six lose the same mark. Step through what each
              view of them shows: the mark, the steps they took at the bench, and a short check of the ideas behind the
              experiment. It is the question in my research, worked through on an example.
            </p>
          </div>
        </div>

        <TitrationExplorer />
      </main>

      <footer className="mt-32 px-6">
        <div className={`${col} flex flex-wrap justify-between gap-2 border-t border-rule py-8 text-sm text-muted`}>
          <span>
            {site.name}, {site.location}
          </span>
          <span>Updated {site.updated}</span>
        </div>
      </footer>
    </>
  );
}
