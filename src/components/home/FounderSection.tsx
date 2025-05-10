
import React from 'react';
import { CircleCheck, Star, Shield, Wrench, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FounderSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="order-2 md:order-1">
            <div className="badge-pill mb-4">Meet The Owner</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Exterior Cleaning Is My Passion</h2>
            <p className="text-lg mb-6 text-gray-600">
              I'm Jayden, the owner and operator of BC Pressure Washing. I founded this company with a simple mission: to provide the highest quality exterior cleaning services with a personal touch that big franchises just can't match.
            </p>
            <p className="text-lg mb-6 text-gray-600">
              As a Surrey resident, I understand the unique challenges our local homes face - from moss growth in our wet climate to the salt air effects near White Rock Beach. Every service is performed by me or under my direct supervision, ensuring exceptional quality every time.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-start">
                <div className="bg-white p-2 rounded-full mr-3">
                  <CircleCheck className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">10+ Years Experience</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white p-2 rounded-full mr-3">
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="font-medium">5-Star Rated</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white p-2 rounded-full mr-3">
                  <Shield className="h-5 w-5 text-bc-red" />
                </div>
                <div>
                  <p className="font-medium">Fully Insured</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white p-2 rounded-full mr-3">
                  <Wrench className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Professional Equipment</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link to="/why-us" className="text-bc-red font-semibold flex items-center hover:underline">
                Learn more about our story <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <img 
                src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png" 
                alt="Jayden - Owner of BC Pressure Washing" 
                className="rounded-lg shadow-lg w-full max-w-md object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 font-semibold">4.9/5</span>
                </div>
                <p className="text-sm text-gray-500">Based on 150+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
