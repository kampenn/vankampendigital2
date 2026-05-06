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

  const baseFixed = {
    position: 'fixed',
    top: '1.25rem',
    zIndex: 1000,
  }

  return (
    <>
      {/* Logo — vrij zwevend linksboven */}
      <div style={{
        ...baseFixed,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 3rem)',
        maxWidth: '1100px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{ pointerEvents: 'auto' }}>
          <Logo dark={scrolled} />
        </div>

        {/* Kennismaken button — altijd zichtbaar */}
        <a href="#contact" style={{
          pointerEvents: 'auto',
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.4rem', borderRadius: '100px',
          background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)', color: 'white',
          fontFamily: 'Satoshi', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(47,107,255,0.35)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04) translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(47,107,255,0.55)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(47,107,255,0.35)' }}
        >Kennismaken <ArrowRight size={14} /></a>
      </div>
    </>
  )
}
