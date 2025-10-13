import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import { PROJECTS } from "../../../utils/data";
import { ExternalLink, Github, Rocket, Star } from "lucide-react";
import { useState } from "react";

export default function ProjectsSection() {
  const { isDarkMode } = useTheme();
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(PROJECTS.map(p => p.category))];
  const filteredProjects = filter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section 
      id="work" 
      className={`relative py-24 px-4 md:px-8 transition-colors duration-500 overflow-hidden ${
        isDarkMode 
          ? "bg-gray-900 text-white" 
          : "bg-gradient-to-b from-gray-50 via-blue-50 to-white text-gray-900"
      }`}
    >
      {/* Simple Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-5 ${
          isDarkMode ? "bg-blue-500" : "bg-blue-400"
        }`} />
        <div className={`absolute bottom-20 left-20 w-80 h-80 rounded-full blur-3xl opacity-5 ${
          isDarkMode ? "bg-purple-500" : "bg-pink-400"
        }`} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Rocket className={isDarkMode ? "text-blue-400" : "text-blue-600"} size={24} />
            <span className={`text-sm uppercase tracking-widest font-semibold ${
              isDarkMode ? "text-gray-400" : "text-blue-600"
            }`}>
              Portfolio
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
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
            className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            A showcase of my recent work and side projects built with modern technologies
          </motion.p>
        </div>
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`group relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                isDarkMode 
                  ? "bg-gray-800/50 border border-gray-700 hover:border-gray-600" 
                  : "bg-white border border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-2xl"
              }`}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                  <Star size={12} fill="currentColor" />
                  Featured
                </div>
              )}

              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 ${
                  isDarkMode ? "bg-black/70" : "bg-black/50"
                }`}>
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white text-gray-900 p-2 rounded-full hover:bg-blue-500 hover:text-white transition-colors shadow-lg"
                    >
                      <ExternalLink size={18} />
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
                      <Github size={18} />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-5">
                <h3 className={`text-lg font-bold mb-2 line-clamp-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {project.title}
                </h3>

                <p className={`text-sm mb-3 line-clamp-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.slice(0, 3).map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isDarkMode
                          ? "bg-gray-700 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isDarkMode ? "text-gray-500" : "text-gray-500"
                    }`}>
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-3 border-t" style={{
                  borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                        isDarkMode 
                          ? "text-blue-400 hover:text-blue-300" 
                          : "text-blue-600 hover:text-blue-700"
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
                      className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                        isDarkMode 
                          ? "text-gray-400 hover:text-gray-300" 
                          : "text-gray-600 hover:text-gray-700"
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
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className={`text-lg mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Want to see more of my work?
          </p>
          <motion.a
            href="https://github.com/aniket-g-3101"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Github size={20} />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}