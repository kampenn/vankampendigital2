import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [remarks, setRemarks] = useState('')
  const [botcheck, setBotcheck] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !name || isSubmitting) return

    setIsSubmitting(true)

    // Gekoppeld aan nick@vankampendigital.nl via Web3Forms
    const accessKey = "f753bca6-813d-454d-a9e9-95c4dc426ef9" 

    if (!accessKey || accessKey === "JOUW_WEB3FORMS_SLEUTEL_HIER") {
      alert("Let op: De e-mail server (Web3Forms) is nog niet gekoppeld. Vul je access key in binnen src/components/Contact.jsx!")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: name,
          email: email,
          phone: phone,
          message: remarks,
          botcheck: botcheck,
          subject: `Nieuwe aanvraag via website — VAN KAMPEN Digital`,
          from_name: "VAN KAMPEN Digital",
        }),
      })
      const result = await response.json()
      if (result.success) {
        setSubmitted(true)
      } else {
        alert("Er ging iets mis met de e-mail server. Probeer het later opnieuw.")
      }
    } catch (error) {
      alert("Er is een netwerkfout opgetreden bij het versturen.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const gradText = { background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }

  const inputStyle = {
    width: '100%', padding: '1rem 1.25rem', borderRadius: '16px',
    border: '1px solid rgba(47,107,255,0.25)',
    background: 'rgba(255,255,255,0.05)', color: 'white',
    fontFamily: 'Satoshi', fontSize: '0.95rem', outline: 'none',
    transition: 'border-color 0.2s ease',
  }

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
        <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: '1.5rem', lineHeight: 1.75 }}>
          Vul uw gegevens in en wij nemen zo snel mogelijk contact met u op.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Honeypot field om spam bots af te weren */}
            <input 
              type="checkbox" 
              name="botcheck" 
              className="hidden" 
              style={{ display: 'none' }} 
              onChange={e => setBotcheck(e.target.checked)} 
            />

            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Uw naam"
              required
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#2F6BFF'}
              onBlur={e => e.target.style.borderColor = 'rgba(47,107,255,0.25)'}
            />

            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="E-mailadres"
              required
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#2F6BFF'}
              onBlur={e => e.target.style.borderColor = 'rgba(47,107,255,0.25)'}
            />

            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Telefoonnummer"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#2F6BFF'}
              onBlur={e => e.target.style.borderColor = 'rgba(47,107,255,0.25)'}
            />

            <textarea
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
              placeholder="Opmerkingen"
              rows={4}
              style={{ ...inputStyle, resize: 'vertical' }}
              onFocus={e => e.target.style.borderColor = '#2F6BFF'}
              onBlur={e => e.target.style.borderColor = 'rgba(47,107,255,0.25)'}
            />

            <button type="submit" aria-label="Verstuur aanvraag" style={{
              padding: '1rem 1.75rem', borderRadius: '16px', marginTop: '0.5rem',
              background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)', color: 'white',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              boxShadow: '0 4px 20px rgba(47,107,255,0.4)', fontWeight: 600, fontSize: '1rem', fontFamily: 'Satoshi',
              transition: 'transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94),box-shadow 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(47,107,255,0.55)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(47,107,255,0.4)' }}
            >
              {isSubmitting ? 'Versturen...' : 'Verstuur aanvraag'}
              {!isSubmitting && <ArrowRight size={18} />}
            </button>
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

      </div>
    </section>
  )
}
