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
import Preloader from '@/components/Preloader';
import CursorGlitter from '@/components/CursorGlitter';

const Index = () => {
  return (
    <>
      <Preloader />
      <CursorGlitter />
      <main className="min-h-screen bg-background">
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
      </main>
    </>
  );
};

export default Index;
