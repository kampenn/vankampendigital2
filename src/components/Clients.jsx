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
    </section>
  )
}
