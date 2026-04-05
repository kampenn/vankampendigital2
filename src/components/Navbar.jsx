import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

function Logo({ dark }) {
  return (
    <div style={{ fontFamily: 'Satoshi', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.2, display: 'flex', alignItems: 'baseline', gap: '0.2rem' }}>
      <span style={{ color: dark ? '#0D1117' : 'white', fontSize: '1rem', transition: 'color 0.4s ease' }}>VAN KAMPEN</span>
      <span style={{ 
        background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)', 
        WebkitBackgroundClip: 'text', 
        WebkitTextFillColor: 'transparent', 
        backgroundClip: 'text', 
        fontSize: '1rem', 
        opacity: dark ? 1 : 0, 
        transition: 'opacity 0.4s ease',
        padding: '0.1em 0',
        margin: '-0.1em 0'
      }}>Digital</span>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    
    const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const navStyle = {
    position: 'fixed', top: '1.25rem', left: '50%', transform: 'translateX(-50%)',
    zIndex: 1000, width: 'calc(100% - 3rem)', maxWidth: '1100px',
    borderRadius: '100px', padding: isMobile ? '0.6rem 1rem' : '0.8rem 1.5rem',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
    background: scrolled ? 'rgba(246,248,251,0.9)' : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
    border: scrolled ? '1px solid rgba(47,107,255,0.15)' : '1px solid transparent',
    boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.08)' : 'none',
  }

  return (
    <nav style={navStyle}>
      <Logo dark={scrolled} />
      <div style={{ display: 'flex', gap: isMobile ? '1rem' : '2rem', alignItems: 'center' }}>
        {!isMobile && [['Diensten','#diensten'],['Aanpak','#aanpak'],['Contact','#contact']].map(([label, href]) => (
          <a key={label} href={href} style={{
            fontFamily: 'Satoshi', fontWeight: 600, fontSize: '0.9rem',
            color: scrolled ? '#0D1117' : 'white', textDecoration: 'none',
            transition: 'transform 0.2s ease, opacity 0.2s ease', opacity: 0.8,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.opacity = '1' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.opacity = '0.8' }}
          >{label}</a>
        ))}
        <a href="#contact" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.4rem', borderRadius: '100px',
          background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)', color: 'white',
          fontFamily: 'Satoshi', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
          boxShadow: scrolled ? '0 4px 16px rgba(47,107,255,0.3)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? 'auto' : 'none',
          transform: scrolled ? 'translateY(0)' : 'translateY(-10px)'
        }}
        onMouseEnter={e => { if(scrolled) { e.currentTarget.style.transform = 'scale(1.03) translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(47,107,255,0.5)' } }}
        onMouseLeave={e => { if(scrolled) { e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(47,107,255,0.3)' } }}
        >Meer inzicht <ArrowRight size={14} /></a>
      </div>
    </nav>
  )
}
