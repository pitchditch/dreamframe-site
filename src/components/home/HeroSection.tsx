
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section 
      className="hero-section relative h-[90vh] flex items-center" 
      style={{ 
        backgroundImage: "url('/lovable-uploads/deea00c1-1c27-44fd-b409-09d0f3ff0afa.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="hero-overlay absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl">
          <div className="badge-pill animate-on-scroll mb-4 bg-red-50/80 backdrop-blur-sm">
            Professional Pressure Washing Services
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-on-scroll text-shadow">
            The Ultimate Cleaning
            <span className="text-bc-red block"> Solution </span>
            for Your Property
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-on-scroll text-white text-shadow-sm">
            We deliver exceptional cleaning results for residential and commercial properties with our state-of-the-art equipment and professional techniques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-on-scroll">
            <Link to="/contact">
              <button className="btn-primary">
                Get a Free Quote <ArrowRight className="ml-2 inline-block" size={16} />
              </button>
            </Link>
            <Link to="/services">
              <button className="btn-secondary bg-white/80 backdrop-blur-sm hover:bg-white">
                Explore Our Services
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
