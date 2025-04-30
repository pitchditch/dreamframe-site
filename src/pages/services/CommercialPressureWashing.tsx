
import React from 'react';
import Layout from '@/components/Layout';
import ServiceHeader from '@/components/ServiceHeader';
import { Building, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import TrustSection from '@/components/post-construction/TrustSection';

const CommercialPressureWashing = () => {
  return (
    <Layout
      title="Commercial Pressure Washing Services | BC Pressure Washing"
      description="Professional commercial pressure washing services for businesses in White Rock, Surrey and Metro Vancouver. Storefront, parking lot, and concrete cleaning."
    >
      <ServiceHeader
        title="Commercial Pressure Washing"
        description="Professional cleaning solutions for businesses of all sizes"
        imagePath="/lovable-uploads/55d5e426-c21d-4c24-8cf1-0cc45bd0b603.png"
        icon={<Building size={40} />}
        darkOverlay
      />

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Professional Commercial Exterior Cleaning</h2>
              <p className="text-gray-600 mb-6">
                First impressions matter for your business. Our commercial pressure washing services help maintain a clean, professional, and welcoming environment for your customers and employees.
              </p>
              <p className="text-gray-600 mb-6">
                We use commercial-grade equipment and eco-friendly cleaning solutions to tackle even the toughest stains, grime, and buildup on your commercial property.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle2 className="text-bc-red flex-shrink-0 mt-1 mr-3" />
                  <p>Fully insured and trained technicians</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="text-bc-red flex-shrink-0 mt-1 mr-3" />
                  <p>Flexible scheduling to work around your business hours</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="text-bc-red flex-shrink-0 mt-1 mr-3" />
                  <p>Safe, effective cleaning methods for all surfaces</p>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="/lovable-uploads/fc1513eb-e5d4-4ac2-ab52-70b930041127.png"
                alt="Commercial pressure washing service" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Details */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Commercial Pressure Washing Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Building className="text-bc-red" />
              </div>
              <h3 className="text-xl font-bold mb-3">Storefront Cleaning</h3>
              <p className="text-gray-600 mb-4">
                Enhance your business's curb appeal with our thorough storefront cleaning service. We'll remove dirt, grime, and stains from your exterior walls, windows, and entryways.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Sidewalk and entrance cleaning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Awning and signage cleaning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Graffiti and gum removal</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="text-bc-red h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Parking Lot & Garage Cleaning</h3>
              <p className="text-gray-600 mb-4">
                Keep your parking areas clean and professional looking with our specialized cleaning services that remove oil stains, tire marks, and debris.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Oil and fluid stain removal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Parking space line cleaning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Garbage and loading area sanitization</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <ShieldCheck className="text-bc-red" />
              </div>
              <h3 className="text-xl font-bold mb-3">Building Exterior Cleaning</h3>
              <p className="text-gray-600 mb-4">
                Restore and maintain your building's exterior with our comprehensive cleaning services that remove algae, mold, mildew, and environmental buildup.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Brick, concrete, and siding cleaning</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Mold and mildew removal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Roof and gutter cleaning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* Call to Action */}
      <section className="bg-bc-red text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Improve Your Business's Image?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule a consultation with our commercial pressure washing experts to discuss your specific needs and get a customized cleaning plan.
          </p>
          <Button asChild size="lg" variant="secondary" className="px-8 py-6 text-lg font-semibold h-auto">
            <Link to="/calculator">Get a Free Quote</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default CommercialPressureWashing;
