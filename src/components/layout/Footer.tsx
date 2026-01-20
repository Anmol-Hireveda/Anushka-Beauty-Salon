import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Mail, Heart, Phone } from 'lucide-react';

const footerLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Services', href: '#services' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/makeoveranushka', label: 'Instagram' },
  { icon: MessageCircle, href: 'https://wa.me/919694834669', label: 'WhatsApp' },
  { icon: Phone, href: 'tel:+917976008850', label: 'Phone' },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="font-heading text-2xl font-semibold text-foreground tracking-wide inline-block mb-4"
            >
              <span className="text-foreground">Anushka </span>
              <span className="text-primary">Beauty Salon</span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Expert in Bridal & Party Makeup, Hair Styling & Coloring, Facials & Skin Treatments, 
              Nail Art & Extensions. Where beauty meets confidence.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="tel:+917976008850" className="hover:text-primary transition-colors">
                  📞 +91 79760 08850
                </a>
              </li>
              <li>
                <a href="https://wa.me/919694834669" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  📌 WhatsApp: +91 96948 34669
                </a>
              </li>
              <li className="leading-relaxed">
                📍 48, Rajoriya Bhawan, near Dhruva Public School, Karbala Chouraha, Amer Road, Jaipur
              </li>
              <li>⏰ Mon-Sun: 9AM - 8PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Anushka Beauty Salon. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made by{' '}
              <a 
                href="mailto:anmolpanchal0207@gmail.com" 
                className="text-primary hover:underline font-medium relative group"
                title="anmolpanchal0207@gmail.com"
              >
                Anmol
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  anmolpanchal0207@gmail.com
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}