import { useTheme } from "../../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { CERTIFICATES } from "../../../utils/data";
import { X, Award, Calendar, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

export default function Certificates() {
  const { isDarkMode } = useTheme();
  const [selectedCert, setSelectedCert] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef(null);

  // Check scroll position to show/hide navigation buttons
  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScroll);
      checkScroll(); // Initial check
      
      // Check on window resize
      window.addEventListener('resize', checkScroll);
      
      return () => {
        carousel.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 350;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Smooth modal animations
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const modalContentVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, 
        ease: [0.34, 1.56, 0.64, 1] // Smooth spring effect
      }
    },
    exit: { 
      scale: 0.95, 
      opacity: 0,
      y: 10,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section
      id="certificates"
      className={`relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden transition-colors duration-500 ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-blue-50 via-white to-gray-100 text-gray-900"
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-5 ${
            isDarkMode ? "bg-blue-500" : "bg-blue-400"
          }`}
        />
        <div
          className={`absolute bottom-20 left-20 w-48 h-48 rounded-full blur-3xl opacity-5 ${
            isDarkMode ? "bg-purple-500" : "bg-pink-400"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <Award className={isDarkMode ? "text-blue-400" : "text-blue-600"} size={20} />
            <span className={`text-xs sm:text-sm uppercase tracking-widest font-semibold ${
              isDarkMode ? "text-gray-400" : "text-blue-600"
            }`}>
              Certifications
            </span>
          </div>

          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Professional{" "}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
              Credentials
            </span>
          </h2>

          <p className={`text-base sm:text-lg max-w-2xl mx-auto px-4 ${
            isDarkMode ? "text-gray-400" : "text-gray-700"
          }`}>
            Continuous learning and professional development across various technologies
          </p>
        </motion.div>

        {/* Horizontal Scrollable Layout */}
        <div className="relative">
          {/* Navigation Buttons - Desktop */}
          <AnimatePresence>
            {canScrollLeft && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                onClick={() => scroll("left")}
                className={`absolute left-0 sm:left-2 md:left-0 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/90 hover:bg-gray-700 text-white backdrop-blur-sm"
                    : "bg-white/90 hover:bg-gray-50 text-gray-900 shadow-md backdrop-blur-sm"
                }`}
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </motion.button>
            )}

            {canScrollRight && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                onClick={() => scroll("right")}
                className={`absolute right-0 sm:right-2 md:right-0 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/90 hover:bg-gray-700 text-white backdrop-blur-sm"
                    : "bg-white/90 hover:bg-gray-50 text-gray-900 shadow-md backdrop-blur-sm"
                }`}
                aria-label="Scroll right"
              >
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Certificates Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto scrollbar-hide py-6 sm:py-8 px-2 sm:px-4 md:px-12 snap-x snap-mandatory scroll-smooth"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
            }}
          >
            {CERTIFICATES.map((cert, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
                onClick={() => setSelectedCert(cert)}
                className={`w-[280px] sm:w-[300px] md:w-[320px] h-[380px] sm:h-[400px] md:h-[420px] cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 snap-start flex-shrink-0 flex flex-col ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20"
                    : "bg-white border-gray-200 hover:border-blue-400 shadow-md hover:shadow-xl"
                }`}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Image Container */}
                <div className="relative h-[200px] sm:h-[220px] md:h-[240px] w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                  <motion.img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain p-2 sm:p-3"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute inset-0 flex items-center justify-center ${
                      isDarkMode ? "bg-black/70" : "bg-black/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 text-white text-sm font-semibold">
                      <ExternalLink size={16} />
                      <span>View Certificate</span>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`font-bold text-sm sm:text-base mb-2 sm:mb-3 line-clamp-2 min-h-[40px] sm:min-h-[48px] ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {cert.title}
                    </h3>
                    
                    <p className={`text-xs sm:text-sm font-medium mb-2 sm:mb-3 line-clamp-1 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}>
                      {cert.issuer}
                    </p>
                  </div>

                  <div className={`flex items-center gap-2 text-xs sm:text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <Calendar size={14} className="sm:w-4 sm:h-4" />
                    <span>{cert.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll Indicator - Mobile Only */}
          <div className="flex justify-center gap-2 mt-4 md:hidden">
            {CERTIFICATES.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === 0 ? "w-6" : "w-1.5"
                } ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal - Enhanced for Mobile */}
      <AnimatePresence mode="wait">
        {selectedCert && (
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              }`}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedCert(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 text-white bg-black/60 hover:bg-black/80 p-2 sm:p-2.5 rounded-full transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </motion.button>

              {/* Certificate Image */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="relative w-full bg-black"
                style={{ 
                  height: 'clamp(250px, 50vh, 600px)',
                  maxHeight: '70vh'
                }}
              >
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-full object-contain"
                />
              </motion.div>

              {/* Certificate Details */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="p-5 sm:p-6 text-center"
              >
                <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {selectedCert.title}
                </h3>
                <p className={`text-base sm:text-lg mb-2 font-medium ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}>
                  {selectedCert.issuer}
                </p>
                <div className={`flex items-center justify-center gap-2 text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                  <Calendar size={16} />
                  <span>{selectedCert.year}</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}