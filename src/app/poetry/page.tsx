import type { Metadata } from 'next'
import SiteNav from '@/components/SiteNav'
import Reveal from '@/components/Reveal'
import PoetryTabs from './PoetryTabs'
import styles from './page.module.css'

export const metadata: Metadata = { title: 'The Writing — Ernest Obimpeh' }

export default function PoetryPage() {
  return (
    <main className={styles.main}>
      <SiteNav title="The Writing" bgColor="#F0EFF8" accentColor="#2D2B6B" inkColor="#1A1A2E" />

      <Reveal className={styles.hero}>
        <p className={styles.eyebrow}>Poetry &amp; Essays</p>
        <h1 className={styles.h1}>Words I couldn&apos;t<br />keep to myself.</h1>
        <p className={styles.sub}>Plain language. Real feeling. Influenced by Kwame Dawes, Ted Kooser, Richard Siken — but trying to sound like myself.</p>
      </Reveal>

      <PoetryTabs />

      <footer className={styles.footer}>
        <p>Ernest Obimpeh · The Writing</p>
        <a href="/">← Back to everything</a>
      </footer>
    </main>
  )
}
