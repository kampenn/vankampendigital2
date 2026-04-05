import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollVideo() {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const videoRef = useRef(null)
  const hintRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 1100px)').matches)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Make sure video is loaded before scrubbing
    const setup = () => {
      video.pause()
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: stickyRef.current,
          scrub: 0.15, // Gewijzigd van 1 naar 0.15 voor veel 'scherpere' 1-op-1 feedback op scrollen
          onUpdate: (self) => {
            if (video.duration && isFinite(video.duration)) {
              // Clamp tightly to right before the end to prevent white flashing on iOS/Safari
              const targetTime = video.duration * self.progress
              video.currentTime = Math.min(targetTime, video.duration - 0.05)
            }
            if (hintRef.current) {
              const fadeOp = Math.max(0, 1 - self.progress * 8)
              hintRef.current.style.opacity = fadeOp
              hintRef.current.style.pointerEvents = fadeOp < 0.1 ? 'none' : 'auto'
            }
          },
        })
      })
      return () => ctx.revert()
    }

    if (video.readyState >= 2) {
      return setup()
    } else {
      video.addEventListener('loadedmetadata', setup, { once: true })
      return () => video.removeEventListener('loadedmetadata', setup)
    }
  }, [isMobile])

  return (
    <section ref={sectionRef} style={{ height: '300vh', position: 'relative' }}>
      <div ref={stickyRef} style={{
        position: 'sticky', top: 0, height: '100dvh',
        overflow: 'hidden', background: '#0B0E1A',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/*
          ──────────────────────────────────────────────────────────────
          DROP YOUR VIDEO FILE HERE:
          Place your video at:  /public/video/hero-video.mp4
          ──────────────────────────────────────────────────────────────
        */}
        <video
          key={isMobile ? 'mobile' : 'desktop'}
          ref={videoRef}
          src={isMobile ? "/video/smooth-video-portrait.mp4" : "/video/smooth-video.mp4"}
          muted
          playsInline
          preload="auto"
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
