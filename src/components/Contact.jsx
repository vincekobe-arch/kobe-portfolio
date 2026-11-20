import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import AnimatedTextCycle from './animated-text-cycle'

function useReveal(ref) {
  useEffect(() => {
    const ob = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in') }),
      { threshold: 0.12 }
    )
    ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up').forEach((el) => ob.observe(el))
    return () => ob.disconnect()
  }, [])
}

const SOCIALS = [
  {
    label: 'GitHub',
    handle: '@vincekobe-arch',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    href: 'https://github.com/vincekobe-arch',
    filter: 'invert(1)',
    color: '#ffffff',
  },
  {
    label: 'LinkedIn',
    handle: 'Vince Kobe',
    icon: null,
    liIcon: true,
    href: 'https://www.linkedin.com/in/vince-kobe-73a870415',
    color: '#0A66C2',
  },
  {
    label: 'Facebook',
    handle: 'vincekobe.11',
    icon: null,
    fbIcon: true,
    href: 'https://www.facebook.com/vincekobe.11',
    color: '#1877F2',
  },
  {
    label: 'Instagram',
    handle: '@vincinism',
    icon: null,
    igIcon: true,
    href: 'https://www.instagram.com/vincinism',
    color: '#E1306C',
    gradient: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
  },
  {
    label: 'Email',
    handle: 'cvincekobe@gmail.com',
    icon: null,
    emailIcon: true,
    href: 'mailto:cvincekobe@gmail.com',
    color: '#a0a0b0',
    copyOnClick: true,
  },
]

