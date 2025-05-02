import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Building, CheckCircle, ShieldCheck, Droplets } from 'lucide-react';
const CommercialPressureWashing = () => {
  const services = [{
    title: "Building Exteriors",
    description: "Remove dirt, grime, and pollutants from your commercial building's exterior surfaces, restoring their appearance and preventing premature deterioration.",
    icon: <Building size={32} className="text-bc-red" />
  }, {
    title: "Concrete & Pavement",
    description: "Deep clean parking lots, sidewalks, and other concrete surfaces to remove unsightly stains, gum, oil, and grease buildup.",
    icon: <Droplets size={32} className="text-bc-red" />
  }, {
    title: "Dumpster Areas",
    description: "Eliminate odors and sanitize dumpster areas to maintain a clean and hygienic environment for customers and employees.",
    icon: <ShieldCheck size={32} className="text-bc-red" />
  }, {
    title: "Graffiti Removal",
    description: "Professional removal of graffiti from walls and surfaces, protecting your property's image and value.",
    icon: <CheckCircle size={32} className="text-bc-red" />
  }];
  return <Layout title="Commercial Pressure Washing Services | BC Pressure Washing" description="Professional pressure washing services for commercial properties in Surrey, White Rock & Metro Vancouver. Keep your business looking its best.">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        <img src="/lovable-uploads/d9f3e980-9bd8-4f15-afb2-6df7cb095002.png" alt="Commercial Pressure Washing Services" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-end pb-20">
          <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold">
            <Link to="/calculator">Check Prices & Availability</Link>
          </Button>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Commercial Pressure Washing Solutions</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive pressure washing services for all types of commercial properties, 
            helping businesses maintain a professional, clean, and inviting appearance for customers and employees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>)}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose BC Pressure Washing</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We understand the unique needs of commercial properties and deliver reliable, efficient service that exceeds expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Fully Insured & Licensed</h3>
              <p className="text-gray-600">
                We carry comprehensive insurance coverage, protecting your property and giving you peace of mind.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Flexible Scheduling</h3>
              <p className="text-gray-600">
                We work around your business hours to minimize disruption to your operations and customers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3">Eco-Friendly Options</h3>
              <p className="text-gray-600">
                Our environmentally responsible cleaning methods and products protect your property and the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Maintenance Programs */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Regular Maintenance Programs</h2>
            <p className="text-gray-600 mb-6">
              Keep your commercial property looking its best year-round with our customized maintenance programs.
              Regular professional cleaning protects your investment and enhances your business image.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircle className="text-bc-red mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Quarterly, bi-annual, or annual service options</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-bc-red mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Custom schedules to meet your specific needs</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-bc-red mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Priority scheduling for maintenance plan customers</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-bc-red mr-2 mt-1 flex-shrink-0" size={20} />
                <span>Discounted rates for scheduled recurring services</span>
              </li>
            </ul>
            <div className="mt-8">
              <Button asChild variant="bc-red">
                <Link to="/contact">Request a Maintenance Quote</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img alt="Commercial pressure washing maintenance" className="rounded-lg shadow-lg w-full h-auto object-cover" src="/lovable-uploads/3ff52f8f-29e2-421b-983b-b72c1ab34b52.png" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-bc-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Commercial Property?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to schedule a consultation or request a free quote for your commercial pressure washing needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="outline" className="bg-white text-bc-red hover:bg-gray-100">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/calculator">Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>;
};
export default CommercialPressureWashing;