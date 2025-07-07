
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const neighborhoods = [
  {
    name: "White Rock",
    description: "Professional pressure washing for oceanfront properties and heritage homes",
    image: "/lovable-uploads/7bfc9154-8e3f-4410-bb6e-660e6f53cbad.png",
    services: ["Saltwater Stain Removal", "Deck Restoration", "Window Cleaning"],
    reviews: 4.9,
    slug: "white-rock"
  },
  {
    name: "Surrey",
    description: "Comprehensive exterior cleaning for residential and commercial properties",
    image: "/lovable-uploads/bc70c49b-3416-4778-a7c2-f96fe6701d60.png",
    services: ["Driveway Cleaning", "House Washing", "Roof Cleaning"],
    reviews: 4.8,
    slug: "surrey"
  },
  {
    name: "Langley",
    description: "Specialized cleaning services for urban and suburban properties",
    image: "/lovable-uploads/927946ff-99be-4945-8ee0-69bd0c510590.png",
    services: ["Residential Cleaning", "Fence Restoration", "Patio Cleaning"],
    reviews: 4.9,
    slug: "langley"
  },
  {
    name: "Delta",
    description: "Expert pressure washing for waterfront and residential areas",
    image: "/lovable-uploads/81d278ef-b9db-4afc-b432-e5fa95567775.png",
    services: ["Dock Cleaning", "Siding Restoration", "Gutter Cleaning"],
    reviews: 4.7,
    slug: "delta"
  },
  {
    name: "Richmond",
    description: "Professional cleaning services for diverse residential communities",
    image: "/lovable-uploads/0134cfcb-ad8c-4123-a227-763dc4b8f65a.png",
    services: ["Condo Cleaning", "Townhouse Maintenance", "Commercial Services"],
    reviews: 4.8,
    slug: "richmond"
  },
  {
    name: "Burnaby",
    description: "Complete exterior maintenance for hillside homes and condos",
    image: "/lovable-uploads/c21b7930-a2b4-4d4f-9dec-bea574158b0c.png",
    services: ["Steep Driveway Cleaning", "Retaining Wall Cleaning", "Patio Services"],
    reviews: 4.9,
    slug: "burnaby"
  },
  {
    name: "Vancouver",
    description: "Premium cleaning services for urban properties and high-rises",
    image: "/lovable-uploads/c5612b94-cfef-4c5f-bc6d-3cdd7475265a.png",
    services: ["High-Rise Cleaning", "Urban Property Care", "Commercial Buildings"],
    reviews: 4.8,
    slug: "vancouver"
  }
];

const NeighborhoodGrid = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Serving Metro Vancouver Communities</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Local expertise for every neighborhood. We understand the unique cleaning challenges in your area.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {neighborhoods.map((neighborhood) => (
            <Card key={neighborhood.slug} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={neighborhood.image} 
                  alt={`${neighborhood.name} pressure washing services`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-semibold text-sm">{neighborhood.reviews}</span>
                </div>
              </div>
              
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <MapPin className="w-5 h-5 text-bc-red mr-2" />
                  <h3 className="text-xl font-bold group-hover:text-bc-red transition-colors">
                    {neighborhood.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {neighborhood.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Popular Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.services.map((service, index) => (
                      <span 
                        key={index}
                        className="bg-bc-red/10 text-bc-red px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-auto">
                  <Button asChild className="flex-1" variant="bc-red">
                    <Link to={`/areas/${neighborhood.slug}`}>
                      Learn More
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="icon">
                    <a href="tel:7788087620">
                      <Phone size={16} />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NeighborhoodGrid;
