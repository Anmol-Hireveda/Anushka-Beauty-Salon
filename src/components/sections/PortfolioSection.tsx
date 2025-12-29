import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';

import portfolio40 from '@/assets/portfolio-40.jpg';
import portfolio41 from '@/assets/portfolio-41.jpg';
import portfolio42 from '@/assets/portfolio-42.jpg';
import portfolio43 from '@/assets/portfolio-43.jpg';
import portfolio44 from '@/assets/portfolio-44.jpg';
import portfolio45 from '@/assets/portfolio-45.jpg';
import portfolio46 from '@/assets/portfolio-46.jpg';
import portfolio47 from '@/assets/portfolio-47.jpg';

const allImages = [
  portfolio40, portfolio41, portfolio42, portfolio43,
  portfolio44, portfolio45, portfolio46, portfolio47
];

// Split images into 3 rows
const row1Images = [portfolio40, portfolio41, portfolio42];
const row2Images = [portfolio43, portfolio44, portfolio45];
const row3Images = [portfolio46, portfolio47, portfolio40];

interface MarqueeRowProps {
  images: string[];
  direction: 'left' | 'right';
  speed?: number;
  onImageClick: (image: string) => void;
}

const MarqueeRow = ({ images, direction, speed = 30, onImageClick }: MarqueeRowProps) => {
  const [isPaused, setIsPaused] = useState(false);
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];
  
  return (
    <div 
      className="relative overflow-hidden py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex gap-4"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
        style={{ 
          width: 'fit-content',
          animationPlayState: isPaused ? 'paused' : 'running'
        }}
        {...(isPaused && { animate: undefined })}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-[280px] h-[380px] md:w-[320px] md:h-[420px] rounded-2xl overflow-hidden group cursor-pointer"
            onClick={() => onImageClick(image)}
          >
            <img
              src={image}
              alt={`Portfolio ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Click indicator */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                Click to view
              </div>
            </div>
            
            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            {/* Border glow */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-all duration-500" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    const currentIndex = allImages.indexOf(selectedImage);
    if (direction === 'prev') {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : allImages.length - 1;
      setSelectedImage(allImages[newIndex]);
    } else {
      const newIndex = currentIndex < allImages.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(allImages[newIndex]);
    }
  };

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-gradient-to-b from-background via-card/30 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/5 to-transparent" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10 mb-12" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm uppercase tracking-[0.2em] font-medium">
              Portfolio
            </span>
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>
          
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6">
            My <span className="text-gradient-gold">Work</span>
          </h2>
          
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 120 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"
          />
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore a curated collection of my makeup artistry, from ethereal bridal looks
            to bold editorial statements.
          </p>
        </motion.div>
      </div>

      {/* 3 Marquee Rows with different directions */}
      <div className="space-y-4 relative">
        {/* Row 1 - Scrolling Left */}
        <MarqueeRow images={row1Images} direction="left" speed={40} onImageClick={handleImageClick} />
        
        {/* Row 2 - Scrolling Right (opposite direction) */}
        <MarqueeRow images={row2Images} direction="right" speed={35} onImageClick={handleImageClick} />
        
        {/* Row 3 - Scrolling Left (different speed) */}
        <MarqueeRow images={row3Images} direction="left" speed={45} onImageClick={handleImageClick} />

        {/* Edge fade overlays */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10" />
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              className="absolute top-6 right-6 p-3 bg-card/50 rounded-full text-foreground/70 hover:text-foreground hover:bg-primary/20 transition-all group z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </motion.button>

            {/* Navigation Buttons */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute left-4 md:left-8 p-3 bg-card/50 rounded-full text-foreground/70 hover:text-foreground hover:bg-primary/20 transition-all z-10"
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-4 md:right-8 p-3 bg-card/50 rounded-full text-foreground/70 hover:text-foreground hover:bg-primary/20 transition-all z-10"
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Portfolio"
                className="w-full h-full object-contain"
              />
              
              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-foreground">
                {allImages.indexOf(selectedImage) + 1} / {allImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default PortfolioSection;
