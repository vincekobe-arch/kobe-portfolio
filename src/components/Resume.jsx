import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

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
   ✏️ EDIT — your resume details.
   Put your PDF resume in /public/resume.pdf for the download button.
   ───────────────────────────────────────────────────────────── */
const PERSONAL = [
  { label: 'Full Name',   value: 'Vincent Kobe Casantusan' },
  { label: 'Address',     value: 'San Pedro City, Laguna, Philippines' },
  { label: 'Email',       value: 'cvincekobe@gmail.com' },
  { label: 'Phone',       value: '0951 236 2588' },
  { label: 'Birthday',    value: 'January 11, 2005' },
  { label: 'Nationality', value: 'Filipino' },
  { label: 'Languages',   value: 'English, Filipino' },
]

const EDUCATION = [
  { level: 'Tertiary',           school: 'STI College Alabang',                  detail: 'Bachelor of Science in Information Technology · 4th Year', years: '2023 – 2027 (expected)' },
  { level: 'Senior High School', school: 'AMA Computer Learning Center San Pedro', detail: 'Information and Communications Technology (ICT) Strand',                                                       years: '2021 – 2023' },
  { level: 'Junior High School', school: 'Pacita Complex National High School',  detail: '',                                                       years: '2017 – 2021' },
]

const RESUME_SKILLS = [
  'React.js', 'Node.js', 'Java', 'Express.js', 'JavaScript', 'TypeScript', 'MySQL', 'MongoDB',
  'Tailwind CSS', 'Figma', 'Git & GitHub', 'REST APIs', 'Communication', 'Teamwork', 'Problem-Solving',
]

const ACHIEVEMENTS = [
  'Best in User Interface Award — PetUnity, STI College Alabang (December 2025)',
  'Group Leader & Lead Full-Stack Developer of our capstone project, PetUnity',
  'Built and deployed 6 live web projects (Vercel & GitHub Pages)',
]

const CERTIFICATIONS = [
  { name: 'Java Fundamentals — Award of Course Completion', org: 'Oracle Academy', year: '2024' },
  { name: 'Cyber Security — Certificate of Participation',  org: 'STI College Alabang', year: '2024' },
]

const label = { fontSize: '0.6rem', color: 'var(--text3)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }
const card  = { background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 16, padding: '22px 22px' }

function CheckItem({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
      <div style={{ width: 14, height: 14, marginTop: 3, borderRadius: 4, flexShrink: 0, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="7" height="6" viewBox="0 0 7 6" fill="none"><path d="M1 3l1.5 1.5L6 1" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <span style={{ color: 'var(--text2)', fontSize: '0.8rem', lineHeight: 1.6 }}>{children}</span>
    </div>
  )
}

export default function Resume() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="resume" ref={ref} style={{ padding: '140px 0', position: 'relative', background: 'var(--bg)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--border2) 30%, var(--border2) 70%, transparent)' }} />
      <div style={{ position: 'absolute', top: '25%', left: '-8%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative' }}>
        <div className="reveal" style={{ marginBottom: 20 }}>
          <span className="section-tag">Resume / CV</span>
        </div>

        <div style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <h2 className="reveal" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: 'var(--white)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12, transitionDelay: '0.05s' }}>
              My{' '}
              <span style={{ background: 'linear-gradient(135deg, #ffffff 0%, #888898 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>credentials.</span>
            </h2>
            <p className="reveal" style={{ color: 'var(--text3)', fontSize: '0.9rem', transitionDelay: '0.1s' }}>
              Education, skills, achievements &amp; certifications at a glance.
            </p>
          </div>
          <a href="/resume.pdf" download className="btn btn-primary reveal" style={{ transitionDelay: '0.15s', textDecoration: 'none' }}>
            Download CV (PDF) ↓
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18, alignItems: 'start' }}>

          {/* LEFT — Personal info */}
          <div className="reveal-left" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={card}>
              <p style={{ ...label, marginBottom: 16 }}>Personal Information</p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {PERSONAL.map((p, i) => (
                  <div key={p.label} style={{ display: 'flex', gap: 12, padding: '10px 0', borderTop: i ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text3)', fontWeight: 600, width: 92, flexShrink: 0 }}>{p.label}</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text)', wordBreak: 'break-word' }}>{p.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={card}>
              <p style={{ ...label, marginBottom: 14 }}>Skills</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {RESUME_SKILLS.map(s => <span key={s} className="pill" style={{ fontSize: '0.64rem' }}>{s}</span>)}
              </div>
            </div>
          </div>

          {/* RIGHT — Education, achievements, certs */}
          <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={card}>
              <p style={{ ...label, marginBottom: 18 }}>Educational Background</p>
              <div style={{ position: 'relative', paddingLeft: 20 }}>
                <div style={{ position: 'absolute', left: 4, top: 6, bottom: 6, width: 1, background: 'var(--border2)' }} />
                {EDUCATION.map((e, i) => (
                  <motion.div key={e.level} whileHover={{ x: 4 }} style={{ position: 'relative', marginBottom: i < EDUCATION.length - 1 ? 20 : 0 }}>
                    <div style={{ position: 'absolute', left: -20, top: 5, width: 9, height: 9, borderRadius: '50%', background: i === 0 ? '#4ade80' : 'var(--surface)', border: '1px solid var(--border2)', boxShadow: i === 0 ? '0 0 8px #4ade80' : 'none' }} />
                    <p style={{ fontSize: '0.6rem', color: 'var(--text3)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>{e.level} · {e.years}</p>
                    <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--white)', marginTop: 3 }}>{e.school}</p>
                    {e.detail && <p style={{ fontSize: '0.8rem', color: 'var(--text2)', marginTop: 2 }}>{e.detail}</p>}
                  </motion.div>
                ))}
              </div>
            </div>

            <div style={card}>
              <p style={{ ...label, marginBottom: 14 }}>Achievements</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {ACHIEVEMENTS.map(a => <CheckItem key={a}>{a}</CheckItem>)}
              </div>
            </div>

            <div style={card}>
              <p style={{ ...label, marginBottom: 14 }}>Certifications</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {CERTIFICATIONS.map((c, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '10px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
                    <div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: 500 }}>{c.name}</p>
                      <p style={{ fontSize: '0.7rem', color: 'var(--text3)', marginTop: 2 }}>{c.org}</p>
                    </div>
                    <span className="pill" style={{ fontSize: '0.6rem', flexShrink: 0 }}>{c.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}