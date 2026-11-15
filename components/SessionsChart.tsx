import { elementa } from "@/lib/site";

const words = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

export default function SessionsChart() {
  const { sessions } = elementa;
  const max = Math.max(...sessions.map((s) => s.count));
  const howMany = words[sessions.length] || String(sessions.length);
  return (
    <figure className="mt-6">
      <dl className="space-y-3.5">
        {sessions.map((s) => {
          // Titration is the practical the research below is about, so its bar keeps the blue.
          const focus = s.practical === "Acid-base titration";
          return (
            <div key={s.practical} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1.5">
              <dt className="text-[0.9375rem] text-ink">{s.practical}</dt>
              <dd className="tabular text-[0.9375rem] text-muted">{s.count}</dd>
              <div className="col-span-2 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]" aria-hidden="true">
                <div
                  className={`h-full rounded-full ${focus ? "bg-burette" : "bg-ink/25"}`}
                  style={{ width: `${(s.count / max) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </dl>
      <figcaption className="mt-4 text-[0.8125rem] leading-relaxed text-muted">
        Sessions recorded in the {howMany} most-used practicals. The counts include some teacher
        demonstrations and say nothing yet about what students learned.
      </figcaption>
    </figure>
  );
}
