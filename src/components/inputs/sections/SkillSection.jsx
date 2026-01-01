import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import { Code, Palette, Database, Wrench, Sparkles } from "lucide-react";

const SKILLS_CATEGORY = [
  {
    title: "Frontend Development",
    icon: Code,
    gradient: "from-blue-500 to-cyan-500",
    skills: ["React", "HTML5", "CSS3", "Tailwind CSS", "JavaScript"],
  },
  {
    title: "Backend & Database",
    icon: Database,
    gradient: "from-green-500 to-emerald-500",
    skills: ["Node.js", "Express", "MongoDB", "MySQL", "Oracle"],
  },
  {
    title: "Design & UX",
    icon: Palette,
    gradient: "from-purple-500 to-pink-500",
    skills: ["UI/UX Design", "Canva", "Eraser"],
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    gradient: "from-orange-500 to-red-500",
    skills: ["Git", "Docker", "VS Code"],
  },
];

export default function SkillsSection() {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="skills"
      className={`relative py-20 sm:py-24 px-4 md:px-8 transition-colors duration-500 ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-blue-50 via-white to-gray-100 text-gray-900"
      }`}
      style={{
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Background glows — SAME STYLE AS HERO */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-24 right-20 w-80 h-80 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? "bg-blue-500" : "bg-blue-400"
          }`}
        />
        <motion.div
          animate={{ scale: [1.05, 1, 1.05] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute bottom-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? "bg-purple-500" : "bg-pink-400"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <Sparkles
              size={16}
              className={isDarkMode ? "text-blue-400" : "text-blue-600"}
            />
            <span
              className={`text-[11px] uppercase tracking-[0.3em] font-semibold ${
                isDarkMode ? "text-gray-400" : "text-blue-600"
              }`}
            >
              Technical Expertise
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Skills &{" "}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
              Technologies
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={`max-w-xl mx-auto text-sm sm:text-base leading-relaxed ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Tools and technologies I use to build clean, scalable, and
            high-performance web applications.
          </motion.p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 px-4 sm:px-0">
          {SKILLS_CATEGORY.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group relative rounded-2xl p-6 sm:p-7 lg:p-8 transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-800/50 border border-gray-700 hover:border-gray-600 hover:bg-gray-800/70"
                  : "bg-white/90 border border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-2xl backdrop-blur-sm"
              }`}
            >
              {/* Gradient glow on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />

              {/* Header with animated icon */}
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`p-2.5 sm:p-3 rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg`}
                >
                  <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>
                <h3 className="text-base sm:text-base lg:text-lg font-semibold tracking-tight">
                  {category.title}
                </h3>
              </div>

              {/* Skills with staggered animation */}
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skillIdx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: idx * 0.1 + skillIdx * 0.05,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all cursor-default ${
                      isDarkMode
                        ? "bg-gray-700/70 text-gray-200 border border-gray-600 hover:border-blue-400 hover:bg-gray-700"
                        : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 border border-gray-300 hover:border-blue-400 hover:from-blue-50 hover:to-blue-100"
                    }`}
                  >
                    <span className="relative z-10">{skill}</span>
                    {/* Subtle shine effect on hover */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-10 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>

              {/* Accent line with animation */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 + 0.3 }}
                className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r ${category.gradient} origin-left`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}