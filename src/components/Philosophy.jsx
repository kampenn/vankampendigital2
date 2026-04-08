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
      background: '#0B0E1A', padding: '8rem 1.5rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* Texture overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop)',
        backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.04,
      }} />
      {/* Purple glow */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle,rgba(124,92,255,0.12),transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="phil-item" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          fontFamily: 'IBM Plex Mono', fontSize: '0.7rem', letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '2rem',
        }}>
          <span style={{ width: '24px', height: '2px', background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)', display: 'inline-block', borderRadius: '2px' }} />
          Onze filosofie
        </div>

        <p className="phil-item" style={{
          fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', color: 'rgba(255,255,255,0.4)',
          lineHeight: 1.65, marginBottom: '2rem', fontWeight: 400,
        }}>
          De meeste digitalisering is <em style={{ color: 'rgba(255,255,255,0.6)' }}>een doel op zich.</em>
        </p>

        <div className="phil-item" style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <p style={{
              fontSize: 'clamp(2rem,5.5vw,4.5rem)',
              fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontWeight: 700,
              color: 'white', lineHeight: 1.1,
            }}>
              Wij richten ons op:{' '}
              <span style={gradText}>kosten besparen</span>, groei en winst verhogen.
            </p>
          </div>

          <div style={{ position: 'relative', flexShrink: 0 }}>
            <img 
              src="/nick-thumb.png" 
              alt="Nick van Kampen" 
              style={{
                width: '180px', height: '180px', objectFit: 'cover', borderRadius: '50%',
                border: '1px solid rgba(47,107,255,0.4)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                filter: 'grayscale(20%) contrast(110%)'
              }}
            />
            <div style={{
              position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)',
              background: '#2F6BFF', padding: '0.4rem 1.2rem', borderRadius: '100px',
              color: 'white', fontWeight: 700, fontSize: '0.75rem', fontFamily: 'Satoshi',
              whiteSpace: 'nowrap', boxShadow: '0 4px 15px rgba(47,107,255,0.6)'
            }}>
              Nick van Kampen, Oprichter
            </div>
          </div>
        </div>

        <div className="phil-item" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            [<BarChart3 size={18} />, 'Analyse eerst'],
            [<Code size={18} />, 'Realiseren'],
            [<Check size={18} />, 'Altijd meten'],
          ].map(([icon, text]) => (
            <div key={text} style={{
              display: 'flex', alignItems: 'center', gap: '0.7rem',
              color: 'rgba(255,255,255,0.55)', fontWeight: 600, fontSize: '0.95rem',
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'rgba(47,107,255,0.15)', display: 'flex',
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
