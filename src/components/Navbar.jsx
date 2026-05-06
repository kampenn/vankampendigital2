import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

function Logo({ scrolled, isMobile }) {
  return (
    <div style={{ 
      fontFamily: 'Satoshi', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1.2, 
      display: 'flex', alignItems: 'baseline', gap: '0.2rem',
      background: scrolled ? 'white' : 'transparent',
      padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.4rem',
      borderRadius: '100px',
      boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
      transition: 'all 0.4s ease',
      marginLeft: scrolled ? '0' : (isMobile ? '-1rem' : '-1.4rem'), // Keep text aligned with layout when transparent
    }}>
      <span style={{ color: scrolled ? '#0D1117' : 'white', fontSize: '1rem', transition: 'color 0.4s ease' }}>VAN KAMPEN</span>
      <span style={{ 
        background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)', 
        WebkitBackgroundClip: 'text', 
        WebkitTextFillColor: 'transparent', 
        backgroundClip: 'text', 
        fontSize: '1rem', 
        opacity: scrolled ? 1 : 0, 
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
          <Logo scrolled={scrolled} isMobile={isMobile} />
        </div>

        <a href="#contact" style={{
          pointerEvents: scrolled ? 'auto' : 'none',
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.4rem', borderRadius: '100px',
          background: 'linear-gradient(135deg,#2F6BFF,#7C5CFF)', color: 'white',
          fontFamily: 'Satoshi', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
          boxShadow: scrolled ? '0 4px 20px rgba(47,107,255,0.35)' : 'none',
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)',
          transition: 'all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
        onMouseEnter={e => { if(scrolled) { e.currentTarget.style.transform = 'translateY(-1px) scale(1.04)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(47,107,255,0.55)' } }}
        onMouseLeave={e => { if(scrolled) { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(47,107,255,0.35)' } }}
        >Kennismaken <ArrowRight size={14} /></a>
      </div>
    </>
  )
}
