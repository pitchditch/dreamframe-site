import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import CallToAction from '../../components/CallToAction';
import { Check, Shield, Droplets, Home, Car, TreePine } from 'lucide-react';
import MoreServicesSection from '../../components/MoreServicesSection';
import CitiesCarousel from '@/components/CitiesCarousel';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import { Card } from '@/components/ui/card';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PressureWashing = () => {
  const faqs = [
    {
      question: "Do you use eco-friendly cleaning solutions?",
      answer: "Yes, we use biodegradable, environmentally friendly cleaning solutions that are safe for your property, your family, and your pets, while still delivering excellent cleaning results."
    },
    {
      question: "Will pressure washing damage my property?",
      answer: "Our technicians are trained to use appropriate pressure levels for different surfaces. We utilize soft washing techniques for delicate surfaces and adjust our approach to ensure effective cleaning without damage."
    },
    {
      question: "How often should I have my property pressure washed?",
      answer: "Most residential properties benefit from annual pressure washing. However, homes in areas with high humidity, extensive tree coverage, or near water bodies may require cleaning every 6-8 months to prevent buildup of organic growth."
    },
    {
      question: "How long does pressure washing take?",
      answer: "The time required depends on the size and condition of the area being cleaned. A typical house exterior might take 3-5 hours, while a driveway or deck could take 1-2 hours. We'll provide a time estimate when you book your service."
    },
    {
      question: "What preparation is needed before you arrive?",
      answer: "We ask that you remove any obstacles like furniture, potted plants, garden hoses, and vehicles from the areas to be cleaned. Also, please ensure exterior electrical outlets are accessible and water sources are turned on."
    }
  ];
  
  return (
    <Layout 
      title="Professional Pressure Washing Services | BC Pressure Washing" 
      description="Get expert pressure washing in Surrey, White Rock & Metro Vancouver. Safe, eco-friendly soft wash & power wash solutions. Request a free quote today!"
    >
      <ServiceHeader 
        title="Revitalize Your Home with Expert Pressure Washing"
        description="Restore the beauty of your siding, decks, driveways, and more with our safe, eco-friendly pressure and soft washing services."
        youtubeId="HuXyYAxC4Fs"
        youtubeDesktopId="lYnXijewxCM"
      />
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6 heading-text">Instantly Improve Curb Appeal</h2>
            <p className="text-lg text-gray-700 mb-8 content-text">
              Our pressure washing removes dirt, algae, mold, and stains to reveal your home's true beauty—protecting your investment and boosting value.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="flex flex-col items-center space-y-4 bg-gray-50 p-6 rounded-lg">
                <Shield className="w-12 h-12 text-bc-red" />
                <span className="font-medium text-center">Safe for All Surfaces</span>
              </div>
              <div className="flex flex-col items-center space-y-4 bg-gray-50 p-6 rounded-lg">
                <Droplets className="w-12 h-12 text-bc-red" />
                <span className="font-medium text-center">Eco-Friendly & Biodegradable Solutions</span>
              </div>
              <div className="flex flex-col items-center space-y-4 bg-gray-50 p-6 rounded-lg">
                <img 
                  src="/lovable-uploads/945062d9-44b6-4de9-8837-15314feb633a.png" 
                  alt="Professional pressure washing equipment used by BC Pressure Washing" 
                  title="Commercial-grade pressure washing equipment"
                  className="w-12 h-12 object-contain" 
                  loading="lazy"
                />
                <span className="font-medium text-center">Professional-Grade Equipment</span>
              </div>
              <div className="flex flex-col items-center space-y-4 bg-gray-50 p-6 rounded-lg">
                <Check className="w-12 h-12 text-bc-red" />
                <span className="font-medium text-center">Fully Insured & Satisfaction Guaranteed</span>
              </div>
            </div>

            <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold">
              <Link to="/calculator">Check Prices & Availability</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* What We Clean Section - Restored with proper images and metadata */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Surfaces We Professionally Clean</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            From house siding to driveways, we clean all exterior surfaces with the right technique for optimal results.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            <Link to="/services/pressure-washing" className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg hover:shadow-md transition-shadow group">
              <img 
                src="/lovable-uploads/77a691e2-8b93-4749-be35-5ca5bbf137b3.png" 
                alt="House siding pressure washing Surrey - vinyl, stucco, brick, hardie board cleaning"
                title="Professional house siding cleaning - Surrey, White Rock"
                className="w-32 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform" 
                loading="lazy"
              />
              <span className="font-medium text-center">House Siding & Exterior Walls</span>
              <p className="text-sm text-gray-500 text-center">Vinyl, stucco, brick, hardie board</p>
            </Link>
            
            <Link to="/services/deck-cleaning" className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg hover:shadow-md transition-shadow group">
              <img 
                src="/lovable-uploads/197efc6d-85e4-474e-8c04-38e42cc66919.png" 
                alt="Deck and patio pressure washing Surrey - wood, composite, stone cleaning"
                title="Professional deck and patio cleaning services"
                className="w-32 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform" 
                loading="lazy"
              />
              <span className="font-medium text-center">Decks & Patios</span>
              <p className="text-sm text-gray-500 text-center">Wood, composite, stone surfaces</p>
            </Link>
            
            <Link to="/services/driveway-cleaning" className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg hover:shadow-md transition-shadow group">
              <img 
                src="/lovable-uploads/8f646c66-5a09-4335-a82d-e15a1d86a4c4.png" 
                alt="Driveway pressure washing Surrey - concrete, asphalt, paver cleaning"
                title="Professional driveway and walkway pressure washing"
                className="w-32 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform" 
                loading="lazy"
              />
              <span className="font-medium text-center">Driveways & Walkways</span>
              <p className="text-sm text-gray-500 text-center">Concrete, asphalt, pavers</p>
            </Link>
            
            <Link to="/services/fence-washing" className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg hover:shadow-md transition-shadow group">
              <img 
                src="/lovable-uploads/058537c2-5a7e-47ce-bf9d-ea1ada4c2595.png" 
                alt="Fence and gate pressure washing Surrey - wood, vinyl, metal cleaning"
                title="Professional fence and gate cleaning services"
                className="w-32 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform" 
                loading="lazy"
              />
              <span className="font-medium text-center">Fences & Gates</span>
              <p className="text-sm text-gray-500 text-center">Wood, vinyl, metal fencing</p>
            </Link>
            
            <Link to="/services/roof-cleaning" className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg hover:shadow-md transition-shadow group">
              <img 
                src="/lovable-uploads/f0a0ce40-19b0-45e9-90a2-a2794f220df3.png" 
                alt="Roof and gutter soft washing Surrey - moss removal, algae cleaning"
                title="Professional roof cleaning and gutter maintenance"
                className="w-32 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform" 
                loading="lazy"
              />
              <span className="font-medium text-center">Roofs & Gutters</span>
              <p className="text-sm text-gray-500 text-center">Soft wash moss & algae removal</p>
            </Link>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-4">Each surface requires specific pressure and cleaning techniques for optimal results without damage.</p>
            <Button asChild variant="bc-red">
              <Link to="/calculator">Get Free Quote for Your Surface</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Soft Wash vs Pressure Wash Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Choosing the Right Method for Your Home</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Method</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Pressure Washing</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 text-green-700">Soft Washing (Recommended)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-6 py-4 font-medium">Pressure</td>
                    <td className="px-6 py-4">High-pressure water</td>
                    <td className="px-6 py-4">Low-pressure with detergents</td>
                  </tr>
                  <tr className="border-t bg-gray-50">
                    <td className="px-6 py-4 font-medium">Best For</td>
                    <td className="px-6 py-4">Concrete, brick, stone</td>
                    <td className="px-6 py-4">Siding, roofs, stucco</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-6 py-4 font-medium">Risks</td>
                    <td className="px-6 py-4">Can damage delicate materials</td>
                    <td className="px-6 py-4">Safe for all surfaces</td>
                  </tr>
                  <tr className="border-t bg-gray-50">
                    <td className="px-6 py-4 font-medium">Benefit</td>
                    <td className="px-6 py-4">Removes tough stains</td>
                    <td className="px-6 py-4">Kills algae/mildew at the root</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-lg text-gray-700">
                Our technicians are trained to assess your property and apply the safest, most effective cleaning method.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* 3-Step Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Proven 3-Step Process for a Spotless Exterior</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold mb-4">Surface Inspection</h3>
              <p className="text-gray-600">We assess stains, surface type, and sensitivity.</p>
            </div>
            <div className="text-center bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold mb-4">Customized Cleaning</h3>
              <p className="text-gray-600">We apply the right pressure and cleaning solution.</p>
            </div>
            <div className="text-center bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold mb-4">Final Rinse & Inspection</h3>
              <p className="text-gray-600">Spot-check and detail clean all surfaces.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Driveway Cleaning Highlight */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-6">Driveway Cleaning in South Surrey</h2>
            <p className="text-lg text-center text-gray-700 mb-8">
              Oil stains? Moss? Our high-pressure cleaning brings driveways back to life.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Check className="w-6 h-6 text-green-600 mr-3" />
                  <span>Removes oil & grease stains</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-6 h-6 text-green-600 mr-3" />
                  <span>Eliminates slippery moss</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-6 h-6 text-green-600 mr-3" />
                  <span>Prevents long-term concrete damage</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-6 h-6 text-green-600 mr-3" />
                  <span>Optional sealing available</span>
                </div>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/b5967047-dddc-47e1-a23c-dd4a5feb9125.png" 
                  alt="Driveway before and after cleaning"
                  className="rounded-lg shadow-md max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our pressure washing services"
        faqs={faqs}
      />
      
      <MoreServicesSection />
      
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Areas We Service</h2>
          <ServiceAreaMap />
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-16 bg-bc-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Restore Your Home's Beauty?</h2>
          <p className="text-xl mb-8">Get professional pressure washing that protects and beautifies your property</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button asChild variant="outline" size="lg" className="bg-white text-bc-red hover:bg-gray-100 border-white">
              <Link to="/contact">Request Free Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white text-bc-red hover:bg-gray-100 border-white">
              <Link to="/calculator">Compare Prices & Packages</Link>
            </Button>
          </div>
          
          <div className="text-center">
            <a 
              href="tel:7788087620" 
              className="inline-flex items-center justify-center bg-white text-bc-red px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              📞 Call (778) 808-7620
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PressureWashing;
