import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Sun, Moon, X, Menu } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    setHasEntered(true);
  }, []);

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "skills", "work", "about", "contact"];
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 300);
  };

  const navItems = ["Home", "Skills", "Work", "About", "Contact"];

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 px-6 py-4 border-b ${
        isDarkMode ? "border-gray-800" : "border-gray-200"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hasEntered ? 0 : -100, opacity: hasEntered ? 1 : 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Enhanced Glass Background */}
      <motion.div
        className="absolute inset-0 -z-10 backdrop-blur-xl"
        style={{
          background: isDarkMode
            ? "rgba(17, 24, 39, 0.75)"
            : "rgba(255, 255, 255, 0.75)",
          boxShadow: isDarkMode
            ? "0 4px 24px rgba(0, 0, 0, 0.3)"
            : "0 4px 20px rgba(0, 0, 0, 0.06)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hasEntered ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: hasEntered ? 1 : 0, x: hasEntered ? 0 : -20 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-3 cursor-pointer group select-none"
          onClick={() => scrollToSection("home")}
        >
          <div className={`p-2 rounded-lg transition-all duration-300 ${
            isDarkMode 
              ? "bg-gray-800/50 group-hover:bg-gray-800" 
              : "bg-blue-50 group-hover:bg-blue-100"
          }`}>
            <Code2
              size={24}
              className={`transition-colors duration-300 ${
                isDarkMode 
                  ? "text-blue-400 group-hover:text-blue-300" 
                  : "text-blue-600 group-hover:text-blue-700"
              }`}
            />
          </div>
          <div
            className={`text-lg font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
            style={{ letterSpacing: '-0.01em' }}
          >
            Aniket Gavali
          </div>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.toLowerCase();
            
            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : -10 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5 + idx * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                onMouseEnter={() => setHoveredItem(idx)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative"
              >
                <motion.button
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? isDarkMode
                        ? "text-blue-400"
                        : "text-blue-600"
                      : isDarkMode
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                  style={{ letterSpacing: '0.02em' }}
                >
                  {item}
                  
                  {/* Background on hover or active */}
                  <motion.div
                    className={`absolute inset-0 rounded-lg -z-10 ${
                      isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredItem === idx || isActive ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>

                {/* Animated bottom indicator - shows on hover or when active */}
                <AnimatePresence>
                  {(hoveredItem === idx || isActive) && (
                    <motion.div
                      layoutId={isActive ? "activeIndicator" : `hoverIndicator-${idx}`}
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full ${
                        isActive
                          ? isDarkMode
                            ? "bg-blue-400"
                            : "bg-blue-600"
                          : isDarkMode
                          ? "bg-gray-500"
                          : "bg-gray-400"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }}
                      exit={{ width: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Dark Mode Toggle */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: hasEntered ? 1 : 0, scale: hasEntered ? 1 : 0.8 }}
            transition={{ duration: 0.5, delay: 1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className={`ml-4 p-2.5 rounded-lg transition-all duration-300 cursor-pointer ${
              isDarkMode
                ? "bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            }`}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu Buttons */}
        <div className="md:hidden flex items-center space-x-2">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: hasEntered ? 1 : 0, scale: hasEntered ? 1 : 0.8 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className={`p-2.5 rounded-lg transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <motion.div
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.div>
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: hasEntered ? 1 : 0, scale: hasEntered ? 1 : 0.8 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2.5 rounded-lg transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.3 }}
              className={`mt-4 p-3 rounded-xl border ${
                isDarkMode
                  ? "bg-gray-800/50 border-gray-700"
                  : "bg-white/90 border-gray-200 shadow-lg"
              }`}
            >
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.toLowerCase();
                
                return (
                  <motion.button
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? isDarkMode
                          ? "text-blue-400 bg-gray-700/50"
                          : "text-blue-600 bg-blue-50"
                        : isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    style={{ letterSpacing: '0.02em' }}
                  >
                    {item}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;