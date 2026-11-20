import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion'

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

/* ─────────────────────────────────────────────────────────────
   Smoke Ghost — a shy character made of the same smoke as the
   background. It peeks from the edges, hides when you get close,
   and does something different every time you click it.
   ───────────────────────────────────────────────────────────── */
const G = 108
// peek spots: where it hides, which way it leans, and which way it ducks
const PEEK_SPOTS = [
  { fx: 1, fy: 0.34, rot: -18, dx: 1, dy: 0, bubble: 'left' },
  { fx: 1, fy: 0.66, rot: -10, dx: 1, dy: 0, bubble: 'left' },
  { fx: 0.80, fy: 1, rot: 0,   dx: 0, dy: 1, bubble: 'top' },
  { fx: 0.64, fy: 1, rot: 8,   dx: 0, dy: 1, bubble: 'top' },
]
const STAGE = [0.76, 0.44]
const PEEK_LINES  = ['👀', '…hi.', 'Click me?', 'Psst… over here.', "Don't look. I'm hiding."]
const EEP_LINES   = ['Eep!', 'Nope! 🙈', 'Too close!', "You didn't see me."]
const ACTIONS = [
  { key: 'teleport', line: 'Too slow! 👻' },
  { key: 'flip',     line: 'Did you see that backflip?!' },
  { key: 'hearts',   line: 'Here, have some smoke hearts ♡' },
  { key: 'boo',      line: 'BOO! …did I scare you?' },
  { key: 'cool',     line: 'Deal with it. 😎' },
  { key: 'clone',    line: 'ghost.clone() × 3' },
  { key: 'disguise', line: "You've never seen me before. 🎩" },
  { key: 'chase',    line: "I'm following you now. Don't mind me." },
  { key: 'dizzy',    line: 'Okay… too many clicks. I’m dizzy.' },
  { key: 'vanish',   line: 'Brb, haunting the Projects section…' },
  { key: 'secret',   line: 'You found the secret ending! The developer is open for work 👀', cta: true },
]
const wait = (ms) => new Promise(r => setTimeout(r, ms))
const pickL = (a) => a[Math.floor(Math.random() * a.length)]

