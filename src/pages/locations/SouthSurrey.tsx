
import React from 'react';
import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Shield, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';

const SouthSurrey = () => {
  return (
    <Layout
      title="Professional Pressure Washing South Surrey | BC Pressure Washing"
      description="Expert pressure washing, window cleaning & roof cleaning in South Surrey. Local, licensed & insured. Free quotes! Serving Ocean Park, Crescent Beach & surrounding areas."
      canonicalUrl="/locations/south-surrey"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/c7c051d8-a96a-431f-b1ce-0753dc0bddc5.png" 
            alt="BC Pressure Washing serving South Surrey" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Professional Pressure Washing in South Surrey
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Serving Ocean Park, Crescent Beach, and all South Surrey neighborhoods with expert exterior cleaning services
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
              <span>Based in White Rock</span>
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

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our South Surrey Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-bc-red/10 rounded-full flex items-center justify-center">
                <img src="/lovable-uploads/96663638-df7a-4bbc-819f-f89853833dcf.png" alt="Window Cleaning" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Window Cleaning</h3>
              <p className="text-gray-600">Crystal clear windows for Ocean Park homes</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-bc-red/10 rounded-full flex items-center justify-center">
                <img src="/lovable-uploads/ea700c91-f17c-4daa-bd2f-ef22c893d921.png" alt="Pressure Washing" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pressure Washing</h3>
              <p className="text-gray-600">Driveways, patios, and exterior cleaning</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-bc-red/10 rounded-full flex items-center justify-center">
                <img src="/lovable-uploads/f88634ea-9711-4868-962f-e27e65866f0d.png" alt="Gutter Cleaning" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gutter Cleaning</h3>
              <p className="text-gray-600">Complete gutter system maintenance</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-bc-red/10 rounded-full flex items-center justify-center">
                <img src="/lovable-uploads/7a0d94ff-3dea-4fa6-afe4-a8f49e0e220b.png" alt="Roof Cleaning" className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Roof Cleaning</h3>
              <p className="text-gray-600">Safe moss and algae removal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Local Areas Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Servicing All South Surrey Areas</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-4">
              <h3 className="font-semibold">Ocean Park</h3>
              <p className="text-sm text-gray-600">Beachfront properties</p>
            </div>
            <div className="text-center p-4">
              <h3 className="font-semibold">Crescent Beach</h3>
              <p className="text-sm text-gray-600">Oceanfront homes</p>
            </div>
            <div className="text-center p-4">
              <h3 className="font-semibold">Elgin</h3>
              <p className="text-sm text-gray-600">Heritage area</p>
            </div>
            <div className="text-center p-4">
              <h3 className="font-semibold">Grandview Heights</h3>
              <p className="text-sm text-gray-600">New developments</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg mb-6">
              <strong>Located just minutes away:</strong> We're based in White Rock and serve all South Surrey neighborhoods within 15 minutes. 
              Look for our red BC Pressure Washing vehicle around town!
            </p>
            <Button asChild variant="bc-red" size="lg">
              <Link to="/calculator">Get Your South Surrey Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <BeforeAfterGallery />

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* Trust Signals */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 text-bc-red mb-4" />
              <h3 className="font-semibold">Licensed & Insured</h3>
              <p className="text-sm text-gray-600">Full WCB coverage</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-12 h-12 text-bc-red mb-4" />
              <h3 className="font-semibold">5-Star Rated</h3>
              <p className="text-sm text-gray-600">Google Reviews</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-12 h-12 text-bc-red mb-4" />
              <h3 className="font-semibold">Same Day Service</h3>
              <p className="text-sm text-gray-600">When available</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-12 h-12 text-bc-red mb-4" />
              <h3 className="font-semibold">Local Owner</h3>
              <p className="text-sm text-gray-600">Jayden Fisher</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Service Area</h2>
          <ServiceAreaMap />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-bc-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Book Your South Surrey Service?</h2>
          <p className="text-xl mb-8">Professional exterior cleaning with a local touch</p>
          
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

export default SouthSurrey;
