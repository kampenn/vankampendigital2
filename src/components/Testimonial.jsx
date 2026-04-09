import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonial() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testi-item', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 40, opacity: 0, duration: 1, stagger: 0.15,
        ease: 'power3.out'
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} style={{
      padding: '8rem 2rem',
      background: 'linear-gradient(135deg, #0B0E1A 0%, #131729 100%)',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Subtle glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '60vw', height: '60vw', maxWidth: '800px',
        background: 'radial-gradient(circle, rgba(47,107,255,0.08) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="testi-item" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '60px', height: '60px', borderRadius: '50%',
          background: 'rgba(47,107,255,0.1)', border: '1px solid rgba(47,107,255,0.2)',
          color: '#2F6BFF', marginBottom: '2.5rem'
        }}>
          <Quote size={28} />
        </div>

        <p className="testi-item" style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontWeight: 600,
          color: 'white', lineHeight: 1.4, marginBottom: '3rem'
        }}>
          "Nick is a great analist and excels at making sense of complex problems with many actors. He manages to go really in-depth whilst taking into account many different perspectives. With his approach to problem-solving he creates goodwill with his stakeholders by making them feel included and thereby creating buy-in for his conclusions. He is conscientious and professional, but also a lot of fun to work with."
        </p>

        <div className="testi-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            fontFamily: 'Satoshi', fontWeight: 700, fontSize: '1.1rem', color: 'white'
          }}>
            Vincent
          </div>
          <div style={{
            fontFamily: 'IBM Plex Mono', fontSize: '0.75rem', letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#2F6BFF', fontWeight: 600
          }}>
            Magister
          </div>
        </div>
      </div>
    </section>
  )
}
