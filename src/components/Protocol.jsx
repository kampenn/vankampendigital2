import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Canvas: Rotating Geometry ────────────────────────────────
function RotatingGeometry() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let angle = 0, raf
    const draw = () => {
      ctx.clearRect(0, 0, 260, 260)
      ctx.save(); ctx.translate(130, 130)
      for (let i = 0; i < 6; i++) {
        ctx.rotate(Math.PI / 3)
        ctx.beginPath(); ctx.arc(55, 0, 26, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1.5; ctx.stroke()
      }
      ctx.restore()
      ctx.save(); ctx.translate(130, 130); ctx.rotate(angle)
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2)
        ctx.beginPath(); ctx.arc(82, 0, 12, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(124,92,255,0.9)'; ctx.lineWidth = 2; ctx.stroke()
      }
      ctx.restore()
      ctx.beginPath(); ctx.arc(130, 130, 18, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(47,107,255,0.7)'; ctx.lineWidth = 2; ctx.stroke()
      angle += 0.007; raf = requestAnimationFrame(draw)
    }
    draw(); return () => cancelAnimationFrame(raf)
  }, [])
  return <canvas ref={canvasRef} width={260} height={260} />
}

// ── Canvas: Scanning Grid ────────────────────────────────────
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
  return <canvas ref={canvasRef} width={260} height={260} />
}

// ── SVG: EKG Waveform ────────────────────────────────────────
function WaveformSVG() {
  const pathRef = useRef(null)
  useEffect(() => {
    if (!pathRef.current) return
    const len = pathRef.current.getTotalLength()
    gsap.set(pathRef.current, { strokeDasharray: len, strokeDashoffset: len })
    gsap.to(pathRef.current, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', repeat: -1, yoyo: true })
  }, [])
  return (
    <svg width={260} height={260} viewBox="0 0 260 260">
      <path ref={pathRef}
        d="M 0 130 L 30 130 L 50 70 L 70 190 L 90 130 L 120 40 L 140 220 L 160 130 L 185 95 L 205 165 L 225 130 L 260 130"
        fill="none" stroke="rgba(47,107,255,0.85)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

// ── Single Protocol Card ─────────────────────────────────────
function ProtocolCard({ step, title, desc, bg, Visual }) {
  return (
    <div style={{
      width: '100%', minHeight: '55vh', borderRadius: '3rem',
      background: bg, padding: 'clamp(2.5rem,5vw,4rem)',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      position: 'relative', overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
    }}>
      {/* Visual top-right */}
      <div style={{ position: 'absolute', right: '3rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.18, pointerEvents: 'none' }}>
        <Visual />
      </div>

      <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', marginBottom: '2rem', fontWeight: 600 }}>
        {step}
      </div>
      <h2 style={{ color: 'white', fontSize: 'clamp(2.5rem,5vw,4rem)', marginBottom: '1.25rem', lineHeight: 1.0, letterSpacing: '-0.02em', maxWidth: '580px' }}>{title}</h2>
      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '480px' }}>{desc}</p>
    </div>
  )
}

// ── Protocol Section ─────────────────────────────────────────
export default function Protocol() {
  const gradText = { background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

  const cards = [
    {
      step: 'STAP 01 / 03', title: 'Analyseer & begrijp',
      desc: 'We starten altijd met luisteren. In een persoonlijk gesprek brengen we uw processen, tools en uitdagingen in kaart, ondersteund door data en AI.',
      bg: 'linear-gradient(140deg,#0D1117 0%,#131729 100%)', Visual: RotatingGeometry,
    },
    {
      step: 'STAP 02 / 03', title: 'Ontwerp & bouw',
      desc: 'Op basis van de analyse selecteren we de juiste tools of bouwen we een oplossing op maat. Door gericht gebruik van AI werken we snel, scherp en met de hoogste kwaliteit.',
      bg: 'linear-gradient(140deg,#0F1B3D 0%,#1C2040 100%)', Visual: ScanningGrid,
    },
    {
      step: 'STAP 03 / 03', title: 'Implementeer & meet',
      desc: 'Wij begeleiden de uitrol, trainen uw team en monitoren de resultaten. Doorlopend beheer zorgt dat alles blijft werken en meegroeien met uw bedrijf.',
      bg: 'linear-gradient(140deg,#130D1F 0%,#1A1040 100%)', Visual: WaveformSVG,
    },
  ]

  return (
    <section id="aanpak" style={{ padding: '7rem 1.5rem', background: '#F6F8FB' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2F6BFF', marginBottom: '1.25rem', fontWeight: 600 }}>
            Onze aanpak
          </p>
          <h2 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', letterSpacing: '-0.03em' }}>
            Van inzicht naar <span style={gradText}>impact</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {cards.map((card) => (
            <ProtocolCard key={card.step} {...card} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <p style={{ fontFamily: 'IBM Plex Mono', fontSize: '0.9rem', color: '#4A5568', marginBottom: '0.75rem' }}>
            De eerste stap? Een bedrijfsscan.
          </p>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            fontFamily: 'IBM Plex Mono', fontSize: '0.88rem', fontWeight: 600,
            color: '#2F6BFF', textDecoration: 'none',
            transition: 'transform 0.2s ease, opacity 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.opacity = '0.8' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.opacity = '1' }}
          >
            Plan uw scan <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}
