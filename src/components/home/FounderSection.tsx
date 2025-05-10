
import React from 'react';
import { CircleCheck, Star, Shield, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const FounderSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png" 
                alt="Jayden Fisher - Founder of BC Pressure Washing" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Meet Your Service Provider</h2>
              <p className="text-lg mb-6">
                Hi, I'm Jayden Fisher, owner and operator of BC Pressure Washing. With years of experience in exterior cleaning, I take personal pride in delivering exceptional results for every customer.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CircleCheck className="text-green-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold">Personally Involved</h3>
                    <p className="text-gray-600">I'm on-site for every project, ensuring quality control and customer satisfaction.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Star className="text-yellow-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold">5-Star Service</h3>
                    <p className="text-gray-600">Our reputation is built on consistently exceeding customer expectations.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="text-blue-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold">Fully Insured</h3>
                    <p className="text-gray-600">Complete peace of mind with our comprehensive insurance coverage.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Wrench className="text-red-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold">Professional Equipment</h3>
                    <p className="text-gray-600">We invest in top-quality tools and technology for superior results.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/about">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium inline-block transition-all">
                    Learn More About Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
