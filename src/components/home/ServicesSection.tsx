
import { Link } from 'react-router-dom';
import ServiceCard from '../ServiceCard';
import { ArrowRight, Droplets, Home, DropletIcon } from 'lucide-react';

const ServicesSection = () => {
  return (
    <section className="section-padding bg-bc-gray">
      <div className="container mx-auto px-4">
        <div className="badge-pill mx-auto w-fit animate-on-scroll">Our Professional Services</div>
        <h2 className="section-title animate-on-scroll">Premium Cleaning Solutions for Every Surface</h2>
        <p className="section-subtitle animate-on-scroll">
          We offer a comprehensive range of pressure washing services tailored to meet the unique needs of both residential and commercial properties.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="animate-on-scroll">
            <ServiceCard
              icon={<Droplets size={24} />}
              title="Window Cleaning"
              description="Professional window cleaning using purified water for crystal clear, streak-free results on homes and commercial buildings."
              link="/services/window-cleaning"
              image="https://images.unsplash.com/photo-1426604966848-d7adac402bff"
            />
          </div>
          <div className="animate-on-scroll">
            <ServiceCard
              icon={<Home size={24} />}
              title="Gutter Cleaning"
              description="Thorough gutter cleaning to prevent damage and maintain proper drainage, extending the life of your gutter system."
              link="/services/gutter-cleaning"
              image="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
            />
          </div>
          <div className="animate-on-scroll">
            <ServiceCard
              icon={<DropletIcon size={24} />}
              title="House Washing"
              description="Safe, low-pressure house washing that removes dirt, algae, and mildew without damaging your home's exterior."
              link="/services/house-washing"
              image="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
            />
          </div>
        </div>

        <div className="mt-12 text-center animate-on-scroll">
          <Link to="/services">
            <button className="btn-primary">
              View All Services <ArrowRight className="ml-2 inline-block" size={16} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
