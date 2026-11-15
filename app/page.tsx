import CopyEmail from "@/components/CopyEmail";
import Header from "@/components/Header";
import PathLine from "@/components/PathLine";
import SequenceTrace from "@/components/SequenceTrace";
import SessionsChart from "@/components/SessionsChart";
import Shots from "@/components/Shots";
import { elementa, shots, site } from "@/lib/site";

// One story, told in order, in a single reading column. Headings follow on from each other:
// where I started, what I've been building, what I'm trying to understand, where I'm heading.
// Text sits in the column; figures break out wider when they need room. Spacing, not lines,
// separates the parts.
const nav = [
  { href: "#start", label: "Background" },
  { href: "#work", label: "Work" },
  { href: "#research", label: "Research" },
  { href: "#contact", label: "Contact" },
];

const col = "mx-auto w-full max-w-[44rem]";
const body = "text-[1.0625rem] leading-[1.75] text-ink/80";
const link = "underline decoration-ink/25 underline-offset-[5px] transition-colors hover:decoration-ink";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-28 md:mt-40">
      <h2 className={`${col} text-[1.625rem] font-semibold leading-tight tracking-[-0.02em] md:text-[1.875rem]`}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Meta({ items }: { items: React.ReactNode[] }) {
  return (
    <p className="tabular flex flex-wrap gap-x-2 text-sm text-muted">
      {items.map((item, i) => (
        <span key={i} className="flex gap-x-2">
          {i > 0 && <span aria-hidden="true">·</span>}
          {item}
        </span>
      ))}
    </p>
  );
}

// One thing in the story: a project, a degree, a piece of research. The negative margin gives the
// highlight (when the milestone line jumps here) room to breathe without moving the text.
function Entry({
  id,
  meta,
  title,
  children,
}: {
  id?: string;
  meta: React.ReactNode[];
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`${col} mt-12 first-of-type:mt-10`}>
      <article id={id} className="-mx-4 -my-4 rounded-xl px-4 py-4">
        <Meta items={meta} />
        {title && <h3 className="mt-1.5 text-lg font-semibold tracking-[-0.01em]">{title}</h3>}
        <div className={`mt-3 space-y-4 ${body}`}>{children}</div>
      </article>
    </div>
  );
}

