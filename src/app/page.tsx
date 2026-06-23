import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Ernest Obimpeh — Developer, Poet, Beekeeper, Teacher',
}

const worlds = [
  {
    href: '/poetry',
    icon: '🖊️',
    title: 'The Writer',
    desc: 'Poems, essays, and thoughts. Plain language, real feeling. Open to commissions and creative collaborations.',
    tag: 'Poetry & Essays',
    cardClass: styles.cardPoetry,
    tagClass: styles.tagPoetry,
  },
  {
    href: '/honey',
    icon: '🍯',
    title: 'The Beekeeper',
    desc: 'Pure Ghanaian honey. Grown in Accra, scaling slowly and intentionally. The product is real.',
    tag: 'focushoney.com',
    cardClass: styles.cardHoney,
    tagClass: styles.tagHoney,
  },
  {
    href: '/build',
    icon: '💻',
    title: 'The Builder',
    desc: 'Full-stack development, products I\'ve built, and client work I\'m proud of. Taking on partners and serious projects.',
    tag: 'Amdeli Web Solutions',
    cardClass: styles.cardBuild,
    tagClass: styles.tagBuild,
  },
  {
    href: '/teach',
    icon: '🎓',
    title: 'The Teacher',
    desc: 'I teach web dev, mathematics, chemistry, and physics. Building toward something bigger in education.',
    tag: 'Book a Session',
    cardClass: styles.cardTeach,
    tagClass: styles.tagTeach,
  },
  {
    href: '/t21',
    icon: '💬',
    title: 'Talk2Someone',
    desc: 'A mental wellness initiative still finding its shape — and the right people to shape it with.',
    tag: 'T21 Initiative',
    cardClass: styles.cardT21,
    tagClass: styles.tagT21,
  },
]

export default function Home() {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <span className={styles.navId}>Ernest Obimpeh</span>
        <span className={styles.navAccra}>Accra, Ghana</span>
      </nav>

      <Reveal className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>Developer · Poet · Beekeeper · Teacher · Builder</p>
          <h1 className={styles.h1}>
            Many things.<br /><em>One person.</em>
          </h1>
          <p className={styles.sub}>
            I write code and poems. I keep bees. I teach mathematics, chemistry, physics,
            and web development. I&apos;m building things that matter — and looking for the right people to build them with.
          </p>
          <p className={styles.prompt}>Who do you want to meet today?</p>
        </div>
        <div className={styles.heroImageWrap}>
          <Image
            src="/image-1.jpeg"
            alt="Ernest Obimpeh"
            fill
            className={styles.heroImage}
            priority
          />
        </div>
      </Reveal>

      <Reveal className={styles.worlds}>
        {worlds.map((w) => (
          <Link key={w.href} href={w.href} className={`${styles.card} ${w.cardClass}`}>
            <span className={styles.cardIcon}>{w.icon}</span>
            <h2 className={styles.cardTitle}>{w.title}</h2>
            <p className={styles.cardDesc}>{w.desc}</p>
            <span className={`${styles.cardTag} ${w.tagClass}`}>{w.tag}</span>
          </Link>
        ))}
      </Reveal>

      <Reveal className={styles.openDoor}>
        <p className={styles.openDoorText}>
          If something here resonates — the work, the honey, the mission, or the teaching —
          I&apos;d like to hear from you. I build with intention and with the right people in mind.
        </p>
        <a href="mailto:ernest@amdeli.com" className={styles.openDoorLink}>ernest@amdeli.com</a>
      </Reveal>

      <footer className={styles.footer}>
        <p>Ernest Obimpeh © 2026</p>
        <p className={styles.footerSub}>Open to collaboration, partnership, and good conversations.</p>
      </footer>
    </main>
  )
}
