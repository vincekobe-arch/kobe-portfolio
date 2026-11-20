import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const row1 = [
  { name: 'React.js',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'JavaScript',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Figma',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'MySQL',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'MongoDB',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
]
const row2 = [
  { name: 'Express.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'UI/UX Design',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
  { name: 'Firebase',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'Git & GitHub',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg' },
  { name: 'REST APIs',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'Vite',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  { name: 'Framer Motion', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg' },
  { name: 'Postman',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
]

const CARDS = [
  {

    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    num: '01',
    title: 'Frontend',
    desc: 'Responsive, pixel-perfect UIs with modern React and CSS frameworks.',
    tags: ['React.js', 'HTML5', 'CSS3', 'Tailwind', 'JavaScript', 'TypeScript'],
  },
  {
    
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    num: '02',
    title: 'Backend',
    desc: 'Scalable server-side systems, APIs, and database integrations.',
    tags: ['Node.js', 'Express.js', 'MySQL', 'MongoDB', 'Firebase', 'REST APIs'],
  },
  {
    
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    num: '03',
    title: 'UI/UX Design',
    desc: 'User-centered interfaces with a sharp eye for aesthetics and usability.',
    tags: ['Figma', 'Prototyping', 'Design Systems', 'Wireframing', 'UX Research'],
  },
  {
    
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    num: '04',
    title: 'Tools',
    desc: 'Modern dev tooling and collaborative workflows for efficient delivery.',
    tags: ['Git', 'GitHub', 'Vercel', 'VS Code', 'Postman', 'Agile'],
  },
]

// ✏️ EDIT — Soft skills with short proof (Required: Skills Showcase)
const SOFT_SKILLS = [
  { icon: '◈', title: 'Communication',   desc: 'Explains technical ideas clearly in presentations, documentation, and client or teacher consultations.' },
  { icon: '◎', title: 'Teamwork',        desc: 'Collaborates with groupmates using Git & GitHub, shared task boards, and regular check-ins.' },
  { icon: '◉', title: 'Leadership',      desc: 'Group leader and lead full-stack developer of our capstone, PetUnity — planned features, divided tasks, and guided the team to an award-winning system.' },
  { icon: '⬡', title: 'Problem-Solving', desc: 'Breaks down complex requirements — like real-time rabies case mapping in PetUnity — into working solutions.' },
  { icon: '◇', title: 'Digital Literacy', desc: 'Confident with cloud deployment (Vercel, GitHub Pages), APIs, design tools, and online collaboration platforms.' },
  { icon: '△', title: 'Adaptability',    desc: 'Quickly learns new frameworks and tools and adjusts to feedback and changing requirements.' },
]

/* Icons that float in the 3D orbit */
const ORBIT_ICONS = [
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',      name: 'React',      r: 110, speed: 18, phase: 0,    tilt: 12  },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',     name: 'Node',       r: 110, speed: 18, phase: 180,  tilt: 12  },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',       name: 'Figma',      r: 145, speed: 26, phase: 60,   tilt: -18 },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', name: 'JS',    r: 145, speed: 26, phase: 240,  tilt: -18 },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', name: 'TS',    r: 80,  speed: 14, phase: 90,   tilt: 30  },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',   name: 'MongoDB',    r: 80,  speed: 14, phase: 270,  tilt: 30  },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', name: 'GitHub', r: 165, speed: 32, phase: 140, tilt: -8 },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',       name: 'MySQL',      r: 165, speed: 32, phase: 320,  tilt: -8  },
]

function OrbitCanvas() {
  const canvasRef = useRef(null)
  const frameRef  = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const SIZE = 380
    canvas.width  = SIZE
    canvas.height = SIZE
    const CX = SIZE / 2
    const CY = SIZE / 2

    // Pre-load all images
    const imgs = ORBIT_ICONS.map((o, i) => {
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = o.icon
  return img
})

    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, SIZE, SIZE)

      // Faint orbit rings
      ORBIT_ICONS.forEach((o, i) => {
        if (i % 2 !== 0) return // draw one ring per radius group
        const tiltRad = (o.tilt * Math.PI) / 180
        ctx.save()
        ctx.translate(CX, CY)
        ctx.rotate(tiltRad)
        ctx.beginPath()
        ctx.ellipse(0, 0, o.r, o.r * 0.28, 0, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255,255,255,0.055)'
        ctx.lineWidth = 0.8
        ctx.stroke()
        ctx.restore()
      })

      // Central glow
      const grd = ctx.createRadialGradient(CX, CY, 0, CX, CY, 52)
      grd.addColorStop(0, 'rgba(255,255,255,0.13)')
      grd.addColorStop(0.5, 'rgba(255,255,255,0.04)')
      grd.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.beginPath()
      ctx.arc(CX, CY, 52, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()

      // Central ring
      ctx.beginPath()
      ctx.arc(CX, CY, 38, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255,255,255,0.10)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Central text
      ctx.save()
      ctx.fillStyle = 'rgba(255,255,255,0.55)'
      ctx.font = '600 11px "DM Sans", sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('STACK', CX, CY - 7)
      ctx.restore()

      // Collect all icon positions with their depth for sorting
      const positions = ORBIT_ICONS.map((o, i) => {
        const tiltRad  = (o.tilt * Math.PI) / 180
        const angle    = ((t / o.speed) + (o.phase * Math.PI) / 180) % (Math.PI * 2)
        const ellipseX = Math.cos(angle) * o.r
        const ellipseY = Math.sin(angle) * o.r * 0.28
        // Apply tilt rotation
        const rx = ellipseX
        const ry = ellipseY * Math.cos(tiltRad) - ellipseX * Math.sin(tiltRad) * 0
        const ry2 = ellipseY * 1 + ellipseX * Math.sin(tiltRad) * 0.3

        // depth: sin of angle tells us if icon is front(+) or back(-)
        const depth = Math.sin(angle)
        return { o, i, x: CX + rx, y: CY + ry2, depth, angle }
      })

      // Sort by depth so back icons render first
      positions.sort((a, b) => a.depth - b.depth)

      positions.forEach(({ o, i, x, y, depth }) => {
        const scale = 0.72 + depth * 0.28   // 0.44 – 1.0
        const alpha = 0.35 + depth * 0.55   // 0.0 – 0.9 (never fully invisible)
        const ICON_SIZE = 28 * scale

        if (depth < -0.1) {
          // Behind center — slightly dimmed, smaller
          ctx.save()
          ctx.globalAlpha = Math.max(0.15, alpha * 0.6)
          ctx.filter = 'grayscale(60%)'
        } else {
          ctx.save()
          ctx.globalAlpha = alpha
        }

        // Subtle shadow glow for front icons
        if (depth > 0.3) {
          ctx.shadowColor  = 'rgba(255,255,255,0.18)'
          ctx.shadowBlur   = 10
        }

        // Icon bg pill
        ctx.beginPath()
        const pad = 5 * scale
        roundRect(ctx, x - ICON_SIZE / 2 - pad, y - ICON_SIZE / 2 - pad, ICON_SIZE + pad * 2, ICON_SIZE + pad * 2, 8 * scale)
        ctx.fillStyle = `rgba(30,30,36,${0.85 + depth * 0.15})`
        ctx.fill()
        ctx.strokeStyle = `rgba(255,255,255,${0.07 + depth * 0.1})`
        ctx.lineWidth = 0.8
        ctx.stroke()

        ctx.shadowBlur = 0
        if (imgs[i].complete && imgs[i].naturalWidth > 0) {
          ctx.drawImage(imgs[i], x - ICON_SIZE / 2, y - ICON_SIZE / 2, ICON_SIZE, ICON_SIZE)
        }
        ctx.restore()
      })

      t += 0.018
      frameRef.current = requestAnimationFrame(draw)
    }

    // Wait for images then start
    let loaded = 0
    const onLoad = () => { loaded++; if (loaded === 1) draw() }
    imgs.forEach(img => { img.onload = onLoad; if (img.complete) onLoad() })
    if (imgs.every(img => img.complete)) draw()

    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 380, height: 380, display: 'block', margin: '0 auto' }}
    />
  )
}

