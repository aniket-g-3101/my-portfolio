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

  const containerVariants = {
    exit: {
      clipPath: "circle(0% at 50% 50%)",
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const logoVariants = {
    initial: { 
      scale: 0.8, 
      opacity: 0,
      rotateY: -180,
    },
    animate: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  const nameVariants = {
    initial: { opacity: 0, y: 30, scale: 0.9 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
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
        delay: 0.5 + i * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const subtitleVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 1.5,
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
        delay: 1.8,
        ease: "easeOut",
      },
    },
  };

  const sparkleVariants = {
    animate: (i) => ({
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      rotate: [0, 180],
      transition: {
        duration: 1.5,
        delay: i * 0.2,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "easeInOut",
      },
    }),
  };

  const glowVariants = {
    animate: {
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
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
          initial={{ opacity: 1 }}
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Gradient orbs */}
            <motion.div
              animate={{
                x: ["-25%", "25%", "-25%"],
                y: ["-25%", "25%", "-25%"],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"
            />
            <motion.div
              animate={{
                x: ["25%", "-25%", "25%"],
                y: ["25%", "-25%", "25%"],
                scale: [1.2, 1, 1.2],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]"
            />

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center px-6 sm:px-8 max-w-2xl mx-auto">
            {/* Logo/Icon with glow */}
            <div className="relative mb-8 sm:mb-10">
              <motion.div
                variants={glowVariants}
                animate="animate"
                className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl"
                style={{ scale: 1.5 }}
              />
              
              <motion.div
                variants={logoVariants}
                initial="initial"
                animate="animate"
                className="relative"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                      "0 0 40px rgba(59, 130, 246, 0.6)",
                      "0 0 20px rgba(59, 130, 246, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20 backdrop-blur-xl"
                >
                  {/* Sparkles around icon */}
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={sparkleVariants}
                      animate="animate"
                      className="absolute"
                      style={{
                        top: i === 0 ? '-10%' : i === 1 ? '110%' : '50%',
                        left: i === 2 ? '-10%' : i === 3 ? '110%' : '50%',
                      }}
                    >
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    </motion.div>
                  ))}

                  {/* Main logo - could be your custom logo */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-2 border-dashed border-blue-400/30"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl sm:text-4xl font-black bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        AG
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

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
                    } bg-gradient-to-br from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]`}
                    style={{
                      textShadow: "0 0 40px rgba(59, 130, 246, 0.5)",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              variants={subtitleVariants}
              initial="initial"
              animate="animate"
              className="mb-8 sm:mb-10 text-center"
            >
              <p className="text-sm sm:text-base md:text-lg text-blue-200/70 font-light tracking-wide mb-2">
                Full Stack Developer
              </p>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-xs sm:text-sm text-blue-300/50 font-light"
              >
                Building digital excellence
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              variants={progressBarVariants}
              initial="initial"
              animate="animate"
              className="w-full max-w-xs sm:max-w-sm"
            >
              <div className="relative h-1 sm:h-1.5 bg-blue-950/50 rounded-full overflow-hidden backdrop-blur-sm border border-blue-900/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full relative"
                  style={{
                    boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                  }}
                >
                  {/* Glow effect on progress bar */}
                  <motion.div
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </motion.div>
              </div>
              
              {/* Progress percentage */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="mt-3 text-center"
              >
                <span className="text-xs sm:text-sm text-blue-300/60 font-mono">
                  {progress}%
                </span>
              </motion.div>
            </motion.div>

            {/* Loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="flex gap-2 mt-6 sm:mt-8"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"
                  style={{
                    boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Edge glow effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}