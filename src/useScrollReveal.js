import { useEffect } from 'react'

function getOffsetTop(el) {
  let top = 0, node = el
  while (node) { top += node.offsetTop; node = node.offsetParent }
  return top
}

function getBase(el) {
  if (el.classList.contains('reveal-left'))  return { x: -44, y: 0,  scale: false }
  if (el.classList.contains('reveal-right')) return { x:  44, y: 0,  scale: false }
  if (el.classList.contains('reveal-up'))    return { x: 0,   y: 56, scale: false }
  if (el.classList.contains('reveal-scale')) return { x: 0,   y: 0,  scale: true  }
  return { x: 0, y: 36, scale: false }
}

export function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up, .reveal-scale')
    )
    if (!els.length) return

    // build cache — one offsetTop walk per element, never inside rAF
    const cache = els.map(el => ({
      el,
      base: getBase(el),
      top: getOffsetTop(el),
      height: el.offsetHeight,
      progress: 0,
    }))

    const recache = () => cache.forEach(c => {
      c.top    = getOffsetTop(c.el)
      c.height = c.el.offsetHeight
    })
    window.addEventListener('resize', recache, { passive: true })

    let raf
    let prevScrollY = window.scrollY

    const tick = () => {
      const scrollY = window.scrollY
      const vh      = window.innerHeight
      const moving  = scrollY !== prevScrollY
      prevScrollY   = scrollY

      cache.forEach(c => {
        const elTop    = c.top - scrollY
        const elBottom = c.top + c.height - scrollY

        const enterEdge = vh * 0.88   // enter when bottom crosses this going up
        const exitEdge  = vh * 0.38   // exit when top crosses this going up
        const fadeRange = 110         // px over which exit fades

        // target: where progress SHOULD be right now
        let target
        if (elTop < exitEdge - fadeRange) {
          target = 0                                              // fully above exit zone
        } else if (elTop < exitEdge) {
          target = (elTop - (exitEdge - fadeRange)) / fadeRange  // inside exit zone — 1:1 with scroll
        } else if (elBottom > enterEdge) {
          target = 0                                              // below enter zone
        } else {
          target = 1                                              // fully visible zone
        }

        const isExiting = target < c.progress

        // exit: jump instantly to target (scroll-synced, no lag)
        // enter: lerp smoothly (gentle slide-in feel)
        if (isExiting) {
          c.progress = target
        } else {
          c.progress += (target - c.progress) * 0.10
        }

        const p = c.progress

        // smoothstep easing only on enter direction
        const e = isExiting ? p : p * p * (3 - 2 * p)

        c.el.style.opacity = e

        if (c.base.scale) {
          c.el.style.transform = p >= 0.999
            ? 'none'
            : `scale(${0.94 + 0.06 * p})`
        } else {
          c.el.style.transform = p >= 0.999
            ? 'none'
            : `translateX(${c.base.x * (1 - p)}px) translateY(${c.base.y * (1 - p)}px)`
        }
      })

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', recache)
    }
  }, [])
}