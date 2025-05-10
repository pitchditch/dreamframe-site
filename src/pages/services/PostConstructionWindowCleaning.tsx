
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../../components/Layout';
import ServiceHeader from '@/components/ServiceHeader';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Construction, CheckCircle } from 'lucide-react';
import ProcessSection from '@/components/post-construction/ProcessSection';
import WhySection from '@/components/post-construction/WhySection';
import TrustSection from '@/components/post-construction/TrustSection';
import ServiceBenefits from '@/components/ServiceBenefits';
import LocationBanner from '@/components/LocationBanner';
import CallToAction from '@/components/CallToAction';

const PostConstructionWindowCleaning: React.FC = () => {
  const benefits = [
    {
      title: "Remove All Construction Residues",
      description: "Eliminate paint, silicone, dust, stickers, debris, and other construction materials",
      icon: <Shield className="h-6 w-6 text-bc-red" />
    },
    {
      title: "Streak-Free Finish",
      description: "Professional-grade cleaning solutions and techniques for perfect clarity",
      icon: <Shield className="h-6 w-6 text-bc-red" />
    },
    {
      title: "Detail-Focused Service",
      description: "Tracks, frames, and sills thoroughly cleaned in addition to glass surfaces",
      icon: <Shield className="h-6 w-6 text-bc-red" />
    },
    {
      title: "Developer & Builder Trusted",
      description: "Experience working with construction companies throughout Metro Vancouver",
      icon: <Shield className="h-6 w-6 text-bc-red" />
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Post Construction Window Cleaning - BC Pressure Washing</title>
        <meta name="description" content="Professional post construction window cleaning services to ensure your windows are spotless and free of construction debris, fingerprints, and dust." />
        <meta name="keywords" content="post construction window cleaning, window cleaning services, construction cleanup, new home window cleaning, residential window cleaning, Vancouver window cleaning" />
      </Helmet>

      <ServiceHeader
        title="Post Construction Window Cleaning"
        description="Your windows deserve the best care after construction. Get rid of dust, debris, and smudges with our expert cleaning services."
        darkOverlay={true}
        imagePath="/lovable-uploads/4b31a7a4-ec16-4996-a49e-ee4b41fe0713.png"
      />

      <section id="intro" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Why Choose Our Post Construction Window Cleaning?</h2>
          <p className="text-lg text-gray-700 mb-6">
            After the dust settles and the construction is complete, the last thing you need is to worry about cleaning your windows. 
            Our specialized post construction window cleaning service ensures that your windows are spotless and free from construction debris, smudges, or dust.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Remove construction dust, dirt, and debris</li>
            <li>Professional streak-free finish</li>
            <li>Safe and efficient cleaning methods</li>
            <li>Serving Metro Vancouver, Surrey, and White Rock</li>
          </ul>
        </div>
      </section>

      <WhySection />
      
      <ProcessSection />

      <ServiceBenefits
        title="Benefits of Professional Post-Construction Window Cleaning"
        subtitle="The finishing touch your new construction or renovation needs"
        benefits={benefits}
      />

      <TrustSection />

      <section id="cta" className="py-12 bg-bc-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Your Windows Clean?</h2>
          <p className="text-xl mb-8">Contact us today to schedule your post-construction window cleaning service. We're here to make your home shine!</p>
          <Button asChild variant="default" className="bg-white text-bc-red px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">
            <Link to="/contact">Get a Free Quote</Link>
          </Button>
        </div>
      </section>
      
      <LocationBanner />
    </Layout>
  );
};

export default PostConstructionWindowCleaning;
