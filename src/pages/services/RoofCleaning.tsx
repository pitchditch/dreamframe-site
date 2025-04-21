
import Layout from '../../components/Layout';
import ServiceBenefits from '../../components/ServiceBenefits';
import ServiceProcess from '../../components/ServiceProcess';
import RoofCleaningGallery from '../../components/services/RoofCleaningGallery';
import CallToAction from '../../components/CallToAction';
import { Shield, Clock, ThumbsUp, Search, Droplets } from 'lucide-react';
import { Helmet } from 'react-helmet';

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
      <Helmet>
        <title>Professional Roof Cleaning Services | BC Pressure Washing White Rock</title>
        <meta name="description" content="Expert roof cleaning services in White Rock, Surrey & Metro Vancouver. Safe moss and algae removal, extending roof lifespan. Free estimates!" />
        <meta name="keywords" content="roof cleaning White Rock, moss removal BC, roof maintenance Surrey, professional roof cleaning services" />
      </Helmet>

      {/* HERO VIDEO SECTION */}
      <header className="relative bg-black min-h-[450px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <iframe
          className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
          src="https://www.youtube.com/embed/sjAe3XfY8Ts?autoplay=1&mute=1&loop=1&playlist=sjAe3XfY8Ts&controls=0&showinfo=0&rel=0"
          title="Roof Cleaning Video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ border: 'none', minHeight: "450px", objectFit: "cover", transform: "scale(1.2)", transformOrigin: "center" }}
        />
        <div className="relative z-20 text-center px-6 py-16 md:py-28 w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">Professional Roof Cleaning in Surrey &amp; White Rock</h1>
          <p className="text-lg md:text-2xl text-white font-medium mb-6 max-w-2xl mx-auto">
            Safe and effective roof cleaning to extend roof lifespan, protect your warranty, and instantly boost curb appeal.
          </p>
        </div>
      </header>
      
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
              src="/lovable-uploads/4b5d343d-9019-4709-9661-a5341edd7db7.png" 
              alt="Roof cleaning service" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      <RoofCleaningGallery />

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

      <CallToAction 
        backgroundImage="/lovable-uploads/213a6c8e-3ff9-45fd-8a16-20b91f45d9aa.png"
        title="Ready to Transform Your Roof?"
        subtitle="Contact us today for a free roof cleaning quote and consultation."
      />
    </Layout>
  );
};

export default RoofCleaning;

