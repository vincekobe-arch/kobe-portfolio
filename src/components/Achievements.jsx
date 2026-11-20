import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function useReveal(ref) {
  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in') }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-scale').forEach((el) => ob.observe(el))
    return () => ob.disconnect()
  }, [])
}

/* ─────────────────────────────────────────────────────────────
   ✏️ EDIT — Certificates / awards / trainings.
   Images live directly in /public/. Add more items any time —
   the filter tabs update automatically from each item's `type`.
   ───────────────────────────────────────────────────────────── */
const ITEMS = [
  { type: 'Award',       title: 'Best in User Interface Award — PetUnity', issuer: 'STI College Alabang · "Cyber Security" event', date: 'December 14, 2025', image: '/certificate3.png' },
  { type: 'Certificate', title: 'Java Fundamentals — Award of Course Completion', issuer: 'Oracle Academy', date: 'June 19, 2024', image: '/certificate1.png' },
  { type: 'Seminar',     title: 'Cyber Security — Certificate of Participation', issuer: 'STI College Alabang', date: 'October 29, 2024', image: '/certificate2.png' },
]

const FILTERS = ['All', ...new Set(ITEMS.map(i => i.type))]

function CertImage({ item, height = '100%' }) {
  const [err, setErr] = useState(false)
  if (err) {
    return (
      <div style={{ width: '100%', height, minHeight: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(145deg, var(--bg3) 0%, var(--surface) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
        <span style={{ fontSize: '1.4rem', color: 'var(--text3)', position: 'relative' }}>◈</span>
        <span style={{ fontSize: '0.6rem', color: 'var(--text3)', letterSpacing: '0.1em', marginTop: 6, position: 'relative' }}>{item.image.split('/').pop()}</span>
      </div>
    )
  }
  return <img src={item.image} alt={item.title} onError={() => setErr(true)} style={{ width: '100%', height, objectFit: height === 'auto' ? 'contain' : 'cover', objectPosition: 'top', display: 'block' }} />
}

export default function Achievements() {
  const ref = useRef(null)
  useReveal(ref)
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const shown = filter === 'All' ? ITEMS : ITEMS.filter(i => i.type === filter)

  return (
    <section id="achievements" ref={ref} style={{ padding: '140px 0', position: 'relative', background: 'var(--bg)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--border2) 30%, var(--border2) 70%, transparent)' }} />
      <div style={{ position: 'absolute', top: '10%', right: '-6%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative' }}>
        <div className="reveal" style={{ marginBottom: 20 }}>
          <span className="section-tag">Academic Achievements</span>
        </div>

        <div style={{ marginBottom: 36 }}>
          <h2 className="reveal" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: 'var(--white)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12, transitionDelay: '0.05s' }}>
            Milestones{' '}
            <span style={{ background: 'linear-gradient(135deg, #ffffff 0%, #888898 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>earned.</span>
          </h2>
          <p className="reveal" style={{ color: 'var(--text3)', fontSize: '0.9rem', transitionDelay: '0.1s' }}>
            Certificates, awards, trainings, seminars &amp; academic recognitions.
          </p>
        </div>

        {/* Filter pills */}
        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28, transitionDelay: '0.12s' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f} style={{
              padding: '7px 14px', borderRadius: 9999, cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.74rem', fontWeight: 600,
              background: filter === f ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${filter === f ? 'var(--border2)' : 'var(--border)'}`,
              color: filter === f ? 'var(--white)' : 'var(--text3)', transition: 'all 0.25s',
            }}>{f}</button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
          <AnimatePresence mode="popLayout">
            {shown.map((item) => (
              <motion.button
                key={item.title + item.image}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                onClick={() => setOpen(item)}
                aria-label={`View ${item.title}`}
                style={{ textAlign: 'left', cursor: 'zoom-in', padding: 0, background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', color: 'inherit', font: 'inherit' }}
              >
                <div style={{ aspectRatio: '4/3', width: '100%', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}>
                  <CertImage item={item} />
                </div>
                <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <span className="pill" style={{ fontSize: '0.58rem', width: 'fit-content' }}>{item.type}</span>
                  <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.92rem', color: 'var(--white)' }}>{item.title}</p>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>{item.issuer} · {item.date}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog" aria-modal="true" aria-label={open.title}
            style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: 'min(820px, 100%)', background: 'var(--bg3)', border: '1px solid var(--border2)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.7)', position: 'relative' }}
            >
              <button onClick={() => setOpen(null)} aria-label="Close" style={{ position: 'absolute', top: 12, right: 12, zIndex: 2, width: 30, height: 30, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text2)', cursor: 'pointer' }}>✕</button>
              <div style={{ maxHeight: '70vh', overflow: 'auto', background: 'var(--surface)' }}>
                <CertImage item={open} height="auto" />
              </div>
              <div style={{ padding: '16px 20px' }}>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--white)' }}>{open.title}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text3)', marginTop: 4 }}>{open.type} · {open.issuer} · {open.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}