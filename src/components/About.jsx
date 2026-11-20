import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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

const FACTS = [
  { icon: '◈', label: 'Education', value: 'BSIT · STI College Alabang' },
  { icon: '◎', label: 'Based in',  value: 'San Pedro, Laguna' },
  { icon: '◉', label: 'Role',      value: 'Full-Stack Dev & Designer' },
  { icon: '⬡', label: 'Seeking',   value: 'Work Immersion / OJT' },
]

// ✏️ EDIT if needed — Career objective & work immersion goals (Required: Professional Profile)
const CAREER_OBJECTIVE =
  'To gain hands-on industry experience as a full-stack developer and UI/UX designer, applying my skills in modern web technologies while learning professional workflows, teamwork, and the standards of a real IT organization.'

const IMMERSION_GOALS = [
  'Work on real-world projects within a professional development team',
  'Learn industry workflows — Agile, code reviews, version control, and testing',
  'Strengthen communication and collaboration with supervisors and co-workers',
  'Understand how businesses plan, build, and maintain software products',
  'Build work ethics, discipline, and professionalism for my future career',
]



/* ── Animated 3D geometric mesh ── */
function GeometricMesh() {
  const canvasRef = useRef(null)
  const frameRef  = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = 320, H = 320
    canvas.width = W; canvas.height = H

    // Icosahedron-like vertices projected in 3D
    const phi = (1 + Math.sqrt(5)) / 2
    const verts = [
      [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
      [0, -1,  phi], [0,  1,  phi], [0, -1, -phi], [0,  1, -phi],
      [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1],
    ].map(([x,y,z]) => { const l = Math.sqrt(x*x+y*y+z*z); return [x/l, y/l, z/l] })

    const edges = [
      [0,1],[0,5],[0,7],[0,10],[0,11],
      [1,5],[1,7],[1,8],[1,9],
      [2,3],[2,4],[2,10],[2,11],[2,6],
      [3,4],[3,6],[3,8],[3,9],
      [4,5],[4,9],[4,11],
      [5,9],[5,11],
      [6,7],[6,8],[6,10],
      [7,8],[7,10],
      [8,9],[10,11],
    ]

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      t += 0.004

      const cosX = Math.cos(t * 0.7), sinX = Math.sin(t * 0.7)
      const cosY = Math.cos(t),       sinY = Math.sin(t)
      const cosZ = Math.cos(t * 0.4), sinZ = Math.sin(t * 0.4)

      const project = ([x, y, z]) => {
        // rotate Y
        let x1 = x * cosY - z * sinY, z1 = x * sinY + z * cosY
        // rotate X
        let y1 = y * cosX - z1 * sinX, z2 = y * sinX + z1 * cosX
        // rotate Z
        let x2 = x1 * cosZ - y1 * sinZ, y2 = x1 * sinZ + y1 * cosZ
        const fov = 3.5, scale = W * 0.36
        const pz = fov + z2
        return [W/2 + (x2 / pz) * scale, H/2 + (y2 / pz) * scale, z2]
      }

      const projected = verts.map(project)

      // Draw edges
      edges.forEach(([a, b]) => {
        const [ax, ay, az] = projected[a]
        const [bx, by, bz] = projected[b]
        const depth = ((az + bz) / 2 + 1) / 2
        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.lineTo(bx, by)
        ctx.strokeStyle = `rgba(255,255,255,${0.04 + depth * 0.14})`
        ctx.lineWidth = 0.6 + depth * 0.5
        ctx.stroke()
      })

      // Draw vertices
      projected.forEach(([x, y, z]) => {
        const depth = (z + 1) / 2
        const r = 1.8 + depth * 2
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${0.15 + depth * 0.45})`
        ctx.fill()
        // glow
        if (depth > 0.6) {
          ctx.beginPath()
          ctx.arc(x, y, r + 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255,255,255,${(depth - 0.6) * 0.12})`
          ctx.fill()
        }
      })

      frameRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return <canvas ref={canvasRef} style={{ width: 320, height: 320, display: 'block' }} />
}

