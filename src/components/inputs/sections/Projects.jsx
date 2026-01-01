import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import { PROJECTS } from "../../../utils/data";
import { ExternalLink, Github, Rocket, Star } from "lucide-react";
import { useState } from "react";

export default function ProjectsSection() {
  const { isDarkMode } = useTheme();
  const [filter] = useState("All");

  const filteredProjects =
    filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section
      id="work"
      className={`relative py-20 md:py-28 px-4 sm:px-6 transition-colors duration-500 overflow-hidden ${
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
        {/* Header - Matching HeroSection style */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <Rocket
              className={isDarkMode ? "text-blue-400" : "text-blue-600"}
              size={20}
            />
            <span
              className={`text-sm uppercase tracking-[0.2em] font-semibold ${
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
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight ${
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
            className={`text-base md:text-lg max-w-3xl mx-auto px-4 ${
              isDarkMode ? "text-gray-400" : "text-gray-600 font-normal"
            }`}
            style={{ lineHeight: '1.7' }}
          >
            A showcase of my recent work and side projects built with modern
            technologies
          </motion.p>
        </div>

        {/* Projects Grid - Smaller, cuter cards */}
        {/* Projects Grid - Smaller, cuter cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-7xl mx-auto px-3 sm:px-0">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className={`group relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                isDarkMode
                  ? "bg-gray-800/80 border border-gray-700 hover:border-gray-600"
                  : "bg-white/80 border border-blue-200 hover:border-blue-400 shadow-lg hover:shadow-2xl shadow-blue-100"
              }`}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg">
                  <Star size={11} fill="currentColor" />
                  Featured
                </div>
              )}

              {/* Image - Smaller height */}
              <div className="relative h-40 sm:h-44 overflow-hidden bg-gray-200">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5 ${
                    isDarkMode ? "bg-black/75" : "bg-black/60"
                  }`}
                >
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white text-gray-900 p-2 rounded-full hover:bg-blue-500 hover:text-white transition-colors shadow-lg"
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-800 hover:text-white transition-colors shadow-lg"
                    >
                      <Github size={16} />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Content - Smaller padding */}
              <div className="p-4">
                <h3
                  className={`text-base sm:text-lg font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                  style={{ fontWeight: 700, letterSpacing: '-0.01em' }}
                >
                  {project.title}
                </h3>

                <p
                  className={`text-sm mb-3 leading-relaxed line-clamp-2 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                  style={{ lineHeight: '1.6' }}
                >
                  {project.description}
                </p>

                {/* Tags - Smaller */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.slice(0, 3).map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                        isDarkMode
                          ? "bg-gray-700/80 text-gray-300"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links - Cleaner style */}
                <div className="flex gap-3 pt-3 border-t" style={{
                  borderColor: isDarkMode
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(59,130,246,0.2)",
                }}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1 text-xs font-semibold transition-colors ${
                        isDarkMode
                          ? "text-blue-400 hover:text-blue-300"
                          : "text-blue-600 hover:text-blue-700"
                      }`}
                    >
                      <ExternalLink size={13} />
                      Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1 text-xs font-semibold transition-colors ${
                        isDarkMode
                          ? "text-gray-400 hover:text-gray-300"
                          : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      <Github size={13} />
                      Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}