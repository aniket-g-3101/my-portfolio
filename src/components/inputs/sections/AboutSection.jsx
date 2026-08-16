import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  MapPin,
  Mail,
  GraduationCap,
  Quote,
  Gamepad2,
  Music,
  BookOpen,
  Compass,
  Trophy,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  UserCheck,
  Briefcase,
  Play,
  Pause,
  Terminal,
} from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useTheme } from "../../../context/ThemeContext";
import PROFILE_PIC from "../../../assets/images/me.webp";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getAnimationConfig, getMotionPreferences } from "../../../lib/gsap/animationConfig";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Expanded Tabs Specification (Without Numbers) ─── */
const CHAPTER_ITEMS = [
  { id: "identity", title: "Identity", icon: UserCheck, desc: "Background & Bio" },
  { id: "experience", title: "Experience", icon: Briefcase, desc: "Work & Delivery" },
  { type: "separator" },
  { id: "journey", title: "Journey", icon: Compass, desc: "Story Timeline" },
  { id: "beyond", title: "Beyond Code", icon: Gamepad2, desc: "Mindset & Passions" },
];

const JOURNEY_STEPS = [
  {
    year: "2023",
    label: "2023",
    subLabel: "Foundation",
    title: "Started BCS Degree",
    badge: "Academic Foundation",
    text: "Started my BCS journey with the fundamentals of Computer Science, programming logic, and algorithm analysis.",
  },
  {
    year: "2024",
    label: "2024",
    subLabel: "Full-Stack",
    title: "Explored Full-Stack",
    badge: "Core Engineering",
    text: "Moved from isolated exercises into interactive projects, connecting React frontend, Node backend, REST APIs, and databases.",
  },
  {
    year: "2025",
    label: "2025",
    subLabel: "Internship",
    title: "Frontend Internship",
    badge: "Unified Mentor",
    text: "Entered a frontend development internship at Unified Mentor, learning team Git workflows and building 5+ production UI modules against real deadlines.",
  },
  {
    year: "2025-2026",
    label: "2025–26",
    subLabel: "Freelance",
    title: "Freelance Client Delivery",
    badge: "Real Client Products",
    text: "Delivered custom full-stack web applications, responsive client dashboards, and REST API integrations for real-world client requirements.",
  },
  {
    year: "2026",
    label: "2026",
    subLabel: "Graduation",
    title: "BCS Graduate & Beyond",
    badge: "9.42 CGPA Distinction",
    text: "Graduated with a 9.42 CGPA in Bachelor of Computer Science, transitioning toward full-time professional software engineering.",
  },
];

const HOBBIES = [
  {
    id: "gaming",
    label: "Gaming",
    sub: "Strategy & Problem Solving",
    icon: Gamepad2,
    accent: "from-blue-500 via-indigo-500 to-cyan-500",
    text: "Gaming keeps the competitive side active and gives me a different way to think about strategy, challenge and problem solving under pressure.",
  },
  {
    id: "music",
    label: "Music",
    sub: "Rhythm & Focus Reset",
    icon: Music,
    accent: "from-indigo-500 via-blue-500 to-sky-500",
    text: "Music gives me a mental reset between intense coding sessions, keeping creativity fluent and deep focus sustainable.",
  },
  {
    id: "learning",
    label: "Learning",
    sub: "Continuous Evolution",
    icon: BookOpen,
    accent: "from-teal-400 via-emerald-500 to-cyan-500",
    text: "Learning is a constant daily routine, especially when complex project requirements expose new technical horizons.",
  },
  {
    id: "exploring",
    label: "Exploring",
    sub: "Fresh Perspectives",
    icon: Compass,
    accent: "from-amber-400 via-orange-500 to-yellow-500",
    text: "Exploring new places, ideas, and software paradigms provides fresh mental references for creative problem solving.",
  },
  {
    id: "sports",
    label: "Sports",
    sub: "Discipline & Teamwork",
    icon: Trophy,
    accent: "from-blue-500 via-indigo-600 to-cyan-600",
    text: "Sports bring balance, physical discipline, and a healthy competitive reason to step away from the screen.",
  },
];

