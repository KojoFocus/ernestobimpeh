'use client'
import { useState } from 'react'
import styles from './PoetryTabs.module.css'

const poems = [
  {
    meta: 'Grief · 2024',
    title: 'No Heart Can Contain Me',
    body: `I am made of the things
no heart can contain —
the names of the dead,
and the way morning
keeps arriving
as if nothing happened.

I carry them the way rivers carry silt:
quietly, heavily,
depositing them in strangers
who wonder why they feel sad
when I pass.`,
    note: 'Written during a season of loss. The title came first — it felt like a fact before it felt like a line.',
  },
  {
    meta: 'Identity · Ghana · 2024',
    title: 'KOKONTE',
    body: `My grandmother made kokonte
like she was solving something —
hands moving in the dark steam,
certain.

I watched her the way you watch
a language you are losing:
taking notes
in a body
that keeps forgetting.

Now I eat it from a styrofoam bowl
and call it heritage.`,
    note: 'About memory, inheritance, and the small betrayals of convenience.',
  },
  {
    meta: 'Friendship · 2025',
    title: "What We Don't Say",
    body: `We talk about everything
except the thing.

You pour the water.
I move the chairs.
We laugh at something old.

Outside the window,
Accra does what Accra does —
loud and unbothered —
and we sit in the quiet
we've been keeping for years.`,
    note: '',
  },
]

const essays = [
  { date: '2025', title: 'On switching careers in your twenties', excerpt: 'I used to wear a lab coat. Now I write TypeScript. Neither version of me feels fake — which is either a good sign or a warning.' },
  { date: '2025', title: 'The friendship essay', excerpt: 'About a person I\'ve known long enough to stop performing around. Still working on it. It keeps becoming about something else.' },
  { date: '2024', title: 'What the bees taught me about patience', excerpt: 'You can\'t rush a hive. You can only show up, stay still, and pay attention. I didn\'t expect beekeeping to be a philosophy lesson.' },
  { date: '2024', title: 'Building Folio: what I learned making my first real product', excerpt: 'The code was the easy part. Deciding what the thing should actually do — that took much longer than it should have.' },
]

type Tab = 'poems' | 'essays' | 'about'

export default function PoetryTabs() {
  const [active, setActive] = useState<Tab>('poems')

  return (
    <div>
      <div className={styles.tabs}>
        {(['poems', 'essays', 'about'] as Tab[]).map((t) => (
          <button key={t} className={`${styles.tab} ${active === t ? styles.tabActive : ''}`} onClick={() => setActive(t)}>
            {t === 'about' ? 'About the writing' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {active === 'poems' && (
        <div className={styles.content}>
          <div className={styles.poemList}>
            {poems.map((p) => (
              <div key={p.title} className={styles.poemCard}>
                <p className={styles.poemMeta}>{p.meta}</p>
                <h3 className={styles.poemTitle}>{p.title}</h3>
                <pre className={styles.poemBody}>{p.body}</pre>
                {p.note && <p className={styles.poemNote}>{p.note}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {active === 'essays' && (
        <div className={styles.content}>
          <div className={styles.essayList}>
            {essays.map((e) => (
              <div key={e.title} className={styles.essayCard}>
                <p className={styles.essayDate}>{e.date}</p>
                <h3 className={styles.essayTitle}>{e.title}</h3>
                <p className={styles.essayExcerpt}>{e.excerpt}</p>
                <a href="#" className={styles.essayLink}>Read essay →</a>
              </div>
            ))}
          </div>
        </div>
      )}

      {active === 'about' && (
        <div className={styles.content}>
          <div className={styles.aboutBlock}>
            <p>I came to poetry sideways. I was a lab scientist who needed somewhere to put things — grief, observations, the small strangeness of ordinary days. Writing was that place.</p>
            <p>I try to write the way I talk: plain, direct, nothing wasted. I distrust poems that make difficulty sound decorative. A line should earn its difficulty.</p>
            <p>The writers I return to most are Kwame Dawes for his groundedness, Ted Kooser for his economy, and Richard Siken for what he does with urgency. I&apos;m trying to learn from all three without sounding like any of them.</p>
            <div className={styles.influences}>
              {['Kwame Dawes','Ted Kooser','Richard Siken','Accra','Grief','Memory','Ordinary life'].map(i => (
                <span key={i} className={styles.infTag}>{i}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
