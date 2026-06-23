import type { Metadata } from 'next'
import SiteNav from '@/components/SiteNav'
import Reveal from '@/components/Reveal'
import T21Form from './T21Form'
import styles from './page.module.css'

export const metadata: Metadata = { title: 'Talk2Someone — T21' }

const pillars = [
  { icon: '🗣️', title: 'Awareness', desc: 'Normalizing conversations. Breaking the stigma that keeps people silent.' },
  { icon: '📚', title: 'Education', desc: 'Helping people recognize what they\'re feeling and understand they\'re not alone in it.' },
  { icon: '🤝', title: 'Community', desc: 'Building spaces — online and off — where honest conversations are welcome.' },
  { icon: '💬', title: 'Early Support', desc: 'Reaching people before struggles become crises. The earlier, the better.' },
]

const problems = [
  'Men raised to suppress emotion — "be strong," "don\'t show weakness" — until the weight becomes unbearable.',
  'Women facing intense social and psychological pressure that goes unacknowledged and unaddressed.',
  'Young people navigating anxiety, depression, and trauma with no language and no safe space to speak.',
  'Struggles that could have been caught early escalating into crises — depression, self-harm, or worse — because no one asked.',
]

export default function T21Page() {
  return (
    <main className={styles.main}>
      <SiteNav title="Talk2Someone · T21" bgColor="#EEF4F4" accentColor="#1E4A4A" inkColor="#0D2020" />

      <Reveal className={styles.hero}>
        <p className={styles.eyebrow}>T21 · Mental Wellness Initiative</p>
        <h1 className={styles.h1}>No one should<br />have to struggle<br />alone.</h1>
        <p className={styles.sub}>Talk2Someone exists to break the silence around mental health — for men, women, and young people who are carrying things they&apos;ve never said out loud.</p>
      </Reveal>

      <Reveal className={styles.anchorWrap}>
        <blockquote className={styles.quote}>
          &ldquo;Healing often begins<br />with one conversation.&rdquo;
          <cite className={styles.cite}>— Talk2Someone · T21</cite>
        </blockquote>
      </Reveal>

      <hr className={styles.divider} />

      <Reveal className={styles.contentWrap}>
        <p className={styles.sectionLabel}>The problem</p>
        <h2 className={styles.sectionH}>Too many people<br />are suffering in silence.</h2>
        <p className={styles.sectionP}>Mental health affects everyone. But most people — especially men, especially young people — never talk about it. Not because they don&apos;t feel it. Because they were never told it was okay to.</p>
        <div className={styles.problemBlock}>
          <h3 className={styles.problemTitle}>What we see happening:</h3>
          <div className={styles.problemList}>
            {problems.map((p, i) => (
              <div key={i} className={styles.problemItem}>
                <div className={styles.problemDot} />
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <hr className={styles.divider} />

      <Reveal className={styles.contentWrap}>
        <p className={styles.sectionLabel}>What we do</p>
        <h2 className={styles.sectionH}>How T21<br />is responding.</h2>
        <p className={styles.sectionP}>We&apos;re building this intentionally — with awareness, community, and digital tools that make it easier to reach out before things get worse.</p>
        <div className={styles.pillars}>
          {pillars.map(p => (
            <div key={p.title} className={styles.pillar}>
              <span className={styles.pillarIcon}>{p.icon}</span>
              <h4 className={styles.pillarTitle}>{p.title}</h4>
              <p className={styles.pillarDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <T21Form />

      <Reveal className={styles.footerNote}>
        <p>T21 is being built with intention. The need is real, the work has started, and the right partners — whether in mental health, technology, or community — can help us go much further. If that&apos;s you, the door is open.</p>
        <a href="mailto:ernest@amdeli.com" className={styles.footerNoteLink}>ernest@amdeli.com</a>
      </Reveal>

      <footer className={styles.footer}>
        <p>Talk2Someone · T21 · Built by Ernest Obimpeh</p>
        <a href="/">← Back to everything</a>
      </footer>
    </main>
  )
}
