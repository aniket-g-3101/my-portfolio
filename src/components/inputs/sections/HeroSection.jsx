import React, { useRef } from "react";
import { ArrowUpRight, ArrowRight, Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useTheme } from "../../../context/ThemeContext";
import Resume from "../../../assets/Resume/Aniket_Gavali_Resume.pdf";
import { useLenisContext } from "../../../context/LenisContext";
import { scrollToSection as lenisScrollTo } from "../../../hooks/useLenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getAnimationConfig, getMotionPreferences } from "../../../lib/gsap/animationConfig";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Per-letter scatter vectors for "Aniket" ──
   Each letter gets a unique trajectory: x, y offset + rotation.
   These feel hand-crafted — no two letters move the same way. */
const ANIKET_SCATTER = [
  { x: -120, y: -90,  rotate: -25 },  // A — flies upper-left
  { x:  -55, y:  110, rotate:  18 },  // n — drops down-left
  { x:   30, y: -130, rotate: -12 },  // i — shoots straight up
  { x:  100, y:  -60, rotate:  30 },  // k — flings upper-right
  { x:  140, y:   85, rotate: -20 },  // e — arcs lower-right
  { x:  -80, y:  120, rotate:  22 },  // t — tumbles down-left
];

/* ── Per-letter scatter vectors for "GAVALI" ──
   Bold industrial tracking expansion + vertical drift. */
const GAVALI_SCATTER = [
  { x: -90,  y: 45,   rotate: 15  },  // G
  { x: -45,  y: -60,  rotate: -10 },  // A
  { x:  15,  y: 80,   rotate: 20  },  // V
  { x:  65,  y: -50,  rotate: -15 },  // A
  { x:  110, y: 35,   rotate: 12  },  // L
  { x:  140, y: -70,  rotate: -22 },  // I
];

