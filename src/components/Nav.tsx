import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface Props {
  showLogo: boolean
}

export default function Nav({ showLogo }: Props) {
  return (
    <nav className="nav">
      <Link to="/" style={{ textDecoration: 'none' }}>
        {showLogo ? (
          <motion.div
            layoutId="site-name"
            className="nav-logo"
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          >
            LaiRay
          </motion.div>
        ) : (
          // Placeholder so the nav doesn't shift; invisible while intro is showing
          <div className="nav-logo" style={{ opacity: 0, pointerEvents: 'none' }}>
            LaiRay
          </div>
        )}
      </Link>

    </nav>
  )
}
