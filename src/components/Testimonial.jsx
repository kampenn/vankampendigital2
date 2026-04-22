import { useEffect, useRef, useState } from 'react'
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
  const [reviews, setReviews] = useState([])

  // Randomize reviews on mount
  useEffect(() => {
    setReviews([...allReviews].sort(() => Math.random() - 0.5))
  }, [])

  useEffect(() => {
    if (reviews.length === 0) return;
    
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
      padding: '5rem 0',
      background: '#F6F8FB',
      position: 'relative', overflow: 'hidden'
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

      <div className="testi-item" style={{
        display: 'flex',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none',  /* IE and Edge */
        paddingBottom: '2rem',
      }}>
        <style>{`.testi-item::-webkit-scrollbar { display: none; }`}</style>
        
        {reviews.map((review) => (
          <div key={review.id} style={{
            flex: '0 0 100%',
            scrollSnapAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            cursor: 'grab' // Hinting that it's swipeable
          }}>
            <div style={{ maxWidth: '780px', width: '100%', textAlign: 'center', padding: '0 1.5rem' }}>
              <p style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontWeight: 600,
                color: '#0D1117', lineHeight: 1.6, marginBottom: '2.5rem'
              }}>
                "{review.text}"
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                <div style={{
                  fontFamily: 'Satoshi', fontWeight: 700, fontSize: '1rem', color: '#0D1117'
                }}>
                  {review.name}
                </div>
                <div style={{
                  fontFamily: 'IBM Plex Mono', fontSize: '0.7rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: '#2F6BFF', fontWeight: 600
                }}>
                  {review.title}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
