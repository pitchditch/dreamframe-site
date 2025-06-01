
import React from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Droplets, Home, Wind, Download, Phone, Mail, MapPin } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const MoreServicesSection = () => {
  const services = [
    {
      title: 'Gutter Cleaning',
      description: 'Remove debris and ensure proper water flow to prevent costly damage.',
      icon: <Wind className="h-6 w-6 text-green-500" />,
      image: '/lovable-uploads/3f5a834d-b684-4522-a2a6-e877e036ccd8.png',
      link: '/services/gutter-cleaning'
    },
    {
      title: 'Pressure Washing',
      description: 'Restore the beauty of your property by removing dirt, grime, and stains.',
      icon: <Home className="h-6 w-6 text-bc-red" />,
      image: '/lovable-uploads/e76ecfc1-a3a8-44d8-9a4a-5e1bf7c32282.png',
      link: '/services/pressure-washing'
    },
    {
      title: 'Roof Cleaning',
      description: 'Remove moss, algae, and debris to extend the life of your roof.',
      icon: <Home className="h-6 w-6 text-amber-700" />,
      image: '/lovable-uploads/47504564-617f-4553-85c8-0f9f5d5ec715.png',
      link: '/services/roof-cleaning'
    }
  ];

  const downloadContactCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:BC Pressure Washing
ORG:BC Pressure Washing
TEL:+1-778-808-7620
EMAIL:info@bcpressurewashing.ca
URL:https://bcpressurewashing.ca
ADR:;;White Rock;BC;;Canada
NOTE:Professional pressure washing and window cleaning services in Surrey, White Rock & Greater Vancouver
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'BC-Pressure-Washing-Contact.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Looking for More Services?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore our full range of professional cleaning services designed to enhance and protect your property.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <Link to={service.link} className="block">
                <div className="relative h-48 overflow-hidden cursor-pointer group">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">Learn More</span>
                  </div>
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="mr-2 bg-white p-2 rounded-full shadow-sm">{service.icon}</div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button asChild variant="bc-red" className="w-full">
                  <Link to={service.link}>Learn More</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Download Contact Card Section */}
        <div className="mt-16 bg-gradient-to-r from-bc-red to-red-600 rounded-lg p-8 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Save Our Contact Info</h3>
            <p className="text-lg mb-6 opacity-90">
              Download our contact card to your phone for quick access to our services
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-center justify-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>778-808-7620</span>
              </div>
              <div className="flex items-center justify-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>Quick Response</span>
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>Surrey & White Rock</span>
              </div>
            </div>
            
            <Button 
              onClick={downloadContactCard}
              variant="outline" 
              className="bg-white text-bc-red hover:bg-gray-100 border-white"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Contact Card
            </Button>
            
            <p className="text-sm mt-4 opacity-75">
              Compatible with iPhone, Android, and all modern devices
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-bc-red text-bc-red hover:bg-bc-red hover:text-white">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MoreServicesSection;
