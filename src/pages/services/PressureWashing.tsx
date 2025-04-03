
import { DropletIcon } from 'lucide-react';
import { Helmet } from 'react-helmet';
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import CallToAction from '../../components/CallToAction';
import { useTranslation } from '@/hooks/use-translation';

// Import refactored components
import ServiceFeatures from '@/components/services/pressure-washing/ServiceFeatures';
import ImageCarousel from '@/components/services/pressure-washing/ImageCarousel';
import ServiceBenefitsSection from '@/components/services/pressure-washing/ServiceBenefitsSection';
import ServiceProcessSection from '@/components/services/pressure-washing/ServiceProcessSection';
import DrivewayCleaning from '@/components/services/pressure-washing/DrivewayCleaning';

const PressureWashing = () => {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <Helmet>
        <title>Professional Pressure Washing Services in White Rock, BC | BC Pressure Washing</title>
        <meta name="description" content="Expert pressure washing services in White Rock & Surrey. House washing, driveway cleaning, and more. Restore your property's beauty. Free estimates!" />
        <meta name="keywords" content="pressure washing White Rock, house washing Surrey, driveway cleaning White Rock, exterior cleaning services, soft washing White Rock" />
      </Helmet>
      
      <ServiceHeader
        title={t("House Washing")}
        description={t("Safe, effective pressure washing services to restore your home's exterior and protect your investment.")}
        icon={<DropletIcon size={48} />}
        imagePath="/lovable-uploads/761663e4-04b5-48f6-8d47-235fbec8008d.png"
      />

      <ServiceFeatures />
      <ImageCarousel />
      <ServiceBenefitsSection />
      <ServiceProcessSection />
      <DrivewayCleaning />

      <CallToAction 
        backgroundImage="/lovable-uploads/761663e4-04b5-48f6-8d47-235fbec8008d.png"
        title="Ready to Transform Your Property?"
        subtitle="Contact us today for a free pressure washing quote and consultation."
      />
    </Layout>
  );
};

export default PressureWashing;
