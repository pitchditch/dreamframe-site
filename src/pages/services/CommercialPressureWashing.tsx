
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
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="/lovable-uploads/82907073-704f-4b96-a76f-1b08a476e591.png"
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
                src="/lovable-uploads/ff11766d-4497-40dd-bc76-7bfc2346fe66.png"
                alt="Parking Garage Cleaning"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Parking Garage Cleaning</h3>
              <p className="text-gray-600">Deep cleaning for parking structures and garages to remove oil, grime, and stains.</p>
            </div>

            {/* Service 2 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <img
                src="/lovable-uploads/1b4e918a-f926-4618-b953-b91c2d5cbdfb.png"
                alt="Building Exterior Cleaning"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Building Exterior Cleaning</h3>
              <p className="text-gray-600">Professional cleaning for commercial building facades and exteriors.</p>
            </div>

            {/* Service 3 */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <img
                src="/lovable-uploads/29fa0b8a-6c18-4d5a-9253-e5e7fc0254a2.png"
                alt="Sidewalk & Walkway Cleaning"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Sidewalk & Walkway Cleaning</h3>
              <p className="text-gray-600">Thorough cleaning of walkways and common areas to maintain a professional appearance.</p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <LocationBanner />
    </Layout>
  );
};

export default CommercialPressureWashing;