/* ── Floating 3D grid ── */
function FloatingGrid() {
  const canvasRef = useRef(null)
  const frameRef  = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = 420, H = 290
    canvas.width = W; canvas.height = H

    const cols = 10, rows = 6
    const points = []
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        points.push({
          x: (c / (cols - 1) - 0.5) * 2.1,
          y: (r / (rows - 1) - 0.5) * 1.3,
          phase: Math.random() * Math.PI * 2,
          amp: 0.07 + Math.random() * 0.1,
        })

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      t += 0.012
      const anim = points.map(p => ({ ...p, z: Math.sin(t + p.phase) * p.amp }))
      const proj = anim.map(p => {
        const fov = 3, sc = W * 0.36, pz = fov + p.z
        return [W / 2 + (p.x / pz) * sc, H / 2 + (p.y / pz) * sc, (p.z + 0.17) / 0.34]
      })
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c
          const [px, py, pd] = proj[i]
          if (c < cols - 1) {
            const [qx, qy] = proj[i + 1]
            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(qx, qy)
            ctx.strokeStyle = `rgba(255,255,255,${0.03 + pd * 0.06})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
          if (r < rows - 1) {
            const [qx, qy] = proj[i + cols]
            ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(qx, qy)
            ctx.strokeStyle = `rgba(255,255,255,${0.03 + pd * 0.06})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      }
      proj.forEach(([px, py, pd]) => {
        ctx.beginPath()
        ctx.arc(px, py, 1.1 + pd * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${0.1 + pd * 0.42})`
        ctx.fill()
      })
      frameRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return <canvas ref={canvasRef} style={{ width: 420, height: 290, display: 'block' }} />
}

/* ── Animated social icon bar ── */
function SocialBar({ onCopy, copied }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="social-bar" style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid var(--border)',
      borderRadius: 9999,
      backdropFilter: 'blur(12px)',
      width: 'fit-content',
    }}>
      {SOCIALS.map((s) => {
        const isHovered = hovered === s.label
        const isCopyEmail = s.copyOnClick

        const handleClick = (e) => {
          if (isCopyEmail) {
            e.preventDefault()
            onCopy()
          }
        }

        return (
          <motion.a
            key={s.label}
            href={isCopyEmail ? undefined : s.href}
            target={isCopyEmail ? undefined : '_blank'}
            rel="noreferrer"
            onClick={handleClick}
            onHoverStart={() => setHovered(s.label)}
            onHoverEnd={() => setHovered(null)}
            animate={{
              width: isHovered ? (isCopyEmail ? 180 : 160) : 48,
              background: isHovered
                ? (isCopyEmail ? (copied ? 'rgba(74,222,128,0.3)' : 'rgba(255,255,255,0.15)') : (s.label === 'GitHub' ? 'rgba(255,255,255,0.12)' : (s.gradient || s.color)))
                : 'rgba(255,255,255,0.06)',
            }}
            transition={{ duration: 0.45, ease: [0.175, 0.885, 0.32, 1.275] }}
            style={{
              height: 48,
              borderRadius: 9999,
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 10,
              overflow: 'hidden',
              textDecoration: 'none',
              cursor: 'pointer',
              flexShrink: 0,
              paddingLeft: isHovered ? 14 : 0,
              color: 'white',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {/* Icon */}
            <div style={{
              width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginLeft: isHovered ? 0 : 'auto',
              marginRight: isHovered ? 0 : 'auto',
            }}>
              {s.icon && <img src={s.icon} alt={s.label} style={{ width: 20, height: 20, objectFit: 'contain', filter: s.filter || 'none' }} />}
              {s.igIcon && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.8"/>
                  <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="1.8"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="white"/>
                </svg>
              )}
              {s.fbIcon && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              )}
              {s.liIcon && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              )}
              {s.emailIcon && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              )}
            </div>

            {/* Label */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.12 }}
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isCopyEmail ? (copied ? '✓ Copied!' : 'Copy Email') : s.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.a>
        )
      })}
    </div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  useReveal(ref)
  const [copied, setCopied] = useState(false)
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [sent, setSent]     = useState(false)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const gridY   = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const gridRot = useTransform(scrollYProgress, [0, 1], [-6, 6])

  const copyEmail = () => {
    navigator.clipboard.writeText('cvincekobe@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    const mailto = `mailto:cvincekobe@gmail.com?subject=Message from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
    window.open(mailto)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    padding: '0',
    borderRadius: 0,
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.83rem',
    color: 'var(--text)',
    outline: 'none',
  }

  return (
    <section id="contact" ref={ref} style={{ padding: '140px 0 80px', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>

      {/* Top rule */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--border2) 30%, var(--border2) 70%, transparent)' }} />

      {/* Ambient orb */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />

      {/* 3D floating grid — left */}
      <motion.div style={{ y: gridY, rotate: gridRot, position: 'absolute', top: '6%', left: '-55px', opacity: 0.48, pointerEvents: 'none' }}>
        <FloatingGrid />
      </motion.div>

      {/* 3D floating grid — right (mirrored) */}
      <motion.div style={{ y: gridY, rotate: gridRot, position: 'absolute', bottom: '8%', right: '-75px', opacity: 0.28, pointerEvents: 'none', scaleX: -1 }}>
        <FloatingGrid />
      </motion.div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>

        {/* Section tag */}
        <div className="reveal" style={{ marginBottom: 20 }}>
          <span className="section-tag">Contact</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 16 }}>
          <h2 className="reveal" style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: 'var(--white)',
            letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12,
          }}>
            Let's work{' '}
            <span style={{ background: 'linear-gradient(135deg, #ffffff 0%, #888898 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              together.
            </span>
          </h2>
          <p className="reveal" style={{ color: 'var(--text3)', fontSize: '0.9rem', transitionDelay: '0.05s', marginBottom: 28 }}>
            Open to Work Immersion / OJT opportunities &amp; collaborations.
          </p>

          {/* Social icon bar */}
          <div className="reveal" style={{ transitionDelay: '0.1s', marginBottom: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ fontSize: '0.6rem', color: 'var(--text3)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 14 }}>
              Find me on
            </p>
            <SocialBar onCopy={copyEmail} copied={copied} />
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border2) 30%, var(--border2) 70%, transparent)', margin: '40px 0 48px' }} />

        {/* Two column layout */}
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18, alignItems: 'start' }}>

  {/* LEFT — Advanced panel */}
  <div className="reveal-left" style={{ transitionDelay: '0.1s', display: 'flex', flexDirection: 'column', gap: 12 }}>

    {/* Animated text cycle hero card */}
<div style={{
  background: 'var(--bg3)', border: '1px solid var(--border)',
  borderRadius: 16, padding: '32px 28px', position: 'relative', overflow: 'hidden',
}}>
  {/* Corner accents */}
  <div style={{ position: 'absolute', top: 14, left: 14, width: 14, height: 14, borderTop: '1px solid var(--border2)', borderLeft: '1px solid var(--border2)' }} />
  <div style={{ position: 'absolute', top: 14, right: 14, width: 14, height: 14, borderTop: '1px solid var(--border2)', borderRight: '1px solid var(--border2)' }} />
  <div style={{ position: 'absolute', bottom: 14, left: 14, width: 14, height: 14, borderBottom: '1px solid var(--border2)', borderLeft: '1px solid var(--border2)' }} />
  <div style={{ position: 'absolute', bottom: 14, right: 14, width: 14, height: 14, borderBottom: '1px solid var(--border2)', borderRight: '1px solid var(--border2)' }} />

  {/* Ambient glow */}
  <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: 'radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

  {/* Available badge */}
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
    <div style={{ position: 'relative', width: 8, height: 8, flexShrink: 0 }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
      <div style={{ position: 'absolute', inset: -3, borderRadius: '50%', border: '1px solid rgba(74,222,128,0.32)', animation: 'pingContact 1.8s ease-out infinite' }} />
    </div>
    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', color: 'var(--text3)', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600 }}>
      Open to Opportunities
    </p>
  </div>

  {/* Animated headline */}
  <p style={{
    fontFamily: 'Syne, sans-serif', fontWeight: 300,
    fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
    color: 'var(--text3)', lineHeight: 1.35, letterSpacing: '-0.02em',
  }}>
    Your{' '}
    <AnimatedTextCycle
      words={['team', 'company', 'project', 'product', 'frontend', 'backend', 'UI/UX']}
      interval={2800}
      style={{ color: 'var(--white)' }}
    />{' '}
    deserves an intern who cares.
  </p>

  {/* Sub label */}
  <p style={{ fontSize: '0.78rem', color: 'var(--text3)', marginTop: 18, lineHeight: 1.7 }}>
    Full-stack dev &amp; UI/UX designer · San Pedro, Laguna · GMT+8
  </p>
</div>


{/* Bio / quote card */}
<div style={{
  background: 'var(--bg3)', border: '1px solid var(--border)',
  borderRadius: 12, padding: '18px 20px', position: 'relative',
}}>
  <div style={{ position: 'absolute', top: 0, left: 20, right: 20, height: 1, background: 'linear-gradient(90deg, transparent, var(--border2), transparent)' }} />
  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.58rem', color: 'var(--text3)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 12 }}>Philosophy</p>
  <p style={{ color: 'var(--text2)', fontStyle: 'italic', lineHeight: 1.8, fontSize: '0.85rem' }}>
    "I don't just write code — I craft experiences. Every pixel, every interaction, every line of logic is intentional."
  </p>
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.6rem', color: 'var(--text2)' }}>VK</div>
    <div>
      <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.72rem', color: 'var(--text)' }}>Vincent Kobe</p>
    </div>
  </div>
