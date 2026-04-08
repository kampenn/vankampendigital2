import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function VideoLanding() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 1100px)').matches)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section style={{ height: '100dvh', position: 'relative', overflow: 'hidden', background: '#0B0E1A' }}>
      {/* Desktop Video */}
      <video
        src="/digitallandscape.mp4"
        autoPlay
        playsInline
        muted
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
          display: isMobile ? 'none' : 'block',
        }}
      />

      {/* Mobile Video */}
      <video
        src="/digitalportret.mp4"
        autoPlay
        playsInline
        muted
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%', objectFit: 'cover',
          display: isMobile ? 'block' : 'none',
        }}
      />
      
      {/* Scroll hint bouncing */}
      <div style={{
          position: 'absolute', bottom: '2.5rem', left: 0, right: 0,
          display: 'flex', justifyContent: 'center', pointerEvents: 'none',
        }}>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
            color: '#2F6BFF', fontFamily: 'IBM Plex Mono', fontWeight: 600,
            fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            animation: 'float 2.5s ease-in-out infinite',
            textShadow: '0 2px 8px rgba(0,0,0,0.4)'
          }}>
            <ChevronDown size={18} style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }} />
            <span>Scroll</span>
          </div>
      </div>
    </section>
  )
}
