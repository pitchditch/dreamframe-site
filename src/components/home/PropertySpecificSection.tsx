
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, Building2, Building } from 'lucide-react';

const PropertySpecificSection = () => {
  const propertyTypes = [
    {
      icon: Home,
      title: "Residential Homes",
      description: "Comprehensive exterior cleaning for single-family homes, townhouses, and duplexes.",
      services: [
        "Window cleaning (interior & exterior)",
        "Pressure washing (siding, driveways, patios)",
        "Gutter cleaning & maintenance",
        "Roof cleaning & moss removal"
      ],
      specialFeatures: [
        "Family-safe cleaning products",
        "Flexible scheduling around your routine",
        "Landscaping protection during service",
        "Interior window cleaning available"
      ],
      image: "/lovable-uploads/ef45fd36-a81d-41a3-8184-d3a91694f5ca.png",
      link: "/services/window-cleaning"
    },
    {
      icon: Building2,
      title: "Commercial Buildings",
      description: "Professional exterior cleaning services for offices, retail spaces, and business complexes.",
      services: [
        "High-rise window cleaning",
        "Building facade pressure washing",
        "Commercial gutter systems",
        "Maintenance programs available"
      ],
      specialFeatures: [
        "After-hours & weekend scheduling",
        "Fully insured & bonded",
        "Custom maintenance contracts",
        "Minimal business disruption"
      ],
      image: "/lovable-uploads/8a7d4e73-fa89-44ab-8814-ecaed5b1d23c.png",
      link: "/services/commercial-window-cleaning"
    },
    {
      icon: Building,
      title: "Multi-Story Apartments",
      description: "Specialized cleaning for apartment complexes, condos, and high-rise residential buildings.",
      services: [
        "Water-fed pole window cleaning",
        "Balcony & exterior cleaning",
        "Common area maintenance",
        "Strata-approved services"
      ],
      specialFeatures: [
        "Reach up to 5 stories safely",
        "Strata council coordination",
        "Bulk pricing for multiple units",
        "Regular maintenance schedules"
      ],
      image: "/lovable-uploads/76968d4f-c862-4989-a3e3-b74ac31968e2.png",
      link: "/services/window-cleaning"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tailored Services for Every Property Type
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From residential homes to commercial buildings, we provide specialized cleaning solutions 
            designed for your specific property needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {propertyTypes.map((property, index) => {
            const IconComponent = property.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-bc-red/10 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-bc-red" />
                    </div>
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{property.title}</h3>
                  <p className="text-gray-600 mb-4">{property.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-bc-red">Our Services:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {property.services.map((service, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-bc-red rounded-full mr-2"></div>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-bc-red">Why Choose Us:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {property.specialFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button asChild className="w-full bg-bc-red hover:bg-red-700">
                    <Link to={property.link}>
                      Get Quote for {property.title}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PropertySpecificSection;
