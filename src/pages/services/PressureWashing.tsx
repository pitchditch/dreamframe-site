
import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import CallToAction from '../../components/CallToAction';
import FAQSection from '../../components/FAQSection';
import ServiceBenefits from '../../components/ServiceBenefits';
import ServiceFeatures from '../../components/services/ServiceFeatures';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import MoreServicesSection from '@/components/MoreServicesSection';

const PressureWashing = () => {
  const benefits = [
    {
      title: "Increased Property Value",
      description: "Regular pressure washing maintains and increases your property's curb appeal and market value."
    },
    {
      title: "Health & Safety",
      description: "Remove harmful mold, mildew, and allergens that can affect your family's health."
    },
    {
      title: "Preventive Maintenance",
      description: "Regular cleaning prevents long-term damage and expensive repairs to your home's exterior."
    },
    {
      title: "Time Saving",
      description: "Professional equipment and expertise deliver results in hours, not days of DIY work."
    },
    {
      title: "Eco-Friendly Cleaning",
      description: "We use biodegradable cleaning solutions that are safe for your family and landscaping."
    },
    {
      title: "Insurance Protection",
      description: "Our fully insured service protects your property during the cleaning process."
    }
  ];

  const features = [
    {
      title: "House Washing",
      description: "Complete exterior house cleaning using low-pressure soft washing techniques safe for all siding types."
    },
    {
      title: "Driveway Cleaning", 
      description: "Remove oil stains, tire marks, and built-up grime from concrete and asphalt driveways."
    },
    {
      title: "Deck & Patio Cleaning",
      description: "Restore the beauty of your outdoor living spaces with specialized cleaning for wood and composite materials."
    },
    {
      title: "Fence Cleaning",
      description: "Revitalize wooden, vinyl, and metal fencing with appropriate pressure and cleaning solutions."
    },
    {
      title: "Sidewalk Cleaning",
      description: "Remove dirt, moss, and stains from walkways to improve safety and appearance."
    },
    {
      title: "Commercial Cleaning",
      description: "Professional pressure washing services for businesses, parking lots, and commercial properties."
    }
  ];

  const faqs = [
    {
      question: "Is pressure washing safe for my home's siding?",
      answer: "Yes, when done properly. We use appropriate pressure levels and techniques for different siding materials. For delicate surfaces, we use soft washing with low pressure and specialized cleaning solutions."
    },
    {
      question: "How often should I pressure wash my home?",
      answer: "Most homes benefit from pressure washing once or twice per year. Homes in areas with more moisture, trees, or pollution may need more frequent cleaning."
    },
    {
      question: "Will pressure washing damage my landscaping?",
      answer: "We take great care to protect your plants and landscaping. We cover sensitive plants and use eco-friendly cleaning solutions that won't harm your garden."
    },
    {
      question: "Can you remove oil stains from my driveway?",
      answer: "Yes, we can remove most oil stains using specialized cleaning solutions and hot water pressure washing. The success depends on the age and type of stain."
    },
    {
      question: "Do I need to be home during the service?",
      answer: "It's helpful if you're available at the start to discuss any specific concerns, but you don't need to be present for the entire service. We'll contact you when we're finished."
    }
  ];

  return (
    <Layout title="Professional Pressure Washing Services | Surrey & White Rock" description="Expert house washing and pressure washing services. Remove dirt, mold, and stains from your home's exterior in Surrey, White Rock, and Metro Vancouver.">
      <ServiceHeader 
        title="Professional House Washing & Pressure Washing" 
        description="Transform your home's exterior with our safe, effective pressure washing and soft washing services." 
        youtubeId="P7SJp7jCEJ0"
        youtubeDesktopId="P7SJp7jCEJ0"
      />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 heading-text">Complete Exterior Cleaning Services</h2>
            <p className="text-lg text-gray-700 content-text max-w-3xl mx-auto">
              Our professional pressure washing services will restore your home's beauty and protect your investment. 
              We use the right pressure and cleaning solutions for each surface to ensure safe, effective results.
            </p>
          </div>
          
          <ServiceFeatures features={features} />
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ServiceBenefits 
            title="Why Choose Professional Pressure Washing?" 
            subtitle="Discover the benefits of professional exterior cleaning for your home"
            benefits={benefits} 
          />
        </div>
      </section>
      
      <TestimonialsSection />
      
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Get answers to common questions about our pressure washing services"
        faqs={faqs}
      />
      
      <MoreServicesSection />
      
      <CallToAction 
        title="Ready to Transform Your Home's Exterior?"
        subtitle="Contact us today for a free estimate on our professional pressure washing services."
        backgroundImage="/lovable-uploads/26f6a625-a200-4106-8f94-579be5c566b6.png"
      />
    </Layout>
  );
};

export default PressureWashing;
