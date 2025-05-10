
import React from 'react';
import { CircleCheck, Star, Shield, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const FounderSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Meet Our Founder</h2>
            <p className="text-gray-700 mb-4">
              With over a decade of experience in exterior cleaning services, our founder Jayden Fisher established BC Pressure Washing with a vision to provide exceptional cleaning services at reasonable prices.
            </p>
            <p className="text-gray-700 mb-6">
              Growing up in White Rock, Jayden has developed a deep understanding of the unique cleaning challenges faced by homeowners in the Pacific Northwest climate. His passion for customer satisfaction and attention to detail has made BC Pressure Washing the trusted choice across Metro Vancouver.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-start">
                <CircleCheck className="text-bc-red mt-1 mr-2 flex-shrink-0" />
                <p>Locally owned & operated</p>
              </div>
              <div className="flex items-start">
                <Shield className="text-bc-red mt-1 mr-2 flex-shrink-0" />
                <p>Fully insured & bonded</p>
              </div>
              <div className="flex items-start">
                <Star className="text-bc-red mt-1 mr-2 flex-shrink-0" />
                <p>5-star rated services</p>
              </div>
              <div className="flex items-start">
                <Wrench className="text-bc-red mt-1 mr-2 flex-shrink-0" />
                <p>Premium equipment</p>
              </div>
            </div>
            <Link to="/about" className="inline-block bg-bc-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-all">
              Learn More About Us
            </Link>
          </div>
          <div className="relative">
            <img 
              src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
              alt="Founder of BC Pressure Washing" 
              className="rounded-lg shadow-xl w-full max-w-md mx-auto"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg max-w-xs">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium">5.0/5.0</span>
              </div>
              <p className="text-sm italic">"Committed to excellence in every property we service."</p>
              <p className="text-sm font-medium mt-1">- Jayden Fisher, Owner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
