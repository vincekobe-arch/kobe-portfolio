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
   ✏️ EDIT — Top 3 HTE choices near San Pedro, Laguna / Alabang.
   Scores are 1–5. Totals & ranking are computed automatically.
   ───────────────────────────────────────────────────────────── */
const CRITERIA = [
  { key: 'profile',    label: 'Company Profile' },
  { key: 'industry',   label: 'Industry Type (fit to my course)' },
  { key: 'reputation', label: 'Reputation' },
  { key: 'learning',   label: 'Learning Opportunities' },
  { key: 'access',     label: 'Accessibility / Location' },
  { key: 'growth',     label: 'Career Growth Potential' },
]

const COMPANIES = [
  {
    id: '1902',
    name: '1902 Software Development Corporation',
    short: '1902 Software',
    initials: '19',
    industry: 'Information Technology — Software Development',
    location: 'Asian Star Building, Filinvest Corporate City, Alabang, Muntinlupa',
    website: 'https://bossjob.ph/company/1902-software-development-corporation',
    background: 'A Danish-managed software development company based in Filinvest City, Alabang, with a young team of about 51–100 employees building software for international clients.',
    learning: ['Hands-on software development on real client projects', 'Working beside experienced developers in a small, collaborative team', 'Exposure to international (European) work standards', 'Practice with Git, code reviews, and team workflows'],
    pros: ['Pure software company — directly matches my full-stack goal', 'Very close to San Pedro, Laguna', 'Smaller team means more mentoring and responsibility'],
    cons: ['Less well-known than large corporations', 'Smaller company — fewer departments to explore'],
    access: 'Filinvest City, Alabang is a short trip from San Pedro via National Road or SLEX (roughly 20–40 minutes depending on traffic).',
    growth: 'Strong — real development experience with foreign clients builds a portfolio that leads to junior developer roles.',
    scores: { profile: 4, industry: 5, reputation: 4, learning: 5, access: 5, growth: 5 },
  },
  {
    id: 'fbsc',
    name: 'Filinvest Business Services Corporation',
    short: 'Filinvest (FBSC)',
    initials: 'FB',
    industry: 'Shared Services — Corporate IT',
    location: 'Filinvest City, Alabang, Muntinlupa',
    website: 'https://ph.jobstreet.com/job/95747553',
    background: 'The expanded shared services unit of the Filinvest Group, which began operating on January 1, 2025. Its IT team builds and maintains software that supports the group\'s businesses.',
    learning: ['Software development using Agile ceremonies (sprints, stand-ups, retrospectives)', 'Supporting enterprise business applications', 'Working with cross-functional corporate teams'],
    pros: ['Part of a large, well-known Philippine conglomerate', 'Structured Agile development process', 'Close to home'],
    cons: ['Newer unit — internship program may be less established', 'Corporate processes can be strict and slower'],
    access: 'Located in Filinvest City, Alabang — the same short commute from San Pedro.',
    growth: 'Good — exposure to enterprise systems and possible entry into the wider Filinvest Group.',
    scores: { profile: 4, industry: 4, reputation: 5, learning: 4, access: 5, growth: 4 },
  },
  {
    id: 'muntinlupa',
    name: 'City Government of Muntinlupa — Management Information Systems Office',
    short: 'Muntinlupa MIS',
    initials: 'MC',
    industry: 'Government — Local ICT Services',
    location: 'Ground Floor, Main Building, Muntinlupa City Hall, Putatan, Muntinlupa',
    website: 'https://muntinlupacity.gov.ph/?p=625',
    background: 'The city hall office in charge of Muntinlupa\'s computer systems, applications, and data. It has developed computerized systems to speed up city processes and support online transactions under the city\'s Smart City vision.',
    learning: ['Local government systems and online public services', 'Technical support, networking, and data management', 'Understanding how IT serves citizens directly'],
    pros: ['Closest location to San Pedro', 'Connected to PetUnity, which was built for Muntinlupa City', 'Meaningful public-service work'],
    cons: ['Slower, more bureaucratic processes', 'Less focus on modern web development'],
    access: 'Muntinlupa City Hall in Putatan is next to San Pedro — the shortest commute of the three.',
    growth: 'Moderate — valuable public-sector experience, but fewer paths into software development.',
    scores: { profile: 4, industry: 3, reputation: 4, learning: 3, access: 5, growth: 3 },
  },
]

