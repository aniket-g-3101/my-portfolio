import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Lightbulb,
  Palette,
  Sparkles,
  Code2,
  Database,
  Rocket,
  Layers,
  Zap,
  MousePointer2,
  Play,
  Pause,
} from "lucide-react";

/* ============================================================
   WORKFLOW STAGES DATA SPECIFICATION
   ============================================================ */
const WORKFLOW_STAGES = [
  {
    id: "idea",
    num: "01",
    title: "IDEA",
    role: "Problem Formulation & Architecture",
    icon: Lightbulb,
    badgeText: "STAGE 01 SELECTED",
    description:
      "Understanding the problem, exploring possibilities and defining the direction before implementation.",
    angleDeg: -90, // Top (12 o'clock)
    tools: [
      { name: "Problem Solving", desc: "Deconstructing complex software requirements into intuitive, modular logic." },
      { name: "Research", desc: "Analyzing technological ecosystems, libraries, and architectural patterns." },
      { name: "Planning", desc: "Milestone planning, scope structuring, and system design specifications." },
      { name: "Concept Development", desc: "Translating business goals into usable technical workflows." },
      { name: "AI Exploration", desc: "Rapid ideation using LLM reasoning for system design spikes." },
    ],
  },
  {
    id: "design",
    num: "02",
    title: "DESIGN",
    role: "Interface Design & Visual Systems",
    icon: Palette,
    badgeText: "STAGE 02 SELECTED",
    description:
      "I design clean, intuitive and engaging interfaces before bringing them to life.",
    angleDeg: -30, // Top-Right (2 o'clock)
    tools: [
      { name: "Figma", desc: "Interface design, component systems, and high-fidelity prototypes." },
      { name: "Canva", desc: "Graphic asset creation, presentation design, and brand kits." },
      { name: "Google Stitch", desc: "AI-assisted interface exploration and semantic design direction." },
      { name: "Framer", desc: "Interactive UI prototyping, micro-animations, and fluid transitions." },
      { name: "Adobe XD", desc: "Wireframing, user journey mapping, and visual layouts." },
      { name: "Photoshop", desc: "Image composition, asset editing, and graphics processing." },
      { name: "UI / UX", desc: "User-centered design principles, accessibility, and visual hierarchy." },
      { name: "Design Systems", desc: "Reusable tokens, typography scales, color palettes, and component guidelines." },
      { name: "Prototyping", desc: "Interactive user flows, screen transitions, and user testing models." },
    ],
  },
  {
    id: "ai",
    num: "03",
    title: "AI",
    role: "Augmented Intelligence & Agentic Coding",
    icon: Sparkles,
    badgeText: "STAGE 03 SELECTED",
    description:
      "Supercharging software engineering with frontier LLMs, autonomous coding agents, and rapid reasoning.",
    angleDeg: 30, // Bottom-Right (4 o'clock)
    tools: [
      { name: "ChatGPT", desc: "AI conversation, logic derivation, and documentation synthesis." },
      { name: "Claude", desc: "AI-assisted reasoning, architectural review, and codebase exploration." },
      { name: "Gemini", desc: "Multimodal analysis, deep context understanding, and rapid prototyping." },
      { name: "Google AI Studio", desc: "Prompt engineering, model tuning, and custom AI agent workflows." },
      { name: "Cursor", desc: "AI-first IDE featuring inline edits, codebase indexing, and multi-file generation." },
      { name: "GitHub Copilot", desc: "Contextual code completions, inline assistance, and test generation." },
      { name: "Google Antigravity", desc: "Autonomous AI pair programming and agentic coding execution." },
      { name: "Grok", desc: "Real-time tech research, code logic inspection, and analytical insights." },
      { name: "Groq", desc: "Ultra-low-latency LPU inference for high-speed AI responses." },
      { name: "AI-assisted Coding", desc: "Accelerating developer productivity through AI pair programming." },
    ],
  },
  {
    id: "build",
    num: "04",
    title: "BUILD",
    role: "Full-Stack Development & Clean Code",
    icon: Code2,
    badgeText: "STAGE 04 SELECTED",
    description:
      "Building responsive web clients, robust server APIs, state flows, and scalable core business logic.",
    angleDeg: 90, // Bottom (6 o'clock)
    tools: [
      { name: "Java", desc: "Object-oriented programming, enterprise logic, and robust backend engineering." },
      { name: "Python", desc: "Scripting, backend development, data processing, and automation." },
      { name: "JavaScript", desc: "Modern ES6+ frontend logic, asynchronous workflows, and full-stack web development." },
      { name: "HTML5", desc: "Semantic document structure, web accessibility (ARIA), and SEO foundation." },
      { name: "CSS3", desc: "Responsive layouts, Flexbox/Grid, custom animations, and modern styling." },
      { name: "React.js", desc: "Component-driven interfaces, state hooks, and interactive web applications." },
      { name: "Tailwind CSS", desc: "Utility-first CSS framework for rapid, responsive, and custom visual design." },
      { name: "Node.js", desc: "Asynchronous JavaScript runtime for building scalable server-side applications." },
      { name: "Django", desc: "High-level Python web framework encouraging rapid development and clean design." },
      { name: "REST APIs", desc: "Designing and consuming clean, versioned HTTP application programming interfaces." },
    ],
  },
  {
    id: "data",
    num: "05",
    title: "DATA",
    role: "Database Engineering & Query Optimization",
    icon: Database,
    badgeText: "STAGE 05 SELECTED",
    description:
      "Structuring relational schemas, document collections, indexes, and high-performance database queries.",
    angleDeg: 150, // Bottom-Left (8 o'clock)
    tools: [
      { name: "MySQL", desc: "Relational database management, structured schema design, and optimized SQL queries." },
      { name: "Oracle SQL", desc: "Enterprise relational database management, complex joins, and stored procedures." },
      { name: "MongoDB", desc: "NoSQL document database, flexible JSON-like schemas, and fast aggregation pipelines." },
    ],
  },
  {
    id: "ship",
    num: "06",
    title: "SHIP",
    role: "DevOps, Cloud Hosting & CI/CD",
    icon: Rocket,
    badgeText: "STAGE 06 SELECTED",
    description:
      "Version control branching, continuous deployment pipelines, cloud infrastructure, and hosting.",
    angleDeg: 210, // Top-Left (10 o'clock)
    tools: [
      { name: "Git", desc: "Distributed version control system for tracking code changes and branching workflows." },
      { name: "GitHub", desc: "Cloud repository hosting, pull request code reviews, and project collaboration." },
      { name: "VS Code", desc: "Primary development environment customized for web & full-stack development." },
      { name: "Google Cloud", desc: "Cloud infrastructure, hosting services, and serverless deployment." },
      { name: "Vercel", desc: "Serverless web deployment platform optimized for modern React & frontend applications." },
      { name: "Netlify", desc: "Continuous delivery platform for automated static site & web app hosting." },
      { name: "Render", desc: "Unified cloud platform for building and running full-stack web applications and APIs." },
    ],
  },
];

