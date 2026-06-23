import type { Metadata } from 'next'
import SiteNav from '@/components/SiteNav'
import Reveal from '@/components/Reveal'
import styles from './page.module.css'

export const metadata: Metadata = { title: 'Focus Honey — Ernest Obimpeh' }

export default function HoneyPage() {
  return (
    <main className={styles.main}>
      <SiteNav title="Focus Honey" bgColor="#FBF6E8" accentColor="#A67C00" inkColor="#2A1F00" />

      <Reveal className={styles.hero}>
        <p className={styles.eyebrow}>Accra, Ghana · Pure &amp; Local</p>
        <h1 className={styles.h1}>Focus Honey.<br /><em>Made with care.</em></h1>
        <p className={styles.sub}>
          I keep bees in Ghana and sell what they make. Small batch, raw, honest honey —
          grown slowly and intentionally. The full story lives at focushoney.com.
        </p>
        <a
          href="https://focushoney.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaLink}
        >
          Visit focushoney.com ↗
        </a>
      </Reveal>

      <footer className={styles.footer}>
        <p>Focus Honey · Accra, Ghana</p>
        <a href="/">← Back to everything</a>
      </footer>
    </main>
  )
}
