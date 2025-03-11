
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import ServiceBenefits from '../../components/ServiceBenefits';
import ServiceProcess from '../../components/ServiceProcess';
import CallToAction from '../../components/CallToAction';
import { DropletIcon, Shield, Clock, ThumbsUp, Search, Droplets, Sparkles } from 'lucide-react';

const PressureWashing = () => {
  const benefits = [
    {
      title: "Restore Original Beauty",
      description: "Remove years of built-up dirt, grime, algae, and mildew to reveal the original beauty of your home's exterior surfaces."
    },
    {
      title: "Prevent Costly Damage",
      description: "Regular cleaning prevents organic growth and contaminants from deteriorating your siding, brick, or other exterior materials."
    },
    {
      title: "Healthier Home Environment",
      description: "Eliminate mold, mildew, and allergens from exterior surfaces that can affect indoor air quality and trigger allergies."
    },
    {
      title: "Increase Property Value",
      description: "A clean exterior significantly enhances curb appeal and can increase your property's market value by up to 5-10%."
    },
    {
      title: "Prepare for Painting",
      description: "Create the perfect clean surface if you're planning to paint or stain your home's exterior in the near future."
    },
    {
      title: "Safe, Eco-Friendly Process",
      description: "Our soft washing techniques and biodegradable cleaning solutions are safe for your home, family, pets, and landscaping."
    }
  ];

  const processes = [
    {
      title: "Surface Inspection",
      description: "We carefully assess your home's exterior to determine the appropriate cleaning method and identify any areas needing special attention.",
      icon: <Search size={32} />
    },
    {
      title: "Soft Washing Application",
      description: "Using specialized equipment, we apply eco-friendly cleaning solutions that break down organic growth and contaminants.",
      icon: <Droplets size={32} />
    },
    {
      title: "Thorough Rinse",
      description: "We complete the process with a gentle, thorough rinse that removes all cleaning solutions and loosened contaminants.",
      icon: <Sparkles size={32} />
    }
  ];

  return (
    <Layout>
      <ServiceHeader
        title="House Washing"
        description="Safe, effective pressure washing services to restore your home's exterior and protect your investment."
        icon={<DropletIcon size={48} />}
        imagePath="https://images.unsplash.com/photo-1558618666-fcd25a19f0b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      />

      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Revitalize Your Home's Exterior</h2>
            <p className="text-gray-600 mb-6">
              Your home's exterior faces constant exposure to the elements, resulting in the accumulation of dirt, grime, algae, mold, and other contaminants over time. These not only detract from your home's appearance but can cause long-term damage to various exterior surfaces.
            </p>
            <p className="text-gray-600 mb-6">
              Our professional house washing service uses the "soft wash" approach – combining low pressure with specialized cleaning solutions to safely and effectively clean all exterior surfaces including vinyl siding, brick, stucco, wood, and more. This method delivers superior results while protecting delicate surfaces from damage.
            </p>
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <Shield className="text-bc-red mr-2" size={24} />
                <span className="font-medium">Fully Insured</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-bc-red mr-2" size={24} />
                <span className="font-medium">Prompt Service</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="text-bc-red mr-2" size={24} />
                <span className="font-medium">100% Satisfaction</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1596758900146-f6d4a768c5c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="House washing service" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Benefits of Professional House Washing</h2>
          <p className="section-subtitle">
            Regular exterior cleaning provides numerous advantages for your home's appearance and longevity
          </p>
          <ServiceBenefits benefits={benefits} />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="section-title">Our House Washing Process</h2>
        <p className="section-subtitle">
          We follow a comprehensive approach to safely clean and restore your home's exterior
        </p>
        <ServiceProcess processes={processes} />
      </section>

      <CallToAction />
    </Layout>
  );
};

export default PressureWashing;
