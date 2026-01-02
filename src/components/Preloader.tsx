import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

// Sparkle component for floating particles
const SparkleParticle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [-20, -40],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay,
      ease: 'easeOut',
    }}
  >
    <Sparkles className="w-4 h-4 text-primary" />
  </motion.div>
);

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Generate sparkle positions
  const sparkles = [
    { delay: 0, x: 20, y: 30 },
    { delay: 0.3, x: 80, y: 25 },
    { delay: 0.6, x: 15, y: 70 },
    { delay: 0.9, x: 85, y: 65 },
    { delay: 1.2, x: 50, y: 20 },
    { delay: 1.5, x: 30, y: 80 },
    { delay: 1.8, x: 70, y: 75 },
    { delay: 0.4, x: 10, y: 50 },
    { delay: 0.7, x: 90, y: 45 },
    { delay: 1.1, x: 45, y: 85 },
  ];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background overflow-hidden"
        >
          {/* Shimmer Background Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Floating Sparkles */}
          {sparkles.map((sparkle, i) => (
            <SparkleParticle key={i} {...sparkle} />
          ))}

          <div className="flex flex-col items-center gap-6 relative z-10">
            {/* Makeup Icons Row */}
            <div className="flex items-center gap-8">
              {/* Makeup Brush Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: 'spring', delay: 0.2 }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full blur-lg"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.svg
                  width="60"
                  height="60"
                  viewBox="0 0 64 64"
                  className="relative z-10"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  {/* Brush bristles */}
                  <motion.ellipse
                    cx="32"
                    cy="12"
                    rx="10"
                    ry="8"
                    fill="hsl(var(--primary))"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />
                  {/* Brush ferrule */}
                  <motion.rect
                    x="28"
                    y="18"
                    width="8"
                    height="6"
                    fill="hsl(var(--primary) / 0.7)"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  />
                  {/* Brush handle */}
                  <motion.rect
                    x="29"
                    y="24"
                    width="6"
                    height="32"
                    rx="2"
                    fill="hsl(var(--foreground) / 0.1)"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  />
                </motion.svg>
              </motion.div>

              {/* Lipstick Icon with Glow */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 bg-primary/30 rounded-full blur-xl"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.svg
                  width="80"
                  height="80"
                  viewBox="0 0 64 64"
                  className="relative z-10"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <motion.path
                    d="M26 8 L38 8 L38 20 L32 28 L26 20 Z"
                    fill="hsl(var(--primary))"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                  <motion.rect
                    x="24"
                    y="20"
                    width="16"
                    height="8"
                    fill="hsl(var(--primary) / 0.8)"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                  <motion.rect
                    x="22"
                    y="28"
                    width="20"
                    height="28"
                    rx="3"
                    fill="hsl(var(--foreground) / 0.1)"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  />
                  <motion.line
                    x1="22"
                    y1="38"
                    x2="42"
                    y2="38"
                    stroke="hsl(var(--primary) / 0.5)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, delay: 1 }}
                  />
                </motion.svg>
              </motion.div>

              {/* Mirror Icon */}
              <motion.div
                initial={{ scale: 0, rotate: 45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: 'spring', delay: 0.4 }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full blur-lg"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                />
                <motion.svg
                  width="60"
                  height="60"
                  viewBox="0 0 64 64"
                  className="relative z-10"
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                  {/* Mirror glass */}
                  <motion.circle
                    cx="32"
                    cy="24"
                    r="18"
                    fill="hsl(var(--foreground) / 0.05)"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                  {/* Mirror shine */}
                  <motion.ellipse
                    cx="26"
                    cy="18"
                    rx="6"
                    ry="4"
                    fill="hsl(var(--primary) / 0.3)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
                  />
                  {/* Mirror handle */}
                  <motion.rect
                    x="29"
                    y="40"
                    width="6"
                    height="18"
                    rx="2"
                    fill="hsl(var(--foreground) / 0.1)"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  />
                </motion.svg>
              </motion.div>
            </div>

            {/* Animated Logo/Text with Shimmer */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative text-center"
            >
              <motion.h1
                className="text-4xl md:text-6xl font-heading text-primary relative"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Sunita
                {/* Text shimmer effect */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-muted-foreground mt-2 font-body flex items-center justify-center gap-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
                Makeup Artist
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.p>
            </motion.div>

            {/* Loading Dots with Sparkle */}
            <motion.div
              className="flex items-center gap-3 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                    boxShadow: [
                      '0 0 0 0 hsl(var(--primary) / 0)',
                      '0 0 20px 5px hsl(var(--primary) / 0.5)',
                      '0 0 0 0 hsl(var(--primary) / 0)',
                    ],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.div>

            {/* Loading Text */}
            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ✨ Loading beauty... ✨
              </motion.span>
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
