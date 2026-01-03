import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

import portfolio40 from '@/assets/portfolio-40.jpg';
import portfolio41 from '@/assets/portfolio-41.jpg';
import portfolio42 from '@/assets/portfolio-42.jpg';
import portfolio43 from '@/assets/portfolio-43.jpg';
import portfolio44 from '@/assets/portfolio-44.jpg';
import portfolio45 from '@/assets/portfolio-45.jpg';
import portfolio46 from '@/assets/portfolio-46.jpg';
import portfolio47 from '@/assets/portfolio-47.jpg';

const images = [
  portfolio40, portfolio41, portfolio42, portfolio43,
  portfolio44, portfolio45, portfolio46, portfolio47
];

// Starting positions from outside
const startPositions = [
  { x: -600, y: -400 },
  { x: 600, y: -300 },
  { x: -500, y: 400 },
  { x: 500, y: 500 },
  { x: -700, y: 0 },
  { x: 700, y: 100 },
  { x: 0, y: -600 },
  { x: 0, y: 600 },
];

function ImageCard({
  image,
  index,
  scrollYProgress,
  totalImages,
  radius,
  rotationProgress
}: {
  image: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  totalImages: number;
  radius: number;
  rotationProgress: MotionValue<number>;
}) {
  const startPos = startPositions[index];
  const baseAngle = (360 / totalImages) * index;

  // Each image appears at different scroll points (tuned to avoid long blank area)
  const imageStart = 0.0 + (index * 0.03);
  const imageEnd = imageStart + 0.18;

  // Animate from start position to circle position
  const progress = useTransform(scrollYProgress, [imageStart, imageEnd], [0, 1]);
  const opacity = useTransform(scrollYProgress, [imageStart, imageStart + 0.03, imageEnd], [0, 0.6, 1]);
  const scale = useTransform(scrollYProgress, [imageStart, imageEnd], [0.4, 1]);

  // Calculate position based on rotation + base angle
  const x = useTransform([progress, rotationProgress], ([p, r]: number[]) => {
    const currentAngle = baseAngle + (r as number);
    const angleRad = (currentAngle * Math.PI) / 180;
    const targetX = Math.sin(angleRad) * radius;
    return startPos.x * (1 - p) + targetX * p;
  });

  const y = useTransform([progress, rotationProgress], ([p, r]: number[]) => {
    const currentAngle = baseAngle + (r as number);
    const angleRad = (currentAngle * Math.PI) / 180;
    const targetY = -Math.cos(angleRad) * radius * 0.4; // Ellipse effect
    return startPos.y * (1 - p) + targetY * p;
  });

  // Z-index and scale based on position in circle (front = bigger, back = smaller)
  const dynamicScale = useTransform([progress, rotationProgress], ([p, r]: number[]) => {
    const currentAngle = baseAngle + (r as number);
    const angleRad = (currentAngle * Math.PI) / 180;
    const depth = Math.cos(angleRad); // -1 to 1
    const depthScale = 0.7 + (depth + 1) * 0.25; // 0.7 to 1.2
    return p * depthScale + (1 - p) * 0.4;
  });

  const zIndex = useTransform([progress, rotationProgress], ([p, r]: number[]) => {
    const currentAngle = baseAngle + (r as number);
    const angleRad = (currentAngle * Math.PI) / 180;
    return Math.round(Math.cos(angleRad) * 10) + 15;
  });

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 cursor-pointer"
      style={{
        x,
        y,
        opacity,
        scale: dynamicScale,
        zIndex,
        marginLeft: '-70px',
        marginTop: '-100px',
      }}
    >
      <div className="relative overflow-hidden rounded-xl shadow-2xl hover:scale-110 transition-transform duration-300">
        <img
          src={image}
          alt={`Gallery ${index + 1}`}
          className="w-[140px] h-[200px] md:w-[160px] md:h-[220px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 border-2 border-primary/40 rounded-xl" />
      </div>
    </motion.div>
  );
}

export function CircularGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const totalImages = images.length;
  const radius = 300;

  // Rotation starts after images assemble (tighter so no blank gap)
  const rotationProgress = useTransform(scrollYProgress, [0.28, 1], [0, 720]);

  return (
    <section
      ref={containerRef}
      className="relative h-[180vh] md:h-[200vh] bg-background"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[900px] h-[900px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        {/* Section title */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.08], [0, 1]),
            y: useTransform(scrollYProgress, [0, 0.08], [50, 0]),
          }}
          className="text-center z-20 mb-4"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
            Our <span className="text-gradient-gold">Artistry</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Beautiful transformations crafted with love
          </p>
        </motion.div>

        {/* Carousel container */}
        <div className="relative w-full h-[500px] md:h-[550px]">
          <div className="absolute inset-0 flex items-center justify-center">
            {images.map((image, index) => (
              <ImageCard
                key={index}
                image={image}
                index={index}
                scrollYProgress={scrollYProgress}
                totalImages={totalImages}
                radius={radius}
                rotationProgress={rotationProgress}
              />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.05, 0.25], [1, 1, 0]),
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-muted-foreground text-sm flex flex-col items-center gap-2"
          >
            <span>Scroll to reveal</span>
            <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}