// ✏️ EDIT — Final recommendation & answers to the guide questions
const RECOMMENDED_ID = '1902'
const RECOMMENDATION =
  '1902 Software Development Corporation is my top HTE choice. As a dedicated software company, it best matches my goal of becoming a full-stack developer. Its small, collaborative team means more hands-on work and mentoring, its international clients expose me to professional standards, and its Alabang location is a short commute from San Pedro. It is less famous than a large corporation, but the learning environment and career growth it offers outweigh that.'

const GUIDE_QA = [
  { q: 'Which company best matches your career goals?', a: '1902 Software Development Corporation, because its core business is software development — exactly the full-stack work I want to do.' },
  { q: 'What skills can you develop from each company?', a: '1902 Software: real client development, Git workflows, and teamwork. Filinvest (FBSC): Agile practices and enterprise systems. Muntinlupa MIS: government IT systems, technical support, and data management.' },
  { q: 'Which company offers the best learning environment?', a: '1902 Software, because a smaller team gives interns more responsibility and direct guidance from experienced developers.' },
  { q: 'Which company would you most likely choose and why?', a: '1902 Software — it scored highest overall, fits my skills in web development, and is close to home.' },
  { q: 'How will this HTE help prepare you for your future career?', a: 'It will give me real project experience, professional work habits, and a stronger portfolio, preparing me for a junior developer role after I graduate in 2027.' },
]

const MAX = CRITERIA.length * 5
const total = (c) => CRITERIA.reduce((s, k) => s + (c.scores[k.key] || 0), 0)
const rating = (c) => (total(c) / CRITERIA.length).toFixed(1)

const label = { fontSize: '0.6rem', color: 'var(--text3)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }
const card  = { background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 16 }

function Stars({ value }) {
  return (
    <span aria-label={`${value} out of 5`} style={{ letterSpacing: 2, fontSize: '0.85rem' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= Math.round(value) ? '#facc15' : 'var(--border2)' }}>★</span>
      ))}
    </span>
  )
}

function List({ items, mark = '✓', color = 'rgba(255,255,255,0.5)' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      {items.map(t => (
        <div key={t} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
          <span style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2, borderRadius: 4, background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', color }}>{mark}</span>
          <span style={{ color: 'var(--text2)', fontSize: '0.78rem', lineHeight: 1.6 }}>{t}</span>
        </div>
      ))}
    </div>
  )
}

