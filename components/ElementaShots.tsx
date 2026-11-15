import Image from "next/image";

// Screenshots of Elementa's virtual benches. Files live in public/elementa/.
// The first is shown large; the rest sit two to a row beneath it.
const shots = [
  {
    src: "/elementa/titration.png",
    width: 1198,
    height: 637,
    caption: "Titration bench",
    alt: "Elementa's titration bench: a burette clamped to a retort stand above a waste beaker, beside a bottle of hydrochloric acid of unknown concentration.",
  },
  {
    src: "/elementa/pendulum.png",
    width: 1186,
    height: 649,
    caption: "Simple pendulum",
    alt: "Simple pendulum set-up: a bob hanging from a split cork, with a metre rule beside it, level with the cork at zero and with the bob's centre near 90.",
  },
  {
    src: "/elementa/microscope.png",
    width: 1191,
    height: 625,
    caption: "Microscope, with the view at ×400",
    alt: "A light microscope beside the view through the eyepiece at ×400, showing a cell, with a prompt asking the student to draw it.",
  },
];

export default function ElementaShots() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-4">
      {shots.map((s, i) => (
        <figure key={s.src} className={i === 0 ? "col-span-2" : undefined}>
          {/* The smaller shots share one frame shape so their captions line up; edges are dark margin. */}
          <a
            href={s.src}
            className={`block overflow-hidden rounded-[6px] border border-rule ${i === 0 ? "" : "aspect-[11/6]"}`}
          >
            <Image
              src={s.src}
              width={s.width}
              height={s.height}
              alt={s.alt}
              sizes={i === 0 ? "(min-width: 768px) 600px, 100vw" : "(min-width: 768px) 300px, 50vw"}
              className={i === 0 ? "block h-auto w-full" : "block h-full w-full object-cover"}
            />
          </a>
          <figcaption className="mt-2 text-sm text-muted">{s.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}
