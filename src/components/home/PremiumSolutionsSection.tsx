
import React from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { CheckCircle, Home, Building, Building2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const PremiumSolutionsSection = () => {
  const { t } = useTranslation();

  const propertyTypes = [
    {
      icon: Home,
      title: t('Residential Homes'),
      description: t('Complete exterior cleaning solutions for your home including windows, siding, driveways, and roofs.'),
      features: [
        t('Window & Screen Cleaning'),
        t('Pressure Washing & Soft Washing'),
        t('Gutter & Downspout Cleaning'),
        t('Roof Moss & Algae Removal')
      ],
      link: '/services/window-cleaning'
    },
    {
      icon: Building,
      title: t('Commercial Buildings'),
      description: t('Professional cleaning services for offices, retail spaces, and commercial properties with flexible scheduling.'),
      features: [
        t('Storefront Window Cleaning'),
        t('Building Exterior Washing'),
        t('Parking Lot & Sidewalk Cleaning'),
        t('Regular Maintenance Programs')
      ],
      link: '/services/commercial-window-cleaning'
    },
    {
      icon: Building2,
      title: t('Multi-Story Apartments'),
      description: t('Specialized equipment and techniques for high-rise cleaning with safety as our top priority.'),
      features: [
        t('High-Rise Window Cleaning'),
        t('Balcony & Patio Cleaning'),
        t('Common Area Maintenance'),
        t('Post-Construction Cleanup')
      ],
      link: '/services/post-construction-window-cleaning'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50" data-component="premium-solutions">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('Tailored Services for Every Property Type')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('From residential homes to commercial buildings and high-rise apartments, we deliver specialized cleaning solutions that meet the unique needs of your property.')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {propertyTypes.map((property, index) => {
            const IconComponent = property.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-bc-red/10 rounded-lg">
                    <IconComponent className="w-8 h-8 text-bc-red" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {property.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {property.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link to={property.link}>
                  <Button className="w-full bg-bc-red hover:bg-red-700 text-white font-semibold py-3 transition-all hover:scale-105">
                    {t('Get a Quote')}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('Why Choose BC Pressure Washing?')}
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-bc-red mb-2">15+</div>
                <div className="text-gray-700">{t('Years Experience')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-bc-red mb-2">100%</div>
                <div className="text-gray-700">{t('Satisfaction Guarantee')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-bc-red mb-2">24/7</div>
                <div className="text-gray-700">{t('Customer Support')}</div>
              </div>
            </div>
            <Link to="/calculator">
              <Button size="lg" className="bg-bc-red hover:bg-red-700 text-white font-bold px-8 py-4 text-lg transition-all hover:scale-105">
                {t('Start Your Free Quote Today')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSolutionsSection;
