import Disclosure from "@/components/Disclosure";
import SequenceTrace from "@/components/SequenceTrace";
import SessionsChart from "@/components/SessionsChart";
import { site } from "@/lib/site";

const nav = [
  { href: "#research", label: "Research" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

function Row({ meta, children }: { meta: React.ReactNode; children: React.ReactNode }) {
  return (
    <article className="grid gap-3 border-t border-rule py-10 md:grid-cols-[220px_1fr] md:gap-10">
      <div className="text-sm text-muted">{meta}</div>
      <div className="max-w-[62ch]">{children}</div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-paper focus:p-2">
        Skip to content
      </a>

      <header className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <a href="#" className="font-semibold tracking-tight">
          {site.name}
        </a>
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
        {/* Hero */}
        <section className="pb-20 pt-12 md:pt-20">
          <p className="text-muted">
            <span className="font-medium text-ink">{site.role}</span>, {site.location}
          </p>
          <h1 className="mt-3 max-w-[16ch] text-[clamp(2.6rem,7vw,5.2rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Same mistake.
            <br />
            Same problem?
          </h1>
          <p className="mt-6 max-w-[54ch] text-xl leading-relaxed text-ink/85">
            I studied laboratory science. Somewhere along the way, I fell in love with computing.
            These days, I am interested in how computers can help us learn, do science and make
            sense of information.
          </p>
          <div className="mt-12">
            <SequenceTrace />
          </div>
        </section>

        {/* Research */}
        <section id="research" className="scroll-mt-8 border-t border-ink py-16">
          <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em]">
            A question I keep coming back to
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1fr]">
            <p className="text-2xl leading-snug text-burette">
              Could visualizing the sequence of actions leading to an experimental error, alongside
              independent assessments of conceptual understanding, help us distinguish between
              different learning difficulties?
            </p>
            <div className="space-y-4 leading-relaxed">
              <p>
                Imagine two students getting the same reading wrong in a titration. One understands
                the chemistry but struggles with the burette. The other can operate the burette but
                does not understand the chemistry. Both may lose the same mark. How do we know which
                student needs what kind of help?
              </p>
              <p>
                Elementa already records timestamped procedural errors, attempt histories and skill
                scores, and compares students&rsquo; recorded titration readings against actual
                instrument values in assigned practicals. I have also developed, but not yet
                deployed, an extension that captures more detailed sequences of student
                interactions.
              </p>
              <p className="text-muted">
                Education is where much of my current work lies, but it is not where my curiosity
                ends. I would love to work with scientists in different fields and investigate how
                AI and interactive tools could help them do their work better.
              </p>
            </div>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="scroll-mt-8 border-t border-ink pt-16">
          <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em]">
            From ideas to actual projects
          </h2>

          <div className="mt-8">
            <Row
              meta={
                <>
                  <p className="font-medium text-ink">2025 to present</p>
                  <p>Founder and lead developer</p>
                </>
              }
            >
              <h3 className="text-2xl font-semibold tracking-tight">Elementa Labs Africa</h3>
              <p className="mt-3 leading-relaxed">
                I still remember sneaking out of school in the evenings to attend chemistry
                practicals at another school because we had very little access to a laboratory at
                my own school. Years later, I started building a virtual lab for students who face a
                similar problem.
              </p>
              <dl className="mt-6 flex gap-10">
                <div>
                  <dt className="text-sm text-muted">Students</dt>
                  <dd className="tabular text-3xl font-semibold">81</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Teachers</dt>
                  <dd className="tabular text-3xl font-semibold">15</dd>
                </div>
              </dl>
              <SessionsChart />
              <p className="mt-6">
                <a href={site.links.elementa} className="font-medium text-burette underline underline-offset-4 hover:no-underline">
                  Visit elementalabsafrica.com
                </a>
              </p>
            </Row>

            <Row
              meta={
                <>
                  <p className="font-medium text-ink">2026</p>
                  <p>Founder and developer</p>
                </>
              }
            >
              <h3 className="text-2xl font-semibold tracking-tight">PINN Ghana</h3>
              <p className="mt-3 leading-relaxed">
                What if we had a better way to collect and make sense of information about our roads
                in Ghana? PINN is my attempt to explore that question.
              </p>
              <p className="mt-6">
                <a href={site.links.pinn} className="font-medium text-burette underline underline-offset-4 hover:no-underline">
                  Visit pinnghana.com
                </a>
              </p>
            </Row>

            <Row
              meta={
                <>
                  <p className="font-medium text-ink">2018</p>
                  <p>Undergraduate dissertation</p>
                </>
              }
            >
              <h3 className="text-2xl font-semibold tracking-tight">Pesticide residues in dried chilli pepper</h3>
              <p className="mt-3 leading-relaxed">
                For my final-year project, I travelled to Brewaniase, Kwadaso, Sunyani and Winneba to
                collect dried chilli pepper from farmers. I wanted to find out whether the peppers
                contained pesticide residues. The Ghana Standards Authority provided technical
                assistance.
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
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-8 border-t border-ink py-16">
          <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em]">
            How I got here
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-[220px_1fr] md:gap-10">
            <div className="text-sm text-muted md:pt-1">
              <p className="font-medium text-ink">University of Cape Coast</p>
              <p>BSc Laboratory Technology</p>
              <p>2014 to 2018</p>
            </div>
            <div className="max-w-[62ch] space-y-4 leading-relaxed">
              <p>
                Around 2016, while studying laboratory technology, I became interested in writing
                software. I did not even have a laptop at the time, but I had plenty of ideas. One
                was a way to identify plants from a photograph; another was a way to find misplaced
                keys. I later discovered that people were already working on such things. That made
                me even more curious about computing.
              </p>
              <p>
                Building Elementa has made me appreciate how much there is to learn beyond getting
                software to work. I now want to study these questions more rigorously through
                doctoral research.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-8 border-t border-ink py-16">
          <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em]">
            Let&rsquo;s talk science and technology
          </h2>
          <p className="mt-6 max-w-[40ch] text-2xl leading-snug text-burette">
            I am looking for PhD opportunities in{" "}
            <span className="whitespace-nowrap">human-computer</span> interaction and learning
            analytics.
          </p>
          <p className="mt-4 max-w-[54ch] leading-relaxed">
            I also enjoy talking about ideas, especially with people who know things I do not. If
            you are working on something related to my interests, I would be happy to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="rounded-[3px] bg-burette px-5 py-2.5 font-medium text-white hover:bg-ink"
            >
              Email me
            </a>
            {site.links.cv && (
              <a href={site.links.cv} className="rounded-[3px] border border-burette px-5 py-2.5 font-medium text-burette hover:bg-burette hover:text-white">
                CV (PDF)
              </a>
            )}
            {site.links.github && (
              <a href={site.links.github} className="rounded-[3px] border border-burette px-5 py-2.5 font-medium text-burette hover:bg-burette hover:text-white">
                GitHub
              </a>
            )}
          </div>
          <p className="mt-4 text-sm text-muted">
            Or write to <span className="select-all font-medium text-ink">{site.email}</span>
          </p>
        </section>
      </main>

      <footer className="mx-auto max-w-5xl border-t border-rule px-6 py-8 text-sm text-muted">
        {site.name}, {site.location}. Illustrations are schematic.
      </footer>
    </>
  );
}
