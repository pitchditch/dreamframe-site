
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import CallToAction from '../../components/CallToAction';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Building, Droplets, Shield, Clock } from 'lucide-react';
import ServiceBenefits from '@/components/ServiceBenefits';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const benefits = [
  {
    title: "Enhance Property Appearance",
    description: "Make a great first impression with a clean, well-maintained exterior that reflects positively on your business."
  },
  {
    title: "Increase Property Value",
    description: "Regular exterior cleaning helps maintain and potentially increase your commercial property's market value."
  },
  {
    title: "Prevent Costly Repairs",
    description: "Remove harmful substances that can damage building materials over time, saving money on future repairs."
  },
  {
    title: "Promote Health & Safety",
    description: "Eliminate slip hazards, mold, mildew, and other contaminants to create a safer environment."
  },
  {
    title: "Eco-Friendly Solutions",
    description: "Our commercial cleaning services use environmentally responsible methods and detergents."
  },
  {
    title: "Minimal Business Disruption",
    description: "We work around your schedule to minimize impact on your business operations."
  }
];

const CommercialPressureWashing = () => {
  return (
    <Layout title="Commercial Pressure Washing | BC Pressure Washing" description="Professional commercial pressure washing services for businesses, strata properties, and commercial buildings in Surrey & White Rock.">
      {/* Hero Section */}
      <ServiceHeader 
        title="Commercial Pressure Washing" 
        description="Professional pressure washing services for businesses, strata properties, and multi-unit commercial buildings." 
        icon={<Building size={48} />}
        imagePath="/lovable-uploads/7e9cf820-2d47-4386-aded-a503878ae1a1.png"
        darkOverlay={true}
      />

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Professional Commercial Cleaning Solutions</h2>
              <p className="text-gray-600 mb-6">
                At BC Pressure Washing, we understand that the appearance of your commercial property directly impacts your business image. Our commercial pressure washing services are designed to refresh and maintain your property's exterior, enhancing its curb appeal and prolonging its lifespan.
              </p>
              <p className="text-gray-600 mb-6">
                We utilize state-of-the-art equipment and eco-friendly cleaning solutions to tackle even the toughest grime, grease, mold, and stains. Our team is trained to work efficiently while minimizing disruption to your business operations.
              </p>
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center">
                  <Shield className="text-bc-red mr-2" size={24} />
                  <span className="font-medium">Fully Insured</span>
                </div>
                <div className="flex items-center">
                  <Clock className="text-bc-red mr-2" size={24} />
                  <span className="font-medium">Flexible Scheduling</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-bc-red mr-2" size={24} />
                  <span className="font-medium">100% Satisfaction</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/7e9cf820-2d47-4386-aded-a503878ae1a1.png" 
                alt="Commercial Pressure Washing Service" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <ServiceBenefits
        title="Why Choose Professional Commercial Pressure Washing"
        subtitle="Discover the benefits of our commercial exterior cleaning services"
        benefits={benefits}
      />

      {/* Services We Offer Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Commercial Pressure Washing Services We Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Walkways and Pavement Cleaning */}
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/lovable-uploads/61b48172-e11a-487e-b320-e47166cbe27a.png" 
                  alt="Walkways and Pavement Cleaning" 
                  className="w-full h-full object-cover transition-all hover:scale-105"
                />
              </div>
              <CardContent className="p-6 flex-grow">
                <Badge className="bg-bc-red text-white mb-3">High Traffic Areas</Badge>
                <h3 className="text-xl font-bold mb-2">Walkways & Pavement Cleaning</h3>
                <p className="text-gray-700 mb-4">
                  Remove unsightly stains, gum, oil, and grime from sidewalks, walkways, and paved areas around your commercial property. Our powerful surface cleaners restore concrete and pavement to like-new condition.
                </p>
              </CardContent>
            </Card>

            {/* Building Exterior Cleaning */}
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/lovable-uploads/3340dcaf-c78c-4821-a00d-7ac307d220b9.png" 
                  alt="Building Exterior Cleaning" 
                  className="w-full h-full object-cover transition-all hover:scale-105"
                />
              </div>
              <CardContent className="p-6 flex-grow">
                <Badge className="bg-bc-red text-white mb-3">Building Maintenance</Badge>
                <h3 className="text-xl font-bold mb-2">Building Exterior Cleaning</h3>
                <p className="text-gray-700 mb-4">
                  Refresh your building's appearance with our gentle yet effective cleaning process. We safely remove dirt, pollution, cobwebs, and stains from siding, brick, stucco, and other exterior surfaces.
                </p>
              </CardContent>
            </Card>

            {/* Parking Lot Cleaning */}
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/lovable-uploads/b9161650-0b76-465b-ae2b-8326c1060e6b.png" 
                  alt="Parking Lot Cleaning" 
                  className="w-full h-full object-cover transition-all hover:scale-105"
                />
              </div>
              <CardContent className="p-6 flex-grow">
                <Badge className="bg-bc-red text-white mb-3">First Impressions</Badge>
                <h3 className="text-xl font-bold mb-2">Parking Lot Cleaning</h3>
                <p className="text-gray-700 mb-4">
                  Revitalize your parking areas with our comprehensive cleaning service. We remove oil stains, debris, and grime, enhancing safety and appearance for customers and tenants.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Parkade Cleaning */}
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/lovable-uploads/da60ccd8-bae5-4a04-aa87-6b198ae20957.png" 
                  alt="Parkade Cleaning" 
                  className="w-full h-full object-cover transition-all hover:scale-105"
                />
              </div>
              <CardContent className="p-6 flex-grow">
                <Badge className="bg-bc-red text-white mb-3">Deep Cleaning</Badge>
                <h3 className="text-xl font-bold mb-2">Parkade & Underground Cleaning</h3>
                <p className="text-gray-700 mb-4">
                  Our specialized equipment and cleaning solutions effectively remove oil, grease, and grime from parking garages and underground structures, improving air quality and safety.
                </p>
              </CardContent>
            </Card>

            {/* Garbage Area Cleaning */}
            <Card className="overflow-hidden h-full flex flex-col">
              <div className="h-64 overflow-hidden">
                <img 
                  src="/lovable-uploads/b57ecb1e-9156-41a1-a164-292c8bf5c270.png" 
                  alt="Dumpster Area Cleaning" 
                  className="w-full h-full object-cover transition-all hover:scale-105"
                />
              </div>
              <CardContent className="p-6 flex-grow">
                <Badge className="bg-bc-red text-white mb-3">Sanitation</Badge>
                <h3 className="text-xl font-bold mb-2">Garbage & Dumpster Areas</h3>
                <p className="text-gray-700 mb-4">
                  Keep waste collection areas clean and odor-free with our regular maintenance service. We sanitize and deodorize these spaces to prevent pest issues and maintain cleanliness.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your Property's Appearance?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Schedule a free consultation and get a customized cleaning plan tailored to your commercial property's needs.
          </p>
          <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold px-8 py-6">
            <Link to="/calculator">Get Your Free Quote Today</Link>
          </Button>
        </div>
      </section>

      {/* Service Area Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-6">We Serve Commercial Clients Throughout Metro Vancouver</h3>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">Surrey</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">White Rock</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">South Surrey</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">Langley</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">Vancouver</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">Richmond</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">Burnaby</Badge>
            <Badge className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 text-sm">New Westminster</Badge>
          </div>
        </div>
      </section>

      <CallToAction />
    </Layout>
  );
};

export default CommercialPressureWashing;
