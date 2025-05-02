
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, Star, Medal, Users, ShieldCheck, Clock } from 'lucide-react';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import LocationBanner from '@/components/LocationBanner';

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
            <div className="rounded-full border-4 border-gray-200 shadow-xl overflow-hidden w-64 h-64">
              <img 
                src="/lovable-uploads/10e953e1-c5f0-4899-a3b7-944cf15bca76.png" 
                alt="Jayden Fisher" 
                className="w-full h-full object-cover"
              />
            </div>
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
              <div className="rounded-full border-2 border-gray-200 overflow-hidden w-16 h-16">
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

      {/* Professional Equipment & Products Section - Moved from Home */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Professional Equipment & Products</h2>
          <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            We invest in top-of-the-line equipment to ensure superior results for every job. Our commercial-grade tools and eco-friendly products deliver professional results that last.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <img src="/lovable-uploads/0fe6a9ec-690a-4ac5-a8b6-efab2e58937f.png" alt="Water Fed Pole System" className="w-32 h-32 object-contain mb-4" />
              <h3 className="text-xl font-semibold mb-2">Water Fed Pole System</h3>
              <p className="text-gray-600">Ultra-pure water technology cleans windows up to 5 stories high without chemicals, leaving a streak-free finish.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <img src="/lovable-uploads/80888870-b48a-405b-ac8e-ad08f4fe5afc.png" alt="Professional Pressure Washers" className="w-32 h-32 object-contain mb-4" />
              <h3 className="text-xl font-semibold mb-2">Professional Pressure Washers</h3>
              <p className="text-gray-600">Commercial-grade pressure washers with adjustable PSI for safe and effective cleaning of any surface.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <img src="/lovable-uploads/84d7a106-6be2-4a23-a9dd-def86b85bd3a.png" alt="Surface Cleaners" className="w-32 h-32 object-contain mb-4" />
              <h3 className="text-xl font-semibold mb-2">Surface Cleaners</h3>
              <p className="text-gray-600">Specialized tools for even cleaning of large flat areas like driveways and patios with no streaks.</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center max-w-md">
              <img src="/lovable-uploads/497a46c4-728e-426b-bd23-fc5c5b9869be.png" alt="Eco-Friendly Cleaning Solutions" className="w-32 h-32 object-contain mb-4" />
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly Cleaning Solutions</h3>
              <p className="text-gray-600">Biodegradable, pet-safe, and environmentally responsible cleaning agents that are effective without harming your property or the planet.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Our Core Values</h2>
          <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            At BC Pressure Washing, these principles guide everything we do, from how we treat our customers to the quality of service we provide.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Medal className="text-bc-red" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our work, constantly improving our techniques and equipment to deliver the best results possible.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Users className="text-bc-red" />
              </div>
              <h3 className="text-xl font-bold mb-3">Integrity</h3>
              <p className="text-gray-600">
                We conduct our business with honesty and transparency, providing fair pricing and clear communication at every step.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
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

      {/* Why Homeowners Trust Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Why Surrey Homeowners Trust Us Over Shack Shine or Men in Kilts
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4 bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center overflow-hidden">
                <img src="/lovable-uploads/10e953e1-c5f0-4899-a3b7-944cf15bca76.png" alt="Owner Operated" className="w-20 h-20 rounded-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-2">Owner Operated</h3>
              <p className="text-gray-700">Every job is checked by Jayden Fisher for personal quality assurance.</p>
            </div>
            
            <div className="flex flex-col items-center text-center bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4 bg-red-50 rounded-full w-24 h-24 flex items-center justify-center">
                <img src="/lovable-uploads/1b3ad446-14a6-40c5-8292-6c774e00109c.png" alt="Fully Insured" className="w-20 h-20 object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fully Insured</h3>
              <p className="text-gray-700">Peace of mind with WCB & liability insurance protection.</p>
            </div>
            
            <div className="flex flex-col items-center text-center bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4 bg-red-50 rounded-full w-24 h-24 flex items-center justify-center">
                <img src="/lovable-uploads/f05fd62e-74a2-4b37-83ac-baee3893fc3d.png" alt="Eco-Friendly" className="w-20 h-20 object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-2">Eco-Friendly Products</h3>
              <p className="text-gray-700">100% safe for pets, plants, and our local environment.</p>
            </div>
            
            <div className="flex flex-col items-center text-center bg-white rounded-xl shadow-lg p-6">
              <div className="mb-4 bg-red-50 rounded-full w-24 h-24 flex items-center justify-center">
                <img src="/lovable-uploads/61c248da-a39d-4414-a395-5a104dbff13b.png" alt="Satisfaction Guarantee" className="w-20 h-20 object-contain" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Satisfaction</h3>
              <p className="text-gray-700">If you're not thrilled, we'll re-clean for free — period.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Location Banner */}
      <LocationBanner />

      {/* Service Area Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Areas We Service</h2>
          <ServiceAreaMap />
        </div>
      </section>

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
