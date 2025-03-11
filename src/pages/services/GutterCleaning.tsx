
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import ServiceBenefits from '../../components/ServiceBenefits';
import ServiceProcess from '../../components/ServiceProcess';
import CallToAction from '../../components/CallToAction';
import { Droplets, Leaf, Shield, Clock, PieChart, ThumbsUp } from 'lucide-react';

const GutterCleaning = () => {
  const benefits = [
    {
      title: "Prevent Water Damage",
      description: "Clean gutters properly channel water away from your home, preventing costly water damage to foundations, walls, and landscaping."
    },
    {
      title: "Eliminate Pest Breeding Grounds",
      description: "Remove debris that can become a breeding ground for mosquitoes, birds, and other pests that can damage your home."
    },
    {
      title: "Extend Gutter Lifespan",
      description: "Regular cleaning prevents rust and corrosion, extending the life of your gutter system and saving you money on replacements."
    },
    {
      title: "Protect Roof and Fascia",
      description: "Prevent water backup that can damage roof shingles, fascia boards, and cause interior leaks during heavy rainfall."
    },
    {
      title: "Maintain Home Value",
      description: "Well-maintained gutters contribute to your home's curb appeal and help preserve its market value over time."
    },
    {
      title: "Prevent Basement Flooding",
      description: "Properly functioning gutters direct water away from your foundation, reducing the risk of basement flooding and moisture issues."
    }
  ];

  const processes = [
    {
      title: "Debris Removal",
      description: "We carefully remove leaves, twigs, and debris from your gutters and downspouts to ensure proper water flow.",
      icon: <Leaf size={32} />
    },
    {
      title: "Gutter Flushing",
      description: "After removing debris, we thoroughly flush your gutters with water to clear any remaining particles and check for proper drainage.",
      icon: <Droplets size={32} />
    },
    {
      title: "Downspout Inspection",
      description: "We inspect and clear all downspouts to ensure water can flow freely from your roof to the ground, away from your foundation.",
      icon: <PieChart size={32} />
    }
  ];

  return (
    <Layout>
      <ServiceHeader
        title="Gutter Cleaning"
        description="Professional gutter cleaning services to protect your home from water damage and maintain your property's value."
        icon={<Droplets size={48} />}
        imagePath="https://images.unsplash.com/photo-1520971081497-36b2c9974e8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
      />

      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Why Gutter Cleaning Is Essential</h2>
            <p className="text-gray-600 mb-6">
              Gutters play a crucial role in protecting your home from water damage by channeling rainwater away from your roof, walls, and foundation. When gutters become clogged with leaves, twigs, and debris, they can't function properly, leading to overflowing water that can damage your home's exterior, foundation, landscaping, and even interior spaces.
            </p>
            <p className="text-gray-600 mb-6">
              Our professional gutter cleaning service removes all debris, ensures proper water flow, and protects your home from costly damage. We recommend gutter cleaning at least twice a year, typically in spring and fall, to prevent clogs and maintain your gutter system.
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
              src="https://images.unsplash.com/photo-1605893477799-b99e3b8b93fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Gutter cleaning service" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Benefits of Professional Gutter Cleaning</h2>
          <p className="section-subtitle">
            Regular gutter maintenance provides numerous benefits for your home and property
          </p>
          <ServiceBenefits benefits={benefits} />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="section-title">Our Gutter Cleaning Process</h2>
        <p className="section-subtitle">
          We follow a thorough process to ensure your gutters are completely clean and functional
        </p>
        <ServiceProcess processes={processes} />
      </section>

      <CallToAction />
    </Layout>
  );
};

export default GutterCleaning;
