
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/use-translation';
import TestimonialsCarousel from '../TestimonialsCarousel';

const SatisfiedClientsSection = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            let start = 0;
            const end = 350;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                setCount(end);
                clearInterval(timer);
              } else {
                setCount(Math.floor(start));
              }
            }, 16);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      // Create mailto link
      const subject = encodeURIComponent('New Subscriber from Website');
      const body = encodeURIComponent(`New subscriber email: ${email}`);
      const mailtoLink = `mailto:bcpressurewashing.ca@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Reset form
      setEmail('');
      alert('Thank you for subscribing! Your email client should open with the subscription email.');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Animated Counter */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <span className="text-6xl md:text-8xl font-bold text-bc-red">
              {count.toLocaleString()}+
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("Satisfied Clients Across the Lower Mainland")}
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            {t("Built from 3 years of door-to-door window cleaning. Now proudly online.")}
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t("We've served over 350 happy customers — and we're just getting started. Want updates as we grow, or to be featured in our success stories?")}
          </p>
        </div>

        {/* Email Subscription Form */}
        <div className="max-w-md mx-auto mb-12">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-bc-red hover:bg-red-700 text-white px-6"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
          <p className="text-xs text-gray-500 text-center mt-2">
            No spam — just updates & special offers. Unsubscribe anytime.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-center mb-8">
            {t("What Our Customers Say")}
          </h3>
          <TestimonialsCarousel />
        </div>
      </div>
    </section>
  );
};

export default SatisfiedClientsSection;
