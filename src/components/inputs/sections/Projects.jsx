import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import { PROJECTS } from "../../../utils/data";
import { ExternalLink, Github, Rocket, Star, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function ProjectsSection() {
  const { isDarkMode } = useTheme();
  const [filter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects =
    filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section
      id="work"
      className={`relative py-16 md:py-28 px-4 sm:px-6 transition-colors duration-500 overflow-hidden ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-blue-50 via-white to-gray-100 text-gray-900"
      }`}
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Background - Matching HeroSection style */}
      <div className="absolute inset-0 pointer-events-none">
        {!isDarkMode && (
          <>
            <motion.div
              className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-300 via-indigo-200 to-pink-200 blur-[100px] opacity-40"
              animate={{ scale: [1, 1.03, 1], opacity: [0.35, 0.45, 0.35] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-[-150px] left-[-100px] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-yellow-200 via-pink-200 to-blue-200 blur-[100px] opacity-35"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
        {isDarkMode && (
          <>
            <div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-10 bg-blue-500" />
            <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl opacity-10 bg-purple-500" />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <Rocket
              className={isDarkMode ? "text-blue-400" : "text-blue-600"}
              size={18}
            />
            <span
              className={`text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em] font-semibold ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Portfolio
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 leading-tight px-4 ${
              isDarkMode
                ? "text-white"
                : "text-gray-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.1)]"
            }`}
            style={{ fontWeight: 700, letterSpacing: '-0.01em' }}
          >
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
              Projects
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className={`text-sm md:text-lg max-w-3xl mx-auto px-6 md:px-4 ${
              isDarkMode ? "text-gray-400" : "text-gray-600 font-normal"
            }`}
            style={{ lineHeight: '1.6' }}
          >
            A showcase of my recent work and side projects built with modern
            technologies
          </motion.p>
        </div>

        {/* Projects Grid - Mobile Optimized */}
       <motion.div
  layout
  className="
    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
    gap-4 md:gap-6 lg:gap-8
    max-w-6xl mx-auto
    px-4 sm:px-6 lg:px-0
  "
>

          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.4,
                  delay: showAll ? 0 : idx * 0.08,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className={`group relative rounded-xl overflow-hidden transition-all duration-300 md:hover:-translate-y-2 ${
                  isDarkMode
                    ? "bg-gray-800/80 border border-gray-700 hover:border-gray-600"
                    : "bg-white/80 border border-blue-200 hover:border-blue-400 shadow-lg hover:shadow-2xl shadow-blue-100"
                }`}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold shadow-lg">
                    <Star size={10} fill="currentColor" />
                    Featured
                  </div>
                )}

                {/* Image */}
                <div className="relative h-36 md:h-44 lg:h-48 overflow-hidden bg-gray-200">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Desktop Hover Overlay */}
                  <div
                    className={`absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center gap-3 z-20 ${
                      isDarkMode ? "bg-black/75" : "bg-black/60"
                    }`}
                  >
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-xs shadow-xl hover:shadow-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 cursor-pointer relative z-30"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={14} />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white text-gray-900 font-semibold text-xs shadow-xl hover:shadow-2xl hover:bg-gray-100 transition-all duration-300 cursor-pointer relative z-30"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={14} />
                        <span>GitHub</span>
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-5">
                  <h3
                    className={`text-base md:text-lg font-bold mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                    style={{ fontWeight: 700, letterSpacing: '-0.01em' }}
                  >
                    {project.title}
                  </h3>

                  <p
                    className={`text-sm mb-4 leading-relaxed line-clamp-2 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                    style={{ lineHeight: '1.6' }}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                          isDarkMode
                            ? "bg-gray-700/80 text-gray-300"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links - Mobile Optimized */}
                  <div className="flex gap-2.5 pt-3.5 border-t" style={{
                    borderColor: isDarkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(59,130,246,0.2)",
                  }}>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 md:px-4 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 active:scale-95 ${
                          isDarkMode
                            ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30"
                            : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
                        }`}
                      >
                        <ExternalLink size={14} />
                        Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 md:px-4 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 active:scale-95 ${
                          isDarkMode
                            ? "bg-gray-700/50 text-gray-300 hover:bg-gray-700 border border-gray-600"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                        }`}
                      >
                        <Github size={14} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Projects Button - Mobile Optimized */}
        {filteredProjects.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center mt-10 md:mt-12 gap-3 px-4"
          >
            {/* Progress Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-xs md:text-sm font-medium ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Showing {displayedProjects.length} of {filteredProjects.length} projects
            </motion.div>

            {/* Animated Button */}
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative px-6 md:px-8 py-3 md:py-3.5 rounded-full font-semibold text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                isDarkMode
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/30"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg shadow-blue-400/40 hover:shadow-xl hover:shadow-blue-500/50"
              }`}
            >
              <span>{showAll ? "Show Less" : "View All Projects"}</span>
              <motion.div
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </motion.div>
              
              {/* Ripple effect on click */}
              <motion.div
                className="absolute inset-0 rounded-full bg-white"
                initial={{ scale: 0, opacity: 0.5 }}
                whileTap={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>

            {/* Progress Bar */}
            {!showAll && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                className="h-1 w-full max-w-xs rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(displayedProjects.length / filteredProjects.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    isDarkMode
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                      : "bg-gradient-to-r from-blue-500 to-indigo-600"
                  }`}
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}