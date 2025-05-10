
import React from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

const PremiumSolutionsSection = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      title: 'Window Cleaning',
      description: 'Crystal-clear windows inside and out using eco-friendly solutions.',
      link: '/services/window-cleaning',
      image: '/lovable-uploads/3f12496a-a48d-49fe-b614-77435e9bab36.png',
      emoji: '🪟',
      included: [
        'Exterior & interior window cleaning',
        'Screen & sill wipe-down',
        'Streak-free finish',
        'Track & debris cleaning'
      ]
    },
    {
      title: 'House Washing',
      description: 'Gentle soft-washing to remove dirt, mold, and algae without damage.',
      link: '/services/pressure-washing',
      image: '/lovable-uploads/5ac75bee-3951-47f2-9a3c-871acaf8f01b.png',
      emoji: '🏡',
      included: [
        'Soft wash siding treatment',
        'Algae & mildew removal',
        'Safe for stucco, vinyl, wood',
        'Enhanced curb appeal'
      ]
    },
    {
      title: 'Gutter Cleaning',
      description: 'Prevent clogs and overflow damage with professional gutter care.',
      link: '/services/gutter-cleaning',
      image: '/lovable-uploads/f899a443-8930-4364-b538-916f65545f84.png',
      emoji: '🪜',
      included: [
        'Interior debris removal',
        'Downspout flushing',
        'Exterior gutter brightening',
        'Safe ladder access'
      ]
    },
    {
      title: 'Roof Cleaning',
      description: 'Eliminate moss, algae, and stains — extend roof life safely.',
      link: '/services/roof-cleaning',
      image: '/lovable-uploads/51f10eb0-c939-49d5-8ab5-2235a162169e.png',
      emoji: '🏠',
      included: [
        'Soft wash or brushing method',
        'Moss & algae treatment',
        'Roof inspection',
        'Gentle on shingles (no pressure)'
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center">
            <span className="text-4xl mr-2">🧼</span> Premium Cleaning Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Enhance your home's curb appeal and protect its value with professional, fully insured exterior cleaning services — personally checked by Jayden Fisher.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-xl hover:-translate-y-1">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 p-3">
                  <span className="text-3xl">{service.emoji}</span>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-500 mb-2">Included:</h4>
                  <ul className="space-y-2">
                    {service.included.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto pt-2">
                  <Link 
                    to={service.link} 
                    className="flex items-center text-bc-red hover:text-bc-red/80 font-medium"
                  >
                    Learn More <ArrowRight className="ml-1" size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumSolutionsSection;
