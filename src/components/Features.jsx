import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BarChart3, Zap, Check, Code } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Card 1: Diagnostic Shuffler ──────────────────────────────
function ShufflerCard() {
  const items = [
    { icon: <BarChart3 size={15} />, label: 'Workflow analyse', stat: 'Knelpunten inzicht' },
    { icon: <Zap size={15} />, label: 'Automatisering', stat: 'Tijdswinst' },
    { icon: <Check size={15} />, label: 'KPI monitoring', stat: 'Real-time sturing' },
  ]
  const [stack, setStack] = useState(items)

  useEffect(() => {
    const interval = setInterval(() => {
      setStack(prev => { const n = [...prev]; n.unshift(n.pop()); return n })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ position: 'relative', height: '170px', marginTop: '1.5rem' }}>
      {stack.map((item, i) => (
        <div key={item.label} style={{
          position: 'absolute', width: '100%',
          padding: '0.9rem 1.1rem',
          background: i === 0 ? 'linear-gradient(135deg,#2F6BFF,#7C5CFF)' : 'white',
          border: `1px solid ${i === 0 ? 'transparent' : 'rgba(47,107,255,0.1)'}`,
          borderRadius: '1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          color: i === 0 ? 'white' : '#0D1117',
          top: `${i * 20}px`, zIndex: 3 - i,
          opacity: 1 - i * 0.22,
          transform: `scale(${1 - i * 0.04})`,
          transition: 'all 0.65s cubic-bezier(0.34,1.56,0.64,1)',
          boxShadow: i === 0 ? '0 8px 24px rgba(47,107,255,0.28)' : 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '8px',
              background: i === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(47,107,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: i === 0 ? 'white' : '#2F6BFF',
            }}>{item.icon}</div>
            <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{item.label}</span>
          </div>
          <span style={{
            fontFamily: 'IBM Plex Mono', fontSize: '0.72rem',
            opacity: i === 0 ? 0.9 : 0.5,
            color: i === 0 ? 'white' : '#2F6BFF',
          }}>{item.stat}</span>
        </div>
      ))}
    </div>
  )
}

// ── Card 2: Telemetry Typewriter ─────────────────────────────
function TypewriterCard() {
  const messages = [
    '> Workflow analyse gestart...',
    '> Knelpunten geïdentificeerd',
    '> Automatisering actief ↑',
    '> Handmatig werk: geminimaliseerd',
    '> Datastroom: geverifieerd ✓',
    '> Nieuw proces operationeel',
  ]
  const [displayed, setDisplayed] = useState('')
  const [msgIdx, setMsgIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [history, setHistory] = useState([])

  useEffect(() => {
    const msg = messages[msgIdx]
    if (charIdx < msg.length) {
      const t = setTimeout(() => { setDisplayed(p => p + msg[charIdx]); setCharIdx(c => c + 1) }, 42)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setHistory(p => [...p.slice(-2), msg])
        setDisplayed(''); setCharIdx(0)
        setMsgIdx(i => (i + 1) % messages.length)
      }, 900)
      return () => clearTimeout(t)
    }
  }, [charIdx, msgIdx])

  return (
    <div style={{
      marginTop: '1.5rem', padding: '1.1rem', background: '#0D1117',
      borderRadius: '1rem', fontFamily: 'IBM Plex Mono', fontSize: '0.75rem', minHeight: '148px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.75rem' }}>
        <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2F6BFF', animation: 'pulse-dot 2s ease infinite' }} />
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.68rem', letterSpacing: '0.09em' }}>LIVE FEED</span>
      </div>
      {history.map((h, i) => <div key={i} style={{ color: 'rgba(255,255,255,0.25)', marginBottom: '0.3rem' }}>{h}</div>)}
      <div style={{ color: '#7C5CFF' }}>
        {displayed}
        <span style={{ animation: 'blink-cursor 1s step-end infinite', color: '#2F6BFF' }}>█</span>
      </div>
    </div>
  )
}

// ── Card 3: Cursor Protocol Scheduler ───────────────────────
function SchedulerCard() {
  const days = ['Z','M','D','W','D','V','Z']
  const [activeDay, setActiveDay] = useState(null)
  const [cursorX, setCursorX] = useState(0)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let t
    const run = () => {
      const target = 3
      setCursorX(target * 42 + 12)
      t = setTimeout(() => {
        setActiveDay(target)
        t = setTimeout(() => {
          setSaved(true)
          t = setTimeout(() => { setActiveDay(null); setSaved(false); setCursorX(0); t = setTimeout(run, 1200) }, 700)
        }, 550)
      }, 550)
    }
    t = setTimeout(run, 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <div style={{ position: 'relative', marginBottom: '0.85rem' }}>
        <div style={{
          position: 'absolute', width: '11px', height: '11px', borderRadius: '50%',
          background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)', border: '2px solid white',
          boxShadow: '0 2px 8px rgba(47,107,255,0.4)',
          transform: `translateX(${cursorX}px) translateY(8px) scale(${activeDay !== null ? 0.85 : 1})`,
          transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)', zIndex: 10, pointerEvents: 'none',
        }} />
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          {days.map((d, i) => (
            <div key={i} style={{
              flex: 1, textAlign: 'center', padding: '0.5rem 0', borderRadius: '0.5rem',
              fontSize: '0.72rem', fontFamily: 'IBM Plex Mono', fontWeight: activeDay === i ? 700 : 400,
              background: activeDay === i ? 'linear-gradient(135deg,#2F6BFF,#7C5CFF)' : 'rgba(47,107,255,0.06)',
              color: activeDay === i ? 'white' : 'rgba(13,17,23,0.45)',
              border: `1px solid ${activeDay === i ? 'transparent' : 'rgba(47,107,255,0.1)'}`,
              transition: 'all 0.3s ease',
            }}>{d}</div>
          ))}
        </div>
      </div>
      <div style={{
        padding: '0.7rem 1rem', borderRadius: '0.75rem',
        background: saved ? 'linear-gradient(135deg,#2F6BFF,#7C5CFF)' : 'rgba(47,107,255,0.06)',
        border: `1px solid ${saved ? 'transparent' : 'rgba(47,107,255,0.12)'}`,
        display: 'flex', alignItems: 'center', gap: '0.45rem', transition: 'all 0.3s ease',
      }}>
        <Check size={13} style={{ color: saved ? 'white' : '#2F6BFF' }} />
        <span style={{ fontFamily: 'IBM Plex Mono', fontSize: '0.75rem', color: saved ? 'white' : '#2F6BFF', fontWeight: 500 }}>
          {saved ? '✓ Strategie opgeslagen' : 'Opslaan'}
        </span>
      </div>
    </div>
  )
}

