'use client'
import { useState } from 'react'
import styles from './TeachClient.module.css'

const subjects = [
  { id: 'webdev', icon: '💻', title: 'Web Development', level: 'Beginner → Advanced', desc: 'HTML to full-stack. React, Next.js, databases, deployment.', topics: ['HTML & CSS','JavaScript','React','Next.js','TypeScript','Tailwind CSS','Git & GitHub','REST APIs','PostgreSQL','Deployment (Vercel)','Portfolio building'] },
  { id: 'maths', icon: '∑', title: 'Mathematics', level: 'BECE · WASSCE · University', desc: 'Algebra, calculus, statistics, pure maths. We go at your pace.', topics: ['Algebra','Trigonometry','Calculus','Statistics & Probability','Sets & Functions','Vectors','Pure Mathematics','WASSCE prep'] },
  { id: 'chemistry', icon: '⚗️', title: 'Chemistry', level: 'SHS · University · BSc', desc: 'From the periodic table to organic reactions. Theory and problems.', topics: ['Atomic Structure','Periodic Table','Chemical Bonding','Stoichiometry','Organic Chemistry','Thermodynamics','Electrochemistry','Laboratory Skills'] },
  { id: 'physics', icon: '⚡', title: 'Physics', level: 'SHS · University', desc: 'Mechanics, waves, electricity. The kind of physics that clicks.', topics: ['Mechanics','Waves & Optics','Electricity & Magnetism','Thermal Physics','Nuclear Physics','Problem Solving','WASSCE prep'] },
]

const steps = [
  { n: '1', title: 'Book a session', desc: 'Fill in the form below. Tell me what you need and where you\'re at.' },
  { n: '2', title: 'We agree on a plan', desc: 'I\'ll reach out to set a time and understand your goals better.' },
  { n: '3', title: 'We start learning', desc: 'Online via Google Meet or in-person in Accra. Your call.' },
  { n: '4', title: 'You keep going', desc: 'Notes, resources, and follow-up support between sessions.' },
]

export default function TeachClient() {
  const [selected, setSelected] = useState<string | null>(null)
  const [formSubject, setFormSubject] = useState('')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [level, setLevel] = useState('')
  const [format, setFormat] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubject = (id: string, title: string) => {
    if (selected === id) { setSelected(null); return }
    setSelected(id)
    setFormSubject(title)
  }

  const handleSubmit = () => {
    if (!name || !contact) { alert('Please add your name and contact info.'); return }
    setSubmitted(true)
  }

  return (
    <div>
      {/* SUBJECTS */}
      <div className={styles.subjectsWrap}>
        <p className={styles.sectionLabel}>What I teach</p>
        <h2 className={styles.sectionH}>Pick a subject.</h2>
        <p className={styles.sectionP}>Click a card to see what we&apos;d cover. Every session is built around where you are, not a fixed syllabus.</p>
        <div className={styles.grid}>
          {subjects.map(s => (
            <div key={s.id} className={`${styles.card} ${selected === s.id ? styles.cardSelected : ''}`} onClick={() => handleSubject(s.id, s.title)}>
              <span className={styles.icon}>{s.icon}</span>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardLevel}>{s.level}</p>
              <p className={styles.cardDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
        {selected && (
          <div className={styles.topicDetail}>
            <h4 className={styles.topicTitle}>{subjects.find(s => s.id === selected)?.title} — what we&apos;d cover</h4>
            <div className={styles.topicList}>
              {subjects.find(s => s.id === selected)?.topics.map(t => (
                <span key={t} className={styles.topicPill}>{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* HOW IT WORKS */}
      <div className={styles.howStrip}>
        <p className={styles.sectionLabelLight}>How it works</p>
        <h2 className={styles.sectionHLight}>Simple process.</h2>
        <div className={styles.steps}>
          {steps.map(s => (
            <div key={s.n} className={styles.step}>
              <span className={styles.stepNum}>{s.n}</span>
              <div>
                <h4 className={styles.stepTitle}>{s.title}</h4>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOOKING */}
      <div className={styles.bookingWrap}>
        <p className={styles.sectionLabel}>Book a Session</p>
        <h2 className={styles.sectionH}>Let&apos;s get started.</h2>
        <p className={styles.sectionP}>No pressure. Tell me what you need and we&apos;ll figure out the rest from there.</p>
        <div className={styles.form}>
          {!submitted ? (
            <>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Your name</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Kofi Mensah" />
                </div>
                <div className={styles.formGroup}>
                  <label>Email or WhatsApp</label>
                  <input value={contact} onChange={e => setContact(e.target.value)} placeholder="kofi@email.com or +233..." />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Subject</label>
                <select value={formSubject} onChange={e => setFormSubject(e.target.value)}>
                  <option value="">Choose a subject</option>
                  <option>Web Development</option><option>Mathematics</option>
                  <option>Chemistry</option><option>Physics</option><option>Not sure yet</option>
                </select>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Your level</label>
                  <select value={level} onChange={e => setLevel(e.target.value)}>
                    <option value="">Your current level</option>
                    <option>Complete beginner</option><option>JHS / BECE level</option>
                    <option>SHS / WASSCE level</option><option>University level</option>
                    <option>Professional / self-learning</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Preferred format</label>
                  <select value={format} onChange={e => setFormat(e.target.value)}>
                    <option value="">How you&apos;d like to meet</option>
                    <option>Online (Google Meet / Zoom)</option>
                    <option>In-person (Accra)</option>
                    <option>Either works for me</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Tell me what you need</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="What are you struggling with? What's your goal? Any exams coming up?" />
              </div>
              <button className={styles.submitBtn} onClick={handleSubmit}>Send booking request →</button>
            </>
          ) : (
            <div className={styles.success}>✓ Request sent. I&apos;ll get back to you within 24 hours.</div>
          )}
        </div>
      </div>
    </div>
  )
}
