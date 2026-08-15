import { useEffect } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { LenisContext } from './context/LenisContext'
import Navbar from './components/Navbar'
import AnimatedGradient from './components/ui/animated-gradient'
import HeroSection from './components/inputs/sections/HeroSection'
import AboutSection from './components/inputs/sections/AboutSection'
import SkillsSection from './components/inputs/sections/SkillSection'
import Certificates from './components/inputs/sections/Certificates'
import ProjectsSection from './components/inputs/sections/Projects'
import ContactSection from './components/inputs/sections/ContactSection'
import Footer from './components/inputs/sections/Footer'
import { useLenis } from './hooks/useLenis'

const MainContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <>
      {/* Root-Level Persistent Animated Dynamic WebGL Background */}
      <div className="fixed inset-0 -z-50 pointer-events-none transition-colors duration-700">
        <AnimatedGradient
          isDarkMode={isDarkMode}
          noise={{ opacity: isDarkMode ? 0.3 : 0.15, scale: 1 }}
        />
      </div>

      {/* Root Viewport-Fixed Floating Navbar */}
      <Navbar />

      {/* Website Content */}
      <div id="page-root" className="relative z-10 bg-transparent">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <Certificates />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  )
}

const App = () => {
  const lenisRef = useLenis()

  // Force scroll to top on every fresh reload
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [])

  return (
    <LenisContext.Provider value={lenisRef}>
      <ThemeProvider>
        <MainContent />
      </ThemeProvider>
    </LenisContext.Provider>
  )
}

export default App