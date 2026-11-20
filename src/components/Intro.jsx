import { useEffect, useState } from 'react'

export default function Intro({ onDone }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 500)
    const t3 = setTimeout(() => setPhase(3), 2600)
    const t4 = setTimeout(() => onDone(), 3400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4) }
  }, [])

  return (
    <div
      id="intro-overlay"
      className={phase === 3 ? 'hide' : ''}
      style={{ backgroundColor: '#0a0a0b', backgroundImage: 'none' }}
    >
      {/* Matching smoke orbs from Hero */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="intro-smoke">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.008" numOctaves="4" seed="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="90" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="28" result="blurred" />
            <feColorMatrix in="blurred" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 2.2 -0.3" />
          </filter>
          <filter id="intro-smoke2">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.01" numOctaves="3" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="70" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="22" result="blurred" />
            <feColorMatrix in="blurred" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.8 -0.25" />
          </filter>
        </defs>
        <ellipse cx="75%" cy="15%" rx="340" ry="220" fill="rgba(255,255,255,0.05)" filter="url(#intro-smoke)" />
        <ellipse cx="82%" cy="5%"  rx="200" ry="130" fill="rgba(255,255,255,0.03)" filter="url(#intro-smoke2)" />
        <ellipse cx="8%"  cy="88%" rx="280" ry="180" fill="rgba(255,255,255,0.03)" filter="url(#intro-smoke)" />
      </svg>

      {/* Subtle dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
      }} />

      {/* Main content */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 24px' }}>

        

        {/* Name */}
        <div style={{ overflow: 'hidden', marginBottom: 6 }}>
          <h1 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(3rem, 9vw, 6rem)',
            fontWeight: 800,
            color: 'var(--white)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'none' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(.16,1,.3,1) 0.1s',
          }}>
            Vince Kobe
          </h1>
        </div>

        {/* Gradient name underline */}
        <div style={{
          width: phase >= 2 ? '100%' : '0%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, var(--border3), transparent)',
          margin: '0 auto 24px',
          maxWidth: 420,
          transition: 'width 0.9s cubic-bezier(.16,1,.3,1) 0.3s',
        }} />

        {/* Role */}
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 'clamp(0.78rem, 2vw, 0.95rem)',
          color: 'var(--text3)',
          letterSpacing: '0.08em',
          fontWeight: 400,
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'none' : 'translateY(8px)',
          transition: 'all 0.8s cubic-bezier(.16,1,.3,1) 0.2s',
        }}>
          Full-Stack Developer &amp; UI/UX Designer
        </p>

        {/* Loader bar */}
        <div style={{
          marginTop: 52,
          width: 80,
          height: 1,
          background: 'var(--border)',
          margin: '52px auto 0',
          position: 'relative',
          overflow: 'hidden',
          opacity: phase < 3 ? 1 : 0,
          transition: 'opacity 0.3s',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
            animation: 'introLoader 1.1s ease-in-out infinite',
          }} />
        </div>

        {/* Counter dots */}
        <div style={{
          display: 'flex', gap: 6, justifyContent: 'center',
          marginTop: 20,
          opacity: phase >= 1 ? 1 : 0,
          transition: 'opacity 0.5s 0.4s',
        }}>
          {[0, 1, 2].map((d) => (
            <div key={d} style={{
              width: d === 0 ? 16 : 4,
              height: 4,
              borderRadius: 2,
              background: d === 0 ? 'var(--text2)' : 'var(--border2)',
              transition: 'all 0.4s',
            }} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes introLoader {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  )
}