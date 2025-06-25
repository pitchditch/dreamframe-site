
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Phone, Calendar, CheckCircle } from 'lucide-react';

const BookingSection: React.FC = () => {
  return (
    <section className="py-16 bg-bc-red text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Schedule Your Post Construction Cleaning?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get your property move-in ready with our professional post construction window cleaning service.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <Phone size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2">Call for Quote</h3>
            <p>Get a free estimate over the phone</p>
          </div>
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <Calendar size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2">Schedule Service</h3>
            <p>Book your convenient cleaning time</p>
          </div>
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <CheckCircle size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2">Enjoy Clean Windows</h3>
            <p>Crystal clear results guaranteed</p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="outline" className="bg-white text-bc-red hover:bg-gray-100">
              <Link to="/calculator">Get Free Quote</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
              <a href="tel:7788087620">Call: (778) 808-7620</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
