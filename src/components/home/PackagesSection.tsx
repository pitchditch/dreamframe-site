
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';

const PackagesSection = () => {
  const { t } = useTranslation();

  const packages = [
    {
      name: "Basic Clean",
      price: "$150",
      description: "Perfect for regular maintenance",
      features: [
        "Exterior window cleaning",
        "Basic pressure washing",
        "Gutter cleaning inspection",
        "30-day satisfaction guarantee"
      ],
      popular: false
    },
    {
      name: "Premium Service",
      price: "$300",
      description: "Our most popular package",
      features: [
        "Complete window cleaning (inside & out)",
        "Full pressure washing service",
        "Gutter cleaning & minor repairs",
        "Soft washing for delicate surfaces",
        "Post-service quality check",
        "60-day satisfaction guarantee"
      ],
      popular: true
    },
    {
      name: "Complete Property",
      price: "$500",
      description: "The ultimate cleaning experience",
      features: [
        "Everything in Premium Service",
        "Roof cleaning & moss removal",
        "Driveway & walkway deep clean",
        "Deck/patio restoration",
        "Window screen cleaning",
        "90-day satisfaction guarantee",
        "Priority scheduling"
      ],
      popular: false
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Perfect Package
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From basic maintenance to complete property transformation, 
            we have the right solution for your cleaning needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <div 
              key={index}
              className={`relative rounded-2xl p-8 ${
                pkg.popular 
                  ? 'bg-gradient-to-b from-bc-red to-red-600 text-white border-4 border-yellow-400 transform scale-105' 
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${pkg.popular ? 'text-white' : 'text-gray-900'}`}>
                  {pkg.name}
                </h3>
                <div className={`text-4xl font-bold mb-2 ${pkg.popular ? 'text-white' : 'text-bc-red'}`}>
                  {pkg.price}
                </div>
                <p className={`${pkg.popular ? 'text-white/90' : 'text-gray-600'}`}>
                  {pkg.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className={`w-5 h-5 mr-3 mt-0.5 flex-shrink-0 ${
                      pkg.popular ? 'text-white' : 'text-green-500'
                    }`} />
                    <span className={`${pkg.popular ? 'text-white' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button 
                asChild
                className={`w-full ${
                  pkg.popular 
                    ? 'bg-white text-bc-red hover:bg-gray-100' 
                    : 'bg-bc-red text-white hover:bg-red-700'
                }`}
              >
                <Link to="/calculator">Get Started</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild className="bg-bc-red hover:bg-red-700" size="lg">
            <Link to="/compare-prices">{t("Compare Our Prices & Packages")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
