import CopyEmail from "@/components/CopyEmail";
import Header from "@/components/Header";
import PathLine from "@/components/PathLine";
import SequenceTrace from "@/components/SequenceTrace";
import SessionsChart from "@/components/SessionsChart";
import Shots from "@/components/Shots";
import { elementa, shots, site } from "@/lib/site";

// One story, told in order. Each section has a short menu word above its heading (so people
// skimming can find their way) and a heading that picks up from the one before it (so people
// reading can follow). Every section uses the same two-column row: when and what on the left,
// the story on the right. Figures run across both columns.
const nav = [
  { href: "#start", label: "Background" },
  { href: "#work", label: "Work" },
  { href: "#research", label: "Research" },
  { href: "#contact", label: "Contact" },
];

const textLink = "font-medium text-burette underline underline-offset-4 hover:no-underline";

function SectionHead({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-sm font-medium uppercase tracking-[0.12em] text-muted">{label}</p>
      <h2 className="mt-2 text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em]">
        {title}
      </h2>
    </div>
  );
}

function Row({
  id,
  meta,
  children,
  rule = true,
}: {
  id?: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
  rule?: boolean;
}) {
  return (
    <article
      id={id}
      className={`grid gap-3 py-10 md:grid-cols-[220px_1fr] md:gap-10 ${rule ? "border-t border-rule" : ""}`}
    >
      <div className="space-y-0.5 text-sm text-muted">{meta}</div>
      <div className="max-w-[62ch]">{children}</div>
    </article>
  );
}

