import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Sparkles, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

import portfolio1 from '@/assets/portfolio-1.jpg';
import portfolio2 from '@/assets/portfolio-2.jpg';
import portfolio3 from '@/assets/portfolio-3.jpg';
import portfolio4 from '@/assets/portfolio-4.jpg';
import portfolio5 from '@/assets/portfolio-5.jpg';
import portfolio6 from '@/assets/portfolio-6.jpg';
import portfolio7 from '@/assets/portfolio-7.jpg';
import portfolio8 from '@/assets/portfolio-8.jpg';
import portfolio9 from '@/assets/portfolio-9.jpg';
import portfolio10 from '@/assets/portfolio-10.jpg';
import portfolio11 from '@/assets/portfolio-11.jpg';
import portfolio12 from '@/assets/portfolio-12.jpg';
import portfolio13 from '@/assets/portfolio-13.jpg';
import portfolio14 from '@/assets/portfolio-14.jpg';
import portfolio15 from '@/assets/portfolio-15.jpg';
import portfolio16 from '@/assets/portfolio-16.jpg';
import portfolio17 from '@/assets/portfolio-17.jpg';
import portfolio18 from '@/assets/portfolio-18.jpg';
import portfolio19 from '@/assets/portfolio-19.jpg';
import portfolio20 from '@/assets/portfolio-20.jpg';
import portfolio21 from '@/assets/portfolio-21.jpg';
import portfolio22 from '@/assets/portfolio-22.jpg';
import portfolio23 from '@/assets/portfolio-23.jpg';
import portfolio24 from '@/assets/portfolio-24.jpg';
import portfolio25 from '@/assets/portfolio-25.jpg';
import portfolio26 from '@/assets/portfolio-26.jpg';
import portfolio27 from '@/assets/portfolio-27.jpg';
import portfolio28 from '@/assets/portfolio-28.jpg';
import portfolio29 from '@/assets/portfolio-29.jpg';
import portfolio30 from '@/assets/portfolio-30.jpg';
import portfolio31 from '@/assets/portfolio-31.jpg';
import portfolio32 from '@/assets/portfolio-32.jpg';
import portfolio33 from '@/assets/portfolio-33.jpg';
import portfolio34 from '@/assets/portfolio-34.jpg';
import portfolio35 from '@/assets/portfolio-35.jpg';
import portfolio36 from '@/assets/portfolio-36.jpg';
import portfolio37 from '@/assets/portfolio-37.jpg';
import portfolio38 from '@/assets/portfolio-38.jpg';
import portfolio39 from '@/assets/portfolio-39.jpg';

const categories = ['All', 'Bridal', 'Hair Styling', 'Party'];

const portfolioItems = [
  { id: 1, title: 'Bridal Glam', category: 'Bridal', image: portfolio1 },
  { id: 2, title: 'Traditional Bridal Braid', category: 'Hair Styling', image: portfolio2 },
  { id: 3, title: 'Pearl Hair Styling', category: 'Hair Styling', image: portfolio3 },
  { id: 4, title: 'Pink Bridal Look', category: 'Bridal', image: portfolio4 },
  { id: 5, title: 'Haldi Ceremony', category: 'Party', image: portfolio5 },
  { id: 6, title: 'Elegant Reception', category: 'Party', image: portfolio6 },
  { id: 7, title: 'Pearl Curls', category: 'Hair Styling', image: portfolio7 },
  { id: 8, title: 'Flower Hair Styling', category: 'Hair Styling', image: portfolio8 },
  { id: 9, title: 'Rose Bun', category: 'Bridal', image: portfolio9 },
  { id: 10, title: 'Peach Reception Look', category: 'Party', image: portfolio10 },
  { id: 11, title: 'Traditional Maroon Bridal', category: 'Bridal', image: portfolio11 },
  { id: 12, title: 'Floral Reception', category: 'Party', image: portfolio12 },
  { id: 13, title: 'Mother-Daughter Look', category: 'Party', image: portfolio13 },
  { id: 14, title: 'Pearl Waves', category: 'Hair Styling', image: portfolio14 },
  { id: 15, title: 'Lavender Glam', category: 'Party', image: portfolio15 },
  { id: 16, title: 'Yellow Haldi Bride', category: 'Bridal', image: portfolio16 },
  { id: 17, title: 'Designer Braid', category: 'Hair Styling', image: portfolio17 },
  { id: 18, title: 'Before & After Transformation', category: 'Bridal', image: portfolio18 },
  { id: 19, title: 'White Elegant Bride', category: 'Bridal', image: portfolio19 },
  { id: 20, title: 'Pink Traditional Bride', category: 'Bridal', image: portfolio20 },
  { id: 21, title: 'Red Bridal Look', category: 'Bridal', image: portfolio21 },
  { id: 22, title: 'Classic Red Bride', category: 'Bridal', image: portfolio22 },
  { id: 23, title: 'Jasmine Hair Styling', category: 'Hair Styling', image: portfolio23 },
  { id: 24, title: 'Golden Chain Curls', category: 'Hair Styling', image: portfolio24 },
  { id: 25, title: 'Rose Waves', category: 'Hair Styling', image: portfolio25 },
  { id: 26, title: 'Royal Pink Bride', category: 'Bridal', image: portfolio26 },
  { id: 27, title: 'Silver Elegance', category: 'Party', image: portfolio27 },
  { id: 28, title: 'Yellow Mehendi Look', category: 'Party', image: portfolio28 },
  { id: 29, title: 'Purple Floral Bun', category: 'Hair Styling', image: portfolio29 },
  { id: 30, title: 'Makeup in Progress', category: 'Bridal', image: portfolio30 },
  { id: 31, title: 'Floral Saree Look', category: 'Party', image: portfolio31 },
  { id: 32, title: 'White Silver Glam', category: 'Party', image: portfolio32 },
  { id: 33, title: 'Magenta Bridal', category: 'Bridal', image: portfolio33 },
  { id: 34, title: 'Lavender Bun Style', category: 'Hair Styling', image: portfolio34 },
  { id: 35, title: 'Braided Straight Style', category: 'Hair Styling', image: portfolio35 },
  { id: 36, title: 'Red Rose Bun', category: 'Hair Styling', image: portfolio36 },
  { id: 37, title: 'Golden Pearl Curls', category: 'Hair Styling', image: portfolio37 },
  { id: 38, title: 'Pearl Braid Styling', category: 'Hair Styling', image: portfolio38 },
  { id: 39, title: 'Rose Bouquet Bun', category: 'Hair Styling', image: portfolio39 },
];

