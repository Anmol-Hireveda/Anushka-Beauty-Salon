import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Crown, Sparkles, Star, Scissors, Palette, Heart } from 'lucide-react';
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

const makeupTypes = [
  'No-Makeup Makeup',
  'Light Makeup',
  'Natural Makeup',
  'Daily Wear Makeup',
  'Party Wear Makeup',
  'Evening Makeup',
  'Glam Makeup',
  'Heavy Makeup',
  'Engagement Makeup',
  'Reception Makeup',
  'HD Makeup',
  'Airbrush Makeup',
];

const hairstyles = [
  'Open Hair',
  'Straight Hair',
  'Curly/Wavy Hair',
  'Ponytail',
  'Bun Hairstyles',
  'Braided Hairstyles',
  'French/Dutch Braid',
  'Fishtail Braid',
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

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

        {/* Makeup Types */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="font-heading text-2xl font-semibold text-foreground text-center mb-6 flex items-center justify-center gap-2">
            <Palette className="w-6 h-6 text-primary" />
            Makeup Styles We Offer
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {makeupTypes.map((type) => (
              <span
                key={type}
                className="px-4 py-2 bg-card/50 border border-border text-foreground/80 text-sm hover:border-primary/50 transition-colors"
              >
                {type}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Hairstyles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-12"
        >
          <h3 className="font-heading text-2xl font-semibold text-foreground text-center mb-6 flex items-center justify-center gap-2">
            <Scissors className="w-6 h-6 text-primary" />
            Hairstyle Options
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {hairstyles.map((style) => (
              <span
                key={style}
                className="px-4 py-2 bg-card/50 border border-border text-foreground/80 text-sm hover:border-primary/50 transition-colors"
              >
                {style}
              </span>
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
                className="flex items-center justify-between p-4 bg-card/50 border border-border"
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