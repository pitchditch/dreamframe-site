import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, Star, Medal, Users, ShieldCheck, Clock } from 'lucide-react';
import TestimonialsSection from '@/components/home/TestimonialsSection';
const WhyUs = () => {
  return <Layout title="Why Choose BC Pressure Washing | Professional Exterior Cleaning Services" description="BC Pressure Washing is your trusted choice for exterior cleaning in Surrey and White Rock. Discover our commitment to quality, service, and satisfaction.">
      {/* Hero Section */}
      <div className="hero-section relative min-h-screen flex items-center w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img src="/lovable-uploads/d5c534e2-91b3-494d-87ca-c141819f0cb5.png" alt="Why Choose BC Pressure Washing" className="w-full h-full object-cover" />
        </div>
        
        <div className="hero-overlay absolute inset-0 bg-black/60"></div>

        <div className="container relative z-10 mx-auto px-4 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-shadow-lg">Why Choose BC Pressure Washing</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-shadow-sm">
            Discover the difference that experience, quality, and dedication can make for your property.
          </p>
        </div>
      </div>

      {/* Owner Operated Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 flex justify-center">
            
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">100% Satisfaction Guarantee</h2>
            <p className="text-gray-600 mb-6">
              At BC Pressure Washing, we're committed to delivering exceptional results. That's why we back every service with our 100% satisfaction guarantee. If you're not completely satisfied with our work, we'll come back and make it right—at no additional cost to you.
            </p>
            <p className="text-gray-600 mb-6">
              This promise reflects our confidence in our workmanship and our dedication to your complete satisfaction. We don't consider the job done until you're happy with the results.
            </p>
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img src="/lovable-uploads/10e953e1-c5f0-4899-a3b7-944cf15bca76.png" alt="Jayden Fisher" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Jayden Fisher</h3>
                <p className="text-gray-500">Owner & Lead Technician</p>
              </div>
            </div>
            <Button asChild variant="bc-red">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Our Core Values</h2>
          <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            At BC Pressure Washing, these principles guide everything we do, from how we treat our customers to the quality of service we provide.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Medal className="text-bc-red" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our work, constantly improving our techniques and equipment to deliver the best results possible.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Users className="text-bc-red" />
              </div>
              <h3 className="text-xl font-bold mb-3">Integrity</h3>
              <p className="text-gray-600">
                We conduct our business with honesty and transparency, providing fair pricing and clear communication at every step.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Clock className="text-bc-red" />
              </div>
              <h3 className="text-xl font-bold mb-3">Reliability</h3>
              <p className="text-gray-600">
                You can count on us to show up on time, work efficiently, and complete the job as promised. We respect your time and property.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Equipment */}
      

      {/* What Our Clients Say */}
      

      {/* Services List Combined with Carousel */}
      

      {/* CTA Section */}
      <section className="py-16 bg-bc-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience the BC Pressure Washing Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free quote and let us show you why we're the preferred choice for exterior cleaning in Surrey and White Rock.
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
export default WhyUs;