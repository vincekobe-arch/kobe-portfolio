import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion'

function ScrollReveal({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  const controls = useAnimation()
  useEffect(() => { if (isInView) controls.start('visible') }, [isInView, controls])
  return (
    <motion.div ref={ref} initial="hidden" animate={controls}
      variants={{
        hidden:  { opacity: 0, y: 40, filter: 'blur(4px)' },
        visible: { opacity: 1, y: 0,  filter: 'blur(0px)',
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] } },
      }}
    >{children}</motion.div>
  )
}

const PROJECTS = [
  {
    num: '01',
    icon: '/petunity.png',
    title: 'PetUnity',
    tagline: 'Pet Health & Community Platform',
    desc: 'A comprehensive web system for Muntinlupa City integrating pet health records, community event management, and real-time rabies case mapping — connecting pet owners, vets, and local government. Winner of the Best in User Interface Award.',
    tags: ['React', 'Node.js', 'MySQL', 'Maps API', 'Full-Stack'],
    link: 'https://petunity-muntinlupacity.com',
    preview: '/petunity-shot.jpg',
    features: ['Real-time rabies case mapping', 'Pet health records', 'Event scheduling', 'Multi-role dashboard'],
    badge: '🏆 Best in UI Award',
  },
  {
    num: '02',
    icon: '/clickventures.png',
    title: 'ClickVentures',
    tagline: 'Documentary Tourism Website',
    desc: 'An immersive documentary website showcasing the cultural richness of Baguio City. Cinematic storytelling, rich galleries, and destination guides built for BSTM students.',
    tags: ['React', 'CSS Animations', 'Responsive', 'UI/UX'],
    link: 'https://clickventures-bstm.vercel.app/',
    preview: '/clickventures-shot.jpg',
    features: ['Cinematic hero sections', 'Media galleries', 'Destination guides', 'Storytelling layout'],
  },
  {
    num: '03',
    icon: '/radio.png',
    title: 'Smart Radio',
    tagline: 'Live Radio Station Streaming App',
    desc: 'A browser-based radio app that streams live stations via a public radio API. Pick a station, hit play, and enjoy uninterrupted music — no downloads, no installs.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Radio Station API'],
    link: 'https://vincekobe-arch.github.io/Radio-App/',
    preview: '/radio-shot.jpg',
    features: ['Curated station selector', 'Live radio station streaming', 'Play / Stop controls', 'Minimal clean UI'],
  },
  {
    num: '04',
    icon: '/recipe.png',
    title: 'Recipe Finder Pro',
    tagline: 'Meal Discovery App',
    desc: 'Browse and discover recipes with a clean paginated interface. Flip through a catalogue of meals complete with ingredients and cooking steps, making meal-planning effortless.',
    tags: ['HTML', 'CSS', 'JavaScript', 'API'],
    link: 'https://vincekobe-arch.github.io/Recipe-Finder/',
    preview: '/recipe-shot.jpg',
    features: ['Paginated recipe browsing', 'Meal detail view', 'Ingredient lists', 'Responsive layout'],
  },
  {
    num: '05',
    icon: '/quote.png',
    iconInvert: true,
    title: 'Quote App',
    tagline: 'Random Quote Generator with TTS',
    desc: 'Generate random inspirational quotes on demand with a built-in text-to-speech engine. Speak, pause, resume, and stop narration — a fun little app that gives words a voice.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web Speech API'],
    link: 'https://vincekobe-arch.github.io/Quote-App/',
    preview: '/quote-shot.jpg',
    features: ['Random quote generation', 'Text-to-speech playback', 'Pause & resume controls', 'Dynamic background images'],
  },
  {
    num: '06',
    icon: '/portrait.png',
    iconInvert: true,
    title: 'Portrait',
    tagline: 'Personal Music & Lyrics Page',
    desc: 'A personal creative page featuring Filipino music lyrics with a stylised, immersive layout — blending typography and identity into a single expressive digital canvas.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Creative'],
    link: 'https://vincekobe-arch.github.io/Portrait/',
    preview: '/portrait-shot.jpg',
    features: ['Immersive full-page design', 'Lyric display layout', 'Personal creative expression', 'Typographic focus'],
  },
]

