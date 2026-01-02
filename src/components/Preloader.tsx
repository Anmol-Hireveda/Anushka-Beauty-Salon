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

              {/* Compact Mirror Icon with Flip Animation */}
              <motion.div
                initial={{ scale: 0, rotateY: 180 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, type: 'spring', delay: 0.6 }}
                className="relative"
                style={{ perspective: '500px' }}
              >
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full blur-lg"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />
                <motion.div
                  className="relative z-10"
                  animate={{ rotateY: [0, 180, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.svg
                    width="60"
                    height="60"
                    viewBox="0 0 64 64"
                  >
                    {/* Compact case outer */}
                    <motion.rect
                      x="8"
                      y="12"
                      width="48"
                      height="40"
                      rx="6"
                      fill="hsl(var(--foreground) / 0.1)"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    />
                    {/* Mirror surface */}
                    <motion.rect
                      x="12"
                      y="16"
                      width="40"
                      height="32"
                      rx="4"
                      fill="hsl(var(--primary) / 0.1)"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.9 }}
                    />
                    {/* Mirror shine effect */}
                    <motion.ellipse
                      cx="22"
                      cy="26"
                      rx="8"
                      ry="5"
                      fill="hsl(var(--primary) / 0.4)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                    {/* Secondary shine */}
                    <motion.ellipse
                      cx="40"
                      cy="36"
                      rx="5"
                      ry="3"
                      fill="hsl(var(--primary) / 0.3)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.1, 0.4, 0.1] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
                    />
                    {/* Decorative clasp */}
                    <motion.circle
                      cx="32"
                      cy="52"
                      r="3"
                      fill="hsl(var(--primary))"
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 1.1 }}
                    />
                  </motion.svg>
                </motion.div>
              </motion.div>

              {/* Eyeshadow Palette Icon with Color-Changing Animation */}
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: 'spring', delay: 0.8 }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full blur-lg"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                />
                <motion.svg
                  width="70"
                  height="60"
                  viewBox="0 0 80 64"
                  className="relative z-10"
                  animate={{ rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  {/* Palette case */}
                  <motion.rect
                    x="4"
                    y="8"
                    width="72"
                    height="48"
                    rx="8"
                    fill="hsl(var(--foreground) / 0.1)"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  />
                  
                  {/* Eyeshadow pan 1 - Pink */}
                  <motion.circle
                    cx="22"
                    cy="24"
                    r="8"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      fill: ['hsl(330, 80%, 60%)', 'hsl(350, 85%, 65%)', 'hsl(320, 75%, 55%)', 'hsl(330, 80%, 60%)']
                    }}
                    transition={{ 
                      scale: { duration: 0.3, delay: 1 },
                      fill: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                    }}
                  />
                  
                  {/* Eyeshadow pan 2 - Gold */}
                  <motion.circle
                    cx="42"
                    cy="24"
                    r="8"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      fill: ['hsl(45, 90%, 55%)', 'hsl(35, 85%, 50%)', 'hsl(50, 95%, 60%)', 'hsl(45, 90%, 55%)']
                    }}
                    transition={{ 
                      scale: { duration: 0.3, delay: 1.1 },
                      fill: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
                    }}
                  />
                  
                  {/* Eyeshadow pan 3 - Purple */}
                  <motion.circle
                    cx="62"
                    cy="24"
                    r="8"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      fill: ['hsl(280, 70%, 55%)', 'hsl(260, 75%, 50%)', 'hsl(300, 65%, 60%)', 'hsl(280, 70%, 55%)']
                    }}
                    transition={{ 
                      scale: { duration: 0.3, delay: 1.2 },
                      fill: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }
                    }}
                  />
                  
                  {/* Eyeshadow pan 4 - Brown */}
                  <motion.circle
                    cx="22"
                    cy="44"
                    r="8"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      fill: ['hsl(25, 60%, 40%)', 'hsl(20, 55%, 35%)', 'hsl(30, 65%, 45%)', 'hsl(25, 60%, 40%)']
                    }}
                    transition={{ 
                      scale: { duration: 0.3, delay: 1.3 },
                      fill: { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }
                    }}
                  />
                  
                  {/* Eyeshadow pan 5 - Teal */}
                  <motion.circle
                    cx="42"
                    cy="44"
                    r="8"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      fill: ['hsl(180, 70%, 45%)', 'hsl(170, 65%, 40%)', 'hsl(190, 75%, 50%)', 'hsl(180, 70%, 45%)']
                    }}
                    transition={{ 
                      scale: { duration: 0.3, delay: 1.4 },
                      fill: { duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }
                    }}
                  />
                  
                  {/* Eyeshadow pan 6 - Rose Gold */}
                  <motion.circle
                    cx="62"
                    cy="44"
                    r="8"
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      fill: ['hsl(10, 70%, 65%)', 'hsl(15, 75%, 60%)', 'hsl(5, 65%, 70%)', 'hsl(10, 70%, 65%)']
                    }}
                    transition={{ 
                      scale: { duration: 0.3, delay: 1.5 },
                      fill: { duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }
                    }}
                  />
                  
                  {/* Shimmer highlights on pans */}
                  {[
                    { cx: 19, cy: 21 },
                    { cx: 39, cy: 21 },
                    { cx: 59, cy: 21 },
                    { cx: 19, cy: 41 },
                    { cx: 39, cy: 41 },
                    { cx: 59, cy: 41 },
                  ].map((pos, i) => (
                    <motion.ellipse
                      key={i}
                      cx={pos.cx}
                      cy={pos.cy}
                      rx="3"
                      ry="2"
                      fill="white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </motion.svg>
              </motion.div>

              {/* Mascara Wand Icon with Brushing Animation */}
              <motion.div
                initial={{ scale: 0, rotate: 30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: 'spring', delay: 1 }}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 bg-primary/20 rounded-full blur-lg"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
                />
                <motion.svg
                  width="60"
                  height="60"
                  viewBox="0 0 64 64"
                  className="relative z-10"
                  animate={{ 
                    rotate: [0, 15, -15, 10, -10, 0],
                    y: [0, -2, 2, -1, 1, 0]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: 'easeInOut',
                    delay: 1.2 
                  }}
                >
                  {/* Mascara wand handle */}
                  <motion.rect
                    x="29"
                    y="32"
                    width="6"
                    height="26"
                    rx="2"
                    fill="hsl(var(--foreground) / 0.1)"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  />
                  
                  {/* Mascara wand connector */}
                  <motion.rect
                    x="30"
                    y="28"
                    width="4"
                    height="6"
                    fill="hsl(var(--primary) / 0.6)"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.3, delay: 1.3 }}
                  />
                  
                  {/* Mascara brush base */}
                  <motion.ellipse
                    cx="32"
                    cy="16"
                    rx="6"
                    ry="12"
                    fill="hsl(var(--primary))"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.4 }}
                  />
                  
                  {/* Brush bristles - left side */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.line
                      key={`left-${i}`}
                      x1="26"
                      y1={8 + i * 3}
                      x2="22"
                      y2={7 + i * 3}
                      stroke="hsl(var(--primary))"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: 1,
                        x1: [26, 25, 26],
                        x2: [22, 20, 22]
                      }}
                      transition={{ 
                        pathLength: { duration: 0.3, delay: 1.5 + i * 0.05 },
                        opacity: { duration: 0.2, delay: 1.5 + i * 0.05 },
                        x1: { duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 },
                        x2: { duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }
                      }}
                    />
                  ))}
                  
                  {/* Brush bristles - right side */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.line
                      key={`right-${i}`}
                      x1="38"
                      y1={8 + i * 3}
                      x2="42"
                      y2={7 + i * 3}
                      stroke="hsl(var(--primary))"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: 1,
                        x1: [38, 39, 38],
                        x2: [42, 44, 42]
                      }}
                      transition={{ 
                        pathLength: { duration: 0.3, delay: 1.5 + i * 0.05 },
                        opacity: { duration: 0.2, delay: 1.5 + i * 0.05 },
                        x1: { duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 + 0.5 },
                        x2: { duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 + 0.5 }
                      }}
                    />
                  ))}
                  
                  {/* Brush shine highlight */}
                  <motion.ellipse
                    cx="30"
                    cy="12"
                    rx="2"
                    ry="5"
                    fill="hsl(var(--primary) / 0.4)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.6 }}
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
