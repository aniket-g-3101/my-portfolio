import { useTheme } from "../../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { CERTIFICATES } from "../../../utils/data";
import { X, Award, Calendar } from "lucide-react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Certificates() {
  const { isDarkMode } = useTheme();
  const [selectedCert, setSelectedCert] = useState(null);
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 280;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="certificates"
      className={`relative py-24 px-6 overflow-hidden transition-colors duration-500 ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-blue-50 via-white to-gray-100 text-gray-900"
      }`}
    >
      {/* Simplified Background Effects */}
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
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Award className={isDarkMode ? "text-blue-400" : "text-blue-600"} size={24} />
            <span className={`text-sm uppercase tracking-widest font-semibold ${
              isDarkMode ? "text-gray-400" : "text-blue-600"
            }`}>
              Certifications
            </span>
          </div>

          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}>
            Professional{" "}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
              Credentials
            </span>
          </h2>

          <p className={`text-lg max-w-2xl mx-auto ${
            isDarkMode ? "text-gray-400" : "text-gray-700"
          }`}>
            Continuous learning and professional development across various technologies
          </p>
        </div>

        {/* Horizontal Scrollable Layout */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full shadow-lg transition-all duration-300 hidden md:block ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-white hover:bg-gray-50 text-gray-900 shadow-md"
            }`}
          >
            <FiChevronLeft size={24} />
          </button>

          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full shadow-lg transition-all duration-300 hidden md:block ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-white hover:bg-gray-50 text-gray-900 shadow-md"
            }`}
          >
            <FiChevronRight size={24} />
          </button>

          {/* Certificates Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide py-8 px-4 md:px-12 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {CERTIFICATES.map((cert, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedCert(cert)}
                className={`w-[320px] h-[420px] cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 snap-start flex-shrink-0 hover:-translate-y-2 flex flex-col ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-700 hover:border-blue-500"
                    : "bg-white border-gray-200 hover:border-blue-400 shadow-md hover:shadow-xl"
                }`}
              >
                {/* Image - Fixed aspect ratio */}
                <div className="relative h-[240px] w-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain p-2"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center ${
                    isDarkMode ? "bg-black/60" : "bg-black/40"
                  }`}>
                    <span className="text-white text-sm font-semibold">Click to View</span>
                  </div>
                </div>

                {/* Content - Fixed height */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`font-bold text-base mb-3 line-clamp-2 h-[48px] ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}>
                      {cert.title}
                    </h3>
                    
                    <p className={`text-sm font-medium mb-3 line-clamp-1 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}>
                      {cert.issuer}
                    </p>
                  </div>

                  <div className={`flex items-center gap-2 text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}>
                    <Calendar size={16} />
                    <span>{cert.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-4xl w-full rounded-2xl overflow-hidden ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              }`}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="relative w-full h-[60vh] bg-black">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 text-center">
                <h3 className={`text-2xl font-bold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}>
                  {selectedCert.title}
                </h3>
                <p className={`text-lg mb-2 ${
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
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}