import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Sparkles, Scissors, Palette, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

// Import images
import everydayMakeup from '@/assets/services/everyday-makeup.jpg';
import partyMakeup from '@/assets/services/party-makeup.jpg';
import occasionMakeup from '@/assets/services/occasion-makeup.jpg';
import professionalMakeup from '@/assets/services/professional-makeup.jpg';
import openHair from '@/assets/services/open-hair.jpg';
import updoBun from '@/assets/services/updo-bun.jpg';
import braidedHair from '@/assets/services/braided-hair.jpg';
import ponytail from '@/assets/services/ponytail.jpg';
import facial from '@/assets/services/facial.jpg';
import waxing from '@/assets/services/waxing.jpg';
import threading from '@/assets/services/threading.jpg';
import manicure from '@/assets/services/manicure.jpg';
import bodyPolish from '@/assets/services/body-polish.jpg';
import nailArt from '@/assets/services/nail-art.jpg';
import hairTreatment from '@/assets/services/hair-treatment.jpg';
import hairColor from '@/assets/services/hair-color.jpg';

const makeupCategories = [
  {
    name: 'Everyday Makeup',
    description: 'Perfect for daily wear and casual occasions',
    styles: ['No-Makeup Makeup', 'Light Makeup', 'Natural Makeup', 'Daily Wear Makeup'],
    price: '₹1,500 onwards',
    image: everydayMakeup,
  },
  {
    name: 'Party & Evening',
    description: 'Glamorous looks for parties and special events',
    styles: ['Party Wear Makeup', 'Evening Makeup', 'Glam Makeup', 'Heavy Makeup'],
    price: '₹3,000 onwards',
    image: partyMakeup,
  },
  {
    name: 'Occasion Makeup',
    description: 'Special looks for engagements and receptions',
    styles: ['Engagement Makeup', 'Reception Makeup', 'Traditional Makeup', 'Photoshoot Makeup'],
    price: '₹5,000 onwards',
    image: occasionMakeup,
  },
  {
    name: 'Professional Makeup',
    description: 'HD & Airbrush techniques for flawless finish',
    styles: ['HD Makeup', 'Airbrush Makeup', 'Long-lasting Makeup', 'Camera-ready Makeup'],
    price: '₹6,000 onwards',
    image: professionalMakeup,
  },
];

const hairstyleCategories = [
  {
    name: 'Open & Flowing',
    description: 'Beautiful open hairstyles for any occasion',
    styles: ['Open Hair', 'Straight Hair', 'Curly Hair', 'Wavy Hair', 'Soft Curls', 'Beach Waves'],
    price: '₹800 onwards',
    image: openHair,
  },
  {
    name: 'Updos & Buns',
    description: 'Elegant updo styles for formal events',
    styles: ['Messy Bun', 'Bridal Bun', 'Low Bun', 'High Bun', 'Side Bun', 'Twisted Bun'],
    price: '₹1,200 onwards',
    image: updoBun,
  },
  {
    name: 'Braided Styles',
    description: 'Intricate braided hairstyles',
    styles: ['French Braid', 'Dutch Braid', 'Fishtail Braid', 'Side Braid', 'Waterfall Braid', 'Crown Braid'],
    price: '₹1,000 onwards',
    image: braidedHair,
  },
  {
    name: 'Ponytails & More',
    description: 'Stylish ponytails and combinations',
    styles: ['High Ponytail', 'Low Ponytail', 'Sleek Ponytail', 'Curly Ponytail', 'Braided Ponytail'],
    price: '₹600 onwards',
    image: ponytail,
  },
];

const salonServices = [
  { name: 'Facial & Clean-Up', price: '₹500+', description: 'Deep cleansing and rejuvenation', options: ['Basic Facial', 'Gold Facial', 'Diamond Facial', 'Fruit Facial', 'Clean-Up'], image: facial },
  { name: 'Bleach & Waxing', price: '₹200+', description: 'Smooth and radiant skin', options: ['Face Bleach', 'Full Body Wax', 'Arms Wax', 'Legs Wax', 'Underarms'], image: waxing },
  { name: 'Threading', price: '₹50+', description: 'Precise hair removal', options: ['Eyebrows', 'Upper Lip', 'Forehead', 'Full Face', 'Chin'], image: threading },
  { name: 'Manicure & Pedicure', price: '₹400+', description: 'Complete hand and foot care', options: ['Basic Manicure', 'Spa Manicure', 'Basic Pedicure', 'Spa Pedicure', 'Gel Polish'], image: manicure },
  { name: 'Body Polishing', price: '₹1,500+', description: 'Full body exfoliation and glow', options: ['Fruit Polish', 'Coffee Polish', 'Gold Polish', 'Chocolate Polish'], image: bodyPolish },
  { name: 'Nail Art & Extensions', price: '₹500+', description: 'Creative nail designs', options: ['Simple Nail Art', 'Designer Nail Art', 'Gel Extensions', 'Acrylic Extensions', '3D Nail Art'], image: nailArt },
  { name: 'Hair Protein Treatment', price: '₹2,000+', description: 'Hair repair and nourishment', options: ['Keratin Treatment', 'Protein Pack', 'Hair Spa', 'Deep Conditioning', 'Botox Treatment'], image: hairTreatment },
  { name: 'Global Color', price: '₹3,000+', description: 'Professional hair coloring', options: ['Full Color', 'Root Touch-Up', 'Highlights', 'Balayage', 'Ombre'], image: hairColor },
];

