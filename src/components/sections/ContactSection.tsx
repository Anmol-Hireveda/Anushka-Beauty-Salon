import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, MapPin, Instagram, MessageCircle, Clock } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 79760 08850',
    href: 'tel:+917976008850',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 96948 34669',
    href: 'https://wa.me/919694834669',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: '48, Rajoriya Bhawan, near Dhruva Public School, Karbala Chouraha, Purana Ramgarh Mod, Amer Road, Jaipur',
    href: 'https://maps.google.com/?q=Rajoriya+Bhawan+Amer+Road+Jaipur',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon-Sun: 9AM - 8PM',
    href: '#',
  },
];

const socialLinks = [
  {
    icon: Instagram,
    label: 'Instagram @makeoveranushka',
    href: 'https://instagram.com/makeoveranushka',
    color: 'hover:text-pink-500',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    href: 'https://wa.me/919694834669',
    color: 'hover:text-green-500',
  },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background relative">
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
            Get in Touch
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
            Book Your <span className="text-gradient-gold">Appointment</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contact us for your special occasion. Let's make it more special with the soft glam look!
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-4 group"
                >
                  <div className="p-3 bg-primary/10 rounded-sm group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="section-divider" />

            {/* Team */}
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                Our Team
              </h3>
              <div className="space-y-2 text-muted-foreground text-sm">
                <p><span className="text-primary">MUA:</span> Sunita & Rajshree Prajapati</p>
                <p><span className="text-primary">Hairstyle:</span> Anushka Prajapati & Harshita Prajapati</p>
              </div>
            </div>

            <div className="section-divider" />

            {/* Social Links */}
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                Follow Us
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 bg-card border border-border hover:border-primary/50 transition-all ${social.color}`}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
