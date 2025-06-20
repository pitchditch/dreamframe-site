
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from '@/hooks/use-translation';

const WhatWeCleanSection = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const services = [
    {
      title: "Pressure Washing",
      description: "Complete exterior surface cleaning for homes and businesses",
      image: "/lovable-uploads/a531f9eb-6293-40d5-b141-5d8fb273eb7b.png",
      alt: "Professional pressure washing service in White Rock, BC",
      bullets: ["Driveways", "Patios", "Walkways", "Siding", "Concrete", "Brick", "Stucco"],
      link: "/services/pressure-washing"
    },
    {
      title: "Driveway Pressure Washing",
      description: "Specialized driveway cleaning to restore your home's curb appeal",
      image: "/lovable-uploads/50d3d62d-7910-4a5c-804c-d070f40b74b1.png",
      alt: "Driveway pressure washing with surface cleaner in White Rock",
      bullets: ["Oil Stain Removal", "Moss & Algae", "Tire Marks", "General Dirt", "Concrete Restoration"],
      link: "/services/pressure-washing"
    },
    {
      title: "Deck Washing",
      description: "Gentle yet effective deck cleaning to protect your investment",
      image: "/lovable-uploads/3e595f21-838b-43d8-aa94-12232e4c90de.png",
      alt: "Professional deck washing service in White Rock, BC",
      bullets: ["Wood Decks", "Composite Decks", "Railings", "Stairs", "Deck Staining Prep"],
      link: "/services/pressure-washing"
    },
    {
      title: "Roof Cleaning",
      description: "Safe roof cleaning to remove moss, algae, and debris",
      image: "/lovable-uploads/df6cbfc7-5d50-495a-b2ca-e423806b0d0b.png",
      alt: "Roof cleaning service removing moss in White Rock, BC",
      bullets: ["Moss Removal", "Algae Treatment", "Gutter Cleaning", "Shingle Care", "Preventive Maintenance"],
      link: "/services/roof-cleaning"
    },
    {
      title: "Fence Washing",
      description: "Restore your fence to its original beauty with professional cleaning",
      image: "/lovable-uploads/123e0ac0-8894-4ab0-96e2-122161d1ff37.png",
      alt: "Fence pressure washing showing before and after results",
      bullets: ["Wood Fences", "Vinyl Fences", "Chain Link", "Gate Cleaning", "Stain Preparation"],
      link: "/services/pressure-washing"
    },
    {
      title: "Window Cleaning",
      description: "Crystal clear windows inside and out for maximum natural light",
      image: "/lovable-uploads/4295f9d4-2cb2-40d8-ba05-c347c67711f4.png",
      alt: "Professional window cleaning service in White Rock",
      bullets: ["Interior Windows", "Exterior Windows", "Screen Cleaning", "Sill Cleaning", "Track Cleaning"],
      link: "/services/window-cleaning"
    },
    {
      title: "Gutter Cleaning",
      description: "Complete gutter maintenance to protect your home's foundation",
      image: "/lovable-uploads/baba35c4-d2a5-4b6c-82e7-58915d36aa6a.png",
      alt: "Professional gutter cleaning service in White Rock, BC",
      bullets: ["Debris Removal", "Downspout Clearing", "Gutter Flushing", "Minor Repairs", "Preventive Maintenance"],
      link: "/services/gutter-cleaning"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold mb-4 text-gray-900`}>
            What Can We Make Shine Today?
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 max-w-3xl mx-auto mb-8`}>
            Our White Rock pressure washing team can remove mold, dirt and grime from driveways, sidewalks, patios, deck railings, fences and more. 
            We provide comprehensive exterior cleaning services to keep your property looking its best.
          </p>
        </div>

        {/* Services Grid */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-2 lg:grid-cols-3 gap-8'} mb-12`}>
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={service.image}
                  alt={service.alt}
                  className={`w-full ${isMobile ? 'h-48' : 'h-56'} object-cover group-hover:scale-105 transition-transform duration-300`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
                <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-gray-900 mb-2 group-hover:text-bc-red transition-colors`}>
                  {service.title}
                </h3>
                <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 mb-3 leading-relaxed`}>
                  {service.description}
                </p>
                
                {/* Service bullets */}
                <div className="mb-4">
                  <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500 flex flex-wrap gap-1`}>
                    {service.bullets.map((bullet, bulletIndex) => (
                      <span key={bulletIndex}>
                        {bullet}
                        {bulletIndex < service.bullets.length - 1 && " • "}
                      </span>
                    ))}
                  </div>
                </div>
                
                <a 
                  href={service.link}
                  className={`inline-block text-bc-red font-semibold hover:text-red-700 transition-colors ${isMobile ? 'text-sm' : 'text-base'}`}
                >
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Inline Supporting Image */}
        <div className="text-center mb-8">
          <div className="max-w-4xl mx-auto">
            <img 
              src="/lovable-uploads/3f8d1624-f0dc-481d-bc16-0565c5d39bb9.png"
              alt="Beautiful house after professional pressure washing in White Rock"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 mt-4 italic`}>
              Your home's exterior after our professional cleaning services in White Rock, BC
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 mb-6`}>
            Don't see your specific cleaning need listed? We clean all types of exterior surfaces!
          </p>
          <div className={`${isMobile ? 'space-y-3' : 'space-x-4'} ${isMobile ? '' : 'flex justify-center items-center'}`}>
            <a 
              href="/calculator" 
              className={`${isMobile ? 'block' : 'inline-block'} bg-bc-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors`}
            >
              Get Free Quote
            </a>
            <a 
              href="tel:778-808-7620"
              className={`${isMobile ? 'block' : 'inline-block'} border-2 border-bc-red text-bc-red px-8 py-3 rounded-lg font-semibold hover:bg-bc-red hover:text-white transition-colors`}
            >
              Call Now: (778) 808-7620
            </a>
          </div>
          <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-500 mt-4`}>
            Proudly serving White Rock, South Surrey, Langley & Metro Vancouver
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatWeCleanSection;