function GhostFace({ mood, eyesRef }) {
  const dark = '#17171d'
  const blush = mood === 'shy' ? 0.95 : mood === 'dizzy' || mood === 'sleep' ? 0.25 : 0.55
  return (
    <g>
      <ellipse cx="31" cy="60" rx={mood === 'shy' ? 8 : 6} ry="3.4" fill="#ff9fb2" opacity={blush} />
      <ellipse cx="69" cy="60" rx={mood === 'shy' ? 8 : 6} ry="3.4" fill="#ff9fb2" opacity={blush} />

      {/* eyes */}
      {['idle', 'cool', 'disguise'].includes(mood) && (
        <g ref={eyesRef}>
          <ellipse cx="38" cy="47" rx="5.2" ry="7" fill={dark} /><ellipse cx="62" cy="47" rx="5.2" ry="7" fill={dark} />
          <circle cx="39.6" cy="44.5" r="1.8" fill="#fff" /><circle cx="63.6" cy="44.5" r="1.8" fill="#fff" />
        </g>
      )}
      {mood === 'happy' && <g fill="none" stroke={dark} strokeWidth="3" strokeLinecap="round"><path d="M32 49 q6 -8 12 0" /><path d="M56 49 q6 -8 12 0" /></g>}
      {mood === 'shy'   && <g fill="none" stroke={dark} strokeWidth="3" strokeLinecap="round"><path d="M32 46 q6 6 12 0" /><path d="M56 46 q6 6 12 0" /></g>}
      {mood === 'sleep' && <g fill="none" stroke={dark} strokeWidth="2.6" strokeLinecap="round"><path d="M32 48 h11" /><path d="M57 48 h11" /></g>}
      {mood === 'boo' && (
        <g>
          <ellipse cx="38" cy="45" rx="7" ry="9" fill={dark} /><ellipse cx="62" cy="45" rx="7" ry="9" fill={dark} />
          <path d="M29 34 l14 6 M71 34 l-14 6" stroke={dark} strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {mood === 'dizzy' && (
        <g fill="none" stroke={dark} strokeWidth="2" strokeLinecap="round">
          <path d="M38 47 m-1 0 a1 1 0 1 1 2 0 a3 3 0 1 1 -5 0 a5 5 0 1 1 8 0" />
          <path d="M62 47 m-1 0 a1 1 0 1 1 2 0 a3 3 0 1 1 -5 0 a5 5 0 1 1 8 0" />
        </g>
      )}

      {/* accessories */}
      <AnimatePresence>
        {mood === 'cool' && (
          <motion.g key="glasses" initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }}>
            <rect x="27" y="40" width="20" height="12" rx="4" fill={dark} /><rect x="53" y="40" width="20" height="12" rx="4" fill={dark} />
            <path d="M47 45 h6" stroke={dark} strokeWidth="2.5" />
            <path d="M31 43 l6 0 M57 43 l6 0" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          </motion.g>
        )}
        {mood === 'disguise' && (
          <motion.g key="disguise" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ type: 'spring', stiffness: 240, damping: 15 }}>
            {/* top hat */}
            <rect x="30" y="-14" width="40" height="26" rx="3" fill="#3a3a46" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
            <rect x="21" y="10" width="58" height="6" rx="3" fill="#3a3a46" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" />
            <rect x="30.6" y="3" width="38.8" height="5" fill="#dc2626" />
            <path d="M35 -10 v18" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
            {/* round glasses */}
            <circle cx="38" cy="47" r="8.5" fill="none" stroke={dark} strokeWidth="2" />
            <circle cx="62" cy="47" r="8.5" fill="none" stroke={dark} strokeWidth="2" />
            <path d="M46.5 47 h7" stroke={dark} strokeWidth="2" />
            {/* mustache */}
            <path d="M50 58 c-4 -4 -12 -3 -15 3 c5 -1 9 1 15 -1 c6 2 10 0 15 1 c-3 -6 -11 -7 -15 -3 z" fill={dark} />
          </motion.g>
        )}
      </AnimatePresence>

      {/* mouth */}
      {['idle', 'cool'].includes(mood) && (mood === 'cool'
        ? <path d="M44 61 q7 4 13 -2" fill="none" stroke={dark} strokeWidth="2.4" strokeLinecap="round" />
        : <ellipse cx="50" cy="62" rx="3.2" ry="4" fill={dark} />)}
      {mood === 'happy' && <path d="M43 59 q7 9 14 0 z" fill={dark} />}
      {mood === 'shy'   && <path d="M46 62 q4 3 8 0" fill="none" stroke={dark} strokeWidth="2.2" strokeLinecap="round" />}
      {mood === 'boo'   && <ellipse cx="50" cy="66" rx="9" ry="10" fill={dark} />}
      {mood === 'dizzy' && <path d="M42 63 q4 -4 8 0 t8 0" fill="none" stroke={dark} strokeWidth="2.2" strokeLinecap="round" />}
      {mood === 'sleep' && <ellipse cx="50" cy="62" rx="2.5" ry="2" fill={dark} />}
    </g>
  )
}

