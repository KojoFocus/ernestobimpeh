import CopyEmail from "@/components/CopyEmail";
import Disclosure from "@/components/Disclosure";
import ElementaShots from "@/components/ElementaShots";
import PathLine from "@/components/PathLine";
import SequenceTrace from "@/components/SequenceTrace";
import SessionsChart from "@/components/SessionsChart";
import { elementa, site } from "@/lib/site";

// The page is one story told in order. Each heading picks up from the one before it:
// how it started, what I've built, the question it raised, where I'm heading.
const nav = [
  { href: "#start", label: "Background" },
  { href: "#work", label: "Work" },
  { href: "#research", label: "Research" },
  { href: "#contact", label: "Contact" },
];

const h2 = "text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em]";
const textLink = "font-medium text-burette underline underline-offset-4 hover:no-underline";
const button =
  "rounded-[3px] border border-burette px-5 py-2.5 font-medium text-burette hover:bg-burette hover:text-white";

function Row({ meta, children }: { meta: React.ReactNode; children: React.ReactNode }) {
  return (
    <article className="grid gap-3 border-t border-rule py-10 md:grid-cols-[220px_1fr] md:gap-10">
      <div className="text-sm text-muted">{meta}</div>
      <div className="max-w-[62ch]">{children}</div>
    </article>
  );
}

