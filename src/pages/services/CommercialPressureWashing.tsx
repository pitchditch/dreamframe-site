import Layout from "../../components/Layout";
import { Helmet } from "react-helmet-async";
import ServiceHeader from "@/components/ServiceHeader";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import ServiceAreaMap from "@/components/ServiceAreaMap";
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
            src="/lovable-uploads/5d44ee99-a0e7-42c6-9ae8-ab7da11f82cb.png"
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

      {/* Service Area Map */}
      <ServiceAreaMap />

      {/* Remove duplicate location banner */}
    </Layout>
  );
};

export default CommercialPressureWashing;
