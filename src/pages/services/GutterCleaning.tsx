
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../../components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import LocationBanner from '../../components/LocationBanner';
import ServiceAreaMap from '../../components/ServiceAreaMap';
import ServiceBenefits from '../../components/ServiceBenefits';
import ServiceProcess from '../../components/ServiceProcess';
import GutterProtectionSection from '../../components/services/GutterProtectionSection';

const benefits = [
  {
    title: "Prevent Water Damage",
    description: "Stop water from overflowing and causing damage to your foundation, siding, and landscaping."
  },
  {
    title: "Extend Gutter Lifespan",
    description: "Regular cleaning prevents rust and corrosion, extending the life of your gutter system."
  },
  {
    title: "Prevent Pest Infestations",
    description: "Remove standing water and debris that attract mosquitoes, birds, and other pests."
  },
  {
    title: "Protect Your Roof",
    description: "Prevent water backup that can damage your roof, fascia boards, and soffit."
  },
  {
    title: "Maintain Curb Appeal",
    description: "Keep your home looking well-maintained with clean, properly functioning gutters."
  },
  {
    title: "Prevent Foundation Issues",
    description: "Stop water from pooling around your foundation, which can lead to cracks and settling."
  }
];

const processSteps = [
  {
    number: 1,
    title: "Comprehensive Inspection",
    description: "We begin with a thorough assessment of your gutter system to identify clogs, damage, and any potential issues."
  },
  {
    number: 2,
    title: "Debris Removal",
    description: "We remove all leaves, twigs, and debris from your gutters by hand to ensure complete cleaning."
  },
  {
    number: 3,
    title: "Downspout Clearing",
    description: "We flush your downspouts to ensure proper water flow and remove any stubborn clogs."
  },
  {
    number: 4,
    title: "Gutter Flushing",
    description: "We thoroughly flush your gutters with water to remove any remaining dirt and small particles."
  },
  {
    number: 5,
    title: "Inspection & Repair Assessment",
    description: "We inspect for any damage or issues that may need repair, and provide recommendations if needed."
  }
];

const GutterCleaning = () => {
  useEffect(() => {
    document.title = "Professional Gutter Cleaning Services in Surrey & White Rock";
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Professional Gutter Cleaning & Protection | BC Pressure Washing</title>
        <meta name="description" content="Expert gutter cleaning and protection solutions in Surrey and White Rock. Stop water damage and extend the life of your gutter system. Free quotes available!" />
      </Helmet>

      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/lovable-uploads/48b4e22a-2819-496f-85a1-9b082d06f29f.png"
            alt="Gutter cleaning service"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">Professional Gutter Cleaning</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-lg">
            Prevent water damage and protect your home with our thorough gutter cleaning services
          </p>
          <Button asChild variant="bc-red" size="lg" className="text-lg font-bold">
            <Link to="/calculator">Get a Free Quote</Link>
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <ServiceBenefits 
        title="Benefits of Professional Gutter Cleaning"
        benefits={benefits}
      />

      {/* Gutter Protection Section */}
      <GutterProtectionSection />

      {/* Process Section */}
      <ServiceProcess 
        title="Our Gutter Cleaning Process"
        steps={processSteps}
      />

      {/* Service Area Map */}
      <ServiceAreaMap />
      <LocationBanner />

      {/* CTA Section */}
      <section className="py-16 bg-bc-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Protect Your Home?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Schedule your professional gutter cleaning today and prevent costly water damage to your home.
          </p>
          <Button asChild variant="outline" size="lg" className="text-lg font-bold bg-white text-bc-red hover:bg-gray-100">
            <Link to="/calculator">Book Your Service</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default GutterCleaning;
