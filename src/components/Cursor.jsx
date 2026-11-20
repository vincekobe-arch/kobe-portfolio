<<<<<<< HEAD
import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ROLES = ['Full-Stack Developer', 'UI/UX Designer', 'Creative Problem Solver']

function Typewriter() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [chars, setChars] = useState('')
  const [deleting, setDeleting] = useState(false)
  const timeout = useRef(null)

  useEffect(() => {
    const role = ROLES[roleIdx]
    if (!deleting && chars === role) {
      timeout.current = setTimeout(() => setDeleting(true), 2400)
    } else if (deleting && chars === '') {
      setDeleting(false)
      setRoleIdx((i) => (i + 1) % ROLES.length)
    } else {
      timeout.current = setTimeout(() => {
        setChars(deleting ? chars.slice(0, -1) : role.slice(0, chars.length + 1))
      }, deleting ? 30 : 68)
    }
    return () => clearTimeout(timeout.current)
  }, [chars, deleting, roleIdx])

  return (
    <span style={{ color: 'var(--text2)', fontWeight: 400 }}>
      {chars}
      <span style={{ borderRight: '1.5px solid var(--text3)', marginLeft: 1, animation: 'blink 1s step-end infinite' }} />
    </span>
  )
}

/* Falling star */
function Star({ style, size = 1.5, delay = 0 }) {
  return (
    <div style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.7)',
      boxShadow: `0 0 ${size * 2}px rgba(255,255,255,0.4)`,
      animation: `fall ${6 + Math.random() * 8}s linear ${delay}s infinite`,
      ...style,
    }} />
  )
}

