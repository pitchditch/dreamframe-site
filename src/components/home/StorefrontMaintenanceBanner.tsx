
import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StorefrontMaintenanceBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="badge-pill mb-4">Commercial Maintenance Program</div>
            <h2 className="text-3xl font-bold mb-6">Monthly Window Cleaning for Storefronts</h2>
            <p className="text-gray-600 mb-6">
              Keep your business looking its best with our affordable monthly maintenance program. 
              Starting at just $10 per window per month, our professional window cleaning services 
              ensure your storefront always makes a great impression.
            </p>
            
            <div className="bg-white p-5 rounded-lg shadow-sm mb-6 border border-gray-200">
              <h3 className="font-bold text-lg mb-3">Why Choose Our Maintenance Program?</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" />
                  <span>Consistent professional appearance for your business</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" />
                  <span>Regular scheduled cleaning - no need to remember to book</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" />
                  <span>Cost-effective pricing from $10 per window monthly</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" />
                  <span>Serving White Rock, Surrey, and Metro Vancouver businesses</span>
                </li>
              </ul>
            </div>
            
            <Link to="/services/commercial-window-cleaning">
              <Button className="bg-bc-red hover:bg-red-700">
                Learn More About Maintenance Program <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img 
                src="/lovable-uploads/778caebd-6aa4-4699-9475-6090b08b7d12.png" 
                alt="Commercial Window Cleaning Service in White Rock | Professional Storefront Maintenance" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-bc-red text-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <Building className="mr-2" />
                  <div>
                    <p className="text-lg font-bold">$10</p>
                    <p className="text-xs">per window monthly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorefrontMaintenanceBanner;
