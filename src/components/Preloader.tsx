import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Realistic water droplet
const WaterDroplet = ({ delay, startX, startY }: { delay: number; startX: number; startY: number }) => {
  const angle = (Math.random() - 0.5) * 60; // Spray angle
  const distance = 80 + Math.random() * 200;
  const endX = startX + Math.sin(angle * Math.PI / 180) * distance;
  const endY = startY + Math.cos(angle * Math.PI / 180) * distance;
  const size = 2 + Math.random() * 6;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size * 1.3,
        background: `radial-gradient(ellipse at 30% 30%, 
          rgba(255,255,255,0.9) 0%, 
          rgba(200,220,255,0.6) 40%, 
          rgba(150,180,220,0.4) 70%, 
          transparent 100%)`,
        boxShadow: '0 0 3px rgba(255,255,255,0.5)',
        left: startX,
        top: startY,
      }}
      initial={{ 
        opacity: 0,
        scale: 0,
        x: 0,
        y: 0,
      }}
      animate={{ 
        opacity: [0, 0.9, 0.7, 0],
        scale: [0, 1.2, 1, 0.5],
        x: endX - startX,
        y: endY - startY,
      }}
      transition={{ 
        duration: 0.8 + Math.random() * 0.4,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    />
  );
};

// Mist particle for fog effect
const MistParticle = ({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle, 
        rgba(220,230,245,0.5) 0%, 
        rgba(200,215,235,0.3) 30%, 
        rgba(180,200,225,0.1) 60%,
        transparent 80%)`,
      filter: 'blur(15px)',
      left: x,
      top: y,
    }}
    initial={{ 
      opacity: 0,
      scale: 0,
    }}
    animate={{ 
      opacity: [0, 0.8, 0.5, 0],
      scale: [0, 2, 3, 4],
      y: [0, 50, 100],
      x: [0, (Math.random() - 0.5) * 100],
    }}
    transition={{ 
      duration: 2.5,
      delay,
      ease: 'easeOut',
    }}
  />
);

// Glass wipe effect
const GlassWipe = ({ isActive }: { isActive: boolean }) => (
  <motion.div
    className="absolute inset-0 pointer-events-none overflow-hidden"
    style={{ zIndex: 50 }}
  >
    {/* Frosted glass layer */}
    <motion.div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(180deg, 
          rgba(180,190,210,0.95) 0%, 
          rgba(160,175,200,0.9) 30%,
          rgba(140,160,190,0.85) 60%,
          rgba(120,145,180,0.9) 100%)`,
        backdropFilter: 'blur(30px)',
      }}
      animate={{
        clipPath: isActive 
          ? 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
          : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      }}
      transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
    />
    
    {/* Water droplets on glass */}
    {!isActive && (
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 3 + Math.random() * 10,
              height: 4 + Math.random() * 15,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(ellipse at 30% 20%, 
                rgba(255,255,255,0.7) 0%, 
                rgba(200,215,235,0.4) 50%, 
                transparent 100%)`,
            }}
            animate={isActive ? {
              y: [0, 500],
              opacity: [1, 0],
            } : {}}
            transition={{
              duration: 1.5,
              delay: i * 0.02,
              ease: 'easeIn',
            }}
          />
        ))}
      </div>
    )}

    {/* Wipe line effect */}
    <motion.div
      className="absolute left-0 right-0 h-4"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
        boxShadow: '0 0 30px rgba(255,255,255,0.5)',
      }}
      initial={{ top: 0, opacity: 0 }}
      animate={{
        top: isActive ? '100%' : 0,
        opacity: isActive ? [0, 1, 1, 0] : 0,
      }}
      transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
    />
  </motion.div>
);

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSpraying, setIsSpraying] = useState(false);
  const [sprayBurst, setSprayBurst] = useState(0);
  const [showWipe, setShowWipe] = useState(false);
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    // Spray bursts
    const spray1 = setTimeout(() => { setIsSpraying(true); setSprayBurst(1); }, 600);
    const spray2 = setTimeout(() => setSprayBurst(2), 1200);
    const spray3 = setTimeout(() => setSprayBurst(3), 1800);
    
    // Start wipe effect
    const wipeTimer = setTimeout(() => setShowWipe(true), 2400);
    
    // Show name
    const nameTimer = setTimeout(() => setShowName(true), 3000);
    
    // Hide preloader
    const loadTimer = setTimeout(() => setIsLoading(false), 4500);

    return () => {
      clearTimeout(spray1);
      clearTimeout(spray2);
      clearTimeout(spray3);
      clearTimeout(wipeTimer);
      clearTimeout(nameTimer);
      clearTimeout(loadTimer);
    };
  }, []);

  // Generate spray droplets for each burst
  const generateDroplets = (burst: number) => {
    if (sprayBurst < burst) return null;
    return [...Array(25)].map((_, i) => (
      <WaterDroplet 
        key={`${burst}-${i}`} 
        delay={i * 0.02} 
        startX={40}
        startY={0}
      />
    ));
  };

  // Generate mist particles
  const generateMist = (burst: number) => {
    if (sprayBurst < burst) return null;
    return [...Array(8)].map((_, i) => (
      <MistParticle
        key={`mist-${burst}-${i}`}
        delay={i * 0.05}
        x={-50 + Math.random() * 100}
        y={30}
        size={80 + Math.random() * 60}
      />
    ));
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f0f1a 100%)',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Subtle ambient gradient */}
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              background: 'radial-gradient(ellipse at 50% 30%, rgba(180,160,200,0.15) 0%, transparent 60%)',
            }}
          />

          {/* Glass wipe effect */}
          <GlassWipe isActive={showWipe} />

          {/* Spray bottle container */}
          <motion.div
            className="absolute flex flex-col items-center"
            style={{ top: '20%', zIndex: 40 }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ 
              opacity: showWipe ? 0 : 1,
              y: 0,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* Spray particles container */}
            <div className="relative" style={{ width: 80, height: 60 }}>
              {generateDroplets(1)}
              {generateDroplets(2)}
              {generateDroplets(3)}
              {generateMist(1)}
              {generateMist(2)}
              {generateMist(3)}
            </div>

            {/* Realistic 3D Spray Bottle */}
            <motion.svg
              width="100"
              height="180"
              viewBox="0 0 100 180"
              className="drop-shadow-2xl"
              animate={isSpraying && !showWipe ? {
                rotate: [0, -8, 0],
              } : {}}
              transition={{
                duration: 0.15,
                repeat: sprayBurst < 3 ? Infinity : 0,
                repeatDelay: 0.45,
              }}
            >
              <defs>
                {/* Bottle body gradient - frosted silver */}
                <linearGradient id="bottleBody" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8a9bb0" />
                  <stop offset="20%" stopColor="#c8d4e3" />
                  <stop offset="40%" stopColor="#e8eef5" />
                  <stop offset="50%" stopColor="#f5f8fc" />
                  <stop offset="60%" stopColor="#e0e8f0" />
                  <stop offset="80%" stopColor="#b0c0d0" />
                  <stop offset="100%" stopColor="#7a8a9a" />
                </linearGradient>
                
                {/* Pump mechanism gradient - dark metal */}
                <linearGradient id="pumpGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3a3a4a" />
                  <stop offset="30%" stopColor="#5a5a6a" />
                  <stop offset="50%" stopColor="#6a6a7a" />
                  <stop offset="70%" stopColor="#5a5a6a" />
                  <stop offset="100%" stopColor="#3a3a4a" />
                </linearGradient>

                {/* Liquid gradient */}
                <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(180,200,220,0.3)" />
                  <stop offset="100%" stopColor="rgba(140,170,200,0.5)" />
                </linearGradient>

                {/* Nozzle gradient */}
                <linearGradient id="nozzleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4a4a5a" />
                  <stop offset="50%" stopColor="#6a6a7a" />
                  <stop offset="100%" stopColor="#3a3a4a" />
                </linearGradient>

                {/* Highlight */}
                <linearGradient id="highlight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>

              {/* Trigger shadow */}
              <ellipse cx="75" cy="50" rx="12" ry="4" fill="rgba(0,0,0,0.3)" />

              {/* Trigger */}
              <motion.path
                d="M 60 30 L 85 30 Q 90 30 90 35 L 90 50 Q 90 55 85 55 L 65 55 Q 60 55 60 50 Z"
                fill="url(#pumpGradient)"
                animate={isSpraying && sprayBurst <= 3 ? {
                  d: [
                    "M 60 30 L 85 30 Q 90 30 90 35 L 90 50 Q 90 55 85 55 L 65 55 Q 60 55 60 50 Z",
                    "M 60 30 L 80 30 Q 85 30 85 35 L 85 50 Q 85 55 80 55 L 65 55 Q 60 55 60 50 Z",
                    "M 60 30 L 85 30 Q 90 30 90 35 L 90 50 Q 90 55 85 55 L 65 55 Q 60 55 60 50 Z",
                  ]
                } : {}}
                transition={{ duration: 0.15, repeat: sprayBurst < 3 ? Infinity : 0, repeatDelay: 0.45 }}
              />

              {/* Nozzle */}
              <rect x="35" y="5" width="30" height="12" rx="3" fill="url(#nozzleGrad)" />
              <ellipse cx="50" cy="5" rx="8" ry="3" fill="#5a5a6a" />
              <circle cx="50" cy="5" r="2" fill="#2a2a3a" />

              {/* Pump neck */}
              <rect x="38" y="17" width="24" height="25" rx="3" fill="url(#pumpGradient)" />
              <rect x="40" y="17" width="2" height="25" fill="rgba(255,255,255,0.2)" />

              {/* Bottle neck */}
              <path
                d="M 35 42 L 35 55 Q 25 58 22 65 L 22 65 L 78 65 Q 75 58 65 55 L 65 42 Z"
                fill="url(#bottleBody)"
              />

              {/* Main bottle body */}
              <path
                d="M 22 65 Q 15 70 15 85 L 15 155 Q 15 170 30 170 L 70 170 Q 85 170 85 155 L 85 85 Q 85 70 78 65 Z"
                fill="url(#bottleBody)"
                stroke="rgba(150,160,175,0.5)"
                strokeWidth="0.5"
              />

              {/* Liquid inside */}
              <path
                d="M 22 90 Q 18 95 18 105 L 18 152 Q 18 165 32 165 L 68 165 Q 82 165 82 152 L 82 105 Q 82 95 78 90 Z"
                fill="url(#liquidGrad)"
              />

              {/* Left highlight */}
              <ellipse cx="28" cy="115" rx="6" ry="35" fill="rgba(255,255,255,0.4)" />
              
              {/* Top highlight */}
              <path
                d="M 30 68 Q 50 63 70 68 L 70 72 Q 50 67 30 72 Z"
                fill="rgba(255,255,255,0.3)"
              />

              {/* Bottom reflection */}
              <ellipse cx="50" cy="165" rx="25" ry="4" fill="rgba(255,255,255,0.15)" />
            </motion.svg>
          </motion.div>

          {/* Name reveal */}
          <motion.div
            className="absolute flex flex-col items-center text-center"
            style={{ zIndex: 60 }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: showName ? 1 : 0,
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            {/* Glow behind text */}
            <motion.div
              className="absolute rounded-full blur-3xl"
              style={{
                width: 300,
                height: 150,
                background: 'radial-gradient(ellipse, rgba(200,180,220,0.3) 0%, transparent 70%)',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: showName ? 1 : 0 }}
              transition={{ duration: 1.5 }}
            />

            {/* Main title */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-wider relative"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#f5f0f8',
                textShadow: '0 0 60px rgba(200,180,220,0.5), 0 2px 10px rgba(0,0,0,0.3)',
              }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ 
                y: showName ? 0 : 30,
                opacity: showName ? 1 : 0,
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Sunita
            </motion.h1>
            
            {/* Decorative line */}
            <motion.div
              className="h-[1px] mt-4 mb-3"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(200,180,220,0.6), transparent)',
              }}
              initial={{ width: 0 }}
              animate={{ width: showName ? 180 : 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />

            {/* Subtitle */}
            <motion.p
              className="text-sm md:text-base tracking-[0.4em] uppercase"
              style={{
                color: 'rgba(200,190,210,0.8)',
                fontFamily: "'Inter', sans-serif",
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: showName ? 0 : 20,
                opacity: showName ? 1 : 0,
              }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Makeup Artist
            </motion.p>

            {/* Sparkle accents */}
            {showName && [...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${20 + (i % 2) * 60}%`,
                  left: i < 2 ? `${-60 - i * 30}px` : 'auto',
                  right: i >= 2 ? `${-60 - (i - 2) * 30}px` : 'auto',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0.6],
                  scale: [0, 1, 0.8],
                }}
                transition={{ 
                  duration: 1.2,
                  delay: 0.8 + i * 0.15,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path
                    d="M12 0L13.5 9L22 12L13.5 15L12 24L10.5 15L2 12L10.5 9Z"
                    fill="rgba(220,200,240,0.7)"
                  />
                </svg>
              </motion.div>
            ))}
          </motion.div>

          {/* Loading text */}
          <motion.div
            className="absolute bottom-10 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: showName ? 0 : 0.6 }}
          >
            <span 
              className="text-xs tracking-[0.3em] uppercase"
              style={{ color: 'rgba(180,175,195,0.7)' }}
            >
              Preparing
            </span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full"
                  style={{ background: 'rgba(200,190,220,0.6)' }}
                  animate={{
                    y: [0, -6, 0],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    delay: i * 0.12,
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
