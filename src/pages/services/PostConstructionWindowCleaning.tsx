
import React from 'react';
import { Construction, Shield, Clock, CheckCircle, ThumbsUp } from 'lucide-react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import ServiceProcess from '../../components/ServiceProcess';
import ServiceBenefits from '../../components/ServiceBenefits';
import CallToAction from '../../components/CallToAction';
import { Link } from 'react-router-dom';

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

  return (
    <Layout 
      title="Post Construction Window Cleaning Services in Metro Vancouver"
      description="Professional post construction window cleaning services to remove dust, debris, and fingerprints. Serving Metro Vancouver, Surrey, White Rock."
    >
      <ServiceHeader
        title="Post Construction Window Cleaning"
        description="Professional cleaning services for newly constructed homes and buildings. We remove all construction debris, labels, and residues for crystal clear windows."
        imagePath="/lovable-uploads/1fb29b3f-e2ed-44b9-8ae8-b04efbf4fcce.png"
      />

      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Specialized Post-Construction Window Cleaning</h2>
            <p className="text-gray-600 mb-6">
              After construction or renovation is complete, your windows are often covered with a variety of materials that require specialized cleaning. Construction debris, adhesives, paint splatter, stickers, and protective films can all leave your windows looking less than perfect.
            </p>
            <p className="text-gray-600 mb-6">
              Our post-construction window cleaning service is specifically designed to tackle these unique challenges. We use professional-grade products and techniques to safely and effectively remove all construction-related residues, leaving your windows spotless and streak-free.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <Shield className="text-bc-red mr-2" size={24} />
                <span className="font-medium">Expert Technicians</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-bc-red mr-2" size={24} />
                <span className="font-medium">Efficient Service</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="text-bc-red mr-2" size={24} />
                <span className="font-medium">100% Satisfaction</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="/lovable-uploads/46bdd024-275a-4b16-ae57-e690113dae3f.png" 
              alt="Post-construction window cleaning" 
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Benefits of Professional Post-Construction Window Cleaning</h2>
          <p className="section-subtitle">
            Trust our experts to handle the unique challenges of cleaning windows after construction
          </p>
          <ServiceBenefits benefits={benefits} />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="section-title">Our Post-Construction Cleaning Process</h2>
        <p className="section-subtitle">
          We follow a meticulous process to ensure your windows are perfectly clean after construction
        </p>
        <ServiceProcess processes={processes} />
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1460574283810-2aab119d8511" 
                alt="Modern building with clean windows" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <div className="badge-pill w-fit mb-4">Perfect Results</div>
              <h2 className="text-3xl font-bold mb-6">Ideal For New Construction & Renovations</h2>
              <p className="text-gray-600 mb-6">
                Whether you've just completed construction on a new home or finished renovating your commercial space, our post-construction window cleaning service is the perfect final touch to make your property shine.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-bc-red font-bold mr-2">✓</span>
                  <span>Residential new construction</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bc-red font-bold mr-2">✓</span>
                  <span>Commercial buildings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bc-red font-bold mr-2">✓</span>
                  <span>Home renovation projects</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bc-red font-bold mr-2">✓</span>
                  <span>Remove tape, labels, and protective films</span>
                </li>
              </ul>
              <Link to="/contact">
                <button className="btn-primary">
                  Get Your Free Estimate
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
        subtitle="Contact us today for a free consultation and quote on our post-construction window cleaning services."
        primaryButtonText="Get a Free Quote"
      />
    </Layout>
  );
};

export default PostConstructionWindowCleaning;