export default function HTEEvaluation() {
  const ref = useRef(null)
  useReveal(ref)
  const [activeId, setActiveId] = useState(COMPANIES[0].id)
  const [openQ, setOpenQ] = useState(0)
  const active = COMPANIES.find(c => c.id === activeId)
  const best = COMPANIES.find(c => c.id === RECOMMENDED_ID) || [...COMPANIES].sort((a, b) => total(b) - total(a))[0]

  return (
    <section id="hte" ref={ref} style={{ padding: '140px 0', position: 'relative', background: 'var(--bg)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--border2) 30%, var(--border2) 70%, transparent)' }} />
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 900, height: 500, background: 'radial-gradient(ellipse, rgba(255,255,255,0.022) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', position: 'relative' }}>
        <div className="reveal" style={{ marginBottom: 20 }}>
          <span className="section-tag">Company &amp; HTE Evaluation</span>
        </div>

        <div style={{ marginBottom: 44 }}>
          <h2 className="reveal" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: 'var(--white)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12, transitionDelay: '0.05s' }}>
            My future{' '}
            <span style={{ background: 'linear-gradient(135deg, #ffffff 0%, #888898 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>workplace.</span>
          </h2>
          <p className="reveal" style={{ color: 'var(--text3)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: 560, transitionDelay: '0.1s' }}>
            Evaluating my top three Host Training Establishments on the criteria that matter most for my growth.
          </p>
        </div>

        {/* Evaluation criteria */}
        <div className="reveal" style={{ marginBottom: 40, transitionDelay: '0.12s' }}>
          <p style={{ ...label, marginBottom: 12 }}>Evaluation Criteria · scored 1–5</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {CRITERIA.map(c => <span key={c.key} className="pill" style={{ fontSize: '0.66rem' }}>{c.label}</span>)}
          </div>
        </div>

        {/* ── Top 3 companies — tabs ── */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10, marginBottom: 14, transitionDelay: '0.14s' }}>
          {COMPANIES.map((c, i) => {
            const on = c.id === activeId
            return (
              <button key={c.id} onClick={() => setActiveId(c.id)} aria-pressed={on} style={{
                ...card, cursor: 'pointer', textAlign: 'left', padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: 12, color: 'inherit', font: 'inherit',
                borderColor: on ? 'var(--border2)' : 'var(--border)',
                background: on ? 'rgba(255,255,255,0.06)' : 'var(--bg3)',
                boxShadow: on ? '0 12px 40px rgba(0,0,0,0.45)' : 'none', transition: 'all 0.25s',
              }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0, background: 'var(--surface)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.7rem', color: 'var(--text2)' }}>{c.initials}</div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: '0.58rem', color: 'var(--text3)', letterSpacing: '0.14em', fontWeight: 600 }}>CHOICE 0{i + 1}{c.id === best.id ? ' · TOP PICK' : ''}</p>
                  <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.86rem', color: 'var(--white)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* ── Active company detail ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ ...card, padding: '26px 24px', marginBottom: 56 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 20 }}>
              <div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: 'var(--white)' }}>{active.name}</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text3)', marginTop: 4 }}>{active.industry} · {active.location}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Stars value={Number(rating(active))} />
                <p style={{ fontSize: '0.72rem', color: 'var(--text2)', marginTop: 2 }}>Overall {rating(active)} / 5 · {total(active)}/{MAX} pts</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 }}>
              <div>
                <p style={{ ...label, marginBottom: 8 }}>Company Background</p>
                <p style={{ color: 'var(--text2)', fontSize: '0.82rem', lineHeight: 1.75, marginBottom: 10 }}>{active.background}</p>
                {active.website && <a href={active.website} target="_blank" rel="noreferrer" style={{ fontSize: '0.72rem', color: 'var(--text2)', fontWeight: 600 }}>Source ↗</a>}

                <p style={{ ...label, margin: '20px 0 10px' }}>Learning &amp; Training Opportunities</p>
                <List items={active.learning} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 14px' }}>
                    <p style={{ ...label, marginBottom: 10, color: '#4ade80' }}>Advantages</p>
                    <List items={active.pros} mark="+" color="#4ade80" />
                  </div>
                  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 14px' }}>
                    <p style={{ ...label, marginBottom: 10, color: '#f87171' }}>Disadvantages</p>
                    <List items={active.cons} mark="−" color="#f87171" />
                  </div>
                </div>
                <div>
                  <p style={{ ...label, marginBottom: 6 }}>Accessibility &amp; Convenience</p>
                  <p style={{ color: 'var(--text2)', fontSize: '0.8rem', lineHeight: 1.7 }}>{active.access}</p>
                </div>
                <div>
                  <p style={{ ...label, marginBottom: 6 }}>Potential for Career Growth</p>
                  <p style={{ color: 'var(--text2)', fontSize: '0.8rem', lineHeight: 1.7 }}>{active.growth}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Comparative analysis table ── */}
        <div className="reveal" style={{ marginBottom: 56 }}>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: 18 }}>
            Comparative analysis<span style={{ color: 'var(--text3)' }}>.</span>
          </p>
          <div style={{ ...card, overflowX: 'auto' }}>
            <table style={{ width: '100%', minWidth: 620, borderCollapse: 'collapse', fontFamily: 'DM Sans, sans-serif' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '16px 18px', ...label, borderBottom: '1px solid var(--border)' }}>Criteria</th>
                  {COMPANIES.map(c => (
                    <th key={c.id} style={{ textAlign: 'center', padding: '16px 14px', borderBottom: '1px solid var(--border)', background: c.id === best.id ? 'rgba(74,222,128,0.06)' : 'transparent' }}>
                      <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.78rem', color: 'var(--white)' }}>{c.short || c.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CRITERIA.map(k => (
                  <tr key={k.key}>
                    <td style={{ padding: '12px 18px', fontSize: '0.8rem', color: 'var(--text2)', borderBottom: '1px solid var(--border)' }}>{k.label}</td>
                    {COMPANIES.map(c => {
                      const v = c.scores[k.key]
                      return (
                        <td key={c.id} style={{ padding: '12px 14px', textAlign: 'center', borderBottom: '1px solid var(--border)', background: c.id === best.id ? 'rgba(74,222,128,0.04)' : 'transparent' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                            <div style={{ width: 60, height: 4, borderRadius: 2, background: 'var(--surface)', overflow: 'hidden' }}>
                              <motion.div initial={{ width: 0 }} whileInView={{ width: `${(v / 5) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                                style={{ height: '100%', background: c.id === best.id ? '#4ade80' : 'rgba(255,255,255,0.5)' }} />
                            </div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text)', fontWeight: 600, width: 12 }}>{v}</span>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
                <tr>
                  <td style={{ padding: '14px 18px', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: 'var(--white)' }}>Total / Rating</td>
                  {COMPANIES.map(c => (
                    <td key={c.id} style={{ padding: '14px', textAlign: 'center', background: c.id === best.id ? 'rgba(74,222,128,0.06)' : 'transparent' }}>
                      <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', color: c.id === best.id ? '#4ade80' : 'var(--white)' }}>{total(c)}/{MAX}</p>
                      <Stars value={Number(rating(c))} />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Final recommendation + guide questions ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18, alignItems: 'start' }}>
          <div className="reveal-left" style={{ ...card, padding: '28px 26px', position: 'relative', overflow: 'hidden', borderColor: 'rgba(74,222,128,0.25)' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
              <p style={label}>Final Recommendation</p>
            </div>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.35rem', color: 'var(--white)', marginBottom: 6 }}>{best.name}</h3>
            <div style={{ marginBottom: 14 }}><Stars value={Number(rating(best))} /> <span style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>{rating(best)} / 5</span></div>
            <p style={{ color: 'var(--text2)', fontSize: '0.84rem', lineHeight: 1.8 }}>{RECOMMENDATION}</p>
          </div>

          <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ ...label, marginBottom: 6 }}>Guide Questions</p>
            {GUIDE_QA.map((g, i) => {
              const on = openQ === i
              return (
                <div key={g.q} style={{ ...card, borderRadius: 12, overflow: 'hidden', borderColor: on ? 'var(--border2)' : 'var(--border)' }}>
                  <button onClick={() => setOpenQ(on ? -1 : i)} aria-expanded={on} style={{ width: '100%', padding: '13px 16px', display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', color: 'var(--text)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', fontWeight: 600 }}>
                    {g.q}
                    <span style={{ color: 'var(--text3)', transform: on ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s', flexShrink: 0 }}>+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <p style={{ padding: '0 16px 14px', color: 'var(--text3)', fontSize: '0.8rem', lineHeight: 1.75 }}>{g.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}