
import React from "react";
import Layout from "../../components/Layout";
import { Helmet } from "react-helmet-async";
import ServiceHeader from "@/components/ServiceHeader";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import ServiceAreaMap from "@/components/ServiceAreaMap";
import { ArrowRight } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
} from "@/components/ui/carousel";

const CommercialPressureWashing = () => {
  return (
    <Layout>
      <Helmet>
        <title>Commercial Pressure Washing Services | BC Pressure Washing</title>
        <meta name="description" content="Professional commercial pressure washing services in Surrey & White Rock. Parking lots, building exteriors, and more. Get your free quote today!" />
      </Helmet>

      {/* Hero Section */}
      <ServiceHeader
        title="Commercial Pressure Washing"
        description="Professional exterior cleaning solutions for your commercial property"
        imagePath="/lovable-uploads/5d44ee99-a0e7-42c6-9ae8-ab7da11f82cb.png"
        darkOverlay={true}
      />

      {/* Services Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-3 py-1 bg-bc-red text-white border-none">EXPERT SERVICES</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Commercial Cleaning Solutions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive pressure washing services for all types of commercial properties.
              Our experienced team uses professional-grade equipment for superior results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="/lovable-uploads/04bd3905-2c86-4062-9cec-ddbddead79ab.png" 
                alt="Building Exterior Cleaning" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Building Exterior Cleaning</h3>
                <p className="text-gray-600 mb-4">
                  Professional cleaning for building facades, storefronts, and exterior walls. Removes dirt, grime, and atmospheric pollution.
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  <li>Enhances property appearance</li>
                  <li>Prevents structural damage</li>
                  <li>Extends paint lifespan</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="/lovable-uploads/df1d5443-a527-44af-b261-a7bfde6064f7.png" 
                alt="Parking Lot & Concrete Cleaning" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Parking Lot & Concrete Cleaning</h3>
                <p className="text-gray-600 mb-4">
                  Deep cleaning for parking areas, sidewalks, and concrete surfaces. Removes oil stains, gum, and built-up grime.
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  <li>Improves safety by removing slippery substances</li>
                  <li>Enhances property curb appeal</li>
                  <li>Extends pavement lifespan</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img 
                src="/lovable-uploads/116727c7-867b-4c6c-b291-da7848be87ac.png" 
                alt="Graffiti Removal" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">Graffiti Removal</h3>
                <p className="text-gray-600 mb-4">
                  Fast and effective removal of unwanted graffiti from walls, fences, and other surfaces with specialized techniques.
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  <li>Restores professional appearance</li>
                  <li>Environmentally safe solutions</li>
                  <li>Prevents future tagging</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button asChild size="lg" className="bg-bc-red hover:bg-red-700">
              <Link to="/contact">
                Schedule Your Commercial Cleaning <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 20% Off CTA */}
      <section className="relative w-full overflow-hidden py-16">
        <div className="absolute inset-0">
          <img
            src="/lovable-uploads/40094f62-8278-4c5c-8d34-9b01a159f13b.png"
            alt="Special Offer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Limited Time Offer: 20% OFF Commercial Pressure Washing</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">Book now and save on our premium commercial pressure washing services. Offer valid for new clients only.</p>
          <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-6 text-lg">
            <Link to="/contact">Claim Your 20% Discount</Link>
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-3 py-1 bg-blue-600 text-white border-none">WHY CHOOSE US</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The BC Pressure Washing Advantage</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commercial cleaning services offer numerous benefits for your business property
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="bg-bc-red h-16 w-16 rounded-full flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Enhanced Curb Appeal</h3>
              <p className="text-gray-600">
                A clean exterior creates a positive first impression for customers, clients, and visitors to your business.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="bg-bc-red h-16 w-16 rounded-full flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Extended Property Lifespan</h3>
              <p className="text-gray-600">
                Regular cleaning prevents deterioration from dirt, mold, and contaminants, extending your property's lifespan.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="bg-bc-red h-16 w-16 rounded-full flex items-center justify-center mb-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Cost-Effective Maintenance</h3>
              <p className="text-gray-600">
                Regular cleaning prevents costly repairs and maintains your property value over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Projects Carousel */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-3 py-1 bg-yellow-400 text-black border-none">OUR WORK</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Recent Commercial Projects</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              See the transformative results of our commercial pressure washing services
            </p>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <img 
                  src="/lovable-uploads/04bd3905-2c86-4062-9cec-ddbddead79ab.png" 
                  alt="Commercial Building Washing" 
                  className="rounded-lg shadow-lg w-full h-80 object-cover"
                />
                <div className="mt-3 text-center">
                  <h3 className="text-lg font-bold text-white">Office Building Cleaning</h3>
                  <p className="text-gray-400">White Rock, BC</p>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <img 
                  src="/lovable-uploads/df1d5443-a527-44af-b261-a7bfde6064f7.png" 
                  alt="Parking Lot Cleaning" 
                  className="rounded-lg shadow-lg w-full h-80 object-cover"
                />
                <div className="mt-3 text-center">
                  <h3 className="text-lg font-bold text-white">Retail Parking Lot</h3>
                  <p className="text-gray-400">Surrey, BC</p>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <img 
                  src="/lovable-uploads/116727c7-867b-4c6c-b291-da7848be87ac.png" 
                  alt="Restaurant Patio Cleaning" 
                  className="rounded-lg shadow-lg w-full h-80 object-cover"
                />
                <div className="mt-3 text-center">
                  <h3 className="text-lg font-bold text-white">Restaurant Exterior</h3>
                  <p className="text-gray-400">Langley, BC</p>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Service Area Map */}
      <ServiceAreaMap />

      {/* CTA Section */}
      <section className="py-16 bg-bc-red">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Commercial Property?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote on our commercial pressure washing services.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg" className="bg-white text-bc-red hover:bg-gray-100">
              <Link to="/contact">Get Your Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/calculator">Use Price Calculator</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CommercialPressureWashing;
