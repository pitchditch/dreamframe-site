
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import ServiceBenefits from '../../components/ServiceBenefits';
import ServiceProcess from '../../components/ServiceProcess';
import CallToAction from '../../components/CallToAction';
import { Droplets, ShieldCheck, Sun, Sparkles, RotateCw, Shield, Clock, ThumbsUp, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const WindowCleaning = () => {
  const benefits = [
    {
      title: "Improved Curb Appeal",
      description: "Clean, sparkling windows dramatically enhance your home's appearance and make a great first impression."
    },
    {
      title: "Increased Natural Light",
      description: "Remove dirt, grime, and streaks that block sunlight, allowing more natural light to brighten your interior spaces."
    },
    {
      title: "Extended Window Lifespan",
      description: "Regular cleaning prevents the buildup of corrosive substances that can damage glass and window frames over time."
    },
    {
      title: "Energy Efficiency",
      description: "Clean windows allow more solar heat to enter in winter, potentially reducing heating costs and improving efficiency."
    },
    {
      title: "Healthier Indoor Environment",
      description: "Remove dust, allergens, and pollutants that accumulate on window surfaces, contributing to better indoor air quality."
    },
    {
      title: "Professional Results",
      description: "Our streak-free cleaning techniques deliver superior results compared to DIY methods, saving you time and frustration."
    }
  ];

  const processes = [
    {
      title: "Pre-Cleaning Assessment",
      description: "We inspect your windows to identify any specific issues or areas that require special attention.",
      icon: <ShieldCheck size={32} />
    },
    {
      title: "Frame & Sill Cleaning",
      description: "We clean window frames, tracks, and sills to remove dust, dirt, and debris before addressing the glass.",
      icon: <Sparkles size={32} />
    },
    {
      title: "Professional Glass Cleaning",
      description: "Using professional-grade solutions and techniques, we clean both interior and exterior glass to a streak-free shine.",
      icon: <Sun size={32} />
    }
  ];

  return (
    <Layout>
      <ServiceHeader
        title="Window Cleaning"
        description="Professional window cleaning services that deliver crystal clear, streak-free results for your home or business."
        icon={<Sun size={48} />}
        imagePath="https://images.unsplash.com/photo-1594873272550-7cc741973dd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
      />

      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Crystal Clear Windows, Every Time</h2>
            <p className="text-gray-600 mb-6">
              Windows are the eyes of your home, allowing natural light to flood your interior spaces while providing views of the outside world. Over time, windows collect dirt, dust, water spots, and other contaminants that diminish their clarity and appearance.
            </p>
            <p className="text-gray-600 mb-6">
              Our professional window cleaning service removes all buildup, leaving your windows spotless and streak-free. We use premium, environmentally friendly cleaning solutions and professional tools to achieve results that simply aren't possible with DIY methods.
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
              src="https://images.unsplash.com/photo-1527689638836-411945a2b57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Window cleaning service" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Benefits of Professional Window Cleaning</h2>
          <p className="section-subtitle">
            Clean windows do more than just improve your view - they offer numerous benefits for your home
          </p>
          <ServiceBenefits benefits={benefits} />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="section-title">Our Window Cleaning Process</h2>
        <p className="section-subtitle">
          We follow a meticulous process to ensure spotless, streak-free windows every time
        </p>
        <ServiceProcess processes={processes} />
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/5b73077f-b551-44dc-9605-1b642b923e9c.png" 
                alt="Commercial window cleaning service" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <div className="badge-pill w-fit mb-4">Commercial Services</div>
              <h2 className="text-3xl font-bold mb-6">Commercial Window Cleaning</h2>
              <p className="text-gray-600 mb-6">
                For multi-story buildings and commercial properties, our specialized equipment and trained technicians provide safe and efficient window cleaning services without the need for ladders.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-bc-red font-bold mr-2">✓</span>
                  <span>No ladders necessary - we use water-fed pole systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bc-red font-bold mr-2">✓</span>
                  <span>No water spots or streaks - pure water cleaning technology</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bc-red font-bold mr-2">✓</span>
                  <span>Reaches windows up to 5 stories high safely</span>
                </li>
                <li className="flex items-start">
                  <span className="text-bc-red font-bold mr-2">✓</span>
                  <span>Minimal disruption to your business operations</span>
                </li>
              </ul>
              <Link to="/services/commercial-window-cleaning">
                <button className="btn-primary">
                  Learn More About Commercial Services
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </Layout>
  );
};

export default WindowCleaning;