const INITIAL_VISIBLE = 12;

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredItems =
    activeCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_VISIBLE);
  };

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, filteredItems.length));
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedImage);
    if (direction === 'prev') {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
      setSelectedImage(filteredItems[newIndex].id);
    } else {
      const newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(filteredItems[newIndex].id);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-gradient-to-b from-background via-card/30 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/5 to-transparent" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-20"
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

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            >
              <Button
                variant={activeCategory === category ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(category)}
                className={`px-8 py-6 text-sm font-medium tracking-wide transition-all duration-500 ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground shadow-gold scale-105'
                    : 'border-border/50 text-foreground hover:border-primary hover:text-primary hover:bg-primary/5 hover:scale-105'
                }`}
              >
                {category}
                {activeCategory === category && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary -z-10 rounded-md"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Gallery Grid - Masonry Style */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                layout
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setSelectedImage(item.id)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover"
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                  />
                  
                  {/* Gradient Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
                  />

                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                  </div>

                  {/* Content Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col justify-end p-5"
                  >
                    {/* Category Badge */}
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="inline-flex items-center gap-1 text-primary text-xs uppercase tracking-wider mb-2 font-medium"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      {item.category}
                    </motion.span>
                    
                    {/* Title */}
                    <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground leading-tight">
                      {item.title}
                    </h3>

                    {/* View Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="mt-3 inline-flex items-center gap-2 text-primary text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </motion.div>
                  </motion.div>

                  {/* Border Glow Effect */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/50 transition-all duration-500" />
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_30px_rgba(var(--primary),0.2)]" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-16"
          >
            <Button
              onClick={loadMore}
              size="lg"
              className="px-12 py-7 bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 rounded-full group"
            >
              <span className="mr-2">Load More</span>
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.span>
            </Button>
          </motion.div>
        )}

        {/* Items Counter */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-muted-foreground mt-8 text-sm"
        >
          Showing {visibleItems.length} of {filteredItems.length} items
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="absolute top-6 right-6 p-3 bg-card/50 rounded-full text-foreground/70 hover:text-foreground hover:bg-primary/20 transition-all group"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </motion.button>

            {/* Navigation Buttons */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 bg-card/50 rounded-full text-foreground/70 hover:text-foreground hover:bg-primary/20 transition-all hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 bg-card/50 rounded-full text-foreground/70 hover:text-foreground hover:bg-primary/20 transition-all hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
            >
              <ChevronRight className="w-8 h-8" />
            </motion.button>

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredItems.find((item) => item.id === selectedImage)?.image}
                alt=""
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
              
              {/* Image Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent rounded-b-2xl"
              >
                <span className="text-primary text-xs uppercase tracking-wider">
                  {filteredItems.find((item) => item.id === selectedImage)?.category}
                </span>
                <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mt-1">
                  {filteredItems.find((item) => item.id === selectedImage)?.title}
                </h3>
              </motion.div>
            </motion.div>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-card/50 rounded-full text-sm text-foreground/70"
            >
              {filteredItems.findIndex((item) => item.id === selectedImage) + 1} / {filteredItems.length}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
