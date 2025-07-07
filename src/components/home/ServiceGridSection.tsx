
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Droplets, 
  Home, 
  Building, 
  Trash2, 
  Car, 
  Sparkles 
} from 'lucide-react';

const services = [
  {
    id: 'windows',
    title: 'Window Cleaning',
    description: 'Crystal clear windows inside and out',
    icon: Sparkles,
    link: '/services/window-cleaning'
  },
  {
    id: 'pressure-washing',
    title: 'Pressure Washing',
    description: 'Driveways, patios, and walkways',
    icon: Droplets,
    link: '/services/pressure-washing'
  },
  {
    id: 'house-wash',
    title: 'House Washing',
    description: 'Complete exterior house cleaning',
    icon: Home,
    link: '/services/house-wash'
  },
  {
    id: 'gutters',
    title: 'Gutter Cleaning',
    description: 'Clean gutters and downspouts',
    icon: Trash2,
    link: '/services/gutter-cleaning'
  },
  {
    id: 'commercial',
    title: 'Commercial Services',
    description: 'Professional commercial cleaning',
    icon: Building,
    link: '/services/commercial-window-cleaning'
  },
  {
    id: 'roof-cleaning',
    title: 'Roof & Moss Removal',
    description: 'Safe roof cleaning and moss treatment',
    icon: Car,
    link: '/services/roof-cleaning'
  }
];

const ServiceGridSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            What Can We Clean for You Today?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional cleaning services throughout White Rock, Surrey & Metro Vancouver
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-bc-red/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-bc-red/20 transition-colors">
                    <service.icon className="w-8 h-8 text-bc-red" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button asChild className="w-full bg-bc-red hover:bg-red-700 text-white font-semibold">
                    <Link to={service.link}>
                      Learn More
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-bc-red text-bc-red hover:bg-bc-red hover:text-white">
                    <Link to="/calculator">
                      Get Instant Quote
                    </Link>
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

export default ServiceGridSection;