/* Static twinkle dot */
function TwinkleDot({ style }) {
  return (
    <div style={{
      position: 'absolute',
      width: 1.5,
      height: 1.5,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.5)',
      animation: `twinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
      ...style,
    }} />
  )
}

const STARS = [
  { top: '8%',  left: '15%',  size: 1.5, delay: 0   },
  { top: '5%',  left: '62%',  size: 1,   delay: 2.5 },
  { top: '12%', left: '80%',  size: 2,   delay: 1   },
  { top: '20%', left: '40%',  size: 1,   delay: 4   },
  { top: '3%',  left: '30%',  size: 1.5, delay: 6   },
  { top: '15%', right: '10%', size: 1,   delay: 3   },
]

const TWINKLES = [
  { top: '30%', left:  '8%'  }, { top: '18%', left: '55%' },
  { top: '45%', right: '6%'  }, { top: '22%', right: '28%' },
  { top: '10%', left:  '90%' }, { top: '38%', left: '72%' },
  { top: '7%',  left:  '44%' }, { top: '28%', left: '20%' },
]

/* Animated "live wallpaper" badge — shifting gradient orb */
function LiveBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="float hidden md:block"
      style={{ position: 'absolute', right: 28, top: '42%', transform: 'translateY(-50%)' }}
    >
      <div style={{
        position: 'relative', width: 160, height: 160,
        borderRadius: '50%', overflow: 'hidden',
        border: '1px solid var(--border2)',
        boxShadow: '0 0 40px rgba(255,255,255,0.06), 0 0 80px rgba(255,255,255,0.03)',
      }}>
        {/* Shifting gradient layers */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', inset: -20,
            background: 'conic-gradient(from 0deg, rgba(255,255,255,0.08), rgba(180,180,200,0.14), rgba(100,100,120,0.06), rgba(255,255,255,0.1), rgba(180,180,200,0.08))',
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', inset: -20,
            background: 'conic-gradient(from 180deg, rgba(255,255,255,0.04), rgba(200,200,220,0.1), transparent, rgba(255,255,255,0.06))',
          }}
        />
        {/* Pulse orb center */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: '25%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
          }}
        />
        {/* Glass overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backdropFilter: 'blur(2px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 4,
        }}>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }}
          />
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Available</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--bg)' }}>

      {/* Ambient smoke — NO grid */}
      <div style={{
        position: 'absolute', top: '-15%', right: '-8%', width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 62%)',
        borderRadius: '50%', pointerEvents: 'none',
        transform: `translateY(${scrollY * 0.15}px)`,
      }} />
      <div style={{
        position: 'absolute', bottom: '0', left: '-5%', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 62%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Falling stars */}
      {STARS.map((s, i) => (
        <Star key={i} style={{ top: s.top, left: s.left, right: s.right }} size={s.size} delay={s.delay} />
      ))}
      {TWINKLES.map((t, i) => (
        <TwinkleDot key={i} style={t} />
      ))}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto', padding: '120px 28px 80px', width: '100%' }}>
        <div style={{ maxWidth: 680 }}>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{ marginBottom: 24 }}
          >
            <span className="section-tag">Based in the Philippines 🇵🇭</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            style={{ marginBottom: 20 }}
          >
            <h1 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(3.2rem, 9vw, 6.5rem)',
              color: 'var(--white)', lineHeight: 0.95,
              letterSpacing: '-0.04em',
            }}>
              Hi, I'm
            </h1>
            <h1 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(3.2rem, 9vw, 6.5rem)',
              background: 'linear-gradient(135deg, #ffffff 0%, #888898 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              lineHeight: 1.0, letterSpacing: '-0.04em',
            }}>
              Vincent Kobe
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ fontSize: 'clamp(0.95rem, 2.2vw, 1.25rem)', marginBottom: 22, minHeight: '2rem', fontFamily: 'DM Sans, sans-serif' }}
          >
            <Typewriter />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            style={{ color: 'var(--text3)', fontSize: '0.97rem', lineHeight: 1.85, maxWidth: 480, marginBottom: 44 }}
          >
            Crafting digital experiences where{' '}
            <span style={{ color: 'var(--text2)' }}>thoughtful engineering</span>{' '}
            meets pixel-perfect design — built to last, built to impress.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <button onClick={() => go('projects')} className="btn btn-primary">View My Work ↗</button>
            <button onClick={() => go('contact')} className="btn btn-outline">Let's Talk</button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            style={{ marginTop: 56, display: 'flex', gap: 40, flexWrap: 'wrap', paddingTop: 40, borderTop: '1px solid var(--border)' }}
          >
            {[
              { num: '2+', label: 'Years building' },
              { num: '5+', label: 'Projects shipped' },
              { num: '∞', label: 'Coffee consumed' },
            ].map((s) => (
              <div key={s.label}>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.9rem', color: 'var(--white)', lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontSize: '0.74rem', color: 'var(--text3)', marginTop: 5, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Live wallpaper badge — replaces old status card */}
        <LiveBadge />
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.3 }}>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', letterSpacing: '0.35em', color: 'var(--text3)', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, var(--text3), transparent)', borderRadius: 2 }}
        />
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fall {
          0% { transform: translateY(-10px); opacity: 0; }
          8% { opacity: 0.9; }
          92% { opacity: 0.6; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes twinkle {
          0%,100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.65; transform: scale(1.6); }
        }
      `}</style>
    </section>
  )
=======
import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ROLES = ['Full-Stack Developer', 'UI/UX Designer', 'Creative Problem Solver']

function Typewriter() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [chars, setChars] = useState('')
  const [deleting, setDeleting] = useState(false)
  const timeout = useRef(null)

  useEffect(() => {
    const role = ROLES[roleIdx]
    if (!deleting && chars === role) {
      timeout.current = setTimeout(() => setDeleting(true), 2400)
    } else if (deleting && chars === '') {
      setDeleting(false)
      setRoleIdx((i) => (i + 1) % ROLES.length)
    } else {
      timeout.current = setTimeout(() => {
        setChars(deleting ? chars.slice(0, -1) : role.slice(0, chars.length + 1))
      }, deleting ? 30 : 68)
    }
    return () => clearTimeout(timeout.current)
  }, [chars, deleting, roleIdx])

  return (
    <span style={{ color: 'var(--text2)', fontWeight: 400 }}>
      {chars}
      <span style={{ borderRight: '1.5px solid var(--text3)', marginLeft: 1, animation: 'blink 1s step-end infinite' }} />
    </span>
  )
}

/* Falling star */
function Star({ style, size = 1.5, delay = 0 }) {
  return (
    <div style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.7)',
      boxShadow: `0 0 ${size * 2}px rgba(255,255,255,0.4)`,
      animation: `fall ${6 + Math.random() * 8}s linear ${delay}s infinite`,
      ...style,
    }} />
  )
}

