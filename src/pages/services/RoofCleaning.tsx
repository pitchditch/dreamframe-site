
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import ServiceBenefits from '../../components/ServiceBenefits';
import ServiceProcess from '../../components/ServiceProcess';
import CallToAction from '../../components/CallToAction';
import { Home, Shield, Clock, ThumbsUp, Search, Droplets, Sparkles } from 'lucide-react';

const RoofCleaning = () => {
  const benefits = [
    {
      title: "Extended Roof Lifespan",
      description: "Remove moss, algae, and lichen that can deteriorate shingles and roofing materials, adding years to your roof's life."
    },
    {
      title: "Prevent Costly Damage",
      description: "Regular cleaning prevents organic growth from lifting shingles and creating leaks that can lead to expensive repairs."
    },
    {
      title: "Improved Energy Efficiency",
      description: "A clean roof reflects heat better, potentially reducing cooling costs during hot summer months."
    },
    {
      title: "Enhanced Curb Appeal",
      description: "Remove unsightly black streaks and stains, instantly improving your home's appearance and potential resale value."
    },
    {
      title: "Protect Your Warranty",
      description: "Many roofing manufacturers require regular cleaning to maintain warranty coverage for your roofing materials."
    },
    {
      title: "Healthier Home Environment",
      description: "Eliminate mold and algae that can spread to other areas of your home and potentially cause health issues."
    }
  ];

  const processes = [
    {
      title: "Roof Inspection",
      description: "We thoroughly inspect your roof to identify problem areas and determine the appropriate cleaning method.",
      icon: <Search size={32} />
    },
    {
      title: "Safe, Low-Pressure Cleaning",
      description: "Using specialized equipment and eco-friendly solutions, we safely remove algae, moss, and stains without damaging your roof.",
      icon: <Droplets size={32} />
    },
    {
      title: "Preventative Treatment",
      description: "We apply treatments to inhibit future growth of moss, algae, and lichen, keeping your roof cleaner for longer.",
      icon: <Shield size={32} />
    }
  ];

  return (
    <Layout>
      <ServiceHeader
        title="Roof Cleaning"
        description="Safe and effective roof cleaning solutions to protect your investment and enhance your home's appearance."
        icon={<Home size={48} />}
        imagePath="https://images.unsplash.com/photo-1605808896470-cd7009c90d7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
      />

      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Protect Your Largest Investment</h2>
            <p className="text-gray-600 mb-6">
              Your roof is one of the most significant investments in your home, providing essential protection from the elements. Over time, Pacific Northwest weather conditions cause organic growth like moss, algae, and lichen to establish themselves on your roof, particularly in shaded areas.
            </p>
            <p className="text-gray-600 mb-6">
              This growth not only creates unsightly black streaks and discoloration but can cause serious damage by lifting shingles, retaining moisture, and accelerating deterioration of roofing materials. Our professional roof cleaning service safely removes these harmful organisms and helps prevent their return.
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
              src="https://images.unsplash.com/photo-1632901352612-6f25dbfc193b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Roof cleaning service" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Benefits of Professional Roof Cleaning</h2>
          <p className="section-subtitle">
            Regular roof maintenance provides substantial benefits for your home's longevity and appearance
          </p>
          <ServiceBenefits benefits={benefits} />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="section-title">Our Roof Cleaning Process</h2>
        <p className="section-subtitle">
          We use a careful, methodical approach to safely clean and protect your roof
        </p>
        <ServiceProcess processes={processes} />
      </section>

      <CallToAction />
    </Layout>
  );
};

export default RoofCleaning;