const HeroSection = () => {
  const { isDarkMode } = useTheme();
  const lenisRef = useLenisContext();
  const heroRef = useRef(null);

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

  /* ── Master GSAP Hero Entrance & Scroll Exit Choreography ── */
  useGSAP(
    () => {
      const { isReducedMotion, isMobile } = getMotionPreferences();
      const config = getAnimationConfig();

      if (isReducedMotion) {
        gsap.set(
          [
            ".hero-tag",
            ".hero-hey",
            ".hero-name",
            ".hero-swoosh-path",
            ".hero-gavali",
            ".hero-accent-line",
            ".hero-headline-line",
            ".hero-desc",
            ".hero-cta-btn",
            ".hero-mobile-social",
            ".hero-social-rail",
            ".hero-dot-grid",
            ".aniket-letter",
            ".gavali-letter",
          ],
          { opacity: 1, x: 0, y: 0, scale: 1, strokeDashoffset: 0, clearProps: "all" }
        );
        return;
      }

      // 1. Master Entrance Timeline (Deterministic sequence)
      const tl = gsap.timeline({
        defaults: {
          ease: config.easing.entrance,
        },
      });

      // Initial states
      gsap.set(".hero-accent-line", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".hero-swoosh-path", { strokeDasharray: 220, strokeDashoffset: 220 });

      // Step 1: "Hey, I'm" and Tag enters from the left
      tl.fromTo(
        ".hero-tag",
        { x: isMobile ? -20 : -40, opacity: 0 },
        { x: 0, opacity: 1, duration: config.duration.short, ease: "power2.out" }
      )
        .fromTo(
          ".hero-hey",
          { x: isMobile ? -25 : -50, opacity: 0 },
          { x: 0, opacity: 1, duration: config.duration.medium, ease: "power3.out" },
          "-=0.15"
        )

        // Step 2: "Aniket" follows naturally with subtle scale & path draw
        .fromTo(
          ".hero-name",
          { x: isMobile ? -15 : -25, scale: 0.94, opacity: 0 },
          { x: 0, scale: 1, opacity: 1, duration: config.duration.section, ease: config.easing.cinematic },
          "-=0.25"
        )
        .to(
          ".hero-swoosh-path",
          { strokeDashoffset: 0, duration: config.duration.medium, ease: "power2.out" },
          "-=0.35"
        )

        // Step 3: "GAVALI" reveals from behind hard mask + accent line expands
        .fromTo(
          ".hero-gavali span",
          { yPercent: 110 },
          { yPercent: 0, duration: config.duration.medium, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          ".hero-accent-line",
          { scaleX: 1, opacity: 1, duration: config.duration.short, ease: "power2.out" },
          "-=0.2"
        )

        // Step 4: Headline lines rise sequentially from behind overflow masks
        .fromTo(
          ".hero-headline-line",
          { yPercent: 110 },
          { yPercent: 0, duration: config.duration.medium, stagger: config.stagger.fast, ease: "power3.out" },
          "-=0.1"
        )
        .fromTo(
          ".hero-desc",
          { y: isMobile ? 12 : 20, opacity: 0 },
          { y: 0, opacity: 1, duration: config.duration.medium, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".hero-cta-btn",
          { y: isMobile ? 10 : 15, opacity: 0 },
          { y: 0, opacity: 1, duration: config.duration.short, stagger: config.stagger.fast, ease: config.easing.snappy },
          "-=0.15"
        )
        .fromTo(
          ".hero-mobile-social",
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: config.duration.short },
          "-=0.2"
        )

        // Side & Right column accents
        .fromTo(
          ".hero-social-rail",
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: config.duration.section, ease: config.easing.cinematic },
          "-=0.7"
        )
        .fromTo(
          ".hero-dot-grid",
          { opacity: 0 },
          { opacity: 1, duration: config.duration.section },
          "-=0.5"
        );

      // 2. Scrubbed Exit Parallax & Fade on Scroll into About Section
      if (!isReducedMotion) {
        const exitTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8, // Direct smooth physics scrub
            invalidateOnRefresh: true,
          },
        });

        // Content column shifts up smoothly and fades
        exitTl.to(
          ".hero-content-col",
          {
            y: isMobile ? -30 : -65,
            opacity: isMobile ? 0.35 : 0.25,
            ease: "none",
          },
          0
        );

        // Dot matrix subtle parallax
        exitTl.to(
          ".hero-dot-grid",
          {
            y: isMobile ? -20 : -45,
            opacity: 0.1,
            ease: "none",
          },
          0
        );

      }


      /* ══════════════════════════════════════════════════════════
         3. SCROLL-TRIGGERED LETTER SCATTER — "Aniket" & "GAVALI"
         Scrubbed 1:1 with Lenis smooth scroll via GSAP ScrollTrigger.
         Each letter disperses along its own trajectory as the user scrolls.
         ══════════════════════════════════════════════════════════ */
      if (!isReducedMotion) {
        const scatterScale = isMobile ? 0.5 : 1;

        // ─── "Aniket" letter scatter ───
        const aniketLetters = heroRef.current?.querySelectorAll(".aniket-letter");
        if (aniketLetters?.length) {
          const aniketTl = gsap.timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: isMobile ? "40% top" : "55% top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });

          aniketLetters.forEach((letter, i) => {
            const scatter = ANIKET_SCATTER[i] || { x: 0, y: 0, rotate: 0 };
            aniketTl.to(
              letter,
              {
                x: scatter.x * scatterScale,
                y: scatter.y * scatterScale,
                rotation: scatter.rotate * scatterScale,
                opacity: 0,
                scale: 0.6,
                ease: "none",
              },
              0
            );
          });

          // Swoosh fades and collapses with the name
          aniketTl.to(
            ".hero-swoosh",
            { opacity: 0, y: 20 * scatterScale, ease: "none" },
            0
          );
        }

        // ─── "GAVALI" letter scatter ───
        const gavaliLetters = heroRef.current?.querySelectorAll(".gavali-letter");
        if (gavaliLetters?.length) {
          const gavaliTl = gsap.timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: isMobile ? "40% top" : "55% top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });

          gavaliLetters.forEach((letter, i) => {
            const scatter = GAVALI_SCATTER[i] || { x: 0, y: 0, rotate: 0 };
            gavaliTl.to(
              letter,
              {
                x: scatter.x * scatterScale,
                y: scatter.y * scatterScale,
                rotation: scatter.rotate * scatterScale,
                opacity: 0,
                scale: 0.65,
                ease: "none",
              },
              0
            );
          });

          // Accent line shrinks away
          gavaliTl.to(
            ".hero-accent-line",
            { scaleX: 0, opacity: 0, ease: "none" },
            0
          );
        }
      }
    },
    { scope: heroRef }
  );

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
      ref={heroRef}
      className={`relative w-full pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12 overflow-hidden ${isDarkMode ? "text-white" : "text-slate-900"
        }`}
    >
      {/* GPU ACCELERATED MOBILE AMBIENT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute top-0 right-0 w-[550px] h-[550px] rounded-full blur-[150px] opacity-30 ${isDarkMode ? "bg-blue-600/20" : "bg-blue-400/15"
            }`}
        />
        <div
          className={`absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full blur-[140px] opacity-25 ${isDarkMode ? "bg-cyan-500/20" : "bg-cyan-300/15"
            }`}
        />
      </div>

      {/* ── FUTURISTIC CYBER SOCIAL RAIL WITH LASER LINES & "LET'S CONNECT HERE" ── */}
      <aside className="hidden xl:flex fixed left-6 2xl:left-10 top-1/2 -translate-y-1/2 flex-col items-center z-40">
        <div
          className="hero-social-rail flex flex-col items-center gap-3.5"
        >
          {/* Top Futuristic Laser Line with Traveling Light Pulse */}
          <div className="flex flex-col items-center gap-1.5">
            <span className={`text-[8px] font-mono-tech tracking-widest uppercase select-none ${isDarkMode ? "text-cyan-400/60" : "text-blue-500/70"}`}>
              SYS.01
            </span>
            <div
              className={`w-[2px] h-14 rounded-full laser-rail ${isDarkMode
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
              className={`font-mono-tech text-[9.5px] font-extrabold tracking-[0.3em] uppercase transition-all duration-300 ${isDarkMode
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
              className={`w-[2px] h-6 rounded-full ${isDarkMode
                  ? "bg-gradient-to-b from-cyan-400/80 via-indigo-500/50 to-transparent"
                  : "bg-gradient-to-b from-blue-500/80 via-indigo-400/40 to-transparent"
                }`}
            />
          </div>

          {/* Futuristic Cyber Action Nodes with Corner Brackets & Holographic Glow */}
          <div className="flex flex-col items-center gap-3.5">
            {socialLinks.map((item, idx) => (
              <div key={idx} className="relative group flex items-center">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className={`w-11 h-11 rounded-xl border backdrop-blur-xl flex items-center justify-center transition-all duration-300 cursor-pointer select-none relative overflow-hidden ${isDarkMode
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
                </a>

                {/* Futuristic HUD Glass Tooltip (Slides Out Smoothly to Right on Hover) */}
                <div className="absolute left-full ml-4 pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-250 ease-out z-50">
                  <div
                    className={`px-3.5 py-2.5 rounded-xl border backdrop-blur-2xl shadow-2xl flex items-center gap-3 whitespace-nowrap relative ${isDarkMode
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
              className={`w-[2px] h-14 rounded-full laser-rail ${isDarkMode
                  ? "bg-slate-800/90 shadow-[0_0_8px_rgba(56,189,248,0.2)]"
                  : "bg-slate-300/90 shadow-[0_0_6px_rgba(2,132,199,0.2)]"
                }`}
            />
            <span className={`text-[8px] font-mono-tech tracking-widest uppercase select-none ${isDarkMode ? "text-cyan-400/60" : "text-blue-500/70"}`}>
              COMMS
            </span>
          </div>
        </div>
      </aside>

      {/* MAIN HERO LAYOUT */}
      <div className="w-full max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-start xl:pl-14">
        {/* LEFT COLUMN — Content Stack */}
        <div className="hero-content-col lg:col-span-7 flex flex-col items-start text-left">
          {/* 01 — SOFTWARE DEVELOPER label */}
          <div className="hero-tag flex items-center gap-3 mb-5 sm:mb-8 lg:mb-10">
            <span className="font-mono-tech text-xs font-semibold tracking-widest text-blue-500">01</span>
            <div className={`w-6 sm:w-8 h-px ${isDarkMode ? "bg-slate-600" : "bg-slate-300"}`} />
            <span
              className={`font-grotesk text-xs sm:text-[13px] font-bold tracking-widest uppercase ${isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}
            >
              SOFTWARE DEVELOPER
            </span>
            <div className={`w-6 sm:w-8 h-px ${isDarkMode ? "bg-slate-600" : "bg-slate-300"}`} />
          </div>

          {/* "Hey, I'm" */}
          <p
            className={`hero-hey font-display text-xl sm:text-3xl lg:text-[2.1rem] font-medium mb-1 ${isDarkMode ? "text-slate-200" : "text-slate-700"
              }`}
          >
            Hey, I'm
          </p>

          {/* ── "Aniket" — Split into individual letters for scroll scatter ── */}
          <div
            className="hero-name origin-left mb-1 relative inline-block max-w-full"
          >
            <span
              className="font-cursive text-5xl xs:text-6xl sm:text-8xl lg:text-[7rem] xl:text-[7.5rem] font-bold leading-[1.15] cursor-default inline-flex pr-2"
              style={{ transform: "rotate(-2deg)" }}
              aria-label="Aniket"
            >
              {"Aniket".split("").map((char, i) => (
                <span
                  key={i}
                  className={`aniket-letter inline-block will-change-transform bg-gradient-to-r bg-clip-text text-transparent ${isDarkMode
                      ? "from-blue-400 via-indigo-400 to-blue-500 drop-shadow-[0_4px_24px_rgba(59,130,246,0.3)]"
                      : "from-blue-600 via-indigo-600 to-blue-700 drop-shadow-[0_2px_8px_rgba(59,130,246,0.15)]"
                    }`}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </span>
              ))}
            </span>

            {/* Signature swoosh anchored directly under Aniket */}
            <div className="hero-swoosh absolute -bottom-2 sm:-bottom-3 left-1 w-36 xs:w-48 sm:w-60 pointer-events-none z-10">

              <svg width="100%" height="30" viewBox="0 0 200 30" fill="none" className="overflow-visible">
                <path
                  className="hero-swoosh-path"
                  d="M 0 20 Q 40 5, 80 15 T 160 10 Q 180 9, 195 12"
                  stroke="url(#heroSwooshGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
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
          </div>

          {/* ── "GAVALI" — Split into individual letters for scroll scatter ── */}
          <div className="hero-gavali flex items-center gap-3 sm:gap-4 mt-1 mb-5 sm:mb-8 lg:mb-9">
            <div className="overflow-hidden">
              <span
                className={`font-grotesk text-lg sm:text-2xl lg:text-[1.65rem] font-bold tracking-[0.35em] uppercase inline-flex ${isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                aria-label="GAVALI"
              >
                {"GAVALI".split("").map((char, i) => (
                  <span
                    key={i}
                    className="gavali-letter inline-block will-change-transform"
                    style={{ display: "inline-block" }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </div>
            <div
              className="hero-accent-line h-[2.5px] w-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
            />
          </div>

          {/* ── MAIN HEADLINE (Masked Line-by-Line Rise) ── */}
          <div className="hero-headline mb-5 sm:mb-7">
            <h1 className="font-display font-extrabold uppercase leading-tight tracking-tight">
              <div className="overflow-hidden">
                <span className={`hero-headline-line block text-3xl sm:text-4xl lg:text-[2.7rem] ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  I BUILD
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="hero-headline-line block text-3xl sm:text-4xl lg:text-[2.7rem] bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 bg-clip-text text-transparent">
                  DIGITAL
                </span>
              </div>
              <div className="overflow-hidden">
                <span className={`hero-headline-line block text-3xl sm:text-4xl lg:text-[2.7rem] ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  EXPERIENCES
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="hero-headline-line block text-3xl sm:text-4xl lg:text-[2.7rem]">
                  <span className={isDarkMode ? "text-white" : "text-slate-900"}>FOR THE WEB</span>
                  <span className="text-blue-500">.</span>
                </span>
              </div>
            </h1>
          </div>

          {/* ── DESCRIPTION with vertical accent ── */}
          <div className="hero-desc mb-6 sm:mb-8 lg:mb-9 max-w-md flex items-stretch gap-3.5">
            <div className="w-[3px] bg-gradient-to-b from-blue-500 via-indigo-500 to-blue-600 rounded-full flex-shrink-0" />
            <p className={`font-sans-body text-sm sm:text-base leading-relaxed font-medium ${isDarkMode ? "text-slate-200" : "text-slate-700"}`}>
              Full-stack developer focused on clean interfaces, thoughtful interactions, and reliable web applications.
            </p>
          </div>

          {/* ── CTAs — editorial text links ── */}
          <div className="hero-ctas flex flex-wrap items-center gap-6 sm:gap-10 mb-8 sm:mb-10">
            {/* EXPLORE WORK ↗ */}
            <button
              onClick={() => scrollToSection("work")}
              className="hero-cta-btn group relative inline-flex flex-col items-start cursor-pointer py-1"
            >
              <div
                className={`flex items-center gap-2.5 font-grotesk font-bold text-xs sm:text-[13px] tracking-[0.22em] uppercase transition-colors duration-300 ${isDarkMode ? "text-white group-hover:text-blue-400" : "text-slate-900 group-hover:text-blue-600"
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
            </button>

            {/* RESUME → */}
            <a
              href={Resume}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-btn group relative inline-flex flex-col items-start cursor-pointer py-1"
            >
              <div
                className={`flex items-center gap-2.5 font-grotesk font-bold text-xs sm:text-[13px] tracking-[0.22em] uppercase transition-colors duration-300 ${isDarkMode ? "text-slate-300 group-hover:text-indigo-400" : "text-slate-600 group-hover:text-indigo-600"
                  }`}
              >
                <span>RESUME</span>
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className={`transition-transform duration-300 group-hover:translate-x-1.5 ${isDarkMode ? "text-slate-500 group-hover:text-indigo-400" : "text-slate-400 group-hover:text-indigo-600"
                    }`}
                />
              </div>
              <div
                className={`w-full h-[1.5px] mt-2 transition-all duration-300 ${isDarkMode
                    ? "bg-slate-600 group-hover:bg-indigo-400 group-hover:h-[2px] group-hover:shadow-[0_0_10px_rgba(99,102,241,0.6)]"
                    : "bg-slate-300 group-hover:bg-indigo-500 group-hover:h-[2px] group-hover:shadow-[0_0_10px_rgba(99,102,241,0.6)]"
                  }`}
              />
            </a>
          </div>

          {/* Mobile Social Bar Pill */}
          <div className="hero-mobile-social flex xl:hidden items-center gap-3 pt-1 mb-4">
            <div
              className={`flex items-center gap-3 p-2 px-4 rounded-full border backdrop-blur-md ${isDarkMode ? "bg-slate-900/90 border-slate-700/80 shadow-md" : "bg-white border-slate-200 shadow-md"
                }`}
            >
              <span
                className={`font-mono-tech text-xs font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-300" : "text-slate-600"
                  }`}
              >
                Connect:
              </span>
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className={`p-1.5 rounded-full transition-colors ${isDarkMode ? "text-blue-400 hover:text-white" : "text-blue-600 hover:text-slate-950"
                    }`}
                >
                  <item.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Decorative Code Snippet & Grid */}
        <div
          className="hero-right-col lg:col-span-5 relative hidden lg:flex flex-col items-end justify-start min-h-[480px]"
        >
          {/* Dotted Grid */}
          <div
            className="hero-dot-grid absolute right-8 top-[140px]"
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
                <circle
                  key={d.key}
                  cx={d.x + 3}
                  cy={d.y + 3}
                  r="1.5"
                  fill={isDarkMode ? "#475569" : "#cbd5e1"}
                  opacity={0.35}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

