import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useTheme } from "../../../context/ThemeContext";
import Resume from "../../../assets/Resume/Aniket_Gavali_Resume.pdf";
import { useLenisContext } from "../../../context/LenisContext";
import { scrollToSection as lenisScrollTo } from "../../../hooks/useLenis";

const HeroSection = () => {
  const { isDarkMode } = useTheme();
  const lenisRef = useLenisContext();

  const scrollToSection = (sectionId) => {
    lenisScrollTo(sectionId, lenisRef);
  };

  const socialLinks = [
    {
      icon: FiGithub,
      href: "https://github.com/aniket-g-3101",
      label: "GitHub",
      subtitle: "Source code & projects",
      hoverClass: "group-hover:text-indigo-400 group-hover:border-indigo-500/60 group-hover:bg-indigo-500/15 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]",
      badgeBg: "bg-indigo-500",
    },
    {
      icon: FiLinkedin,
      href: "https://linkedin.com/in/aniketgavali",
      label: "LinkedIn",
      subtitle: "Professional profile",
      hoverClass: "group-hover:text-sky-400 group-hover:border-sky-500/60 group-hover:bg-sky-500/15 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]",
      badgeBg: "bg-sky-500",
    },
    {
      icon: Mail,
      href: "mailto:aniket.g.dev@gmail.com",
      label: "Email",
      subtitle: "Drop me a message",
      hoverClass: "group-hover:text-cyan-400 group-hover:border-cyan-500/60 group-hover:bg-cyan-500/15 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]",
      badgeBg: "bg-cyan-500",
    },
  ];

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.10, delayChildren: 0.15 },
    },
  };

  const rise = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  /* dotted grid generator */
  const dots = [];
  const cols = 10;
  const rows = 10;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ x: c * 22, y: r * 22, key: `${r}-${c}` });
    }
  }

  return (
    <section
      id="home"
      className={`relative w-full pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12 overflow-hidden ${
        isDarkMode ? "text-white" : "text-slate-900"
      }`}
    >
      {/* GPU ACCELERATED MOBILE AMBIENT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute top-0 right-0 w-[550px] h-[550px] rounded-full blur-[150px] opacity-30 ${
            isDarkMode ? "bg-blue-600/20" : "bg-blue-400/15"
          }`}
        />
        <div
          className={`absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full blur-[140px] opacity-25 ${
            isDarkMode ? "bg-cyan-500/20" : "bg-cyan-300/15"
          }`}
        />
      </div>

      {/* ── FUTURISTIC CYBER SOCIAL RAIL WITH LASER LINES & "LET'S CONNECT HERE" ── */}
      <aside className="hidden xl:flex fixed left-6 2xl:left-10 top-1/2 -translate-y-1/2 flex-col items-center z-40">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-3.5"
        >
          {/* Top Futuristic Laser Line with Traveling Light Pulse */}
          <div className="flex flex-col items-center gap-1.5">
            <span className={`text-[8px] font-mono-tech tracking-widest uppercase select-none ${isDarkMode ? "text-cyan-400/60" : "text-blue-500/70"}`}>
              SYS.01
            </span>
            <div
              className={`w-[2px] h-14 rounded-full laser-rail ${
                isDarkMode
                  ? "bg-slate-800/90 shadow-[0_0_8px_rgba(56,189,248,0.2)]"
                  : "bg-slate-300/90 shadow-[0_0_6px_rgba(2,132,199,0.2)]"
              }`}
            />
          </div>

          {/* "LET'S CONNECT HERE" Futuristic Vertical Tech Label with Live Telemetry Pulse */}
          <div className="flex flex-col items-center gap-2.5 select-none py-1 group cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
            </span>
            <span
              className={`font-mono-tech text-[9.5px] font-extrabold tracking-[0.3em] uppercase transition-all duration-300 ${
                isDarkMode
                  ? "text-slate-300 group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                  : "text-slate-600 group-hover:text-blue-600 group-hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.6)]"
              }`}
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              LET&apos;S CONNECT HERE
            </span>
          </div>

          {/* Futuristic Center Cyber Separator */}
          <div className="flex flex-col items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? "bg-cyan-400 shadow-[0_0_6px_#22d3ee]" : "bg-blue-500 shadow-[0_0_6px_#3b82f6]"}`} />
            <div
              className={`w-[2px] h-6 rounded-full ${
                isDarkMode
                  ? "bg-gradient-to-b from-cyan-400/80 via-indigo-500/50 to-transparent"
                  : "bg-gradient-to-b from-blue-500/80 via-indigo-400/40 to-transparent"
              }`}
            />
          </div>

          {/* Futuristic Cyber Action Nodes with Corner Brackets & Holographic Glow */}
          <div className="flex flex-col items-center gap-3.5">
            {socialLinks.map((item, idx) => (
              <div key={idx} className="relative group flex items-center">
                <motion.a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  whileHover={{ scale: 1.14, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 450, damping: 22 }}
                  className={`w-11 h-11 rounded-xl border backdrop-blur-xl flex items-center justify-center transition-all duration-300 cursor-pointer select-none relative overflow-hidden ${
                    isDarkMode
                      ? "border-slate-800/90 bg-slate-950/80 text-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                      : "border-slate-200/90 bg-white/90 text-slate-700 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                  } ${item.hoverClass}`}
                >
                  {/* Futuristic Cyber Corner Brackets */}
                  <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-cyan-400/0 group-hover:border-cyan-400/90 transition-colors duration-300 pointer-events-none" />
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-cyan-400/0 group-hover:border-cyan-400/90 transition-colors duration-300 pointer-events-none" />
                  <span className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-cyan-400/0 group-hover:border-cyan-400/90 transition-colors duration-300 pointer-events-none" />
                  <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-cyan-400/0 group-hover:border-cyan-400/90 transition-colors duration-300 pointer-events-none" />

                  {/* Diagonal Holographic Sweep */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Icon */}
                  <item.icon size={18} className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_currentColor]" />
                </motion.a>

                {/* Futuristic HUD Glass Tooltip (Slides Out Smoothly to Right on Hover) */}
                <div className="absolute left-full ml-4 pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-250 ease-out z-50">
                  <div
                    className={`px-3.5 py-2.5 rounded-xl border backdrop-blur-2xl shadow-2xl flex items-center gap-3 whitespace-nowrap relative ${
                      isDarkMode
                        ? "bg-slate-950/95 border-cyan-500/40 text-white shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_15px_rgba(6,182,212,0.15)]"
                        : "bg-white/95 border-blue-400/40 text-slate-900 shadow-[0_10px_30px_rgba(0,0,0,0.1),0_0_12px_rgba(59,130,246,0.15)]"
                    }`}
                  >
                    {/* Tooltip Corner Accents */}
                    <span className="absolute top-1 left-1 w-1 h-1 border-t border-l border-cyan-400/80" />
                    <span className="absolute bottom-1 right-1 w-1 h-1 border-b border-r border-cyan-400/80" />

                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${item.badgeBg} animate-pulse`} />
                        <span className="font-grotesk text-xs font-black uppercase tracking-wider">
                          {item.label}
                        </span>
                        <span className="font-mono-tech text-[8px] font-bold text-cyan-400/80 uppercase px-1 rounded bg-cyan-500/10">
                          LINK
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono leading-tight ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                        {item.subtitle}
                      </span>
                    </div>
                    <ArrowUpRight size={14} className="text-cyan-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Futuristic Laser Line with Traveling Light Pulse */}
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-[2px] h-14 rounded-full laser-rail ${
                isDarkMode
                  ? "bg-slate-800/90 shadow-[0_0_8px_rgba(56,189,248,0.2)]"
                  : "bg-slate-300/90 shadow-[0_0_6px_rgba(2,132,199,0.2)]"
              }`}
            />
            <span className={`text-[8px] font-mono-tech tracking-widest uppercase select-none ${isDarkMode ? "text-cyan-400/60" : "text-blue-500/70"}`}>
              COMMS
            </span>
          </div>
        </motion.div>
      </aside>

      {/* MAIN HERO LAYOUT */}
      <div className="w-full max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-start xl:pl-14">
        {/* LEFT COLUMN — Content Stack */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* 01 — SOFTWARE DEVELOPER label */}
          <motion.div variants={rise} className="flex items-center gap-3 mb-5 sm:mb-8 lg:mb-10">
            <span className="font-mono-tech text-xs font-semibold tracking-widest text-blue-500">01</span>
            <div className={`w-6 sm:w-8 h-px ${isDarkMode ? "bg-slate-600" : "bg-slate-300"}`} />
            <span
              className={`font-grotesk text-xs sm:text-[13px] font-bold tracking-widest uppercase ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              SOFTWARE DEVELOPER
            </span>
            <div className={`w-6 sm:w-8 h-px ${isDarkMode ? "bg-slate-600" : "bg-slate-300"}`} />
          </motion.div>

          {/* "Hey, I'm" */}
          <motion.p
            variants={rise}
            className={`font-display text-xl sm:text-3xl lg:text-[2.1rem] font-medium mb-1 ${
              isDarkMode ? "text-slate-200" : "text-slate-700"
            }`}
          >
            Hey, I'm
          </motion.p>

          {/* Handwritten "Aniket" — signature style (Mobile Scaled) */}
          <motion.div
            variants={rise}
            whileHover={{ scale: 1.015, x: 4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="origin-left mb-1 relative inline-block max-w-full"
          >
            <span
              className={`font-cursive text-5xl xs:text-6xl sm:text-8xl lg:text-[7rem] xl:text-[7.5rem] font-bold bg-gradient-to-r bg-clip-text text-transparent leading-[1.15] cursor-default ${
                isDarkMode
                  ? "from-blue-400 via-indigo-400 to-blue-500 drop-shadow-[0_4px_24px_rgba(59,130,246,0.3)]"
                  : "from-blue-600 via-indigo-600 to-blue-700 drop-shadow-[0_2px_8px_rgba(59,130,246,0.15)]"
              }`}
              style={{ transform: "rotate(-2deg)", display: "inline-block" }}
            >
              Aniket
            </span>

            {/* Signature swoosh anchored directly under Aniket */}
            <div className="absolute -bottom-2 sm:-bottom-3 left-1 w-36 xs:w-48 sm:w-60 pointer-events-none z-10">
              <svg width="100%" height="30" viewBox="0 0 200 30" fill="none" className="overflow-visible">
                <motion.path
                  d="M 0 20 Q 40 5, 80 15 T 160 10 Q 180 9, 195 12"
                  stroke="url(#heroSwooshGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="heroSwooshGrad" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>

          {/* "GAVALI" with accent line */}
          <motion.div variants={rise} className="flex items-center gap-3 sm:gap-4 mt-1 mb-5 sm:mb-8 lg:mb-9">
            <span
              className={`font-grotesk text-lg sm:text-2xl lg:text-[1.65rem] font-bold tracking-[0.35em] uppercase ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              GAVALI
            </span>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "3.5rem" }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="h-[2.5px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
            />
          </motion.div>

          {/* ── MAIN HEADLINE (Responsive Mobile Scale) ── */}
          <motion.div variants={rise} className="mb-5 sm:mb-7">
            <h1 className="font-display font-extrabold uppercase leading-tight tracking-tight">
              <span className={`block text-3xl sm:text-4xl lg:text-[2.7rem] ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                I BUILD
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-[2.7rem] bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 bg-clip-text text-transparent">
                DIGITAL
              </span>
              <span className={`block text-3xl sm:text-4xl lg:text-[2.7rem] ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                EXPERIENCES
              </span>
              <span className="block text-3xl sm:text-4xl lg:text-[2.7rem]">
                <span className={isDarkMode ? "text-white" : "text-slate-900"}>FOR THE WEB</span>
                <span className="text-blue-500">.</span>
              </span>
            </h1>
          </motion.div>

          {/* ── DESCRIPTION with vertical accent ── */}
          <motion.div variants={rise} className="mb-6 sm:mb-8 lg:mb-9 max-w-md flex items-stretch gap-3.5">
            <div className="w-[3px] bg-gradient-to-b from-blue-500 via-indigo-500 to-blue-600 rounded-full flex-shrink-0" />
            <p className={`font-sans-body text-sm sm:text-base leading-relaxed font-medium ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
              Full-stack developer focused on clean interfaces, thoughtful interactions, and reliable web applications.
            </p>
          </motion.div>

          {/* ── CTAs — editorial text links ── */}
          <motion.div variants={rise} className="flex flex-wrap items-center gap-6 sm:gap-10 mb-8 sm:mb-10">
            {/* EXPLORE WORK ↗ */}
            <motion.button
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection("work")}
              className="group relative inline-flex flex-col items-start cursor-pointer py-1"
            >
              <div
                className={`flex items-center gap-2.5 font-grotesk font-bold text-xs sm:text-[13px] tracking-[0.22em] uppercase transition-colors duration-300 ${
                  isDarkMode ? "text-white group-hover:text-blue-400" : "text-slate-900 group-hover:text-blue-600"
                }`}
              >
                <span>EXPLORE WORK</span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={2.5}
                  className="text-blue-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>
              <div className="w-full h-[1.5px] bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 mt-2 transition-all duration-300 group-hover:h-[2px] group-hover:shadow-[0_0_10px_rgba(59,130,246,0.7)]" />
            </motion.button>

            {/* RESUME → */}
            <motion.a
              href={Resume}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex flex-col items-start cursor-pointer py-1"
            >
              <div
                className={`flex items-center gap-2.5 font-grotesk font-bold text-xs sm:text-[13px] tracking-[0.22em] uppercase transition-colors duration-300 ${
                  isDarkMode ? "text-slate-300 group-hover:text-indigo-400" : "text-slate-600 group-hover:text-indigo-600"
                }`}
              >
                <span>RESUME</span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className={`transition-transform duration-300 group-hover:translate-x-1.5 ${
                    isDarkMode ? "text-slate-500 group-hover:text-indigo-400" : "text-slate-400 group-hover:text-indigo-600"
                  }`}
                />
              </div>
              <div
                className={`w-full h-[1.5px] mt-2 transition-all duration-300 ${
                  isDarkMode
                    ? "bg-slate-600 group-hover:bg-indigo-400 group-hover:h-[2px] group-hover:shadow-[0_0_10px_rgba(99,102,241,0.6)]"
                    : "bg-slate-300 group-hover:bg-indigo-500 group-hover:h-[2px] group-hover:shadow-[0_0_10px_rgba(99,102,241,0.6)]"
                }`}
              />
            </motion.a>
          </motion.div>

          {/* Mobile Social Bar Pill */}
          <motion.div variants={rise} className="flex xl:hidden items-center gap-3 pt-1 mb-4">
            <div
              className={`flex items-center gap-3 p-2 px-4 rounded-full border backdrop-blur-md ${
                isDarkMode ? "bg-slate-900/90 border-slate-700/80 shadow-md" : "bg-white border-slate-200 shadow-md"
              }`}
            >
              <span
                className={`font-mono-tech text-xs font-bold uppercase tracking-wider ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                Connect:
              </span>
              {socialLinks.map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-1.5 rounded-full transition-colors ${
                    isDarkMode ? "text-blue-400 hover:text-white" : "text-blue-600 hover:text-slate-950"
                  }`}
                >
                  <item.icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN — Decorative Code Snippet & Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="lg:col-span-5 relative hidden lg:flex flex-col items-end justify-start min-h-[480px]"
        >
          {/* Code Snippet */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`relative mr-4 mt-2 p-4 sm:p-5 rounded-2xl border backdrop-blur-md shadow-xl transition-all duration-300 w-72 ${
              isDarkMode
                ? "bg-slate-900/80 border-slate-800 shadow-black/40"
                : "bg-white/85 border-slate-200/80 shadow-slate-200/50"
            }`}
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-slate-700/20">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className={`font-mono-tech text-[10px] ml-auto font-medium ${
                isDarkMode ? "text-slate-500" : "text-slate-400"
              }`}>
                developer.js
              </span>
            </div>

            <div className={`font-mono-tech text-xs leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
              <div>
                <span className={isDarkMode ? "text-blue-400" : "text-blue-600"}>const</span>{" "}
                <span className={isDarkMode ? "text-slate-200" : "text-slate-800"}>aniket</span>{" "}
                <span className={isDarkMode ? "text-slate-500" : "text-slate-400"}>=</span>{" "}
                <span className={isDarkMode ? "text-slate-500" : "text-slate-400"}>{"{"}</span>
              </div>
              <div className="pl-4">
                <span className={isDarkMode ? "text-indigo-400" : "text-indigo-600"}>role:</span>{" "}
                <span className={isDarkMode ? "text-emerald-400" : "text-emerald-600"}>"Full-Stack Developer"</span>,
              </div>
              <div className="pl-4">
                <span className={isDarkMode ? "text-indigo-400" : "text-indigo-600"}>focus:</span>{" "}
                <span className={isDarkMode ? "text-emerald-400" : "text-emerald-600"}>"Web & Mobile Apps"</span>,
              </div>
              <div className="pl-4">
                <span className={isDarkMode ? "text-indigo-400" : "text-indigo-600"}>passion:</span>{" "}
                <span className={isDarkMode ? "text-emerald-400" : "text-emerald-600"}>"Clean Code & UI"</span>,
              </div>
              <div className="pl-4">
                <span className={isDarkMode ? "text-indigo-400" : "text-indigo-600"}>status:</span>{" "}
                <span className={isDarkMode ? "text-amber-400" : "text-amber-600"}>"Building Great Software"</span>
              </div>
              <div>
                <span className={isDarkMode ? "text-slate-500" : "text-slate-400"}>{"}"}</span>;
              </div>
            </div>

            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -right-2 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
            />
          </motion.div>

          {/* Dotted Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="absolute right-8 top-[140px]"
          >
            <svg
              width={cols * 22}
              height={rows * 22}
              viewBox={`0 0 ${cols * 22} ${rows * 22}`}
              className="overflow-visible"
            >
              <defs>
                <radialGradient id="dotFade" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopOpacity="1" />
                  <stop offset="100%" stopOpacity="0" />
                </radialGradient>
              </defs>
              {dots.map((d) => (
                <motion.circle
                  key={d.key}
                  cx={d.x + 3}
                  cy={d.y + 3}
                  r="1.5"
                  fill={isDarkMode ? "#475569" : "#cbd5e1"}
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;