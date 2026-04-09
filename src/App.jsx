import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import VideoLanding from './components/VideoLanding'
import Hero from './components/Hero'
import Clients from './components/Clients'
import Features from './components/Features'
import Philosophy from './components/Philosophy'
import Testimonial from './components/Testimonial'

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
      <Philosophy />

      <Protocol />
      <Contact />
      <Footer />
    </>
  )
}