function Out({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className={link}>
      {children}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-40 focus:bg-paper focus:p-2">
        Skip to content
      </a>

      <Header name={site.name} items={nav} />

      <main id="main" className="px-6">
        {/* Who I am */}
        <section id="top" className={`${col} pt-16 md:pt-24`}>
          <h1 className="text-[clamp(2.4rem,5.5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            {site.name}
          </h1>
          <p className="mt-3 text-[1.0625rem] text-muted">
            Laboratory scientist and software developer in {site.location}
          </p>
          <p className={`mt-8 max-w-[38rem] ${body}`}>
            I discovered computing while studying laboratory science. At the time, I was more
            interested in what I could build than in becoming a software developer. That
            hasn&rsquo;t changed much. These days, I am most curious about how computers can help us
            learn, do science and make sense of information.
          </p>
          <div className="mt-16">
            <PathLine />
          </div>
        </section>

        {/* 1. Background */}
        <Section id="start" title="Where I started">
          <Entry id="ucc" meta={["2014–2018", "BSc Laboratory Technology"]} title="University of Cape Coast">
            <p>
              My interest in software began around 2016, halfway through my degree. I did not even
              have a laptop at the time, but I had plenty of ideas, like a way to identify plants from
              a photograph or to find misplaced keys. I later found out that people were already
              working on such things, which made me even more curious.
            </p>
          </Entry>

          <Entry
            id="dissertation"
            meta={["2018", "Undergraduate dissertation"]}
            title="Pesticide residues in dried chilli pepper"
          >
            <p>
              My degree also introduced me to research. For my final-year project, I travelled to
              Brewaniase, Kwadaso, Sunyani and Winneba to collect dried chilli pepper from farmers. I
              wanted to find out whether the peppers contained pesticide residues, and the Ghana
              Standards Authority provided technical assistance. No residues of the pesticides I
              looked for were detected.
            </p>
            <dl className="flex flex-wrap gap-x-10 gap-y-3 pt-1">
              {[
                ["120", "samples"],
                ["36", "pesticides tested for"],
                ["4", "regions"],
              ].map(([n, label]) => (
                <div key={label} className="flex flex-col-reverse">
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="tabular text-2xl font-semibold tracking-[-0.02em] text-ink">{n}</dd>
                </div>
              ))}
            </dl>
            <details className="group">
              <summary className="flex w-fit cursor-pointer list-none items-center gap-2 text-[0.9375rem] text-muted transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="inline-block w-3 text-center transition-transform group-open:rotate-45 motion-reduce:transition-none">
                  +
                </span>
                How it was done
              </summary>
              <p className="pl-5 pt-2 text-[0.9375rem] leading-relaxed text-muted">
                The samples were analyzed using gas chromatography with electron capture detection
                (GC-ECD), a lab technique that can pick up very small amounts of certain pesticides.
                My supervisor was {site.supervisor} at the University of Cape Coast.
              </p>
            </details>
          </Entry>

          <Entry
            id="labs"
            meta={["2018 onwards", "Hospital lab", "Food quality control", "Beekeeping since 2021"]}
            title="After university"
          >
            <p>
              I worked in a hospital laboratory and then in food quality control, and kept teaching
              myself to build software. Later, I joined GROW, a web development training programme run
              by Generation Ghana and MEST Africa and funded by the Mastercard Foundation.
            </p>
          </Entry>
        </Section>

        {/* 2. Work, newest first */}
        <Section id="work" title="What I've been building">
          <Entry
            id="pinn"
            meta={["2026", "Founder and developer", <Out key="l" href={site.links.pinn}>pinnghana.com</Out>]}
            title="PINN Ghana"
          >
            <p>
              What if we had a better way to collect and make sense of information about our roads in
              Ghana? PINN is my attempt to explore that question. Road users report potholes and
              other hazards with their location and photos. The reports appear on a map, and each one
              is tracked until the right authority deals with it.
            </p>
            <Shots shots={shots.pinn} layout="phones" />
          </Entry>

          <Entry
            id="elementa"
            meta={[
              "2025–present",
              "Founder and lead developer",
              <Out key="l" href={site.links.elementa}>elementalabsafrica.com</Out>,
            ]}
            title="Elementa Labs Africa"
          >
            <p>
              I still remember sneaking out of school in the evenings to attend chemistry practicals
              at another school because we had very little access to a laboratory at my own school.
              Years later, after teaching maths and science myself, I started building a virtual lab
              for students who face a similar problem.
            </p>
            <p>
              Elementa lets secondary school students carry out chemistry, physics and biology
              practicals that follow the West African WASSCE syllabus, with step-by-step guidance and
              automatic marking. Teachers can also assign practicals to their students.
            </p>
            <Shots shots={shots.elementa} layout="feature" />
            <p className="pt-4">
              In the early rollout, to {elementa.asOf}, {elementa.students} students and{" "}
              {elementa.teachers} teachers registered. These are the practicals they used most.
            </p>
            <SessionsChart />
          </Entry>
        </Section>

        {/* 3. Research */}
        <Section id="research" title="What I'm trying to understand">
          <Entry meta={["Ongoing", "Grew out of Elementa"]}>
            <p>
              While building Elementa, I started to wonder whether the steps students take during a
              practical could say more about what they understand than their final answers.
            </p>
            <p>
              Imagine two students doing a titration, adding liquid from a measuring tube called a
              burette until the mixture changes colour. Both record the same wrong reading. One
              handles the burette well but does not understand the chemistry. The other understands
              the chemistry but struggles with the burette. Both may lose the same mark.
            </p>
          </Entry>

          <p className={`${col} mt-12 text-[1.5rem] font-medium leading-[1.3] tracking-[-0.015em] md:text-[1.75rem]`}>
            How would a teacher know which student needs what kind of help?
          </p>

          <div className="mx-auto mt-12 max-w-5xl">
            <SequenceTrace />
          </div>

          <div className={`${col} mt-12`}>
            <p className="text-sm text-muted">The research question</p>
            <p className="mt-2 text-[1.0625rem] leading-[1.75] text-ink">
              Could the steps that led to a student&rsquo;s mistake, read alongside a separate test of
              the ideas behind the experiment, tell us what kind of difficulty they are having? And
              would seeing those steps laid out visually help a teacher decide what each student
              needs?
            </p>

            <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              <div>
                <h3 className="text-[0.9375rem] font-semibold">What Elementa already records</h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.7] text-ink/75">
                  Each student&rsquo;s mistakes and when they happen, their past attempts and their
                  skill scores. Since November 2026, it has also recorded every action at the bench in
                  order, and whether each checked step was right the first time. In titrations set by
                  a teacher, it compares the readings students write down with what the instrument
                  showed, so it can already tell a misread burette from a titration stopped at the
                  wrong point.
                </p>
              </div>
              <div>
                <h3 className="text-[0.9375rem] font-semibold">What it cannot tell yet</h3>
                <p className="mt-2 text-[0.9375rem] leading-[1.7] text-ink/75">
                  Why a student stopped where they did. That needs a fuller study, with consent and a
                  separate test of the ideas behind the experiment. The study has been designed and
                  will not run until it has ethics approval.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* 4. Contact */}
        <Section id="contact" title="Where I'm heading">
          <div className={`${col} mt-10 space-y-4 ${body}`}>
            <p>
              Building Elementa has made me appreciate how much there is to learn beyond getting
              software to work. I now want to study questions like these more rigorously, through
              doctoral research.
            </p>
            <p>
              Most of my work so far has been in education. But I trained as a laboratory scientist,
              and I would love to work with scientists in other fields on how AI and interactive tools
              could help them.
            </p>
            <p>
              The things I think about most are human-computer interaction, artificial intelligence,
              interactive data visualization, learning analytics and computing for scientific
              discovery. I enjoy talking about ideas, especially with people who know things I do not.
              If you are working on something related, or are just curious, I would be happy to hear
              from you.
            </p>
          </div>

          <div className={`${col} mt-12`}>
            {/* The copy icon stays on the same line as the address at every width. */}
            <div className="flex items-center gap-1.5">
              <a
                href={`mailto:${site.email}`}
                className="min-w-0 break-all text-lg font-medium text-burette underline underline-offset-4 hover:no-underline sm:text-xl"
              >
                {site.email}
              </a>
              <CopyEmail email={site.email} />
            </div>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {site.links.github && (
                <a href={site.links.github} className="font-medium text-burette underline underline-offset-4 hover:no-underline">
                  GitHub
                </a>
              )}
              {site.links.cv && (
                <a href={site.links.cv} className="font-medium text-burette underline underline-offset-4 hover:no-underline">
                  CV (PDF)
                </a>
              )}
            </p>
          </div>
        </Section>
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
