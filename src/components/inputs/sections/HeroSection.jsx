import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useTheme } from "../../../context/ThemeContext";
import PROFILE_PIC from "../../../assets/images/me.jpg";
import { containerVariants, itemVariants } from "../../../utils/helper";
import Resume from "../../../../public/Aniket_Gavali_Resume.pdf"

const HeroSection = () => {
  const { isDarkMode } = useTheme();

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-blue-50 via-white to-gray-100 text-gray-900"
      }`}
    >
      {/* Subtle floating gradient glows for light mode */}
      {!isDarkMode && (
        <>
          <motion.div
            className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-300 via-indigo-200 to-pink-200 blur-[100px] opacity-40"
            animate={{ scale: [1, 1.03, 1], opacity: [0.35, 0.45, 0.35] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "transform, opacity" }}
          />
          <motion.div
            className="absolute bottom-[-150px] left-[-100px] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-yellow-200 via-pink-200 to-blue-200 blur-[100px] opacity-35"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "transform, opacity" }}
          />
        </>
      )}

      <motion.section
        id="home"
        style={{ y: heroY }}
        className="min-h-screen flex items-center justify-center relative px-6 pt-10"
      >
        {/* Background animation bubbles (shared mode) */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-10 ${
              isDarkMode ? "bg-blue-500" : "bg-blue-400"
            }`}
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`absolute bottom-20 left-20 w-48 h-48 rounded-full blur-3xl opacity-10 ${
              isDarkMode ? "bg-purple-500" : "bg-pink-400"
            }`}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full z-10 mt-20">
          {/* Mobile Layout */}
          <div className="block lg:hidden">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-center"
            >
              {/* Profile Image */}
              <motion.div variants={imageVariants} className="mb-8">
                <div className="w-32 h-32 mx-auto relative">
                  <motion.div
                    whileHover={{ scale: 1.07 }}
                    className={`w-full h-32 rounded-2xl overflow-hidden border-4 shadow-2xl transition-all duration-300 ${
                      isDarkMode
                        ? "border-gray-800"
                        : "border-blue-200 shadow-blue-100"
                    }`}
                  >
                    <img
                      src={PROFILE_PIC}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Decorative rotating ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -inset-2 rounded-2xl border border-blue-400/30"
                  />
                </div>
              </motion.div>

              {/* Role Title */}
              <motion.div
                variants={textVariants}
                className={`tracking-[0.1em] mb-6 text-xl font-[Poppins] transition-all duration-300${
                  isDarkMode ? "text-gray-400" : "text-blue-600 font-semibold"
                }`}
              >
                I'm Aniket
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={itemVariants}
                className={`text-3xl md:text-5xl mb-6 leading-tight font-bold ${
                  isDarkMode
                    ? "text-white"
                    : "text-gray-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.15)]"
                }`}
              >
                Building Digital{" "}
                <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
                  Experiences
                </span>
                <br />
                that Inspire
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className={`text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed ${
                  isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"
                }`}
              >
                I create stunning, interactive, and high-performance web
                experiences that engage users and deliver real value.
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
              >
                <motion.button
                  whileHover={{
                    y: -2,
                    boxShadow: "0 6px 15px rgba(59,130,246,0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection("work")}
                  className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-8 py-3 rounded-full text-sm uppercase tracking-wider font-semibold transition-all duration-300 "
                >
                  View Work
                </motion.button>

                <motion.a
                  href={Resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    y: -2,
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`border px-8 py-3 rounded-full text-sm uppercase tracking-wider font-semibold flex items-center gap-2 transition-all duration-300 ${
                    isDarkMode
                      ? "border-gray-700 hover:border-gray-600 text-gray-300 hover:bg-gray-800"
                      : "border-gray-300 hover:border-gray-400 text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  Resume
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center space-x-6 mb-8"
              >
                {[
                  { icon: FiGithub, href: "https://github.com/aniket-g-3101" },
                  {
                    icon: FiLinkedin,
                    href: "https://linkedin.com/in/aniketgavali",
                  },
                  { icon: Mail, href: "mailto:aniket.g.dev@gmail.com" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ y: -3, scale: 1.15 }}
                    className={`p-3 rounded-full transition-colors ${
                      isDarkMode
                        ? "text-gray-400 hover:text-white hover:bg-gray-800"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Desktop layout (unchanged structure, enhanced effects) */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Left column */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-left"
            >
              <motion.div
                variants={textVariants}
                className={` tracking-[0.1em] mb-6 text-xl font-[Poppins] transition-all duration-300 ${
                  isDarkMode
                    ? "text-white-600 font-semibold"
                    : "text-blue-600 font-semibold"
                }`}
              >
                I'm Aniket
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className={`text-5xl xl:text-7xl mb-8 leading-tight font-bold ${
                  isDarkMode
                    ? "text-white"
                    : "text-gray-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.15)]"
                }`}
              >
                Building Digital <br />
                <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
                  Experiences
                </span>
                <br />
                that Inspire
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className={`text-xl mb-12 leading-relaxed max-w-lg ${
                  isDarkMode ? "text-gray-400" : "text-gray-700 font-medium"
                }`}
              >
                I design, develop, and deliver clean, modern websites that
                balance performance and aesthetics — built to inspire and
                engage.
              </motion.p>

              {/* Buttons */}
              <motion.div className="flex space-x-4">
                <motion.button
                  whileHover={{
                    y: -3,
                    boxShadow: "0 6px 15px rgba(59,130,246,0.4)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection("work")}
                  className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-8 py-4 rounded-full text-sm uppercase tracking-wider font-semibold transition-all duration-300"
                >
                  View Work
                </motion.button>
                <motion.a
                  href={Resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    y: -2,
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={`border px-8 py-3 rounded-full text-sm uppercase tracking-wider font-semibold flex items-center gap-2 transition-all duration-300 ${
                    isDarkMode
                      ? "border-gray-700 hover:border-gray-600 text-gray-300 hover:bg-gray-800"
                      : "border-gray-300 hover:border-gray-400 text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  Resume
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                variants={itemVariants}
                className="flex space-x-6 mt-12"
              >
                {[
                  { icon: FiGithub, href: "https://github.com/aniket-g-3101" },
                  {
                    icon: FiLinkedin,
                    href: "https://linkedin.com/in/aniketgavali",
                  },
                  { icon: Mail, href: "mailto:aniket.g.dev@gmail.com" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ y: -3, scale: 1.15 }}
                    className={`p-3 rounded-full transition-colors ${
                      isDarkMode
                        ? "text-gray-400 hover:text-white hover:bg-gray-800"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right column (Profile image with enhanced light mode glow) */}
            <motion.div
              variants={imageVariants}
              className="flex justify-center items-center relative"
            >
              <div className="relative w-92 h-92">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`w-full h-full rounded-2xl overflow-hidden border-4 shadow-2xl ${
                    isDarkMode
                      ? "border-gray-800"
                      : "border-blue-200 shadow-blue-200/50"
                  }`}
                >
                  <img
                    src={PROFILE_PIC}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Animated glow ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className={`absolute -inset-3 rounded-2xl border ${
                    isDarkMode
                      ? "border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                      : "border-blue-400/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                  }`}
                />
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ArrowDown
              size={20}
              className={
                isDarkMode ? "text-gray-400" : "text-blue-500 drop-shadow-sm"
              }
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HeroSection;
