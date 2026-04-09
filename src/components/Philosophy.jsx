import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BarChart3, Code, Check } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-item', {
        y: 50, opacity: 0, duration: 1, stagger: 0.18, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 60%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const gradText = {
    background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
  }

  return (
    <section ref={ref} style={{
      background: '#0B0E1A', padding: '7rem 1.5rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* Purple glow */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle,rgba(124,92,255,0.12),transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <div className="phil-item" style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <p style={{
              fontSize: 'clamp(1.5rem,3.5vw,2.5rem)',
              fontStyle: 'italic', fontWeight: 700,
              color: 'white', lineHeight: 1.2,
            }}>
              Wij richten ons op:{' '}
              <span style={gradText}>kosten besparen</span>, groei en winst verhogen.
            </p>
          </div>

          <div style={{ position: 'relative', flexShrink: 0, margin: '0 auto' }}>
            <img 
              src="/nick-thumb.png" 
              alt="Nick van Kampen" 
              style={{
                width: '160px', height: '160px', objectFit: 'cover', borderRadius: '50%',
                border: '1px solid rgba(47,107,255,0.3)',
                boxShadow: '0 16px 32px rgba(0,0,0,0.4)',
                filter: 'grayscale(20%) contrast(110%)',
                display: 'block'
              }}
            />
            <div style={{
              position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)',
              background: '#2F6BFF', padding: '0.35rem 1rem', borderRadius: '100px',
              color: 'white', fontWeight: 700, fontSize: '0.7rem',
              whiteSpace: 'nowrap', boxShadow: '0 4px 15px rgba(47,107,255,0.6)'
            }}>
              Nick van Kampen, Oprichter
            </div>
          </div>
        </div>

        <div className="phil-item" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            [<BarChart3 size={16} />, 'Analyse'],
            [<Code size={16} />, 'Realiseren'],
            [<Check size={16} />, 'Meten'],
          ].map(([icon, text]) => (
            <div key={text} style={{
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '0.9rem',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'rgba(47,107,255,0.12)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: '#2F6BFF',
              }}>{icon}</div>
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
