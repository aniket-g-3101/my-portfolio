import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Hide loader after animation completes
    const timer = setTimeout(() => setIsLoading(false), 3200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  // Optimized animation variants
  const containerVariants = {
    exit: {
      y: "-100%",
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const contentExitVariants = {
    exit: {
      scale: 0.9,
      opacity: 0,
      filter: "blur(10px)",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const logoVariants = {
    initial: { 
      scale: 0,
      rotate: -180,
    },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: [0.34, 1.56, 0.64, 1], // Spring effect
      },
    },
  };

  const nameVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const letterVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.5 + i * 0.025,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const subtitleVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 1.2,
        ease: "easeOut",
      },
    },
  };

  const progressBarVariants = {
    initial: { scaleX: 0, opacity: 0 },
    animate: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 1.5,
        ease: "easeOut",
      },
    },
  };

  const name = "Aniket Gavali";
  const letters = name.split("");

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          variants={containerVariants}
          initial={{ y: 0 }}
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
          style={{ willChange: "transform" }}
        >
          {/* Optimized background with CSS animations only */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated orbs using CSS keyframes */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-float-slow" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-float-slow-delay" />
            
            {/* Minimal particles - only 6 for best performance */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-particle"
                style={{
                  left: `${20 + (i * 12)}%`,
                  top: `${30 + (i * 8)}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>

          {/* Main content with exit animation */}
          <motion.div 
            variants={contentExitVariants}
            exit="exit"
            className="relative z-10 flex flex-col items-center px-6 sm:px-8 max-w-2xl mx-auto"
            style={{ willChange: "transform, opacity, filter" }}
          >
            {/* Logo with bounce entrance */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              className="relative mb-8 sm:mb-10"
            >
              {/* Pulsing glow using CSS */}
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse-glow" />
              
              <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-xl shadow-glow-animate">
                {/* Sparkles with staggered entrance */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  className="absolute -top-2 left-1/2 -translate-x-1/2 animate-sparkle"
                >
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 animate-sparkle-delay"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </motion.div>

                {/* Main logo with CSS rotating border */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-400/30 animate-spin-slow" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl font-black bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent animate-text-glow">
                      AG
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Name with staggered letter animation */}
            <motion.div
              variants={nameVariants}
              initial="initial"
              animate="animate"
              className="mb-4 sm:mb-6"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
                {letters.map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="initial"
                    animate="animate"
                    className={`inline-block ${
                      letter === " " ? "w-4 sm:w-6" : ""
                    } bg-gradient-to-br from-white via-blue-100 to-purple-100 bg-clip-text text-transparent`}
                    style={{ 
                      textShadow: "0 0 40px rgba(59, 130, 246, 0.5)",
                      willChange: "transform, opacity",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Subtitle with smooth entrance */}
            <motion.div
              variants={subtitleVariants}
              initial="initial"
              animate="animate"
              className="mb-8 sm:mb-10 text-center"
            >
              <p className="text-sm sm:text-base md:text-lg text-blue-200/70 font-light tracking-wide mb-2 animate-breathe">
                Full Stack Developer
              </p>
              <p className="text-xs sm:text-sm text-blue-300/50 font-light animate-breathe-delay">
                Building digital excellence
              </p>
            </motion.div>

            {/* Progress bar with slide entrance */}
            <motion.div
              variants={progressBarVariants}
              initial="initial"
              animate="animate"
              className="w-full max-w-xs sm:max-w-sm origin-left"
            >
              <div className="relative h-1 sm:h-1.5 bg-blue-950/50 rounded-full overflow-hidden backdrop-blur-sm border border-blue-900/30">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full relative overflow-hidden transition-all duration-100 ease-linear"
                  style={{
                    width: `${progress}%`,
                    boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                    willChange: "width",
                  }}
                >
                  {/* CSS shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine" />
                </div>
              </div>
              
              {/* Progress percentage */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="mt-3 text-center"
              >
                <span className="text-xs sm:text-sm text-blue-300/60 font-mono animate-breathe">
                  {progress}%
                </span>
              </motion.div>
            </motion.div>

            {/* Loading dots with CSS animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="flex gap-2 mt-6 sm:mt-8"
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 animate-bounce-dot"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Static edge glow effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          </div>

          {/* Optimized CSS Keyframes */}
          <style jsx>{`
            @keyframes float-slow {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(30px, -30px) scale(1.08); }
            }
            @keyframes particle {
              0%, 100% { transform: translateY(-25px); opacity: 0.15; }
              50% { transform: translateY(25px); opacity: 0.4; }
            }
            @keyframes pulse-glow {
              0%, 100% { transform: scale(1); opacity: 0.25; }
              50% { transform: scale(1.15); opacity: 0.5; }
            }
            @keyframes sparkle {
              0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
              50% { opacity: 1; transform: scale(1) rotate(180deg); }
            }
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes text-glow {
              0%, 100% { text-shadow: 0 0 10px rgba(59, 130, 246, 0.5); }
              50% { text-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
            }
            @keyframes breathe {
              0%, 100% { opacity: 0.7; }
              50% { opacity: 1; }
            }
            @keyframes shine {
              from { transform: translateX(-100%); }
              to { transform: translateX(200%); }
            }
            @keyframes bounce-dot {
              0%, 100% { transform: scale(1); opacity: 0.3; }
              50% { transform: scale(1.3); opacity: 1; }
            }
            @keyframes shadow-glow {
              0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
              50% { box-shadow: 0 0 35px rgba(59, 130, 246, 0.5); }
            }

            .animate-float-slow {
              animation: float-slow 12s ease-in-out infinite;
            }
            .animate-float-slow-delay {
              animation: float-slow 12s ease-in-out infinite 1.5s;
            }
            .animate-particle {
              animation: particle 5s ease-in-out infinite;
            }
            .animate-pulse-glow {
              animation: pulse-glow 3s ease-in-out infinite;
            }
            .animate-sparkle {
              animation: sparkle 3.5s ease-in-out infinite;
            }
            .animate-sparkle-delay {
              animation: sparkle 3.5s ease-in-out infinite 1.2s;
            }
            .animate-spin-slow {
              animation: spin-slow 10s linear infinite;
            }
            .animate-text-glow {
              animation: text-glow 2.5s ease-in-out infinite;
            }
            .animate-breathe {
              animation: breathe 2.5s ease-in-out infinite;
            }
            .animate-breathe-delay {
              animation: breathe 3s ease-in-out infinite 0.4s;
            }
            .animate-shine {
              animation: shine 2s linear infinite;
            }
            .animate-bounce-dot {
              animation: bounce-dot 1.8s ease-in-out infinite;
            }
            .shadow-glow-animate {
              animation: shadow-glow 3s ease-in-out infinite;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}