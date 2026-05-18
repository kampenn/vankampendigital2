import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

export function useAutoplay() {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;            // dubbel-check, Safari is streng
    video.setAttribute("playsinline", "");

    const tryPlay = () => {
      const p = video.play();
      if (p !== undefined) {
        p.catch(() => {
          // Safari blokkeerde alsnog → start bij eerste user interaction
          const resume = () => {
            video.play().catch(() => {});
            window.removeEventListener("touchstart", resume);
            window.removeEventListener("click", resume);
            window.removeEventListener("scroll", resume);
          };
          window.addEventListener("touchstart", resume, { once: true });
          window.addEventListener("click", resume, { once: true });
          window.addEventListener("scroll", resume, { once: true });
        });
      }
    };

    if (video.readyState >= 2) tryPlay();
    else video.addEventListener("loadeddata", tryPlay, { once: true });
  }, []);

  return ref;
}

export default function VideoLanding() {
  const desktopRef = useAutoplay();
  const mobileRef = useAutoplay();

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
        muted
        playsInline
        loop
        preload="auto"
      />

      {/* Mobile Video (statisch in de DOM) */}
      <video
        ref={mobileRef}
        className="landing-video mobile-video"
        src="/digitalportret.mp4"
        autoPlay
        muted
        playsInline
        loop
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