export default function About() {
  const ref = useRef(null)
  useReveal(ref)
  const [imgError, setImgError] = useState(false)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY        = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const imgRotateY  = useTransform(scrollYProgress, [0, 0.5, 1], ['-18deg', '0deg', '10deg'])
  const imgRotateX  = useTransform(scrollYProgress, [0, 0.5, 1], ['12deg', '0deg', '-8deg'])
  const imgScale    = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.88, 1, 1, 0.94])
  const frameRotateY = useTransform(scrollYProgress, [0, 0.5, 1], ['-10deg', '0deg', '6deg'])
  const quoteRotX   = useTransform(scrollYProgress, [0.2, 0.6], ['16deg', '0deg'])
  const quoteZ      = useTransform(scrollYProgress, [0.2, 0.6], [-50, 0])
  const factRotY    = useTransform(scrollYProgress, [0.3, 0.7], ['12deg', '0deg'])
  const factZ       = useTransform(scrollYProgress, [0.3, 0.7], [-40, 0])
  const orbX        = useTransform(scrollYProgress, [0, 1], [0, 40])
  const orbY        = useTransform(scrollYProgress, [0, 1], [0, -60])
  const meshY       = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const meshRotate  = useTransform(scrollYProgress, [0, 1], [-10, 10])

  return (
    <section id="about" ref={ref} style={{ padding: '140px 0', position: 'relative', background: 'var(--bg)', overflow: 'hidden' }}>

      {/* Top rule */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--border2) 30%, var(--border2) 70%, transparent)' }} />

      {/* Ambient orbs */}
      <motion.div style={{ x: orbX, y: orbY, position: 'absolute', top: '10%', right: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <motion.div style={{ x: orbX, y: orbY, position: 'absolute', bottom: '5%', left: '0%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)', borderRadius: '50%', pointerEvents: 'none' }} />

      {/* 3D mesh — top right background decoration */}
      <motion.div style={{
        y: meshY, rotate: meshRotate,
        position: 'absolute', top: '-60px', right: '-60px',
        opacity: 0.45, pointerEvents: 'none',
      }}>
        <GeometricMesh />
      </motion.div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>

        <div className="reveal" style={{ marginBottom: 52 }}>
          <span className="section-tag">About Me</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 72, alignItems: 'center' }}>

          {/* ── LEFT: Image + mesh orb ── */}
          <div className="reveal-left" style={{ transitionDelay: '0.05s' }}>
            <div style={{ position: 'relative', maxWidth: 360, perspective: 1000, perspectiveOrigin: '50% 50%' }}>

              {/* offset shadow frame */}
              <motion.div style={{
                rotateY: frameRotateY,
                position: 'absolute', top: 14, left: 14, right: -14, bottom: -14,
                borderRadius: 18, background: 'var(--surface)',
                border: '1px solid var(--border)', zIndex: 0,
                transformStyle: 'preserve-3d',
              }} />

              {/* photo */}
              <motion.div style={{ y: imgY, rotateY: imgRotateY, rotateX: imgRotateX, scale: imgScale, position: 'relative', zIndex: 1, transformStyle: 'preserve-3d' }}>
                <div style={{
                  borderRadius: 18, overflow: 'hidden', aspectRatio: '4/5',
                  border: '1px solid var(--border2)',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
                  background: 'var(--surface)',
                }}>
                  {!imgError ? (
                    <img src="/profile.png" alt="Vincent Kobe Casantusan" onError={() => setImgError(true)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%', minHeight: 340,
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      background: 'linear-gradient(145deg, var(--bg3) 0%, var(--surface) 100%)',
                    }}>
                      <div style={{
                        width: 90, height: 90, borderRadius: '50%',
                        background: 'var(--bg3)', border: '1px solid var(--border2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 28,
                        color: 'var(--text2)', marginBottom: 16,
                      }}>VK</div>
                      <p style={{ color: 'var(--text3)', fontSize: '0.75rem', fontStyle: 'italic' }}>profile.png</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* floating badge — bottom left */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                style={{
                  position: 'absolute', bottom: 24, left: -20, zIndex: 3,
                  background: 'var(--surface)',
                  border: '1px solid var(--border2)',
                  borderRadius: 12,
                  padding: '10px 14px',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(12px)',
                  display: 'flex', alignItems: 'center', gap: 10,
                  cursor: 'default',
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.72rem', color: 'var(--white)', lineHeight: 1 }}>Open for Work Immersion</p>
                  <p style={{ fontSize: '0.6rem', color: 'var(--text3)', marginTop: 3 }}>BS Information Technology</p>
                </div>
              </motion.div>

              

            </div>
          </div>

          {/* ── RIGHT: Content ── */}
          <div>
            <h2 className="reveal-right" style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              lineHeight: 1.1, color: 'var(--white)',
              letterSpacing: '-0.03em', marginBottom: 28,
              transitionDelay: '0.05s',
              textShadow: '0 4px 24px rgba(0,0,0,0.4)',
            }}>
              Building things<br />
              <span style={{ background: 'linear-gradient(135deg, #ffffff 0%, #888898 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                that matter.
              </span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
              {[
                <>I'm <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Vincent Kobe Casantusan</strong>, a developer and UI/UX designer from the Philippines, driven to build digital products that are as functional as they are beautiful.</>,
                <>As group leader and lead full-stack developer of our capstone, <strong style={{ color: 'var(--text)', fontWeight: 600 }}>PetUnity</strong>, I helped build a system that won the Best in User Interface Award. My craft spans the full stack — from database architecture to pixel-perfect interfaces. I believe the best digital experiences emerge where engineering discipline meets design precision.</>,
                <>When I'm not shipping code, I'm studying design systems, exploring new tech, and thinking about how software can genuinely improve people's lives.</>,
              ].map((text, i) => (
                <p key={i} className="reveal-right"
                  style={{ color: 'var(--text3)', lineHeight: 1.85, fontSize: '0.93rem', transitionDelay: `${0.1 + i * 0.08}s` }}>
                  {text}
                </p>
              ))}
            </div>

            {/* Career Objective */}
            <div className="reveal-right" style={{
              transitionDelay: '0.28s',
              background: 'var(--bg3)', borderRadius: 12, padding: '18px 20px', marginBottom: 12,
              border: '1px solid var(--border)', boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
            }}>
              <p style={{ fontSize: '0.63rem', color: 'var(--text3)', letterSpacing: '0.18em', fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>Career Objective</p>
              <p style={{ color: 'var(--text2)', lineHeight: 1.75, fontSize: '0.86rem' }}>{CAREER_OBJECTIVE}</p>
            </div>

            {/* Work Immersion Goals */}
            <div className="reveal-right" style={{
              transitionDelay: '0.3s',
              background: 'var(--bg3)', borderRadius: 12, padding: '18px 20px', marginBottom: 12,
              border: '1px solid var(--border)', boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
            }}>
              <p style={{ fontSize: '0.63rem', color: 'var(--text3)', letterSpacing: '0.18em', fontWeight: 600, textTransform: 'uppercase', marginBottom: 10 }}>Work Immersion Goals</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {IMMERSION_GOALS.map((g) => (
                  <div key={g} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                    <div style={{ width: 14, height: 14, marginTop: 3, borderRadius: 4, flexShrink: 0, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="7" height="6" viewBox="0 0 7 6" fill="none"><path d="M1 3l1.5 1.5L6 1" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{ color: 'var(--text2)', fontSize: '0.8rem', lineHeight: 1.6 }}>{g}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Philosophy quote */}
            <motion.div className="reveal-right" style={{
              rotateX: quoteRotX, translateZ: quoteZ,
              transformStyle: 'preserve-3d', transformOrigin: 'center top', perspective: 600,
              transitionDelay: '0.32s',
              background: 'var(--bg3)', borderRadius: 12,
padding: '18px 20px', marginBottom: 28,
border: '1px solid var(--border)',
              borderLeftWidth: 2, borderLeftColor: 'var(--text3)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
            }}>
              <p style={{ fontSize: '0.63rem', color: 'var(--text3)', letterSpacing: '0.18em', fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>Philosophy</p>
              <p style={{ color: 'var(--text2)', fontStyle: 'italic', lineHeight: 1.75, fontSize: '0.88rem' }}>
                "Design is not just how it looks — it's how it works, how it feels, and the problem it solves."
              </p>
            </motion.div>

            {/* Quick facts */}
            <motion.div className="reveal-right" style={{
              rotateY: factRotY, translateZ: factZ,
              transformStyle: 'preserve-3d', transformOrigin: 'left center', perspective: 700,
              transitionDelay: '0.4s',
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
            }}>
              {FACTS.map((f) => (
                <motion.div key={f.label}
                  whileHover={{ rotateY: 8, rotateX: -4, translateZ: 16, scale: 1.03, transition: { duration: 0.22, ease: 'easeOut' } }}
                  style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px', transformStyle: 'preserve-3d', transition: 'border-color 0.2s', cursor: 'default' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border2)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <span style={{ fontSize: '0.9rem', color: 'var(--text3)' }}>{f.icon}</span>
                  <p style={{ fontSize: '0.58rem', color: 'var(--text3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4, fontWeight: 600 }}>{f.label}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text)', fontWeight: 500, marginTop: 2 }}>{f.value}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes fallAbout {
          0%   { transform: translateY(-5px); opacity: 0; }
          10%  { opacity: 0.7; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(80vh); opacity: 0; }
        }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.6)} }
      `}</style>
    </section>
  )
}