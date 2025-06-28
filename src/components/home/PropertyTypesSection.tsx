
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';
import { House, Building, Building2 } from 'lucide-react';
import PropertyTypesSlideshow from './PropertyTypesSlideshow';

const PropertyTypesSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background slideshow - ensure it's always visible */}
      <div className="absolute inset-0 z-0">
        <PropertyTypesSlideshow />
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-2xl">
              Ready to Transform Your Property?
            </h2>
            <p className="text-xl md:text-2xl text-yellow-400 font-semibold mb-6 drop-shadow-2xl">
              Tailored Services for Every Need
            </p>
            <p className="text-lg md:text-xl text-white/95 max-w-4xl mx-auto drop-shadow-2xl font-medium">
              From residential homes to commercial buildings, BC Pressure Washing delivers specialized exterior 
              cleaning solutions designed for your specific property needs in Surrey, White Rock & Metro Vancouver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Residential Homes Card */}
            <div className="bg-white/98 backdrop-blur-md rounded-xl shadow-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <House className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Residential Homes</h3>
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold inline-block mb-4 shadow-md">
                  Starting From $99
                </div>
                <p className="text-gray-700 mb-4 font-semibold">
                  Fast, affordable exterior home cleaning
                </p>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Transform your home's appearance with our comprehensive exterior cleaning services.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Services Include</h4>
                <ul className="text-sm text-gray-700 space-y-2 font-medium">
                  <li>• House washing (siding & stucco)</li>
                  <li>• Window & frame cleaning</li>
                  <li>• Driveway & sidewalk cleaning</li>
                  <li>• Deck & patio restoration</li>
                  <li>• Gutter cleaning & maintenance</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Why Choose Us</h4>
                <ul className="text-sm text-gray-700 space-y-2 font-medium">
                  <li>• Fast response & licensed</li>
                  <li>• Safe, soft wash for all surfaces</li>
                  <li>• Eco-friendly cleaning solutions</li>
                  <li>• Fully insured up to $2M liability</li>
                </ul>
              </div>

              <Button asChild variant="bc-red" className="w-full font-bold text-base py-3 shadow-lg hover:shadow-xl">
                <Link to="/calculator">Get Free Home Quote</Link>
              </Button>
            </div>

            {/* Commercial Buildings Card */}
            <div className="bg-white/98 backdrop-blur-md rounded-xl shadow-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Building className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Commercial Buildings</h3>
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold inline-block mb-4 shadow-md">
                  Custom pricing available
                </div>
                <p className="text-gray-700 mb-4 font-semibold">
                  Superior cleans with a spotless exterior
                </p>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Maintain a professional image with our commercial exterior cleaning services.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Services Include</h4>
                <ul className="text-sm text-gray-700 space-y-2 font-medium">
                  <li>• Building exterior pressure washing</li>
                  <li>• Storefront & signage</li>
                  <li>• Concrete walks & sidewalks</li>
                  <li>• Parking lot cleaning</li>
                  <li>• Window cleaning (commercial)</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Why Choose Us</h4>
                <ul className="text-sm text-gray-700 space-y-2 font-medium">
                  <li>• Licensed & bonded</li>
                  <li>• After-hours services</li>
                  <li>• Monthly maintenance plans</li>
                  <li>• Commercial liability insurance</li>
                </ul>
              </div>

              <Button asChild variant="bc-red" className="w-full font-bold text-base py-3 shadow-lg hover:shadow-xl">
                <Link to="/contact">Get Commercial Quote</Link>
              </Button>
            </div>

            {/* Multi-Story Apartments Card */}
            <div className="bg-white/98 backdrop-blur-md rounded-xl shadow-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Building2 className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Multi-Story Apartments</h3>
                <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold inline-block mb-4 shadow-md">
                  Volume discounts available
                </div>
                <p className="text-gray-700 mb-4 font-semibold">
                  Safe & scalable cleaning for complexes
                </p>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Expert cleaning services for apartment buildings, condos, and high-rise residential properties.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Services Include</h4>
                <ul className="text-sm text-gray-700 space-y-2 font-medium">
                  <li>• Building exterior cleaning</li>
                  <li>• Balcony window cleaning (up to 3 stories)</li>
                  <li>• Common areas & hallway rinses</li>
                  <li>• Stairwell & walkway maintenance</li>
                  <li>• Parking garage cleaning</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Why Choose Us</h4>
                <ul className="text-sm text-gray-700 space-y-2 font-medium">
                  <li>• Multi-level reach & platform equipment</li>
                  <li>• Soft washing – avoids damage</li>
                  <li>• Respectful to safety policies</li>
                  <li>• Volume discounts for large properties</li>
                </ul>
              </div>

              <Button asChild variant="bc-red" className="w-full font-bold text-base py-3 shadow-lg hover:shadow-xl">
                <Link to="/calculator">Request Strata Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyTypesSection;
