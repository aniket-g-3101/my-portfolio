import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import HeroSection from './components/inputs/sections/HeroSection'
import SkillsSection from './components/inputs/sections/SkillSection'
import Certificates from './components/inputs/sections/Certificates'
import ProjectsSection from './components/inputs/sections/Projects'
import AboutSection from './components/inputs/sections/AboutSection'
import ContactSection from './components/inputs/sections/ContactSection'
import Footer from './components/inputs/sections/Footer'
import PageLoader from './components/inputs/sections/Loader'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  return (
    <ThemeProvider>
      <div>
        {isLoading && <PageLoader setIsLoading={setIsLoading} />}
        {!isLoading && (
          <>
            <Navbar />
            <HeroSection />
            <SkillsSection />
            <Certificates />
            <ProjectsSection />
            <AboutSection />
            <ContactSection />
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  )
}

export default App