const EXPERIENCES = [
  {
    id: "unified",
    num: "01",
    role: "Frontend Developer Intern",
    company: "Unified Mentor",
    period: "JULY 2025",
    type: "INTERNSHIP",
    summary:
      "Collaborated within an engineering team to translate UI/UX designs into responsive, production-ready React modules and dashboard interfaces.",
    highlights: [
      "Engineered 5+ responsive React web app modules with clean state management",
      "Collaborated via Git PR workflows, code reviews, and API endpoint integration",
      "Optimized cross-browser performance and mobile responsive layouts",
    ],
    tech: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "REST APIs", "Git"],
  },
  {
    id: "freelance",
    num: "02",
    role: "Full-Stack Web Developer",
    company: "Freelance / Self-Employed",
    period: "2025 — PRESENT",
    duration: "Ongoing Client Work",
    type: "FREELANCE",
    summary:
      "Architecting and delivering full-stack web applications, database management dashboards, and custom client tools from concept to deployment.",
    highlights: [
      "Built custom full-stack solutions with Node.js, Express, React, and MongoDB/MySQL",
      "Created dynamic landing pages with animated web interfaces and theme engine",
      "Integrated secure authentication, CRUD backends, and cloud deployment pipelines",
    ],
    tech: ["Node.js", "Express", "MongoDB", "MySQL", "React", "Tailwind CSS"],
  },
];

const WHAT_CHANGED_PILLARS = [
  {
    id: "quality",
    term: "Code Hygiene",
    desc: "Moved from writing quick scripts to modular, well-typed, and maintainable software components.",
  },
  {
    id: "delivery",
    term: "Deadline Discipline",
    desc: "Learned to estimate sprints accurately, break features into clear milestones, and deliver reliably.",
  },
  {
    id: "collaboration",
    term: "Team Workflow",
    desc: "Mastered Git feature branching, pull request reviews, and seamless developer handoffs.",
  },
  {
    id: "userfirst",
    term: "User-Centric UX",
    desc: "Prioritizing mobile accessibility, performance speed, and crisp visual interactions in every build.",
  },
];

