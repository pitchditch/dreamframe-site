
import React from 'react';
import { useTranslation } from '@/hooks/use-translation';
import ServiceCard from '../ServiceCard';
import { Check } from 'lucide-react';

interface ServiceInfo {
  title: string;
  description: string;
  link: string;
  image: string;
  whatIsIncluded: string[];
}

const PremiumSolutionsSection = () => {
  const { t } = useTranslation();
  
  // Service information with "What's Included" lists
  const services: ServiceInfo[] = [
    {
      title: t('Window Cleaning'),
      description: t('Crystal-clear, streak-free windows using advanced pure water technology'),
      link: '/services/window-cleaning',
      image: '/lovable-uploads/3f12496a-a48d-49fe-b614-77435e9bab36.png',
      whatIsIncluded: [
        'Interior & exterior window cleaning',
        'Screen cleaning',
        'Frame & sill cleaning',
        'Gentle, eco-friendly cleaning solutions',
        'Track & detail cleaning'
      ]
    },
    {
      title: t('House Washing'),
      description: t('Restore the beauty of your exterior surfaces with our specialized pressure washing services'),
      link: '/services/pressure-washing',
      image: '/lovable-uploads/5ac75bee-3951-47f2-9a3c-871acaf8f01b.png',
      whatIsIncluded: [
        'Safe soft wash techniques with SH',
        'Surface cleaners for even results',
        'Extendable poles to reach hard-to-reach spots',
        '2 years guarantee no moss',
        'Eco-friendly cleaning solutions'
      ]
    },
    {
      title: t('Gutter Cleaning'),
      description: t('Maintain proper drainage and protect your foundation with thorough gutter cleaning'),
      link: '/services/gutter-cleaning',
      image: '/lovable-uploads/f899a443-8930-4364-b538-916f65545f84.png',
      whatIsIncluded: [
        'Roof blow off',
        'Complete gutter debris removal',
        'Gutter cleaning and flushing',
        'Installation of leaf guards (optional)',
        'Gutter stick installation (optional)'
      ]
    },
    {
      title: t('Roof Cleaning'),
      description: t('Remove unsightly moss, algae, and stains from your roof to extend its lifespan'),
      link: '/services/roof-cleaning',
      image: '/lovable-uploads/51f10eb0-c939-49d5-8ab5-2235a162169e.png',
      whatIsIncluded: [
        'Moss and algae treatment',
        'Low-pressure cleaning',
        'Preventative treatments',
        'Roof inspection for damage',
        'Gutter clearing included'
      ]
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Cleaning Solutions</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our comprehensive exterior cleaning services are designed to maintain and enhance the appearance and value of your property.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col h-full">
              <ServiceCard
                title={service.title}
                description={service.description}
                link={service.link}
                image={service.image}
                imageAlt={`${service.title} Service`}
              />
              
              {/* What's Included Section */}
              <div className="mt-4 bg-gray-50 p-4 rounded-lg flex-grow">
                <h4 className="font-semibold text-gray-800 mb-2">What's Included:</h4>
                <ul className="space-y-2">
                  {service.whatIsIncluded.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PremiumSolutionsSection;
