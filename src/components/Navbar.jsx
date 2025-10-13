import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Sun, Moon, X } from "lucide-react";
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
      className={`fixed top-0 w-full z-50 px-6 py-4 border-b overflow-hidden ${
        isDarkMode ? "border-gray-800" : "border-gray-300"
      }`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* 💧 Liquid Glass Background */}
      <motion.div
        className="absolute inset-0 -z-10 backdrop-blur-2xl rounded-b-xl overflow-hidden"
        style={{
          background: isDarkMode
            ? "linear-gradient(135deg, rgba(15,15,15,0.6), rgba(40,40,40,0.25))"
            : "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(245,245,245,0.4))",
          boxShadow: isDarkMode
            ? "0 8px 32px rgba(0, 0, 0, 0.4)"
            : "0 8px 24px rgba(180, 180, 180, 0.25)",
          border: isDarkMode
            ? "1px solid rgba(90,90,90,0.3)"
            : "1px solid rgba(200,200,200,0.4)",
        }}
      >
        {/* flowing shine */}
        <motion.div
          className="absolute top-0 left-[-50%] w-[200%] h-full opacity-15 pointer-events-none"
          animate={{ x: ["-50%", "50%"] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%)",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto flex items-center justify-between relative z-10">
        {/* Left: Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center space-x-3 cursor-pointer group select-none"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 4,
            }}
          >
            <Code2
              size={26}
              className="text-blue-500 group-hover:text-blue-400 transition-colors duration-300"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className={`text-lg font-bold tracking-wide bg-gradient-to-r bg-clip-text text-transparent ${
              isDarkMode
                ? "from-blue-400 via-purple-400 to-pink-400"
                : "from-blue-700 via-purple-600 to-pink-500"
            }`}
          >
            Aniket Gavali
          </motion.div>
        </motion.div>

        {/* Right: Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {["Home", "Skills", "Work", "About", "Contact"].map((item, idx) => (
            <motion.div
              key={item}
              onMouseEnter={() => setHoveredItem(idx)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative"
            >
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`relative text-sm uppercase tracking-wider px-1 transition-all duration-300 font-medium cursor-pointer ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-800 hover:text-blue-700"
                }`}
              >
                {item}
              </motion.button>

              {/* Hover underline */}
              <AnimatePresence>
                {hoveredItem === idx && (
                  <motion.div
                    layoutId="underline"
                    className={`absolute left-0 right-0 h-[2px] rounded-full bottom-0 ${
                      isDarkMode
                        ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                        : "bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400"
                    }`}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  />
                )}
              </AnimatePresence>

              {/* Hover glow */}
              <AnimatePresence>
                {hoveredItem === idx && (
                  <motion.div
                    className="absolute inset-0 rounded-md -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.35 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    style={{
                      background: isDarkMode
                        ? "radial-gradient(circle at center, rgba(90,90,255,0.18), transparent 70%)"
                        : "radial-gradient(circle at center, rgba(130,170,255,0.22), transparent 70%)",
                      filter: "blur(6px)",
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Dark Mode Toggle */}
          <motion.button
            whileHover={{ rotate: 15 }}
            whileTap={{ rotate: -10 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors duration-300 cursor-pointer ${
              isDarkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleDarkMode(isDarkMode ? "light" : "dark")}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            {isMenuOpen ? (
              <X size={22} />
            ) : (
              <Code2 size={22} />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className={`md:hidden mt-4 p-4 rounded-lg border ${
              isDarkMode
                ? "bg-gray-900 border-gray-800"
                : "bg-white border-gray-200"
            }`}
          >
            {["Home", "Skills", "Work", "About", "Contact"].map((item) => (
              <motion.button
                key={item}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 260, damping: 15 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`block w-full text-left py-2 text-sm uppercase tracking-wider transition-colors ${
                  isDarkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-800 hover:text-blue-600"
                }`}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
