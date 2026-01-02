import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
}

const colors = [
  'hsl(var(--primary))',
  'hsl(var(--primary) / 0.8)',
  'hsl(var(--primary) / 0.6)',
  '#FFD700',
  '#FFC0CB',
  '#FF69B4',
  '#E6E6FA',
];

const CursorGlitter = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);

  const createParticle = useCallback((x: number, y: number) => {
    const particleCount = 3;
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: Date.now() + Math.random(),
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
      });
    }
    
    return newParticles;
  }, []);

  useEffect(() => {
    let lastTime = 0;
    const throttleMs = 50;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isEnabled) return;
      
      const now = Date.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      const newParticles = createParticle(e.clientX, e.clientY);
      setParticles(prev => [...prev.slice(-30), ...newParticles]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [createParticle, isEnabled]);

  // Cleanup old particles
  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticles(prev => prev.slice(-20));
    }, 500);
    
    return () => clearInterval(cleanup);
  }, []);

  // Disable on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsEnabled(window.innerWidth > 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            initial={{ 
              x: particle.x, 
              y: particle.y, 
              scale: 1, 
              opacity: 1,
              rotate: particle.rotation 
            }}
            animate={{ 
              y: particle.y + 50 + Math.random() * 30,
              x: particle.x + (Math.random() - 0.5) * 40,
              scale: 0,
              opacity: 0,
              rotate: particle.rotation + 180,
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: 1 + Math.random() * 0.5,
              ease: 'easeOut',
            }}
            style={{
              width: particle.size,
              height: particle.size,
            }}
          >
            {/* Glitter shape - alternating between star and circle */}
            {Math.random() > 0.5 ? (
              <svg viewBox="0 0 24 24" className="w-full h-full" style={{ filter: 'drop-shadow(0 0 3px currentColor)' }}>
                <path
                  d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z"
                  fill={particle.color}
                />
              </svg>
            ) : (
              <div 
                className="w-full h-full rounded-full"
                style={{ 
                  backgroundColor: particle.color,
                  boxShadow: `0 0 ${particle.size}px ${particle.color}`,
                }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorGlitter;
