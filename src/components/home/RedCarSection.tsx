
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const RedCarSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="/lovable-uploads/9dc6484c-91bb-4ae3-994d-f6cfefbf7c63.png" 
                alt="BC Pressure Washing Service Vehicle at White Rock Beach" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Have You Seen Our Red Car?</h2>
              <p className="text-gray-700 mb-4">
                That's us! As a local exterior cleaning expert serving White Rock and the Lower Mainland, you've probably spotted our distinctive red company vehicle along Marine Drive or throughout the neighborhood.
              </p>
              <p className="text-gray-700 mb-4">
                We're proud to be your local window cleaning, pressure washing, and exterior maintenance specialists - delivering premium results with a personal touch.
              </p>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 mb-6">
                <p className="font-bold text-gray-800 mb-2">🚗 Special Offer</p>
                <p className="text-gray-700">Mention you've seen our red car on Marine Drive when you contact us and receive <span className="font-bold text-bc-red pulse-discount">10% OFF</span> your service!</p>
                <div className="mt-4">
                  <Button asChild variant="bc-red" className="w-full sm:w-auto">
                    <Link to="/contact">
                      Claim Your 10% Discount
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gray-100 rounded-lg">
                <img 
                  src="/lovable-uploads/9ab5a05b-8db4-45b1-b31f-73f16bbc49a0.png"
                  alt="Jayden Fisher, Owner" 
                  className="w-16 h-16 rounded-full mr-4 border-2 border-bc-red object-cover"
                />
                <div>
                  <p className="font-semibold">"I'm personally committed to the quality of every service we provide."</p>
                  <p className="text-bc-red">— Jayden Fisher, Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RedCarSection;