// ── Features Section ─────────────────────────────────────────
export default function Features() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feat-card', {
        y: 60, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const cards = [
    {
      id: 'business-analyse', num: '01', label: 'Business analyse',
      title: 'Business analyse & optimalisatie',
      desc: 'Wij brengen uw bedrijfsprocessen in kaart, identificeren knelpunten en vertalen die naar concrete verbeteringen. Van toolselectie tot implementatie — wij zorgen dat digitalisering echt iets oplevert.',
      tags: ['Procesoptimalisatie', 'Toolselectie', 'Kostenreductie'],
      content: <ShufflerCard />,
    },
    {
      id: 'websites', num: '02', label: 'Websites',
      title: 'Websites & online zichtbaarheid',
      desc: 'Wij bouwen websites die converteren. Geen templates, maar maatwerk gericht op uw doelgroep. Inclusief hosting, SEO-basis en Google Business Profile optimalisatie.',
      tags: ['Maatwerk websites', 'Conversie-optimalisatie', 'Hosting & beheer'],
      content: <TypewriterCard />,
    },
    {
      id: 'automatisering', num: '03', label: 'Automatisering',
      title: 'Automatisering & koppelingen',
      desc: 'Systemen die niet met elkaar praten kosten u uren per week. Wij koppelen uw tools aan elkaar en automatiseren terugkerende taken zodat uw team zich kan focussen op wat waarde oplevert.',
      tags: ['Systeemkoppelingen', 'Workflow automatisering', 'API-integraties'],
      content: <SchedulerCard />,
    },
  ]

  const gradText = { background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

  return (
    <section id="diensten" ref={ref} style={{ padding: '7rem 1.5rem', background: '#F6F8FB' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2F6BFF', marginBottom: '1.25rem', fontWeight: 600 }}>
            Onze diensten
          </p>
          <h2 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
            Drie manieren waarop wij uw bedrijf <span style={gradText}>laten groeien</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.5rem' }}>
          {cards.map(card => (
            <div key={card.id} id={card.id} className="feat-card" style={{
              background: 'white', border: '1px solid rgba(47,107,255,0.1)',
              borderRadius: '2rem', padding: '2rem',
              boxShadow: '0 8px 40px rgba(47,107,255,0.08)',
              transition: 'box-shadow 0.3s ease',
              display: 'flex', flexDirection: 'column',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 16px 50px rgba(47,107,255,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 8px 40px rgba(47,107,255,0.08)' }}
            >
              <div style={{ fontSize: '0.72rem', letterSpacing: '0.08em', color: '#2F6BFF', marginBottom: '1rem', fontWeight: 600 }}>
                {card.num} / {card.label}
              </div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{card.title}</h3>
              <p style={{ color: '#4A5568', fontSize: '0.9rem', lineHeight: 1.7 }}>{card.desc}</p>
              {card.content}

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem' }}>
                {card.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'IBM Plex Mono', fontSize: '0.7rem', fontWeight: 500,
                    padding: '0.3rem 0.75rem', borderRadius: '100px',
                    background: 'rgba(47,107,255,0.06)', border: '1px solid rgba(47,107,255,0.12)',
                    color: '#2F6BFF',
                  }}>{tag}</span>
                ))}
              </div>

              {/* CTA link */}
              <a href="#contact" style={{
                marginTop: '1rem', color: '#2F6BFF', textDecoration: 'none',
                fontSize: '0.88rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                transition: 'transform 0.2s ease, opacity 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.opacity = '0.8' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.opacity = '1' }}
              >
                Meer weten →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
