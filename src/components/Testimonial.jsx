import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const allReviews = [
  {
    id: 1,
    name: 'Vincent',
    title: 'Magister',
    text: "Nick is a great analist and excels at making sense of complex problems with many actors. He manages to go really in-depth whilst taking into account many different perspectives. With his approach to problem-solving he creates goodwill with his stakeholders by making them feel included and thereby creating buy-in for his conclusions. He is conscientious and professional, but also a lot of fun to work with."
  },
  {
    id: 2,
    name: 'Martijn Korving',
    title: 'Scrum Master / Agile coach — DUO',
    text: "Ik heb met Nick mogen samenwerken bij DUO. Hij kwam terecht in een dynamisch team met veel unieke persoonlijkheden. We ontwikkelden complexe processen die Nick snel wist te doorgronden. Daardoor was hij in staat om heldere ontwerpen te maken waar ontwikkelaars en testers goed mee uit de voeten konden. Daarnaast nam Nick de regie binnen het team en pakte hij ook de Scrum Master-rol op. Hij verdiende respect met de kwaliteit van zijn werk en wist het team dezelfde kant op te krijgen. Hierdoor werden flinke stappen gezet en is het project uiteindelijk eerder afgerond dan oorspronkelijk begroot. Kortom: de juiste man op de juiste plek."
  }
]

export default function Testimonial() {
  const containerRef = useRef(null)
  const scrollRef = useRef(null)
  const [reviews, setReviews] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const isAutoPlaying = useRef(true) 

  // Muis drag state refs
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)

  // Randomize reviews on mount
  useEffect(() => {
    setReviews([...allReviews].sort(() => Math.random() - 0.5))
  }, [])

  // Auto-slide timer
  useEffect(() => {
    if (reviews.length === 0) return
    const interval = setInterval(() => {
      if (!isAutoPlaying.current) return
      const nextIndex = (activeIndex + 1) % reviews.length
      scrollToCard(nextIndex)
    }, 7000)
    return () => clearInterval(interval)
  }, [reviews, activeIndex])

  const scrollToCard = useCallback((i) => {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const targetItem = el.children[i]
    if (targetItem) {
      const scrollPos = targetItem.offsetLeft - (el.offsetWidth / 2) + (targetItem.offsetWidth / 2)
      el.scrollTo({ left: scrollPos, behavior: 'smooth' })
    }
  }, [])

  // Gebruik IntersectionObserver voor foutloze en high-performance detectie van de actieve card
  useEffect(() => {
    if (!scrollRef.current || reviews.length === 0) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveIndex(Number(entry.target.dataset.index))
        }
      })
    }, { root: scrollRef.current, threshold: 0.6 })

    const children = scrollRef.current.children
    Array.from(children).forEach(child => {
      // Observeer alleen de review cards (die data-index hebben)
      if (child.hasAttribute('data-index')) {
        observer.observe(child)
      }
    })

    return () => observer.disconnect()
  }, [reviews])

  const handleMouseDown = (e) => {
    setIsDragging(true)
    isAutoPlaying.current = false
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeftStart.current = scrollRef.current.scrollLeft
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    isAutoPlaying.current = true
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    isAutoPlaying.current = true
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault() // Voorkomt vervelende tekstselectie tijdens het slepen
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5 // Scroll snelheid
    scrollRef.current.scrollLeft = scrollLeftStart.current - walk
  }

  // Scroll animations voor de hele sectie
  useEffect(() => {
    if (reviews.length === 0) return
    
    const ctx = gsap.context(() => {
      gsap.from('.testi-item', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 30, opacity: 0, duration: 0.9, stagger: 0.12,
        ease: 'power3.out'
      })
    }, containerRef)
    return () => ctx.revert()
  }, [reviews])

  return (
    <section ref={containerRef} style={{
      padding: '5rem 0 3rem 0',
      background: '#F6F8FB',
      position: 'relative', overflow: 'hidden',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)', // Garandeert full bleed achtergrond als parent een wrapper is
    }}>
      <div className="testi-item" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '48px', height: '48px', borderRadius: '50%',
          background: 'rgba(47,107,255,0.08)', border: '1px solid rgba(47,107,255,0.15)',
          color: '#2F6BFF'
        }}>
          <Quote size={22} />
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="testi-item testi-scroller" 
        // Stop autoplay and handle grabbing
        onTouchStart={() => isAutoPlaying.current = false}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: isDragging ? 'none' : 'x mandatory', // Dit werkt nu wél perfect omdat het state is!
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          padding: '2rem calc(50vw - clamp(150px, 37.5vw, 380px))', 
          gap: '2.5rem',
          alignItems: 'center',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: isDragging ? 'none' : 'auto' // Voorkomt tekst highlights
        }}
      >
        <style>{`.testi-scroller::-webkit-scrollbar { display: none; }`}</style>

        {reviews.map((review, i) => {
          const isActive = activeIndex === i;
          return (
            <div data-index={i} key={review.id} style={{
              flex: '0 0 auto',
              width: 'clamp(300px, 75vw, 760px)',
              scrollSnapAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center',
              background: 'white',
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              borderRadius: '2rem',
              boxShadow: isActive ? '0 12px 40px rgba(47,107,255,0.08)' : 'none',
              opacity: isActive ? 1 : 0.35, // Blur weggehaald! Alleen opacity transition overgehouden ivm rendering bugs.
              transform: isActive ? 'scale(1)' : 'scale(0.92)',
              transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
              cursor: 'inherit'
            }}>
              <p style={{
                fontFamily: 'Satoshi', // Aangepast naar leesbaar web font
                fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
                fontWeight: 500,
                color: '#1A202C', 
                lineHeight: 1.7, 
                marginBottom: '2.5rem'
              }}>
                "{review.text}"
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                <div style={{
                  fontFamily: 'Satoshi', fontWeight: 700, fontSize: '1.05rem', color: '#0D1117'
                }}>
                  {review.name}
                </div>
                <div style={{
                  fontFamily: 'IBM Plex Mono', fontSize: '0.75rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: '#2F6BFF', fontWeight: 600
                }}>
                  {review.title}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigatie Dotjes */}
      {reviews.length > 1 && (
        <div className="testi-item" style={{
          display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem', marginBottom: '2.5rem'
        }}>
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                isAutoPlaying.current = false;
                scrollToCard(i);
              }}
              style={{
                width: activeIndex === i ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: activeIndex === i ? '#2F6BFF' : 'rgba(47,107,255,0.2)',
                border: 'none', cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0
              }}
              aria-label={`Ga naar review ${i + 1}`}
            />
          ))}
        </div>
      )}

      <div className="testi-item" style={{ textAlign: 'center' }}>
        <a
          href="https://www.linkedin.com/in/nick-van-kampen/details/recommendations/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: 'IBM Plex Mono', fontSize: '0.65rem', letterSpacing: '0.05em',
            color: 'rgba(47,107,255,0.6)', textDecoration: 'none',
            transition: 'color 0.3s ease',
            display: 'inline-block'
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#2F6BFF'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(47,107,255,0.6)'}
        >
          Bekijk alle aanbevelingen →
        </a>
      </div>
    </section>
  )
}
