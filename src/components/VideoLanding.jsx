import { useEffect, useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

export default function VideoLanding() {
  const [isMobile, setIsMobile] = useState(false)
  const desktopRef = useRef(null)
  const mobileRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 1100px)').matches)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Force native browser play
    if (desktopRef.current && !isMobile) desktopRef.current.play().catch(e => console.log(e))
    if (mobileRef.current && isMobile) mobileRef.current.play().catch(e => console.log(e))
  }, [isMobile])

  return (
    <section style={{ 
      height: '100dvh', position: 'relative', overflow: 'hidden', 
      background: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center' 
    }}>
      {/* Desktop Video */}
      <video
        ref={desktopRef}
        src="/digitallandscape.mp4"
        autoPlay
        playsInline
        muted
        style={{
          width: '100%', maxWidth: '1600px', height: '100%', objectFit: 'contain',
          display: isMobile ? 'none' : 'block',
        }}
      />

      {/* Mobile Video */}
      <video
        ref={mobileRef}
        src="/digitalportret.mp4"
        autoPlay
        playsInline
        muted
        style={{
          width: '100%', maxWidth: '1600px', height: '100%', objectFit: 'contain',
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
            textShadow: '0 4px 15px rgba(47,107,255,0.2)'
          }}>
            <ChevronDown size={18} style={{ filter: 'drop-shadow(0 4px 15px rgba(47,107,255,0.2))' }} />
            <span>Scroll</span>
          </div>
      </div>
    </section>
  )
}
