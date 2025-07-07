
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const locations = [
  {
    city: 'White Rock',
    rating: 4.9,
    headline: 'Oceanfront Property Specialists',
    services: ['Saltwater Stain Removal', 'Deck Restoration', 'Window Cleaning'],
    image: '/lovable-uploads/06e9bd14-b601-4e6f-bcd9-01217b067c47.png',
    slug: 'white-rock'
  },
  {
    city: 'Surrey',
    rating: 4.8,
    headline: 'Residential & Commercial Experts',
    services: ['Driveway Cleaning', 'House Washing', 'Gutter Cleaning'],
    image: '/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png',
    slug: 'surrey'
  },
  {
    city: 'Vancouver',
    rating: 4.9,
    headline: 'High-Rise Window Cleaning',
    services: ['Commercial Windows', 'Condo Cleaning', 'Pressure Washing'],
    image: '/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png',
    slug: 'vancouver'
  },
  {
    city: 'Burnaby',
    rating: 4.8,
    headline: 'Hillside Home Specialists',
    services: ['Steep Driveway Cleaning', 'Retaining Walls', 'Roof Cleaning'],
    image: '/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png',
    slug: 'burnaby'
  },
  {
    city: 'Richmond',
    rating: 4.7,
    headline: 'Community Cleaning Experts',
    services: ['Townhouse Maintenance', 'Commercial Services', 'Window Cleaning'],
    image: '/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png',
    slug: 'richmond'
  },
  {
    city: 'Langley',
    rating: 4.9,
    headline: 'Suburban Property Care',
    services: ['Residential Cleaning', 'Fence Restoration', 'Patio Cleaning'],
    image: '/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png',
    slug: 'langley-city'
  }
];

const LocationServiceCards = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Local Expertise in Every Community
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We understand the unique cleaning challenges in each Metro Vancouver community
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location) => (
            <Card key={location.slug} className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg">
              <div className="relative overflow-hidden">
                <img 
                  src={location.image} 
                  alt={`${location.city} pressure washing services`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                  <span className="font-semibold text-sm">{location.rating}</span>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl group-hover:text-bc-red transition-colors">
                  {location.city}
                </CardTitle>
                <p className="text-gray-600 font-medium">{location.headline}</p>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Popular Services:</h4>
                  <div className="space-y-1">
                    {location.services.map((service, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-bc-red rounded-full mr-2"></div>
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button asChild className="flex-1" variant="default">
                    <Link to={`/${location.slug}`}>
                      View Pricing
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

export default LocationServiceCards;
