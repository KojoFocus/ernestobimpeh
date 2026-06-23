'use client'
import { useState } from 'react'
import styles from './T21Form.module.css'

const topics = ['Stress','Anxiety','Depression','Grief or loss','Relationships','Work pressure','Just need to talk','Not sure']

export default function T21Form() {
  const [selected, setSelected] = useState<string[]>([])
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const toggle = (t: string) => setSelected(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])

  const handleSubmit = () => {
    if (!message.trim()) { alert('Please write something — even a few words. We want to hear from you.'); return }
    setSubmitted(true)
  }

  return (
    <div className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.sectionLabel}>Reach out</p>
        <h2 className={styles.sectionH}>Something on your mind?</h2>
        <p className={styles.sectionP}>You don&apos;t need to have the right words. You don&apos;t need to have it figured out. Just start somewhere. This goes directly to a real person.</p>
        {!submitted ? (
          <div className={styles.form}>
            <p className={styles.optLabel}>What&apos;s this about?</p>
            <div className={styles.opts}>
              {topics.map(t => (
                <button key={t} className={`${styles.opt} ${selected.includes(t) ? styles.optSelected : ''}`} onClick={() => toggle(t)}>{t}</button>
              ))}
            </div>
            <div className={styles.formGroup}>
              <label>Your name (or stay anonymous)</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="You can use a first name or nothing at all" />
            </div>
            <div className={styles.formGroup}>
              <label>How to reach you (optional)</label>
              <input value={contact} onChange={e => setContact(e.target.value)} placeholder="Email, WhatsApp, or leave blank" />
            </div>
            <div className={styles.formGroup}>
              <label>What&apos;s going on?</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Write whatever feels true. No judgement here." />
            </div>
            <p className={styles.note}>This is read by a real person — Ernest or a T21 team member. We won&apos;t share what you write. We&apos;ll respond with care.</p>
            <button className={styles.submitBtn} onClick={handleSubmit}>Send your message →</button>
          </div>
        ) : (
          <div className={styles.success}>
            We&apos;ve received your message. You did something brave by reaching out. We&apos;ll get back to you soon — and if you need to talk sooner, you can also reach us at <strong>info@talk2someone.com</strong>. You&apos;re not alone.
          </div>
        )}
      </div>
    </div>
  )
}