</div>

  </div>

  {/* RIGHT — Compose */}
          <motion.div className="reveal-right" style={{ transitionDelay: '0.15s', alignSelf: 'stretch' }}>
            <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>

              {/* Email client top bar */}
              <div style={{
  padding: '12px 18px', borderBottom: '1px solid var(--border)',
  background: 'var(--bg2)',
  display: 'flex', alignItems: 'center', gap: 8,
}}>
  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', color: 'var(--text3)', letterSpacing: '0.1em' }}>New Message</span>
</div>

              <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 0 }}>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', color: 'var(--text3)', fontWeight: 600, width: 52, flexShrink: 0 }}>To</span>
                  <span style={{ fontSize: '0.83rem', color: 'var(--text2)' }}>cvincekobe@gmail.com</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', color: 'var(--text3)', fontWeight: 600, width: 52, flexShrink: 0 }}>From</span>
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', color: 'var(--text3)', fontWeight: 600, width: 52, flexShrink: 0 }}>Name</span>
                  <input type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                </div>

                <textarea
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  style={{
                    width: '100%', marginTop: 16, resize: 'none', lineHeight: 1.75,
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 8, padding: '11px 14px',
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem',
                    color: 'var(--text)', outline: 'none', transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--border2)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                />

                <button onClick={handleSubmit} className="btn btn-primary" style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}>
                  {sent ? '✓ Opening Mail Client...' : 'Send Message ↗'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 72, paddingTop: 28,
          borderTop: '1px solid var(--border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem', color: 'var(--text3)', letterSpacing: '0.04em' }}>
            © 2026 Vincent Kobe Casantusan — Designed &amp; Built with ♡
          </p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.68rem', color: 'var(--text3)', letterSpacing: '0.04em' }}>
            React · Tailwind CSS · Framer Motion ·{' '}
            <a href="#references" style={{ color: 'var(--text2)', textDecoration: 'underline' }}>Sources &amp; Credits</a>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pingContact {
          0%   { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </section>
  )
}