// ✏️ EDIT — Design work samples (Figma). Images are directly in /public/.
const OTHER_WORKS = [
  { type: 'UI/UX Design · Figma', title: 'Nike Shop App — Mobile Concept', desc: 'A mobile shopping app prototype with sign-up, product catalog, category filters, wishlist & cart, and a GCash checkout flow.', image: '/nike-app.png', link: '/nike-app.png' },
  { type: 'UI/UX Design · Figma', title: 'Ko-Build — PC Parts E-Commerce', desc: 'A web store design for PC parts and gaming gear featuring smart search, category navigation, product cards with ratings, and Best Sellers / New Products carousels.', image: '/kobuild.png', link: '/kobuild.png' },
]

const AUTOPLAY_MS = 7000
const hostOf = (url) => { try { return new URL(url).host } catch { return url } }
const shotUrl = (p) => p.preview || `https://api.microlink.io/?url=${encodeURIComponent(p.link)}&screenshot=true&meta=false&embed=screenshot.url&colorScheme=dark&viewport.width=1280&viewport.height=800&waitFor=2000`

function PreviewPlaceholder({ title, reason }) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: 160, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, margin: '0 auto 10px', border: '1px solid var(--border2)', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
        </div>
        <span style={{ fontSize: '0.62rem', color: 'var(--text3)', letterSpacing: '0.1em', display: 'block' }}>{title}</span>
        {reason && <span style={{ fontSize: '0.55rem', color: 'var(--text3)', opacity: 0.6, marginTop: 4, display: 'block' }}>{reason}</span>}
      </div>
    </div>
  )
}