/* ── Motion Variants for Tab Expansion ── */
const buttonVariants = {
  initial: { paddingLeft: 10, paddingRight: 10 },
  animate: (isSelected) => ({
    paddingLeft: isSelected ? 12 : 10,
    paddingRight: isSelected ? 12 : 10,
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const springTransition = {
  type: "spring",
  bounce: 0.15,
  duration: 0.4,
};

/* ── Premium Chapter Stage Reveal (masked wipe + blur, no y-drift entrance) ── */
const stageVariants = {
  initial: { opacity: 0, y: 16, clipPath: "inset(0 0 100% 0)", filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", filter: "blur(0px)" },
  exit: { opacity: 0, y: -16, clipPath: "inset(100% 0 0 0)", filter: "blur(6px)" },
};

const stageTransition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] };

export default function AboutSection() {
  const { isDarkMode } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  /* Chapter tab state — Auto Mode ON by default */
  const [activeChapter, setActiveChapter] = useState("identity");
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  /* Internal stage state */
  const [activeExpIdx, setActiveExpIdx] = useState(0);
  const [activePillarId, setActivePillarId] = useState("quality");
  const [activeJourneyIdx, setActiveJourneyIdx] = useState(0);
  const [activeHobbyId, setActiveHobbyId] = useState("gaming");

  // Track viewport visibility to pause heavy background intervals when offscreen
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

  /* Auto play tab timer (3s interval) - only active when section is in view */
  useEffect(() => {
    if (!isAutoPlay || !isInView) return;

    const timer = setInterval(() => {
      setActiveChapter((prev) => {
        const playableItems = CHAPTER_ITEMS.filter((i) => i.id);
        const currentIdx = playableItems.findIndex((i) => i.id === prev);
        const nextIdx = (currentIdx + 1) % playableItems.length;
        return playableItems[nextIdx].id;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [isAutoPlay, isInView]);

  /* Journey auto scrubber on desktop */
  useEffect(() => {
    if (activeChapter !== "journey" || !isInView) return;

    const isDesktop = window.innerWidth >= 768;
    if (!isDesktop) return;

    const timer = setInterval(() => {
      setActiveJourneyIdx((prev) => (prev + 1) % JOURNEY_STEPS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [activeChapter, isInView]);

  /* ── Master GSAP About Narrative Entrance (Clip-Path Wipe & Lateral Expand) ── */
  useGSAP(
    () => {
      const { isReducedMotion, isMobile } = getMotionPreferences();
      const config = getAnimationConfig();

      if (isReducedMotion) {
        gsap.set([".about-header-tag", ".about-nav-bar", ".about-content-panel"], {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          scaleX: 1,
          clipPath: "inset(0 0 0% 0)",
          clearProps: "all",
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        },
        defaults: {
          ease: config.easing.entrance,
        },
      });

      // 1. Header tag lateral slide
      tl.fromTo(
        ".about-header-tag",
        { xPercent: isMobile ? -6 : -4, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: config.duration.short, ease: "power2.out" }
      )
        // 2. Chapter tabs bar horizontal scale-in expansion
        .fromTo(
          ".about-nav-bar",
          { scaleX: isMobile ? 0.95 : 0.88, opacity: 0, transformOrigin: "50% 50%" },
          { scaleX: 1, opacity: 1, duration: config.duration.medium, ease: "power3.out" },
          "-=0.1"
        )
        // 3. Narrative main panel vertical clip-path wipe reveal
        .fromTo(
          ".about-content-panel",
          {
            clipPath: isMobile ? "inset(0 0 40% 0)" : "inset(0 0 100% 0)",
            y: isMobile ? 15 : 25,
            opacity: 0,
          },
          {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            opacity: 1,
            duration: config.duration.section,
            ease: "power4.inOut",
          },
          "-=0.25"
        );
    },
    { scope: sectionRef }
  );

  const activeExp = EXPERIENCES[activeExpIdx];
  const activePillar =
    WHAT_CHANGED_PILLARS.find((p) => p.id === activePillarId) ||
    WHAT_CHANGED_PILLARS[0];
  const currentJourney = JOURNEY_STEPS[activeJourneyIdx];
  const currentHobby =
    HOBBIES.find((h) => h.id === activeHobbyId) || HOBBIES[0];

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden transition-colors duration-500 ${isDarkMode ? "text-white" : "text-slate-900"
        }`}
      style={{
        fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Ambient background accent */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 ${isDarkMode ? "bg-blue-600" : "bg-blue-400"
            }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full space-y-6">

        {/* ── TOP HEADER DIVIDER & TAG ── */}
        <div className="about-header-tag flex items-center justify-between border-b border-slate-700/30 dark:border-slate-800/80 pb-3.5">
          {/* Left Dossier Tag */}
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-xs font-semibold tracking-widest text-blue-500">02</span>
            <div className={`w-6 sm:w-8 h-px ${isDarkMode ? "bg-slate-600" : "bg-slate-300"}`} />
            <span
              className={`font-sans-body text-xs sm:text-[13px] font-bold tracking-widest uppercase ${isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}
            >
              PERSONAL DOSSIER
            </span>
            <div className={`w-6 sm:w-8 h-px ${isDarkMode ? "bg-slate-600" : "bg-slate-300"}`} />
          </div>

          {/* Right Corner: Auto Play Button */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-sans-body font-bold flex items-center gap-1.5 transition-all cursor-pointer select-none ${isAutoPlay
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

        {/* ── EXPANDING TABS MENU (AT LEFT CORNER BELOW THE LINE) ── */}
        <div className="about-nav-bar flex items-center justify-start pt-1">
          <div
            className={`flex items-center gap-1 p-1 rounded-2xl border backdrop-blur-xl shadow-md overflow-x-auto max-w-full scrollbar-hide touch-pan-x ${isDarkMode
              ? "bg-slate-950/60 border-white/10 shadow-black/40"
              : "bg-white/95 border-slate-200/90 shadow-slate-200/60"
              }`}
          >
            {CHAPTER_ITEMS.map((item, index) => {
              if (item.type === "separator") {
                return (
                  <div
                    key={`sep-${index}`}
                    className={`h-4 w-[1.5px] mx-0.5 rounded-full ${isDarkMode ? "bg-slate-800" : "bg-slate-200"
                      }`}
                  />
                );
              }

              const isSelected = activeChapter === item.id;
              const Icon = item.icon;

              return (
                <motion.button
                  key={item.id}
                  variants={buttonVariants}
                  initial={false}
                  animate="animate"
                  custom={isSelected}
                  onClick={() => setActiveChapter(item.id)}
                  transition={springTransition}
                  className={`relative flex items-center rounded-xl py-1.5 font-sans-body text-xs sm:text-[13px] font-bold tracking-wide transition-colors duration-300 cursor-pointer ${isSelected
                    ? isDarkMode
                      ? "bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-blue-500/30 text-white font-bold border border-white/20 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.3),0_4px_16px_rgba(59,130,246,0.3)]"
                      : "bg-gradient-to-r from-blue-500/20 via-indigo-500/15 to-blue-600/20 text-blue-700 font-bold border border-blue-400/40 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.8),0_4px_12px_rgba(37,99,235,0.2)]"
                    : isDarkMode
                      ? "text-slate-300 hover:bg-white/10 hover:text-white border border-transparent"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-950 border border-transparent"
                    }`}
                >
                  <Icon size={14} className={isSelected ? (isDarkMode ? "text-blue-400" : "text-blue-600") : (isDarkMode ? "text-slate-400" : "text-slate-500")} />
                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.span
                        variants={spanVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={springTransition}
                        className="overflow-hidden whitespace-nowrap ml-1.5"
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ── STAGE DISPLAY CONTAINER ── */}
        <div className="about-content-panel w-full relative min-h-[440px]">
          <AnimatePresence mode="wait">

            {/* ══════════════════════════════════════════════════════════
                1. IDENTITY TAB STAGE
                ══════════════════════════════════════════════════════════ */}
            {activeChapter === "identity" && (
              <motion.div
                key="chapter-identity"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 pt-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">

                  {/* PORTRAIT CARD */}
                  <div className="md:col-span-5 flex justify-center">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      whileHover={{ scale: 1.02 }}
                      className="relative max-w-[240px] xs:max-w-[270px] sm:max-w-[290px] lg:max-w-[310px] w-full"
                    >
                      <div className={`p-2 sm:p-2.5 rounded-[24px] sm:rounded-[26px] border overflow-hidden ${isDarkMode ? "bg-slate-900/90 border-slate-700/80 shadow-xl" : "bg-white border-slate-200/90 shadow-lg"
                        }`}>
                        <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-blue-500 z-20 opacity-80" />
                        <span className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-blue-500 z-20 opacity-80" />
                        <span className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-indigo-500 z-20 opacity-80" />
                        <span className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-indigo-500 z-20 opacity-80" />

                        <div className="relative rounded-[18px] sm:rounded-[20px] overflow-hidden aspect-[4/5] bg-slate-950">
                          <img
                            src={PROFILE_PIC}
                            alt="Aniket Gavali"
                            className="w-full h-full object-cover object-center filter contrast-[1.02] transition-transform duration-700 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-85" />
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white z-10 space-y-0.5">
                            <p className="text-[10px] sm:text-[11px] font-mono-tech font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1">
                              <GraduationCap size={12} />
                              <span>BCS Graduate &bull; 9.42 CGPA</span>
                            </p>
                            <p className="text-[11px] sm:text-xs font-sans-body font-bold truncate text-slate-100">
                              Pandharpur, MH, India
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Identity Content Stack */}
                  <div className="md:col-span-7 space-y-4 text-left">
                    <div className="space-y-0.5">
                      <p className={`font-display text-lg sm:text-2xl font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                        Hey, I'm
                      </p>
                      <div className="relative inline-block">
                        <span
                          className={`font-cursive text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r bg-clip-text text-transparent cursor-default ${isDarkMode
                            ? "from-blue-400 via-indigo-400 to-blue-500"
                            : "from-blue-600 via-indigo-600 to-blue-700"
                            }`}
                          style={{ transform: "rotate(-2deg)", display: "inline-block" }}
                        >
                          Aniket
                        </span>
                        <div className="absolute -bottom-2 left-1 w-32 sm:w-36 pointer-events-none z-10">
                          <svg width="100%" height="20" viewBox="0 0 200 30" fill="none" className="overflow-visible">
                            <motion.path
                              d="M 0 20 Q 40 5, 80 15 T 160 10 Q 180 9, 195 12"
                              stroke="url(#aboutSwooshGrad)"
                              strokeWidth="2"
                              strokeLinecap="round"
                              fill="none"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1.2, delay: 0.2 }}
                            />
                            <defs>
                              <linearGradient id="aboutSwooshGrad" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>


                    </div>

                    <div className="flex items-stretch gap-3">
                      <div className="w-[3px] bg-gradient-to-b from-blue-500 via-indigo-500 to-blue-600 rounded-full flex-shrink-0" />
                      <div className={`font-sans-body text-xs sm:text-sm leading-relaxed space-y-2 font-medium ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                        <p>
                          Full-stack developer dedicated to building modern, reliable, and intuitive web applications. Graduated with a <span className="font-bold text-blue-500">9.42 CGPA</span> in Bachelor of Computer Science.
                        </p>
                        <p>
                          Experienced in frontend development and freelance client projects, turning ideas into clean, functional digital experiences across the full web stack.
                        </p>
                      </div>
                    </div>

                    {/* ITALIC SANS SENTENCE (ITALIC, NOT ROTATED TILTED) */}
                    <div className="pt-2">
                      <div className="flex items-start gap-2.5">
                        <Quote size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                        <p className={`font-sans-body italic font-semibold text-sm sm:text-base lg:text-lg tracking-normal leading-relaxed ${isDarkMode ? "text-slate-100" : "text-slate-900"
                          }`}>
                          &ldquo;I turn ideas into clean, functional and impactful digital experiences.&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-5 sm:gap-6 pt-3">
                      <a
                        href="mailto:aniketgavaliwork@gmail.com"
                        className="group relative inline-flex flex-col items-start cursor-pointer"
                      >
                        <div className={`flex items-center gap-2 font-sans-body font-bold text-xs tracking-[0.2em] uppercase transition-colors ${isDarkMode ? "text-white group-hover:text-blue-400" : "text-slate-900 group-hover:text-blue-600"
                          }`}>
                          <span>GET IN TOUCH</span>
                          <ArrowUpRight size={14} className="text-blue-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                        <div className="w-full h-[1.5px] bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 mt-1" />
                      </a>

                      <a
                        href="https://github.com/aniket-g-3101"
                        target="_blank"
                        rel="noreferrer"
                        className="group relative inline-flex flex-col items-start cursor-pointer"
                      >
                        <div className={`flex items-center gap-2 font-sans-body font-bold text-xs tracking-[0.2em] uppercase transition-colors ${isDarkMode ? "text-slate-200 group-hover:text-indigo-400" : "text-slate-700 group-hover:text-indigo-600"
                          }`}>
                          <FiGithub size={13} />
                          <span>GITHUB</span>
                          <ArrowRight size={14} className="text-slate-400 group-hover:text-indigo-400" />
                        </div>
                        <div className={`w-full h-[1.5px] mt-1 ${isDarkMode ? "bg-slate-700" : "bg-slate-300"}`} />
                      </a>

                      <a
                        href="https://linkedin.com/in/aniketgavali"
                        target="_blank"
                        rel="noreferrer"
                        className="group relative inline-flex flex-col items-start cursor-pointer"
                      >
                        <div className={`flex items-center gap-2 font-sans-body font-bold text-xs tracking-[0.2em] uppercase transition-colors ${isDarkMode ? "text-slate-200 group-hover:text-indigo-400" : "text-slate-700 group-hover:text-indigo-600"
                          }`}>
                          <FiLinkedin size={13} />
                          <span>LINKEDIN</span>
                          <ArrowRight size={14} className="text-slate-400 group-hover:text-indigo-400" />
                        </div>
                        <div className={`w-full h-[1.5px] mt-1 ${isDarkMode ? "bg-slate-700" : "bg-slate-300"}`} />
                      </a>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════════
                2. EXPERIENCE TAB STAGE
                ══════════════════════════════════════════════════════════ */}
            {activeChapter === "experience" && (
              <motion.div
                key="chapter-experience"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`p-4 sm:p-8 rounded-3xl border backdrop-blur-md transition-all duration-300 shadow-lg space-y-6 ${isDarkMode
                  ? "bg-transparent border-slate-800/80 text-slate-100"
                  : "bg-transparent border-slate-200/80 text-slate-900"
                  }`}
              >
                {/* Header & Internal Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/20 pb-3">
                  <div className="space-y-1">
                    <span className="font-mono-tech text-xs font-semibold tracking-widest text-blue-400">WORK HISTORY</span>
                    <h3 className={`font-display text-xl sm:text-2xl font-bold tracking-tight uppercase ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      Industry & Freelance Delivery
                    </h3>
                  </div>

                  {/* Internal Tabs */}
                  <div className={`flex items-center gap-1.5 p-1 rounded-xl border self-start sm:self-auto ${isDarkMode ? "bg-slate-900/60 border-slate-800" : "bg-white/80 border-slate-200"
                    }`}>
                    {EXPERIENCES.map((exp, idx) => {
                      const isSelected = activeExpIdx === idx;
                      return (
                        <button
                          key={exp.id}
                          onClick={() => setActiveExpIdx(idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-sans-body font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${isSelected
                            ? "bg-blue-600 text-white shadow-md"
                            : isDarkMode
                              ? "text-slate-400 hover:text-white"
                              : "text-slate-600 hover:text-slate-900"
                            }`}
                        >
                          <span className="font-mono-tech text-[10px] opacity-80">{exp.num}</span>
                          <span>{exp.type}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Experience Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeExp.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span className="font-mono-tech text-2xl sm:text-4xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                        {activeExp.num}
                      </span>
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="font-mono-tech text-xs font-bold text-blue-400 uppercase">{activeExp.period}</span>
                            <h4 className={`font-sans-body text-lg sm:text-2xl font-bold tracking-wide ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                              {activeExp.role}
                            </h4>
                            <p className="text-xs font-semibold text-blue-500">
                              {activeExp.company} &bull; <span className="opacity-90">{activeExp.duration}</span>
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {activeExp.tech.map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className={`px-2 py-0.5 rounded-md text-[10px] sm:text-[10.5px] font-mono-tech font-bold border ${isDarkMode
                                  ? "bg-slate-900/80 text-blue-400 border-blue-900/50"
                                  : "bg-blue-50/80 text-blue-700 border-blue-200"
                                  }`}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className={`font-sans-body text-xs sm:text-sm leading-relaxed font-medium ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                          {activeExp.summary}
                        </p>

                        {/* Key Specific Deliverables */}
                        <div className="space-y-2 pt-1">
                          <p className="text-xs font-mono-tech font-bold text-slate-400 uppercase tracking-wider">Key Specific Deliverables:</p>
                          {activeExp.highlights.map((h, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium">
                              <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className={isDarkMode ? "text-slate-200" : "text-slate-800"}>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Growth Lessons */}
                    <div className="pt-4 border-t border-slate-700/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tech text-[11px] sm:text-xs font-bold text-blue-400 uppercase">Growth Pillars</span>
                        <span className="text-[10px] font-mono-tech text-slate-400">Click pillars to inspect</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {WHAT_CHANGED_PILLARS.map((p) => {
                          const isSelected = activePillarId === p.id;
                          return (
                            <button
                              key={p.id}
                              onClick={() => setActivePillarId(p.id)}
                              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-sans-body font-bold transition-all cursor-pointer ${isSelected
                                ? "bg-blue-600 text-white shadow-md"
                                : isDarkMode
                                  ? "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white"
                                  : "bg-white/80 text-slate-700 border border-slate-200 hover:text-slate-900"
                                }`}
                            >
                              {p.term}
                            </button>
                          );
                        })}
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activePillar.id}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs font-sans-body leading-relaxed pt-1"
                        >
                          <span className="text-indigo-400 font-bold">{activePillar.term}:</span> "{activePillar.desc}"
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════════
                3. JOURNEY TAB STAGE
                ══════════════════════════════════════════════════════════ */}
            {activeChapter === "journey" && (
              <motion.div
                key="chapter-journey"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`p-4 sm:p-8 rounded-3xl border backdrop-blur-md transition-all duration-300 shadow-lg space-y-6 ${isDarkMode
                  ? "bg-transparent border-slate-800/80 text-slate-100"
                  : "bg-transparent border-slate-200/80 text-slate-900"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-mono-tech text-[10px] sm:text-xs font-semibold tracking-widest text-teal-400 uppercase">
                      AUTOMATIC STORY SCRUBBER
                    </span>
                    <h3 className={`font-display text-xl sm:text-2xl font-bold tracking-tight uppercase ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      Chronological Evolution
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono-tech text-teal-400">
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                    <span className="hidden xs:inline">Auto Scrubbing</span>
                  </div>
                </div>

                {/* Timeline Scrubber */}
                <div className="space-y-6">
                  <div className="relative pt-4 pb-6 px-1 sm:px-2">
                    <div className="absolute top-8 left-5 right-5 sm:left-6 sm:right-6 h-1 -translate-y-1/2 bg-slate-700/30 rounded-full pointer-events-none" />

                    <div className="absolute top-8 left-5 right-5 sm:left-6 sm:right-6 h-1 -translate-y-1/2 rounded-full pointer-events-none overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                        animate={{ width: `${(activeJourneyIdx / (JOURNEY_STEPS.length - 1)) * 100}%` }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      />
                    </div>

                    <div className="relative z-10 flex items-center justify-between">
                      {JOURNEY_STEPS.map((step, idx) => {
                        const isSelected = activeJourneyIdx === idx;
                        return (
                          <button
                            key={step.year}
                            onClick={() => setActiveJourneyIdx(idx)}
                            className="group flex flex-col items-center gap-1.5 cursor-pointer focus:outline-none"
                          >
                            <motion.div
                              animate={{ scale: isSelected ? 1.25 : 1 }}
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isSelected
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-white text-white shadow-xl ring-2 sm:ring-4 ring-blue-500/30"
                                : isDarkMode
                                  ? "bg-slate-900 border-slate-700 text-slate-400 group-hover:border-blue-400"
                                  : "bg-slate-100 border-slate-300 text-slate-600 group-hover:border-blue-500"
                                }`}
                            >
                              <span className="font-mono-tech text-[11px] sm:text-xs font-bold">{idx + 1}</span>
                            </motion.div>

                            <div className="text-center space-y-0.5 pt-1">
                              <p className={`font-sans-body text-[10px] sm:text-xs font-bold tracking-wider transition-colors ${isSelected ? "text-blue-400" : isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                                {step.label}
                              </p>
                              <p className={`text-[9px] sm:text-[10px] font-sans-body uppercase tracking-tight font-semibold hidden sm:block ${isSelected ? "text-blue-400" : "text-slate-500"}`}>
                                {step.subLabel}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Narrative */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentJourney.year}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className={`p-4 sm:p-5 rounded-2xl border ${isDarkMode ? "bg-slate-900/60 border-slate-800/80" : "bg-white/80 border-slate-200/80"
                        } space-y-2.5 shadow-md`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono-tech text-xs font-bold text-blue-500 flex items-center gap-1.5">
                          <Terminal size={13} />
                          <span>YEAR {currentJourney.year}</span>
                        </span>
                        <span className="font-mono-tech text-[10px] sm:text-[10.5px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {currentJourney.badge}
                        </span>
                      </div>

                      <h4 className={`font-sans-body text-base sm:text-xl font-bold tracking-wide ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                        {currentJourney.title}
                      </h4>

                      <p className={`font-sans-body text-xs sm:text-sm leading-relaxed font-medium ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                        {currentJourney.text}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono-tech text-slate-400 pt-1 border-t border-slate-700/20">
                    <span>Node {activeJourneyIdx + 1} of {JOURNEY_STEPS.length}</span>
                    <span>Tap nodes anytime to scrub</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════════════════
                4. BEYOND CODE TAB STAGE
                ══════════════════════════════════════════════════════════ */}
            {activeChapter === "beyond" && (
              <motion.div
                key="chapter-beyond"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 pt-2"
              >
                <div className="space-y-1">
                  <span className="font-mono-tech text-xs font-semibold tracking-widest text-amber-400 uppercase">
                    PERSONAL MINDSET & PASSIONS
                  </span>
                  <h3 className={`font-display text-xl sm:text-2xl font-bold tracking-tight uppercase ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    Beyond the Screen
                  </h3>
                </div>

                {/* Chips */}
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {HOBBIES.map((hb) => {
                      const isSelected = activeHobbyId === hb.id;
                      const Icon = hb.icon;
                      return (
                        <button
                          key={hb.id}
                          onClick={() => setActiveHobbyId(hb.id)}
                          className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-sans-body text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer ${isSelected
                            ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white shadow-md"
                            : isDarkMode
                              ? "bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800/80"
                              : "bg-slate-100 text-slate-700 hover:text-slate-950 hover:bg-slate-200"
                            }`}
                        >
                          <Icon size={13} className={isSelected ? "text-white" : "text-slate-400"} />
                          <span>{hb.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Displayed Mindset Quote (Italic, Not Rotated) */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentHobby.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4 pt-2 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center bg-gradient-to-br ${currentHobby.accent} text-white shadow-md`}>
                          <currentHobby.icon size={16} />
                        </div>
                        <div>
                          <h4 className={`font-sans-body text-sm sm:text-lg font-bold tracking-wide ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                            {currentHobby.label}
                          </h4>
                          <p className="font-mono-tech text-[11px] sm:text-xs text-blue-400 font-semibold">
                            {currentHobby.sub}
                          </p>
                        </div>
                      </div>

                      {/* Italic Sans Sentence (No rotation transform) */}
                      <div className="flex items-stretch gap-3 pt-1">
                        <div className={`w-[3px] rounded-full bg-gradient-to-b ${currentHobby.accent} flex-shrink-0`} />
                        <p className={`font-sans-body italic font-semibold text-xs sm:text-sm lg:text-base tracking-normal leading-relaxed ${isDarkMode ? "text-slate-100" : "text-slate-900"
                          }`}>
                          &ldquo;{currentHobby.text}&rdquo;
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
