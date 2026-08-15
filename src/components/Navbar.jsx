import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Code2, Sun, Moon, X, Menu } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLenisContext } from "../context/LenisContext";
import { scrollToSection as lenisScrollTo } from "../hooks/useLenis";

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const lenisRef = useLenisContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const headerRef = useRef(null);

  // GSAP entrance animation - Clearing transform on completion so position: fixed remains 100% viewport-fixed
  useEffect(() => {
    let ctx;
    if (headerRef.current) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          headerRef.current,
          { y: -100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.1,
            clearProps: "transform",
          }
        );
      });
    }
    return () => ctx?.revert();
  }, []);

  // Accurate Scroll Spy with cached section metrics to prevent layout thrashing
  useEffect(() => {
    let ticking = false;
    let sectionCache = [];

    const updateSectionCache = () => {
      const sections = ["home", "about", "skills", "certificates", "work", "contact"];
      sectionCache = sections
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.offsetTop } : null;
        })
        .filter(Boolean);
    };

    updateSectionCache();
    window.addEventListener("resize", updateSectionCache);

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);

          const scrollPosition = window.scrollY + window.innerHeight * 0.35;

          for (let i = sectionCache.length - 1; i >= 0; i--) {
            const { id, top } = sectionCache[i];
            if (scrollPosition >= top - 100) {
              setActiveSection(id);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateSectionCache);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      lenisScrollTo(sectionId, lenisRef);
    }, 150);
  };

  const navItems = ["Home", "About", "Skills", "Certificates", "Work", "Contact"];

  return (
    <header
      ref={headerRef}
      className="fixed top-3 sm:top-5 left-0 right-0 z-[9999] px-3 sm:px-6 md:px-8 flex justify-center pointer-events-none"
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Container smoothly shrinks in max-width on scroll */}
      <div
        className={`w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative flex flex-col items-center ${isScrolled ? "max-w-4xl" : "max-w-6xl"
          }`}
      >
        {/* Transparent Floating Pill Navbar with Adjusted Shrunk Height */}
        <nav
          className={`pointer-events-auto w-full rounded-2xl sm:rounded-full border backdrop-blur-xl flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
              ? "px-4 sm:px-6 py-2.5 sm:py-3 shadow-xl"
              : "px-5 sm:px-8 py-3.5 sm:py-4 shadow-lg"
            } ${isDarkMode
              ? `bg-slate-950/25 border-white/10 ${isScrolled
                ? "bg-slate-950/50 border-white/15 shadow-[0_12px_35px_rgba(0,0,0,0.5)] shadow-blue-500/10"
                : "shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
              }`
              : `bg-white/25 border-gray-200/60 ${isScrolled
                ? "bg-white/60 border-gray-300/80 shadow-[0_10px_30px_rgba(0,0,0,0.08)] shadow-blue-100/30"
                : "shadow-[0_8px_25px_rgba(0,0,0,0.04)]"
              }`
            }`}
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2.5 cursor-pointer group select-none"
            onClick={() => scrollToSection("home")}
          >
            <div
              className={`p-2 rounded-xl transition-all duration-300 ${isDarkMode
                  ? "bg-gray-800/60 group-hover:bg-blue-600/20 text-blue-400 border border-white/10"
                  : "bg-blue-50/80 group-hover:bg-blue-100 text-blue-600 border border-blue-100"
                }`}
            >
              <Code2 size={20} className="stroke-[2.2]" />
            </div>
            <div
              className={`font-bold tracking-tight transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? "text-base" : "text-base sm:text-lg"
                } ${isDarkMode ? "text-white" : "text-gray-900"}`}
              style={{ letterSpacing: "-0.02em" }}
            >
              Aniket Gavali
            </div>
          </motion.div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 sm:space-x-1.5">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.toLowerCase();
              const isHovered = hoveredItem === idx;

              return (
                <div
                  key={item}
                  onMouseEnter={() => setHoveredItem(idx)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative"
                >
                  <button
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`relative rounded-full font-semibold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${isScrolled
                        ? "px-3 sm:px-3.5 py-1.5 text-xs sm:text-[13px] lg:text-sm"
                        : "px-3 sm:px-4 py-2 text-xs sm:text-[13.5px] lg:text-[14.5px]"
                      } ${isActive
                        ? isDarkMode
                          ? "text-white font-bold"
                          : "text-blue-700 font-bold"
                        : isDarkMode
                          ? "text-gray-200 hover:text-white"
                          : "text-slate-800 hover:text-slate-950"
                      }`}
                  >
                    <span className="relative z-10">{item}</span>

                    {/* Liquid Glass Morphing Active Indicator Pill */}
                    {isActive && (
                      <motion.div
                        layoutId="activeLiquidGlassPill"
                        className={`absolute inset-0 rounded-full -z-0 backdrop-blur-md backdrop-saturate-150 ${isDarkMode
                            ? "bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-purple-600/40 border border-white/30 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4),0_4px_20px_rgba(59,130,246,0.4)]"
                            : "bg-gradient-to-r from-blue-500/25 via-indigo-500/20 to-blue-600/25 border border-blue-400/50 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.8),0_4px_16px_rgba(37,99,235,0.25)]"
                          }`}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Subtle Hover Glow for Non-Active Items */}
                    {!isActive && isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute inset-0 rounded-full -z-0 ${isDarkMode ? "bg-white/10" : "bg-slate-200/60"
                          }`}
                        transition={{ duration: 0.15 }}
                      />
                    )}
                  </button>
                </div>
              );
            })}

            {/* Dark Mode Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={toggleDarkMode}
              className={`ml-3 p-2 rounded-full transition-all duration-300 cursor-pointer border ${isDarkMode
                  ? "bg-gray-800/60 border-white/10 text-amber-300 hover:bg-gray-800 hover:text-amber-200"
                  : "bg-gray-100/70 border-gray-200 text-slate-700 hover:bg-gray-200"
                }`}
              aria-label="Toggle theme"
            >
              <motion.div
                animate={{ rotate: isDarkMode ? 180 : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {isDarkMode ? <Sun size={18} className="stroke-[2.2]" /> : <Moon size={18} className="stroke-[2.2]" />}
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 border ${isDarkMode
                  ? "bg-gray-800/60 border-white/10 text-amber-300"
                  : "bg-gray-100/70 border-gray-200 text-slate-700"
                }`}
            >
              <motion.div
                animate={{ rotate: isDarkMode ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {isDarkMode ? <Sun size={18} className="stroke-[2.2]" /> : <Moon size={18} className="stroke-[2.2]" />}
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-full transition-all duration-300 border ${isDarkMode
                  ? "bg-gray-800/60 border-white/10 text-gray-300"
                  : "bg-gray-100/70 border-gray-200 text-gray-700"
                }`}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X size={20} className="stroke-[2.5]" /> : <Menu size={20} className="stroke-[2.5]" />}
              </motion.div>
            </motion.button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto w-full mt-3 rounded-2xl overflow-hidden md:hidden border backdrop-blur-2xl shadow-2xl"
              style={{
                background: isDarkMode ? "rgba(17, 24, 39, 0.75)" : "rgba(255, 255, 255, 0.75)",
                borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(229, 231, 235, 0.8)",
              }}
            >
              <div className="p-3 space-y-1">
                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.toLowerCase();

                  return (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                          ? isDarkMode
                            ? "text-white bg-blue-600/40 font-bold border border-blue-400/40"
                            : "text-blue-600 bg-blue-50 font-bold border border-blue-200"
                          : isDarkMode
                            ? "text-gray-200 hover:text-white hover:bg-gray-800/50"
                            : "text-slate-800 hover:text-slate-950 hover:bg-gray-100"
                        }`}
                    >
                      {item}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;