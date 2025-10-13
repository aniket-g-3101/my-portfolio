import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import { Github, Linkedin, Instagram, Mail, ArrowUp,Code } from "lucide-react";
import { useEffect, useState } from "react";

export default function FooterSection() {
  const { isDarkMode } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const socialLinks = [
    { icon: Github, url: "https://github.com/aniket-g-3101", label: "GitHub" },
    { icon: Linkedin, url: "https://linkedin.com/in/aniket", label: "LinkedIn" },
    { icon: Instagram, url: "https://www.instagram.com/im_aniket_0106/", label: "Instagram" },
    { icon: Mail, url: "mailto:aniket.g.dev@gmail.com", label: "Email" },
  ];

  return (
    <footer
      className={`relative py-14 px-6 transition-colors duration-500 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Glowing Line Above Footer */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-blue-400 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-sm opacity-80" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:justify-between relative z-10">
        {/* Name & Tagline */}
        <div className="text-left mb-6 md:mb-0 flex items-center gap-2">
          <Code size={28} className="text-blue-500" /><br/>
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
              Aniket Gavali
            </h3>
            <p className={`text-sm md:text-base ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Crafting digital experiences with passion & precision.
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 items-center w-full md:w-auto">
          {socialLinks.map((social, idx) => {
            const Icon = social.icon;
            return (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`flex items-center gap-2 transition-colors duration-300 px-2 py-1 rounded ${
                  isDarkMode
                    ? "text-gray-200 hover:text-blue-400"
                    : "text-gray-900 hover:text-blue-600"
                }`}
              >
                <Icon size={24} />
                <span className="text-sm md:text-base font-medium">{social.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center mt-6 mb-4">
        <span className="text-blue-500 font-semibold  mx-2">- - - - - / - - - - -</span>
      </div>

      {/* Copyright */}
      <p className={`text-center md:text-lg font-semibold text-center  ${isDarkMode ? "text-gray-400" : "text-gray-800"}`}>
        © 2025 Aniket Gavali. Built with React & Framer Motion
      </p>
    </footer>
  );
}
