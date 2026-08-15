import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import { PROJECTS } from "../../../utils/data";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ExternalLink,
  Github,
  Star,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Globe,
  Sparkles,
  Play,
  Pause,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";

// 5 Key Feature icons
const FEATURE_ICONS = [Zap, ShieldCheck, Cpu, Layers, Globe];

const EASE = [0.16, 1, 0.3, 1];

export default function ProjectsSection() {
  const { isDarkMode } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isInView, setIsInView] = useState(false);

  const sectionRef = useRef(null);
  const listContainerRef = useRef(null);

  /* Current Active Project Data */
  const activeProject = useMemo(() => {
    const raw = PROJECTS[activeIdx] || PROJECTS[0];
    return {
      ...raw,
      indexNum: String(activeIdx + 1).padStart(2, "0"),
    };
  }, [activeIdx]);

  // Preload all project images in memory on mount for instantaneous switching
  useEffect(() => {
    PROJECTS.forEach((proj) => {
      if (proj.image) {
        const img = new Image();
        img.src = proj.image;
      }
    });
  }, []);

  // Track viewport visibility to pause auto-cycle when offscreen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // GSAP ScrollTrigger Entrance Animation
  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        ".projects-reveal-node",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  /* ── Auto-Cycle Through Projects (3.5s interval) - only active when section is in view ── */
  useEffect(() => {
    if (!isAutoPlay || !isInView) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % PROJECTS.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isAutoPlay, isInView]);

  /* ── Keep active list item visible inside list container without hijacking page scroll ── */
  useEffect(() => {
    const container = listContainerRef.current;
    const activeEl = document.getElementById(`proj-item-${activeIdx}`);
    if (!container || !activeEl) return;

    const containerRect = container.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();

    if (elRect.top < containerRect.top) {
      container.scrollTo({
        top: container.scrollTop + (elRect.top - containerRect.top) - 14,
        behavior: "smooth",
      });
    } else if (elRect.bottom > containerRect.bottom) {
      container.scrollTo({
        top: container.scrollTop + (elRect.bottom - containerRect.bottom) + 14,
        behavior: "smooth",
      });
    }
  }, [activeIdx]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className={`relative pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 overflow-hidden bg-transparent ${
        isDarkMode ? "text-white" : "text-slate-900"
      }`}
      style={{
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Ambient background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-15 pointer-events-none ${
            isDarkMode ? "bg-indigo-600" : "bg-blue-400"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full space-y-5">
        {/* ── TOP HEADER DIVIDER & AUTO-PLAY BUTTON ── */}
        <div className="projects-reveal-node flex items-center justify-between border-b border-slate-700/30 dark:border-slate-800/80 pb-3">
          {/* Left Header Tag */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest text-blue-500">05</span>
            <div className={`w-6 sm:w-8 h-px ${isDarkMode ? "bg-slate-600" : "bg-slate-300"}`} />
            <span
              className={`text-xs sm:text-sm font-bold tracking-widest uppercase ${
                isDarkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              MY PROJECTS
            </span>
            <div className={`w-6 sm:w-8 h-px ${isDarkMode ? "bg-slate-600" : "bg-slate-300"}`} />
          </div>

          {/* Right Corner: Auto Play Button */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer select-none ${
              isAutoPlay
                ? isDarkMode
                  ? "bg-blue-600/25 text-blue-400 border-blue-500/40 shadow-sm"
                  : "bg-blue-50 text-blue-700 border-blue-300 shadow-sm"
                : isDarkMode
                ? "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white"
                : "bg-white text-slate-600 border-slate-200 hover:text-slate-900"
            }`}
            title={isAutoPlay ? "Pause Auto Switch" : "Play Auto Switch"}
          >
            {isAutoPlay ? <Pause size={13} className="text-blue-500 animate-pulse" /> : <Play size={13} />}
            <span>{isAutoPlay ? "AUTO: ON" : "AUTO: OFF"}</span>
          </button>
        </div>

        {/* ── SECTION TITLE & SUBTITLE ── */}
        <div className="projects-reveal-node text-left space-y-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight italic uppercase">
            <span className={isDarkMode ? "text-white" : "text-slate-900"}>Ideas Turned Into Real </span>
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Solutions.
            </span>
          </h2>
          <p
            className={`italic font-medium text-xs sm:text-sm md:text-[15px] max-w-xl leading-relaxed ${
              isDarkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            &ldquo;A showcase of projects that solve real problems, explore new technologies, and deliver meaningful digital experiences.&rdquo;
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════
            RESPONSIVE LAYOUT (MATCHING USER WIREFRAME BLUEPRINT):
            [DESKTOP: 2-COLUMN SPLIT (LIST LEFT | SHOWCASE CARD RIGHT)]
            ══════════════════════════════════════════════════════════ */}
        <div className="projects-reveal-node flex flex-col lg:grid lg:grid-cols-12 gap-5 lg:gap-8 items-start pt-1">
          {/* ── LEFT COLUMN: ENRICHED PROJECTS LIST (4 COLS) ── */}
          <div className="w-full lg:col-span-4 flex flex-col space-y-2">
            <div className="flex items-center justify-between pb-0.5">
              <span className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                PROJECT SHOWCASE ({PROJECTS.length})
              </span>
              <span className={`text-xs font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                {String(activeIdx + 1).padStart(2, "0")} / {PROJECTS.length}
              </span>
            </div>

            {/* Scrollable list container */}
            <div
              ref={listContainerRef}
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto space-x-2.5 lg:space-x-0 lg:space-y-3 pb-2 lg:pb-0 pr-0 lg:pr-2 h-auto lg:h-[580px] custom-scrollbar overscroll-contain snap-x touch-pan-x lg:touch-pan-y pointer-events-auto"
            >
              {PROJECTS.map((project, idx) => {
                const isSelected = activeIdx === idx;
                const numStr = String(idx + 1).padStart(2, "0");

                return (
                  <motion.div
                    id={`proj-item-${idx}`}
                    key={project.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveIdx(idx);
                      setIsAutoPlay(false);
                    }}
                    className={`min-w-[280px] max-w-[310px] sm:min-w-[330px] lg:min-w-0 lg:max-w-none flex-shrink-0 snap-start p-4 rounded-2xl border flex items-start gap-3.5 transition-all duration-200 cursor-pointer select-none text-left backdrop-blur-md ${
                      isSelected
                        ? isDarkMode
                          ? "bg-slate-900/95 border-indigo-400 text-white shadow-[0_0_24px_rgba(99,102,241,0.35)] ring-1.5 ring-indigo-400/50"
                          : "bg-white border-blue-500 text-slate-950 shadow-[0_0_24px_rgba(59,130,246,0.25)] ring-1.5 ring-blue-500/40"
                        : isDarkMode
                        ? "bg-slate-900/60 border-slate-800/90 text-slate-200 hover:border-slate-700 hover:text-white hover:bg-slate-800/80"
                        : "bg-white/80 border-slate-200/90 text-slate-800 hover:border-slate-300 hover:text-slate-950 hover:bg-white"
                    }`}
                  >
                    {/* Small Vertical Accent Line */}
                    <div
                      className={`w-[4px] h-12 rounded-full flex-shrink-0 mt-1 transition-colors duration-200 ${
                        isSelected
                          ? "bg-gradient-to-b from-blue-400 to-indigo-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                          : isDarkMode
                          ? "bg-blue-500/50"
                          : "bg-blue-600"
                      }`}
                    />

                    <div className="flex-1 min-w-0 space-y-1.5">
                      {/* Top Bar: Item Index & Category Badge */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold opacity-80">
                          {numStr}
                        </span>
                        <span className={`text-xs font-mono font-bold uppercase truncate tracking-wider ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                          {project.category}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h4 className={`italic font-extrabold text-sm sm:text-base md:text-[16px] leading-snug line-clamp-1 ${
                        isSelected
                          ? isDarkMode ? "text-white" : "text-slate-950"
                          : isDarkMode ? "text-slate-100" : "text-slate-900"
                      }`}>
                        {project.title}
                      </h4>

                      {/* Description Info */}
                      <p className={`font-normal text-xs sm:text-[12.5px] leading-relaxed line-clamp-3 ${
                        isSelected
                          ? isDarkMode ? "text-slate-200" : "text-slate-700"
                          : isDarkMode ? "text-slate-300" : "text-slate-600"
                      }`}>
                        {project.description}
                      </p>

                      {/* Tech Stack Pills (List View) */}
                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {project.tags.slice(0, 4).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 border backdrop-blur-md transition-colors ${
                              isDarkMode
                                ? "bg-transparent border-slate-700/60 text-slate-200"
                                : "bg-transparent border-slate-300/70 text-slate-800"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                            <span>{tag}</span>
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className={`px-2 py-1 rounded-lg text-[11px] font-mono font-bold opacity-80 ${
                            isDarkMode ? "text-slate-300" : "text-slate-600"
                          }`}>
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT COLUMN: SHOWCASE CARD (FULLY TRANSPARENT WITH SOFT BLUR) ── */}
          <div className="w-full lg:col-span-8 flex flex-col h-auto">
            <div
              className={`p-5 sm:p-7 rounded-3xl border backdrop-blur-xl transition-all duration-300 shadow-2xl flex flex-col justify-start h-auto ${
                isDarkMode
                  ? "bg-transparent border-slate-800/80 text-slate-100 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
                  : "bg-transparent border-slate-200/80 text-slate-900 shadow-xl"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="flex flex-col justify-start h-auto space-y-4"
                >
                  {/* ── TOP SECTION: PROMINENT LARGE PREVIEW IMAGE ON LEFT | TITLE & INFO ON RIGHT ── */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                    
                    {/* TOP LEFT: PROMINENT LARGE PREVIEW IMAGE MOCKUP (7 COLS) */}
                    <div className="md:col-span-7 flex justify-center md:justify-start w-full">
                      <div className={`relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl p-1.5 border shadow-2xl transition-transform duration-500 hover:scale-[1.02] ${
                        isDarkMode
                          ? "bg-slate-950 border-slate-700/80 shadow-black/80 ring-1 ring-slate-800"
                          : "bg-slate-900 border-slate-700 shadow-slate-300/50"
                      }`}>
                        {/* Metallic Camera Dot */}
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-700 z-20" />
                        
                        {/* High-Resolution Screen Image Container */}
                        <div className="w-full h-full rounded-xl overflow-hidden relative group/img bg-slate-950 flex items-center justify-center">
                          <img
                            src={activeProject.image}
                            alt={activeProject.title}
                            loading="eager"
                            decoding="async"
                            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/img:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
                            <span className="text-[11px] font-mono font-bold text-white flex items-center gap-1.5">
                              <Sparkles size={13} className="text-blue-400" />
                              {activeProject.shortTitle} Preview
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* TOP RIGHT: TITLE & INFO DETAILS (5 COLS) */}
                    <div className="md:col-span-5 space-y-2.5">
                      {/* Category & Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`}>
                          {activeProject.category}
                        </span>
                        {activeProject.featured && (
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider ${
                            isDarkMode
                              ? "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                              : "bg-amber-50 text-amber-700 border border-amber-200"
                          }`}>
                            <Star size={11} className="fill-current" />
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Project Title */}
                      <h3 className={`text-lg sm:text-xl font-extrabold italic tracking-tight leading-snug ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                        {activeProject.title}
                      </h3>

                      {/* Description Info */}
                      <p className={`italic font-medium text-xs sm:text-[13px] leading-relaxed line-clamp-3 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                        {activeProject.description}
                      </p>

                      {/* HERO SECTION EDITORIAL STYLE BUTTONS (SINGLE ROW NO-WRAP) */}
                      <div className="flex items-center gap-5 sm:gap-6 pt-4 sm:pt-5 flex-nowrap">
                        {activeProject.liveUrl ? (
                          <motion.a
                            href={activeProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 2 }}
                            whileTap={{ scale: 0.96 }}
                            className="group relative inline-flex flex-col items-start cursor-pointer select-none flex-shrink-0"
                          >
                            <div
                              className={`flex items-center gap-1.5 font-bold text-[11px] sm:text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                                isDarkMode ? "text-white group-hover:text-blue-400" : "text-slate-900 group-hover:text-blue-600"
                              }`}
                            >
                              <span>LIVE DEMO</span>
                              <ExternalLink size={13} strokeWidth={2.5} className="text-blue-500 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>
                            <div className="w-full h-[1.5px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mt-1 transition-all duration-300 group-hover:h-[2px] group-hover:shadow-[0_0_10px_rgba(59,130,246,0.7)]" />
                          </motion.a>
                        ) : null}

                        {activeProject.githubUrl && (
                          <motion.a
                            href={activeProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 2 }}
                            whileTap={{ scale: 0.96 }}
                            className="group relative inline-flex flex-col items-start cursor-pointer select-none flex-shrink-0"
                          >
                            <div
                              className={`flex items-center gap-1.5 font-bold text-[11px] sm:text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                                isDarkMode ? "text-slate-300 group-hover:text-white" : "text-slate-700 group-hover:text-slate-950"
                              }`}
                            >
                              <Github size={13} strokeWidth={2.5} className="text-blue-500 transition-transform duration-300 group-hover:scale-110" />
                              <span>SOURCE CODE</span>
                            </div>
                            <div className="w-full h-[1.5px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 mt-1 opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:h-[2px] group-hover:shadow-[0_0_10px_rgba(59,130,246,0.7)]" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ── BOTTOM SECTION: TECH STACK & KEY ARCHITECTURE HIGHLIGHTS ── */}
                  <div className={`space-y-3.5 pt-3.5 border-t ${isDarkMode ? "border-slate-800/80" : "border-slate-200"}`}>
                    
                    {/* Technology Stack Pills (Modern & Enlarged) */}
                    <div className="space-y-2">
                      <h5 className={`text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                        TECHNOLOGY STACK
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-[13px] font-semibold flex items-center gap-2 border backdrop-blur-md transition-all duration-300 ${
                              isDarkMode
                                ? "bg-transparent border-slate-700/60 text-slate-100 hover:text-white hover:border-blue-400/60 hover:bg-slate-900/20 shadow-xs"
                                : "bg-transparent border-slate-300/70 text-slate-800 hover:text-slate-950 hover:border-blue-500/50 hover:bg-white/30 shadow-xs"
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 animate-pulse" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Technical Features & Architecture Highlights */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <h5 className={`text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] italic ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                        KEY ARCHITECTURE & HIGHLIGHTS
                      </h5>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 sm:gap-2.5">
                        {(
                          activeProject.journey || [
                            { step: "01", name: "REAL-TIME SOCKETS", desc: "Sub-second event bus via Socket.io" },
                            { step: "02", name: "TOKEN AUTH", desc: "Multi-provider user authentication" },
                            { step: "03", name: "CHANNEL ROOMS", desc: "Private & group conversation threads" },
                            { step: "04", name: "EXPRESS BACKEND", desc: "RESTful Node.js server architecture" },
                            { step: "05", name: "TAILWIND UI", desc: "Responsive dark mode chat interface" },
                          ]
                        ).map((feat, fIdx) => {
                          const FeatIcon = FEATURE_ICONS[fIdx] || CheckCircle2;
                          return (
                            <div
                              key={fIdx}
                              className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border flex flex-col justify-between transition-all duration-200 backdrop-blur-md ${
                                isDarkMode
                                  ? "bg-slate-900/60 border-slate-700/80 hover:border-blue-400/50 shadow-xs"
                                  : "bg-white/90 border-slate-200/90 hover:border-blue-300 shadow-xs"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                                <div className={`w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 rounded-md flex items-center justify-center ${
                                  isDarkMode ? "bg-blue-500/15 text-blue-400 border border-blue-500/20" : "bg-blue-50 text-blue-600 border border-blue-100"
                                }`}>
                                  <FeatIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                </div>
                                <span className="text-[9px] sm:text-[11px] font-mono font-bold text-blue-400">#{feat.step}</span>
                              </div>
                              <div className={`text-[10px] sm:text-xs font-extrabold italic tracking-tight uppercase truncate ${
                                isDarkMode ? "text-white" : "text-slate-950"
                              }`}>
                                {feat.name}
                              </div>
                              <div className={`text-[9px] sm:text-[11px] leading-tight italic font-medium line-clamp-2 mt-0.5 ${
                                isDarkMode ? "text-slate-300" : "text-slate-700"
                              }`}>
                                {feat.desc}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}