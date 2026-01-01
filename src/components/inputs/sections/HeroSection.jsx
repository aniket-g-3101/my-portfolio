import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useTheme } from "../../../context/ThemeContext";
import PROFILE_PIC from "../../../assets/images/me.jpg";
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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: -30 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.4,
      },
    },
  };

  const floatingTexts = [
  
    { text: "Hard Work", angle: 45, delay: 0.7 },
    // { text: "Knowledge", angle: 90, delay: 0.8 },
    { text: "Knowledge", angle: 135, delay: 0.9 },
    // { text: "JavaScript", angle: 180, delay: 1.0 },
    // { text: "Tailwind", angle: 225, delay: 1.1 },
    { text: "Patience", angle: 270, delay: 1.2 },
    // { text: "MERN", angle: 315, delay: 1.3 },
  ];

  return (
    <motion.div
      className={`min-h-screen relative overflow-hidden ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-b from-blue-50 via-white to-gray-100 text-gray-900"
      }`}
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
      animate={{
        backgroundColor: isDarkMode ? "#111827" : "#f0f9ff"
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Enhanced floating gradient glows for light mode */}
      <AnimatePresence mode="wait">
        {!isDarkMode && (
          <>
            <motion.div
              key="glow-1"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 0.4,
                scale: [1, 1.03, 1]
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 0.5 },
                scale: { duration: 15, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-300 via-indigo-200 to-pink-200 blur-[100px]"
              style={{ willChange: "transform, opacity" }}
            />
            <motion.div
              key="glow-2"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 0.35,
                scale: [1, 1.05, 1]
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                opacity: { duration: 0.5 },
                scale: { duration: 20, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute bottom-[-150px] left-[-100px] w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-yellow-200 via-pink-200 to-blue-200 blur-[100px]"
              style={{ willChange: "transform, opacity" }}
            />
          </>
        )}
      </AnimatePresence>

      <motion.section
        id="home"
        style={{ y: heroY }}
        className="min-h-screen flex items-center justify-center relative px-6 pt-10"
      >
        {/* Enhanced background animation bubbles */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
              backgroundColor: isDarkMode ? "#3b82f6" : "#60a5fa"
            }}
            transition={{
              scale: { duration: 20, repeat: Infinity, ease: "linear" },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              backgroundColor: { duration: 0.5, ease: "easeInOut" }
            }}
            className="absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-10"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [360, 180, 0],
              backgroundColor: isDarkMode ? "#a855f7" : "#f9a8d4"
            }}
            transition={{
              scale: { duration: 25, repeat: Infinity, ease: "linear" },
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              backgroundColor: { duration: 0.5, ease: "easeInOut" }
            }}
            className="absolute bottom-20 left-20 w-48 h-48 rounded-full blur-3xl opacity-10"
          />
        </div>

        <div className="max-w-7xl mx-auto w-full z-10 mt-20">
          {/* Mobile Layout - Enhanced */}
          <div className="block lg:hidden">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-left" 
            >
              {/* Enhanced Profile Image */}
              <motion.div variants={imageVariants} className="mb-10 text-center">
                <div className="w-40 h-40 mx-auto relative"> 
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                    className={`w-full h-full rounded-3xl overflow-hidden border-4 shadow-2xl transition-all duration-300 ${
                      isDarkMode
                        ? "border-gray-800 shadow-blue-500/20"
                        : "border-blue-300 shadow-blue-300/60"
                    }`}
                  >
                    <img
                      src={PROFILE_PIC}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Floating Tech Texts */}
                  {floatingTexts.map((item, idx) => {
                    const radius = 90;
                    const x = Math.cos((item.angle * Math.PI) / 180) * radius;
                    const y = Math.sin((item.angle * Math.PI) / 180) * radius;
                    
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                          opacity: [0.6, 0.9, 0.6], 
                          scale: 1,
                          y: [0, -5, 0]
                        }}
                        transition={{
                          opacity: { duration: 2, repeat: Infinity, delay: item.delay },
                          scale: { duration: 0.5, delay: item.delay },
                          y: { duration: 3, repeat: Infinity, delay: item.delay, ease: "easeInOut" }
                        }}
                        className={`absolute text-xs font-semibold px-2 py-1 rounded-md backdrop-blur-sm ${
                          isDarkMode
                            ? "bg-gray-800/80 text-blue-400 border border-gray-700"
                            : "bg-white/80 text-blue-600 border border-blue-200 shadow-sm"
                        }`}
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        {item.text}
                      </motion.div>
                    );
                  })}

                  {/* Enhanced decorative rotating ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className={`absolute -inset-2 rounded-3xl border-2 ${
                      isDarkMode 
                        ? "border-blue-500/30" 
                        : "border-blue-500/50 shadow-[0_0_25px_rgba(59,130,246,0.3)]"
                    }`}
                  />
                  
                  {/* Pulsing glow effect */}
                  <motion.div
                    animate={{ 
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`absolute -inset-3 rounded-3xl ${
                      isDarkMode 
                        ? "bg-blue-500/10" 
                        : "bg-blue-400/15"
                    } blur-xl`}
                  />
                </div>
              </motion.div>

              {/* Role Title */}
              <motion.div
                variants={textVariants}
                className={`tracking-wider text-sm transition-all duration-300 font-semibold uppercase mb-3 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600" 
                }`}
                style={{ letterSpacing: '0.2em' }}
              >
                I'm Aniket
              </motion.div>

              {/* Enhanced Heading */}
              <motion.h1
                variants={itemVariants}
                className={`text-4xl md:text-5xl mb-4 leading-tight font-bold ${
                  isDarkMode
                    ? "text-white"
                    : "text-gray-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.1)]"
                }`}
                style={{ fontWeight: 700, letterSpacing: '-0.01em' }}
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
                className={`text-base mb-8 max-w-xl leading-relaxed ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
                style={{ lineHeight: '1.7' }}
              >
                I create stunning, interactive, and high-performance web
                experiences that engage users and deliver real value.
              </motion.p>

              {/* Enhanced Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-row space-x-4 mb-12 justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("work")}
                  className={`group relative overflow-hidden cursor-pointer text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/40"
                  }`}
                  style={{ letterSpacing: '0.05em' }}
                >
                  <span className="relative z-10">View Work</span>
                  <motion.div
                    className={`absolute inset-0 ${
                      isDarkMode 
                        ? "bg-gradient-to-r from-blue-600 to-indigo-700" 
                        : "bg-gradient-to-r from-blue-600 to-blue-700"
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </motion.button>

                <motion.a
                  href={Resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative overflow-hidden border-2 px-8 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${ 
                    isDarkMode
                      ? "border-gray-600 text-gray-200 backdrop-blur-sm bg-gray-800/50 hover:border-gray-500"
                      : "border-gray-300 text-gray-800 shadow-md bg-white/80 backdrop-blur-sm hover:border-blue-400"
                  }`}
                  style={{ letterSpacing: '0.05em' }}
                >
                  <span className="relative z-10">Resume</span>
                  <motion.div
                    className={`absolute inset-0 ${
                      isDarkMode ? "bg-gray-700/50" : "bg-blue-50"
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </motion.a>
              </motion.div>

              {/* Enhanced Social Links */}
              <motion.div
                variants={itemVariants}
                className="flex space-x-4 mb-16" 
              >
                {[
                  { icon: FiGithub, href: "https://github.com/aniket-g-3101", label: "GitHub" },
                  { icon: FiLinkedin, href: "https://linkedin.com/in/aniketgavali", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:aniket.g.dev@gmail.com", label: "Email" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ y: -4, scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      isDarkMode
                        ? "text-gray-400 hover:text-white hover:bg-gray-800/80 hover:shadow-lg hover:shadow-blue-500/20"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-200/50"
                    }`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Desktop layout - Enhanced */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center">
            {/* Left column */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-left"
            >
              <motion.div
                variants={textVariants}
                className={`tracking-[0.1em] text-sm transition-all duration-300 uppercase mb-4 ${
                  isDarkMode
                    ? "text-white-600 font-semibold"
                    : "text-blue-600 font-semibold"
                }`}
                style={{ letterSpacing: '0.2em' }}
              >
                I'm Aniket
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className={`text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight font-bold ${
                  isDarkMode
                    ? "text-white"
                    : "text-gray-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.15)]"
                }`}
                style={{ fontWeight: 700, letterSpacing: '-0.01em' }}
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
                className={`text-lg mb-12 leading-relaxed max-w-lg ${
                  isDarkMode ? "text-gray-400" : "text-gray-600 font-normal"
                }`}
                style={{ lineHeight: '1.7' }}
              >
                I design, develop, and deliver clean, modern websites that
                balance performance and aesthetics — built to inspire and
                engage.
              </motion.p>

              {/* Enhanced Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex space-x-5"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection("work")}
                  className={`group relative overflow-hidden cursor-pointer text-white px-10 py-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30"
                      : "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/40"
                  }`}
                  style={{ letterSpacing: '0.05em' }}
                >
                  <span className="relative z-10">View Work</span>
                  <motion.div
                    className={`absolute inset-0 ${
                      isDarkMode 
                        ? "bg-gradient-to-r from-blue-600 to-indigo-700" 
                        : "bg-gradient-to-r from-blue-600 to-blue-700"
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </motion.button>
                
                <motion.a
                  href={Resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative overflow-hidden border-2 px-10 py-4 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${
                    isDarkMode
                      ? "border-gray-600 text-gray-200 backdrop-blur-sm bg-gray-800/50 hover:border-gray-500"
                      : "border-gray-300 text-gray-800 shadow-md bg-white/80 backdrop-blur-sm hover:border-blue-400"
                  }`}
                  style={{ letterSpacing: '0.05em' }}
                >
                  <span className="relative z-10">Resume</span>
                  <motion.div
                    className={`absolute inset-0 ${
                      isDarkMode ? "bg-gray-700/50" : "bg-blue-50"
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </motion.a>
              </motion.div>

              {/* Enhanced Social Links */}
              <motion.div
                variants={itemVariants}
                className="flex space-x-6 mt-14"
              >
                {[
                  { icon: FiGithub, href: "https://github.com/aniket-g-3101", label: "GitHub" },
                  { icon: FiLinkedin, href: "https://linkedin.com/in/aniketgavali", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:aniket.g.dev@gmail.com", label: "Email" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ y: -5, scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      isDarkMode
                        ? "text-gray-400 hover:text-white hover:bg-gray-800/80 hover:shadow-lg hover:shadow-blue-500/20"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-200/50"
                    }`}
                  >
                    <social.icon size={22} />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right column - Enhanced Profile image */}
            <motion.div
              variants={imageVariants}
              className="flex justify-center items-center relative"
            >
              <div className="relative w-96 h-96">
                <motion.div
                  whileHover={{ scale: 1.03, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`w-full h-full rounded-3xl overflow-hidden border-4 shadow-2xl ${
                    isDarkMode
                      ? "border-gray-800 shadow-blue-500/20"
                      : "border-blue-300 shadow-blue-300/60"
                  }`}
                >
                  <img
                    src={PROFILE_PIC}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Floating Tech Texts - Desktop */}
                {floatingTexts.map((item, idx) => {
                  const radius = 220;
                  const x = Math.cos((item.angle * Math.PI) / 180) * radius;
                  const y = Math.sin((item.angle * Math.PI) / 180) * radius;
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0.6, 0.9, 0.6], 
                        scale: 1,
                        y: [0, -8, 0]
                      }}
                      transition={{
                        opacity: { duration: 2, repeat: Infinity, delay: item.delay },
                        scale: { duration: 0.5, delay: item.delay },
                        y: { duration: 3, repeat: Infinity, delay: item.delay, ease: "easeInOut" }
                      }}
                      className={`absolute text-sm font-semibold px-3 py-1.5 rounded-lg backdrop-blur-sm ${
                        isDarkMode
                          ? "bg-gray-800/90 text-blue-400 border border-gray-700 shadow-lg"
                          : "bg-white/90 text-blue-600 border border-blue-200 shadow-lg"
                      }`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {item.text}
                    </motion.div>
                  );
                })}

                {/* Enhanced animated glow ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className={`absolute -inset-4 rounded-3xl border-2 ${
                    isDarkMode
                      ? "border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.4)]"
                      : "border-blue-500/50 shadow-[0_0_50px_rgba(59,130,246,0.5)]"
                  }`}
                />
                
                {/* Enhanced pulsing glow effect */}
                <motion.div
                  animate={{ 
                    opacity: [0.2, 0.5, 0.2],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`absolute -inset-6 rounded-3xl ${
                    isDarkMode 
                      ? "bg-blue-500/10" 
                      : "bg-blue-400/20"
                  } blur-2xl`}
                />
              </div>
            </motion.div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 lg:bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
            onClick={() => scrollToSection("work")}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className={`p-2 rounded-full ${
                isDarkMode ? "bg-gray-800/50" : "bg-blue-100/50"
              }`}
            >
              <ArrowDown
                size={24}
                className={
                  isDarkMode ? "text-gray-400" : "text-blue-500 drop-shadow-sm"
                }
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default HeroSection;