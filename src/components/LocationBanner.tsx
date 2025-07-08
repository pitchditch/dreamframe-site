
import React from 'react';
import { MapPin } from 'lucide-react';

const LocationBanner: React.FC = () => {
  const serviceAreas = ["White Rock", "Surrey", "South Surrey", "Langley", "Delta", "Tsawwassen", "Ladner", "Richmond", "Vancouver", "North Vancouver", "West Vancouver", "Burnaby", "New Westminster", "Coquitlam", "Port Coquitlam", "Port Moody", "Pitt Meadows", "Maple Ridge", "Mission", "Abbotsford"];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Proudly Serving Metro Vancouver</h2>
              <p className="text-gray-700 mb-6">
                We provide professional exterior cleaning services throughout the Lower Mainland, from Vancouver to the Fraser Valley.
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {serviceAreas.map((area, index) => (
                  <span key={index} className="bg-white px-3 py-1 rounded-full text-sm font-medium border border-gray-200 flex items-center">
                    <MapPin className="w-3 h-3 mr-1 text-bc-red" />
                    {area}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Verified Homeowners Section - Made images bigger */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-center">Verified by Local Homeowners</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-2 mb-2 h-32 flex items-center justify-center overflow-hidden">
                    <img 
                      src="/lovable-uploads/3b7f859d-741e-4313-8d41-239c5e9b6ca9.png" 
                      alt="Google Reviews" 
                      className="w-full h-auto max-h-full object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium">Google</p>
                  <p className="text-xs text-gray-500">4.9 Stars</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-2 mb-2 h-32 flex items-center justify-center overflow-hidden">
                    <img 
                      src="/lovable-uploads/55261385-ad80-4322-9551-dbc3392a881c.png" 
                      alt="Yelp Reviews" 
                      className="w-full h-auto max-h-full object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium">Yelp</p>
                  <p className="text-xs text-gray-500">5.0 Stars</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-2 mb-2 h-32 flex items-center justify-center overflow-hidden">
                    <img 
                      src="/lovable-uploads/b908cb50-e502-4c70-835b-c1deb98ff6fa.png" 
                      alt="HomeStars Reviews" 
                      className="w-full h-auto max-h-full object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium">HomeStars</p>
                  <p className="text-xs text-gray-500">4.8 Stars</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationBanner;
