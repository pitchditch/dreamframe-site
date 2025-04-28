import Layout from "../../components/Layout";
import { Helmet } from "react-helmet-async";
import ServiceHeader from "@/components/ServiceHeader";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import LocationBanner from "@/components/LocationBanner";

const CommercialPressureWashing = () => {
  return (
    <Layout>
      <Helmet>
        <title>Commercial Pressure Washing Services | BC Pressure Washing</title>
        <meta name="description" content="Professional commercial pressure washing services in Surrey & White Rock. Parking lots, building exteriors, and more. Get your free quote today!" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen hero-section">
        <div className="absolute inset-0">
          <img
            src="/lovable-uploads/a0183718-96c9-42ac-a572-bb3346c0485b.png"
            alt="Commercial Pressure Washing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Commercial Pressure Washing</h1>
            <p className="text-xl text-white/90 mb-8">Professional exterior cleaning solutions for your commercial property</p>
            <Button asChild variant="bc-red" size="lg">
              <Link to="/contact">Get Your Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Commercial Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <img
                src="/lovable-uploads/0a2c675b-c5a7-45d4-9c19-c39aa35dc1ab.png"
                alt="Sidewalk & Walkway Cleaning"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Sidewalk & Walkway Cleaning</h3>
              <p className="text-gray-600">Deep cleaning for sidewalks and walkways to remove grime, stains, and enhance curb appeal.</p>
            </div>

            {/* Service 2 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <img
                src="/lovable-uploads/2ef683f4-6d18-42c5-b492-a548de62e076.png"
                alt="Building Exterior Cleaning"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Building Exterior Cleaning</h3>
              <p className="text-gray-600">Professional cleaning for commercial building facades and exteriors.</p>
            </div>

            {/* Service 3 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <img
                src="/lovable-uploads/29d21ccd-b0c0-4f29-bc30-5cd60ee028d6.png"
                alt="Parking Garage Cleaning"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Parking Garage Cleaning</h3>
              <p className="text-gray-600">Thorough cleaning of parking garages to remove oil stains, dirt, and debris.</p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* 20% Off CTA */}
      <section className="relative w-full overflow-hidden py-24">
        <div className="absolute inset-0">
          <img
            src="/lovable-uploads/5d44ee99-a0e7-42c6-9ae8-ab7da11f82cb.png"
            alt="Special Offer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Limited Time Offer: 20% OFF Commercial Pressure Washing</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">Book now and save on our premium commercial pressure washing services. Offer valid for new clients only.</p>
          <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-6 text-lg">
            <Link to="/contact">Claim Your 20% Discount</Link>
          </Button>
        </div>
      </section>

      <LocationBanner />
    </Layout>
  );
};

export default CommercialPressureWashing;
