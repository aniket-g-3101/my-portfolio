import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const stageTimer1 = setTimeout(() => setStage(1), 400);
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = prev < 70 ? 3 : prev < 90 ? 1.5 : 0.8;
        return Math.min(prev + increment, 100);
      });
    }, 35);

    const stageTimer2 = setTimeout(() => setStage(2), 2800);
    const timer = setTimeout(() => setIsLoading(false), 3500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      clearTimeout(timer);
    };
  }, []);

  const containerVariants = {
    exit: {
      scale: 1.1,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  const logoVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  const circleVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const name = "Aniket Gavali";

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          variants={containerVariants}
          initial={{ opacity: 1 }}
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950"
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-transparent to-transparent" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob" />
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
          </div>

          <div className="relative z-10 flex flex-col items-center px-4">
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              className="relative mb-12"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  variants={circleVariants}
                  initial={{ scale: 1, opacity: 0 }}
                  animate="animate"
                  transition={{ delay: i * 0.3 }}
                  className="absolute inset-0 rounded-full border-2 border-blue-400/30"
                  style={{
                    width: `${120 + i * 40}px`,
                    height: `${120 + i * 40}px`,
                    left: `${-20 - i * 20}px`,
                    top: `${-20 - i * 20}px`,
                  }}
                />
              ))}

              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/50">
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-400/50 to-transparent animate-pulse" />
                
                <span className="relative text-3xl sm:text-4xl font-black text-white z-10">
                  AG
                </span>

                <svg className="absolute inset-0 w-full h-full animate-spin-slow">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeDasharray="10 5"
                    opacity="0.6"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#A78BFA" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>

            <motion.div
              variants={textVariants}
              initial="initial"
              animate="animate"
              className="mb-4 overflow-hidden"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-gradient">
                {name}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-sm sm:text-base text-blue-200/70 mb-8 tracking-wide"
            >
              Full Stack Developer
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="relative w-64 sm:w-80"
            >
              <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-slate-700/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full relative"
                  style={{
                    width: `${progress}%`,
                    boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
                  }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </motion.div>
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-slate-400 font-mono">Loading</span>
                <motion.span
                  key={progress}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: stage === 2 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 flex items-center gap-2"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </motion.div>
              <span className="text-xs text-indigo-300/80">Ready</span>
            </motion.div>
          </div>

          <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />

          <style jsx>{`
            @keyframes blob {
              0%, 100% { transform: translate(0, 0) scale(1); }
              33% { transform: translate(30px, -50px) scale(1.1); }
              66% { transform: translate(-20px, 20px) scale(0.9); }
            }
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
            @keyframes gradient {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }

            .animate-blob {
              animation: blob 7s ease-in-out infinite;
            }
            .animation-delay-2000 {
              animation-delay: 2s;
            }
            .animation-delay-4000 {
              animation-delay: 4s;
            }
            .animate-spin-slow {
              animation: spin-slow 8s linear infinite;
            }
            .animate-shimmer {
              animation: shimmer 2s infinite;
            }
            .animate-gradient {
              background-size: 200% 200%;
              animation: gradient 3s ease infinite;
            }
            .bg-noise {
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}