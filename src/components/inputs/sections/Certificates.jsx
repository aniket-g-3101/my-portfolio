import { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import { CERTIFICATES } from "../../../utils/data";
import {
  Calendar,
  ExternalLink,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Maximize2,
  Building2,
  BadgeCheck,
  Play,
  Pause,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getAnimationConfig, getMotionPreferences } from "../../../lib/gsap/animationConfig";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Enriched Metadata Map for Real Project Certificates ── */
const CERT_METADATA = [
  { category: "AI & CLOUD", verify: "oracle.com/verify", id: "OCI-AI-2025-0921", org: "Oracle University" },
  { category: "FOUNDATIONAL", verify: "aws.amazon.com/verify", id: "CLF-C02-EN-2025-0726", org: "Amazon Web Services" },
  { category: "DATA ANALYTICS", verify: "simplilearn.com/verify", id: "SIMPLI-DA-2025-0726", org: "Simplilearn | SkillUp" },
  { category: "MACHINE LEARNING", verify: "aws.amazon.com/verify", id: "MLA-C01-EN-2025", org: "Amazon Web Services" },
  { category: "DATA VISUALIZATION", verify: "theforage.com/verify", id: "TATA-DV-2025-0923", org: "Tata Group | Forage" },
  { category: "FULL-STACK", verify: "edureka.co", id: "EDUR-FS-2025-0726", org: "Edureka" },
  { category: "MACHINE LEARNING", verify: "aws.amazon.com/verify", id: "AWS-ML-2025-0726", org: "Amazon Web Services" },
  { category: "FRONTEND", verify: "hackerrank.com/certificates", id: "HR-CSS-2024-0926", org: "HackerRank" },
  { category: "SOFTWARE ENGINEERING", verify: "hackerrank.com/certificates", id: "HR-SWE-2025-0727", org: "HackerRank" },
  { category: "MANAGEMENT", verify: "life-global.org", id: "HP-AGILE-2025-0726", org: "HP LIFE Foundation" },
  { category: "LEADERSHIP", verify: "life-global.org", id: "HP-LEAD-2025-0726", org: "HP LIFE Foundation" },
  { category: "CORE JAVA", verify: "knowledgegate.in", id: "KG-JAVA-2025-0808", org: "Knowledge Gate" },
  { category: "GEN AI", verify: "freedomwithai.com", id: "FWAI-2025-0726", org: "Freedom With AI" },
  { category: "POWER BI & DATA", verify: "officemaster.in", id: "OM-PBI-2025-0727", org: "OfficeMaster" },
  { category: "AI PRODUCTIVITY", verify: "be10x.in", id: "BE10X-2025-0727", org: "Be10x Innovation" },
  { category: "GENERATIVE AI", verify: "simplilearn.com", id: "SIMPLI-GENAI-2025", org: "Simplilearn | SkillUp" },
  { category: "REACT.JS", verify: "skyskill.in", id: "SKY-REACT-2025-0730", org: "Sky Skill" },
  { category: "INTERNSHIP", verify: "unifiedmentor.com", id: "UM-INT-2025-0905", org: "Unified Mentor Pvt Ltd" },
  { category: "JOB SIMULATION", verify: "theforage.com/deloitte", id: "DEL-DA-2025-1115", org: "Deloitte" },
  { category: "PROFESSIONAL SKILLS", verify: "tcs.com", id: "TCS-COMM-2025-1217", org: "TCS | NextStep" },
  { category: "CAREER SKILLS", verify: "tcs.com", id: "TCS-INT-2025-1217", org: "TCS | NextStep" },
  { category: "CAREER SKILLS", verify: "tcs.com", id: "TCS-RES-2025-1217", org: "TCS | NextStep" },
];

const EASE = [0.16, 1, 0.3, 1];

export default function Certificates() {
  const { isDarkMode } = useTheme();

  /* State */
  const [activeIdx, setActiveIdx] = useState(1); // default to AWS
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [fullscreenCert, setFullscreenCert] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isInView, setIsInView] = useState(false);

  const sectionRef = useRef(null);
  const listContainerRef = useRef(null);

  // Preload all certificate WebP images into browser memory on mount
  useEffect(() => {
    CERTIFICATES.forEach((cert) => {
      if (cert.image) {
        const img = new Image();
        img.src = cert.image;
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

  /* Auto-Cycle Through Certificates (3.5s interval) - only active when section is in view */
  useEffect(() => {
    if (!isAutoPlay || !isInView) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % CERTIFICATES.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isAutoPlay, isInView]);

  /* Smoothly keep active item visible ONLY inside the list container without hijacking page scroll */
  useEffect(() => {
    const container = listContainerRef.current;
    const activeEl = document.getElementById(`cert-item-${activeIdx}`);
    if (!container || !activeEl) return;

    const containerRect = container.getBoundingClientRect();
    const elRect = activeEl.getBoundingClientRect();

    // Determine if container is laid out horizontally (mobile) or vertically (desktop)
    const isHorizontal = container.scrollWidth > container.clientWidth && container.clientHeight < 250;

    if (isHorizontal) {
      // Horizontal mode (mobile): center the item within the horizontal scroll container
      const deltaX = (elRect.left + elRect.width / 2) - (containerRect.left + containerRect.width / 2);
      container.scrollTo({
        left: container.scrollLeft + deltaX,
        behavior: "smooth",
      });
    } else {
      // Vertical mode (desktop): keep item within visible vertical bounds of the container
      if (elRect.top < containerRect.top) {
        container.scrollTo({
          top: container.scrollTop + (elRect.top - containerRect.top) - 12,
          behavior: "smooth",
        });
      } else if (elRect.bottom > containerRect.bottom) {
        container.scrollTo({
          top: container.scrollTop + (elRect.bottom - containerRect.bottom) + 12,
          behavior: "smooth",
        });
      }
    }
  }, [activeIdx]);

  /* Current Active Certificate Data */
  const activeCert = useMemo(() => {
    const raw = CERTIFICATES[activeIdx] || CERTIFICATES[0];
    const meta = CERT_METADATA[activeIdx] || CERT_METADATA[0];
    return {
      ...raw,
      ...meta,
      indexNum: String(activeIdx + 1).padStart(2, "0"),
    };
  }, [activeIdx]);

  /* Keyboard ESC handler for fullscreen modal */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setFullscreenCert(null);
        setZoomLevel(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  /* Lock background scroll & hide floating navbar when modal is active */
  useEffect(() => {
    if (fullscreenCert) {
      document.body.classList.add("has-cert-modal-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("has-cert-modal-open");
      document.body.style.overflow = "";
    }
    return () => {
      document.body.classList.remove("has-cert-modal-open");
      document.body.style.overflow = "";
    };
  }, [fullscreenCert]);

  /* ── Master GSAP Certificates Card Stack Reveal ── */
  /* ── Master GSAP Certificates 3D Dimensional Card Cascade ── */
  useGSAP(
    () => {
      const { isReducedMotion, isMobile } = getMotionPreferences();
      const config = getAnimationConfig();

      if (isReducedMotion) {
        gsap.set(
          [
            ".cert-header-tag",
            ".cert-title-block",
            ".cert-list-group",
            ".cert-list-item",
            ".cert-showcase-card",
          ],
          { opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1, filter: "blur(0px)", clearProps: "all" }
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: {
          ease: config.easing.entrance,
        },
      });

      // 1. Header tag — lateral curtain wipe from the right edge
      tl.fromTo(
        ".cert-header-tag",
        { clipPath: "inset(0 100% 0 0)", opacity: 0.4 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: config.duration.short, ease: "power2.out" }
      )
        // 2. Title block — soft masked rise with depth blur settle
        .fromTo(
          ".cert-title-block",
          { clipPath: "inset(100% 0 0 0)", y: 14, filter: isMobile ? "none" : "blur(6px)" },
          { clipPath: "inset(0% 0 0 0)", y: 0, filter: "blur(0px)", duration: config.duration.medium, ease: "power3.out" },
          "-=0.12"
        )
        // 3. Left list column — lateral curtain slide
        .fromTo(
          ".cert-list-group",
          { clipPath: "inset(0 100% 0 0)", x: isMobile ? 0 : -20, opacity: 0 },
          { clipPath: "inset(0 0% 0 0)", x: 0, opacity: 1, duration: config.duration.section, ease: "power3.out" },
          "-=0.15"
        )
        // 4. Certificate cards — cascading rise with soft depth blur
        .fromTo(
          ".cert-list-item",
          { opacity: 0, x: isMobile ? 0 : -16, y: isMobile ? 12 : 22, filter: isMobile ? "none" : "blur(5px)" },
          {
            opacity: 1,
            x: 0,
            y: 0,
            filter: "blur(0px)",
            duration: config.duration.medium,
            stagger: isMobile ? 0.03 : 0.05,
            ease: "power3.out",
          },
          "-=0.35"
        )
        // 5. Showcase card — flips in from the right with perspective depth
        .fromTo(
          ".cert-showcase-card",
          {
            y: isMobile ? 20 : 34,
            scale: isMobile ? 0.98 : 0.94,
            rotateY: isMobile ? 0 : 9,
            transformPerspective: 1100,
            transformOrigin: "left center",
            opacity: 0,
            filter: isMobile ? "none" : "blur(5px)",
          },
          {
            y: 0,
            scale: 1,
            rotateY: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: config.duration.section,
            ease: config.easing.cinematic,
          },
          "-=0.4"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className={`relative pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500 overflow-hidden ${
        isDarkMode ? "text-white" : "text-slate-900"
      }`}
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
        <div className="cert-header-tag flex items-center justify-between border-b border-slate-700/30 dark:border-slate-800/80 pb-3">
          {/* Left Tag */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-widest text-blue-500">04</span>
            <div className={`w-6 sm:w-8 h-px ${isDarkMode ? "bg-slate-600" : "bg-slate-300"}`} />
            <span
              className={`text-xs sm:text-sm font-bold tracking-widest uppercase ${
                isDarkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              CERTIFICATIONS & CREDENTIALS
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
        <div className="cert-title-block text-left space-y-1">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight italic uppercase">
            <span className={isDarkMode ? "text-white" : "text-slate-900"}>Proof of </span>
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Growth.
            </span>
          </h2>
          <p
            className={`italic font-medium text-xs sm:text-sm md:text-[15px] max-w-xl leading-relaxed ${
              isDarkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            &ldquo;Milestones that represent my commitment to learning, building and growing every day.&rdquo;
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════
            RESPONSIVE LAYOUT:
            [MOBILE: HORIZONTAL SCROLL LIST ON TOP -> PREVIEW BOX BELOW]
            [DESKTOP: 2-COLUMN SPLIT (VERTICAL LIST LEFT | PREVIEW BOX RIGHT)]
            ══════════════════════════════════════════════════════════ */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 lg:gap-8 items-stretch pt-1">

          {/* ── CERTIFICATES LIST: HORIZONTAL ON MOBILE, VERTICAL ON DESKTOP ── */}
          <div className="cert-list-group w-full lg:col-span-5 flex flex-col space-y-2">
            <div className="flex items-center justify-between pb-0.5">
              <span className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                VERIFIED CREDENTIALS ({CERTIFICATES.length})
              </span>
              <span className={`text-xs font-semibold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                {String(activeIdx + 1).padStart(2, "0")} / {CERTIFICATES.length}
              </span>
            </div>

            {/* Scrollable list: flex-row overflow-x-auto on mobile, flex-col overflow-y-auto on lg: */}
            <div
              ref={listContainerRef}
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-hidden lg:overflow-y-auto space-x-2.5 lg:space-x-0 lg:space-y-2 pb-2 lg:pb-0 pr-0 lg:pr-2 h-auto lg:h-[420px] lg:sm:h-[435px] custom-scrollbar overscroll-contain snap-x touch-pan-x lg:touch-pan-y"
            >
              {CERTIFICATES.map((cert, idx) => {
                const isSelected = activeIdx === idx;
                const meta = CERT_METADATA[idx] || CERT_METADATA[0];
                const numStr = String(idx + 1).padStart(2, "0");

                return (
                  <motion.div
                    id={`cert-item-${idx}`}
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveIdx(idx);
                      setIsAutoPlay(false); // pause on manual interaction
                    }}
                    className={`cert-list-item min-w-[240px] max-w-[260px] sm:min-w-[270px] lg:min-w-0 lg:max-w-none flex-shrink-0 snap-start p-3 rounded-2xl border flex items-start gap-3 transition-all duration-200 cursor-pointer select-none text-left ${
                      isSelected
                        ? isDarkMode
                          ? "bg-slate-900/95 border-indigo-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.35)] ring-1.5 ring-indigo-400/40"
                          : "bg-white border-blue-500 text-slate-950 shadow-[0_0_20px_rgba(59,130,246,0.25)] ring-1.5 ring-blue-500/30"
                        : isDarkMode
                        ? "bg-slate-950/40 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:text-white hover:bg-slate-900/40"
                        : "bg-white/70 border-slate-200 text-slate-800 hover:border-slate-300 hover:text-slate-950 hover:bg-slate-50"
                    }`}
                  >
                    {/* Small Vertical Accent Line */}
                    <div
                      className={`w-[3px] h-7 rounded-full flex-shrink-0 mt-0.5 transition-colors duration-200 ${
                        isSelected
                          ? "bg-gradient-to-b from-blue-400 to-indigo-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                          : isDarkMode
                          ? "bg-blue-500/50"
                          : "bg-blue-600"
                      }`}
                    />

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold opacity-75">
                          {numStr}
                        </span>
                        <span className={`text-xs font-bold uppercase truncate max-w-[130px] ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                          {cert.issuer}
                        </span>
                      </div>

                      <h4 className={`italic font-medium text-xs sm:text-[13.5px] line-clamp-1 leading-snug ${
                        isSelected
                          ? isDarkMode ? "text-white" : "text-slate-950"
                          : isDarkMode ? "text-slate-200" : "text-slate-800"
                      }`}>
                        {cert.title}
                      </h4>

                      <div className={`flex items-center justify-between pt-0.5 text-[11px] ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                        <span className="truncate font-medium">{meta.category}</span>
                        <span className="truncate">{cert.year}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT COLUMN: INFO BOX (BELOW LIST ON MOBILE, RIGHT ON DESKTOP) ── */}
          <div className="cert-showcase-card w-full lg:col-span-7 flex flex-col h-auto min-h-[380px] lg:h-[420px] lg:sm:h-[435px]">
            <div
              className={`p-4 sm:p-8 rounded-3xl border backdrop-blur-md transition-all duration-300 shadow-lg flex flex-col justify-between h-full ${
                isDarkMode
                  ? "bg-transparent border-slate-800/80 text-slate-100"
                  : "bg-transparent border-slate-200/80 text-slate-900"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCert.title}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="flex flex-col justify-between h-full space-y-3"
                >
                  {/* Top Bar: Issuer, Title, Category Badge */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`}>
                          {activeCert.issuer}
                        </span>
                        <span className="text-slate-400 text-xs sm:text-sm">•</span>
                        <span className={`inline-block px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider ${
                          isDarkMode
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}>
                          {activeCert.category}
                        </span>
                      </div>
                      <span className={`text-xs sm:text-sm font-bold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                        {activeCert.indexNum} / {CERTIFICATES.length}
                      </span>
                    </div>

                    <h3 className={`text-base sm:text-lg md:text-xl font-medium italic tracking-normal leading-snug line-clamp-2 ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                      {activeCert.title}
                    </h3>
                  </div>

                  {/* Middle Content: Certificate Image Preview & Metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 md:gap-5 items-center flex-1">
                    {/* Real Certificate Image Container */}
                    <div className="sm:col-span-6 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setFullscreenCert(activeCert)}
                        className="group relative rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl bg-slate-950 cursor-pointer w-full aspect-[16/10] max-h-[160px] sm:max-h-[190px] flex items-center justify-center"
                      >
                        <img
                          src={activeCert.image}
                          alt={activeCert.title}
                          loading="eager"
                          decoding="async"
                          className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105 p-1"
                        />
                        {/* Hover Overlay Hint */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center p-2.5">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md flex items-center gap-1.5">
                            <Maximize2 size={12} />
                            <span>PREVIEW</span>
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Metadata Table */}
                    <div className="sm:col-span-6 space-y-2 sm:space-y-2.5 text-left">
                      {/* Issued */}
                      <div className="flex items-start gap-2.5">
                        <Calendar size={15} className={`flex-shrink-0 mt-0.5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                        <div>
                          <span className={`text-[10.5px] sm:text-xs font-bold block uppercase leading-tight ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                            Issued Date
                          </span>
                          <span className={`font-semibold text-xs sm:text-[13.5px] md:text-sm ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>
                            {activeCert.year}
                          </span>
                        </div>
                      </div>

                      {/* Organization */}
                      <div className="flex items-start gap-2.5">
                        <Building2 size={15} className={`flex-shrink-0 mt-0.5 ${isDarkMode ? "text-indigo-400" : "text-indigo-600"}`} />
                        <div>
                          <span className={`text-[10.5px] sm:text-xs font-bold block uppercase leading-tight ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                            Organization
                          </span>
                          <span className={`font-semibold text-xs sm:text-[13.5px] md:text-sm ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>
                            {activeCert.org || activeCert.issuer}
                          </span>
                        </div>
                      </div>

                      {/* Credential ID */}
                      {activeCert.id && (
                        <div className="flex items-start gap-2.5">
                          <BadgeCheck size={15} className={`flex-shrink-0 mt-0.5 ${isDarkMode ? "text-teal-400" : "text-teal-600"}`} />
                          <div>
                            <span className={`text-[10.5px] sm:text-xs font-bold block uppercase leading-tight ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                              Credential ID
                            </span>
                            <span className={`text-xs sm:text-[13.5px] font-semibold ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>
                              {activeCert.id}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Verification Link */}
                      <div className="flex items-start gap-2.5">
                        <ShieldCheck size={15} className={`flex-shrink-0 mt-0.5 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                        <div>
                          <span className={`text-[10.5px] sm:text-xs font-bold block uppercase leading-tight ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                            Verification
                          </span>
                          <span className={`text-xs sm:text-[13.5px] font-semibold truncate block max-w-[170px] ${
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          }`}>
                            {activeCert.verify}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* View Credential CTA Button */}
                  <div className="pt-1">
                    <button
                      onClick={() => setFullscreenCert(activeCert)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.01] transition-all cursor-pointer"
                    >
                      <span>VIEW FULL RESOLUTION</span>
                      <ExternalLink size={14} />
                    </button>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>

      {/* ══════════════════════════════════════════════════════════
          FULLSCREEN PREMIUM CERTIFICATE VIEWER MODAL (PORTALED TO BODY TO HIDE NAVBAR)
          ══════════════════════════════════════════════════════════ */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {fullscreenCert && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setFullscreenCert(null);
                  setZoomLevel(1);
                }}
                className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6"
                style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
              >
                <motion.div
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  transition={{ duration: 0.22, ease: EASE }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-4xl w-full max-h-[92vh] bg-slate-950 border border-slate-800 rounded-3xl p-4 sm:p-6 flex flex-col items-center justify-between shadow-2xl overflow-hidden"
                >
                  {/* Modal Top Header */}
                  <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="text-left space-y-0.5">
                      <span className="font-mono-tech text-[10px] font-bold text-blue-400 uppercase">
                        {fullscreenCert.issuer}
                      </span>
                      <h3 className="font-display text-sm sm:text-base font-bold text-white truncate max-w-md">
                        {fullscreenCert.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5))}
                        title="Zoom In"
                        className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 cursor-pointer"
                      >
                        <ZoomIn size={16} />
                      </button>
                      <button
                        onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75))}
                        title="Zoom Out"
                        className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 cursor-pointer"
                      >
                        <ZoomOut size={16} />
                      </button>
                      <button
                        onClick={() => setZoomLevel(1)}
                        title="Reset Zoom"
                        className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 cursor-pointer"
                      >
                        <RotateCcw size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setFullscreenCert(null);
                          setZoomLevel(1);
                        }}
                        title="Close"
                        className="p-2 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/40 cursor-pointer ml-2"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Certificate Image Frame */}
                  <div className="w-full flex-1 flex items-center justify-center overflow-auto p-3 max-h-[72vh]">
                    <img
                      src={fullscreenCert.image}
                      alt={fullscreenCert.title}
                      style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.2s ease-out" }}
                      className="max-h-[62vh] max-w-full object-contain rounded-xl shadow-2xl"
                    />
                  </div>

                  {/* Modal Bottom Footer */}
                  <div className="w-full flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-mono-tech text-slate-400">
                    <span>Verified: {fullscreenCert.year}</span>
                    <span>Press ESC or click outside to close</span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
