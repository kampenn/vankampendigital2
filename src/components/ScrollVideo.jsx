import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollVideo() {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const canvasRef = useRef(null)
  const hintRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const totalFrames = 91

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 1100px)').matches)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    if (isMobile) {
      canvas.width = 720
      canvas.height = 1200 // Approx 16:9 portret voor scaling
    } else {
      canvas.width = 1280
      canvas.height = 720
    }

    const currentFrame = (index) => {
      const folder = isMobile ? 'mobile' : 'desktop'
      return `/frames/${folder}/frame-${String(index + 1).padStart(3, '0')}.jpg`
    }

    const images = []
    const obj = { frame: 0 }

    // First frame guarantee
    const firstImg = new Image()
    firstImg.src = currentFrame(0)
    firstImg.onload = () => {
      ctx.drawImage(firstImg, 0, 0, canvas.width, canvas.height)
    }
    images[0] = firstImg

    // Preload
    for (let i = 1; i < totalFrames; i++) {
      const img = new Image()
      img.src = currentFrame(i)
      images[i] = img
    }

    const render = () => {
      const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.round(obj.frame)))
      const img = images[frameIndex]
      if (img && img.complete && img.naturalHeight !== 0) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
    }

    const ctxGsap = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: stickyRef.current,
        scrub: 0.15,
        onUpdate: (self) => {
          obj.frame = self.progress * (totalFrames - 1)
          render()
          
          if (hintRef.current) {
            const fadeOp = Math.max(0, 1 - self.progress * 8)
            hintRef.current.style.opacity = fadeOp
            hintRef.current.style.pointerEvents = fadeOp < 0.1 ? 'none' : 'auto'
          }
        }
      })
    })

    return () => ctxGsap.revert()
  }, [isMobile])

  return (
    <section ref={sectionRef} style={{ height: '300vh', position: 'relative' }}>
      <div ref={stickyRef} style={{
        position: 'sticky', top: 0, height: '100dvh',
        overflow: 'hidden', background: '#0B0E1A',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(11,14,26,0.0) 0%, rgba(11,14,26,0.1) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Scroll hint */}
        <div ref={hintRef} style={{
          position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
          color: '#2F6BFF', fontFamily: 'IBM Plex Mono', fontWeight: 600,
          fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase',
          animation: 'float 2.5s ease-in-out infinite',
        }}>
          <ChevronDown size={18} />
          <span>Scroll</span>
        </div>
      </div>
    </section>
  )
}
