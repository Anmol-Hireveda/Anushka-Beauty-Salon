import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Check, Crown, Sparkles, Star, Scissors, Palette, Heart, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Crown,
    name: 'Bridal Makeup',
    description: 'Complete bridal package with HD/Airbrush makeup, hairstyling, and draping assistance for your big day.',
    price: '₹15,000 onwards',
    duration: '3-4 hours',
    features: [
      'Pre-bridal consultation',
      'HD/Airbrush makeup',
      'Hairstyling included',
      'Saree/Lehenga draping',
      'Touch-up kit',
      'False lashes',
    ],
    featured: true,
  },
  {
    icon: Sparkles,
    name: 'Party & Glam Makeup',
    description: 'Glamorous looks for parties, receptions, sangeet and special occasions. From soft glam to heavy makeup.',
    price: '₹4,000 onwards',
    duration: '1.5-2 hours',
    features: [
      'Natural/Light Makeup',
      'Party Wear Makeup',
      'Evening/Glam Makeup',
      'Photoshoot Makeup',
      'Traditional Makeup',
      'False lashes included',
    ],
    featured: false,
  },
  {
    icon: Scissors,
    name: 'Hair Services',
    description: 'Complete hair solutions from cuts to treatments. Expert styling for all occasions.',
    price: '₹500 onwards',
    duration: '1-3 hours',
    features: [
      'Hair Cut & Styling',
      'Hair Coloring & Highlights',
      'Keratin Treatment',
      'Smoothening & Rebonding',
      'Hair Spa & Botox',
      'Bridal Hairstyles',
    ],
    featured: false,
  },
];

const makeupCategories = [
  {
    name: 'Everyday Makeup',
    description: 'Perfect for daily wear and casual occasions',
    styles: ['No-Makeup Makeup', 'Light Makeup', 'Natural Makeup', 'Daily Wear Makeup'],
    price: '₹1,500 onwards',
  },
  {
    name: 'Party & Evening',
    description: 'Glamorous looks for parties and special events',
    styles: ['Party Wear Makeup', 'Evening Makeup', 'Glam Makeup', 'Heavy Makeup'],
    price: '₹3,000 onwards',
  },
  {
    name: 'Occasion Makeup',
    description: 'Special looks for engagements and receptions',
    styles: ['Engagement Makeup', 'Reception Makeup', 'Traditional Makeup', 'Photoshoot Makeup'],
    price: '₹5,000 onwards',
  },
  {
    name: 'Professional Makeup',
    description: 'HD & Airbrush techniques for flawless finish',
    styles: ['HD Makeup', 'Airbrush Makeup', 'Long-lasting Makeup', 'Camera-ready Makeup'],
    price: '₹6,000 onwards',
  },
];

const hairstyleCategories = [
  {
    name: 'Open & Flowing',
    description: 'Beautiful open hairstyles for any occasion',
    styles: ['Open Hair', 'Straight Hair', 'Curly Hair', 'Wavy Hair', 'Soft Curls', 'Beach Waves'],
    price: '₹800 onwards',
  },
  {
    name: 'Updos & Buns',
    description: 'Elegant updo styles for formal events',
    styles: ['Messy Bun', 'Bridal Bun', 'Low Bun', 'High Bun', 'Side Bun', 'Twisted Bun'],
    price: '₹1,200 onwards',
  },
  {
    name: 'Braided Styles',
    description: 'Intricate braided hairstyles',
    styles: ['French Braid', 'Dutch Braid', 'Fishtail Braid', 'Side Braid', 'Waterfall Braid', 'Crown Braid'],
    price: '₹1,000 onwards',
  },
  {
    name: 'Ponytails & More',
    description: 'Stylish ponytails and combinations',
    styles: ['High Ponytail', 'Low Ponytail', 'Sleek Ponytail', 'Curly Ponytail', 'Braided Ponytail'],
    price: '₹600 onwards',
  },
];

const salonServices = [
  { name: 'Facial & Clean-Up', price: '₹500+' },
  { name: 'Bleach & Waxing', price: '₹200+' },
  { name: 'Threading', price: '₹50+' },
  { name: 'Manicure & Pedicure', price: '₹400+' },
  { name: 'Body Polishing', price: '₹1,500+' },
  { name: 'Nail Art & Extensions', price: '₹500+' },
  { name: 'Hair Protein Treatment', price: '₹2,000+' },
  { name: 'Global Color', price: '₹3,000+' },
];

