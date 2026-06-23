import type { Metadata } from 'next'
import SiteNav from '@/components/SiteNav'
import Reveal from '@/components/Reveal'
import TeachClient from './TeachClient'
import styles from './page.module.css'

export const metadata: Metadata = { title: 'The Teaching — Ernest Obimpeh' }

export default function TeachPage() {
  return (
    <main className={styles.main}>
      <SiteNav title="The Teaching" bgColor="#F7F0F2" accentColor="#6B2D3E" inkColor="#1F0A10" />

      <Reveal className={styles.hero}>
        <p className={styles.eyebrow}>Tutoring &amp; Instruction</p>
        <h1 className={styles.h1}>Understanding,<br /><em>not just answers.</em></h1>
        <p className={styles.sub}>I teach web development, mathematics, chemistry, and physics. One-on-one or small groups. Online or in Accra. The goal is always the same: that you actually get it.</p>
      </Reveal>

      <TeachClient />

      <footer className={styles.footer}>
        <p>Ernest Obimpeh · Teaching</p>
        <a href="/">← Back to everything</a>
      </footer>
    </main>
  )
}
