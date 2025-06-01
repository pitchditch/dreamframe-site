
import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Droplets, Zap, Shield, Building2 } from 'lucide-react';

const WhatWeCleanSection = () => {
  const isMobile = useIsMobile();
  const [waveActive, setWaveActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveActive(true);
      setTimeout(() => setWaveActive(false), 3000);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const cleaningServices = [
    {
      title: "Residential Windows",
      description: "Interior and exterior window cleaning for homes, condos, and townhouses",
      dirtyImage: "/lovable-uploads/4a9921b9-2dd2-42b8-ade9-61bbeeb18898.png",
      cleanImage: "/lovable-uploads/e9f99602-dedc-42e2-870e-3c129180af53.png",
      icon: <Droplets className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Patio Glass Doors",
      description: "Sliding glass doors, French doors, and patio entrances",
      dirtyImage: "/lovable-uploads/492c7f1a-ebaa-40f0-b518-300e350a4e82.png",
      cleanImage: "/lovable-uploads/b0019f19-4638-4339-adae-7cf734f98b50.png",
      icon: <Droplets className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Glass Awnings",
      description: "Glass canopies, awnings, and overhead glass structures",
      dirtyImage: "/lovable-uploads/213a180a-cf25-44e8-b093-62403c1021a0.png",
      cleanImage: "/lovable-uploads/22c437ec-09b5-4a11-9de6-d62c4f12c2a3.png",
      icon: <Droplets className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Glass Railings",
      description: "Balcony glass panels, deck railings, and safety glass barriers",
      dirtyImage: "/lovable-uploads/2514ad9a-c084-41a9-8a08-40a45a29fdb3.png",
      cleanImage: "/lovable-uploads/aadf9684-0107-4c55-98c9-6e9291d928bb.png",
      icon: <Shield className="h-6 w-6 text-green-500" />
    },
    {
      title: "Commercial Windows",
      description: "Office buildings, storefronts, and high-rise commercial properties",
      dirtyImage: "/lovable-uploads/7631bbef-9460-4f28-bd99-bf2e4e02327e.png",
      cleanImage: "/lovable-uploads/e46d1af8-4261-488a-bfbe-d7a0e00a1dfa.png",
      icon: <Building2 className="h-6 w-6 text-gray-500" />
    },
    {
      title: "Skylights",
      description: "Roof skylights, glass ceiling panels, and light wells",
      dirtyImage: "/lovable-uploads/53de49ac-8e5b-4317-a655-abb8dad28dcd.png",
      cleanImage: "/lovable-uploads/0de2f47b-c954-4288-80e1-89aa79dba9bb.png",
      icon: <Zap className="h-6 w-6 text-purple-500" />
    }
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Shimmering wave overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          waveActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/30 to-transparent transform -skew-x-12 animate-[shimmer_3s_ease-in-out]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 animate-[shimmer_3s_ease-in-out_0.5s]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent transform -skew-x-12 animate-[shimmer_3s_ease-in-out_1s]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold mb-4 text-gray-900`}>
            What We Clean
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 max-w-3xl mx-auto`}>
            We provide professional window cleaning services for all types of glass surfaces
          </p>
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-2 md:grid-cols-3 gap-8'}`}>
          {cleaningServices.map((service, index) => (
            <div 
              key={index} 
              className={`group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                waveActive ? 'animate-[cleanWave_3s_ease-in-out]' : ''
              }`}
              style={{
                animationDelay: waveActive ? `${index * 0.3}s` : '0s'
              }}
            >
              <div className="relative overflow-hidden">
                <div className="relative">
                  <img 
                    src={service.dirtyImage} 
                    alt={`${service.title} - Before cleaning`}
                    className={`w-full ${isMobile ? 'h-48' : 'h-56'} object-cover transition-opacity duration-500 group-hover:opacity-0`}
                  />
                  <img 
                    src={service.cleanImage} 
                    alt={`${service.title} - After cleaning`}
                    className={`absolute inset-0 w-full ${isMobile ? 'h-48' : 'h-56'} object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100`}
                  />
                  <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                    Hover to see clean
                  </div>
                  
                  {/* Service icon overlay */}
                  <div className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-md">
                    {service.icon}
                  </div>
                  
                  {/* Individual shimmer effect for each card */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/60 to-transparent transform -skew-x-12 transition-all duration-1000 ${
                      waveActive ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'
                    }`}
                    style={{
                      transitionDelay: waveActive ? `${index * 0.3}s` : '0s'
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
                <div className="flex items-center mb-2">
                  {service.icon}
                  <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold ml-2 text-gray-900 group-hover:text-bc-red transition-colors`}>
                    {service.title}
                  </h3>
                </div>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 leading-relaxed`}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 mb-6`}>
            Don't see your glass type listed? We clean all types of glass surfaces!
          </p>
          <a 
            href="/calculator" 
            className="inline-block bg-bc-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Get Free Quote
          </a>
        </div>
      </div>

      <style>
        {`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%) skewX(-12deg);
            }
            100% {
              transform: translateX(300%) skewX(-12deg);
            }
          }
          
          @keyframes cleanWave {
            0% {
              transform: scale(1);
              filter: brightness(1);
            }
            50% {
              transform: scale(1.02);
              filter: brightness(1.1);
            }
            100% {
              transform: scale(1);
              filter: brightness(1);
            }
          }
        `}
      </style>
    </section>
  );
};

export default WhatWeCleanSection;