interface CategoryCardProps {
  category: {
    name: string;
    description: string;
    styles: string[];
    price: string;
  };
  isExpanded: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
}

function CategoryCard({ category, isExpanded, onToggle, icon }: CategoryCardProps) {
  return (
    <motion.div
      layout
      className={`bg-card/50 border transition-all duration-300 cursor-pointer overflow-hidden ${
        isExpanded ? 'border-primary/50 shadow-gold' : 'border-border hover:border-primary/30'
      }`}
      onClick={onToggle}
    >
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-sm ${isExpanded ? 'bg-primary/20' : 'bg-secondary'}`}>
              {icon}
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold text-foreground">{category.name}</h4>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className={`w-5 h-5 ${isExpanded ? 'text-primary' : 'text-muted-foreground'}`} />
          </motion.div>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-5 pb-5 border-t border-border/50">
              <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Starting from</span>
                  <span className="font-heading text-xl font-semibold text-primary">{category.price}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {category.styles.map((style) => (
                    <div
                      key={style}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{style}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                  size="sm"
                >
                  Book This Style
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedMakeup, setExpandedMakeup] = useState<number | null>(null);
  const [expandedHair, setExpandedHair] = useState<number | null>(null);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 lg:py-32 bg-gradient-elegant relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-[0.2em] font-medium">
            Our Services
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
            Complete Beauty <span className="text-gradient-gold">Solutions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From makeup to hair styling, skin treatments to nail art - we offer complete beauty 
            services to make your special occasions unforgettable.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className={`relative group ${
                service.featured ? 'md:-mt-4 md:mb-4' : ''
              }`}
            >
              {service.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs uppercase tracking-wider px-4 py-1 font-medium z-10">
                  Most Popular
                </div>
              )}
              <div
                className={`h-full p-8 border transition-all duration-400 ${
                  service.featured
                    ? 'bg-card border-primary/50 shadow-gold'
                    : 'bg-card/50 border-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-3 rounded-sm ${
                      service.featured ? 'bg-primary/20' : 'bg-secondary'
                    }`}
                  >
                    <service.icon
                      className={`w-6 h-6 ${
                        service.featured ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground">
                      {service.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{service.duration}</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{service.description}</p>

                <div className="mb-6">
                  <span className="font-heading text-3xl font-semibold text-primary">
                    {service.price}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={scrollToContact}
                  className={`w-full ${
                    service.featured
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  Book Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Makeup Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="font-heading text-2xl font-semibold text-foreground text-center mb-2 flex items-center justify-center gap-2">
            <Palette className="w-6 h-6 text-primary" />
            Makeup Styles We Offer
          </h3>
          <p className="text-muted-foreground text-center mb-6 text-sm">Click on a category to see all styles</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {makeupCategories.map((category, index) => (
              <CategoryCard
                key={category.name}
                category={category}
                isExpanded={expandedMakeup === index}
                onToggle={() => setExpandedMakeup(expandedMakeup === index ? null : index)}
                icon={<Sparkles className={`w-5 h-5 ${expandedMakeup === index ? 'text-primary' : 'text-muted-foreground'}`} />}
              />
            ))}
          </div>
        </motion.div>

        {/* Hairstyle Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-12"
        >
          <h3 className="font-heading text-2xl font-semibold text-foreground text-center mb-2 flex items-center justify-center gap-2">
            <Scissors className="w-6 h-6 text-primary" />
            Hairstyle Options
          </h3>
          <p className="text-muted-foreground text-center mb-6 text-sm">Click on a category to see all styles</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hairstyleCategories.map((category, index) => (
              <CategoryCard
                key={category.name}
                category={category}
                isExpanded={expandedHair === index}
                onToggle={() => setExpandedHair(expandedHair === index ? null : index)}
                icon={<Scissors className={`w-5 h-5 ${expandedHair === index ? 'text-primary' : 'text-muted-foreground'}`} />}
              />
            ))}
          </div>
        </motion.div>

        {/* Salon Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="font-heading text-2xl font-semibold text-foreground text-center mb-8 flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            Salon & Beauty Services
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {salonServices.map((addon) => (
              <div
                key={addon.name}
                className="flex items-center justify-between p-4 bg-card/50 border border-border hover:border-primary/30 transition-colors"
              >
                <span className="text-foreground">{addon.name}</span>
                <span className="text-primary font-semibold">{addon.price}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}