
import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import CallToAction from '../../components/CallToAction';
import { Shield, Sparkles, Leaf, CheckCircle } from 'lucide-react';
import MoreServicesSection from '../../components/MoreServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FenceWashing = () => {
  const faqs = [
    {
      question: "How much does fence washing cost?",
      answer: "Our fence washing prices start at $2-4 per linear foot, depending on the fence material, height, and condition. We provide free, no-obligation quotes over the phone or via our online calculator. Most residential fence washing projects range from $200-800."
    },
    {
      question: "Do you pressure wash or soft wash fences?",
      answer: "We use both methods depending on your fence material. For delicate wood fences, we use soft washing with eco-friendly solutions to prevent damage. For vinyl, composite, and metal fences, we may use controlled pressure washing. Our technicians assess each fence to determine the safest, most effective cleaning method."
    },
    {
      question: "Is fence washing safe for wood?",
      answer: "Absolutely! Our soft washing technique is specifically designed to be safe for wood fences. We use low pressure and specialized cleaning solutions that remove dirt, algae, and mildew without damaging the wood fibers or causing splintering. This method actually helps preserve your fence longer than high-pressure washing."
    },
    {
      question: "How often should I have my fence washed?",
      answer: "We recommend professional fence washing every 1-2 years for wood fences and every 2-3 years for vinyl or composite fences. However, fences in shaded areas or near trees may need more frequent cleaning due to increased moss and algae growth."
    },
    {
      question: "Will fence washing damage my plants?",
      answer: "No, we take extensive precautions to protect your landscaping. We pre-wet all plants, cover sensitive vegetation, and use eco-friendly, biodegradable cleaning solutions that won't harm your garden. Our soft washing process is gentler on plants than traditional pressure washing."
    }
  ];

  return (
    <Layout 
      title="Fence Washing in White Rock | BC Pressure Washing" 
      description="Affordable fence washing in White Rock & Surrey. We remove mildew, grey wood stains & algae. Restore your fence today with BC Pressure Washing."
      canonicalUrl="/services/fence-washing"
    >
      <ServiceHeader 
        title="Restore Your Fence with Professional Washing in White Rock"
        description="Moss, mildew, and grey wood? We'll make it look new again."
        imagePath="/lovable-uploads/b0019f19-4638-4339-adae-7cf734f98b50.png"
        darkOverlay={true}
      />
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Why Choose Professional Fence Washing?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Over time, fences accumulate dirt, algae, mold, and weathering that can make them look old and worn. 
              Our professional fence washing service restores your fence's original beauty while protecting your investment.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Shield className="w-12 h-12 text-bc-red mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Prevent Rot & Decay</h3>
              <p className="text-gray-600">Remove harmful organic growth that can cause wood rot and structural damage over time.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Sparkles className="w-12 h-12 text-bc-red mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Boost Curb Appeal</h3>
              <p className="text-gray-600">Transform grey, weathered fencing back to its original color and finish.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Leaf className="w-12 h-12 text-bc-red mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Eco-Friendly Options</h3>
              <p className="text-gray-600">Soft wash techniques with biodegradable solutions safe for your family and pets.</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <CheckCircle className="w-12 h-12 text-bc-red mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Safe for All Materials</h3>
              <p className="text-gray-600">Specialized techniques for wood, vinyl, composite, and metal fencing materials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Dramatic Fence Transformation</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            See how our professional fence washing service can restore your fence to like-new condition.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-lg shadow-xl">
              <img 
                src="/lovable-uploads/b0019f19-4638-4339-adae-7cf734f98b50.png" 
                alt="Before and After Fence Washing in White Rock"
                className="w-full h-auto" 
              />
              <div className="p-6 bg-white">
                <h3 className="font-bold text-xl mb-2">Wood Fence Restoration - White Rock</h3>
                <p className="text-gray-700">Complete fence washing using our soft washing technique to safely remove years of algae, mold, and weathering from this cedar fence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-bc-red/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-8 h-8 text-bc-red" />
              </div>
              <h4 className="font-bold text-gray-900">Fully Insured</h4>
              <p className="text-gray-600 text-sm">$2M Liability Coverage</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bc-red/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <img src="/lovable-uploads/4b1c2d66-50f8-40ca-abe3-c072141788ed.png" alt="Local Expert" className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-gray-900">Local Expert</h4>
              <p className="text-gray-600 text-sm">White Rock Based</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bc-red/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">⭐</span>
              </div>
              <h4 className="font-bold text-gray-900">5-Star Reviews</h4>
              <p className="text-gray-600 text-sm">100+ Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Fence Washing Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-bc-red rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Inspection</h3>
              <p className="text-gray-600">We assess your fence material and condition to determine the best cleaning approach.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bc-red rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Preparation</h3>
              <p className="text-gray-600">We protect surrounding plants and surfaces before beginning the cleaning process.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bc-red rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Cleaning</h3>
              <p className="text-gray-600">We apply our specialized cleaning solutions and techniques based on your fence material.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-bc-red rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">4</div>
              <h3 className="text-xl font-bold mb-2">Final Rinse</h3>
              <p className="text-gray-600">We thoroughly rinse and inspect the fence to ensure exceptional results.</p>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our fence washing services"
        faqs={faqs}
      />
      
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Service Areas in Metro Vancouver</h2>
          <ServiceAreaMap />
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Based in White Rock, proudly serving:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-white px-3 py-1 rounded-full">White Rock</span>
              <span className="bg-white px-3 py-1 rounded-full">Surrey</span>
              <span className="bg-white px-3 py-1 rounded-full">Langley</span>
              <span className="bg-white px-3 py-1 rounded-full">Delta</span>
              <span className="bg-white px-3 py-1 rounded-full">Richmond</span>
              <span className="bg-white px-3 py-1 rounded-full">Burnaby</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Quote CTA */}
      <section className="py-16 bg-bc-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get a Fast Quote – No Visit Needed</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tell us about your fence and get an instant estimate. Most quotes provided within 30 minutes during business hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-bc-red hover:bg-gray-100">
              <Link to="/calculator">Get Instant Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-bc-red">
              <a href="tel:7788087620">Call (778) 808-7620</a>
            </Button>
          </div>
        </div>
      </section>
      
      <MoreServicesSection />
      
      <CallToAction 
        title="Ready to Restore Your Fence?"
        subtitle="Contact BC Pressure Washing today for professional fence washing services in White Rock and surrounding areas."
        backgroundImage="/lovable-uploads/b0019f19-4638-4339-adae-7cf734f98b50.png"
      />
    </Layout>
  );
};

export default FenceWashing;
