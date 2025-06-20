
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Phone, MessageSquare, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FinalCTASection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-16 bg-gradient-to-br from-bc-red to-red-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/53939952-27dd-42b6-92d3-7ab137a3b788.png')] bg-cover bg-center"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold mb-4 text-white`}>
            Ready to Schedule Your Service?
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg md:text-xl'} text-white/90 max-w-3xl mx-auto mb-8`}>
            Get a free estimate for your White Rock property. We typically respond within 2 hours.
          </p>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-2 gap-12'} max-w-4xl mx-auto`}>
          {/* Contact Options */}
          <div className="space-y-6">
            <div className="flex flex-col space-y-4">
              <Button asChild size="lg" className="bg-white text-bc-red hover:bg-gray-100 font-bold text-lg py-6">
                <a href="tel:778-808-7620" className="flex items-center justify-center">
                  <Phone className="mr-3 h-6 w-6" />
                  Call Now: (778) 808-7620
                </a>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-bc-red font-bold text-lg py-6">
                <Link to="/calculator" className="flex items-center justify-center">
                  <MessageSquare className="mr-3 h-6 w-6" />
                  Get Free Online Quote
                </Link>
              </Button>
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-white/80 mr-3" />
                <span className="text-white/90">Fast response - typically within 2 hours</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-white/80 mr-3" />
                <span className="text-white/90">Serving White Rock, South Surrey, Crescent Beach & Metro Vancouver</span>
              </div>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Contact Form</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name*"
                  className="w-full px-4 py-3 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number*"
                  className="w-full px-4 py-3 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>
              <input
                type="email"
                placeholder="Email Address*"
                className="w-full px-4 py-3 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <select className="w-full px-4 py-3 rounded-md border border-white/30 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/50">
                <option value="">Services of Interest</option>
                <option value="pressure-washing">Pressure Washing</option>
                <option value="window-cleaning">Window Cleaning</option>
                <option value="house-washing">House Washing</option>
                <option value="multiple">Multiple Services</option>
              </select>
              <textarea
                placeholder="Property Address & Additional Details"
                rows={3}
                className="w-full px-4 py-3 rounded-md border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
              ></textarea>
              <Button type="submit" className="w-full bg-white text-bc-red hover:bg-gray-100 font-bold py-3 text-lg">
                Submit Request
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
