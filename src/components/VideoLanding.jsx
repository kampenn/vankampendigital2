import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

export default function VideoLanding() {
  const desktopRef = useRef(null)
  const mobileRef = useRef(null)

  useEffect(() => {
    let interactionHandled = false;

    const attemptPlay = () => {
      const vids = [desktopRef.current, mobileRef.current];
      vids.forEach(v => {
        if (v) {
          // Force mutated properties directly on DOM elements for Safari
          v.defaultMuted = true;
          v.muted = true;
          v.playsInline = true;
          
          const playPromise = v.play();
          if (playPromise !== undefined) {
            playPromise.catch(e => {
              // Ignore rejection, rely on the interaction fallback
              console.log('Autoplay temporarily blocked by browser:', e.message);
            });
          }
        }
      });
    };

    // 1. Eerste poging direct bij laden
    attemptPlay();

    // 2. The "Double Barrage" Fallback: Activeer op éérste interactie
    const handleInteraction = () => {
      if (interactionHandled) return;
      interactionHandled = true;
      
      attemptPlay();
      
      // Verwijder listeners nadat ze 1x zijn afgevuurd
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
    };

    window.addEventListener('touchstart', handleInteraction, { passive: true });
    window.addEventListener('click', handleInteraction, { passive: true });
    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('mousemove', handleInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
    }
  }, [])

  return (
    <section style={{ 
      width: '100%', height: '100dvh', position: 'relative', overflow: 'hidden', 
      background: '#FFFFFF', display: 'flex', justifyContent: 'center', alignItems: 'center' 
    }}>
      <style>
        {`
          .landing-video {
            width: 100%;
            max-width: 1600px;
            height: 100%;
            object-fit: contain;
            background-color: transparent;
            transform: scale(1.015);
          }
          .desktop-video { display: block; }
          .mobile-video { display: none; }
          
          @media (max-width: 1100px) {
            .desktop-video { display: none; }
            .mobile-video { display: block; }
          }
        `}
      </style>

      {/* Desktop Video (statisch in de DOM) */}
      <video
        ref={desktopRef}
        className="landing-video desktop-video"
        src="/digitallandscapev3.mp4"
        autoPlay
        playsInline
        muted
        preload="auto"
      />

      {/* Mobile Video (statisch in de DOM) */}
      <video
        ref={mobileRef}
        className="landing-video mobile-video"
        src="/digitalportret.mp4"
        autoPlay
        playsInline
        muted
        preload="auto"
      />

      {/* Scroll hint bouncing */}
      <div style={{
          position: 'absolute', bottom: '2.5rem', left: 0, right: 0,
          display: 'flex', justifyContent: 'center', pointerEvents: 'none',
        }}>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
            color: '#2F6BFF', fontFamily: 'IBM Plex Mono', fontWeight: 600,
            fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase',
            animation: 'float 2.5s ease-in-out infinite',
            textShadow: '0 4px 15px rgba(47,107,255,0.2)'
          }}>
            <ChevronDown size={18} style={{ filter: 'drop-shadow(0 4px 15px rgba(47,107,255,0.2))' }} />
            <span>Scroll</span>
          </div>
      </div>
    </section>
  )
}