function Meta({ when, children }: { when: string; children: React.ReactNode }) {
  return (
    <>
      <p className="font-medium text-ink">{when}</p>
      {children}
    </>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-paper focus:p-2">
        Skip to content
      </a>

      {/* The name is the page's headline, so the header carries only the section links. */}
      <header className="mx-auto flex max-w-5xl justify-end px-6 py-6">
        <nav aria-label="Main">
          <ul className="flex gap-5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-muted hover:text-ink">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main" className="mx-auto max-w-5xl px-6">
        {/* Who I am */}
        <section className="pb-16 pt-10 md:pb-20 md:pt-16">
          <h1 className="text-[clamp(2.4rem,10vw,6rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            {site.name}
          </h1>
          <p className="mt-4 text-lg text-muted">
            Laboratory scientist and software developer, {site.location}
          </p>
          <p className="mt-6 max-w-[56ch] text-xl leading-relaxed text-ink/85">
            I discovered my interest in computing while studying laboratory science. At the time, I
            was more interested in what I could build than in becoming a software developer. That
            hasn&rsquo;t changed much. These days, I am interested in how computers can help us
            learn, do science and make sense of information.
          </p>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <a href={`mailto:${site.email}`} className={textLink}>
              Email
            </a>
            {site.links.cv && (
              <a href={site.links.cv} className={textLink}>
                CV
              </a>
            )}
            {site.links.github && (
              <a href={site.links.github} className={textLink}>
                GitHub
              </a>
            )}
          </p>
          <div className="mt-12 lg:mt-14">
            <PathLine />
          </div>
        </section>

        {/* 1. How it started */}
        <section id="start" className="scroll-mt-8 border-t border-ink pt-16">
          <h2 className={h2}>How it started</h2>
          <div className="mt-8">
            <Row
              meta={
                <Meta when="2014 to 2018">
                  <p>BSc Laboratory Technology, University of Cape Coast</p>
                </Meta>
              }
            >
              <p className="leading-relaxed">
                Around 2016, while studying laboratory technology, I became interested in writing
                software. I did not even have a laptop at the time, but I had plenty of ideas. One
                was a way to identify plants from a photograph; another was a way to find misplaced
                keys. I later discovered that people were already working on such things. That made
                me even more curious about computing.
              </p>
            </Row>

            <Row
              meta={
                <Meta when="2018">
                  <p>Undergraduate dissertation</p>
                </Meta>
              }
            >
              <h3 className="text-2xl font-semibold tracking-tight">Pesticide residues in dried chilli pepper</h3>
              <p className="mt-3 leading-relaxed">
                My first research was in a chemistry lab. For my final-year project, I travelled to
                Brewaniase, Kwadaso, Sunyani and Winneba to collect dried chilli pepper from farmers.
                I wanted to find out whether the peppers contained pesticide residues. The Ghana
                Standards Authority provided technical assistance.
              </p>
              <dl className="mt-6 flex gap-10">
                {[
                  ["Samples", "120"],
                  ["Pesticides", "36"],
                  ["Regions", "4"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-sm text-muted">{k}</dt>
                    <dd className="tabular text-3xl font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
              <Disclosure label="Research details">
                <p>
                  Samples were screened using gas chromatography with electron capture detection
                  (GC-ECD). No residues of the investigated pesticides were detected in the analyzed
                  samples. Supervisor: {site.supervisor}, University of Cape Coast.
                </p>
              </Disclosure>
            </Row>

            <Row
              meta={
                <Meta when="After university">
                  <p>Hospital and food testing labs</p>
                  <p>GROW web development training</p>
                </Meta>
              }
            >
              <p className="leading-relaxed">
                After university, I worked in a hospital laboratory and then in food quality control.
                Along the way, I kept teaching myself to build software, and I later benefited from a
                web development training programme run by Generation Ghana and MEST Africa, with
                funding from the Mastercard Foundation.
              </p>
            </Row>
          </div>
        </section>

        {/* 2. What I've built */}
        <section id="work" className="scroll-mt-8 border-t border-ink pt-16">
          <h2 className={h2}>What I&rsquo;ve built</h2>
          <div className="mt-8">
            <Row
              meta={
                <Meta when="2025 to present">
                  <p>Founder and lead developer</p>
                </Meta>
              }
            >
              <h3 className="text-2xl font-semibold tracking-tight">Elementa Labs Africa</h3>
              <p className="mt-3 leading-relaxed">
                I still remember sneaking out of school in the evenings to attend chemistry
                practicals at another school because we had very little access to a laboratory at
                my own school. Years later, I started building a virtual lab for students who face a
                similar problem.
              </p>
              <p className="mt-3 leading-relaxed">
                Elementa is a virtual science laboratory where secondary school students carry out
                chemistry, physics and biology practicals, with the procedures, instruments and
                decisions of a real lab.
              </p>
              <ElementaShots />
              <p className="mt-8 text-sm text-muted">Early rollout, as of {elementa.asOf}</p>
              <dl className="mt-3 flex gap-10">
                <div>
                  <dt className="text-sm text-muted">Students</dt>
                  <dd className="tabular text-3xl font-semibold">{elementa.students}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Teachers</dt>
                  <dd className="tabular text-3xl font-semibold">{elementa.teachers}</dd>
                </div>
              </dl>
              <SessionsChart />
              <p className="mt-6">
                <a href={site.links.elementa} className={textLink}>
                  Visit elementalabsafrica.com
                </a>
              </p>
            </Row>

            <Row
              meta={
                <Meta when="2026">
                  <p>Founder and developer</p>
                </Meta>
              }
            >
              <h3 className="text-2xl font-semibold tracking-tight">PINN Ghana</h3>
              <p className="mt-3 leading-relaxed">
                What if we had a better way to collect and make sense of information about our roads
                in Ghana? PINN is my attempt to explore that question. Road users report potholes and
                other hazards with their location and photos, the reports appear on a map, and each
                one is tracked until the right authority deals with it.
              </p>
              <p className="mt-6">
                <a href={site.links.pinn} className={textLink}>
                  Visit pinnghana.com
                </a>
              </p>
            </Row>
          </div>
        </section>

        {/* 3. The question it raised */}
        <section id="research" className="scroll-mt-8 border-t border-ink py-16">
          <h2 className={h2}>The question it raised</h2>
          <div className="mt-8 max-w-[62ch] space-y-4 leading-relaxed">
            <p>
              While building Elementa, I became interested in whether the actions students take
              during a practical could reveal more about their understanding than their final
              answers alone.
            </p>
            <p>
              Imagine two students getting the same reading wrong in a titration. One understands
              the chemistry but struggles with the burette. The other can operate the burette but
              does not understand the chemistry. Both may lose the same mark. How do we know which
              student needs what kind of help?
            </p>
          </div>

          <div className="mt-10">
            <SequenceTrace />
          </div>

          <div className="mt-10 max-w-[62ch] space-y-4 leading-relaxed">
            <p className="text-2xl leading-snug text-burette">
              Could the sequence of actions leading to an experimental error, read alongside an
              independent assessment of conceptual understanding, help us distinguish between
              different learning difficulties? And would visualizing that sequence help a teacher
              choose the right kind of help?
            </p>
            <p>
              Elementa already records timestamped procedural errors, attempt histories and skill
              scores, and compares students&rsquo; recorded titration readings against actual
              instrument values in assigned practicals. Since November 2026 it also records each
              student&rsquo;s actions at the bench in order, and whether each judged step was right
              the first time.
            </p>
            <p>
              The titration bench can already tell a misread burette from a titration stopped at
              the wrong point. What it cannot yet tell is why a student stopped where they did. A
              fuller research version, with consent and a separate concept test, is designed and
              will not run until it has ethics approval.
            </p>
          </div>
        </section>

        {/* 4. Where I'm heading */}
        <section id="contact" className="scroll-mt-8 border-t border-ink py-16">
          <h2 className={h2}>Where I&rsquo;m heading</h2>
          <div className="mt-8 max-w-[62ch] space-y-4 leading-relaxed">
            <p>
              Building Elementa has made me appreciate how much there is to learn beyond getting
              software to work. I now want to study these questions more rigorously through
              doctoral research.
            </p>
            <p>
              Education is where much of my current work lies, but it is not where my curiosity
              ends. I would love to work with scientists in different fields and investigate how AI
              and interactive tools could help them do their work better.
            </p>
          </div>
          <p className="mt-8 max-w-[44ch] text-2xl leading-snug text-burette">
            <span className="whitespace-nowrap">Human-computer</span> interaction, artificial
            intelligence, interactive data visualization, learning analytics and computing for
            scientific discovery.
          </p>
          <p className="mt-4 max-w-[54ch] leading-relaxed">
            These are the things I think about most. I enjoy talking about them, especially with
            people who know things I do not. If you are working on something related, I would be
            happy to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="rounded-[3px] bg-burette px-5 py-2.5 font-medium text-white hover:bg-ink"
            >
              Email me
            </a>
            <CopyEmail email={site.email} className={button} />
            {site.links.cv && (
              <a href={site.links.cv} className={button}>
                CV (PDF)
              </a>
            )}
            {site.links.github && (
              <a href={site.links.github} className={button}>
                GitHub
              </a>
            )}
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-5xl border-t border-rule px-6 py-8 text-sm text-muted">
        {site.name}, {site.location}. Illustrations are schematic.
      </footer>
    </>
  );
}
