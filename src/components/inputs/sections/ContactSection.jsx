import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Check,
  ExternalLink,
  Copy,
  MousePointerClick,
} from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getAnimationConfig, getMotionPreferences } from "../../../lib/gsap/animationConfig";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Topic Template Chips
const INTENT_CHIPS = [
  {
    id: "hiring",
    label: "Hiring / Job Offer",
    template: "Hi Aniket,\n\nI came across your portfolio and would like to discuss a job opportunity at our company regarding...",
  },
  {
    id: "freelance",
    label: "Freelance Project",
    template: "Hi Aniket,\n\nI have a web application project and would like to inquire about your availability and estimated timeline for...",
  },
  {
    id: "collab",
    label: "Tech Collaboration",
    template: "Hi Aniket,\n\nI saw your work on GitHub/Portfolio and would love to collaborate with you on...",
  },
  {
    id: "general",
    label: "General Inquiry",
    template: "Hi Aniket,\n\nI'd like to get in touch regarding...",
  },
];

export default function ContactSection() {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSentSuccess, setIsSentSuccess] = useState(false);
  const [activeChip, setActiveChip] = useState(null);
  const [copiedNotification, setCopiedNotification] = useState("");
  const [hoveredNode, setHoveredNode] = useState(null);

  // Copy helper with visual notification banner
  const triggerCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedNotification(`Copied ${label} to clipboard!`);
      setTimeout(() => setCopiedNotification(""), 2500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Form Validation functions
  const validateName = (name) => {
    const trimmedName = name.trim();
    if (!trimmedName) return "Name is required";
    if (trimmedName.length < 2) return "Name must be at least 2 characters";
    if (trimmedName.length > 50) return "Name must be less than 50 characters";
    if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
      return "Name can only contain letters, spaces, hyphens & apostrophes";
    }
    return "";
  };

  const validateEmail = (email) => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) return "Please enter a valid email address";
    if (trimmedEmail.length > 254) return "Email is too long";
    const typos = {
      "gmial.com": "gmail.com",
      "gmai.com": "gmail.com",
      "yahooo.com": "yahoo.com",
      "outlok.com": "outlook.com",
    };
    const domain = trimmedEmail.split("@")[1]?.toLowerCase();
    if (typos[domain]) {
      return `Did you mean ${trimmedEmail.split("@")[0]}@${typos[domain]}?`;
    }
    return "";
  };

  const validateMessage = (message) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return "Message is required";
    if (trimmedMessage.length < 2) return "Message must be at least 2 characters";
    if (trimmedMessage.length > 1000) return "Message must be less than 1000 characters";
    const spamPatterns = [
      /\b(viagra|cialis|lottery|winner|claim.*prize)\b/i,
    ];
    for (const pattern of spamPatterns) {
      if (pattern.test(trimmedMessage)) {
        return "Message contains suspicious content";
      }
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      let error = "";
      if (name === "name") error = validateName(value);
      if (name === "email") error = validateEmail(value);
      if (name === "message") error = validateMessage(value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    let error = "";
    if (name === "name") error = validateName(value);
    if (name === "email") error = validateEmail(value);
    if (name === "message") error = validateMessage(value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSelectChip = (chip) => {
    setActiveChip(chip.id);
    setFormData((prev) => ({
      ...prev,
      message: chip.template,
    }));
    if (touched.message) {
      setErrors((prev) => ({ ...prev, message: validateMessage(chip.template) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    setTouched({ name: true, email: true, message: true });

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const messageError = validateMessage(formData.message);

    setErrors({
      name: nameError,
      email: emailError,
      message: messageError,
    });

    if (nameError || emailError || messageError) {
      setStatus({
        type: "error",
        message: "Please fix the errors before submitting.",
      });
      setIsSubmitting(false);
      return;
    }

    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      message: formData.message.trim(),
    };

    const lastSubmitTime = localStorage.getItem("lastContactSubmit");
    if (lastSubmitTime) {
      const timeDiff = Date.now() - parseInt(lastSubmitTime, 10);
      if (timeDiff < 60000) {
        setStatus({
          type: "error",
          message: "Please wait a minute before sending another message.",
        });
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const result = await emailjs.send(
        "service_ga4b2wb",
        "template_pfo59z3",
        {
          from_name: trimmedData.name,
          from_email: trimmedData.email,
          message: trimmedData.message,
          time: new Date().toLocaleString(),
          to_name: "Aniket Gavali",
        },
        "1lpiSwcZmp-fi2-c4"
      );

      if (result.text === "OK") {
        setIsSentSuccess(true);
        setStatus({
          type: "success",
          message: "Message delivered successfully! I will reply shortly.",
        });
        setFormData({ name: "", email: "", message: "" });
        setErrors({ name: "", email: "", message: "" });
        setTouched({ name: false, email: false, message: false });
        setActiveChip(null);
        localStorage.setItem("lastContactSubmit", Date.now().toString());

        setTimeout(() => {
          setIsSentSuccess(false);
        }, 5000);
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to send message. Please email me directly at aniket.g.dev@gmail.com",
      });
      console.error("EmailJS Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── Master GSAP Contact Section Entrance (Orbital Elastic Snap & 3D Form Reveal) ── */
  useGSAP(
    () => {
      const { isReducedMotion, isMobile } = getMotionPreferences();
      const config = getAnimationConfig();

      if (isReducedMotion) {
        gsap.set(
          [
            ".contact-header-tag",
            ".contact-title-block",
            ".contact-form-col",
            ".contact-info-col",
            ".contact-center-sphere",
            ".contact-orbital-pill",
          ],
          { opacity: 1, y: 0, x: 0, scale: 1, rotateX: 0, clearProps: "all" }
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

      // 1. Header tag lateral slide + Title focus settle
      tl.fromTo(
        ".contact-header-tag",
        { xPercent: isMobile ? -5 : -3, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: config.duration.short, ease: "power2.out" }
      )
        .fromTo(
          ".contact-title-block",
          { scale: isMobile ? 0.98 : 0.95, opacity: 0 },
          { scale: 1, opacity: 1, duration: config.duration.medium, ease: "power3.out" },
          "-=0.1"
        )
        // 2. Left Form Column: 3D perspective pitch entrance
        .fromTo(
          ".contact-form-col",
          {
            xPercent: isMobile ? 0 : -6,
            y: isMobile ? 20 : 35,
            rotateX: isMobile ? 0 : 5,
            transformPerspective: 1200,
            opacity: 0,
          },
          {
            xPercent: 0,
            y: 0,
            rotateX: 0,
            opacity: 1,
            duration: config.duration.section,
            ease: "power3.out",
          },
          "-=0.2"
        )
        // 3. Right Orbital Container emerges
        .fromTo(
          ".contact-info-col",
          { xPercent: isMobile ? 0 : 6, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: config.duration.section, ease: "power3.out" },
          "-=0.3"
        )
        // 4. Center 3D Glass Sphere expands with high-inertia elastic snap
        .fromTo(
          ".contact-center-sphere",
          { scale: 0.3, filter: "blur(6px)", opacity: 0, transformOrigin: "50% 50%" },
          { scale: 1, filter: "blur(0px)", opacity: 1, duration: config.duration.medium, ease: "back.out(1.5)" },
          "-=0.4"
        )
        // 5. 5 Orbital Capsule Pills stagger pop into orbit
        .fromTo(
          ".contact-orbital-pill",
          { scale: 0.35, opacity: 0, transformOrigin: "50% 50%" },
          {
            scale: 1,
            opacity: 1,
            duration: config.duration.medium,
            stagger: isMobile ? 0.03 : 0.05,
            ease: "back.out(1.4)",
          },
          "-=0.3"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`relative pt-8 sm:pt-20 pb-12 sm:pb-24 px-3 sm:px-6 lg:px-8 transition-colors duration-500 overflow-hidden bg-transparent ${
        isDarkMode ? "text-white" : "text-slate-900"
      }`}
      style={{
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Ambient Soft Cyan Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute top-1/2 right-1/4 -translate-y-1/2 w-[750px] h-[750px] rounded-full blur-[180px] opacity-25 pointer-events-none ${
            isDarkMode ? "bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400" : "bg-gradient-to-r from-blue-200 via-sky-200 to-cyan-200"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full space-y-4 sm:space-y-6">
        {/* ── TOP HEADER DIVIDER ── */}
        <div className="contact-header-tag flex items-center gap-2.5 sm:gap-3 border-b border-slate-700/30 dark:border-slate-800/80 pb-2.5 sm:pb-3">
          <span className="text-[11px] sm:text-xs font-bold tracking-widest text-blue-500">06</span>
          <div className={`w-5 sm:w-8 h-px ${isDarkMode ? "bg-slate-600" : "bg-slate-300"}`} />
          <span
            className={`text-xs sm:text-sm font-bold tracking-widest uppercase ${
              isDarkMode ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Get In Touch
          </span>
          <div className={`w-5 sm:w-8 h-px ${isDarkMode ? "bg-slate-600" : "bg-slate-300"}`} />
        </div>

        {/* ── SECTION TITLE & SUBTITLE ── */}
        <div className="contact-title-block text-left space-y-1">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight italic uppercase">
            <span className={isDarkMode ? "text-white" : "text-slate-900"}>Let's Build Something </span>
            <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
              Extraordinary.
            </span>
          </h2>
          <p
            className={`italic font-medium text-xs sm:text-sm md:text-[15px] max-w-xl leading-relaxed ${
              isDarkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            &ldquo;Open to work opportunities, freelance builds, and tech collaborations. Let's connect!&rdquo;
          </p>
        </div>

        {/* Copy Notification Toast Banner */}
        <AnimatePresence>
          {copiedNotification && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-6 right-6 z-50 px-4 py-2.5 rounded-full bg-blue-600 text-white font-mono text-xs font-bold shadow-2xl flex items-center gap-2 border border-blue-400/50"
            >
              <Check size={14} />
              <span>{copiedNotification}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════════════════════
            RESPONSIVE 2-COLUMN LAYOUT:
            [FORM LEFT (5 COLS) | COMPACT MOBILE-OPTIMIZED HUB V2 (7 COLS)]
            ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center pt-1 sm:pt-2">
          
          {/* ── LEFT COLUMN: TRANSPARENT FORM CARD ── */}
          <div className="contact-form-col lg:col-span-5 w-full max-w-xl mx-auto lg:max-w-none">
            <div
              className={`p-4 sm:p-7 rounded-2xl sm:rounded-3xl border backdrop-blur-xl transition-all duration-300 shadow-xl sm:shadow-2xl space-y-3.5 sm:space-y-5 ${
                isDarkMode
                  ? "bg-transparent border-slate-800/80 text-slate-100 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
                  : "bg-transparent border-slate-200/80 text-slate-900 shadow-xl"
              }`}
            >
              {/* Form Header & Topic Pills */}
              <div className="space-y-2.5 sm:space-y-3">
                <h3 className={`text-sm sm:text-lg font-extrabold italic tracking-tight ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                  Send A Direct Message
                </h3>

                {/* Topic Template Buttons */}
                <div className="space-y-1 sm:space-y-1.5">
                  <span className={`text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider block ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Topic Template:
                  </span>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {INTENT_CHIPS.map((chip) => {
                      const isSelected = activeChip === chip.id;
                      return (
                        <button
                          key={chip.id}
                          type="button"
                          onClick={() => handleSelectChip(chip)}
                          className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold not-italic border transition-all duration-200 cursor-pointer select-none flex items-center gap-1 sm:gap-1.5 backdrop-blur-md ${
                            isSelected
                              ? isDarkMode
                                ? "bg-blue-950/40 border-blue-400 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.3)] ring-1 ring-blue-400/40"
                                : "bg-blue-50 border-blue-500 text-blue-900 shadow-xs ring-1 ring-blue-500/30"
                              : isDarkMode
                              ? "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                              : "bg-white/60 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-950"
                          }`}
                        >
                          <span>{chip.label}</span>
                          {isSelected && <Check size={12} className="text-blue-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Form Input Controls */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Name Input */}
                <div className="space-y-1 sm:space-y-1.5">
                  <label htmlFor="name" className={`block text-xs sm:text-[13px] italic font-bold tracking-wide ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                    Your Name <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. John Doe"
                    maxLength={50}
                    className={`w-full px-3.5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl border text-xs sm:text-sm italic font-medium transition-all duration-200 outline-none backdrop-blur-md ${
                      errors.name && touched.name
                        ? isDarkMode
                          ? "bg-red-950/20 border-red-500 text-white placeholder-slate-500 ring-1 ring-red-500/50"
                          : "bg-red-50/80 border-red-400 text-slate-900 placeholder-slate-400 ring-1 ring-red-400/40"
                        : isDarkMode
                        ? "bg-slate-900/60 border-slate-700/80 text-white placeholder-slate-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/60"
                        : "bg-white/80 border-slate-300 text-slate-950 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 shadow-xs"
                    }`}
                  />
                  {errors.name && touched.name && (
                    <p className="text-xs font-bold text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle size={13} />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div className="space-y-1 sm:space-y-1.5">
                  <label htmlFor="email" className={`block text-xs sm:text-[13px] italic font-bold tracking-wide ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                    Email Address <span className="text-blue-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. john@example.com"
                    maxLength={254}
                    className={`w-full px-3.5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl border text-xs sm:text-sm italic font-medium transition-all duration-200 outline-none backdrop-blur-md ${
                      errors.email && touched.email
                        ? isDarkMode
                          ? "bg-red-950/20 border-red-500 text-white placeholder-slate-500 ring-1 ring-red-500/50"
                          : "bg-red-50/80 border-red-400 text-slate-900 placeholder-slate-400 ring-1 ring-red-400/40"
                        : isDarkMode
                        ? "bg-slate-900/60 border-slate-700/80 text-white placeholder-slate-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/60"
                        : "bg-white/80 border-slate-300 text-slate-950 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 shadow-xs"
                    }`}
                  />
                  {errors.email && touched.email && (
                    <p className="text-xs font-bold text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle size={13} />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Input */}
                <div className="space-y-1 sm:space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="message" className={`block text-xs sm:text-[13px] italic font-bold tracking-wide ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                      Your Message <span className="text-blue-500">*</span>
                    </label>
                    <span className={`text-[10px] sm:text-[11px] font-mono font-bold ${
                      formData.message.length > 1000 ? "text-red-400" : isDarkMode ? "text-slate-400" : "text-slate-500"
                    }`}>
                      {formData.message.length} / 1000
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows="3"
                    placeholder="Write your message here..."
                    maxLength={1000}
                    className={`w-full px-3.5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl border text-xs sm:text-sm italic font-medium transition-all duration-200 outline-none resize-none backdrop-blur-md ${
                      errors.message && touched.message
                        ? isDarkMode
                          ? "bg-red-950/20 border-red-500 text-white placeholder-slate-500 ring-1 ring-red-500/50"
                          : "bg-red-50/80 border-red-400 text-slate-900 placeholder-slate-400 ring-1 ring-red-400/40"
                        : isDarkMode
                        ? "bg-slate-900/60 border-slate-700/80 text-white placeholder-slate-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/60"
                        : "bg-white/80 border-slate-300 text-slate-950 placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 shadow-xs"
                    }`}
                  />
                  {errors.message && touched.message && (
                    <p className="text-xs font-bold text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle size={13} />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Send Message Button */}
                <div className="pt-1 sm:pt-2">
                  <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`group relative w-full py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-xl sm:rounded-2xl border backdrop-blur-md flex items-center justify-between font-extrabold italic text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer shadow-md ${
                      isSentSuccess
                        ? isDarkMode
                          ? "bg-emerald-950/40 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                          : "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs"
                        : isSubmitting
                        ? "bg-blue-600/30 border-blue-400 cursor-not-allowed"
                        : isDarkMode
                        ? "bg-blue-950/20 border-blue-500/60 text-white hover:border-blue-400 hover:bg-blue-900/30 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                        : "bg-blue-50/60 border-blue-400 text-blue-950 hover:border-blue-600 hover:bg-blue-100/60 shadow-xs"
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2 mx-auto">
                        <span className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                        <span className={isDarkMode ? "text-white" : "text-blue-900"}>Sending...</span>
                      </div>
                    ) : isSentSuccess ? (
                      <div className="flex items-center gap-2 mx-auto font-extrabold text-emerald-400">
                        <CheckCircle2 size={16} className="text-emerald-400" />
                        <span>Message Sent</span>
                      </div>
                    ) : (
                      <>
                        <span className={isDarkMode ? "text-white" : "text-blue-950"}>Send Message</span>
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">
                          <Send size={12} strokeWidth={2.5} className="text-blue-400" />
                        </div>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Status Alert Banner */}
                <AnimatePresence mode="wait">
                  {status.message && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className={`p-3 rounded-xl sm:rounded-2xl border flex items-center gap-2 text-xs sm:text-sm font-bold shadow-md ${
                        status.type === "success"
                          ? isDarkMode
                            ? "bg-emerald-950/80 border-emerald-500/70 text-emerald-300"
                            : "bg-emerald-50 border-emerald-400 text-emerald-900"
                          : isDarkMode
                          ? "bg-red-950/80 border-red-500/70 text-red-300"
                          : "bg-red-50 border-red-400 text-red-900"
                      }`}
                    >
                      {status.type === "success" ? (
                        <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                      ) : (
                        <XCircle size={16} className="text-red-400 flex-shrink-0" />
                      )}
                      <span>{status.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              RIGHT COLUMN: MOBILE-OPTIMIZED COMPACT ORBITAL HUB V2
              ══════════════════════════════════════════════════════════ */}
          <div className="contact-info-col lg:col-span-7 w-full flex flex-col items-center justify-center py-2 lg:py-0 space-y-4 sm:space-y-5">
            <div className="relative w-full max-w-[320px] sm:max-w-[500px] aspect-square flex items-center justify-center select-none">
              
              {/* ── HIGH-CONTRAST DOTTED ORBITAL RINGS & LASER CONNECTORS ── */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
                  <defs>
                    <radialGradient id="hubGlassGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor={isDarkMode ? "#38bdf8" : "#0284c7"} stopOpacity="0.4" />
                      <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Ambient Core Radial Glow */}
                  <circle cx="250" cy="250" r="140" fill="url(#hubGlassGlow)" />

                  {/* High-Contrast Dotted Lines Connecting Sphere to 5 Pills */}
                  <line x1="250" y1="250" x2="250" y2="50" stroke={isDarkMode ? "#38bdf8" : "#0284c7"} strokeWidth={hoveredNode === "email" ? "3.5" : "2"} opacity={hoveredNode === "email" ? "1" : "0.75"} strokeDasharray="4 4" />
                  <line x1="250" y1="250" x2="400" y2="135" stroke={isDarkMode ? "#38bdf8" : "#0284c7"} strokeWidth={hoveredNode === "linkedin" ? "3.5" : "2"} opacity={hoveredNode === "linkedin" ? "1" : "0.75"} strokeDasharray="4 4" />
                  <line x1="250" y1="250" x2="380" y2="365" stroke={isDarkMode ? "#38bdf8" : "#0284c7"} strokeWidth={hoveredNode === "github" ? "3.5" : "2"} opacity={hoveredNode === "github" ? "1" : "0.75"} strokeDasharray="4 4" />
                  <line x1="250" y1="250" x2="120" y2="365" stroke={isDarkMode ? "#38bdf8" : "#0284c7"} strokeWidth={hoveredNode === "call" ? "3.5" : "2"} opacity={hoveredNode === "call" ? "1" : "0.75"} strokeDasharray="4 4" />
                  <line x1="250" y1="250" x2="100" y2="135" stroke={isDarkMode ? "#38bdf8" : "#0284c7"} strokeWidth={hoveredNode === "location" ? "3.5" : "2"} opacity={hoveredNode === "location" ? "1" : "0.75"} strokeDasharray="4 4" />

                  {/* Outer Dotted Orbital Circle */}
                  <circle cx="250" cy="250" r="175" stroke={isDarkMode ? "#38bdf8" : "#0284c7"} strokeWidth="2" strokeDasharray="5 7" opacity="0.75" />
                </svg>
              </div>

              {/* ── 360° ORBITING GLOWING LIGHT PARTICLES ── */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <svg className="w-full h-full" viewBox="0 0 500 500" fill="none">
                  <circle cx="250" cy="75" r="5" fill={isDarkMode ? "#ffffff" : "#0284c7"} className="drop-shadow-[0_0_8px_#38bdf8]" />
                  <circle cx="425" cy="250" r="5" fill={isDarkMode ? "#ffffff" : "#0284c7"} className="drop-shadow-[0_0_8px_#38bdf8]" />
                  <circle cx="250" cy="425" r="5" fill={isDarkMode ? "#ffffff" : "#0284c7"} className="drop-shadow-[0_0_8px_#38bdf8]" />
                  <circle cx="75" cy="250" r="5" fill={isDarkMode ? "#ffffff" : "#0284c7"} className="drop-shadow-[0_0_8px_#38bdf8]" />
                </svg>
              </motion.div>

              {/* ── HIGH-CONTRAST 3D GLASS SPHERE (CENTER HUB) ── */}
              <div className="contact-center-sphere relative z-20 flex flex-col items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className={`w-24 h-24 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center text-center p-2 sm:p-3 backdrop-blur-2xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden ${
                    isDarkMode
                      ? "bg-gradient-to-b from-white/30 via-white/10 to-cyan-500/20 border-white/70 shadow-[0_0_30px_rgba(56,189,248,0.4)]"
                      : "bg-gradient-to-b from-sky-100 via-white to-sky-200 border-sky-400 shadow-[0_0_20px_rgba(2,132,199,0.3)]"
                  }`}
                >
                  {/* Glass Gloss Highlight Arc */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent pointer-events-none rounded-t-full" />

                  {/* Core Status Content */}
                  <AnimatePresence mode="wait">
                    {hoveredNode ? (
                      <motion.div
                        key={hoveredNode}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-0.5 relative z-10 px-1"
                      >
                        <span className={`text-[8px] sm:text-[9px] font-mono font-bold tracking-widest uppercase block ${
                          isDarkMode ? "text-cyan-300" : "text-blue-700"
                        }`}>
                          [READY]
                        </span>
                        <span className={`text-xs sm:text-base font-black tracking-wider uppercase block leading-tight ${
                          isDarkMode ? "text-white drop-shadow-md" : "text-blue-950"
                        }`}>
                          {hoveredNode === "email" && "COPY EMAIL"}
                          {hoveredNode === "linkedin" && "LINKEDIN"}
                          {hoveredNode === "github" && "GITHUB"}
                          {hoveredNode === "call" && "DIAL CALL"}
                          {hoveredNode === "location" && "OPEN MAPS"}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.15 }}
                        className="relative z-10 space-y-0.5"
                      >
                        <h3 className={`text-xs sm:text-lg font-black tracking-wider uppercase leading-tight ${
                          isDarkMode ? "text-white drop-shadow-md" : "text-blue-950"
                        }`}>
                          LET'S<br />CONNECT
                        </h3>
                        <span className={`text-[8px] sm:text-[10px] font-mono font-bold tracking-widest uppercase block ${
                          isDarkMode ? "text-cyan-200" : "text-blue-900"
                        }`}>
                          HOVER NODE
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* ══════════════════════════════════════════════════════════
                  5 COMPACT MOBILE-RESPONSIVE GLASS CAPSULE PILLS
                  ══════════════════════════════════════════════════════════ */}

              {/* NODE 1: TOP (12 o'clock) -> EMAIL ME */}
              <div className="contact-orbital-pill absolute top-[0%] left-1/2 -translate-x-1/2 z-30">
                <motion.div
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onMouseEnter={() => setHoveredNode("email")}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => triggerCopy("aniket.g.dev@gmail.com", "Email Address")}
                  className={`py-1.5 px-2.5 sm:py-2.5 sm:px-4 rounded-full border backdrop-blur-xl shadow-md transition-all duration-300 cursor-pointer flex items-center gap-1.5 sm:gap-2.5 group select-none ${
                    isDarkMode
                      ? "bg-slate-900/80 border-white/30 text-white hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                      : "bg-white/90 border-slate-300 text-slate-950 hover:border-blue-600 hover:shadow-md"
                  }`}
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Mail size={13} className="sm:w-4 sm:h-4" />
                  </div>
                  <div className="text-left space-y-0">
                    <span className="block text-[11px] sm:text-xs font-bold tracking-tight">
                      Email Me
                    </span>
                    <span className="hidden sm:block text-[10px] font-mono font-medium opacity-90">
                      aniket.g.dev@gmail.com
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* NODE 2: TOP-RIGHT (2 o'clock) -> LINKEDIN */}
              <div className="contact-orbital-pill absolute top-[22%] right-[-3%] sm:right-[-4%] z-30">
                <motion.div
                  whileHover={{ scale: 1.08, x: 2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onMouseEnter={() => setHoveredNode("linkedin")}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => window.open("https://linkedin.com/in/aniketgavali", "_blank")}
                  className={`py-1.5 px-2.5 sm:py-2.5 sm:px-4 rounded-full border backdrop-blur-xl shadow-md transition-all duration-300 cursor-pointer flex items-center gap-1.5 sm:gap-2.5 group select-none ${
                    isDarkMode
                      ? "bg-slate-900/80 border-white/30 text-white hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                      : "bg-white/90 border-slate-300 text-slate-950 hover:border-blue-600 hover:shadow-md"
                  }`}
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-500/20 border border-blue-400/50 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <FiLinkedin size={13} className="sm:w-4 sm:h-4" />
                  </div>
                  <div className="text-left space-y-0">
                    <span className="block text-[11px] sm:text-xs font-bold tracking-tight">
                      LinkedIn
                    </span>
                    <span className="hidden sm:block text-[10px] font-mono font-medium opacity-90">
                      /in/aniketgavali
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* NODE 3: BOTTOM-RIGHT (4:30 o'clock) -> GITHUB */}
              <div className="contact-orbital-pill absolute bottom-[20%] right-[-3%] sm:right-[-4%] z-30">
                <motion.div
                  whileHover={{ scale: 1.08, x: 2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onMouseEnter={() => setHoveredNode("github")}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => window.open("https://github.com/aniket-g-3101", "_blank")}
                  className={`py-1.5 px-2.5 sm:py-2.5 sm:px-4 rounded-full border backdrop-blur-xl shadow-md transition-all duration-300 cursor-pointer flex items-center gap-1.5 sm:gap-2.5 group select-none ${
                    isDarkMode
                      ? "bg-slate-900/80 border-white/30 text-white hover:border-slate-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                      : "bg-white/90 border-slate-300 text-slate-950 hover:border-slate-800 hover:shadow-md"
                  }`}
                >
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center group-hover:scale-110 transition-transform ${
                    isDarkMode
                      ? "bg-slate-500/20 border-slate-400/50 text-slate-200"
                      : "bg-slate-200/60 border-slate-300 text-slate-800"
                  }`}>
                    <FiGithub size={13} className="sm:w-4 sm:h-4" />
                  </div>
                  <div className="text-left space-y-0">
                    <span className="block text-[11px] sm:text-xs font-bold tracking-tight">
                      GitHub
                    </span>
                    <span className="hidden sm:block text-[10px] font-mono font-medium opacity-90">
                      /aniket-g-3101
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* NODE 4: BOTTOM-LEFT (7:30 o'clock) -> CALL ME */}
              <div className="contact-orbital-pill absolute bottom-[20%] left-[-3%] sm:left-[-4%] z-30">
                <motion.div
                  whileHover={{ scale: 1.08, x: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onMouseEnter={() => setHoveredNode("call")}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => window.open("tel:+917822050904")}
                  className={`py-1.5 px-2.5 sm:py-2.5 sm:px-4 rounded-full border backdrop-blur-xl shadow-md transition-all duration-300 cursor-pointer flex items-center gap-1.5 sm:gap-2.5 group select-none ${
                    isDarkMode
                      ? "bg-slate-900/80 border-white/30 text-white hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                      : "bg-white/90 border-slate-300 text-slate-950 hover:border-emerald-600 hover:shadow-md"
                  }`}
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Phone size={13} className="sm:w-4 sm:h-4" />
                  </div>
                  <div className="text-left space-y-0">
                    <span className="block text-[11px] sm:text-xs font-bold tracking-tight">
                      Call Me
                    </span>
                    <span className="hidden sm:block text-[10px] font-mono font-medium opacity-90">
                      +91 78220 50904
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* NODE 5: TOP-LEFT (9:30 o'clock) -> LOCATION */}
              <div className="contact-orbital-pill absolute top-[22%] left-[-3%] sm:left-[-4%] z-30">
                <motion.div
                  whileHover={{ scale: 1.08, x: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onMouseEnter={() => setHoveredNode("location")}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => window.open("https://www.google.com/maps/place/Solapur,+Maharashtra/", "_blank")}
                  className={`py-1.5 px-2.5 sm:py-2.5 sm:px-4 rounded-full border backdrop-blur-xl shadow-md transition-all duration-300 cursor-pointer flex items-center gap-1.5 sm:gap-2.5 group select-none ${
                    isDarkMode
                      ? "bg-slate-900/80 border-white/30 text-white hover:border-rose-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.5)]"
                      : "bg-white/90 border-slate-300 text-slate-950 hover:border-rose-600 hover:shadow-md"
                  }`}
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-rose-500/20 border border-rose-400/50 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                    <MapPin size={13} className="sm:w-4 sm:h-4" />
                  </div>
                  <div className="text-left space-y-0">
                    <span className="block text-[11px] sm:text-xs font-bold tracking-tight">
                      Location
                    </span>
                    <span className="hidden sm:block text-[10px] font-mono font-medium opacity-90">
                      Solapur, India
                    </span>
                  </div>
                </motion.div>
              </div>

            </div>

            {/* ── BOTTOM HUD GLASS STATUS CAPSULE ── */}
            <div
              className={`py-2 px-3 sm:py-2.5 sm:px-5 rounded-full border backdrop-blur-xl text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2 sm:gap-2.5 shadow-md transition-all duration-300 max-w-lg select-none ${
                hoveredNode
                  ? isDarkMode
                    ? "bg-slate-900/90 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                    : "bg-white/95 border-cyan-600 text-blue-950 shadow-md"
                  : isDarkMode
                  ? "bg-slate-900/70 border-white/30 text-slate-200"
                  : "bg-white/90 border-slate-300 text-slate-950 shadow-xs"
              }`}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-500 flex-shrink-0">
                <MousePointerClick size={12} className="animate-pulse" />
              </div>
              <span className="truncate">
                {hoveredNode === "email" && "Click to copy email address: aniket.g.dev@gmail.com"}
                {hoveredNode === "linkedin" && "Click to view professional LinkedIn profile"}
                {hoveredNode === "github" && "Click to view GitHub profile & repositories"}
                {hoveredNode === "call" && "Click to dial mobile number: +91 78220 50904"}
                {hoveredNode === "location" && "Click to open Solapur GPS maps in new tab"}
                {!hoveredNode && "CLICK ANY NODE TO TRIGGER PLATFORM ACTION"}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}