
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const serviceAreas = [
  { name: "Vancouver", slug: "vancouver" },
  { name: "Surrey", slug: "surrey" },
  { name: "Burnaby", slug: "burnaby" },
  { name: "Richmond", slug: "richmond" },
  { name: "Coquitlam", slug: "coquitlam" },
  { name: "Langley", slug: "langley-city" },
  { name: "Delta", slug: "delta" },
  { name: "New Westminster", slug: "new-westminster" },
  { name: "Port Coquitlam", slug: "port-coquitlam" },
  { name: "Port Moody", slug: "port-moody" },
  { name: "Maple Ridge", slug: "maple-ridge" },
  { name: "Pitt Meadows", slug: "pitt-meadows" },
  { name: "White Rock", slug: "white-rock" },
  { name: "Kelowna", slug: "kelowna" }
];

const ServiceAreasClickable = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            📍 Click a City for Local Pricing & Services
          </h2>
          <p className="text-lg text-gray-600">
            Professional pressure washing services across Metro Vancouver
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {serviceAreas.map((area) => (
            <Button
              key={area.slug}
              asChild
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-bc-red hover:text-white transition-colors"
            >
              <Link to={`/${area.slug}`}>
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{area.name}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAreasClickable;
