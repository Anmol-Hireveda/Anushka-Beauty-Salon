import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

// Import 3D realistic icons
import lipstickIcon from '@/assets/icons/lipstick-3d.png';
import perfumeIcon from '@/assets/icons/perfume-3d.png';
import mascaraIcon from '@/assets/icons/mascara-3d.png';
import brushIcon from '@/assets/icons/brush-3d.png';
import mirrorIcon from '@/assets/icons/mirror-3d.png';
import eyeshadowIcon from '@/assets/icons/eyeshadow-3d.png';

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

// Spray particle component for perfume
const SprayParticle = ({ delay, angle }: { delay: number; angle: number }) => {
  const radians = (angle * Math.PI) / 180;
  const distance = 30 + Math.random() * 20;
  const endX = Math.cos(radians) * distance;
  const endY = Math.sin(radians) * distance;
  
  return (
    <motion.div
      className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
      style={{ left: '50%', top: '0' }}
      initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        x: [0, endX * 0.5, endX],
        y: [0, endY * 0.5, endY],
        scale: [0, 1, 0.3],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        delay,
        ease: 'easeOut',
      }}
    />
  );
};

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

  // Generate spray particles with different angles
  const sprayParticles = Array.from({ length: 12 }, (_, i) => ({
    delay: i * 0.12,
    angle: -120 + (i * 5) + Math.random() * 10,
  }));

  // Icon data for mapping
  const makeupIcons = [
    { src: brushIcon, alt: 'Makeup Brush', delay: 0.2, rotation: [-8, 8] },
    { src: lipstickIcon, alt: 'Lipstick', delay: 0, rotation: [-5, 5] },
    { src: mirrorIcon, alt: 'Mirror', delay: 0.4, rotation: [-6, 6] },
    { src: perfumeIcon, alt: 'Perfume', delay: 0.6, rotation: [-3, 3], hasSpray: true },
    { src: eyeshadowIcon, alt: 'Eyeshadow Palette', delay: 0.8, rotation: [-4, 4] },
    { src: mascaraIcon, alt: 'Mascara', delay: 1, rotation: [-10, 10] },
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
            <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center max-w-xl px-4">
              {makeupIcons.map((icon, index) => (
                <motion.div
                  key={icon.alt}
                  initial={{ scale: 0, y: 30, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    type: 'spring', 
                    delay: icon.delay,
                    stiffness: 200 
                  }}
                  className="relative"
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                    animate={{ 
                      scale: [1, 1.3, 1], 
                      opacity: [0.3, 0.6, 0.3] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: 'easeInOut',
                      delay: index * 0.2 
                    }}
                  />
                  
                  {/* Spray effect for perfume */}
                  {icon.hasSpray && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                      {sprayParticles.map((particle, i) => (
                        <SprayParticle key={i} {...particle} />
                      ))}
                    </div>
                  )}
                  
                  {/* Icon image */}
                  <motion.img
                    src={icon.src}
                    alt={icon.alt}
                    className="relative z-10 w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-lg"
                    animate={{ 
                      rotate: [0, icon.rotation[0], icon.rotation[1], 0],
                      y: [0, -3, 0],
                    }}
                    transition={{ 
                      duration: 3 + index * 0.3, 
                      repeat: Infinity, 
                      ease: 'easeInOut',
                      delay: index * 0.15
                    }}
                  />
                </motion.div>
              ))}
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
