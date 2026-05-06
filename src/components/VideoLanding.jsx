import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function VideoLanding() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 1100px)').matches : false
  )

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 1100px)').matches)
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const desktopVideoHTML = `
    <video
      src="/digitallandscapev3.mp4"
      autoplay
      playsinline
      muted
      preload="auto"
      style="width: 100%; max-width: 1600px; height: 100%; object-fit: contain; background-color: transparent; transform: scale(1.015); display: block;"
    ></video>
  `;

  const mobileVideoHTML = `
    <video
      src="/digitalportret.mp4"
      autoplay
      playsinline
      muted
      preload="auto"
      style="width: 100%; max-width: 1600px; height: 100%; object-fit: contain; background-color: transparent; transform: scale(1.015); display: block;"
    ></video>
  `;

  return (
    <section style={{ 
      width: '100%', height: '100dvh', position: 'relative', overflow: 'hidden', 
      background: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center' 
    }}>
      {/* Container for raw HTML video injection to bypass React/Safari autoplay quirks */}
      <div 
        style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        dangerouslySetInnerHTML={{ __html: isMobile ? mobileVideoHTML : desktopVideoHTML }}
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
