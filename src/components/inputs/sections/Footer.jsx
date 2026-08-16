import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Copy,
  Check,
  Download,
  Zap,
  ArrowUp,
  Code,
  Heart,
  Calendar,
} from "lucide-react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { useTheme } from "../../../context/ThemeContext";
import Resume from "../../../assets/Resume/Aniket_Gavali_Resume.pdf";
import { useLenisContext } from "../../../context/LenisContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getAnimationConfig, getMotionPreferences } from "../../../lib/gsap/animationConfig";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ============================================================
   INTERACTIVE CANVAS GLOBE - PURE ELECTRIC CYAN & SKY BLUE GLOW
   (SCALED COMPACT & ZERO PURPLE / MAGENTA GLOW)
   ============================================================ */
function AnimatedGlobe({ isDarkMode }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovered: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const parent = canvas.parentElement;
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.2 : 1.5);

    let width = (canvas.width = Math.floor((canvas.offsetWidth || 320) * dpr));
    let height = (canvas.height = Math.floor((canvas.offsetHeight || 320) * dpr));

    const handleResize = () => {
      if (!canvas) return;
      const currentDpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.2 : 1.5);
      const newWidth = Math.floor((canvas.offsetWidth || 320) * currentDpr);
      const newHeight = Math.floor((canvas.offsetHeight || 320) * currentDpr);
      if (Math.abs(newWidth - width) > 15 || Math.abs(newHeight - height) > 15) {
        width = canvas.width = newWidth;
        height = canvas.height = newHeight;
      }
    };

    window.addEventListener("resize", handleResize);

    // Track mouse on canvas parent
    const handleMouseMove = (e) => {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseRef.current.targetX = x * 0.8;
      mouseRef.current.targetY = y * 0.8;
      mouseRef.current.isHovered = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.isHovered = false;
    };

    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    // Generate Globe Sphere 3D Points
    const DOTS_COUNT = 480;
    const dots = [];

    for (let i = 0; i < DOTS_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / DOTS_COUNT);
      const theta = Math.sqrt(DOTS_COUNT * Math.PI) * phi;
      dots.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
        basePulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        isDataPoint: Math.random() > 0.88,
        dataPulse: Math.random() * Math.PI * 2,
        pillarHeight: Math.random() > 0.9 ? 0.2 + Math.random() * 0.25 : 0,
      });
    }

    // Floating ambient particles around the globe
    const FLOATING_PARTICLES_COUNT = 40;
    const floatingParticles = [];
    for (let i = 0; i < FLOATING_PARTICLES_COUNT; i++) {
      floatingParticles.push({
        x: (Math.random() - 0.5) * 2.2,
        y: (Math.random() - 0.5) * 2.2,
        z: (Math.random() - 0.5) * 2.2,
        vx: (Math.random() - 0.5) * 0.0015,
        vy: (Math.random() - 0.5) * 0.0015,
        vz: (Math.random() - 0.5) * 0.0015,
        size: 1 + Math.random() * 2,
        alpha: 0.2 + Math.random() * 0.6,
      });
    }

    let rotationY = 0;
    let rotationX = 0.22; // slight tilt
    let time = 0;
    let isVisible = false;

    const render = () => {
      if (!isVisible) return;
      time += 0.018;
      rotationY += 0.0035;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const currentRotX = rotationX + mouseRef.current.y * 0.4;
      const currentRotY = rotationY + mouseRef.current.x * 0.4;

      ctx.clearRect(0, 0, width, height);

      // Globe Center Coordinate
      const cx = width * 0.5;
      const cy = height * 0.52;
      const currentRadius = Math.min(width, height) * 0.38;

      // 1. Atmosphere Radial Glow Behind Globe (Pure Electric Cyan / Sky Glow - Zero Purple)
      const glowGrad = ctx.createRadialGradient(
        cx,
        cy,
        currentRadius * 0.2,
        cx,
        cy,
        currentRadius * 1.55
      );
      if (isDarkMode) {
        glowGrad.addColorStop(0, "rgba(6, 182, 212, 0.28)");
        glowGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.16)");
        glowGrad.addColorStop(0.8, "rgba(59, 130, 246, 0.06)");
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        // Pure Crystal Cyan & Deep Sky Blue (Clean, Natural, Non-AI)
        glowGrad.addColorStop(0, "rgba(6, 182, 212, 0.35)");
        glowGrad.addColorStop(0.45, "rgba(14, 165, 233, 0.22)");
        glowGrad.addColorStop(0.8, "rgba(2, 132, 199, 0.08)");
        glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      }

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius * 1.55, 0, Math.PI * 2);
      ctx.fill();

      // 2. Globe Edge Rim Atmosphere Curve (Pure Cyan / Azure - Zero Purple)
      const rimGrad = ctx.createRadialGradient(
        cx,
        cy - currentRadius * 0.2,
        currentRadius * 0.85,
        cx,
        cy,
        currentRadius * 1.08
      );
      if (isDarkMode) {
        rimGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
        rimGrad.addColorStop(0.88, "rgba(6, 182, 212, 0.20)");
        rimGrad.addColorStop(0.98, "rgba(56, 189, 248, 0.40)");
        rimGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        rimGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        rimGrad.addColorStop(0.85, "rgba(6, 182, 212, 0.35)");
        rimGrad.addColorStop(0.96, "rgba(2, 132, 199, 0.60)");
        rimGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      }

      ctx.fillStyle = rimGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, currentRadius * 1.08, 0, Math.PI * 2);
      ctx.fill();

      // 3. Render Projected Sphere Dots & Vertical Data Beams
      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);
      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);

      // Sort by Z for proper depth rendering
      const projectedDots = [];

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // 3D Rotation Math
        let x1 = dot.x * cosY - dot.z * sinY;
        let z1 = dot.z * cosY + dot.x * sinY;

        let y2 = dot.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + dot.y * sinX;

        // Perspective scale
        const scale = (z2 + 2) / 3;
        const px = cx + x1 * currentRadius;
        const py = cy + y2 * currentRadius;

        projectedDots.push({
          px,
          py,
          z2,
          scale,
          dot,
        });
      }

      projectedDots.sort((a, b) => a.z2 - b.z2);

      // Draw dots
      projectedDots.forEach(({ px, py, z2, scale, dot }) => {
        const alpha = Math.max(0.12, (z2 + 1) / 2);
        const pulse = Math.sin(time * dot.pulseSpeed * 60 + dot.basePulse);
        const dotSize = Math.max(0.7, (1.3 + pulse * 0.4) * scale);

        if (dot.isDataPoint && z2 > -0.2) {
          // Glowing Illuminated Data Node (Pure Cyan)
          const dataGlow = (Math.sin(time * 3 + dot.dataPulse) + 1) / 2;

          if (isDarkMode) {
            ctx.fillStyle = `rgba(6, 182, 212, ${0.4 + dataGlow * 0.6})`;
            ctx.shadowColor = "#06b6d4";
            ctx.shadowBlur = 12 * scale;
          } else {
            ctx.fillStyle = `rgba(2, 132, 199, ${0.8 + dataGlow * 0.2})`;
            ctx.shadowColor = "#0284c7";
            ctx.shadowBlur = 12 * scale;
          }
          ctx.beginPath();
          ctx.arc(px, py, dotSize * 2.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset

          // Vertical data light pillar if assigned (Pure Cyan & Cobalt Blue)
          if (dot.pillarHeight > 0 && z2 > 0.1) {
            const pillarLength = dot.pillarHeight * currentRadius * (0.8 + dataGlow * 0.4);
            const topY = py - pillarLength;

            ctx.strokeStyle = isDarkMode
              ? `rgba(6, 182, 212, ${0.35 + dataGlow * 0.5})`
              : `rgba(2, 132, 199, ${0.6 + dataGlow * 0.4})`;
            ctx.lineWidth = (isDarkMode ? 1.2 : 1.8) * scale;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(px, topY);
            ctx.stroke();

            // Top beacon pin
            ctx.fillStyle = isDarkMode ? "#ffffff" : "#0284c7";
            ctx.shadowColor = isDarkMode ? "#06b6d4" : "#0284c7";
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(px, topY, (isDarkMode ? 1.8 : 2.4) * scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        } else {
          // Standard sphere matrix dot (Pure Electric Cyan in Dark / High-Contrast Cobalt in Light)
          if (isDarkMode) {
            const r = 6 + Math.floor(scale * 50);
            const g = 182 + Math.floor(scale * 40);
            const b = 212 + Math.floor(scale * 30);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.85})`;
          } else {
            const r = 2 + Math.floor((1 - scale) * 20);
            const g = 110 + Math.floor(scale * 30);
            const b = 210;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0.4, alpha * 0.95)})`;
            ctx.shadowColor = "#38bdf8";
            ctx.shadowBlur = scale > 0.6 ? 3 : 0;
          }
          ctx.beginPath();
          ctx.arc(px, py, isDarkMode ? dotSize : dotSize * 1.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 4. Render Ambient Floating Space Particles (Cyan / Blue)
      floatingParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (p.x > 1.2) p.x = -1.2;
        if (p.x < -1.2) p.x = 1.2;
        if (p.y > 1.2) p.y = -1.2;
        if (p.y < -1.2) p.y = 1.2;

        const xPos = cx + p.x * currentRadius * 1.25;
        const yPos = cy + p.y * currentRadius * 1.25;

        const distFromCenter = Math.sqrt((xPos - cx) ** 2 + (yPos - cy) ** 2);
        if (distFromCenter < currentRadius * 1.6) {
          ctx.fillStyle = isDarkMode
            ? `rgba(56, 189, 248, ${p.alpha * 0.5})`
            : `rgba(2, 132, 199, ${Math.max(0.35, p.alpha * 0.8)})`;
          ctx.beginPath();
          ctx.arc(xPos, yPos, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 5. Draw Glowing Elliptical Flight Path & Animated Paper Plane (Cyan & Sky Blue)
      ctx.save();
      const flightCenterY = cy - currentRadius * 0.32;
      const flightRadiusX = currentRadius * 1.25;
      const flightRadiusY = currentRadius * 0.46;
      const flightTilt = -0.32; // tilted trajectory

      ctx.translate(cx, flightCenterY);
      ctx.rotate(flightTilt);

      // Gradient glowing dotted flight trajectory (Zero Purple)
      const pathGrad = ctx.createLinearGradient(-flightRadiusX, 0, flightRadiusX, 0);
      if (isDarkMode) {
        pathGrad.addColorStop(0, "rgba(6, 182, 212, 0.05)");
        pathGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.50)");
        pathGrad.addColorStop(0.85, "rgba(6, 182, 212, 0.90)");
        pathGrad.addColorStop(1, "rgba(255, 255, 255, 0.95)");
      } else {
        pathGrad.addColorStop(0, "rgba(2, 132, 199, 0.15)");
        pathGrad.addColorStop(0.5, "rgba(14, 165, 233, 0.65)");
        pathGrad.addColorStop(0.85, "rgba(2, 132, 199, 0.95)");
        pathGrad.addColorStop(1, "rgba(30, 58, 138, 1.0)");
      }

      ctx.strokeStyle = pathGrad;
      ctx.lineWidth = isDarkMode ? 1.6 : 2.2;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.ellipse(0, 0, flightRadiusX, flightRadiusY, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // Animated Flight Particle Trail & Paper Plane Position
      const planeAngle = (time * 0.35) % (Math.PI * 2);
      const planeX = Math.cos(planeAngle) * flightRadiusX;
      const planeY = Math.sin(planeAngle) * flightRadiusY;

      // Draw luminous trail behind plane
      for (let t = 1; t <= 12; t++) {
        const trailAngle = planeAngle - t * 0.035;
        const tx = Math.cos(trailAngle) * flightRadiusX;
        const ty = Math.sin(trailAngle) * flightRadiusY;
        const trailAlpha = (1 - t / 12) * (isDarkMode ? 0.7 : 0.85);
        ctx.fillStyle = isDarkMode ? `rgba(6, 182, 212, ${trailAlpha})` : `rgba(2, 132, 199, ${trailAlpha})`;
        ctx.shadowColor = isDarkMode ? "#06b6d4" : "#0284c7";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(tx, ty, (1 - t / 15) * 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw Origami Paper Plane (Electric Cyan & Crisp Azure)
      ctx.save();
      ctx.translate(planeX, planeY);

      // Tangent angle for plane orientation along ellipse
      const tangentAngle = Math.atan2(
        Math.cos(planeAngle) * flightRadiusY,
        -Math.sin(planeAngle) * flightRadiusX
      );
      ctx.rotate(tangentAngle);

      // Neon Origami Paper Plane Drawing
      const planeScale = 1.35;
      ctx.shadowColor = isDarkMode ? "#06b6d4" : "#0284c7";
      ctx.shadowBlur = isDarkMode ? 12 : 8;

      // Plane Wing 1
      ctx.fillStyle = isDarkMode ? "rgba(6, 182, 212, 0.25)" : "rgba(2, 132, 199, 0.4)";
      ctx.strokeStyle = isDarkMode ? "#06b6d4" : "#0284c7";
      ctx.lineWidth = isDarkMode ? 1.5 : 2;
      ctx.beginPath();
      ctx.moveTo(14 * planeScale, 0);
      ctx.lineTo(-12 * planeScale, -10 * planeScale);
      ctx.lineTo(-4 * planeScale, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Plane Wing 2
      ctx.fillStyle = isDarkMode ? "rgba(56, 189, 248, 0.35)" : "rgba(14, 165, 233, 0.45)";
      ctx.strokeStyle = isDarkMode ? "#38bdf8" : "#0284c7";
      ctx.beginPath();
      ctx.moveTo(14 * planeScale, 0);
      ctx.lineTo(-12 * planeScale, 10 * planeScale);
      ctx.lineTo(-4 * planeScale, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Plane Center Fold Ridge
      ctx.strokeStyle = isDarkMode ? "#ffffff" : "#1e3a8a";
      ctx.lineWidth = isDarkMode ? 1.5 : 2;
      ctx.beginPath();
      ctx.moveTo(14 * planeScale, 0);
      ctx.lineTo(-10 * planeScale, 0);
      ctx.stroke();

      ctx.restore(); // restore plane rotation
      ctx.restore(); // restore flight center

      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        cancelAnimationFrame(animationFrameId);
      } else if (parent) {
        const rect = parent.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          isVisible = true;
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) {
          isVisible = true;
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        } else {
          isVisible = false;
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    if (parent) {
      observer.observe(parent);
    }

    return () => {
      isVisible = false;
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (parent) {
        observer.disconnect();
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <div className="relative w-full h-full min-h-[160px] sm:min-h-[280px] lg:min-h-[360px] flex items-center justify-center pointer-events-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-crosshair"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

/* ============================================================
   MASTER FOOTER COMPONENT - SEAMLESS, COMPACT, EXPANDED PANEL
   ============================================================ */
export default function FooterSection() {
  const { isDarkMode } = useTheme();
  const lenisRef = useLenisContext();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const footerRef = useRef(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("aniket.g.dev@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToTop = () => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* ── Master GSAP Footer Section Entrance (Line Draw & Globe Focus Settle) ── */
  useGSAP(
    () => {
      const { isReducedMotion, isMobile } = getMotionPreferences();
      const config = getAnimationConfig();

      if (isReducedMotion) {
        gsap.set(
          [
            ".footer-divider-line",
            ".footer-connect-card",
            ".footer-globe-wrapper",
            ".footer-bottom-row",
          ],
          { opacity: 1, y: 0, x: 0, scale: 1, scaleX: 1, filter: "blur(0px)", clearProps: "all" }
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          end: "bottom 5%",
          toggleActions: "play none none none",
          once: true,
        },
        defaults: {
          ease: config.easing.entrance,
        },
      });

      // 1. Top delineation line expands from center
      tl.fromTo(
        ".footer-divider-line",
        { scaleX: 0, opacity: 0, transformOrigin: "50% 50%" },
        { scaleX: 1, opacity: 1, duration: config.duration.medium, ease: "power3.out" }
      )
        // 2. Left Connection Card slides in with lateral lift
        .fromTo(
          ".footer-connect-card",
          { xPercent: isMobile ? 0 : -5, y: isMobile ? 20 : 30, opacity: 0 },
          { xPercent: 0, y: 0, opacity: 1, duration: config.duration.section, ease: "power3.out" },
          "-=0.2"
        )
        // 3. Right 3D Globe enters with scale and focus settle
        .fromTo(
          ".footer-globe-wrapper",
          { scale: isMobile ? 0.95 : 0.88, filter: "blur(8px)", opacity: 0 },
          { scale: 1, filter: "blur(0px)", opacity: 1, duration: config.duration.section, ease: "power3.out" },
          "-=0.4"
        )
        // 4. Bottom copyright and developer credits reveal
        .fromTo(
          ".footer-bottom-row",
          { y: isMobile ? 12 : 20, opacity: 0 },
          { y: 0, opacity: 1, duration: config.duration.medium, ease: "power2.out" },
          "-=0.3"
        );
    },
    { scope: footerRef }
  );

  return (
    <footer
      id="footer-experience"
      ref={footerRef}
      className={`relative w-full overflow-hidden transition-colors duration-500 pt-8 sm:pt-12 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-10 bg-transparent ${isDarkMode ? "text-white" : "text-slate-900"
        }`}
      style={{
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* ── TOP DELINEATION DIVIDER LINE ACROSS FULL CONTAINER ── */}
      <div className="footer-divider-line max-w-7xl mx-auto mb-8 sm:mb-10">
        <div className="relative flex items-center justify-between">
          <div
            className={`w-full h-px ${isDarkMode
                ? "bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
                : "bg-gradient-to-r from-transparent via-blue-600/30 to-transparent"
              }`}
          />
        </div>
      </div>

      {/* ── AMBIENT PORTFOLIO RADIAL LIGHTING ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className={`absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] opacity-25 ${isDarkMode ? "bg-blue-600/30" : "bg-blue-400/20"
            }`}
        />
        <div
          className={`absolute top-1/3 right-10 w-[450px] h-[450px] rounded-full blur-[150px] opacity-25 ${isDarkMode ? "bg-cyan-500/30" : "bg-sky-300/25"
            }`}
        />
        <div
          className={`absolute -bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[160px] opacity-25 ${isDarkMode ? "bg-sky-600/30" : "bg-cyan-300/25"
            }`}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-8 sm:space-y-10">

        {/* ══════════════════════════════════════════════════════════
            MAIN ROW: [LEFT: WAYS TO CONNECT PANEL (8 COLS) | RIGHT: GLOBE (4 COLS)]
            ══════════════════════════════════════════════════════════ */}
        <div className="footer-main-grid grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* ── LEFT SIDE: WIDER FULLY TRANSPARENT WAYS TO CONNECT PANEL (8 COLS) ── */}
          <div className="lg:col-span-8 space-y-4 text-left order-last lg:order-first">

            {/* Unified Glassmorphic Connection Panel: 100% transparent with soft blur */}
            <div
              className={`footer-connect-card relative rounded-3xl border backdrop-blur-md p-3.5 sm:p-8 shadow-xl space-y-6 overflow-hidden bg-transparent ${isDarkMode
                  ? "border-slate-800/80 shadow-[0_15px_40px_rgba(0,0,0,0.4)] text-white"
                  : "border-slate-200/90 shadow-lg text-slate-900"
                }`}
            >
              {/* Top ambient rim line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

              {/* Panel Header */}
              <div className="flex items-center gap-2.5">
                <span className="w-5 sm:w-6 h-[1.5px] sm:h-[2px] bg-cyan-500" />
                <h4
                  className={`text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase ${isDarkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                >
                  WAYS TO CONNECT
                </h4>
              </div>

              {/* 4 Interactive Connection Items: Responsive layout (icon-only on mobile, full text on desktop) */}
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 sm:gap-6">

                {/* 1. EMAIL */}
                <div className="flex flex-col items-center sm:items-start space-y-1.5 sm:space-y-2.5 group">
                  <div className="relative">
                    <div
                      onClick={handleCopyEmail}
                      className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${isDarkMode
                          ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 group-hover:border-cyan-400 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_18px_rgba(6,182,212,0.5)]"
                          : "border-cyan-500/50 bg-cyan-50/70 text-cyan-600 group-hover:border-cyan-600 group-hover:bg-cyan-100/70 group-hover:shadow-md"
                        }`}
                    >
                      {copiedEmail ? (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                      ) : (
                        <FiMail className="w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                      )}
                    </div>
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                  </div>

                  <div className="space-y-0.5 hidden sm:block text-left">
                    <span
                      className={`block text-xs sm:text-sm font-extrabold ${isDarkMode ? "text-white" : "text-slate-950"
                        }`}
                    >
                      Email
                    </span>
                    <span
                      className={`block text-[10px] sm:text-[11px] font-mono truncate max-w-[120px] sm:max-w-[150px] ${isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                    >
                      aniket.g.dev@gmail.com
                    </span>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className={`mt-0.5 px-2.5 py-1 rounded-lg border text-[10px] sm:text-[11px] font-mono items-center gap-1.5 transition-all duration-200 cursor-pointer backdrop-blur-sm hidden sm:flex ${isDarkMode
                        ? "border-slate-700/80 bg-slate-900/40 hover:bg-slate-800 hover:border-slate-500 text-slate-300 hover:text-white"
                        : "border-slate-300 bg-white/60 hover:bg-white hover:border-cyan-500 text-slate-700 hover:text-cyan-900 shadow-xs"
                      }`}
                  >
                    {copiedEmail ? (
                      <>
                        <Check size={11} className="text-emerald-400" />
                        <span className="text-emerald-500 dark:text-emerald-400 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <span>Copy Email</span>
                        <Copy size={10} className={isDarkMode ? "text-slate-400" : "text-slate-500"} />
                      </>
                    )}
                  </button>
                </div>

                {/* 2. LINKEDIN */}
                <div className="flex flex-col items-center sm:items-start space-y-1.5 sm:space-y-2.5 group">
                  <div className="relative">
                    <a
                      href="https://linkedin.com/in/aniketgavali"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${isDarkMode
                          ? "border-sky-500/40 bg-sky-500/10 text-sky-400 group-hover:border-sky-400 group-hover:bg-sky-500/20 group-hover:shadow-[0_0_18px_rgba(56,189,248,0.5)]"
                          : "border-sky-500/50 bg-sky-50/70 text-sky-600 group-hover:border-sky-600 group-hover:bg-sky-100/70 group-hover:shadow-md"
                        }`}
                    >
                      <FiLinkedin className="w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    </a>
                    <div className="absolute top-0.5 right-0 w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
                  </div>

                  <div className="space-y-0.5 hidden sm:block text-left">
                    <span
                      className={`block text-xs sm:text-sm font-extrabold ${isDarkMode ? "text-white" : "text-slate-950"
                        }`}
                    >
                      LinkedIn
                    </span>
                    <span
                      className={`block text-[10px] sm:text-[11px] font-mono truncate max-w-[120px] sm:max-w-[150px] ${isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                    >
                      /in/aniketgavali
                    </span>
                  </div>

                  <a
                    href="https://linkedin.com/in/aniketgavali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-0.5 px-2.5 py-1 rounded-lg border text-[10px] sm:text-[11px] font-mono items-center gap-1 transition-all duration-200 cursor-pointer backdrop-blur-sm hidden sm:flex ${isDarkMode
                        ? "border-slate-700/80 bg-slate-900/40 hover:bg-slate-800 hover:border-slate-500 text-slate-300 hover:text-white"
                        : "border-slate-300 bg-white/60 hover:bg-white hover:border-sky-500 text-slate-700 hover:text-sky-900 shadow-xs"
                      }`}
                  >
                    <span>Open Profile</span>
                    <ArrowUpRight size={11} className={isDarkMode ? "text-slate-400" : "text-slate-500"} />
                  </a>
                </div>

                {/* 3. GITHUB */}
                <div className="flex flex-col items-center sm:items-start space-y-1.5 sm:space-y-2.5 group">
                  <div className="relative">
                    <a
                      href="https://github.com/aniket-g-3101"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${isDarkMode
                          ? "border-blue-500/40 bg-blue-500/10 text-blue-400 group-hover:border-blue-400 group-hover:bg-blue-500/20 group-hover:shadow-[0_0_18px_rgba(59,130,246,0.5)]"
                          : "border-blue-500/50 bg-blue-50/70 text-blue-600 group-hover:border-blue-600 group-hover:bg-blue-100/70 group-hover:shadow-md"
                        }`}
                    >
                      <FiGithub className="w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    </a>
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_#60a5fa]" />
                  </div>

                  <div className="space-y-0.5 hidden sm:block text-left">
                    <span
                      className={`block text-xs sm:text-sm font-extrabold ${isDarkMode ? "text-white" : "text-slate-950"
                        }`}
                    >
                      GitHub
                    </span>
                    <span
                      className={`block text-[10px] sm:text-[11px] font-mono truncate max-w-[120px] sm:max-w-[150px] ${isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                    >
                      /aniket-g-3101
                    </span>
                  </div>

                  <a
                    href="https://github.com/aniket-g-3101"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-0.5 px-2.5 py-1 rounded-lg border text-[10px] sm:text-[11px] font-mono items-center gap-1 transition-all duration-200 cursor-pointer backdrop-blur-sm hidden sm:flex ${isDarkMode
                        ? "border-slate-700/80 bg-slate-900/40 hover:bg-slate-800 hover:border-slate-500 text-slate-300 hover:text-white"
                        : "border-slate-300 bg-white/60 hover:bg-white hover:border-blue-500 text-slate-700 hover:text-blue-900 shadow-xs"
                      }`}
                  >
                    <span>View Profile</span>
                    <ArrowUpRight size={11} className={isDarkMode ? "text-slate-400" : "text-slate-500"} />
                  </a>
                </div>

                {/* 4. RESUME */}
                <div className="flex flex-col items-center sm:items-start space-y-1.5 sm:space-y-2.5 group">
                  <div className="relative">
                    <a
                      href={Resume}
                      download="Aniket_Gavali_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${isDarkMode
                          ? "border-teal-500/40 bg-teal-500/10 text-teal-400 group-hover:border-teal-400 group-hover:bg-teal-500/20 group-hover:shadow-[0_0_18px_rgba(20,184,166,0.5)]"
                          : "border-teal-500/50 bg-teal-50/70 text-teal-600 group-hover:border-teal-600 group-hover:bg-teal-100/70 group-hover:shadow-md"
                        }`}
                    >
                      <Download className="w-4.5 h-4.5 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    </a>
                    <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_6px_#2dd4bf]" />
                  </div>

                  <div className="space-y-0.5 hidden sm:block text-left">
                    <span
                      className={`block text-xs sm:text-sm font-extrabold ${isDarkMode ? "text-white" : "text-slate-950"
                        }`}
                    >
                      Resume
                    </span>
                    <span
                      className={`block text-[10px] sm:text-[11px] font-mono truncate max-w-[120px] sm:max-w-[150px] ${isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                    >
                      Download resume
                    </span>
                  </div>

                  <a
                    href={Resume}
                    download="Aniket_Gavali_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-0.5 px-2.5 py-1 rounded-lg border text-[10px] sm:text-[11px] font-mono items-center gap-1 transition-all duration-200 cursor-pointer backdrop-blur-sm hidden sm:flex ${isDarkMode
                        ? "border-slate-700/80 bg-slate-900/40 hover:bg-slate-800 hover:border-slate-500 text-slate-300 hover:text-white"
                        : "border-slate-300 bg-white/60 hover:bg-white hover:border-teal-500 text-slate-700 hover:text-teal-900 shadow-xs"
                      }`}
                  >
                    <span>Download</span>
                    <Download size={10} className={isDarkMode ? "text-slate-400" : "text-slate-500"} />
                  </a>
                </div>

              </div>

              {/* Bottom Sub-Row: Inspiration + Aniket Gavali Signature in font-cursive */}
              <div
                className={`pt-3 sm:pt-4 border-t flex flex-row items-center justify-between gap-3 text-left ${isDarkMode ? "border-slate-800/80" : "border-slate-200"
                  }`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center flex-shrink-0 ${isDarkMode
                        ? "border-cyan-500/50 bg-gradient-to-tr from-cyan-600/30 to-blue-600/30 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        : "border-cyan-400 bg-cyan-50/70 text-cyan-600 shadow-xs"
                      }`}
                  >
                    <Zap className="w-3.5 h-3.5 sm:w-[15px] sm:h-[15px] text-cyan-300 fill-cyan-300/30" />
                  </div>
                  <div>
                    <h5
                      className={`text-[10px] sm:text-sm font-extrabold leading-tight ${isDarkMode ? "text-white" : "text-slate-950"
                        }`}
                    >
                      Same ideas.{" "}
                      <span className="bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 bg-clip-text text-transparent">
                        Bigger possibilities.
                      </span>
                    </h5>
                  </div>
                </div>

                {/* Signature: Aniket Gavali */}
                <div className="flex items-center">
                  <span
                    className={`font-cursive text-lg sm:text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent inline-block select-none ${isDarkMode
                        ? "from-blue-400 via-sky-400 to-cyan-400 drop-shadow-[0_2px_10px_rgba(6,182,212,0.3)]"
                        : "from-blue-600 via-sky-600 to-cyan-600 drop-shadow-[0_1px_6px_rgba(6,182,212,0.15)]"
                      }`}
                    style={{ transform: "rotate(-2deg)" }}
                  >
                    Aniket Gavali
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* ── RIGHT SIDE: ANIMATED 3D GLOBE WITH BALANCED SCRIPT NOTE (4 COLS) ── */}
          <div className="footer-globe-wrapper lg:col-span-4 relative flex flex-row lg:flex-col items-center justify-start lg:justify-center gap-4 lg:gap-0 pt-4 lg:pt-0 order-first lg:order-last w-full">

            {/* Signature "Let's create impact together!" (Desktop only) */}
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mb-1 sm:mb-2 text-center pointer-events-none select-none hidden lg:block"
            >
              <span
                className={`font-cursive text-lg sm:text-2xl md:text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent inline-block ${isDarkMode
                    ? "from-blue-400 via-sky-400 to-cyan-400 drop-shadow-[0_2px_12px_rgba(6,182,212,0.3)]"
                    : "from-blue-600 via-sky-600 to-cyan-600 drop-shadow-[0_2px_8px_rgba(6,182,212,0.2)]"
                  }`}
                style={{ transform: "rotate(-2deg)" }}
              >
                Let's create impact together!
              </span>
            </motion.div>

            {/* Canvas Interactive Real-Time Rotating Dotted Globe (Scaled for better mobile presence) */}
            <div className="w-[145px] sm:w-[170px] lg:w-full lg:max-w-[360px] aspect-square flex-shrink-0">
              <AnimatedGlobe isDarkMode={isDarkMode} />
            </div>

            {/* Mobile text container placed on the right side of the globe */}
            <div className="flex flex-col items-start text-left lg:hidden space-y-0.5 select-none pointer-events-none">
              <span
                className={`font-cursive text-xl sm:text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent inline-block leading-tight ${isDarkMode
                    ? "from-blue-400 via-sky-400 to-cyan-400 drop-shadow-[0_2px_8px_rgba(6,182,212,0.3)]"
                    : "from-blue-600 via-sky-600 to-cyan-600 drop-shadow-[0_1px_4px_rgba(6,182,212,0.15)]"
                  }`}
                style={{ transform: "rotate(-2deg)" }}
              >
                Let's create
              </span>
              <span
                className={`font-cursive text-xl sm:text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent inline-block leading-tight ${isDarkMode
                    ? "from-blue-400 via-sky-400 to-cyan-400 drop-shadow-[0_2px_8px_rgba(6,182,212,0.3)]"
                    : "from-blue-600 via-sky-600 to-cyan-600 drop-shadow-[0_1px_4px_rgba(6,182,212,0.15)]"
                  }`}
                style={{ transform: "rotate(-2deg)" }}
              >
                impact together!
              </span>
            </div>

          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════
            BOTTOM BAR (DEVELOPER INFO + CREED + BACK TO TOP)
            ══════════════════════════════════════════════════════════ */}
        <div
          className={`footer-bottom-row flex flex-col md:flex-row items-center justify-between gap-5 pt-4 border-t text-xs ${isDarkMode ? "border-slate-800/80" : "border-slate-200"
            }`}
        >

          {/* Left: Code Icon + Name + Role */}
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl border flex items-center justify-center shadow-md ${isDarkMode
                  ? "bg-cyan-600/20 border-cyan-500/40 text-cyan-400"
                  : "bg-cyan-50 border-cyan-200 text-cyan-600"
                }`}
            >
              <Code size={18} />
            </div>
            <div className="text-left">
              <h5
                className={`font-extrabold text-sm ${isDarkMode ? "text-white" : "text-slate-950"
                  }`}
              >
                Aniket Gavali
              </h5>
              <span
                className={`text-[11px] font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"
                  }`}
              >
                Full Stack Developer
              </span>
            </div>
          </div>

          {/* Middle: Built with passion • Fueled by curiosity • Powered by coffee */}
          <div
            className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}
          >
            <div className="flex items-center gap-1.5">
              <Heart size={13} className="text-cyan-500 dark:text-cyan-400" />
              <span>Built with passion</span>
            </div>
            <span className={isDarkMode ? "text-slate-600" : "text-slate-300"}>•</span>
            <div className="flex items-center gap-1.5">
              <Zap size={13} className="text-cyan-500 dark:text-cyan-400" />
              <span>Fueled by curiosity</span>
            </div>
            <span className={isDarkMode ? "text-slate-600" : "text-slate-300"}>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-cyan-500 dark:text-cyan-400" />
              <span>Powered by coffee</span>
            </div>
          </div>

          {/* Right: Back To Top Button */}
          <div className="flex items-center gap-2.5">
            <span
              className={`text-xs font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
            >
              Back to top
            </span>
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.92 }}
              onClick={scrollToTop}
              aria-label="Back to top"
              className={`w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 ${isDarkMode
                  ? "border-cyan-500/50 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "border-cyan-300 bg-cyan-50 hover:bg-cyan-100 text-cyan-600 shadow-sm"
                }`}
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════
            COPYRIGHT NOTICE
            ══════════════════════════════════════════════════════════ */}
        <div className="text-left">
          <p
            className={`text-xs font-mono ${isDarkMode ? "text-slate-500" : "text-slate-500"
              }`}
          >
            &copy; 2026 Aniket Gavali. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}