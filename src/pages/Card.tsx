import { useRef, useState, useEffect, useCallback } from 'react'

const MAX_ROT = 15 // degrees

export default function Card() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [glare, setGlare] = useState({ x: 50, y: 50 })
  const gyroActive = useRef(false)
  const [showGyroBtn, setShowGyroBtn] = useState(false)

  // Detect iOS (needs permission for DeviceOrientation)
  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

    if (isIOS) {
      setShowGyroBtn(true)
    } else {
      // Non-iOS mobile: register directly
      const handler = (e: DeviceOrientationEvent) => {
        if (e.beta == null || e.gamma == null) return
        gyroActive.current = true
        const x = Math.max(-MAX_ROT, Math.min(MAX_ROT, (e.beta - 45) * 0.4))
        const y = Math.max(-MAX_ROT, Math.min(MAX_ROT, e.gamma * 0.4))
        setRotation({ x, y })
        setGlare({ x: (y / MAX_ROT) * 50 + 50, y: (-x / MAX_ROT) * 50 + 50 })
      }
      window.addEventListener('deviceorientation', handler)
      return () => window.removeEventListener('deviceorientation', handler)
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current || gyroActive.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -MAX_ROT
    const ry = ((e.clientX - cx) / (rect.width / 2)) * MAX_ROT
    setRotation({ x: rx, y: ry })
    setGlare({ x: (ry / MAX_ROT) * 50 + 50, y: (-rx / MAX_ROT) * 50 + 50 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (!gyroActive.current) {
      setRotation({ x: 0, y: 0 })
      setGlare({ x: 50, y: 50 })
    }
  }, [])

  const requestGyro = async () => {
    type DOE = typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<'granted' | 'denied'>
    }
    const doe = DeviceOrientationEvent as DOE
    if (typeof doe.requestPermission === 'function') {
      const perm = await doe.requestPermission()
      if (perm === 'granted') {
        setShowGyroBtn(false)
        window.addEventListener('deviceorientation', (e) => {
          if (e.beta == null || e.gamma == null) return
          gyroActive.current = true
          const x = Math.max(-MAX_ROT, Math.min(MAX_ROT, (e.beta - 45) * 0.4))
          const y = Math.max(-MAX_ROT, Math.min(MAX_ROT, e.gamma * 0.4))
          setRotation({ x, y })
          setGlare({ x: (y / MAX_ROT) * 50 + 50, y: (-x / MAX_ROT) * 50 + 50 })
        })
      }
    }
  }

  const flipY = isFlipped ? 180 : 0
  const cardTransform = `rotateX(${rotation.x}deg) rotateY(${flipY + rotation.y}deg)`
  const cardTransition = isHovered
    ? 'transform 0.08s linear'
    : 'transform 0.65s cubic-bezier(0.23, 1, 0.32, 1)'

  const glareStyle = (mirror: boolean) => ({
    background: `radial-gradient(
      circle at ${mirror ? 100 - glare.x : glare.x}% ${glare.y}%,
      rgba(255,255,255,0.28) 0%,
      transparent 65%
    )`,
  })

  return (
    <div className="card-page">
      <div
        className="card-scene"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={cardRef}
          className="card-wrapper"
          style={{ transform: cardTransform, transition: cardTransition }}
          onClick={() => setIsFlipped(f => !f)}
        >
          {/* Front */}
          <div className="card-face">
            {/* Replace /card-front.svg with your card-front.png */}
            <img src="/card-front.png" alt="Card front" />
            <div className="card-glare" style={glareStyle(false)} />
          </div>

          {/* Back */}
          <div className="card-face card-back">
            {/* Replace /card-back.svg with your card-back.png */}
            <img src="/card-back.png" alt="Card back" />
            <div className="card-glare" style={glareStyle(true)} />
          </div>
        </div>
      </div>

      {showGyroBtn && (
        <button className="gyro-btn" onClick={requestGyro}>
          Enable gyroscope
        </button>
      )}
    </div>
  )
}