interface SalonService {
  name: string;
  price: string;
  description: string;
  options: string[];
  image: string;
}

interface Category {
  name: string;
  description: string;
  styles: string[];
  price: string;
  image: string;
}

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="relative backdrop-blur-md bg-card/80 border border-border/30 rounded-2xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:border-primary/40 overflow-hidden group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative p-4">
        <h4 className="font-heading text-lg font-semibold text-foreground mb-1">{category.name}</h4>
        <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>
        
        {/* Hover indicator */}
        <div className="flex items-center gap-2 mt-3 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>View Styles</span>
          <Sparkles className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}

interface SalonCardProps {
  service: SalonService;
  onClick: () => void;
}

function SalonCard({ service, onClick }: SalonCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="relative backdrop-blur-md bg-card/80 border border-border/30 rounded-2xl transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:border-primary/40 overflow-hidden group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-32 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative p-3">
        <h4 className="font-heading text-sm font-semibold text-foreground">{service.name}</h4>
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
      <DialogContent className="sm:max-w-lg backdrop-blur-xl bg-gradient-elegant border border-border/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-0 overflow-hidden">
        {/* Header Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={category.image} 
            alt={category.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl backdrop-blur-sm bg-primary/20 border border-primary/30">
                {type === 'makeup' ? (
                  <Sparkles className="w-5 h-5 text-primary" />
                ) : (
                  <Scissors className="w-5 h-5 text-primary" />
                )}
              </div>
              <div>
                <DialogTitle className="font-heading text-xl text-foreground">{category.name}</DialogTitle>
                <DialogDescription className="text-foreground/70">{category.description}</DialogDescription>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          
          <div className="grid grid-cols-2 gap-3">
            {category.styles.map((style) => (
              <div
                key={style}
                className="flex items-center gap-2 text-sm text-foreground/90 p-3 backdrop-blur-md bg-card/50 border border-border/30 rounded-xl"
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
  const [selectedSalon, setSelectedSalon] = useState<SalonService | null>(null);


  return (
    <section id="services" className="py-24 lg:py-32 bg-background relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4" ref={ref}>


        {/* Makeup Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground text-center mb-2 flex items-center justify-center gap-2">
            <Palette className="w-6 h-6 text-primary" />
            Makeup Styles We Offer
          </h3>
          <p className="text-muted-foreground text-center mb-8 text-sm">Click on a category to see all styles</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {makeupCategories.map((category) => (
              <CategoryCard
                key={category.name}
                category={category}
                onClick={() => setSelectedMakeup(category)}
              />
            ))}
          </div>
        </motion.div>

        {/* Hairstyle Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-16"
        >
          <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground text-center mb-2 flex items-center justify-center gap-2">
            <Scissors className="w-6 h-6 text-primary" />
            Hairstyle Options
          </h3>
          <p className="text-muted-foreground text-center mb-8 text-sm">Click on a category to see all styles</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hairstyleCategories.map((category) => (
              <CategoryCard
                key={category.name}
                category={category}
                onClick={() => setSelectedHair(category)}
              />
            ))}
          </div>
        </motion.div>

        {/* Salon Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground text-center mb-8 flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            Salon & Beauty Services
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {salonServices.map((service) => (
              <SalonCard
                key={service.name}
                service={service}
                onClick={() => setSelectedSalon(service)}
              />
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

      {/* Salon Service Modal */}
      <Dialog open={!!selectedSalon} onOpenChange={() => setSelectedSalon(null)}>
        <DialogContent className="sm:max-w-lg backdrop-blur-xl bg-gradient-elegant border border-border/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-0 overflow-hidden">
          {/* Header Image */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={selectedSalon?.image} 
              alt={selectedSalon?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl backdrop-blur-sm bg-primary/20 border border-primary/30">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <DialogTitle className="font-heading text-xl text-foreground">{selectedSalon?.name}</DialogTitle>
                  <DialogDescription className="text-foreground/70">{selectedSalon?.description}</DialogDescription>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            
            <div className="grid grid-cols-2 gap-3">
              {selectedSalon?.options.map((option) => (
                <div
                  key={option}
                  className="flex items-center gap-2 text-sm text-foreground/90 p-3 backdrop-blur-md bg-card/50 border border-border/30 rounded-xl"
                >
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{option}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => {
                setSelectedSalon(null);
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Book This Service
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
