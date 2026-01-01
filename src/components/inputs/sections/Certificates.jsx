import { useTheme } from "../../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { CERTIFICATES } from "../../../utils/data";
import {
  X,
  Award,
  Calendar,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Certificates() {
  const { isDarkMode } = useTheme();
  const [selectedCert, setSelectedCert] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const carouselRef = useRef(null);

  const checkScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    checkScroll();

    return () => {
      carousel.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    if (!carouselRef.current) return;
    const amount = window.innerWidth < 768 ? 260 : 320;
    carouselRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="certificates"
      className={`relative py-20 px-4 md:px-8 transition-colors duration-500 overflow-hidden ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-blue-50 via-white to-gray-100 text-gray-900"
      }`}
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-20 right-20 w-72 h-72 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? "bg-blue-500" : "bg-blue-400"
          }`}
        />
        <div
          className={`absolute bottom-20 left-20 w-60 h-60 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? "bg-purple-500" : "bg-pink-400"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Award
              size={18}
              className={isDarkMode ? "text-blue-400" : "text-blue-600"}
            />
            <span
              className={`text-xs uppercase tracking-[0.3em] font-semibold ${
                isDarkMode ? "text-gray-400" : "text-blue-600"
              }`}
            >
              Certifications
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Professional{" "}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
              Credentials
            </span>
          </h2>

          <p
            className={`max-w-2xl mx-auto text-base ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Continuous learning and professional development across modern
            technologies.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Nav buttons */}
          <AnimatePresence>
            {canScrollLeft && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => scroll("left")}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full backdrop-blur-md transition ${
                  isDarkMode
                    ? "bg-gray-800/80 hover:bg-gray-700"
                    : "bg-white/90 hover:bg-gray-50 shadow-md"
                }`}
              >
                <ChevronLeft size={22} />
              </motion.button>
            )}

            {canScrollRight && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => scroll("right")}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full backdrop-blur-md transition ${
                  isDarkMode
                    ? "bg-gray-800/80 hover:bg-gray-700"
                    : "bg-white/90 hover:bg-gray-50 shadow-md"
                }`}
              >
                <ChevronRight size={22} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Cards */}
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide py-6 px-2 md:px-10 snap-x snap-mandatory"
          >
            {CERTIFICATES.map((cert, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedCert(cert)}
                className={`w-[260px] sm:w-[250px] md:w-[270px] h-[320px] rounded-2xl flex-shrink-0 cursor-pointer snap-start border transition-all hover:-translate-y-1 ${
                  isDarkMode
                    ? "bg-gray-800/80 border-gray-700 hover:border-blue-500"
                    : "bg-white border-gray-200 hover:border-blue-400 shadow-md hover:shadow-xl"
                }`}
              >
                {/* Image */}
                <div className="h-[160px] bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-2xl">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col justify-between h-[160px]">
                  <div>
                    <h3 className="text-sm font-semibold mb-2 line-clamp-2">
                      {cert.title}
                    </h3>
                    <p
                      className={`text-xs font-medium mb-2 ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {cert.issuer}
                    </p>
                  </div>

                  <div
                    className={`flex items-center gap-2 text-xs ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    <Calendar size={14} />
                    {cert.year}
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
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`max-w-5xl w-full rounded-2xl overflow-hidden ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              }`}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white cursor-pointer" 
              >
                <X size={18} />
              </button>

              <div className="h-[60vh] flex items-center justify-center bg-black">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">
                  {selectedCert.title}
                </h3>
                <p className="text-blue-500 font-medium mb-1">
                  {selectedCert.issuer}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedCert.year}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
