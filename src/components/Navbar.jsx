import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { id: 'about',        label: 'About'      },
  { id: 'resume',       label: 'Resume'     },
  { id: 'skills',       label: 'Skills'     },
  { id: 'achievements', label: 'Awards'     },
  { id: 'projects',     label: 'Projects'   },
  { id: 'hte',          label: 'HTE'        },
  { id: 'reflection',   label: 'Reflection' },
  { id: 'contact',      label: 'Contact'    },
]

function TubelightNav({ links, active, onNav }) {
  const pillRef = useRef(null)
  const [ind, setInd] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const update = () => {
      if (!pillRef.current) return
      const idx = links.findIndex(l => l.id === active)
      const btn = pillRef.current.querySelectorAll('.tubelight-btn')[idx]
      if (btn) setInd({ left: btn.offsetLeft, width: btn.offsetWidth })
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [active, links])

  return (
    <div className="tubelight-pill" ref={pillRef}>
      {active && <div className="tubelight-indicator" style={{ left: ind.left, width: ind.width }} />}
      {links.map((l) => {
        const isActive = active === l.id
        return (
          <button
            key={l.id}
            className={`tubelight-btn${isActive ? ' active' : ''}`}
            onClick={() => onNav(l.id)}
            aria-current={isActive ? 'true' : undefined}
          >
            {isActive && (
              <>
                <div className="tubelight-lamp" />
                <div className="tubelight-glow-1" />
                <div className="tubelight-glow-2" />
              </>
            )}
            {l.label}
          </button>
        )
      })}
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40)
      if (window.scrollY < 100) { setActive(null); return }
      let found = false
      for (const { id } of links) {
        const el = document.getElementById(id)
        if (el) {
          const r = el.getBoundingClientRect()
          if (r.top <= 140 && r.bottom >= 140) { setActive(id); found = true; break }
        }
      }
      if (!found) setActive(null)
    }
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const solid = scrolled || menuOpen

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.4s ease',
        background: solid ? 'rgba(10,10,11,0.85)' : 'transparent',
        backdropFilter: solid ? 'blur(20px) saturate(1.2)' : 'none',
        borderBottom: solid ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        padding: scrolled ? '14px 0' : '22px 0',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <button onClick={() => go('hero')} aria-label="Back to top" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: 'var(--white)', letterSpacing: '-0.02em' }}>
            Kobe<span style={{ color: 'var(--text3)' }}>.</span>
          </span>
        </button>

        {/* Desktop nav — tubelight pill */}
        <div className="nav-desktop" style={{ alignItems: 'center', gap: 20 }}>
          <TubelightNav links={links} active={active} onNav={go} />
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            width: 40, height: 40, borderRadius: 10, cursor: 'pointer',
            background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
            alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4,
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 16, height: 1.5, background: 'var(--text)', borderRadius: 2,
              transition: 'all 0.3s',
              transform: menuOpen ? (i === 0 ? 'translateY(5.5px) rotate(45deg)' : i === 2 ? 'translateY(-5.5px) rotate(-45deg)' : 'none') : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            style={{ maxWidth: 1100, margin: '12px auto 0', padding: '0 28px 8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}
          >
            {links.map(l => (
              <button key={l.id} onClick={() => go(l.id)} style={{
                textAlign: 'left', padding: '12px 14px', borderRadius: 10, cursor: 'pointer',
                background: active === l.id ? 'rgba(255,255,255,0.1)' : 'var(--bg3)',
                border: '1px solid var(--border)', color: 'var(--text)',
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', fontWeight: 500,
              }}>
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-desktop { display: flex; }
        .nav-mobile-btn { display: none; }
        @media (max-width: 900px) {
          .nav-desktop { display: none; }
          .nav-mobile-btn { display: flex; }
        }
        @media (min-width: 901px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>
    </motion.nav>
  )
}