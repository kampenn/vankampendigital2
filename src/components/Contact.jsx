import { useState } from 'react'
import { ArrowRight, Loader2, Check } from 'lucide-react'

export default function Contact() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      
      const result = await response.json()
      if (response.ok) {
        setSubmitted(true)
      } else {
        console.error("API Error:", result)
        alert("Er ging iets mis met het versturen. Controleer de console.")
      }
    } catch (error) {
      console.error("Fetch Error:", error)
      alert("Er is een netwerkfout opgetreden bij het versturen.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const gradText = { background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

  return (
    <section id="contact" style={{ padding: '7rem 1.5rem', background: '#F6F8FB' }}>
      <div style={{
        maxWidth: '720px', margin: '0 auto',
        background: 'linear-gradient(140deg,#0B0E1A 0%,#1C2040 100%)',
        borderRadius: '3rem', padding: 'clamp(2.5rem,7vw,5rem)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Glow effects */}
        <div style={{ position: 'absolute', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(47,107,255,0.18),transparent 70%)', bottom: '-120px', right: '-120px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(124,92,255,0.12),transparent 70%)', top: '-60px', left: '-60px', pointerEvents: 'none' }} />

        <p style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1.25rem', fontWeight: 600 }}>
          Meer inzicht
        </p>

        <h2 style={{ color: 'white', fontSize: 'clamp(2rem,5vw,3.5rem)', marginBottom: '1rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Laten we <span style={gradText}>kennismaken</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '2.5rem', lineHeight: 1.75 }}>
          Laat uw e-mailadres achter voor het inplannen van een vrijblijvend gesprek, het aanvragen van een gratis bedrijfsscan, of om meer inzicht te krijgen in wat digitalisering u concreet kan opleveren.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                id="contact-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="naam@bedrijf.nl"
                required
                style={{
                  flex: 1, padding: '1rem 1.25rem', borderRadius: '100px',
                  border: '1px solid rgba(47,107,255,0.25)',
                  background: 'rgba(255,255,255,0.05)', color: 'white',
                  fontFamily: 'Satoshi', fontSize: '0.95rem', outline: 'none',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={e => e.target.style.borderColor = '#2F6BFF'}
                onBlur={e => e.target.style.borderColor = 'rgba(47,107,255,0.25)'}
              />
              <button id="contact-submit" type="submit" aria-label="Verstuur e-mailadres voor inzicht" style={{
                padding: '1rem 1.75rem', borderRadius: '100px', flexShrink: 0,
                background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)', color: 'white',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
                boxShadow: '0 4px 20px rgba(47,107,255,0.4)',
                transition: 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94),box-shadow 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(47,107,255,0.55)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(47,107,255,0.4)' }}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
        ) : (
          <div style={{
            padding: '2rem', background: 'rgba(47,107,255,0.1)',
            borderRadius: '1.5rem', border: '1px solid rgba(47,107,255,0.2)', textAlign: 'center',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✓</div>
            <p style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>Bedankt! Uw aanvraag is in goede orde ontvangen.</p>
            <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: '0.5rem', fontSize: '0.9rem' }}>Wij nemen spoedig contact met u op.</p>
          </div>
        )}

        {/* Pill badges */}
        <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          {['Vrijblijvend gesprek', 'Gratis bedrijfsscan', 'Meer informatie'].map(item => (
            <span key={item} style={{
              fontFamily: 'IBM Plex Mono', fontSize: '0.7rem', fontWeight: 500,
              padding: '0.4rem 0.85rem', borderRadius: '100px',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              color: 'white',
            }}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
