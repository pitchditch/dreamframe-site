
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';
import { House, Building, Building2 } from 'lucide-react';

const PropertyTypesSection = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Ready to Transform Your Property?
          </h2>
          <p className="text-xl text-yellow-600 font-semibold mb-6">
            Tailored Services for Every Need
          </p>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            From residential homes to commercial buildings, BC Pressure Washing delivers specialized exterior 
            cleaning solutions designed for your specific property needs in Surrey, White Rock & Metro Vancouver.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Residential Homes Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <House className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Residential Homes</h3>
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                Starting From $99
              </div>
              <p className="text-gray-600 mb-4">
                Fast, affordable exterior home cleaning
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Transform your home's appearance with our comprehensive exterior cleaning services.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Services Include</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• House washing (siding & stucco)</li>
                <li>• Window & frame cleaning</li>
                <li>• Driveway & sidewalk cleaning</li>
                <li>• Deck & patio restoration</li>
                <li>• Gutter cleaning & maintenance</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Why Choose Us</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Fast response & licensed</li>
                <li>• Safe, soft wash for all surfaces</li>
                <li>• Eco-friendly cleaning solutions</li>
                <li>• Fully insured up to $2M liability</li>
              </ul>
            </div>

            <Button asChild variant="bc-red" className="w-full">
              <Link to="/calculator">Get Free Home Quote</Link>
            </Button>
          </div>

          {/* Commercial Buildings Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Commercial Buildings</h3>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                Custom pricing available
              </div>
              <p className="text-gray-600 mb-4">
                Superior cleans with a spotless exterior
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Maintain a professional image with our commercial exterior cleaning services.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Services Include</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Building exterior pressure washing</li>
                <li>• Storefront & signage</li>
                <li>• Concrete walks & sidewalks</li>
                <li>• Parking lot cleaning</li>
                <li>• Window cleaning (commercial)</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Why Choose Us</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Licensed & bonded</li>
                <li>• After-hours services</li>
                <li>• Monthly maintenance plans</li>
                <li>• Commercial liability insurance</li>
              </ul>
            </div>

            <Button asChild variant="bc-red" className="w-full">
              <Link to="/contact">Get Commercial Quote</Link>
            </Button>
          </div>

          {/* Multi-Story Apartments Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Multi-Story Apartments</h3>
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                Volume discounts available
              </div>
              <p className="text-gray-600 mb-4">
                Safe & scalable cleaning for complexes
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Expert cleaning services for apartment buildings, condos, and high-rise residential properties.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Services Include</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Building exterior cleaning</li>
                <li>• Balcony window cleaning (up to 3 stories)</li>
                <li>• Common areas & hallway rinses</li>
                <li>• Stairwell & walkway maintenance</li>
                <li>• Parking garage cleaning</li>
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Why Choose Us</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Multi-level reach & platform equipment</li>
                <li>• Soft washing – avoids damaging</li>
                <li>• Respectful to safety policies conditioning</li>
                <li>• Volume discounts for large properties</li>
              </ul>
            </div>

            <Button asChild variant="bc-red" className="w-full">
              <Link to="/calculator">Request Strata Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyTypesSection;
