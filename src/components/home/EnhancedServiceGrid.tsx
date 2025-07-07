
import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Home, Building, Zap, Car, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    icon: Droplet,
    title: "Window Cleaning",
    description: "Crystal clear windows",
    link: "/services/window-cleaning"
  },
  {
    icon: Zap,
    title: "Gutter Cleaning", 
    description: "Complete gutter system",
    link: "/services/gutter-cleaning"
  },
  {
    icon: Home,
    title: "House Soft Wash",
    description: "Gentle siding clean",
    link: "/services/house-wash"
  },
  {
    icon: Building,
    title: "Roof Cleaning",
    description: "Safe moss removal",
    link: "/services/roof-cleaning"
  },
  {
    icon: Car,
    title: "Driveway Cleaning",
    description: "Stain removal",
    link: "/services/pressure-washing"
  },
  {
    icon: Users,
    title: "Commercial Services",
    description: "Big buildings, no problem",
    link: "/services/commercial-pressure-washing"
  }
];

const EnhancedServiceGrid = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Can We Make Shine Today?
          </h2>
          <p className="text-lg text-gray-600">
            Professional cleaning services for every part of your property
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-bc-red/10 rounded-full flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-bc-red" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <Button asChild variant="bc-red" className="w-full">
                  <Link to={service.link}>
                    👉 Get Instant Pricing
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedServiceGrid;
