import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import { JOURNEY_STEPS, PASSIONS } from "../../../utils/data";

export default function AboutSection() {
  const { isDarkMode } = useTheme();

  const SKILLS = ["Anime", "Reading", "Music", "Travel", "Sports", "Esports"];
  const STATS = [
    { label: "Projects", value: "15+" },
    { label: "GitHub Stars", value: "120+" },
    { label: "Experience", value: "3 Years" },
  ];

  return (
    <section
      id="about"
      className={`relative py-20 px-4 md:px-8 transition-colors duration-500 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">           
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className={isDarkMode ? "text-white" : "text-gray-900"}>About </span>
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column - Content */}
          <div className="lg:w-2/3">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <p className={`text-lg leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                I'm Aniket Gavali, a self-taught coder with a passion for building interactive web apps,
                exploring new technologies, and solving challenging problems. I enjoy crafting clean
                and responsive user interfaces while keeping performance and usability in mind.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-4 mb-12"
            >
              {STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className={`text-center p-5 rounded-lg border ${
                    isDarkMode ? "border-gray-800 bg-gray-800/50" : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <p className={`text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                  <p className={`mt-1 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Passions */}
            <div className="mb-12">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                What I Love
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PASSIONS.map((passion, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className={`p-5 rounded-lg text-center border transition-all duration-300 hover:shadow-lg ${
                      isDarkMode
                        ? "border-gray-800 bg-gray-800/50 hover:border-gray-700"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600`}>
                      <passion.icon size={20} className="text-white" />
                    </div>
                    <h4 className={`text-base font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {passion.title}
                    </h4>
                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {passion.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Hobbies / Passion
              </h3>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer border transition-all duration-300 hover:scale-105 ${
                      isDarkMode
                        ? "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600"
                        : "border-gray-300 bg-gray-50 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Timeline */}
          <div className="lg:w-1/3">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`text-2xl font-bold mb-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              My Journey
            </motion.h3>

            <div className="relative">
              {/* Vertical line */}
              <div className={`absolute left-4 top-0 w-0.5 h-full ${
                isDarkMode ? "bg-gray-800" : "bg-gray-200"
              }`} />

              {JOURNEY_STEPS.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-12 pb-10 last:pb-0"
                >
                  {/* Icon */}
                  <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${step.color} shadow-md`}>
                    <step.icon size={14} className="text-white" />
                  </div>

                  {/* Content */}
                  <div
                    className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
                      isDarkMode
                        ? "border-gray-800 bg-gray-800/50 hover:border-gray-700"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <span className={`text-xs font-semibold ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                      {step.year}
                    </span>
                    <h4 className={`text-base font-semibold mt-1 mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {step.title}
                    </h4>
                    <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}