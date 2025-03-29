
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import ServiceBenefits from '../../components/ServiceBenefits';
import ServiceProcess from '../../components/ServiceProcess';
import CallToAction from '../../components/CallToAction';
import { Building, Shield, Clock, ThumbsUp, Droplets, SparkleIcon, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CommercialWindowCleaning = () => {
  const benefits = [
    {
      title: "Enhance Curb Appeal",
      description: "Clean windows create a positive first impression for customers, clients, and tenants, enhancing your property's professional appearance."
    },
    {
      title: "Extend Window Lifespan",
      description: "Regular cleaning prevents dirt, hard water, and contaminants from etching and damaging glass and frames over time."
    },
    {
      title: "Improve Natural Lighting",
      description: "Clean windows allow maximum natural light to enter your building, creating a brighter, more inviting atmosphere and reducing energy costs."
    },
    {
      title: "Maintain Property Value",
      description: "Regular window maintenance protects your investment and contributes to the overall upkeep of your commercial property."
    },
    {
      title: "Specialized Equipment Access",
      description: "Our professional team has the specialized equipment needed to safely clean windows at any height, from ground level to high-rise."
    },
    {
      title: "Safety & Liability Protection",
      description: "Avoid the risks and liability concerns associated with employees or untrained staff attempting to clean high windows."
    }
  ];

  const processes = [
    {
      title: "Property Assessment",
      description: "We conduct a thorough evaluation of your property's windows to determine the best cleaning approach and equipment needed.",
      icon: <CheckCircle size={32} />
    },
    {
      title: "Pure Water Cleaning",
      description: "Using our advanced pure water technology, we clean windows without chemicals, leaving a streak-free, crystal clear finish.",
      icon: <Droplets size={32} />
    },
    {
      title: "Final Inspection",
      description: "We conduct a detailed quality check, ensuring every window meets our high standards before considering the job complete.",
      icon: <SparkleIcon size={32} />
    }
  ];

  return (
    <Layout>
      <ServiceHeader
        title="Commercial Window Cleaning"
        description="Professional window cleaning services for office buildings, retail stores, and multi-story commercial properties."
        icon={<Building size={48} />}
        imagePath="/lovable-uploads/8456f0a6-f534-4cc6-96ec-3c56bec589c2.png"
      />

      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Professional Window Cleaning for Commercial Properties</h2>
            <p className="text-gray-600 mb-6">
              Clean, streak-free windows make a significant difference in how clients, customers, and employees perceive your business. Our commercial window cleaning service uses advanced pure water technology and specialized equipment to safely clean windows at any height, providing exceptional results without disrupting your business operations.
            </p>
            <p className="text-gray-600 mb-6">
              Whether you manage a small retail store, a multi-story office building, or a large commercial complex, our professional team has the expertise and equipment to keep your windows spotless year-round. We offer flexible scheduling including after-hours and weekend service to minimize disruption to your business.
            </p>
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <Shield className="text-bc-red mr-2" size={24} />
                <span className="font-medium">Fully Insured</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-bc-red mr-2" size={24} />
                <span className="font-medium">Flexible Scheduling</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="text-bc-red mr-2" size={24} />
                <span className="font-medium">100% Satisfaction</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <img 
              src="/lovable-uploads/8456f0a6-f534-4cc6-96ec-3c56bec589c2.png" 
              alt="Commercial window cleaning service" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
            <div className="absolute inset-0 bg-black/60 rounded-lg p-6 flex flex-col justify-center">
              <h3 className="text-white text-2xl font-bold mb-4">Professional Commercial Window Cleaning</h3>
              <ul className="space-y-3 text-white">
                <li className="flex items-start">
                  <CheckCircle className="text-bc-red mr-2 flex-shrink-0" size={20} />
                  <span>Crystal clear, streak-free results every time</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-bc-red mr-2 flex-shrink-0" size={20} />
                  <span>Safe cleaning at any height with specialized equipment</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-bc-red mr-2 flex-shrink-0" size={20} />
                  <span>Flexible scheduling to minimize business disruption</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-bc-red mr-2 flex-shrink-0" size={20} />
                  <span>Fully insured and professionally trained technicians</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-bc-red mr-2 flex-shrink-0" size={20} />
                  <span>Eco-friendly, chemical-free cleaning methods</span>
                </li>
              </ul>
              <Button asChild className="mt-6 bg-bc-red hover:bg-red-700 w-fit">
                <Link to="/contact">Get a Free Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Benefits of Professional Commercial Window Cleaning</h2>
          <p className="section-subtitle">
            Regular window maintenance provides numerous advantages for your business property
          </p>
          <ServiceBenefits benefits={benefits} />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="section-title">Our Commercial Window Cleaning Process</h2>
        <p className="section-subtitle">
          We follow a comprehensive approach to deliver spotless windows for your commercial property
        </p>
        <ServiceProcess processes={processes} />
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">No Ladders Necessary!</h3>
              <p className="text-gray-600 mb-6">
                Our water-fed pole system can reach windows up to 70 feet high, eliminating the need for ladders or lifts in most cases. This technology not only improves safety but also provides superior cleaning results without leaving water spots or streaks.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-bc-red mr-2">✓</span>
                  <span>Safer than traditional ladder cleaning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bc-red mr-2">✓</span>
                  <span>Reaches windows up to 70 feet high</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bc-red mr-2">✓</span>
                  <span>No water spots or streaks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bc-red mr-2">✓</span>
                  <span>Less intrusive to your business operations</span>
                </li>
              </ul>
              <Button asChild>
                <Link to="/contact">
                  Request a Quote
                </Link>
              </Button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Maintenance Programs</h3>
              <p className="text-gray-600 mb-6">
                Keep your commercial property looking its best year-round with our customized maintenance programs. Regular cleaning prevents buildup of dirt, pollutants, and hard water stains that can damage glass over time.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-bc-red mr-2">✓</span>
                  <span>Monthly, quarterly, or bi-annual service plans</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bc-red mr-2">✓</span>
                  <span>Discounted rates for regular service</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bc-red mr-2">✓</span>
                  <span>Flexible scheduling to suit your business hours</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bc-red mr-2">✓</span>
                  <span>Comprehensive service reports with each visit</span>
                </li>
              </ul>
              <Button asChild>
                <Link to="/contact">
                  Schedule Maintenance
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </Layout>
  );
};

export default CommercialWindowCleaning;