/* roundRect polyfill for canvas */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function Marquee({ items, dir = 'l' }) {
  const doubled = [...items, ...items]
  return (
    <div className="mq-wrap" style={{ padding: '6px 0' }}>
      <div className={`mq-${dir}`} style={{ gap: 10 }}>
        {doubled.map((item, i) => (
          <span key={i} className="pill" style={{ gap: 8, whiteSpace: 'nowrap' }}>
            <img src={item.icon} alt={item.name} style={{ width: 14, height: 14, objectFit: 'contain', flexShrink: 0 }} />
            {item.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const orbY     = useTransform(scrollYProgress, [0, 1], [-40, 40])
  const orbRotate = useTransform(scrollYProgress, [0, 1], [-15, 15])

  return (
    <section id="skills" ref={sectionRef} style={{ padding: '140px 0', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>

      {/* Ambient orbs */}
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 900, height: 500, background: 'radial-gradient(ellipse, rgba(255,255,255,0.022) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 60%)', pointerEvents: 'none' }} />

      {/* Top rule */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--border2) 30%, var(--border2) 70%, transparent)' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>

        {/* Header */}
        <div className="reveal" style={{ marginBottom: 20 }}>
          <span className="section-tag">Skills</span>
        </div>

        <div style={{ marginBottom: 80 }}>
          <h2 className="reveal" style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: 'var(--white)',
            letterSpacing: '-0.03em', lineHeight: 1.1,
            transitionDelay: '0.05s', marginBottom: 12,
          }}>
            My{' '}
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #888898 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Arsenal.</span>
          </h2>
          <p className="reveal" style={{ color: 'var(--text3)', fontSize: '0.92rem', lineHeight: 1.7, transitionDelay: '0.1s' }}>
            Tools and technologies I use to bring ideas to life — from design to deployment.
          </p>
        </div>

        {/* ── 3D ORBIT + MARQUEES side-by-side ── */}
        <div className="reveal" style={{
          transitionDelay: '0.12s',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 48,
          alignItems: 'center',
          marginBottom: 80,
        }}>

          {/* Left: 3D orbit canvas */}
          <motion.div
            style={{ y: orbY, rotateZ: orbRotate, position: 'relative' }}
          >
            {/* Faint outer glow ring */}
            <div style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <OrbitCanvas />
          </motion.div>

          {/* Right: text block + marquees */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <p style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 700,
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--white)',
                letterSpacing: '-0.02em', marginBottom: 10,
              }}>
                Full-stack capabilities,<br />
                <span style={{ color: 'var(--text3)', fontWeight: 500, fontSize: '0.95em' }}>
                  end-to-end.
                </span>
              </p>
              <p style={{ color: 'var(--text3)', fontSize: '0.88rem', lineHeight: 1.8, maxWidth: 380 }}>
                From data layer to polished UI — every layer of the stack is territory I work in with confidence and care.
              </p>
            </div>

            

            {/* Marquees */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Marquee items={row1} dir="l" />
              <Marquee items={row2} dir="r" />
            </div>
          </div>
        </div>

        {/* ── Cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
          {CARDS.map((c, i) => (
            <motion.div key={c.title} className="reveal-scale" style={{ transitionDelay: `${0.08 + i * 0.07}s` }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <div style={{
                background: 'var(--bg3)', borderRadius: 16, padding: '26px 22px',                border: '1px solid var(--border)', height: '100%',
                position: 'relative', overflow: 'hidden',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {/* subtle top-left gradient per card */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, width: 120, height: 120,
                  background: 'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'var(--bg3)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <img src={c.icon} alt={c.title} style={{ width: 24, height: 24, objectFit: 'contain', filter: c.title === 'Tools' ? 'invert(1)' : 'none' }} />
                  </div>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.72rem', fontWeight: 700, color: 'var(--border3)', letterSpacing: '0.1em' }}>{c.num}</span>
                </div>

                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: 'var(--white)', marginBottom: 8 }}>{c.title}</h3>
                <p style={{ color: 'var(--text3)', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: 18 }}>{c.desc}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {c.tags.map((t) => (
                    <span key={t} className="pill" style={{ fontSize: '0.64rem' }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Soft Skills ── */}
        <div style={{ marginTop: 90 }}>
          <div className="reveal" style={{ marginBottom: 28 }}>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: 8 }}>
              Soft skills,<br />
              <span style={{ color: 'var(--text3)', fontWeight: 500, fontSize: '0.95em' }}>the human side of the work.</span>
            </p>
            <p style={{ color: 'var(--text3)', fontSize: '0.88rem', lineHeight: 1.8, maxWidth: 480 }}>
              Great software is built by people who communicate, collaborate, and solve problems together.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {SOFT_SKILLS.map((s, i) => (
              <motion.div key={s.title} className="reveal-scale" style={{ transitionDelay: `${0.06 + i * 0.06}s` }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 16, padding: '22px 20px', height: '100%', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text2)' }}>{s.icon}</div>
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.98rem', color: 'var(--white)' }}>{s.title}</h3>
                  </div>
                  <p style={{ color: 'var(--text3)', fontSize: '0.8rem', lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}