import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Spray particle component
const SprayParticle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary/40"
    style={{
      width: Math.random() * 8 + 4,
      height: Math.random() * 8 + 4,
    }}
    initial={{ 
      x: 0, 
      y: 0, 
      opacity: 0,
      scale: 0 
    }}
    animate={{ 
      x: x + (Math.random() - 0.5) * 100,
      y: y + Math.random() * 150,
      opacity: [0, 0.8, 0.4, 0],
      scale: [0, 1.5, 1, 0.5],
    }}
    transition={{ 
      duration: 1.5,
      delay,
      ease: 'easeOut',
    }}
  />
);

// Mist cloud component
const MistCloud = ({ delay, size, x, y }: { delay: number; size: number; x: number; y: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
      filter: 'blur(20px)',
    }}
    initial={{ 
      x, 
      y: y - 50, 
      opacity: 0,
      scale: 0 
    }}
    animate={{ 
      y: y + 100,
      opacity: [0, 0.6, 0.3, 0],
      scale: [0, 1.5, 2, 2.5],
    }}
    transition={{ 
      duration: 2,
      delay,
      ease: 'easeOut',
    }}
  />
);

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSpray, setShowSpray] = useState(false);
  const [showReveal, setShowReveal] = useState(false);

  useEffect(() => {
    // Start spray animation after a brief pause
    const sprayTimer = setTimeout(() => setShowSpray(true), 500);
    
    // Start reveal animation
    const revealTimer = setTimeout(() => setShowReveal(true), 2000);
    
    // Hide preloader
    const loadTimer = setTimeout(() => setIsLoading(false), 3500);

    return () => {
      clearTimeout(sprayTimer);
      clearTimeout(revealTimer);
      clearTimeout(loadTimer);
    };
  }, []);

  // Generate spray particles
  const sprayParticles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: 0.5 + Math.random() * 0.8,
    x: (Math.random() - 0.5) * 200,
    y: Math.random() * 100 + 50,
  }));

  // Generate mist clouds
  const mistClouds = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: 0.6 + i * 0.1,
    size: 100 + Math.random() * 150,
    x: (Math.random() - 0.5) * 300,
    y: Math.random() * 50,
  }));

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Gray blur overlay that clears away */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'hsl(var(--muted-foreground) / 0.4)',
              backdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 1 }}
            animate={{ 
              opacity: showReveal ? 0 : 1,
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />

          {/* Spray bottle */}
          <motion.div
            className="absolute flex flex-col items-center"
            style={{ top: '25%' }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: showReveal ? 0 : 1,
            }}
            transition={{ 
              y: { duration: 0.8, ease: 'easeOut' },
              opacity: { duration: 0.5, delay: showReveal ? 0 : 0 }
            }}
          >
            {/* Spray nozzle area - particles come from here */}
            <div className="relative">
              {/* Spray particles */}
              {showSpray && sprayParticles.map((particle) => (
                <SprayParticle
                  key={particle.id}
                  delay={particle.delay}
                  x={particle.x}
                  y={particle.y}
                />
              ))}
              
              {/* Mist clouds */}
              {showSpray && mistClouds.map((cloud) => (
                <MistCloud
                  key={cloud.id}
                  delay={cloud.delay}
                  size={cloud.size}
                  x={cloud.x}
                  y={cloud.y}
                />
              ))}

              {/* Spray bottle SVG */}
              <motion.svg
                width="80"
                height="120"
                viewBox="0 0 80 120"
                className="relative z-10"
                animate={showSpray ? {
                  rotate: [0, -5, 5, -3, 0],
                } : {}}
                transition={{
                  duration: 0.3,
                  repeat: showSpray && !showReveal ? 3 : 0,
                  repeatDelay: 0.5,
                }}
              >
                {/* Bottle body */}
                <defs>
                  <linearGradient id="bottleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="50%" stopColor="hsl(var(--primary) / 0.8)" />
                    <stop offset="100%" stopColor="hsl(var(--primary) / 0.6)" />
                  </linearGradient>
                  <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary) / 0.3)" />
                    <stop offset="100%" stopColor="hsl(var(--primary) / 0.6)" />
                  </linearGradient>
                </defs>
                
                {/* Spray trigger */}
                <rect x="50" y="15" width="20" height="12" rx="3" fill="hsl(var(--muted-foreground) / 0.6)" />
                
                {/* Nozzle */}
                <rect x="30" y="5" width="20" height="8" rx="2" fill="hsl(var(--muted-foreground) / 0.8)" />
                <circle cx="40" cy="5" r="3" fill="hsl(var(--muted-foreground))" />
                
                {/* Bottle neck */}
                <rect x="30" y="13" width="20" height="20" rx="2" fill="hsl(var(--muted-foreground) / 0.7)" />
                
                {/* Bottle body */}
                <path
                  d="M 20 35 Q 15 40 15 50 L 15 100 Q 15 110 25 110 L 55 110 Q 65 110 65 100 L 65 50 Q 65 40 60 35 L 50 33 L 30 33 Z"
                  fill="url(#bottleGradient)"
                  stroke="hsl(var(--primary) / 0.3)"
                  strokeWidth="1"
                />
                
                {/* Liquid inside */}
                <path
                  d="M 20 60 Q 18 65 18 70 L 18 97 Q 18 107 28 107 L 52 107 Q 62 107 62 97 L 62 70 Q 62 65 60 60 Z"
                  fill="url(#liquidGradient)"
                  opacity="0.8"
                />
                
                {/* Highlight */}
                <ellipse cx="25" cy="70" rx="5" ry="15" fill="white" opacity="0.3" />
              </motion.svg>
            </div>
          </motion.div>

          {/* Name reveal */}
          <motion.div
            className="absolute flex flex-col items-center text-center z-20"
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
            animate={{ 
              opacity: showReveal ? 1 : 0,
              scale: showReveal ? 1 : 0.8,
              filter: showReveal ? 'blur(0px)' : 'blur(20px)',
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Decorative sparkles around name */}
            {showReveal && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: `${30 + Math.sin(i * 60 * Math.PI / 180) * 80}%`,
                      left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 120}px`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0.5],
                      scale: [0, 1.5, 1],
                    }}
                    transition={{ 
                      duration: 1,
                      delay: 0.2 + i * 0.1,
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path
                        d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z"
                        fill="hsl(var(--primary))"
                        opacity="0.8"
                      />
                    </svg>
                  </motion.div>
                ))}
              </>
            )}
            
            {/* Main title */}
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-wider"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.7) 50%, hsl(var(--primary)) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 40px hsl(var(--primary) / 0.3)',
              }}
              initial={{ y: 20 }}
              animate={{ y: showReveal ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Sunita
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl tracking-[0.3em] uppercase mt-2 text-muted-foreground"
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: showReveal ? 0 : 20,
                opacity: showReveal ? 1 : 0,
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Makeup Artist
            </motion.p>

            {/* Decorative line */}
            <motion.div
              className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent mt-4"
              initial={{ width: 0 }}
              animate={{ width: showReveal ? 200 : 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
          </motion.div>

          {/* Loading indicator */}
          <motion.div
            className="absolute bottom-12 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: showReveal ? 0 : 0.7 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm text-muted-foreground tracking-widest uppercase">Loading</span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
