import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function AnimatedTextCycle({ words, interval = 3000, className = '', style = {} }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [words, interval])

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[index]}
        initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className={className}
        style={{ display: 'inline-block', ...style }}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  )
}