
import React from 'react';
import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Shield, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';

const Langley = () => {
  return (
    <Layout
      title="Professional Pressure Washing Langley | BC Pressure Washing"
      description="Expert pressure washing, window cleaning & roof cleaning in Langley, BC. Licensed, insured & local. Free quotes! Serving Willoughby, Walnut Grove & all Langley areas."
      canonicalUrl="/locations/langley"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/c7c051d8-a96a-431f-b1ce-0753dc0bddc5.png" 
            alt="BC Pressure Washing serving Langley" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Professional Pressure Washing in Langley
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Serving Willoughby, Walnut Grove, Fort Langley and all Langley neighborhoods with expert exterior cleaning
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-white font-bold">
              <Link to="/calculator">Get Free Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
              <a href="tel:778-808-7620">Call (778) 808-7620</a>
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Serving All Langley</span>
            </div>
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              <span>Same Day Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* Local Focus Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Langley's Trusted Exterior Cleaning Experts</h2>
          
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg text-gray-700 mb-6">
              Based in nearby White Rock, we've been serving Langley homeowners for years. Whether you're in the historic Fort Langley area, 
              the growing Willoughby neighborhood, or anywhere in between, we know the unique cleaning challenges of your area.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Why Langley Homeowners Choose Us:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <span>Understanding of Langley's weather patterns</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <span>Experience with Fraser Valley moss and algae</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <span>Quick response time from White Rock</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <span>Familiar with local building styles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Complete Exterior Cleaning for Langley Homes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-bc-red/10 rounded-full flex items-center justify-center">
                <img src="/lovable-uploads/96663638-df7a-4bbc-819f-f89853833dcf.png" alt="Window Cleaning" className="w-10 h-10 object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Window Cleaning</h3>
              <p className="text-gray-600 mb-4">Interior & exterior window cleaning for crystal clear views</p>
              <Link to="/services/window-cleaning" className="text-bc-red hover:underline">Learn More →</Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-bc-red/10 rounded-full flex items-center justify-center">
                <img src="/lovable-uploads/ea700c91-f17c-4daa-bd2f-ef22c893d921.png" alt="Pressure Washing" className="w-10 h-10 object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pressure Washing</h3>
              <p className="text-gray-600 mb-4">Driveways, patios, fences, and exterior surfaces</p>
              <Link to="/services/pressure-washing" className="text-bc-red hover:underline">Learn More →</Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-bc-red/10 rounded-full flex items-center justify-center">
                <img src="/lovable-uploads/f88634ea-9711-4868-962f-e27e65866f0d.png" alt="Gutter Cleaning" className="w-10 h-10 object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gutter Cleaning</h3>
              <p className="text-gray-600 mb-4">Complete gutter cleaning and maintenance service</p>
              <Link to="/services/gutter-cleaning" className="text-bc-red hover:underline">Learn More →</Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-bc-red/10 rounded-full flex items-center justify-center">
                <img src="/lovable-uploads/7a0d94ff-3dea-4fa6-afe4-a8f49e0e220b.png" alt="Roof Cleaning" className="w-10 h-10 object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Roof Cleaning</h3>
              <p className="text-gray-600 mb-4">Safe moss removal and roof maintenance</p>
              <Link to="/services/roof-cleaning" className="text-bc-red hover:underline">Learn More →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Langley Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Serving All Langley Neighborhoods</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Willoughby</h3>
              <p className="text-sm text-gray-600">New developments</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Walnut Grove</h3>
              <p className="text-sm text-gray-600">Family neighborhoods</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Fort Langley</h3>
              <p className="text-sm text-gray-600">Historic area</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Brookswood</h3>
              <p className="text-sm text-gray-600">Rural properties</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Fernridge</h3>
              <p className="text-sm text-gray-600">Established area</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Murrayville</h3>
              <p className="text-sm text-gray-600">Central Langley</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Township Core</h3>
              <p className="text-sm text-gray-600">Downtown area</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">Yorkson</h3>
              <p className="text-sm text-gray-600">Modern homes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <BeforeAfterGallery />

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* Service Area Map */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">We're Just Minutes Away</h2>
          <ServiceAreaMap />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-bc-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Book Your Langley Cleaning Service Today</h2>
          <p className="text-xl mb-8">Professional, reliable, and local exterior cleaning services</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="outline" size="lg" className="bg-white text-bc-red hover:bg-gray-100">
              <Link to="/calculator">Get Free Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white text-bc-red hover:bg-gray-100">
              <a href="tel:778-808-7620">Call (778) 808-7620</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Langley;