function When({ children }: { children: React.ReactNode }) {
  return <p className="font-medium text-ink">{children}</p>;
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="tabular text-3xl font-semibold">{value}</dd>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-40 focus:bg-paper focus:p-2">
        Skip to content
      </a>

      <Header name={site.name} items={nav} />

      <main id="main" className="mx-auto max-w-5xl px-6">
        {/* Who I am */}
        <section id="top" className="pb-16 pt-6 md:pb-20 md:pt-12">
          <h1 className="text-[clamp(2.4rem,10vw,6rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            {site.name}
          </h1>
          <p className="mt-4 text-lg text-muted">
            Laboratory scientist and software developer in {site.location}
          </p>
          <p className="mt-6 max-w-[56ch] text-xl leading-relaxed text-ink/85">
            I discovered computing while studying laboratory science. At the time, I was more
            interested in what I could build than in becoming a software developer. That
            hasn&rsquo;t changed much. These days, I am most curious about how computers can help us
            learn, do science and make sense of information.
          </p>
          <div className="mt-12 lg:mt-14">
            <PathLine />
          </div>
        </section>

        {/* 1. Background */}
        <section id="start" className="border-t border-ink pt-16">
          <SectionHead label="Background" title="Where I started" />

          <Row
            id="ucc"
            meta={
              <>
                <When>2014 to 2018</When>
                <p>BSc Laboratory Technology</p>
                <p>University of Cape Coast</p>
              </>
            }
          >
            <p className="leading-relaxed">
              My interest in software began around 2016, halfway through my degree. I did not even
              have a laptop at the time, but I had plenty of ideas, like a way to identify plants
              from a photograph or to find misplaced keys. I later found out that people were already
              working on such things, which made me even more curious.
            </p>
          </Row>

          <Row
            id="dissertation"
            meta={
              <>
                <When>2018</When>
                <p>Undergraduate dissertation</p>
              </>
            }
          >
            <h3 className="text-2xl font-semibold tracking-tight">Pesticide residues in dried chilli pepper</h3>
            <p className="mt-3 leading-relaxed">
              My degree also introduced me to research. For my final-year project, I travelled to
              Brewaniase, Kwadaso, Sunyani and Winneba to collect dried chilli pepper from farmers. I
              wanted to find out whether the peppers contained pesticide residues, and the Ghana
              Standards Authority provided technical assistance. No residues of the pesticides I
              looked for were detected.
            </p>
            <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
              <Stat label="Samples" value="120" />
              <Stat label="Pesticides tested for" value="36" />
              <Stat label="Regions" value="4" />
            </dl>
            <details className="group mt-5">
              <summary className="flex w-fit cursor-pointer list-none items-center gap-2 font-medium text-burette [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="inline-block text-lg leading-none transition-transform group-open:rotate-45 motion-reduce:transition-none">
                  +
                </span>
                How it was done
              </summary>
              <p className="pt-3 leading-relaxed text-muted">
                The samples were analyzed using gas chromatography with electron capture detection
                (GC-ECD), a lab technique that can pick up very small amounts of certain pesticides.
                My supervisor was {site.supervisor} at the University of Cape Coast.
              </p>
            </details>
          </Row>

          <Row
            id="labs"
            meta={
              <>
                <When>After university</When>
                <p>Hospital lab, then food quality control</p>
                <p>GROW web development training</p>
                <p>Focus Farms, beekeeping (2021)</p>
              </>
            }
          >
            <p className="leading-relaxed">
              After university, I worked in a hospital laboratory and then in food quality control,
              and kept teaching myself to build software. Later, I joined GROW, a web development
              training programme run by Generation Ghana and MEST Africa and funded by the
              Mastercard Foundation.
            </p>
          </Row>
        </section>

        {/* 2. Work, newest first */}
        <section id="work" className="border-t border-ink pt-16">
          <SectionHead label="Work" title="What I've been building" />

          <Row
            id="pinn"
            meta={
              <>
                <When>2026</When>
                <p>Founder and developer</p>
                <p className="pt-2">
                  <a href={site.links.pinn} className={textLink}>
                    pinnghana.com
                  </a>
                </p>
              </>
            }
          >
            <h3 className="text-2xl font-semibold tracking-tight">PINN Ghana</h3>
            <p className="mt-3 leading-relaxed">
              What if we had a better way to collect and make sense of information about our roads in
              Ghana? PINN is my attempt to explore that question. Road users report potholes and
              other hazards with their location and photos. The reports appear on a map, and each
              one is tracked until the right authority deals with it.
            </p>
            <Shots shots={shots.pinn} layout="phones" />
          </Row>

          <Row
            id="elementa"
            meta={
              <>
                <When>2025 to present</When>
                <p>Founder and lead developer</p>
                <p className="pt-2">
                  <a href={site.links.elementa} className={textLink}>
                    elementalabsafrica.com
                  </a>
                </p>
              </>
            }
          >
            <h3 className="text-2xl font-semibold tracking-tight">Elementa Labs Africa</h3>
            <p className="mt-3 leading-relaxed">
              I still remember sneaking out of school in the evenings to attend chemistry practicals
              at another school because we had very little access to a laboratory at my own school.
              Years later, after teaching maths and science myself, I started building a virtual lab
              for students who face a similar problem.
            </p>
            <p className="mt-3 leading-relaxed">
              Elementa lets secondary school students carry out chemistry, physics and biology
              practicals that follow the West African WASSCE syllabus, with step-by-step guidance and
              automatic marking. Teachers can also assign practicals to their students.
            </p>
            <Shots shots={shots.elementa} layout="feature" />
            <p className="mt-8 leading-relaxed">
              In the early rollout, to {elementa.asOf}, {elementa.students} students and{" "}
              {elementa.teachers} teachers registered. These are the practicals they used most.
            </p>
            <SessionsChart />
          </Row>
        </section>

        {/* 3. Research */}
        <section id="research" className="border-t border-ink pt-16">
          <SectionHead label="Research" title="What I'm trying to understand" />

          <Row
            meta={
              <>
                <When>Ongoing</When>
                <p>Grew out of Elementa</p>
              </>
            }
          >
            <div className="space-y-4 leading-relaxed">
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
            </div>
            <p className="mt-6 text-2xl leading-snug text-burette">
              How would a teacher know which student needs what kind of help?
            </p>
          </Row>

          <SequenceTrace />

          <Row rule={false}>
            <div className="rounded-[3px] border border-rule bg-[#fbfcfc] p-5">
              <p className="text-sm font-medium uppercase tracking-[0.12em] text-muted">The research question</p>
              <p className="mt-2 leading-relaxed">
                Could the steps that led to a student&rsquo;s mistake, read alongside a separate test
                of the ideas behind the experiment, tell us what kind of difficulty they are having?
                And would seeing those steps laid out visually help a teacher decide what each
                student needs?
              </p>
            </div>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="font-semibold">What Elementa already records</dt>
                <dd className="mt-2 leading-relaxed">
                  Each student&rsquo;s mistakes and when they happen, their past attempts and their
                  skill scores. Since November 2026, it has also recorded every action at the bench in
                  order, and whether each checked step was right the first time. In titrations set by
                  a teacher, it compares the readings students write down with what the instrument
                  showed, so it can already tell a misread burette from a titration stopped at the
                  wrong point.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">What it cannot tell yet</dt>
                <dd className="mt-2 leading-relaxed">
                  Why a student stopped where they did. That needs a fuller study, with consent and a
                  separate test of the ideas behind the experiment. The study has been designed and
                  will not run until it has ethics approval.
                </dd>
              </div>
            </dl>
          </Row>
        </section>

        {/* 4. Contact */}
        <section id="contact" className="border-t border-ink pb-6 pt-16">
          <SectionHead label="Contact" title="Where I'm heading" />

          <Row meta={<When>Next</When>}>
            <div className="space-y-4 leading-relaxed">
              <p>
                Building Elementa has made me appreciate how much there is to learn beyond getting
                software to work. I now want to study questions like these more rigorously, through
                doctoral research.
              </p>
              <p>
                Most of my work so far has been in education. But I trained as a laboratory
                scientist, and I would love to work with scientists in other fields on how AI and
                interactive tools could help them.
              </p>
              <p>
                The things I think about most are human-computer interaction, artificial
                intelligence, interactive data visualization, learning analytics and computing for
                scientific discovery. I enjoy talking about ideas, especially with people who know
                things I do not. If you are working on something related, or are just curious, I
                would be happy to hear from you.
              </p>
            </div>
          </Row>

          <Row meta={<When>Get in touch</When>}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <a href={`mailto:${site.email}`} className="text-xl font-medium text-burette underline underline-offset-4 hover:no-underline">
                {site.email}
              </a>
              <CopyEmail
                email={site.email}
                className="rounded-[3px] border border-burette px-3 py-1 text-sm font-medium text-burette hover:bg-burette hover:text-white"
              />
            </div>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {site.links.github && (
                <a href={site.links.github} className={textLink}>
                  GitHub
                </a>
              )}
              {site.links.cv && (
                <a href={site.links.cv} className={textLink}>
                  CV (PDF)
                </a>
              )}
            </p>
          </Row>
        </section>
      </main>

      <footer className="mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap justify-between gap-2 border-t border-rule py-8 text-sm text-muted">
          <span>
            {site.name}, {site.location}
          </span>
          <span>Updated {site.updated}</span>
        </div>
      </footer>
    </>
  );
}
