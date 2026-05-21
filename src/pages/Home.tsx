import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FaGithub,
  FaEnvelope,
  FaInstagram,
  FaTelegramPlane,
  FaYoutube,
  FaDiscord,
} from 'react-icons/fa'
import { MdSchool } from 'react-icons/md'

// ── Edit these ──────────────────────────────────────────────
const WORK_EXPERIENCE = [
  {
    title: 'Administrative staff as Network Management',
    org: 'MineCloud Studio',
    period: '2022 - Present',
  },
]

const Activities_Course = [
  {
    title: 'SITCON 2026',
    identity: 'Administration Team — Staff Member',
    time: '2026',
  },
  {
    title: 'COSCUP 2025',
    identity: 'Streaming Team — Staff Member',
    time: '2025',
  },
  {
    title: 'TWNOG 6.0',
    identity: 'Attendee',
    time: '2025',
  },
  {
    title: 'SITCON 2025',
    identity: 'Attendee',
    time: '2025',
  },
  {
    title: 'COSCUP 2024',
    identity: 'Field Team — Staff Member',
    time: '2024',
  },
  {
    title: 'SITCON 2024',
    identity: 'Attendee',
    time: '2024',
  },
  {
    title: 'AIS3 Junior 2023',
    identity: 'Participant',
    time: '2023',
  },
  {
    title: 'WordCamp Taiwan 2023',
    identity: 'Attendee',
    time: '2023',
  },
  {
    title: 'COSCUP 2023',
    identity: 'Attendee',
    time: '2023',
  },
]

const NAME = 'LaiRay'
const TAGS = ['#Student', '#Learning', '#AS214841']
const BIO =
  "Hi, I’m LaiRay. I’m currently a first-year high school student from New Taipei City. I’m interested in learning and experimenting with anything related to the field of technology, including both hardware and software. Since 2023, I’ve been participating in in-person events and courses to expand my knowledge and experience."

const SOCIALS = [
  { icon: FaEnvelope,      label: 'Email',     href: 'mailto:me@ray-tw.com' },
  { icon: FaInstagram,     label: 'Instagram', href: 'https://www.instagram.com/oiqpwp08/' },
  { icon: FaGithub,        label: 'GitHub',    href: 'https://github.com/Ray1020-a' },
  { icon: FaTelegramPlane, label: 'Telegram',  href: 'https://t.me/lairayy' },
  { icon: FaYoutube,       label: 'YouTube',   href: 'https://www.youtube.com/@twcowray' },
  { icon: FaDiscord,       label: 'Discord',   href: 'https://discord.com/users/743991161189826592' },
]
// ─────────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5, ease },
  }
}

export default function Home() {
  return (
    <main className="home">
      <div className="home-inner">

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="home-hero">
          <motion.div className="home-avatar" {...fadeUp(0.05)}>
            {/* Replace /avatar.svg with your actual photo */}
            <img src="/avatar.png" alt={NAME} />
          </motion.div>

          <div className="home-hero-text">
            <motion.h1 className="home-name" {...fadeUp(0.1)}>
              {NAME}
            </motion.h1>

            <motion.p className="home-tags" {...fadeUp(0.16)}>
              <p><MdSchool style={{ display: 'inline', marginRight: '0.3em', verticalAlign: 'middle' }} />Taipei Digital Experimental High School</p>
              {TAGS.join(' ')}
            </motion.p>

            <motion.div className="home-socials" {...fadeUp(0.22)}>
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="social-icon-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                >
                  <Icon />
                </a>
              ))}
            </motion.div>

            <motion.p className="home-bio" {...fadeUp(0.28)}>
              {BIO}
            </motion.p>
          </div>
        </section>

        {/* ── Work Experience ───────────────────────────── */}
        <motion.section
          className="work-exp"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="work-exp-title">Work Experience</h2>
          <div className="work-exp-list">
            {WORK_EXPERIENCE.map((item, i) => (
              <div key={i} className="work-exp-item">
                <div className="work-exp-left">
                  <span className="work-exp-job">{item.title}</span>
                  <span className="work-exp-org">{item.org}</span>
                </div>
                <span className="work-exp-period">{item.period}</span>
              </div>
            ))}
          </div>
        </motion.section>
        
        <motion.section
          className="work-exp"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="work-exp-title">Activities & Courses</h2>
          <div className="work-exp-list">
            {Activities_Course.map((item, i) => (
              <div key={i} className="work-exp-item">
                <div className="work-exp-left">
                  <span className="work-exp-job">{item.title}</span>
                  <span className="work-exp-org">{item.identity}</span>
                </div>
                <span className="work-exp-period">{item.time}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Blog CTA ─────────────────────────────────── */}
        <motion.div
          className="home-buttons"
          style={{ justifyContent: 'center', marginBottom: '2rem' }}
          {...fadeUp(0.6)}
        >
          <Link to="/blog" className="home-btn">
            Read my Blog →
          </Link>
        </motion.div>

      </div>
    </main>
  )
}
