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
      className={`relative py-20 md:py-28 px-4 sm:px-6 transition-colors duration-500 overflow-hidden ${
        isDarkMode 
          ? "bg-gray-900" 
          : "bg-gradient-to-b from-blue-50 via-white to-gray-100"
      }`}
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Background - Matching other sections */}
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
        {/* Header - Matching other sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span
              className={`text-sm uppercase tracking-[0.2em] font-semibold ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Get to Know Me
            </span>
          </motion.div>
          
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight ${
            isDarkMode
              ? "text-white"
              : "text-gray-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.1)]"
          }`}
          style={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
            <span>About </span>
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
              Me
            </span>
          </h2>
        </motion.div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Left Column */}
          <div className="lg:w-2/3">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`mb-8 p-5 md:p-6 rounded-xl border ${
                isDarkMode
                  ? "bg-gray-800/80 border-gray-700"
                  : "bg-white/80 border-blue-200 shadow-lg shadow-blue-100"
              }`}
            >
              <p
                className={`text-base md:text-lg leading-relaxed ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                style={{ lineHeight: '1.7' }}
              >
                I'm Aniket Gavali, a self-taught coder with a passion for building
                interactive web apps, exploring new technologies, and solving
                challenging problems. I enjoy crafting clean and responsive user
                interfaces while keeping performance and usability in mind.
              </p>
            </motion.div>

            {/* Stats - Smaller */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-3 md:gap-4 mb-8"
            >
              {STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className={`text-center p-3 md:p-4 rounded-xl border ${
                    isDarkMode
                      ? "border-gray-700 bg-gray-800/80"
                      : "border-blue-200 bg-white/80 shadow-md"
                  }`}
                >
                  <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p
                    className={`mt-1 text-xs font-semibold ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Passions - Smaller cards */}
            <div className="mb-8">
              <h3
                className={`text-xl md:text-2xl font-bold mb-5 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
                style={{ fontWeight: 700 }}
              >
                What I Love
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {PASSIONS.map((passion, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    viewport={{ once: true }}
                    className={`p-4 rounded-xl text-center border transition-all hover:-translate-y-1 ${
                      isDarkMode
                        ? "border-gray-700 bg-gray-800/80 hover:border-gray-600"
                        : "border-blue-200 bg-white/80 hover:border-blue-400 shadow-md"
                    }`}
                  >
                    <div className={`w-10 h-10 mx-auto mb-2.5 rounded-lg flex items-center justify-center ${
                      isDarkMode
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                        : "bg-gradient-to-br from-blue-500 to-blue-600"
                    }`}>
                      <passion.icon size={18} className="text-white" />
                    </div>
                    <h4
                      className={`text-sm font-bold mb-1 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                      style={{ fontWeight: 700 }}
                    >
                      {passion.title}
                    </h4>
                    <p
                      className={`text-xs leading-relaxed cursor-pointer   ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                      style={{ lineHeight: '1.5' }}
                    >
                      {passion.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills - Smaller tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3
                className={`text-xl md:text-2xl font-bold mb-5 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
                style={{ fontWeight: 700 }}
              >
                Hobbies / Passion
              </h3>
              <div className="flex flex-wrap gap-2 cursor-pointer">
                {SKILLS.map((skill, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      isDarkMode
                        ? "border-gray-700 bg-gray-800/80 text-gray-300 hover:border-gray-600"
                        : "border-blue-200 bg-blue-50 text-blue-700 hover:border-blue-400"
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Journey Timeline */}
          <div className="lg:w-1/3">
            <h3
              className={`text-xl md:text-2xl font-bold mb-6 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
              style={{ fontWeight: 700 }}
            >
              My Journey
            </h3>

            <div className="relative">
              <div
                className={`absolute left-3 top-0 w-0.5 h-full ${
                  isDarkMode ? "bg-gray-700" : "bg-blue-200"
                }`}
              />

              {JOURNEY_STEPS.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-10 pb-8 last:pb-0"
                >
                  <div
                    className={`absolute left-0 w-7 h-7 rounded-lg flex items-center justify-center ${step.color}`}
                  >
                    <step.icon size={14} className="text-white" />
                  </div>

                  <div
                    className={`p-4 rounded-xl border transition-all hover:-translate-y-1 ${
                      isDarkMode
                        ? "border-gray-700 bg-gray-800/80 hover:border-gray-600"
                        : "border-blue-200 bg-white/80 hover:border-blue-400 shadow-md"
                    }`}
                  >
                    <span
                      className={`text-xs font-semibold ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {step.year}
                    </span>
                    <h4
                      className={`text-sm font-bold mt-1 mb-1 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                      style={{ fontWeight: 700 }}
                    >
                      {step.title}
                    </h4>
                    <p
                      className={`text-xs leading-relaxed ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                      style={{ lineHeight: '1.5' }}
                    >
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