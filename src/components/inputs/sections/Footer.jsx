import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import { Github, Linkedin, Instagram, Mail, Code } from "lucide-react";

export default function FooterSection() {
  const { isDarkMode } = useTheme();

  const socialLinks = [
    { icon: Github, url: "https://github.com/aniket-g-3101", label: "GitHub", color: "#181717", lightColor: "#181717", darkColor: "#ffffff" },
    { icon: Linkedin, url: "https://linkedin.com/in/aniket", label: "LinkedIn", color: "#0A66C2", lightColor: "#0A66C2", darkColor: "#0A66C2" },
    { icon: Instagram, url: "https://www.instagram.com/im_aniket_0106/", label: "Instagram", color: "#E4405F", lightColor: "#E4405F", darkColor: "#E4405F" },
    { icon: Mail, url: "mailto:aniket.g.dev@gmail.com", label: "Email", color: "#EA4335", lightColor: "#EA4335", darkColor: "#EA4335" },
  ];

  return (
    <footer
      className={`relative pt-16 md:pt-20 pb-10 md:pb-12 px-4 sm:px-6 transition-colors duration-500 ${
        isDarkMode 
          ? "bg-gray-900 text-white" 
          : "bg-gradient-to-b from-gray-100 to-gray-50 text-gray-900"
      }`}
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {!isDarkMode && (
          <motion.div
            className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 blur-[80px] opacity-30"
            animate={{ scale: [1, 1.05, 1], opacity: [0.25, 0.35, 0.25] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {isDarkMode && (
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl opacity-5 bg-blue-500" />
        )}
      </div>

      {/* Animated Top Glow Line */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent origin-center"
      />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto flex flex-col gap-8 md:flex-row md:items-center md:justify-between relative z-10"
      >
        {/* Branding */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center md:items-start text-center md:text-left gap-3"
        >
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className={`p-2.5 rounded-lg ${
                isDarkMode
                  ? "bg-blue-500/10"
                  : "bg-blue-50"
              }`}
            >
              <Code size={26} className={isDarkMode ? "text-blue-400" : "text-blue-600"} />
            </motion.div>

            <h3 
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-transparent bg-clip-text"
              style={{ fontWeight: 700 }}
            >
              Aniket Gavali
            </h3>
          </div>

          <p
            className={`text-sm md:text-base max-w-xs font-medium ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
            style={{ lineHeight: '1.6' }}
          >
            Crafting digital experiences with passion & precision.
          </p>
        </motion.div>

        {/* Social Links - Clean Modern Design */}
        <div className="flex flex-wrap justify-center md:justify-end gap-3">
          {socialLinks.map((social, idx) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative"
              >
                <div
                  className={`relative px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 border ${
                    isDarkMode
                      ? "bg-gray-800/50 border-gray-700/50 hover:bg-gray-800 hover:border-gray-600"
                      : "bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <motion.div
                      whileHover={{ rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Icon
                        size={18}
                        style={{ color: isDarkMode ? social.darkColor : social.lightColor }}
                        className="transition-transform duration-300 group-hover:scale-110"
                      />
                    </motion.div>
                    <span 
                      className={`hidden sm:inline transition-colors duration-300 ${
                        isDarkMode 
                          ? "text-gray-300 group-hover:text-white" 
                          : "text-gray-700 group-hover:text-gray-900"
                      }`}
                    >
                      {social.label}
                    </span>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 ease-out"
                    style={{ backgroundColor: isDarkMode ? social.darkColor : social.lightColor }}
                  />
                </div>
              </motion.a>
            );
          })}
        </div>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex justify-center mt-8 mb-5"
      >
        <div className={`h-px w-32 bg-gradient-to-r from-transparent to-transparent opacity-70 ${
          isDarkMode ? "via-blue-400" : "via-blue-500"
        }`} />
      </motion.div>

      {/* Copyright */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className={`text-center text-sm font-semibold ${
          isDarkMode ? "text-gray-500" : "text-gray-600"
        }`}
      >
        © 2025 Aniket Gavali. Built with React & Framer Motion
      </motion.p>
    </footer>
  );
}