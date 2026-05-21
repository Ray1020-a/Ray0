import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface Props {
  onDone: () => void
}

const LETTERS = 'LaiRay'.split('')
const STAGGER = 0.08
// total time: stagger * letters + spring settle + pause
const AUTO_EXIT_MS = LETTERS.length * STAGGER * 1000 + 600 + 900

export default function IntroAnimation({ onDone }: Props) {
  useEffect(() => {
    const t = setTimeout(onDone, AUTO_EXIT_MS)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="intro-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: 'easeInOut' }}
    >
      {/* layoutId links this to the nav logo — Framer Motion animates between them on exit */}
      <motion.div layoutId="site-name" className="intro-letters">
        {LETTERS.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 80, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: i * STAGGER,
              type: 'spring',
              stiffness: 220,
              damping: 18,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}
