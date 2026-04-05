import { Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      background: '#0B0E1A', borderRadius: '3rem 3rem 0 0',
      padding: '4rem 1.5rem 2.5rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'Satoshi', fontWeight: 900, letterSpacing: '-0.04em', fontSize: '1rem', lineHeight: 1, marginBottom: '1rem' }}>
              <span style={{ color: 'white' }}>VAN KAMPEN</span>
              <span style={{ background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}> Digital</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '200px' }}>
              Digitalisering die winst verhoogt en kosten bespaart.
            </p>
          </div>

          {/* Diensten */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem' }}>Diensten</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {['Procesoptimalisatie','Klantervaring','Software bouwen','Websites','Tooling advies'].map(l => (
                <li key={l}><a href="#" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}>{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Aanpak */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem' }}>Aanpak</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {['Analyse & advies','Ontwerp','Implementatie','Monitoring'].map(l => (
                <li key={l}><a href="#" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}>{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1rem' }}>Contact</h4>
            <a href="mailto:nick@vankampendigital.nl" style={{
              color: 'rgba(255,255,255,0.35)', textDecoration: 'none', fontSize: '0.85rem',
              display: 'flex', alignItems: 'center', gap: '0.45rem', transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'white'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
            ><Mail size={13} /> nick@vankampendigital.nl</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.78rem' }}>
            © 2025 VAN KAMPEN Digital. Alle rechten voorbehouden.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontFamily: 'IBM Plex Mono', fontSize: '0.68rem', color: 'rgba(255,255,255,0.25)' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', animation: 'pulse-dot 2s ease infinite' }} />
            SYSTEEM OPERATIONEEL
          </div>
        </div>
      </div>
    </footer>
  )
}
