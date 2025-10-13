import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import HeroSection from './components/inputs/sections/HeroSection'
import SkillsSection from './components/inputs/sections/SkillSection'
import Certificates from './components/inputs/sections/Certificates'
import ProjectsSection from './components/inputs/sections/Projects'
import AboutSection from './components/inputs/sections/AboutSection'
import ContactSection from './components/inputs/sections/ContactSection'
import Footer from './components/inputs/sections/Footer'

const App = () => {
  return (
    <ThemeProvider>
    <div>
      <Navbar />
      <HeroSection />
      <SkillsSection/>
      <Certificates/>
      <ProjectsSection/>
      <AboutSection/>
      <ContactSection/>
      <Footer/>
    </div>
    </ThemeProvider>
  )
}

export default App
