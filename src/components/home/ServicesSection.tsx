
import { Link } from 'react-router-dom';
import ServiceCard from '../ServiceCard';
import { ArrowRight, Droplets, Home, DropletIcon, Building } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const ServicesSection = () => {
  const { t } = useTranslation();
  
  return (
    <section className="section-padding bg-navy py-section">
      <div className="container mx-auto px-4">
        <div className="badge-pill mx-auto w-fit animate-on-scroll bg-bc-red/10 text-white">{t("Our Professional Services")}</div>
        <h2 className="section-title animate-on-scroll text-white">{t("Premium Cleaning Solutions for Every Surface")}</h2>
        <p className="section-subtitle animate-on-scroll max-w-3xl mx-auto text-white/80">
          {t("We offer a comprehensive range of pressure washing services tailored to meet the unique needs of both residential and commercial properties.")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mt-12">
          <div className="animate-on-scroll">
            <ServiceCard
              icon={<Droplets size={24} />}
              title={t("Window Cleaning")}
              description={t("Professional window cleaning using purified water for crystal clear, streak-free results on homes and commercial buildings.")}
              link="/services/window-cleaning"
              image="/lovable-uploads/931d71f9-6756-4b2d-aeed-7004b3fcdcdb.png"
              imageAlt="Window Cleaning in White Rock | Streak-Free Window Washing by BC Pressure Washing"
            />
          </div>
          <div className="animate-on-scroll">
            <ServiceCard
              icon={<Home size={24} />}
              title={t("Gutter Cleaning")}
              description={t("Thorough gutter cleaning to prevent damage and maintain proper drainage, extending the life of your gutter system.")}
              link="/services/gutter-cleaning"
              image="/lovable-uploads/ca44edd3-e620-4298-96b2-32f6f8332cae.png"
              imageAlt="Gutter Cleaning in Surrey | Rain Gutter Maintenance & Clog Removal by BC Pressure Washing"
            />
          </div>
          <div className="animate-on-scroll">
            <ServiceCard
              icon={<DropletIcon size={24} />}
              title={t("Pressure Washing")}
              description={t("Safe, effective pressure washing that removes dirt, algae, and mildew without damaging your home's exterior surfaces.")}
              link="/services/pressure-washing"
              image="/lovable-uploads/a8d9837b-5c66-4e74-a9a9-34e018c71a02.png"
              imageAlt="Pressure Washing in White Rock | Professional Exterior Cleaning by BC Pressure Washing"
            />
          </div>
          <div className="animate-on-scroll">
            <ServiceCard
              icon={<Building size={24} />}
              title={t("Roof Cleaning")}
              description={t("Professional roof cleaning that safely removes moss, algae, and debris, extending the life of your roof.")}
              link="/services/roof-cleaning"
              image="/lovable-uploads/ca94e1e6-7640-44e9-bc41-2389ccf948c1.png"
              imageAlt="Roof Cleaning in Langley | Moss Removal & Roof Maintenance by BC Pressure Washing"
            />
          </div>
        </div>

        <div className="mt-12 text-center animate-on-scroll">
          <Link to="/services">
            <button className="bg-bc-red hover:bg-bc-red/90 text-white px-8 py-3 rounded-lg transition-all duration-300 flex items-center justify-center mx-auto">
              {t("View All Services")} <ArrowRight className="ml-2 inline-block" size={16} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