/* Browser-window preview of the live site */
function BrowserPreview({ project }) {
  const [hover, setHover] = useState(false)
  const [err, setErr] = useState(false)
  useEffect(() => setErr(false), [project.num])

  return (
    <a href={project.link} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      aria-label={`Visit ${project.title} live site`}
      style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none', background: 'var(--bg2, #111114)', border: '1px solid var(--border2)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 24px 70px rgba(0,0,0,0.55)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57', '#febc2e', '#28c840'].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.85 }} />)}
        </div>
        <div style={{ flex: 1, padding: '4px 12px', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--border)', fontSize: '0.66rem', color: 'var(--text3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          🔒 {hostOf(project.link)}
        </div>
      </div>
      <div style={{ position: 'relative', flex: 1, minHeight: 240, overflow: 'hidden', background: 'var(--bg)' }}>
        {!err ? (
          <img src={shotUrl(project)} alt={`${project.title} screenshot`} onError={() => setErr(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.6s cubic-bezier(.16,1,.3,1)', transform: hover ? 'scale(1.04)' : 'scale(1)' }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0 }}><PreviewPlaceholder title={project.title} reason="Preview could not load" /></div>
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', opacity: hover && !err ? 1 : 0, transition: 'opacity 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.85rem', transform: hover ? 'none' : 'translateY(8px)', transition: 'transform 0.3s' }}>Visit Site ↗</span>
        </div>
      </div>
    </a>
  )
}

const slideVariants = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 90 : -90, filter: 'blur(6px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -90 : 90, filter: 'blur(6px)' }),
}

function ArrowBtn({ dir, onClick }) {
  return (
    <motion.button onClick={onClick} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
      aria-label={dir < 0 ? 'Previous project' : 'Next project'}
      style={{ width: 46, height: 46, borderRadius: '50%', cursor: 'pointer', background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dir < 0 ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </motion.button>
  )
}

function ProjectSlider({ projects }) {
  const [[index, dir], setState] = useState([0, 0])
  const [paused, setPaused] = useState(false)
  const rootRef = useRef(null)
  const inView = useInView(rootRef, { amount: 0.45 })
  const halted = paused || !inView   // autoplay only while the slider is on screen
  const p = projects[index]

  const go = useCallback((next, d) => {
    setState(([i]) => {
      const n = typeof next === 'function' ? next(i) : next
      return [(n + projects.length) % projects.length, d ?? (n > i ? 1 : -1)]
    })
  }, [projects.length])
  const next = useCallback(() => go(i => i + 1, 1), [go])
  const prev = useCallback(() => go(i => i - 1, -1), [go])

  // autoplay (pauses on hover / focus)
  useEffect(() => {
    if (halted) return
    const t = setTimeout(next, AUTOPLAY_MS)
    return () => clearTimeout(t)
  }, [index, halted, next])

  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next() }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); prev() }
  }

  return (
    <div
      ref={rootRef}
      tabIndex={0} onKeyDown={onKey}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}
      role="region" aria-roledescription="carousel" aria-label="Projects"
      style={{ outline: 'none' }}
    >
      {/* ── Slide stage ── */}
      <div style={{ position: 'relative', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 22, padding: 'clamp(16px, 3vw, 28px)', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.45)' }}>
        <div style={{ position: 'absolute', top: -120, right: -120, width: 360, height: 360, background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        {/* Big background number */}
        <AnimatePresence mode="wait">
          <motion.span key={p.num + '-bg'}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
            aria-hidden="true"
            style={{ position: 'absolute', right: 24, bottom: -30, fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(7rem, 16vw, 12rem)', lineHeight: 1, color: 'rgba(255,255,255,0.03)', pointerEvents: 'none', userSelect: 'none' }}>
            {p.num}
          </motion.span>
        </AnimatePresence>

        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={p.num}
            custom={dir}
            variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.18}
            onDragEnd={(_, info) => { if (info.offset.x < -80) next(); else if (info.offset.x > 80) prev() }}
            aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}: ${p.title}`}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(20px, 3vw, 36px)', alignItems: 'stretch', position: 'relative', cursor: 'grab' }}
          >
            {/* Preview */}
            <div style={{ minHeight: 300 }}>
              <BrowserPreview project={p} />
            </div>

            {/* Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '4px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--surface)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <img src={p.icon} alt="" style={{ width: 24, height: 24, objectFit: 'contain', filter: p.iconInvert ? 'invert(1)' : 'none' }} />
                </div>
                <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text3)', letterSpacing: '0.12em' }}>
                  {p.num} <span style={{ opacity: 0.5 }}>/ {String(projects.length).padStart(2, '0')}</span>
                </span>
              </div>

              <div>
                {p.badge && (
                  <span style={{ display: 'inline-block', marginBottom: 10, padding: '4px 10px', borderRadius: 9999, fontSize: '0.62rem', fontWeight: 600, color: '#facc15', background: 'rgba(250,204,21,0.08)', border: '1px solid rgba(250,204,21,0.25)' }}>{p.badge}</span>
                )}
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: 'var(--white)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 6 }}>{p.title}</h3>
                <p style={{ fontSize: '0.64rem', color: 'var(--text3)', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600 }}>{p.tagline}</p>
              </div>

              <p style={{ color: 'var(--text3)', fontSize: '0.86rem', lineHeight: 1.85 }}>{p.desc}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 14, height: 14, borderRadius: 4, flexShrink: 0, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="7" height="6" viewBox="0 0 7 6" fill="none"><path d="M1 3l1.5 1.5L6 1" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{ color: 'var(--text2)', fontSize: '0.74rem' }}>{f}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {p.tags.map(t => <span key={t} className="pill" style={{ fontSize: '0.62rem' }}>{t}</span>)}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: 6 }}>
                <a href={p.link} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                  Visit Live Site ↗
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Controls ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 22 }}>
        <ArrowBtn dir={-1} onClick={prev} />
        <div style={{ flex: 1, display: 'flex', gap: 6 }}>
          {projects.map((proj, i) => (
            <button key={proj.num} onClick={() => go(i, i > index ? 1 : -1)} aria-label={`Go to ${proj.title}`} aria-current={i === index}
              style={{ flex: 1, height: 18, padding: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <span style={{ position: 'relative', width: '100%', height: 3, borderRadius: 2, background: 'var(--border)', overflow: 'hidden' }}>
                {i < index && <span style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.35)' }} />}
                {i === index && (
                  <motion.span key={`${index}-${halted}`}
                    initial={{ width: '0%' }} animate={{ width: halted ? '0%' : '100%' }}
                    transition={{ duration: halted ? 0 : AUTOPLAY_MS / 1000, ease: 'linear' }}
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, background: 'var(--white)' }} />
                )}
              </span>
            </button>
          ))}
        </div>
        <ArrowBtn dir={1} onClick={next} />
      </div>

      {/* ── Thumbnail strip ── */}
      <div className="proj-thumbs" style={{ display: 'grid', gridTemplateColumns: `repeat(${projects.length}, minmax(130px, 1fr))`, gap: 8, marginTop: 16, overflowX: 'auto', paddingBottom: 4 }}>
        {projects.map((proj, i) => {
          const on = i === index
          return (
            <button key={proj.num} onClick={() => go(i, i > index ? 1 : -1)} aria-label={`Show ${proj.title}`}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12, cursor: 'pointer', textAlign: 'left', background: on ? 'rgba(255,255,255,0.07)' : 'var(--bg3)', border: `1px solid ${on ? 'var(--border2)' : 'var(--border)'}`, color: 'inherit', font: 'inherit', transition: 'all 0.25s', opacity: on ? 1 : 0.6 }}>
              <img src={proj.icon} alt="" style={{ width: 18, height: 18, objectFit: 'contain', flexShrink: 0, filter: proj.iconInvert ? 'invert(1)' : 'none' }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: on ? 'var(--white)' : 'var(--text2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{proj.title}</span>
            </button>
          )
        })}
      </div>

      <p style={{ textAlign: 'center', marginTop: 14, fontSize: '0.62rem', color: 'var(--text3)', letterSpacing: '0.1em' }}>
        swipe, use ← → keys, or click a project
      </p>
    </div>
  )
}

function OtherWorkCard({ w }) {
  const [err, setErr] = useState(false)
  const Wrapper = w.link ? 'a' : 'div'
  return (
    <motion.div whileHover={{ y: -6, transition: { duration: 0.3 } }} style={{ height: '100%' }}>
      <Wrapper {...(w.link ? { href: w.link, target: '_blank', rel: 'noreferrer' } : {})}
        style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ aspectRatio: '16/10', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
          {!err ? (
            <img src={w.image} alt={w.title} onError={() => setErr(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          ) : (
            <PreviewPlaceholder title={w.title} reason={w.type} />
          )}
        </div>
        <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          <span className="pill" style={{ fontSize: '0.58rem', width: 'fit-content' }}>{w.type}</span>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--white)' }}>{w.title}</h3>
          <p style={{ color: 'var(--text3)', fontSize: '0.76rem', lineHeight: 1.7 }}>{w.desc}</p>
          {w.link && <span style={{ marginTop: 'auto', fontSize: '0.7rem', color: 'var(--text2)', fontWeight: 600 }}>View full design ↗</span>}
        </div>
      </Wrapper>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '140px 0', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--border2) 30%, var(--border2) 70%, transparent)' }} />
      <div style={{ position: 'absolute', top: '15%', right: '-8%', width: 700, height: 700, background: 'radial-gradient(circle, rgba(255,255,255,0.016) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>
        <ScrollReveal>
          <span className="section-tag">Projects</span>
        </ScrollReveal>

        <div style={{ marginBottom: 48 }}>
          <ScrollReveal delay={0.05}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: 'var(--white)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12 }}>
              Work I'm{' '}
              <span style={{ background: 'linear-gradient(135deg, #ffffff 0%, #888898 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>proud of.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p style={{ color: 'var(--text3)', fontSize: '0.9rem' }}>Real projects. Real solutions. Deployed &amp; live.</p>
          </ScrollReveal>
        </div>

        {/* ── Project slider ── */}
        <ScrollReveal delay={0.12}>
          <ProjectSlider projects={PROJECTS} />
        </ScrollReveal>

        {/* ── Design work ── */}
        <ScrollReveal delay={0.1}>
          <div style={{ marginTop: 90, marginBottom: 28 }}>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: 8 }}>
              Beyond code,<br />
              <span style={{ color: 'var(--text3)', fontWeight: 500, fontSize: '0.95em' }}>UI/UX design work in Figma.</span>
            </p>
          </div>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
          {OTHER_WORKS.map((w, i) => (
            <ScrollReveal key={w.title} delay={0.05 * i}>
              <OtherWorkCard w={w} />
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: 60 }}>
            <p style={{ color: 'var(--text3)', fontSize: '0.85rem', marginBottom: 16 }}>Interested in having me on your team?</p>
            <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn btn-primary">
              Let's Connect ↗
            </button>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        .proj-thumbs::-webkit-scrollbar { height: 4px; }
        .proj-thumbs::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }
      `}</style>
    </section>
  )
}