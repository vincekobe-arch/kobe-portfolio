import { useEffect, useState } from 'react'
import Intro from './components/Intro.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'                 // 1. Professional Profile
import Resume from './components/Resume.jsx'               // 2. Resume / CV
import Skills from './components/Skills.jsx'               // 3. Skills Showcase
import Achievements from './components/Achievements.jsx'   // 4. Academic Achievements
import Projects from './components/Projects.jsx'           // 5. Work Samples & Projects
import HTEEvaluation from './components/HTEEvaluation.jsx' // 6. Company & HTE Evaluation
import Reflection from './components/Reflection.jsx'       // 7. Reflection (+ Career Plan)
import Contact from './components/Contact.jsx'             // 8. Contact Information
import References from './components/References.jsx'       // Sources & Credits

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  useEffect(() => {
    if (!introDone) return

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    // one rAF to ensure all children are painted before querying
    const frame = requestAnimationFrame(() => {
      document
        .querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-scale')
        .forEach((el) => observer.observe(el))
    })

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [introDone])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      {introDone && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Resume />
            <Skills />
            <Achievements />
            <Projects />
            <HTEEvaluation />
            <Reflection />
            <Contact />
            <References />
          </main>
        </>
      )}
    </div>
  )
}