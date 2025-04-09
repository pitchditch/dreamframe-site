
import React from 'react';
import { Construction, Shield, Clock, CheckCircle, ThumbsUp, MapPin, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import ServiceProcess from '../../components/ServiceProcess';
import ServiceBenefits from '../../components/ServiceBenefits';
import CallToAction from '../../components/CallToAction';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const PostConstructionWindowCleaning = () => {
  const benefits = [
    {
      title: "Pristine First Impression",
      description: "Ensure your newly constructed property makes the best first impression with spotlessly clean windows."
    },
    {
      title: "Removes Construction Residue",
      description: "Effectively removes stubborn construction dust, paint splatter, adhesive residues, and stickers from all window surfaces."
    },
    {
      title: "Protects Window Investment",
      description: "Prevents permanent damage to glass by removing potentially corrosive construction materials and debris."
    },
    {
      title: "Comprehensive Cleaning",
      description: "We clean not only the glass but also frames, tracks, and sills to ensure your windows are completely free of construction debris."
    },
    {
      title: "Experienced Professionals",
      description: "Our team specializes in post-construction cleaning with the expertise to handle even the most challenging situations."
    },
    {
      title: "Fully Insured Service",
      description: "Rest easy knowing our professional cleaners are fully insured for your peace of mind."
    }
  ];

  const processes = [
    {
      title: "Initial Assessment",
      description: "We inspect all windows to identify construction residues, adhesives, paint, and other materials that need special attention.",
      icon: <Shield size={32} />
    },
    {
      title: "Debris Removal",
      description: "We carefully remove larger debris, labels, stickers, and protective films from all window surfaces.",
      icon: <Construction size={32} />
    },
    {
      title: "Deep Cleaning",
      description: "Using professional-grade solutions and equipment, we thoroughly clean glass, frames, tracks, and sills.",
      icon: <CheckCircle size={32} />
    }
  ];

  const removalItems = [
    "Construction tape & stickers",
    "Paint overspray",
    "Drywall & cement dust",
    "Silicone smears",
    "Plaster residue"
  ];

  return (
    <Layout 
      title="Crystal Clear After Construction - Post Construction Window Cleaning"
      description="Professional post construction window cleaning services to remove dust, debris, paint, and adhesives. Serving Surrey, White Rock, and Metro Vancouver."
    >
      {/* Hero Section with the new headline */}
      <ServiceHeader
        title="Crystal Clear After Construction"
        description="We specialize in removing paint, plaster, tape, and dust—leaving your windows spotless and streak-free."
        imagePath="/lovable-uploads/46bdd024-275a-4b16-ae57-e690113dae3f.png"
      />

      {/* Why Post-Construction Cleaning is Different */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Post-Construction Window Cleaning Takes a Pro</h2>
          <p className="text-gray-600 text-lg text-center mb-12">
            Construction debris like paint splatter, silicone, stickers, and drywall dust require specialized tools and techniques. 
            Our team is trained to clean without scratching the glass or damaging your frames. 
            We make your new build or renovation shine—literally.
          </p>
        </div>
      </section>

      {/* Visual Proof Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title mb-12">See The Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1460574283810-2aab119d8511" 
                alt="Before: Tape and debris stuck to every pane" 
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 rounded-b-lg">
                <p className="text-white font-medium text-lg">Before: Tape and debris stuck to every pane</p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1439337153520-7082a56a81f4" 
                alt="After: Spotless, streak-free, and ready to impress" 
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 rounded-b-lg">
                <p className="text-white font-medium text-lg">After: Spotless, streak-free, and ready to impress</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Remove Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">What We Remove</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {removalItems.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow flex items-start">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-bc-red mr-4 mt-1">
                  <CheckCircle size={20} />
                </div>
                <p className="text-lg font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Banner */}
      <section className="bg-bc-red text-white py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <MapPin size={32} className="shrink-0" />
            <h2 className="text-2xl font-bold text-center">
              Serving Surrey, White Rock, Langley, and Greater Vancouver
            </h2>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="section-title">Our Post-Construction Cleaning Process</h2>
        <p className="section-subtitle">
          We follow a meticulous process to ensure your windows are perfectly clean after construction
        </p>
        <ServiceProcess processes={processes} />
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Why Choose Our Post-Construction Window Cleaning</h2>
          <p className="section-subtitle">
            Trust our experts to handle the unique challenges of cleaning windows after construction
          </p>
          <ServiceBenefits benefits={benefits} />
        </div>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Trusted By Builders & Homeowners</h2>
          
          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-sm">
              <Shield className="text-bc-red mr-2" size={24} />
              <span className="font-medium">Fully Insured</span>
            </div>
            <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-sm">
              <Construction className="text-bc-red mr-2" size={24} />
              <span className="font-medium">Builder Friendly</span>
            </div>
            <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-sm">
              <Award className="text-bc-red mr-2" size={24} />
              <span className="font-medium">100% Satisfaction Guarantee</span>
            </div>
          </div>
          
          {/* Testimonial */}
          <Card className="bg-white p-8 shadow-md max-w-3xl mx-auto">
            <CardContent className="pt-4">
              <p className="text-lg italic mb-6">
                "BC Pressure Washing did an excellent job cleaning all our windows after construction. They removed all the paint splatter and construction debris, leaving the windows spotless. Highly recommend!"
              </p>
              <div className="font-bold">— John Wilson, Local Builder</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Booking/Quote Section */}
      <section id="booking" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Get a Post-Construction Window Cleaning Estimate</h2>
            <p className="text-center mb-8 text-gray-600">
              Every job is checked personally by Jayden Fisher. We're fully insured and trusted by local builders.
            </p>
            
            <div className="text-center">
              <Link to="/contact">
                <Button variant="bc-red" size="lg">
                  Get Your Free Estimate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-xl mb-2">How soon after construction should windows be cleaned?</h3>
              <p className="text-gray-600">
                We recommend scheduling post-construction window cleaning after all construction work is completely finished to avoid re-contamination. Typically, this is one of the last services performed before occupancy.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-2">Can you remove paint splatter and construction adhesives?</h3>
              <p className="text-gray-600">
                Yes, our professional technicians use specialized tools and solutions to safely remove paint splatter, adhesive residues, and other construction materials without damaging the glass.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-2">Do you clean window frames and tracks as well?</h3>
              <p className="text-gray-600">
                Absolutely! Our post-construction window cleaning service includes comprehensive cleaning of glass, frames, tracks, and sills to remove all construction debris.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-xl mb-2">How long does post-construction window cleaning take?</h3>
              <p className="text-gray-600">
                The time required depends on the size of the property and the number of windows. We'll provide you with a time estimate when you request a quote.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CallToAction 
        title="Ready for Spotless Windows After Construction?"
        subtitle="Contact us today for a free estimate on our post-construction window cleaning services."
        primaryButtonText="Get a Free Quote"
        primaryButtonLink="/contact"
      />
    </Layout>
  );
};

export default PostConstructionWindowCleaning;
