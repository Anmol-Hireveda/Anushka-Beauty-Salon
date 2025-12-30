import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Service options for dropdown
const serviceOptions = [
  'Bridal Makeup',
  'Party Makeup',
  'Engagement Makeup',
  'Reception Makeup',
  'HD Makeup',
  'Airbrush Makeup',
  'Hairstyling',
  'Facial',
  'Waxing',
  'Manicure & Pedicure',
  'Hair Color',
  'Hair Treatment',
  'Other',
];

interface Review {
  id: string;
  client_name: string;
  email: string;
  rating: number;
  review_text: string;
  service_type: string | null;
  created_at: string;
}

// Fallback static reviews
const staticReviews: Review[] = [
  {
    id: 'static-1',
    client_name: 'Priya Sharma',
    email: 'priya@example.com',
    rating: 5,
    review_text: 'Anushka did my bridal makeup and I looked absolutely stunning! She understood exactly what I wanted and the makeup lasted all day and night.',
    service_type: 'Bridal',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-2',
    client_name: 'Neha Gupta',
    email: 'neha@example.com',
    rating: 5,
    review_text: 'Amazing work for my engagement ceremony! The look was perfect - elegant yet glamorous. Everyone kept complimenting my makeup.',
    service_type: 'Engagement',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-3',
    client_name: 'Anjali Verma',
    email: 'anjali@example.com',
    rating: 5,
    review_text: "Got my makeup done for a friend's wedding and received so many compliments! Anushka is truly talented.",
    service_type: 'Party',
    created_at: new Date().toISOString(),
  },
  {
    id: 'static-4',
    client_name: 'Ritu Singh',
    email: 'ritu@example.com',
    rating: 5,
    review_text: 'Best makeup artist! She made me feel like a queen on my reception. The HD makeup was flawless in photos.',
    service_type: 'Reception',
    created_at: new Date().toISOString(),
  },
];

export function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();

  const [reviews, setReviews] = useState<Review[]>(staticReviews);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    client_name: '',
    email: '',
    review_text: '',
    rating: 0,
    service_type: '',
    custom_service: '',
  });

  // Fetch reviews from database
  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      setReviews(data);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchReviews();
  }, []);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('reviews-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reviews',
        },
        () => {
          fetchReviews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Determine final service type
    const finalServiceType = formData.service_type === 'Other' 
      ? formData.custom_service.trim() 
      : formData.service_type;

    const { error } = await supabase.from('reviews').insert({
      client_name: formData.client_name.trim(),
      email: formData.email.trim(),
      review_text: formData.review_text.trim(),
      rating: formData.rating,
      service_type: finalServiceType || 'Beauty Service',
    });

    if (error) {
      toast({
        title: "Error",
        description: "Could not submit review. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Thank You!",
        description: "Your review has been submitted successfully.",
      });
      setFormData({ client_name: '', email: '', review_text: '', rating: 0, service_type: '', custom_service: '' });
      setIsOpen(false);
    }

    setIsSubmitting(false);
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <Quote className="w-32 h-32 text-primary" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10 rotate-180">
        <Quote className="w-32 h-32 text-primary" />
      </div>

      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-[0.2em] font-medium">
            Testimonials
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
            Client <span className="text-gradient-gold">Love</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Don't just take my word for it—hear from the beautiful clients who have trusted
            me with their special moments.
          </p>

          {/* Write Review Button */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Star className="w-4 h-4 mr-2" />
                Write a Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl">Share Your Experience</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Your Name</label>
                  <Input
                    placeholder="Enter your name"
                    value={formData.client_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= formData.rating
                              ? 'text-primary fill-primary'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Service</label>
                  <Select
                    value={formData.service_type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, service_type: value, custom_service: value === 'Other' ? prev.custom_service : '' }))}
                  >
                    <SelectTrigger className="w-full bg-background">
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border z-50">
                      {serviceOptions.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {formData.service_type === 'Other' && (
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Enter Service Name</label>
                    <Input
                      placeholder="Type your service..."
                      value={formData.custom_service}
                      onChange={(e) => setFormData(prev => ({ ...prev, custom_service: e.target.value }))}
                      required
                    />
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Your Review</label>
                  <Textarea
                    placeholder="Share your experience with us..."
                    value={formData.review_text}
                    onChange={(e) => setFormData(prev => ({ ...prev, review_text: e.target.value }))}
                    rows={4}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.slice(0, 4).map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group"
            >
              <div className="h-full p-6 bg-card border border-border hover:border-primary/30 transition-all duration-400 relative">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-primary/20 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'text-primary fill-primary' : 'text-muted'
                      }`}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-foreground/80 text-sm leading-relaxed mb-6 line-clamp-4">
                  "{review.review_text}"
                </p>

                {/* Client info */}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-heading text-lg font-semibold">
                      {review.client_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-foreground">
                      {review.client_name}
                    </h4>
                    {review.service_type && (
                      <p className="text-xs text-primary uppercase tracking-wider">
                        {review.service_type}
                      </p>
                    )}
                  </div>
                </div>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-card border border-border"
        >
          {[
            { value: '500+', label: 'Happy Clients' },
            { value: '4.9', label: 'Average Rating' },
            { value: '100%', label: 'Satisfaction' },
            { value: '50+', label: 'Five-Star Reviews' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
