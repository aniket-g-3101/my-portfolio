import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Sun, Moon, X, Menu } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 px-6 py-4 border-b ${
        isDarkMode ? "border-gray-800" : "border-gray-200"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Enhanced Glass Background */}
      <div
        className="absolute inset-0 -z-10 backdrop-blur-xl"
        style={{
          background: isDarkMode
            ? "rgba(17, 24, 39, 0.75)"
            : "rgba(255, 255, 255, 0.75)",
          boxShadow: isDarkMode
            ? "0 4px 24px rgba(0, 0, 0, 0.3)"
            : "0 4px 20px rgba(0, 0, 0, 0.06)",
        }}
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
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
          {["Home", "Skills", "Work", "About", "Contact"].map((item, idx) => (
            <motion.div
              key={item}
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
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
                style={{ letterSpacing: '0.02em' }}
              >
                {item}
                
                {/* Background on hover */}
                <motion.div
                  className={`absolute inset-0 rounded-lg -z-10 ${
                    isDarkMode ? "bg-gray-800/50" : "bg-gray-100"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredItem === idx ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>

              {/* Animated bottom indicator */}
              <AnimatePresence>
                {hoveredItem === idx && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full ${
                      isDarkMode
                        ? "bg-blue-400"
                        : "bg-blue-600"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={toggleDarkMode}
            className={`ml-4 p-2.5 rounded-lg transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800/50 text-gray-300 hover:bg-gray-800 hover:text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
            }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </div>

        {/* Mobile Menu Buttons */}
        <div className="md:hidden flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className={`p-2.5 rounded-lg transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2.5 rounded-lg transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800/50 text-gray-300 hover:bg-gray-800"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className={`mt-4 p-3 rounded-xl border ${
              isDarkMode
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white/90 border-gray-200 shadow-lg"
            }`}>
              {["Home", "Skills", "Work", "About", "Contact"].map((item, idx) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isDarkMode
                      ? "text-gray-300 hover:text-white hover:bg-gray-700/50"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  style={{ letterSpacing: '0.02em' }}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;