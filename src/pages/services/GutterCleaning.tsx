import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import ServiceBenefits from '../../components/ServiceBenefits';
import ServiceProcess from '../../components/ServiceProcess';
import CallToAction from '../../components/CallToAction';
import { Droplets, ShieldCheck, Sun, Sparkles, RotateCw, Shield, Clock, ThumbsUp, Building } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import PriceCalculatorOverlay from '@/components/PriceCalculatorOverlay';
import { useIsMobile } from '@/hooks/use-mobile';
import ServicesSection from '@/components/home/ServicesSection';
import { Helmet } from 'react-helmet';

const GutterCleaning = () => {
  const isMobile = useIsMobile();
  
  const benefits = [
    {
      title: "Prevent Water Damage",
      description: "Clogged gutters can cause water to overflow and damage your roof, siding, and foundation."
    },
    {
      title: "Protect Your Home's Value",
      description: "Regular gutter cleaning helps maintain the structural integrity and appearance of your home."
    },
    {
      title: "Avoid Costly Repairs",
      description: "Preventative maintenance like gutter cleaning can save you money on expensive repairs down the line."
    },
    {
      title: "Keep Pests Away",
      description: "Clean gutters eliminate breeding grounds for mosquitoes, rodents, and other pests."
    },
    {
      title: "Extend Gutter Lifespan",
      description: "Regular cleaning prevents corrosion and deterioration, extending the life of your gutter system."
    },
    {
      title: "Improve Curb Appeal",
      description: "Clean, well-maintained gutters enhance the overall appearance of your home."
    }
  ];

  const processes = [
    {
      title: "Inspection & Assessment",
      description: "We thoroughly inspect your gutters to identify any clogs, damage, or potential issues.",
      icon: <ShieldCheck size={32} />
    },
    {
      title: "Debris Removal",
      description: "We remove all leaves, twigs, and other debris from your gutters and downspouts.",
      icon: <Sparkles size={32} />
    },
    {
      title: "Flushing & Cleaning",
      description: "We flush your gutters with water to ensure proper flow and remove any remaining debris.",
      icon: <Sun size={32} />
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Gutter Cleaning Services in Surrey & White Rock | BC Pressure Washing</title>
        <meta name="description" content="Professional gutter cleaning services in Surrey, White Rock and Metro Vancouver. Keep your home protected from water damage with our thorough gutter cleaning." />
        <meta name="keywords" content="gutter cleaning Surrey, gutter maintenance, gutter repair, rain gutter cleaning, White Rock gutter services" />
        <link rel="canonical" href="https://bcpressurewashing.ca/services/gutter-cleaning" />
        <meta property="og:title" content="Professional Gutter Cleaning Services | BC Pressure Washing" />
        <meta property="og:description" content="Expert gutter cleaning to prevent water damage and maintain proper drainage. Serving Surrey, White Rock and Metro Vancouver." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bcpressurewashing.ca/services/gutter-cleaning" />
        <meta property="og:image" content="/lovable-uploads/ca44edd3-e620-4298-96b2-32f6f8332cae.png" />
      </Helmet>
      
      <ServiceHeader
        title="Gutter Cleaning"
        description="Professional gutter cleaning services to protect your home from water damage and maintain proper drainage."
        icon={<Wind size={48} />}
        imagePath="/lovable-uploads/ca44edd3-e620-4298-96b2-32f6f8332cae.png"
      />

      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Protect Your Home with Clean Gutters</h2>
            <p className="text-gray-600 mb-6">
              Gutters play a crucial role in directing rainwater away from your home's foundation, preventing costly water damage. Over time, gutters can become clogged with leaves, twigs, and other debris, compromising their ability to function properly.
            </p>
            <p className="text-gray-600 mb-6">
              Our professional gutter cleaning service removes all buildup, ensuring that your gutters are free-flowing and able to protect your home from water damage. We use safe and effective techniques to clear your gutters without causing any damage to your property.
            </p>
            <div className="flex flex-wrap items-center gap-4">
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
              src="/lovable-uploads/a5671627-3791-4cbe-8df1-e571b18508d5.png" 
              alt="Gutter cleaning service" 
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Benefits of Professional Gutter Cleaning</h2>
          <p className="section-subtitle">
            Clean gutters do more than just improve your home's appearance - they offer numerous benefits for your home
          </p>
          <ServiceBenefits benefits={benefits} />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="section-title">Our Gutter Cleaning Process</h2>
        <p className="section-subtitle">
          We follow a meticulous process to ensure your gutters are clean and functioning properly
        </p>
        <ServiceProcess processes={processes} />
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <div className="badge-pill w-fit mb-4">Gutter Guard Installation</div>
              <h2 className="text-3xl font-bold mb-6">Gutter Guard Installation</h2>
              <p className="text-gray-600 mb-6">
                Prevent future clogs and reduce the need for frequent cleaning with our professional gutter guard installation services.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-bc-red font-bold mr-2">✓</span>
                  <span>Keeps leaves, twigs, and debris out of your gutters</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bc-red font-bold mr-2">✓</span>
                  <span>Reduces the need for frequent gutter cleaning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bc-red font-bold mr-2">✓</span>
                  <span>Protects your home from water damage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bc-red font-bold mr-2">✓</span>
                  <span>Extends the life of your gutter system</span>
                </li>
              </ul>
              <Link to="/services/gutter-guard-installation">
                <button className="btn-primary">
                  Learn More About Gutter Guards
                </button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/8e7a598a-83f9-4c2b-bfaa-21091b96ffcf.png" 
                alt="Gutter guard installation" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Ready for Clean, Free-Flowing Gutters?</h2>
        <div className="max-w-md mx-auto">
          <PriceCalculatorOverlay 
            buttonText="Get Your Free Quote" 
            variant="bc-red"
            className="w-full py-4 px-8 text-xl font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          />
        </div>
      </section>

      {/* Add ServicesSection before the CallToAction */}
      <ServicesSection />
      
      <CallToAction 
        title="Ready to Clean Your Gutters?"
        description="Contact us today to schedule a professional gutter cleaning service."
        buttonText="Get a Free Quote"
        buttonLink="/calculator"
      />
    </Layout>
  );
};

export default GutterCleaning;
