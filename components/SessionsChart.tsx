import { elementa } from "@/lib/site";

export default function SessionsChart() {
  const { sessions } = elementa;
  const max = Math.max(...sessions.map((s) => s.count));
  const words = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  const howMany = words[sessions.length] || String(sessions.length);
  return (
    <figure className="mt-6 max-w-xl">
      <dl className="space-y-3">
        {sessions.map((s) => (
          <div key={s.practical} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1">
            <dt className="text-sm">{s.practical}</dt>
            <dd className="tabular text-sm font-semibold">{s.count}</dd>
            <div className="col-span-2 h-2 bg-rule" aria-hidden="true">
              {/* Titration is the practical the research below is about, so its bar keeps the blue. */}
              <div
                className={`h-full ${s.practical === "Acid-base titration" ? "bg-burette" : "bg-muted/40"}`}
                style={{ width: `${(s.count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </dl>
      <figcaption className="mt-3 text-sm text-muted">
        Sessions recorded in the {howMany} most-used practicals. The counts include some teacher
        demonstrations and say nothing yet about what students learned.
      </figcaption>
    </figure>
  );
}
