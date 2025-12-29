import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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

const categories = ['All', 'Bridal', 'Hair Styling', 'Party'];

const portfolioItems = [
  {
    id: 1,
    title: 'Bridal Glam',
    category: 'Bridal',
    image: portfolio1,
  },
  {
    id: 2,
    title: 'Traditional Bridal Braid',
    category: 'Hair Styling',
    image: portfolio2,
  },
  {
    id: 3,
    title: 'Pearl Hair Styling',
    category: 'Hair Styling',
    image: portfolio3,
  },
  {
    id: 4,
    title: 'Pink Bridal Look',
    category: 'Bridal',
    image: portfolio4,
  },
  {
    id: 5,
    title: 'Haldi Ceremony',
    category: 'Party',
    image: portfolio5,
  },
  {
    id: 6,
    title: 'Elegant Reception',
    category: 'Party',
    image: portfolio6,
  },
  {
    id: 7,
    title: 'Pearl Curls',
    category: 'Hair Styling',
    image: portfolio7,
  },
  {
    id: 8,
    title: 'Flower Hair Styling',
    category: 'Hair Styling',
    image: portfolio8,
  },
  {
    id: 9,
    title: 'Rose Bun',
    category: 'Bridal',
    image: portfolio9,
  },
  {
    id: 10,
    title: 'Peach Reception Look',
    category: 'Party',
    image: portfolio10,
  },
  {
    id: 11,
    title: 'Traditional Maroon Bridal',
    category: 'Bridal',
    image: portfolio11,
  },
  {
    id: 12,
    title: 'Floral Reception',
    category: 'Party',
    image: portfolio12,
  },
  {
    id: 13,
    title: 'Mother-Daughter Look',
    category: 'Party',
    image: portfolio13,
  },
  {
    id: 14,
    title: 'Pearl Waves',
    category: 'Hair Styling',
    image: portfolio14,
  },
  {
    id: 15,
    title: 'Lavender Glam',
    category: 'Party',
    image: portfolio15,
  },
  {
    id: 16,
    title: 'Yellow Haldi Bride',
    category: 'Bridal',
    image: portfolio16,
  },
  {
    id: 17,
    title: 'Designer Braid',
    category: 'Hair Styling',
    image: portfolio17,
  },
  {
    id: 18,
    title: 'Before & After Transformation',
    category: 'Bridal',
    image: portfolio18,
  },
  {
    id: 19,
    title: 'White Elegant Bride',
    category: 'Bridal',
    image: portfolio19,
  },
];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredItems =
    activeCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

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

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-[0.2em] font-medium">
            Portfolio
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
            My <span className="text-gradient-gold">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore a curated collection of my makeup artistry, from ethereal bridal looks
            to bold editorial statements.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category)}
              className={`px-6 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'border-border text-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(item.id)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <span className="text-primary text-xs uppercase tracking-wider mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                </div>
                {/* Border accent */}
                <div className="absolute inset-2 border border-primary/0 group-hover:border-primary/50 transition-all duration-400" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 p-2 text-foreground/70 hover:text-foreground transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-card/50 rounded-full text-foreground/70 hover:text-foreground hover:bg-card transition-all"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-card/50 rounded-full text-foreground/70 hover:text-foreground hover:bg-card transition-all"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={filteredItems.find((item) => item.id === selectedImage)?.image}
              alt=""
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
