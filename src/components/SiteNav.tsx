'use client'
import Link from 'next/link'
import styles from './SiteNav.module.css'

interface SiteNavProps {
  title: string
  bgColor: string
  accentColor: string
  inkColor: string
}

export default function SiteNav({ title, bgColor, accentColor, inkColor }: SiteNavProps) {
  return (
    <nav className={styles.nav} style={{ background: bgColor, borderBottomColor: `${accentColor}1a` }}>
      <Link href="/" className={styles.back} style={{ color: accentColor }}>
        ← Ernest Obimpeh
      </Link>
      <span className={styles.title} style={{ color: inkColor }}>{title}</span>
    </nav>
  )
}
