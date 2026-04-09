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
        y: 30, opacity: 0, duration: 0.9, stagger: 0.12,
        ease: 'power3.out'
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} style={{
      padding: '5rem 2rem',
      background: '#F6F8FB',
      position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
        <div className="testi-item" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '48px', height: '48px', borderRadius: '50%',
          background: 'rgba(47,107,255,0.08)', border: '1px solid rgba(47,107,255,0.15)',
          color: '#2F6BFF', marginBottom: '1.75rem'
        }}>
          <Quote size={22} />
        </div>

        <p className="testi-item" style={{
          fontSize: 'clamp(1.15rem, 2.5vw, 1.5rem)',
          fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontWeight: 600,
          color: '#0D1117', lineHeight: 1.6, marginBottom: '2rem'
        }}>
          "Nick is a great analist and excels at making sense of complex problems with many actors. He manages to go really in-depth whilst taking into account many different perspectives. With his approach to problem-solving he creates goodwill with his stakeholders by making them feel included and thereby creating buy-in for his conclusions. He is conscientious and professional, but also a lot of fun to work with."
        </p>

        <div className="testi-item" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
          <div style={{
            fontFamily: 'Satoshi', fontWeight: 700, fontSize: '1rem', color: '#0D1117'
          }}>
            Vincent
          </div>
          <div style={{
            fontFamily: 'IBM Plex Mono', fontSize: '0.7rem', letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#2F6BFF', fontWeight: 600
          }}>
            Magister
          </div>
          <a
            href="https://www.linkedin.com/in/nick-van-kampen/details/recommendations/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'IBM Plex Mono', fontSize: '0.65rem', letterSpacing: '0.05em',
              color: 'rgba(47,107,255,0.6)', textDecoration: 'none',
              marginTop: '0.4rem',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#2F6BFF'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(47,107,255,0.6)'}
          >
            Bekijk alle aanbevelingen →
          </a>
        </div>
      </div>
    </section>
  )
}
