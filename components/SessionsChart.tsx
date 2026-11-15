import { sessions } from "@/lib/site";

export default function SessionsChart() {
  const max = Math.max(...sessions.map((s) => s.count));
  return (
    <figure className="mt-6 max-w-xl">
      <dl className="space-y-3">
        {sessions.map((s) => (
          <div key={s.practical} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-1">
            <dt className="text-sm">{s.practical}</dt>
            <dd className="tabular text-sm font-semibold">{s.count}</dd>
            <div className="col-span-2 h-2 bg-rule" aria-hidden="true">
              <div className="h-full bg-burette" style={{ width: `${(s.count / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </dl>
      <figcaption className="mt-3 text-sm text-muted">
        Sessions recorded in the three most-used practicals during the early rollout, to November
        2026. These counts
        include some teacher demonstrations and say nothing yet about learning.
      </figcaption>
    </figure>
  );
}
