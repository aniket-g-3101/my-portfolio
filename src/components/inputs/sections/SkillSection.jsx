import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import { Code, Palette, Database, Wrench, Sparkles } from "lucide-react";

const SKILLS_CATEGORY = [
  {
    title: "Frontend Development",
    icon: Code,
    gradient: "from-blue-500 to-cyan-500",
    skills: ["React", "HTML 5", "CSS", "Tailwind CSS", "JavaScript"]
  },
  {
    title: "Design & UX",
    icon: Palette,
    gradient: "from-purple-500 to-pink-500",
    skills: ["Figma", "Adobe XD", "UI/UX Design"]
  },
  {
    title: "Backend & Database",
    icon: Database,
    gradient: "from-green-500 to-emerald-500",
    skills: ["Node.js", "MongoDB", "Express", "Oracle", "MySQL"]
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    gradient: "from-orange-500 to-red-500",
    skills: ["Git", "VS Code", "Docker", "Webpack"]
  }
];

export default function SkillsSection() {
  const { isDarkMode } = useTheme();

  return (
    <section 
      id="skills" 
      className={`relative py-24 px-4 md:px-8 transition-colors duration-500 overflow-hidden ${
        isDarkMode 
          ? "bg-gray-900 text-white" 
          : "bg-gradient-to-b from-blue-50 via-white to-gray-100 text-gray-900"
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
            <Sparkles className={isDarkMode ? "text-blue-400" : "text-blue-600"} size={24} />
            <span className={`text-sm uppercase tracking-widest font-semibold ${
              isDarkMode ? "text-gray-400" : "text-blue-600"
            }`}>
              Technical Expertise
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Skills &{" "}
            <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
              Technologies
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            A diverse toolkit of modern technologies to create exceptional digital experiences
          </motion.p>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {SKILLS_CATEGORY.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`group relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                isDarkMode 
                  ? "bg-gray-800/50 border border-gray-700 hover:border-gray-600" 
                  : "bg-white border border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-2xl"
              }`}
            >
              {/* Icon Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-xl bg-gradient-to-br ${category.gradient} shadow-lg`}>
                  <category.icon className="text-white" size={28} />
                </div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {category.title}
                </h3>
              </div>

              {/* Skills Pills */}
              <div className="flex flex-wrap gap-3 ">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skillIdx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 + skillIdx * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isDarkMode
                        ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>

              {/* Gradient Bottom Border */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>

        {/* All Technologies Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`rounded-2xl p-8 md:p-12 mb-20 ${
            isDarkMode 
              ? "bg-gray-800/30 border border-gray-700" 
              : "bg-white/50 border border-gray-200 shadow-xl backdrop-blur-sm"
          }`}
        >
          <h3 className={`text-2xl font-bold text-center mb-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Complete Technology Stack I have
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {SKILLS_CATEGORY.flatMap(category => category.skills).map((skill, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -3 }}
                className={`px-5 py-3 rounded-full text-sm font-semibold transition-all duration-200 cursor-default ${
                  isDarkMode 
                    ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-600 hover:to-gray-700 shadow-lg" 
                    : "bg-gradient-to-r from-white to-gray-50 text-gray-800 hover:from-gray-50 hover:to-gray-100 shadow-md border border-gray-200"
                }`}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className={`text-lg mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Always learning and exploring new technologies
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="bg-gradient-to-r cursor-pointer from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-300">
              Let's Build Something Amazing
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}