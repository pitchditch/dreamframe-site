
import React from 'react';
import { Phone, MessageSquare, Shield, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PricingCTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-bc-red to-red-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ✅ 15% Off Your First Service – Same Day Availability
          </h2>
          <p className="text-xl mb-6">
            Don't wait – book your professional cleaning today!
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-bc-red hover:bg-gray-100 font-bold text-lg px-8 py-4 h-auto"
          >
            <a href="tel:7788087620" className="flex items-center">
              <Phone className="mr-3" size={20} />
              📞 Call Now: (778) 808-7620
            </a>
          </Button>
          
          <Button 
            asChild 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-bc-red font-bold text-lg px-8 py-4 h-auto"
          >
            <Link to="/calculator" className="flex items-center">
              <MessageSquare className="mr-3" size={20} />
              🧼 Get Instant Quote
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <Shield className="w-6 h-6" />
            <div>
              <div className="font-bold">Fully Insured</div>
              <div className="text-sm opacity-80">$2M liability coverage</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            <div>
              <div className="font-bold">5-Star Rated</div>
              <div className="text-sm opacity-80">Google & BBB reviews</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Clock className="w-6 h-6" />
            <div>
              <div className="font-bold">Same-Day Service</div>
              <div className="text-sm opacity-80">Available most days</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCTASection;