/* Static twinkle dot */
function TwinkleDot({ style }) {
  return (
    <div style={{
      position: 'absolute',
      width: 1.5,
      height: 1.5,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.5)',
      animation: `twinkle ${2 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
      ...style,
    }} />
  )
}

const STARS = [
  { top: '8%',  left: '15%',  size: 1.5, delay: 0   },
  { top: '5%',  left: '62%',  size: 1,   delay: 2.5 },
  { top: '12%', left: '80%',  size: 2,   delay: 1   },
  { top: '20%', left: '40%',  size: 1,   delay: 4   },
  { top: '3%',  left: '30%',  size: 1.5, delay: 6   },
  { top: '15%', right: '10%', size: 1,   delay: 3   },
]

const TWINKLES = [
  { top: '30%', left:  '8%'  }, { top: '18%', left: '55%' },
  { top: '45%', right: '6%'  }, { top: '22%', right: '28%' },
  { top: '10%', left:  '90%' }, { top: '38%', left: '72%' },
  { top: '7%',  left:  '44%' }, { top: '28%', left: '20%' },
]

/* Animated "live wallpaper" badge — shifting gradient orb */
function LiveBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="float hidden md:block"
      style={{ position: 'absolute', right: 28, top: '42%', transform: 'translateY(-50%)' }}
    >
      <div style={{
        position: 'relative', width: 160, height: 160,
        borderRadius: '50%', overflow: 'hidden',
        border: '1px solid var(--border2)',
        boxShadow: '0 0 40px rgba(255,255,255,0.06), 0 0 80px rgba(255,255,255,0.03)',
      }}>
        {/* Shifting gradient layers */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', inset: -20,
            background: 'conic-gradient(from 0deg, rgba(255,255,255,0.08), rgba(180,180,200,0.14), rgba(100,100,120,0.06), rgba(255,255,255,0.1), rgba(180,180,200,0.08))',
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute', inset: -20,
            background: 'conic-gradient(from 180deg, rgba(255,255,255,0.04), rgba(200,200,220,0.1), transparent, rgba(255,255,255,0.06))',
          }}
        />
        {/* Pulse orb center */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: '25%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
          }}
        />
        {/* Glass overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backdropFilter: 'blur(2px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 4,
        }}>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }}
          />
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Available</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'var(--bg)' }}>

      {/* Ambient smoke — NO grid */}
      <div style={{
        position: 'absolute', top: '-15%', right: '-8%', width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 62%)',
        borderRadius: '50%', pointerEvents: 'none',
        transform: `translateY(${scrollY * 0.15}px)`,
      }} />
      <div style={{
        position: 'absolute', bottom: '0', left: '-5%', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 62%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* Falling stars */}
      {STARS.map((s, i) => (
        <Star key={i} style={{ top: s.top, left: s.left, right: s.right }} size={s.size} delay={s.delay} />
      ))}
      {TWINKLES.map((t, i) => (
        <TwinkleDot key={i} style={t} />
      ))}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto', padding: '120px 28px 80px', width: '100%' }}>
        <div style={{ maxWidth: 680 }}>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{ marginBottom: 24 }}
          >
            <span className="section-tag">Based in the Philippines 🇵🇭</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            style={{ marginBottom: 20 }}
          >
            <h1 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(3.2rem, 9vw, 6.5rem)',
              color: 'var(--white)', lineHeight: 0.95,
              letterSpacing: '-0.04em',
            }}>
              Hi, I'm
            </h1>
            <h1 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(3.2rem, 9vw, 6.5rem)',
              background: 'linear-gradient(135deg, #ffffff 0%, #888898 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              lineHeight: 1.0, letterSpacing: '-0.04em',
            }}>
              Vincent Kobe
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{ fontSize: 'clamp(0.95rem, 2.2vw, 1.25rem)', marginBottom: 22, minHeight: '2rem', fontFamily: 'DM Sans, sans-serif' }}
          >
            <Typewriter />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            style={{ color: 'var(--text3)', fontSize: '0.97rem', lineHeight: 1.85, maxWidth: 480, marginBottom: 44 }}
          >
            Crafting digital experiences where{' '}
            <span style={{ color: 'var(--text2)' }}>thoughtful engineering</span>{' '}
            meets pixel-perfect design — built to last, built to impress.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <button onClick={() => go('projects')} className="btn btn-primary">View My Work ↗</button>
            <button onClick={() => go('contact')} className="btn btn-outline">Let's Talk</button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            style={{ marginTop: 56, display: 'flex', gap: 40, flexWrap: 'wrap', paddingTop: 40, borderTop: '1px solid var(--border)' }}
          >
            {[
              { num: '2+', label: 'Years building' },
              { num: '5+', label: 'Projects shipped' },
              { num: '∞', label: 'Coffee consumed' },
            ].map((s) => (
              <div key={s.label}>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.9rem', color: 'var(--white)', lineHeight: 1 }}>{s.num}</p>
                <p style={{ fontSize: '0.74rem', color: 'var(--text3)', marginTop: 5, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Live wallpaper badge — replaces old status card */}
        <LiveBadge />
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.3 }}>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', letterSpacing: '0.35em', color: 'var(--text3)', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, var(--text3), transparent)', borderRadius: 2 }}
        />
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fall {
          0% { transform: translateY(-10px); opacity: 0; }
          8% { opacity: 0.9; }
          92% { opacity: 0.6; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes twinkle {
          0%,100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.65; transform: scale(1.6); }
        }
      `}</style>
    </section>
  )
>>>>>>> a219837a0c31273cb4e2fd5121adb46b0b7d16fe
}