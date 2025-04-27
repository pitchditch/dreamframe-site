
import React from 'react';
import { Check, Shield, Star, Info, Droplet } from 'lucide-react';

const WhySection: React.FC = () => {
  const benefits = [
    {
      icon: <Check className="h-6 w-6 text-green-600" />,
      title: "Deep Cleaning",
      description: "Removes paint, silicone, stickers and construction debris"
    },
    {
      icon: <Shield className="h-6 w-6 text-bc-red" />,
      title: "No Damage",
      description: "Specialized techniques to protect glass & frames"
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      title: "Streak-Free Results",
      description: "Crystal clear windows that showcase your finished project"
    },
    {
      icon: <Info className="h-6 w-6 text-blue-500" />,
      title: "Expert Technicians",
      description: "Specifically trained in post-construction cleaning"
    },
    {
      icon: <Droplet className="h-6 w-6 text-blue-400" />,
      title: "Pure Water Technology",
      description: "Advanced equipment for spotless results"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Post-Construction Window Cleaning Takes a Pro</h2>
        <p className="text-gray-700 text-lg text-center mb-10 leading-relaxed">
          Construction debris like paint splatter, silicone, stickers, and drywall dust require specialized tools and techniques. 
          Our team is trained to clean without scratching the glass or damaging your frames. 
          We make your new build or renovation shine—literally.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-duration-300 flex items-start">
              <div className="mr-4 bg-gray-50 p-3 rounded-full">{benefit.icon}</div>
              <div>
                <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;
