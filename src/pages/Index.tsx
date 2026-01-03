import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { CircularGallery } from '@/components/sections/CircularGallery';
import { AboutSection } from '@/components/sections/AboutSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import CursorGlitter from '@/components/CursorGlitter';

const Index = () => {
  return (
    <>
      <CursorGlitter />
      <motion.main 
        className="min-h-screen bg-background relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Light theme decorative pink/purple blobs like reference site */}
        <div className="fixed top-0 left-0 w-72 h-72 bg-gradient-to-br from-[hsl(328,85%,70%)]/40 to-[hsl(280,70%,70%)]/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 dark:hidden pointer-events-none" />
        <div className="fixed top-1/4 right-0 w-96 h-96 bg-gradient-to-bl from-[hsl(350,80%,85%)]/50 to-[hsl(328,85%,75%)]/30 rounded-full blur-3xl translate-x-1/2 dark:hidden pointer-events-none" />
        <div className="fixed bottom-1/4 left-0 w-80 h-80 bg-gradient-to-tr from-[hsl(280,70%,75%)]/30 to-[hsl(340,60%,85%)]/40 rounded-full blur-3xl -translate-x-1/3 dark:hidden pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-64 h-64 bg-gradient-to-tl from-[hsl(328,80%,80%)]/40 to-[hsl(350,70%,90%)]/30 rounded-full blur-3xl translate-y-1/2 dark:hidden pointer-events-none" />
        
        <Navbar />
        <HeroSection />
        <CircularGallery />
        <AboutSection />
        <PortfolioSection />
        <ServicesSection />
        <ReviewsSection />
        <ContactSection />
        <Footer />
        <FloatingWhatsApp />
      </motion.main>
    </>
  );
};

export default Index;
