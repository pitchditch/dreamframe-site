
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import CallToAction from '../../components/CallToAction';
import { Building, CheckCircle, Droplets, SparkleIcon } from 'lucide-react';

// Import our new components
import ServiceDescription from '../../components/commercial/ServiceDescription';
import CleaningBenefits from '../../components/commercial/CleaningBenefits';
import CleaningProcess from '../../components/commercial/CleaningProcess';
import ServiceFeatures from '../../components/commercial/ServiceFeatures';
import MaintenanceProgram from '../../components/commercial/MaintenanceProgram';

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
        imagePath="/lovable-uploads/85a695a0-7160-4a9a-8d56-56e75cf3f4cb.png"
      />

      <ServiceDescription />
      
      <CleaningBenefits benefits={benefits} />
      
      <CleaningProcess processes={processes} />
      
      <ServiceFeatures />
      
      <MaintenanceProgram />

      <CallToAction />
    </Layout>
  );
};

export default CommercialWindowCleaning;