function GhostBody({ mood, eyesRef, id = 'a' }) {
  return (
    <svg viewBox="0 0 100 110" width={G} height={G} style={{ display: 'block', overflow: 'visible' }} aria-hidden="true">
      <defs>
        <radialGradient id={`ghostBody-${id}`} cx="40%" cy="30%" r="75%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.97)" />
          <stop offset="55%" stopColor="rgba(220,220,235,0.9)" />
          <stop offset="100%" stopColor="rgba(160,160,185,0.55)" />
        </radialGradient>
        <filter id={`ghostGlow-${id}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7" /></filter>
      </defs>
      <ellipse cx="50" cy="55" rx="40" ry="44" fill="rgba(200,200,230,0.35)" filter={`url(#ghostGlow-${id})`} />
      <ellipse cx="12" cy="62" rx="7" ry="5" fill="rgba(225,225,240,0.9)" />
      <g className={mood === 'sleep' ? '' : 'ghost-wave'}><ellipse cx="88" cy="56" rx="7" ry="5" fill="rgba(225,225,240,0.9)" /></g>
      <path className="ghost-tail" d="M50 8 C27 8 14 26 14 50 V94 q6 8 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 V50 C86 26 73 8 50 8 Z" fill={`url(#ghostBody-${id})`} />
      <ellipse cx="36" cy="24" rx="9" ry="5" fill="#fff" opacity="0.6" transform="rotate(-25 36 24)" />
      <GhostFace mood={mood} eyesRef={eyesRef} />
    </svg>
  )
}

function SmokeGhost() {
  const areaRef = useRef(null), canvasRef = useRef(null), eyesRef = useRef(null)
  const x = useMotionValue(0), y = useMotionValue(0), rot = useMotionValue(0), scl = useMotionValue(1)
  const parts = useRef([]), mouse = useRef({ x: -9999, y: -9999 }), timers = useRef([])
  const st = useRef({ mode: 'peek', spot: 0, ducked: false, busy: false, lastAct: Date.now(), clicks: [], step: 0, cycle: 0 })
  const [mode, setMode]   = useState('peek')      // peek | out | chase | sleep
  const [mood, setMood]   = useState('idle')
  const [msg, setMsg]     = useState(null)
  const [peekLine, setPeekLine] = useState('👀')
  const [bubbleSide, setBubbleSide] = useState('left')
  const [clones, setClones] = useState(false)
  const [shown, setShown] = useState(true)

  const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.current.push(t); return t }
  const setM = (m) => { st.current.mode = m; setMode(m) }
  const area = () => areaRef.current
  const say = (m, ms = 3000) => { setMsg(m); later(() => setMsg(cur => (cur === m ? null : cur)), ms) }

  const peekPos = (i, ducked = false) => {
    const a = area(), s = PEEK_SPOTS[i]; if (!a) return { x: 0, y: 0, rot: 0 }
    const W = a.clientWidth, H = a.clientHeight
    let px = s.fx === 1 ? W - G * 0.46 : W * s.fx - G / 2
    let py = s.fy === 1 ? H - G * 0.5 : H * s.fy - G / 2
    const hide = ducked ? G * 0.42 : 0
    return { x: px + s.dx * hide, y: py + s.dy * hide, rot: s.rot }
  }
  const offPos = (i) => { const p = peekPos(i), s = PEEK_SPOTS[i]; return { x: p.x + s.dx * G * 1.2, y: p.y + s.dy * G * 1.2, rot: p.rot } }
  const stagePos = () => { const a = area(); return { x: a.clientWidth * STAGE[0] - G / 2, y: a.clientHeight * STAGE[1] - G / 2 } }
  const moveTo = (p, opts = { type: 'spring', stiffness: 120, damping: 16 }) => Promise.all([
    animate(x, p.x, opts), animate(y, p.y, opts), animate(rot, p.rot ?? 0, opts),
  ])

  const puff = (cx, cy, n, kind = 'smoke', spread = 3) => {
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI * 2, sp = Math.random() * spread
      parts.current.push({
        kind, x: cx + (Math.random() - 0.5) * 20, y: cy + (Math.random() - 0.5) * 20,
        vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - (kind === 'smoke' ? 0.3 : 1.1),
        r: kind === 'smoke' ? 12 + Math.random() * 16 : 7 + Math.random() * 6,
        max: kind === 'smoke' ? 0.10 + Math.random() * 0.08 : 0.8, a: 0, life: 0,
        ttl: kind === 'smoke' ? 70 + Math.random() * 60 : 110 + Math.random() * 50,
        col: Math.random() > 0.5 ? '200,200,220' : '160,160,180',
      })
    }
  }
  const center = () => ({ cx: x.get() + G / 2, cy: y.get() + G / 2 })

  /* ── peeking loop: hop between edge spots ── */
  const hopPeek = async (next) => {
    const s = st.current
    if (s.mode !== 'peek') return
    await moveTo(offPos(s.spot), { duration: 0.45, ease: 'easeIn' })
    s.spot = next ?? (s.spot + 1 + Math.floor(Math.random() * (PEEK_SPOTS.length - 1))) % PEEK_SPOTS.length
    const o = offPos(s.spot); x.set(o.x); y.set(o.y); rot.set(o.rot)
    setBubbleSide(PEEK_SPOTS[s.spot].bubble)
    setPeekLine(pickL(PEEK_LINES))
    if (st.current.mode === 'peek') await moveTo(peekPos(s.spot, s.ducked), { type: 'spring', stiffness: 90, damping: 14 })
  }

  useEffect(() => {
    const s = st.current
    const o = offPos(0); x.set(o.x); y.set(o.y); rot.set(o.rot)
    later(() => moveTo(peekPos(0)), 1400)

    const onResize = () => { if (st.current.mode === 'peek') { const p = peekPos(st.current.spot, st.current.ducked); x.set(p.x); y.set(p.y) } }
    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onMove, { passive: true })

    const hopT = setInterval(() => { if (st.current.mode === 'peek' && !st.current.ducked && !st.current.busy) hopPeek() }, 6500)
    const idleT = setInterval(() => {
      const s2 = st.current
      if (s2.mode === 'out' && !s2.busy && Date.now() - s2.lastAct > 14000) { setM('sleep'); setMood('sleep'); setMsg(null) }
      if (s2.mode === 'sleep' && Date.now() - s2.lastAct > 32000) goBackToPeek("Fine, I'll go hide again…")
    }, 1000)

    const c = canvasRef.current, ctx = c.getContext('2d')
    let raf, t = 0
    const tick = () => {
      t++
      const a = area(), s2 = st.current
      if (a && (c.width !== a.clientWidth || c.height !== a.clientHeight)) { c.width = a.clientWidth; c.height = a.clientHeight }
      const r = a?.getBoundingClientRect()
      const gx = x.get() + G / 2, gy = y.get() + G / 2
      const mx = r ? mouse.current.x - r.left : -9999, my = r ? mouse.current.y - r.top : -9999

      // shy: duck when the cursor gets close while peeking
      if (s2.mode === 'peek' && !s2.busy) {
        const near = Math.hypot(mx - gx, my - gy) < 170
        if (near !== s2.ducked) {
          s2.ducked = near
          moveTo(peekPos(s2.spot, near), near ? { duration: 0.18, ease: 'easeOut' } : { type: 'spring', stiffness: 70, damping: 14 })
          if (near) setPeekLine(pickL(EEP_LINES))
        }
      }
      // chase mode: follow the cursor
      if (s2.mode === 'chase' && r) {
        const tx = Math.max(0, Math.min(r.width - G, mx - G / 2)), ty = Math.max(70, Math.min(r.height - G, my - G - 30))
        x.set(x.get() + (tx - x.get()) * 0.06); y.set(y.get() + (ty - y.get()) * 0.06)
        rot.set(Math.max(-20, Math.min(20, (tx - x.get()) * 0.08)))
      }
      // smoke trail + zzz
      if (s2.mode !== 'peek' && Math.random() < 0.35) {
        parts.current.push({ kind: 'smoke', x: gx + (Math.random() - 0.5) * 50, y: y.get() + G * 0.9, vx: (Math.random() - 0.5) * 0.3, vy: -0.25 - Math.random() * 0.3,
          r: 8 + Math.random() * 8, max: 0.05 + Math.random() * 0.05, a: 0, life: 0, ttl: 90 + Math.random() * 60, col: '200,200,220' })
      }
      if (s2.mode === 'sleep' && t % 50 === 0) parts.current.push({ kind: 'z', x: gx + 30, y: gy - 30, vx: 0.4, vy: -0.6, r: 10 + Math.random() * 6, max: 0.7, a: 0, life: 0, ttl: 110 })

      ctx.clearRect(0, 0, c.width, c.height)
      const P = parts.current
      for (let i = P.length - 1; i >= 0; i--) {
        const p = P[i]
        p.life++; p.x += p.vx; p.y += p.vy; p.vx *= 0.96; p.vy = p.vy * 0.97 - 0.01
        const k = p.life / p.ttl
        p.a = k < 0.15 ? (k / 0.15) * p.max : ((1 - k) / 0.85) * p.max
        if (p.life >= p.ttl) { P.splice(i, 1); continue }
        if (p.kind === 'heart') {
          const sc = p.r / 10
          ctx.save(); ctx.translate(p.x, p.y); ctx.scale(sc, sc); ctx.globalAlpha = p.a; ctx.fillStyle = 'rgb(255,170,190)'
          ctx.beginPath(); ctx.moveTo(0, 3); ctx.bezierCurveTo(-10, -5, -4, -12, 0, -6); ctx.bezierCurveTo(4, -12, 10, -5, 0, 3); ctx.fill(); ctx.restore()
        } else if (p.kind === 'z') {
          ctx.save(); ctx.globalAlpha = p.a; ctx.fillStyle = 'rgba(220,220,235,1)'; ctx.font = `700 ${p.r}px Syne, sans-serif`; ctx.fillText('z', p.x, p.y); ctx.restore()
        } else {
          p.r += 0.25
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
          g.addColorStop(0, `rgba(${p.col},${p.a})`); g.addColorStop(1, `rgba(${p.col},0)`)
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
        }
      }
      // eyes follow the cursor
      if (eyesRef.current) {
        const dx = mx - gx, dy = my - (y.get() + G * 0.42), d = Math.hypot(dx, dy) || 1, k2 = Math.min(2.5, d / 60)
        eyesRef.current.setAttribute('transform', `translate(${(dx / d) * k2} ${(dy / d) * k2})`)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf); clearInterval(hopT); clearInterval(idleT); timers.current.forEach(clearTimeout)
      window.removeEventListener('resize', onResize); window.removeEventListener('pointermove', onMove)
    }
  }, [])

  const goBackToPeek = async (line) => {
    const s = st.current
    s.busy = true
    if (line) say({ line }, 1800)
    setMood('happy')
    await wait(1200)
    const { cx, cy } = center(); puff(cx, cy, 22, 'smoke', 3.5); setShown(false)
    await wait(260)
    setM('peek'); setMood('idle'); setMsg(null); s.ducked = false
    s.spot = Math.floor(Math.random() * PEEK_SPOTS.length)
    const o = offPos(s.spot); x.set(o.x); y.set(o.y); rot.set(o.rot); scl.set(1)
    setBubbleSide(PEEK_SPOTS[s.spot].bubble); setPeekLine(pickL(PEEK_LINES)); setShown(true)
    await moveTo(peekPos(s.spot))
    s.busy = false
  }

  const comeOut = async () => {
    const s = st.current
    s.busy = true; setM('out'); setMood('happy'); setMsg(null)
    await moveTo({ ...stagePos(), rot: 0 }, { type: 'spring', stiffness: 90, damping: 13 })
    say({ line: 'You found me! Okay… click me again. 😳' }, 3000)
    later(() => setMood('idle'), 1500)
    s.busy = false
  }

  const doAction = async () => {
    const s = st.current
    // rapid clicking combo
    const now = Date.now()
    s.clicks = [...s.clicks.filter(t => now - t < 1300), now]
    if (s.clicks.length >= 5) {
      s.clicks = []; setMood('dizzy'); say({ line: 'Stop! That tickles! 😵' })
      animate(rot, [0, 720], { duration: 0.9, ease: 'easeInOut' }).then(() => rot.set(0))
      later(() => setMood('idle'), 1800); return
    }
    if (s.busy) return
    s.busy = true
    const act = ACTIONS[s.step]
    s.step = (s.step + 1) % ACTIONS.length
    if (s.step === 0) s.cycle++
    const { cx, cy } = center()
    let keepMood = false

    switch (act.key) {
      case 'teleport': {
        puff(cx, cy, 26, 'smoke', 3.5); setShown(false); await wait(280)
        const a = area(); const nx = a.clientWidth * (0.62 + Math.random() * 0.3) - G / 2, ny = a.clientHeight * (0.22 + Math.random() * 0.5) - G / 2
        x.set(nx); y.set(ny); puff(nx + G / 2, ny + G / 2, 18, 'smoke', 3); setShown(true); setMood('happy'); break
      }
      case 'flip': {
        setMood('happy'); const y0 = y.get()
        animate(y, [y0, y0 - 70, y0], { duration: 0.8, ease: 'easeInOut' })
        animate(rot, [0, 360], { duration: 0.8, ease: 'easeInOut' }).then(() => rot.set(0)); break
      }
      case 'hearts':   setMood('happy'); puff(cx, cy - 10, 12, 'heart', 1.6); break
      case 'boo': {
        setMood('boo'); puff(cx, cy, 30, 'smoke', 4.5)
        animate(scl, [1, 1.9, 1.9, 1], { duration: 1.1, times: [0, 0.2, 0.7, 1] }); break
      }
      case 'cool':     setMood('cool'); keepMood = true; break
      case 'clone':    setMood('happy'); setClones(true); puff(cx - G, cy, 10); puff(cx + G, cy, 10); later(() => { setClones(false); puff(cx - G, cy, 8); puff(cx + G, cy, 8) }, 2600); break
      case 'disguise': setMood('disguise'); keepMood = true; break
      case 'chase':    setM('chase'); setMood('happy'); later(async () => { if (st.current.mode === 'chase') { setM('out'); await moveTo({ ...stagePos(), rot: 0 }); setMood('idle') } }, 4500); break
      case 'dizzy': {
        setMood('dizzy'); const x0 = x.get()
        animate(x, [x0, x0 - 12, x0 + 12, x0 - 8, x0 + 8, x0], { duration: 0.6 })
        animate(rot, [0, -12, 12, -6, 0], { duration: 0.6 }); break
      }
      case 'vanish': {
        say(act); s.busy = false
        later(() => goBackToPeek(), 1600); return
      }
      case 'secret': setMood('happy'); puff(cx, cy, 40, 'smoke', 5); puff(cx, cy - 10, 10, 'heart', 2); break
      default: break
    }
    say(act, act.cta ? 7000 : 3000)
    if (!keepMood && act.key !== 'chase') later(() => setMood(m => (['cool', 'disguise'].includes(m) ? m : 'idle')), 2600)
    later(() => { st.current.busy = false }, 650)
  }

  const onClick = () => {
    const s = st.current
    s.lastAct = Date.now()
    if (s.mode === 'peek') { if (!s.busy) comeOut(); return }
    if (s.mode === 'sleep') { setM('out'); setMood('dizzy'); say({ line: "Huh?! I wasn't sleeping. I was… debugging." }); later(() => setMood('idle'), 1800); return }
    if (s.mode === 'chase') { setM('out'); setMood('shy'); say({ line: 'Okay okay, I stopped!' }); moveTo({ ...stagePos(), rot: 0 }); later(() => setMood('idle'), 1800); return }
    doAction()
  }
  const onHover = () => {
    const s = st.current
    s.lastAct = Date.now()
    if (s.mode === 'sleep') { setM('out'); setMood('shy'); say({ line: '…five more minutes.' }); later(() => setMood('idle'), 1800) }
    else if (s.mode === 'out' && !s.busy && mood === 'idle' && !msg) { setMood('shy'); later(() => setMood(m => (m === 'shy' ? 'idle' : m)), 1200) }
  }

  const idleHint = mode === 'peek' ? peekLine : mode === 'sleep' ? null : 'Click me!'
  const bubbleText = msg ? msg.line : idleHint
  const side = mode === 'peek' && !msg ? bubbleSide : 'top'
  const bubblePos = side === 'left'
    ? { right: '92%', top: '18%', marginRight: 6 }
    : { bottom: '100%', left: '50%', x: '-50%', marginBottom: mood === 'disguise' ? 30 : 14 }

  return (
    <div ref={areaRef} className="ghost-area" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 25 }}>
      <canvas ref={canvasRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      <motion.div style={{ x, y, rotate: rot, scale: scl, position: 'absolute', left: 0, top: 0, width: G, height: G }}>
        {/* speech bubble */}
        <AnimatePresence mode="wait">
          {shown && bubbleText && (
            <motion.div key={bubbleText + side}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'absolute', ...bubblePos, rotate: mode === 'peek' ? 18 * (PEEK_SPOTS[st.current.spot].dx) : 0, width: 'max-content', maxWidth: 240, padding: '9px 14px', borderRadius: 12, background: 'rgba(22,22,28,0.92)', border: '1px solid var(--border2)', boxShadow: '0 12px 32px rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', fontWeight: msg ? 400 : 600, lineHeight: 1.45, color: 'var(--text)', textAlign: 'center', pointerEvents: msg?.cta ? 'auto' : 'none', zIndex: 3 }}>
              {bubbleText}
              {msg?.cta && (
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ display: 'block', margin: '8px auto 0', padding: '6px 14px', borderRadius: 9999, border: 'none', cursor: 'pointer', background: 'var(--white)', color: '#0a0a0b', fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', fontWeight: 700 }}>
                  Let's Talk →
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* clones */}
        <AnimatePresence>
          {clones && [-1, 1].map(d => (
            <motion.div key={d} initial={{ opacity: 0, x: 0, scale: 0.6 }} animate={{ opacity: 0.75, x: d * G * 1.1, scale: 0.85 }} exit={{ opacity: 0, x: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 160, damping: 14 }}
              style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none' }}>
              <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: d > 0 ? 0.4 : 0.8 }}>
                <GhostBody mood="happy" id={`clone${d}`} />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* the ghost */}
        <motion.button
          onClick={onClick}
          onMouseEnter={onHover}
          aria-label="Smoke ghost. Click me to see what happens."
          animate={{ opacity: shown ? 1 : 0, scale: shown ? 1 : 0.4 }}
          transition={{ duration: 0.25 }}
          whileHover={{ scale: mode === 'peek' ? 1.04 : 1.08 }}
          whileTap={{ scale: 0.92 }}
          style={{ position: 'relative', width: G, height: G, padding: 0, border: 'none', background: 'none', cursor: 'pointer', pointerEvents: 'auto' }}
        >
          <motion.div animate={mode === 'sleep' ? { y: [6, 10, 6] } : { y: [0, -9, 0] }} transition={{ duration: mode === 'sleep' ? 4 : 3, repeat: Infinity, ease: 'easeInOut' }}>
            <GhostBody mood={mood} eyesRef={eyesRef} id="main" />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const smokeRef = useRef(null)
const title3dRef = useRef(null)
const mouseRef = useRef({ x: 0, y: 0 })
const curRef = useRef({ x: 0, y: 0 })
const rafRef = useRef(null)
const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const loop = () => {
      curRef.current.x += (mouseRef.current.x - curRef.current.x) * 0.06
      curRef.current.y += (mouseRef.current.y - curRef.current.y) * 0.06
      if (title3dRef.current) {
        title3dRef.current.style.transform = `perspective(900px) rotateX(${-curRef.current.y * 6}deg) rotateY(${curRef.current.x * 8}deg) translateZ(0)`
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  useEffect(() => {
    const canvas = smokeRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + Math.random() * 100
        this.vx = (Math.random() - 0.5) * 0.4
        this.vy = -(Math.random() * 0.6 + 0.2)
        this.radius = Math.random() * 130 + 70
        this.alpha = 0
        this.maxAlpha = Math.random() * 0.09 + 0.03
        this.life = 0
        this.maxLife = Math.random() * 400 + 300
        this.color = Math.random() > 0.5 ? '200,200,220' : '160,160,180'
      }
      update() {
        this.life++
        this.x += this.vx
        this.y += this.vy
        this.radius += 0.18
        const p = this.life / this.maxLife
        if (p < 0.2) this.alpha = (p / 0.2) * this.maxAlpha
        else if (p > 0.7) this.alpha = ((1 - p) / 0.3) * this.maxAlpha
        else this.alpha = this.maxAlpha
        if (this.life >= this.maxLife) this.reset()
      }
      draw() {
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
        g.addColorStop(0, `rgba(${this.color},${this.alpha})`)
        g.addColorStop(1, `rgba(${this.color},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particles = Array.from({ length: 20 }, () => {
      const p = new Particle()
      p.life = Math.floor(Math.random() * p.maxLife)
      return p
    })

    let raf
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      id="hero"
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect()
        mouseRef.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2
        mouseRef.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2
      }}
      onMouseLeave={() => { mouseRef.current.x = 0; mouseRef.current.y = 0 }}
      style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'clip', background: 'var(--bg)' }}
    >

      {/* Ambient smoke — canvas particles */}
      <canvas ref={smokeRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} aria-hidden="true" />

      {/* Glow orbs for depth lighting */}
      <div style={{ position: 'absolute', width: 600, height: 600, left: -200, top: '50%', transform: 'translateY(-50%)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,200,240,0.07), transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 400, height: 400, right: '15%', top: '20%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(180,180,220,0.05), transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

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
            <div
              ref={title3dRef}
              style={{ display: 'inline-block', transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              <h1 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: 'clamp(3.2rem, 9vw, 6.5rem)',
                color: 'var(--white)', lineHeight: 0.95,
                letterSpacing: '-0.04em',
                textShadow: '0 2px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4)',
              }}>
                Hi, I'm
              </h1>
              <h1 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: 'clamp(3.2rem, 9vw, 6.5rem)',
                background: 'linear-gradient(135deg, #ffffff 0%, #888898 50%, #ffffff 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 1.0, letterSpacing: '-0.04em',
                animation: 'shimmer 5s ease-in-out infinite',
                filter: 'drop-shadow(0 0 40px rgba(200,200,220,0.12))',
              }}>
                Vincent Kobe
              </h1>
            </div>
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
        </div>

      </div>

      {/* Smoke ghost character — click it! */}
      <SmokeGhost />

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
        @keyframes imgFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes imgFadeOut { from { opacity: 1; } to { opacity: 0; } }
        .ghost-area { display: none; }
        @media (min-width: 1000px) { .ghost-area { display: block; } }
        .ghost-wave { transform-origin: 82px 58px; animation: ghostWave 1.6s ease-in-out infinite; }
        @keyframes ghostWave { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-28deg) translateY(-3px); } }
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  )
}