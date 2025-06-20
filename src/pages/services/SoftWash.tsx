
import React from 'react';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import ServiceProcess from '../../components/ServiceProcess';
import ServiceBenefits from '../../components/ServiceBenefits';
import CallToAction from '../../components/CallToAction';

const SoftWash = () => {
  const benefits = [
    {
      title: "Gentle Yet Effective",
      description: "Our soft wash system uses low-pressure water combined with specialized cleaning solutions to safely clean delicate surfaces."
    },
    {
      title: "Protects Your Property",
      description: "Unlike high-pressure washing, soft washing won't damage roofing materials, siding, or landscaping."
    },
    {
      title: "Long-Lasting Results",
      description: "Our biodegradable cleaning solutions kill mold, mildew, and algae at the root, providing longer-lasting cleanliness."
    },
    {
      title: "Eco-Friendly Solutions",
      description: "We use environmentally safe cleaning products that are safe for your family, pets, and surrounding vegetation."
    }
  ];

  const processSteps = [
    {
      title: "Property Assessment",
      description: "We evaluate your property to determine the best soft wash approach and identify any special considerations."
    },
    {
      title: "Surface Preparation",
      description: "We protect landscaping and prepare the area, ensuring a safe and controlled cleaning environment."
    },
    {
      title: "Soft Wash Application",
      description: "Our specialized cleaning solution is applied using low-pressure equipment to gently clean all surfaces."
    },
    {
      title: "Final Rinse & Inspection",
      description: "We thoroughly rinse all surfaces and conduct a final inspection to ensure exceptional results."
    }
  ];

  return (
    <Layout
      title="Soft Wash House Cleaning Services | BC Pressure Washing"
      description="Professional soft wash cleaning services in Metro Vancouver. Gentle, effective cleaning for roofs, siding, and delicate surfaces. Safe for your property and environment."
      image="/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png"
    >
      <ServiceHeader
        title="Soft Wash Cleaning Services"
        subtitle="Gentle, effective cleaning for your home's exterior"
        description="Our soft wash system provides thorough cleaning without the risks associated with high-pressure washing. Perfect for roofs, siding, stucco, and other delicate surfaces."
        image="/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">What is Soft Washing?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Soft washing is a cleaning method that uses low-pressure water combined with specialized, 
              biodegradable cleaning solutions to safely remove dirt, grime, mold, mildew, and algae from exterior surfaces. 
              This gentle approach is ideal for delicate materials that could be damaged by traditional pressure washing.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="text-xl font-semibold mb-4">Perfect For:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Roof cleaning</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Vinyl siding</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Stucco surfaces</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Wood surfaces</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Painted surfaces</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Benefits:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> No surface damage</li>
                  <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Kills organisms at the source</li>
                  <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Longer-lasting results</li>
                  <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Environmentally safe</li>
                  <li className="flex items-center"><span className="text-blue-500 mr-2">•</span> Protects landscaping</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceBenefits benefits={benefits} />
      <ServiceProcess steps={processSteps} />
      <CallToAction />
    </Layout>
  );
};

export default SoftWash;
