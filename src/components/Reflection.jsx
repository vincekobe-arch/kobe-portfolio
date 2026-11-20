import { useRef, useEffect } from 'react'
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

const QUESTION = 'How has preparing for Work Immersion helped me understand my career goals and future professional responsibilities?'

// ✏️ EDIT — Reflection (250–300 words)
const REFLECTION = [
  'Preparing for Work Immersion has made me look at my career with more honesty and direction. Before this, I saw programming mainly as building projects I enjoyed. Evaluating real companies as possible Host Training Establishments changed that view. I had to ask what kind of environment would help me grow, what skills employers expect, and where my strengths in full-stack development and UI/UX design could be useful to others.',
  'Researching HTEs showed me that the industry values more than technical skill. Companies look for interns who communicate clearly, meet deadlines, accept feedback, and work well in teams. Leading my capstone group as the lead full-stack developer of PetUnity taught me some of this already. I had to divide tasks, guide my teammates, and make sure our system was reliable and easy to use. Winning the Best in User Interface Award was rewarding, but it also reminded me that my work carries responsibility because real people depend on it.',
  'Creating this portfolio made me reflect on my growth. Gathering my projects and certificates in one place showed how far I have come, but also what I still need to learn, such as professional workflows, testing, and documentation.',
  'My career goal is now clearer: I want to become a full-stack developer who builds products that solve real problems for communities and businesses. Work Immersion is my first step. As a future professional, I am responsible not only for doing my tasks well, but also for representing my school, respecting workplace rules, protecting the data I handle, and continuing to learn. I am ready to take that step with discipline, curiosity, and commitment.',
]

// ✏️ EDIT — Bonus: Career Development Plan (3–5 years)
const CAREER_PLAN = [
  { year: '2027', title: 'Work Immersion & Graduation', desc: 'Complete my OJT at my chosen HTE, finish my capstone, and graduate with a BS in Information Technology.' },
  { year: '2028', title: 'Junior Full-Stack Developer', desc: 'Land my first developer role, master professional workflows, and earn a cloud or web certification.' },
  { year: '2029', title: 'Building Expertise', desc: 'Lead features end-to-end, deepen my UI/UX skills, and contribute to open-source projects.' },
  { year: '2030', title: 'Mid-Level Developer', desc: 'Mentor new developers, take on system design responsibilities, and grow my professional network.' },
  { year: '2031', title: 'Senior Dev / Product Builder', desc: 'Work toward a senior or lead role and build digital products that serve Filipino communities.' },
]

const wordCount = REFLECTION.join(' ').trim().split(/\s+/).length

export default function Reflection() {
  const ref = useRef(null)
  useReveal(ref)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineScale = useTransform(scrollYProgress, [0.45, 0.8], [0, 1])

  return (
    <section id="reflection" ref={ref} style={{ padding: '140px 0', position: 'relative', background: 'var(--bg)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--border2) 30%, var(--border2) 70%, transparent)' }} />
      <div style={{ position: 'absolute', top: '5%', right: '-6%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative' }}>
        <div className="reveal" style={{ marginBottom: 20 }}>
          <span className="section-tag">Reflection</span>
        </div>

        <h2 className="reveal" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: 'var(--white)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 32, transitionDelay: '0.05s' }}>
          Looking{' '}
          <span style={{ background: 'linear-gradient(135deg, #ffffff 0%, #888898 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ahead.</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start', marginBottom: 100 }}>
          {/* Question */}
          <div className="reveal-left" style={{ position: 'sticky', top: 120 }}>
            <div style={{ background: 'var(--bg3)', borderRadius: 12, padding: '22px 22px', border: '1px solid var(--border)', borderLeftWidth: 2, borderLeftColor: 'var(--text3)', boxShadow: '0 8px 40px rgba(0,0,0,0.35)' }}>
              <p style={{ fontSize: '0.63rem', color: 'var(--text3)', letterSpacing: '0.18em', fontWeight: 600, textTransform: 'uppercase', marginBottom: 10 }}>Guide Question</p>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--white)', lineHeight: 1.5, fontSize: '1.05rem' }}>"{QUESTION}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--surface)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.6rem', color: 'var(--text2)' }}>VK</div>
                <p style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>Vincent Kobe Casantusan · {wordCount} words</p>
              </div>
            </div>
          </div>

          {/* Reflection text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {REFLECTION.map((p, i) => (
              <p key={i} className="reveal-right" style={{ color: i === 0 ? 'var(--text2)' : 'var(--text3)', lineHeight: 1.9, fontSize: '0.93rem', transitionDelay: `${0.08 + i * 0.06}s` }}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* ── Career Development Plan ── */}
        <div className="reveal" style={{ marginBottom: 36 }}>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: 8 }}>
            Career development plan,<br />
            <span style={{ color: 'var(--text3)', fontWeight: 500, fontSize: '0.95em' }}>the next five years.</span>
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 22, height: 1, background: 'var(--border)' }} />
          <motion.div style={{ position: 'absolute', left: 0, right: 0, top: 22, height: 1, background: 'linear-gradient(90deg, #4ade80, rgba(255,255,255,0.5))', scaleX: lineScale, transformOrigin: 'left' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
            {CAREER_PLAN.map((c, i) => (
              <motion.div key={c.year} className="reveal-up" style={{ transitionDelay: `${0.06 + i * 0.08}s`, position: 'relative', paddingTop: 44 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <div style={{ position: 'absolute', top: 16, left: 18, width: 13, height: 13, borderRadius: '50%', background: i === 0 ? '#4ade80' : 'var(--surface)', border: '1px solid var(--border2)', boxShadow: i === 0 ? '0 0 10px #4ade80' : 'none' }} />
                <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 14, padding: '16px 16px 18px', height: '100%' }}>
                  <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: 'var(--white)' }}>{c.year}</p>
                  <p style={{ fontSize: '0.62rem', color: 'var(--text3)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, margin: '4px 0 8px' }}>{c.title}</p>
                  <p style={{ color: 'var(--text3)', fontSize: '0.78rem', lineHeight: 1.7 }}>{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}