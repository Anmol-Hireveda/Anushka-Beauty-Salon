import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, MapPin, Instagram, MessageCircle, Clock, Camera, UserCheck, Globe } from 'lucide-react';

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

const highlights = [
  {
    icon: Camera,
    title: 'Proceeding Shoot',
    description: 'Professional makeup for all your shoot requirements',
  },
  {
    icon: UserCheck,
    title: 'Freelancer',
    description: 'Flexible scheduling at your preferred location',
  },
  {
    icon: Globe,
    title: 'All India Booking',
    description: 'We travel across India for your special occasions',
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
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm uppercase tracking-[0.2em] font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Get in Touch
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </span>
          </motion.div>
          
          <h2 className="font-heading text-4xl md:text-6xl font-semibold text-foreground mb-6">
            Book Your <br className="sm:hidden" />
            <span className="text-gradient-gold relative">
              Appointment
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 origin-left"
              />
            </span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Contact us for your special occasion. Let's make it more special with the soft glam look!
          </motion.p>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="text-center p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all group"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
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
