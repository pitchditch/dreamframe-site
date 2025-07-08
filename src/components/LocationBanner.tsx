
import React from 'react';
import { MapPin } from 'lucide-react';

const LocationBanner: React.FC = () => {
  const serviceAreas = [
    { name: "White Rock", image: "/lovable-uploads/89f90143-1c79-4505-b0dd-fcf8ba901425.png" },
    { name: "Surrey", image: "/lovable-uploads/196ce871-701b-4946-9999-79a0174bdaeb.png" },
    { name: "Langley", image: "/lovable-uploads/405dd234-7f06-42fb-94af-f2582df847c8.png" },
    { name: "Delta", image: "/lovable-uploads/eeb4e96a-2b8e-434b-ac19-4b78772071c7.png" },
    { name: "Richmond", image: "/lovable-uploads/8a55ce78-5efe-415a-8723-99441026c5dd.png" },
    { name: "Burnaby", image: "/lovable-uploads/3b653239-5d39-4f9b-b75d-0aebf6963b71.png" },
    { name: "Vancouver", image: "/lovable-uploads/944c81d2-cb89-4c06-8aca-8b8d5945dc35.png" },
    { name: "South Surrey" },
    { name: "Tsawwassen" },
    { name: "Ladner" },
    { name: "North Vancouver" },
    { name: "West Vancouver" },
    { name: "New Westminster" },
    { name: "Coquitlam" },
    { name: "Port Coquitlam" },
    { name: "Port Moody" },
    { name: "Pitt Meadows" },
    { name: "Maple Ridge" },
    { name: "Mission" },
    { name: "Abbotsford" }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Proudly Serving Metro Vancouver</h2>
            <p className="text-gray-700 mb-6">
              We provide professional exterior cleaning services throughout the Lower Mainland, from Vancouver to the Fraser Valley.
            </p>
          </div>

          {/* Featured Communities with Background Images */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {serviceAreas.slice(0, 7).map((area, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                {area.image ? (
                  <div 
                    className="h-32 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${area.image})` }}
                  >
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <MapPin className="w-5 h-5 mx-auto mb-1 text-bc-red" />
                        <span className="font-semibold text-sm">{area.name}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-br from-bc-red/20 to-bc-red/40 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-5 h-5 mx-auto mb-1 text-bc-red" />
                      <span className="font-semibold text-sm text-gray-700">{area.name}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Service Areas */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {serviceAreas.slice(7).map((area, index) => (
              <span key={index} className="bg-white px-3 py-1 rounded-full text-sm font-medium border border-gray-200 flex items-center">
                <MapPin className="w-3 h-3 mr-1 text-bc-red" />
                {area.name}
              </span>
            ))}
          </div>
            
          {/* Verified Homeowners Section */}
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
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
    </section>
  );
};

export default LocationBanner;
