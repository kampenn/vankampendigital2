import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-item', {
        y: 40, opacity: 0, duration: 1.1, stagger: 0.08,
        ease: 'power3.out', delay: 0.1,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const gradText = {
    background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
  }

  return (
    <section ref={heroRef} style={{
      position: 'relative', overflow: 'hidden',
      padding: '8rem 2rem 5rem', 
      background: 'linear-gradient(135deg,#0B0E1A 0%,#131729 50%,#1C2040 100%)',
    }}>
      {/* Blue glow */}
      <div style={{
        position: 'absolute', bottom: '5%', left: '0%',
        width: '700px', height: '500px',
        background: 'radial-gradient(ellipse,rgba(47,107,255,0.18) 0%,transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div className="hero-item" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          fontFamily: 'IBM Plex Mono', fontSize: '0.72rem', letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
          marginBottom: '1.5rem',
        }}>
          <span style={{ width: '24px', height: '2px', background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)', display: 'inline-block', borderRadius: '2px' }} />
          Digitalisering die écht oplevert
        </div>

        <h1 className="hero-item" style={{
          fontSize: 'clamp(3rem,8vw,7rem)', color: 'white',
          lineHeight: 1.0, marginBottom: '0.15rem', fontWeight: 900, letterSpacing: '-0.03em',
        }}>
          Tijd om te
        </h1>
        <h1 className="hero-item" style={{
          fontSize: 'clamp(3.5rem,9.5vw,8.5rem)',
          fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontWeight: 700,
          lineHeight: 1.0, marginBottom: '1.75rem', 
          paddingBottom: '0.15em', paddingRight: '0.1em', paddingLeft: '0.05em', marginLeft: '-0.05em',
          ...gradText,
        }}>
          groeien.
        </h1>

        <p className="hero-item" style={{
          color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(1rem,2vw,1.2rem)',
          maxWidth: '520px', lineHeight: 1.75, marginBottom: '2.5rem', fontWeight: 400,
        }}>
          Wij verhogen uw winst en besparen kosten door slimme digitalisering. Van procesoptimalisatie tot maatwerk software en websites.
        </p>

        <div className="hero-item" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <a href="#contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '1rem 2.25rem', borderRadius: '100px',
              background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)', color: 'white',
              fontFamily: 'Satoshi', fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(47,107,255,0.4)',
              transition: 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94),box-shadow 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03) translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(47,107,255,0.55)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(47,107,255,0.4)' }}
          >
            Vrijblijvend gesprek <ArrowRight size={18} />
          </a>
        </div>

        <div className="hero-item" style={{ display: 'flex', gap: '2.5rem', marginTop: '4.5rem', flexWrap: 'wrap' }}>
          {[['AI-gedreven','slimmere processen & workflows'],['Betrouwbare partner','in complete digitale strategie'],['Meetbaar','impact op uw resultaat']].map(([num,label]) => (
            <div key={num}>
              <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '1.5rem', fontWeight: 500, color: 'white', lineHeight: 1 }}>{num}</div>
              <div style={{ fontFamily: 'Satoshi', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem' }}>{label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
