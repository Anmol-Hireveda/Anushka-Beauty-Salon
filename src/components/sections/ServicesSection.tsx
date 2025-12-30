import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Crown, Sparkles, Scissors, Palette, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

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

interface Category {
  name: string;
  description: string;
  styles: string[];
  price: string;
}

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
  icon: React.ReactNode;
}

function CategoryCard({ category, onClick, icon }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="relative backdrop-blur-md bg-white/5 dark:bg-white/[0.03] border border-white/10 dark:border-white/5 rounded-2xl transition-all duration-300 cursor-pointer p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] hover:shadow-[0_16px_48px_0_rgba(212,175,55,0.12)] hover:border-primary/30 hover:bg-white/10 dark:hover:bg-white/[0.06] overflow-hidden group"
      onClick={onClick}
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
      <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/10">
          {icon}
        </div>
        <div>
          <h4 className="font-heading text-lg font-semibold text-foreground">{category.name}</h4>
          <p className="text-sm text-muted-foreground">{category.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

interface ServiceModalProps {
  category: Category | null;
  isOpen: boolean;
  onClose: () => void;
  type: 'makeup' | 'hair';
}

function ServiceModal({ category, isOpen, onClose, type }: ServiceModalProps) {
  if (!category) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-primary/20">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-sm bg-primary/20">
              {type === 'makeup' ? (
                <Sparkles className="w-5 h-5 text-primary" />
              ) : (
                <Scissors className="w-5 h-5 text-primary" />
              )}
            </div>
            <DialogTitle className="font-heading text-xl">{category.name}</DialogTitle>
          </div>
          <DialogDescription>{category.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">

          <div className="grid grid-cols-2 gap-3">
            {category.styles.map((style) => (
              <div
                key={style}
                className="flex items-center gap-2 text-sm text-foreground/80 p-2 bg-secondary/50 rounded-sm"
              >
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{style}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={() => {
              onClose();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Book This Style
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedMakeup, setSelectedMakeup] = useState<Category | null>(null);
  const [selectedHair, setSelectedHair] = useState<Category | null>(null);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 lg:py-32 bg-gradient-elegant relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4" ref={ref}>

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
            {makeupCategories.map((category) => (
              <CategoryCard
                key={category.name}
                category={category}
                onClick={() => setSelectedMakeup(category)}
                icon={<Sparkles className="w-5 h-5 text-muted-foreground" />}
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
            {hairstyleCategories.map((category) => (
              <CategoryCard
                key={category.name}
                category={category}
                onClick={() => setSelectedHair(category)}
                icon={<Scissors className="w-5 h-5 text-muted-foreground" />}
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
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {salonServices.map((addon) => (
              <div
                key={addon.name}
                className="flex items-center justify-center p-4 bg-card/50 border border-border hover:border-primary/30 transition-colors text-center"
              >
                <span className="text-foreground">{addon.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <ServiceModal
        category={selectedMakeup}
        isOpen={!!selectedMakeup}
        onClose={() => setSelectedMakeup(null)}
        type="makeup"
      />
      <ServiceModal
        category={selectedHair}
        isOpen={!!selectedHair}
        onClose={() => setSelectedHair(null)}
        type="hair"
      />
    </section>
  );
}