
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Shield, Award, Users, Leaf, Clock, MapPin } from 'lucide-react';

const WhyChooseUsSection = () => {
  const isMobile = useIsMobile();

  const trustSignals = [
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Licensed & Insured",
      description: "WCB coverage and liability insurance for your complete peace of mind."
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      title: "100% Satisfaction Guarantee",
      description: "If you're not completely satisfied, we'll re-clean at no extra cost."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Experienced Local Team",
      description: "Family-owned and operating in White Rock/Surrey with trained specialists."
    },
    {
      icon: <Leaf className="h-8 w-8 text-green-600" />,
      title: "Eco-Friendly Products",
      description: "We use biodegradable cleaners that are safe for plants and pets."
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-600" />,
      title: "Free Estimates",
      description: "No-risk free quote - just tell us your needs and we'll provide pricing."
    },
    {
      icon: <MapPin className="h-8 w-8 text-bc-red" />,
      title: "Local Expertise",
      description: "Proudly serving White Rock, South Surrey & Metro Vancouver."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold mb-4 text-gray-900`}>
            Why Choose BC Pressure Washing
          </h2>
          <p className={`${isMobile ? 'text-base' : 'text-lg'} text-gray-600 max-w-3xl mx-auto`}>
            Our commitment to quality, safety, and customer satisfaction sets us apart
          </p>
        </div>
        
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'md:grid-cols-2 lg:grid-cols-3 gap-8'} max-w-6xl mx-auto`}>
          {trustSignals.map((signal, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-gray-50 p-3 rounded-full">
                  {signal.icon}
                </div>
                <div>
                  <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold mb-2 text-gray-900`}>
                    {signal.title}
                  </h3>
                  <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-600 leading-relaxed`}>
                    {signal.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl mx-auto border border-gray-200">
            <div className="flex items-center justify-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">4.9/5 (50+ reviews)</span>
            </div>
            <p className="text-gray-600">
              Trusted by homeowners across White Rock and South Surrey
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
