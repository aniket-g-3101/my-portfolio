import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Code2, Database, Layers, Zap } from "lucide-react";

export default function PageLoader({ setIsLoading }) {
  // Inject Montserrat and Inter fonts for a more modern visual style
  const FontStyles = () => (
    <style>
      {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Montserrat:wght@500&display=swap');
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}
    </style>
  );

  const [isVisible, setIsVisible] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const fullName = "Aniket Gavali";

  const loadingSteps = [
    { icon: Code2, label: "Frontend", color: "#3B82F6" },
    { icon: Database, label: "Backend", color: "#8B5CF6" },
    { icon: Layers, label: "Integration", color: "#EC4899" },
    { icon: Zap, label: "Ready", color: "#10B981" }
  ];

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Typing animation
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setDisplayedText(fullName.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    // Step progression
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    // Total timeout for loading screen disappearance
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for exit animation to complete before updating parent state
      setTimeout(() => {
        document.body.style.overflow = 'unset';
        setIsLoading(false);
      }, 600);
    }, 4200);

    return () => {
      clearInterval(typingInterval);
      clearInterval(stepInterval);
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [setIsLoading]);

  // Exit transition
  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)",
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  // Title animation
  const titleVariants = {
    initial: { opacity: 0, y: 10 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { delay: 1.5, duration: 0.5 }
    }
  };
  
  /**
   * Calculates the orbital radius for responsive design.
   * Ensures the orbits shrink gracefully on smaller screens.
   */
  const getRadius = () => {
    if (typeof window === 'undefined') return 80;
    // Mobile (less than 640px)
    if (window.innerWidth < 640) return 55;
    // Tablet (less than 768px)
    if (window.innerWidth < 768) return 65;
    // Desktop/Default
    return 80;
  };

  return (
    <>
      <FontStyles />
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key="loader"
            variants={containerVariants}
            initial={{ opacity: 1 }}
            exit="exit"
            // Ensure full-screen coverage and high z-index
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-slate-950 min-h-screen" 
            style={{
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              pointerEvents: "all",
            }}
          >
            {/* Animated gradient background */}
            <motion.div 
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)",
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            <div className="relative z-10 flex flex-col items-center px-4 w-full max-w-4xl">
              
              {/* Orbital Animation Container (Responsive sizing) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-8 sm:mb-10 md:mb-12"
              >
                {/* Center Core (Responsive sizing) */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"
                  animate={{
                    boxShadow: [
                      "0 0 40px rgba(59, 130, 246, 0.4), 0 0 80px rgba(139, 92, 246, 0.2)",
                      "0 0 60px rgba(59, 130, 246, 0.6), 0 0 100px rgba(139, 92, 246, 0.3)",
                      "0 0 40px rgba(59, 130, 246, 0.4), 0 0 80px rgba(139, 92, 246, 0.2)",
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Orbiting Elements */}
                {loadingSteps.map((step, index) => {
                  const Icon = step.icon;
                  // Calculate initial position in degrees
                  const angle = (index * 90) - 90;
                  const isActive = activeStep >= index;
                  const radius = getRadius(); // Responsive radius from function
                  
                  return (
                    <motion.div
                      key={index}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        x: "-50%",
                        y: "-50%",
                      }}
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.2,
                      }}
                    >
                      <motion.div
                        style={{
                          rotate: -360,
                          x: Math.cos((angle * Math.PI) / 180) * radius,
                          y: Math.sin((angle * Math.PI) / 180) * radius,
                        }}
                        animate={{
                          rotate: -360,
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                          delay: index * 0.2,
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{
                            scale: isActive ? [1, 1.1, 1] : 0.6,
                            opacity: isActive ? 1 : 0.25,
                          }}
                          transition={{ 
                            scale: {
                              duration: 0.4,
                              repeat: isActive ? Infinity : 0,
                              repeatDelay: 2
                            },
                            opacity: { duration: 0.3 }
                          }}
                          // Responsive sizing for the orbiting icons
                          className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center backdrop-blur-xl border"
                          style={{
                            backgroundColor: isActive ? `${step.color}20` : "#1e293b40",
                            borderColor: isActive ? step.color : "#334155",
                            boxShadow: isActive ? `0 0 25px ${step.color}50` : "none",
                          }}
                        >
                          <Icon 
                            className="w-5 h-5 sm:w-6 sm:h-6" 
                            style={{ color: isActive ? step.color : "#64748b" }}
                          />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}

                {/* Orbital Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-slate-700/20"
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>


              {/* Name with Typing Animation (Responsive text size) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="mb-2 sm:mb-3 text-center h-16 sm:h-20 md:h-24 flex items-center"
              >
                <h1 
                  // Uses the new Montserrat font
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight font-montserrat"
                  style={{
                    fontWeight: 700, // Bold
                    letterSpacing: "-0.02em",
                  }}
                >
                  {displayedText}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-0.5 sm:w-1 h-10 sm:h-12 md:h-14 lg:h-16 ml-1 bg-blue-500"
                    style={{
                      boxShadow: "0 0 10px rgba(59, 130, 246, 0.8)"
                    }}
                  />
                </h1>
              </motion.div>

              {/* Title (Responsive text size and tracking) */}
              <motion.div
                variants={titleVariants}
                initial="initial"
                animate="animate"
                className="mb-6 sm:mb-8 text-center"
              >
                <p 
                  className="text-xs sm:text-sm md:text-base tracking-[0.5em] font-medium text-slate-400 uppercase font-inter"
                >
                  Full Stack Developer
                </p>
              </motion.div>

              {/* Active Step Indicator (Responsive spacing) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.4 }}
                className="flex items-center gap-4 sm:gap-5 relative"
                style={{ minHeight: "40px" }}
              >
                {loadingSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{
                      scale: activeStep >= index ? 1 : 0.6,
                      opacity: activeStep >= index ? 1 : 0.3,
                    }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 1.5 + index * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="relative"
                  >
                    <motion.div
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                      style={{
                        backgroundColor: activeStep >= index ? step.color : "#475569",
                      }}
                      animate={{
                        boxShadow: activeStep >= index 
                          ? `0 0 12px ${step.color}`
                          : "none",
                      }}
                    />
                    <AnimatePresence mode="wait">
                      {activeStep === index && (
                        <motion.div
                          key={`label-${index}`}
                          className="absolute -bottom-7 sm:-bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span 
                            className="text-sm font-semibold"
                            style={{ 
                              color: step.color,
                              fontFamily: "'Inter', -apple-system, system-ui, sans-serif",
                            }}
                          >
                            {step.label}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}