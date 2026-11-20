/* ✏️ EDIT — Cite every source of information and images you used. */
const SOURCES = [
  { group: 'Company Information (HTE Evaluation)', items: [
    { name: '1902 Software Development Corporation — Bossjob company profile', url: 'https://bossjob.ph/company/1902-software-development-corporation' },
    { name: '1902 Software Development Corporation — Kalibrr company profile', url: 'https://www.kalibrr.com/id-ID/c/1902-software-development-corporation/jobs' },
    { name: 'Filinvest Business Services Corporation — JobStreet job listing', url: 'https://ph.jobstreet.com/job/95747553' },
    { name: 'City Government of Muntinlupa — MIS Office profile', url: 'https://muntinlupacity.gov.ph/?p=625' },
    { name: 'Manila Bulletin — Muntinlupa city hall computer system upgrade (2023)', url: 'https://mb.com.ph/2023/7/8/muntinlupa-city-hall-set-to-undergo-computer-communication-system-upgrade' },
  ]},
  { group: 'Icons, Images & Media', items: [
    { name: 'Devicon — technology icons (MIT License)',       url: 'https://devicon.dev' },
    { name: 'Microlink — website preview screenshots',        url: 'https://microlink.io' },
    { name: 'Profile photo, certificates & Figma designs — own work', url: '' },
    { name: 'Product photos in Figma designs — used for educational, non-commercial mockups', url: '' },
  ]},
  { group: 'Fonts & Libraries', items: [
    { name: 'Google Fonts — Syne & DM Sans', url: 'https://fonts.google.com' },
    { name: 'React',                          url: 'https://react.dev' },
    { name: 'Framer Motion',                  url: 'https://motion.dev' },
    { name: 'Tailwind CSS',                   url: 'https://tailwindcss.com' },
  ]},
]

export default function References() {
  return (
    <section id="references" style={{ padding: '60px 0 70px', background: 'var(--bg)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, var(--border2) 30%, var(--border2) 70%, transparent)' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>
        <p style={{ fontSize: '0.6rem', color: 'var(--text3)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 22 }}>Sources &amp; Credits</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 28 }}>
          {SOURCES.map(g => (
            <div key={g.group}>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text)', marginBottom: 10 }}>{g.group}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {g.items.map(i => (
                  <li key={i.name} style={{ fontSize: '0.74rem', color: 'var(--text3)', lineHeight: 1.6 }}>
                    {i.url
                      ? <a href={i.url} target="_blank" rel="noreferrer" style={{ color: 'var(--text3)', textDecoration: 'underline', textUnderlineOffset: 3 }}>{i.name}</a>
                      : i.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}