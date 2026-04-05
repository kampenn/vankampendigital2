import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, ChevronDown } from 'lucide-react'

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
      minHeight: '100dvh', position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'flex-end', marginTop: '-2px',
      background: 'linear-gradient(135deg,#0B0E1A 0%,#131729 50%,#1C2040 100%)',
    }}>
      {/* BG image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop)',
        backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top,#0B0E1A 30%,rgba(11,14,26,0.5) 65%,rgba(11,14,26,0.05) 100%)',
      }} />
      {/* Blue glow */}
      <div style={{
        position: 'absolute', bottom: '5%', left: '0%',
        width: '700px', height: '500px',
        background: 'radial-gradient(ellipse,rgba(47,107,255,0.18) 0%,transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '0 2rem 5rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
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
          Winst is de
        </h1>
        <h1 className="hero-item" style={{
          fontSize: 'clamp(3.5rem,9.5vw,8.5rem)',
          fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontWeight: 700,
          lineHeight: 1.0, marginBottom: '1.75rem', ...gradText,
        }}>
          uitkomst.
        </h1>

        <p className="hero-item" style={{
          color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(1rem,2vw,1.2rem)',
          maxWidth: '520px', lineHeight: 1.75, marginBottom: '2.5rem', fontWeight: 400,
        }}>
          Wij verhogen uw winst en besparen kosten door slimme digitalisering. Van procesoptimalisatie tot maatwerk software en websites.
        </p>

        <div className="hero-item" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
          <a href="#diensten"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '1rem 2.25rem', borderRadius: '100px',
              background: 'rgba(255,255,255,0.08)', color: 'white',
              fontFamily: 'Satoshi', fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
              transition: 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94),background 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03) translateY(-1px)'; e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
          >
            Onze diensten
          </a>
        </div>

        <div className="hero-item" style={{ display: 'flex', gap: '2.5rem', marginTop: '3.5rem', flexWrap: 'wrap' }}>
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
