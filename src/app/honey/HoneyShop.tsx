'use client'
import styles from './HoneyShop.module.css'

const products = [
  { name: 'Classic Raw Honey', desc: "Pure, unfiltered. The bees' best work, untouched.", price: 'GHS 45 · 250g', bg: styles.pClassic, icon: '🍯' },
  { name: 'Dark Forest Honey', desc: 'Rich and deep. From hives near forest cover.', price: 'GHS 55 · 250g', bg: styles.pDark, icon: '🍂' },
  { name: 'Wildflower Honey', desc: 'Complex, seasonal. Tastes like wherever the bees went.', price: 'GHS 50 · 250g', bg: styles.pWild, icon: '🌿' },
  { name: 'Honeycomb', desc: 'Straight from the hive. The most honest form.', price: 'GHS 75 · 200g', bg: styles.pComb, icon: '🐝' },
]

export default function HoneyShop() {
  return (
    <div className={styles.wrap}>
      <p className={styles.sectionLabel}>The Shop</p>
      <h2 className={styles.sectionH}>What we make.</h2>
      <p className={styles.sectionP}>Every jar is traceable. You know what you&apos;re eating and where it came from. That matters to me.</p>
      <div className={styles.grid}>
        {products.map((p) => (
          <div key={p.name} className={styles.card}>
            <div className={`${styles.img} ${p.bg}`}>{p.icon}</div>
            <div className={styles.info}>
              <p className={styles.name}>{p.name}</p>
              <p className={styles.desc}>{p.desc}</p>
              <p className={styles.price}>{p.price}</p>
              <a href="https://focushoney.com" target="_blank" rel="noopener noreferrer" className={styles.btn}>
                Order on focushoney.com
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
