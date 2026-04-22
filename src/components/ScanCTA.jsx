import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Canvas: Scanning Grid (duplicated from Protocol for independence) ──
function ScanningGrid() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current; const ctx = canvas.getContext('2d')
    let scanX = 0, raf
    const cols = 8, rows = 8, cw = 260 / cols, ch = 260 / rows
    const draw = () => {
      ctx.clearRect(0, 0, 260, 260)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cw + cw / 2, y = r * ch + ch / 2
          const dist = Math.abs(x - scanX), glow = Math.max(0, 1 - dist / 70)
          ctx.beginPath(); ctx.arc(x, y, 2.5 + glow * 4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(47,107,255,${0.25 + glow * 0.75})`; ctx.fill()
        }
      }
      ctx.beginPath(); ctx.moveTo(scanX, 0); ctx.lineTo(scanX, 260)
      ctx.strokeStyle = 'rgba(47,107,255,0.7)'; ctx.lineWidth = 1.5; ctx.stroke()
      scanX = (scanX + 1.2) % 260; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={canvasRef} width={260} height={260} style={{ width: '100%', height: '100%', maxWidth: '260px', maxHeight: '260px' }} />
}

// ── ScanCTA Section ──────────────────────────────────────────
export default function ScanCTA() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.scan-item', {
        y: 50, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 65%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const gradText = {
    background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
  }

  const usps = [
    'Op locatie of online',
    'Rapport binnen een week',
  ]

  return (
    <section id="scan" ref={ref} style={{
      padding: 'clamp(4rem,8vw,6rem) 1.5rem',
      background: 'linear-gradient(160deg,#0B0E1A 0%,#1C2040 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Blue radial glow left */}
      <div style={{
        position: 'absolute', top: '20%', left: '-5%',
        width: '500px', height: '500px',
        background: 'radial-gradient(ellipse,rgba(47,107,255,0.15) 0%,transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem,5vw,4rem)',
          alignItems: 'center',
        }}>
          {/* ── Left: Text ── */}
          <div>
            <p className="scan-item" style={{
              fontFamily: 'IBM Plex Mono', fontSize: '0.75rem', letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#2F6BFF', marginBottom: '1.25rem', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <span style={{ width: '24px', height: '2px', background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)', borderRadius: '2px', display: 'inline-block' }} />
              Bedrijfsscan
            </p>

            <h2 className="scan-item" style={{
              color: 'white', fontSize: 'clamp(2rem,4.5vw,3rem)',
              lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '0.75rem', fontWeight: 900,
            }}>
              Weet niet waar te beginnen?
            </h2>

            <p className="scan-item" style={{
              color: 'white',
              fontSize: 'clamp(1.15rem,2.5vw,1.5rem)', fontWeight: 700,
              lineHeight: 1.2, marginBottom: '1.5rem',
            }}>
              Start met een bedrijfsscan
            </p>

            <p className="scan-item" style={{
              color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem',
              lineHeight: 1.75, marginBottom: '2rem', maxWidth: '480px',
            }}>
              In 60 minuten brengen we uw processen, tools en knelpunten in kaart. 
              Vervolgens ontvangt u een scanrapport waarin de beste verbeterpunten 
              direct op impact zijn gerangschikt. Geen verkooppraatjes, maar concreet inzicht.
            </p>

            <div className="scan-item" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2.5rem' }}>
              {usps.map(usp => (
                <div key={usp} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{
                    width: '24px', height: '24px', borderRadius: '6px',
                    background: 'rgba(47,107,255,0.12)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Check size={13} style={{ color: '#2F6BFF' }} />
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', fontWeight: 500 }}>{usp}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="scan-item" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '1rem 2.25rem', borderRadius: '100px',
              background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)', color: 'white',
              fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(47,107,255,0.4)',
              transition: 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94),box-shadow 0.3s ease',
              position: 'relative', overflow: 'hidden',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03) translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(47,107,255,0.55)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(47,107,255,0.4)' }}
            >
              Plan uw scan <ArrowRight size={18} />
            </a>
          </div>

          {/* ── Right: Visual ── */}
          <div className="scan-item" style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}>
            <div style={{
              background: 'rgba(47,107,255,0.04)',
              border: '1px solid rgba(47,107,255,0.15)',
              borderRadius: '2rem', padding: '2.5rem',
              boxShadow: '0 0 80px rgba(47,107,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ScanningGrid />
            </div>
          </div>
        </div>
      </div>

      {/* ── Responsive: stack on mobile ── */}
      <style>{`
        @media (max-width: 768px) {
          #scan > div > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
