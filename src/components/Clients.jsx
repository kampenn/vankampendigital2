import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Clients() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.client-title', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        y: 20, opacity: 0, duration: 1, ease: 'power3.out'
      })
      gsap.from('.client-logo', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        y: 30, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.1
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      padding: '6rem 2rem', 
      background: '#FFFFFF', 
      position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      <h2 className="client-title" style={{ 
        fontFamily: 'Satoshi', 
        fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', 
        color: '#1A202C', 
        fontWeight: 700,
        letterSpacing: '-0.02em',
        marginBottom: '4rem', 
        textAlign: 'center' 
      }}>
        Succesvolle projecten
      </h2>

      <div style={{ 
        display: 'flex', gap: '4.5rem', alignItems: 'center', flexWrap: 'wrap', 
        justifyContent: 'center', position: 'relative', zIndex: 1 
      }}>
        
        {/* DUO Logo */}
        <img className="client-logo" src="/duo.png" onError={e => {e.target.onerror=null; e.target.src="https://placehold.co/400x120/EDF2F7/2D3748?text=Sleep+jouw+DUO+bestand\\nnaar+de+'public'+map\\nals+'duo.png'"}} alt="Dienst Uitvoering Onderwijs" style={{ height: '70px', objectFit: 'contain' }} />

        {/* Gasunie Logo */}
        <img className="client-logo" src="/gasunie.png" onError={e => {e.target.onerror=null; e.target.src="https://placehold.co/400x120/EDF2F7/2D3748?text=Sleep+je+Gasunie+bestand\\nnaar+de+'public'+map\\nals+'gasunie.png'"}} alt="Gasunie" style={{ height: '55px', objectFit: 'contain' }} />

        {/* Round Up Logo (CSS) */}
        <div className="client-logo" style={{ display: 'flex', alignItems: 'center', fontFamily: 'Satoshi', fontSize: '2.1rem', letterSpacing: '-0.04em' }}>
          <span style={{ fontWeight: 900, color: '#1A202C' }}>Round</span>
          <span style={{
            background: '#FF5A36', color: 'white', fontWeight: 800, 
            padding: '0 0.5rem', borderRadius: '0.6rem', marginLeft: '0.25rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2.4rem'
          }}>Up</span>
        </div>

      </div>

      {/* Testimonial under logos */}
      <div className="client-logo" style={{
        maxWidth: '680px', textAlign: 'center', marginTop: '4rem',
        borderTop: '1px solid rgba(47,107,255,0.1)', paddingTop: '3rem'
      }}>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontWeight: 600,
          color: '#0D1117', lineHeight: 1.6, marginBottom: '1.5rem'
        }}>
          "Nick is a great analist and excels at making sense of complex problems with many actors. He manages to go really in-depth whilst taking into account many different perspectives. With his approach to problem-solving he creates goodwill with his stakeholders by making them feel included and thereby creating buy-in for his conclusions. He is conscientious and professional, but also a lot of fun to work with."
        </p>
        <div style={{ fontFamily: 'Satoshi', fontWeight: 700, fontSize: '0.95rem', color: '#0D1117' }}>
          Vincent
        </div>
        <div style={{
          fontFamily: 'IBM Plex Mono', fontSize: '0.68rem', letterSpacing: '0.1em',
          textTransform: 'uppercase', color: '#2F6BFF', fontWeight: 600, marginTop: '0.2rem'
        }}>
          Magister
        </div>
        <a
          href="https://www.linkedin.com/in/nick-van-kampen/details/recommendations/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'IBM Plex Mono', fontSize: '0.62rem', letterSpacing: '0.05em',
            color: 'rgba(47,107,255,0.5)', textDecoration: 'none', marginTop: '0.5rem',
            display: 'inline-block', transition: 'color 0.3s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#2F6BFF'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(47,107,255,0.5)'}
        >
          Bekijk alle aanbevelingen →
        </a>
      </div>

    </section>
  )
}
