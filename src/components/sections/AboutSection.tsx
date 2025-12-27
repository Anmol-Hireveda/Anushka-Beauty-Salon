import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Heart, Palette, Users } from 'lucide-react';

const features = [
  {
    icon: Palette,
    title: '12+ Years Experience',
    description: 'Over a decade of expertise in bridal, party, and all types of makeup and beauty services.',
  },
  {
    icon: Heart,
    title: 'Personalized Care',
    description: 'Every client receives customized attention with premium products for the perfect look.',
  },
  {
    icon: Award,
    title: 'Expert Team',
    description: 'Led by Sunita Prajapati with skilled hairstylists Anushka & Rajshree Prajapati.',
  },
  {
    icon: Users,
    title: 'Complete Solutions',
    description: 'Makeup, hair styling, skin treatments, and nail art - all under one roof.',
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 lg:py-32 bg-gradient-elegant relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
              {/* Main image */}
              <div className="absolute inset-4 lg:inset-8 overflow-hidden rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1988&auto=format&fit=crop"
                  alt="Professional makeup artist at work"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute inset-0 border border-primary/30 rounded-sm" />
              {/* Accent square */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-primary/50"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              />
              {/* Experience badge */}
              <motion.div
                className="absolute -top-6 -right-6 lg:-right-12 bg-primary text-primary-foreground p-6 shadow-gold"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="text-center">
                  <div className="font-heading text-4xl font-bold">12+</div>
                  <div className="text-xs uppercase tracking-wider">Years</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <span className="text-primary text-sm uppercase tracking-[0.2em] font-medium">
              About Us
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
              Where Beauty Meets
              <span className="text-gradient-gold"> Confidence</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Welcome to Anushka Beauty Salon! With over 12 years of experience in the beauty industry, 
              we've dedicated ourselves to helping clients look and feel their absolute best. From intimate 
              weddings to grand celebrations, we bring passion and precision to every service.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our expert team specializes in bridal & party makeup, hair styling & coloring, 
              facials & skin treatments, and nail art. Contact and DM us for your special occasion 
              to make it more special with the soft glam look!
            </p>

            {/* Features grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
