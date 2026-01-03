import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroVideo from '@/assets/hero-video.mp4';

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0">
        {/* Fallback Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560577291-5dd4f3fa1c68?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        
        {/* Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-background/60 dark:bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background dark:from-background/50 dark:to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 dark:from-background/40 dark:to-background/40" />
        {/* Light theme pink gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(350,100%,95%)]/80 via-[hsl(340,80%,97%)]/60 to-[hsl(320,60%,95%)]/80 dark:hidden" />
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-32 h-32 border border-primary/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-48 h-48 border border-primary/10 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-sm uppercase tracking-[0.3em] text-primary font-medium">
            Where Beauty Meets Confidence
          </span>
          <Sparkles className="w-5 h-5 text-primary" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-semibold text-foreground mb-6 leading-tight"
        >
          Anushka
          <br />
          <span className="text-gradient-gold">Beauty Salon</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light"
        >
          Expert in Bridal & Party Makeup, Hair Styling & Coloring, Facials & Skin Treatments, 
          Nail Art & Extensions. 12+ years of experience creating stunning looks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            onClick={() => scrollToSection('#contact')}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-medium shadow-gold"
          >
            Book Your Session
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection('#portfolio')}
            className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary px-8 py-6 text-lg"
          >
            View Portfolio
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 pt-16 border-t border-border/50"
        >
          {[
            { value: '1000+', label: 'Happy Clients' },
            { value: '12+', label: 'Years Experience' },
            { value: '500+', label: 'Bridal Looks' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="font-heading text-4xl md:text-5xl font-semibold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToSection('#about')}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
}
