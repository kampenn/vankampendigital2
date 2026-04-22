import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import VideoLanding from './components/VideoLanding'
import Hero from './components/Hero'
import Clients from './components/Clients'
import Testimonial from './components/Testimonial'
import Features from './components/Features'
import ScanCTA from './components/ScanCTA'
import Philosophy from './components/Philosophy'
import Protocol from './components/Protocol'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  return (
    <>
      <Navbar />
      <VideoLanding />
      <Hero />
      <Clients />
      <Testimonial />
      <Features />
      <ScanCTA />
      <Philosophy />
      <Protocol />
      <Contact />
      <Footer />
    </>
  )
}
