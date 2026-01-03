import { useMemo } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
  MotionValue,
} from 'framer-motion';

import portfolio40 from '@/assets/portfolio-40.jpg';
import portfolio41 from '@/assets/portfolio-41.jpg';
import portfolio42 from '@/assets/portfolio-42.jpg';
import portfolio43 from '@/assets/portfolio-43.jpg';
import portfolio44 from '@/assets/portfolio-44.jpg';
import portfolio45 from '@/assets/portfolio-45.jpg';
import portfolio46 from '@/assets/portfolio-46.jpg';
import portfolio47 from '@/assets/portfolio-47.jpg';

const images = [
  portfolio40,
  portfolio41,
  portfolio42,
  portfolio43,
  portfolio44,
  portfolio45,
  portfolio46,
  portfolio47,
];

function ImageCard({
  image,
  index,
  totalImages,
  radius,
  rotation,
}: {
  image: string;
  index: number;
  totalImages: number;
  radius: number;
  rotation: MotionValue<number>;
}) {
  const baseAngle = (360 / totalImages) * index;

  // Position based on rotation + base angle
  const x = useTransform(rotation, (r) => {
    const currentAngle = baseAngle + r;
    const angleRad = (currentAngle * Math.PI) / 180;
    return Math.sin(angleRad) * radius;
  });

  const y = useTransform(rotation, (r) => {
    const currentAngle = baseAngle + r;
    const angleRad = (currentAngle * Math.PI) / 180;
    // Ellipse effect for depth
    return -Math.cos(angleRad) * radius * 0.42;
  });

  // Depth-based scale
  const dynamicScale = useTransform(rotation, (r) => {
    const currentAngle = baseAngle + r;
    const angleRad = (currentAngle * Math.PI) / 180;
    const depth = Math.cos(angleRad); // -1..1
    return 0.78 + (depth + 1) * 0.18; // ~0.78..1.14
  });

  const zIndex = useTransform(rotation, (r) => {
    const currentAngle = baseAngle + r;
    const angleRad = (currentAngle * Math.PI) / 180;
    return Math.round(Math.cos(angleRad) * 10) + 20;
  });

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        x,
        y,
        scale: dynamicScale,
        zIndex,
        marginLeft: '-70px',
        marginTop: '-100px',
      }}
    >
      <div className="relative overflow-hidden rounded-xl shadow-elegant hover:scale-110 transition-transform duration-300">
        <img
          src={image}
          alt={`Makeup artistry gallery image ${index + 1}`}
          className="w-[140px] h-[200px] md:w-[170px] md:h-[240px] object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <div className="absolute inset-0 border-2 border-primary/30 rounded-xl" />
      </div>
    </motion.div>
  );
}

export function CircularGallery() {
  const totalImages = images.length;
  const radius = 320;

  // Continuous rotation (fixes the "images not moving" issue)
  const rotation = useMotionValue(0);

  useAnimationFrame((t) => {
    // 360deg per ~28s
    rotation.set((t / 28000) * 360);
  });

  const cards = useMemo(
    () =>
      images.map((image, index) => (
        <ImageCard
          key={image}
          image={image}
          index={index}
          totalImages={totalImages}
          radius={radius}
          rotation={rotation}
        />
      )),
    [radius, rotation, totalImages]
  );

  return (
    <section
      aria-labelledby="artistry"
      className="relative py-24 lg:py-32 bg-background"
    >
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <h2
            id="artistry"
            className="font-heading text-4xl md:text-5xl text-foreground mb-4"
          >
            Our <span className="text-gradient-gold">Artistry</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Beautiful transformations crafted with love
          </p>
        </header>

        <div className="relative w-full h-[520px] md:h-[600px] flex items-center justify-center">
          {/* Background glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[900px] h-[900px] rounded-full bg-primary/5 blur-3xl" />
          </div>

          {/* Cards */}
          <div className="relative w-full h-full">{cards}</div>
        </div>
      </div>
    </section>
  );
}