const EASE = [0.16, 1, 0.3, 1];

export default function SkillsSection() {
  const { isDarkMode } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const [activeStageId, setActiveStageId] = useState("design");
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [hoveredTool, setHoveredTool] = useState(null);
  const [isInView, setIsInView] = useState(false);

  const containerRef = useRef(null);

  // Track viewport visibility to pause auto-cycle when offscreen
  useEffect(() => {
    const el = containerRef.current;
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
        ".skills-reveal-node",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  /* Auto-Cycle Through Stages (3.5s interval) - only active when section is in view */
  useEffect(() => {
    if (!isAutoPlay || !isInView) return;

    const timer = setInterval(() => {
      setActiveStageId((prev) => {
        const idx = WORKFLOW_STAGES.findIndex((s) => s.id === prev);
        const nextIdx = (idx + 1) % WORKFLOW_STAGES.length;
        return WORKFLOW_STAGES[nextIdx].id;
      });
      setHoveredTool(null);
    }, 3500);

    return () => clearInterval(timer);
  }, [isAutoPlay, isInView]);

  /* Active Stage Lookup */
  const activeStage = useMemo(() => {
    return WORKFLOW_STAGES.find((s) => s.id === activeStageId) || WORKFLOW_STAGES[1];
  }, [activeStageId]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className={`relative pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 overflow-hidden ${isDarkMode ? "text-white" : "text-slate-900"
        }`}
      style={{
        fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Soft Ambient Background Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[130px] opacity-15 pointer-events-none ${isDarkMode ? "bg-indigo-600" : "bg-blue-400"
            }`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full flex flex-col space-y-6">

        {/* ── TOP HEADER DIVIDER & TAG ── */}
        <div className="skills-reveal-node flex items-center justify-between border-b border-slate-700/30 dark:border-slate-800/80 pb-3.5">
          {/* Left Tag */}
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-xs font-semibold tracking-widest text-blue-500">03</span>
            <div className={`w-6 sm:w-8 h-px ${isDarkMode ? "bg-slate-600" : "bg-slate-300"}`} />
            <span
              className={`font-sans-body text-xs sm:text-[13px] font-bold tracking-widest uppercase ${isDarkMode ? "text-slate-300" : "text-slate-700"
                }`}
            >
              TECHNICAL WORKFLOW
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

        {/* ── SECTION TITLE & SUBTITLE BELOW THE LINE ── */}
        <div className="skills-reveal-node text-left space-y-1.5">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight italic uppercase">
            <span className={isDarkMode ? "text-white" : "text-slate-900"}>HOW I </span>
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              BUILD.
            </span>
          </h2>
          <p
            className={`font-sans-body italic font-semibold text-xs sm:text-sm md:text-base max-w-xl leading-relaxed ${isDarkMode ? "text-slate-200" : "text-slate-700"
              }`}
          >
            &ldquo;I turn ideas into useful digital experiences through code, design and AI.&rdquo;
          </p>
        </div>

        {/* ── MOBILE HORIZONTAL STAGE QUICK SELECTOR (VISIBLE ON MOBILE/TABLET ONLY) ── */}
        <div className="skills-reveal-node flex lg:hidden overflow-x-auto gap-2 pb-2 mb-2 custom-scrollbar snap-x touch-pan-x pt-2">
          {WORKFLOW_STAGES.map((stage) => {
            const isSelected = activeStageId === stage.id;
            const Icon = stage.icon;

            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveStageId(stage.id);
                  setHoveredTool(null);
                }}
                className={`flex-shrink-0 snap-start px-3 py-2 rounded-xl border flex items-center gap-2 transition-all duration-200 cursor-pointer ${isSelected
                    ? isDarkMode
                      ? "bg-slate-900 border-indigo-400 text-white shadow-md ring-1 ring-indigo-400/40"
                      : "bg-white border-blue-500 text-slate-950 shadow-md ring-1 ring-blue-500/30"
                    : isDarkMode
                      ? "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200"
                      : "bg-white/70 border-slate-200 text-slate-600 hover:text-slate-900"
                  }`}
              >
                <Icon size={14} className={isSelected ? (isDarkMode ? "text-indigo-300" : "text-blue-600") : ""} />
                <span className="font-mono-tech text-[10px] opacity-75">{stage.num}</span>
                <span className="font-display text-xs font-bold uppercase">{stage.title}</span>
              </button>
            );
          })}
        </div>

        {/* ── MAIN TWO-COLUMN WORKFLOW + INFO PANEL LAYOUT ── */}
        <div className="skills-reveal-node grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch min-h-[460px] sm:min-h-[520px] pt-1">

          {/* ══════════════════════════════════════════════════════════
              LEFT COLUMN: CIRCULAR HEXAGONAL WORKFLOW WHEEL
              ══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[340px] xs:min-h-[380px] sm:min-h-[500px]">

            {/* Workflow Wheel Container */}
            <div className="relative w-[290px] h-[290px] xs:w-[330px] xs:h-[330px] sm:w-[420px] sm:h-[420px] flex items-center justify-center">
              {/* Outer Circular Orbit Ring & SVG Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0">
                {/* Circular Orbit Track */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="42%"
                  fill="none"
                  stroke={isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                {/* Micro-nodes on Ring */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                  const rad = (deg * Math.PI) / 180;
                  const cx = `calc(50% + ${Math.cos(rad) * 42}%)`;
                  const cy = `calc(50% + ${Math.sin(rad) * 42}%)`;
                  return (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r="2.5"
                      fill={isDarkMode ? "#6366f1" : "#3b82f6"}
                      opacity={0.5}
                    />
                  );
                })}

                {/* Dynamic Connection Lines from Center Node to all 6 Stages */}
                {WORKFLOW_STAGES.map((st) => {
                  const isSelected = activeStageId === st.id;
                  const rad = (st.angleDeg * Math.PI) / 180;
                  const x2 = `calc(50% + ${Math.cos(rad) * 42}%)`;
                  const y2 = `calc(50% + ${Math.sin(rad) * 42}%)`;

                  return (
                    <line
                      key={st.id}
                      x1="50%"
                      y1="50%"
                      x2={x2}
                      y2={y2}
                      stroke={
                        isSelected
                          ? isDarkMode
                            ? "#818cf8"
                            : "#4f46e5"
                          : isDarkMode
                            ? "rgba(255,255,255,0.08)"
                            : "rgba(0,0,0,0.06)"
                      }
                      strokeWidth={isSelected ? "2.5" : "1"}
                      strokeDasharray={isSelected ? "none" : "3 3"}
                      style={{ transition: "stroke 0.4s ease, stroke-width 0.4s ease" }}
                    />
                  );
                })}
              </svg>

              {/* ── CENTER ENGINE NODE (ANIKET - WITH SOFT GLOW) ── */}
              <div className="absolute z-20 flex items-center justify-center pointer-events-none">
                {/* Soft Glowing Ambient Ring */}
                <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-xl animate-pulse pointer-events-none" />

                <div
                  className={`w-24 h-24 xs:w-28 xs:h-28 sm:w-36 sm:h-36 rounded-full border flex flex-col items-center justify-center text-center p-2 sm:p-3 transition-all duration-500 shadow-[0_0_35px_rgba(99,102,241,0.3)] ring-2 ring-indigo-500/25 relative ${isDarkMode
                      ? "bg-slate-950/95 border-slate-700 shadow-black/80 text-white"
                      : "bg-white/95 border-slate-200 shadow-slate-200/80 text-slate-900"
                    }`}
                >
                  <span className="font-mono-tech text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-indigo-400 mb-0.5 sm:mb-1">
                    ENGINE
                  </span>
                  <h3 className="font-display font-extrabold text-xs sm:text-base tracking-tight leading-tight uppercase mb-0.5 sm:mb-1">
                    ANIKET
                  </h3>
                  <p className={`font-mono-tech text-[7.5px] sm:text-[9.5px] font-semibold tracking-wider ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                    FULL-STACK
                  </p>
                  <p className={`font-mono-tech text-[7.5px] sm:text-[9.5px] font-semibold tracking-wider ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                    DEVELOPER
                  </p>
                </div>
              </div>

              {/* ── THE 6 CIRCULAR STAGE NODES (FLUID SPRING TRANSITION) ── */}
              {WORKFLOW_STAGES.map((stage) => {
                const isSelected = activeStageId === stage.id;
                const Icon = stage.icon;

                /* Calculate precise circular coordinate positions */
                const rad = (stage.angleDeg * Math.PI) / 180;
                const radiusPercent = 42; // distance from center in %
                const leftPos = `calc(50% + ${Math.cos(rad) * radiusPercent}%)`;
                const topPos = `calc(50% + ${Math.sin(rad) * radiusPercent}%)`;

                return (
                  <div
                    key={stage.id}
                    style={{
                      position: "absolute",
                      left: leftPos,
                      top: topPos,
                      transform: "translate(-50%, -50%)",
                    }}
                    className="z-30"
                  >
                    <motion.button
                      animate={{
                        scale: isSelected ? 1.08 : 1,
                        opacity: isSelected ? 1 : 0.7,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                      }}
                      whileHover={{ scale: isSelected ? 1.12 : 1.06, opacity: 1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setActiveStageId(stage.id);
                        setHoveredTool(null);
                      }}
                      className={`group relative w-16 h-16 xs:w-18 xs:h-18 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl border flex flex-col items-center justify-center p-1.5 sm:p-2 transition-colors duration-300 cursor-pointer ${isSelected
                          ? isDarkMode
                            ? "bg-slate-900/95 border-indigo-400 text-white shadow-[0_0_25px_rgba(99,102,241,0.45)] ring-2 ring-indigo-400/40"
                            : "bg-white border-blue-500 text-slate-950 shadow-[0_0_25px_rgba(59,130,246,0.35)] ring-2 ring-blue-500/30"
                          : isDarkMode
                            ? "bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                            : "bg-white/80 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                        }`}
                    >
                      {/* Stage Icon */}
                      <Icon
                        size={16}
                        className={`transition-transform duration-300 group-hover:scale-110 mb-0.5 sm:mb-1 ${isSelected ? (isDarkMode ? "text-indigo-300" : "text-blue-600") : ""
                          }`}
                      />

                      {/* Stage Number */}
                      <span className="font-mono-tech text-[8px] sm:text-[10px] font-semibold opacity-75 leading-none">
                        {stage.num}
                      </span>

                      {/* Stage Title */}
                      <span className="font-display text-[9.5px] xs:text-[10.5px] sm:text-xs font-extrabold tracking-wide uppercase mt-0.5">
                        {stage.title}
                      </span>

                      {/* Active Hexagon Notch Accent */}
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                      )}
                    </motion.button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              RIGHT COLUMN: DYNAMIC SELECTED-STAGE INFORMATION PANEL
              (COMPACT RESPONSIVE SIZE)
              ══════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 w-full flex flex-col">
            <div
              className={`p-4 sm:p-8 rounded-3xl border backdrop-blur-md transition-all duration-300 shadow-lg flex flex-col justify-between h-auto min-h-[420px] lg:h-[460px] lg:sm:h-[480px] lg:min-h-[460px] lg:sm:min-h-[480px] lg:max-h-[460px] lg:sm:max-h-[480px] ${isDarkMode
                  ? "bg-transparent border-slate-800/80 text-slate-100"
                  : "bg-transparent border-slate-200/80 text-slate-900"
                }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full flex flex-col justify-between"
                >
                  {/* Top Header & Stage Info */}
                  <div className="space-y-2.5">
                    {/* Top Badge */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full font-mono-tech text-[9.5px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {activeStage.badgeText}
                      </span>
                      <span className="font-mono-tech text-[11px] font-bold text-blue-400">
                        Workflow Stage {activeStage.num} of 06
                      </span>
                    </div>

                    {/* Stage Header */}
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <activeStage.icon
                          size={20}
                          className={isDarkMode ? "text-indigo-400" : "text-blue-600"}
                        />
                        <h3 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight uppercase">
                          {activeStage.title}
                        </h3>
                      </div>
                      <p
                        className={`text-xs leading-relaxed font-medium min-h-[34px] line-clamp-2 ${isDarkMode ? "text-slate-100" : "text-slate-800"
                          }`}
                      >
                        {activeStage.description}
                      </p>
                    </div>

                    {/* Divider Line */}
                    <div className={`h-px w-full ${isDarkMode ? "bg-white/10" : "bg-black/10"}`} />

                    {/* Tools Header */}
                    <div className="flex items-center justify-between">
                      <span className={`font-mono-tech text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-300" : "text-slate-600"
                        }`}>
                        TOOLS & CAPABILITIES ({activeStage.tools.length})
                      </span>
                    </div>

                    {/* 2-Column Skill Items Grid */}
                    <div className="grid grid-cols-2 gap-1.5 h-auto sm:h-[195px] sm:min-h-[195px] sm:max-h-[195px] content-start overflow-hidden">
                      {activeStage.tools.map((tool, idx) => {
                        const isHovered = hoveredTool?.name === tool.name;

                        return (
                          <motion.div
                            key={tool.name}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.015, duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                            onMouseEnter={() => setHoveredTool(tool)}
                            onMouseLeave={() => setHoveredTool(null)}
                            onClick={() => setHoveredTool(isHovered ? null : tool)}
                            className={`px-1.5 rounded-lg flex items-center gap-2 transition-colors duration-150 cursor-pointer select-none h-[34px] ${isHovered
                                ? isDarkMode
                                  ? "bg-blue-600/10 text-white"
                                  : "bg-blue-50/80 text-blue-900"
                                : isDarkMode
                                  ? "text-slate-200 hover:text-white"
                                  : "text-slate-800 hover:text-slate-950"
                              }`}
                          >
                            {/* Small Vertical Accent Line */}
                            <div
                              className={`w-[3px] h-3.5 rounded-full flex-shrink-0 transition-colors duration-200 ${isHovered
                                  ? "bg-gradient-to-b from-blue-400 to-indigo-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                                  : isDarkMode
                                    ? "bg-blue-500/60"
                                    : "bg-blue-600"
                                }`}
                            />

                            {/* Tool Name */}
                            <span className="font-sans-body text-xs font-bold truncate">
                              {tool.name}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tool Preview & Hover Description Box (Fixed Height h-[52px]) */}
                  <div
                    className={`p-2 rounded-2xl border transition-colors duration-200 h-[52px] min-h-[52px] max-h-[52px] flex items-center mt-3 sm:mt-0 ${hoveredTool
                        ? isDarkMode
                          ? "bg-blue-950/20 border-blue-500/30 text-slate-200"
                          : "bg-blue-50/60 border-blue-200 text-blue-950"
                        : isDarkMode
                          ? "bg-slate-900/30 border-slate-800/50 text-slate-400"
                          : "bg-slate-50/60 border-slate-200/80 text-slate-500"
                      }`}
                  >
                    {hoveredTool ? (
                      <div className="space-y-0.5 w-full">
                        <p className="font-mono-tech text-[10px] font-bold text-blue-400 truncate leading-none">
                          {hoveredTool.name}:
                        </p>
                        <p className="font-sans-body text-xs leading-snug line-clamp-1">
                          {hoveredTool.desc}
                        </p>
                      </div>
                    ) : (
                      <p className="font-mono-tech text-[10.5px] flex items-center gap-1.5 opacity-80">
                        <MousePointer2 size={12} className="text-blue-500" />
                        <span>Hover or tap any tool above to inspect its purpose.</span>
                      </p>
                    )}
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