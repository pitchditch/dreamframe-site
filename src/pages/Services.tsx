
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ServiceCard from '../components/ServiceCard';
import CallToAction from '../components/CallToAction';
import { Droplets, Home, CloudRain, Car, Building, Warehouse } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const Services = () => {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="badge-pill mx-auto w-fit mb-4">{t("Our Professional Services")}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">{t("Premium Cleaning Solutions for Every Surface")}</h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            {t("We offer a comprehensive range of pressure washing services tailored to meet the unique needs of both residential and commercial properties.")}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">{t("Residential Services")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Droplets size={24} />} 
              title={t("Window Cleaning")} 
              description={t("Professional window cleaning using purified water for crystal clear, streak-free results on homes and buildings of all sizes.")} 
              link="/services/window-cleaning" 
              image="/lovable-uploads/5d9b60f7-561a-4672-acdf-29948d260793.png" 
              imageAlt="Window Cleaning in White Rock | Streak-Free Window Washing by BC Pressure Washing" 
            />
            <ServiceCard 
              icon={<Home size={24} />} 
              title={t("Gutter Cleaning")} 
              description={t("Thorough gutter cleaning to prevent damage and maintain proper drainage, extending the life of your gutter system.")} 
              link="/services/gutter-cleaning" 
              image="/lovable-uploads/3f5a834d-b684-4522-a2a6-e877e036ccd8.png" 
              imageAlt="Gutter Cleaning in Surrey | Rain Gutter Maintenance & Clog Removal by BC Pressure Washing" 
            />
            <ServiceCard 
              icon={<CloudRain size={24} />} 
              title={t("House Washing")} 
              description={t("Safe, low-pressure house washing that removes dirt, algae, and mildew without damaging your home's exterior.")} 
              link="/services/house-washing" 
              image="/lovable-uploads/ef54ad3a-1e61-4d1e-b827-b556187487ef.png" 
              imageAlt="House Washing in Langley | Low-Pressure Home Cleaning by BC Pressure Washing" 
            />
            <ServiceCard 
              icon={<Home size={24} />} 
              title={t("Roof Cleaning")} 
              description={t("Gentle roof cleaning to remove moss, algae, and debris, protecting your roof and extending its lifespan.")} 
              link="/services/roof-cleaning" 
              image="/lovable-uploads/47504564-617f-4553-85c8-0f9f5d5ec715.png" 
              imageAlt="Roof Cleaning in White Rock | Moss Removal & Soft Washing by BC Pressure Washing" 
            />
            <ServiceCard 
              icon={<Car size={24} />} 
              title={t("Driveway Cleaning")} 
              description={t("Deep cleaning to remove oil stains, tire marks, and built-up grime from your driveway and walkways.")} 
              link="/services/driveway-cleaning" 
              image="/lovable-uploads/b5967047-dddc-47e1-a23c-dd4a5feb9125.png" 
              imageAlt="Driveway Cleaning in Abbotsford | Oil Stain Removal by BC Pressure Washing" 
            />
            <ServiceCard 
              icon={<Droplets size={24} />} 
              title={t("Deck/Patio Cleaning")} 
              description={t("Specialized cleaning for wood and composite decks and patios to restore their beauty and extend their life.")} 
              link="/services/deck-cleaning" 
              image="/lovable-uploads/6efc066c-cf14-4550-a6ab-dd1184a2b519.png" 
              imageAlt="Deck Cleaning in Mission | Patio Restoration by BC Pressure Washing" 
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50 w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">{t("Commercial Services")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Building size={24} />} 
              title={t("Commercial Window Cleaning")} 
              description={t("Professional window cleaning services for office buildings, retail stores, and other commercial properties.")} 
              link="/services/commercial-window-cleaning" 
              image="/lovable-uploads/b3e01fd9-0f50-4524-b794-26a9f6f93ee5.png" 
              imageAlt="Commercial Window Cleaning in Vancouver | Office Building Glass Cleaning by BC Pressure Washing" 
            />
            <ServiceCard 
              icon={<Warehouse size={24} />} 
              title={t("Parking Lot Cleaning")} 
              description={t("Professional parking lot cleaning services that enhance your property's appearance, safety, and longevity.")} 
              link="/services/parking-lot-cleaning" 
              image="/lovable-uploads/0413d26c-fb32-4ac3-ad1c-8e24f7878b90.png" 
              imageAlt="Parking Lot Cleaning in White Rock | Commercial Surface Cleaning by BC Pressure Washing" 
            />
            <ServiceCard 
              icon={<Building size={24} />} 
              title={t("Commercial Building Washing")} 
              description={t("Exterior cleaning for commercial buildings to maintain professional appearance and structural integrity.")} 
              link="/services/commercial-building-washing" 
              image="/lovable-uploads/b3e01fd9-0f50-4524-b794-26a9f6f93ee5.png" 
              imageAlt="Commercial Building Washing in South Surrey | Professional Exterior Cleaning by BC Pressure Washing" 
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 w-full">
        <div className="container mx-auto px-4">
          <div className="bg-bc-gray p-8 md:p-12 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="badge-pill mb-4">{t("Scheduled Maintenance")}</div>
                <h2 className="text-3xl font-bold mb-4">{t("Keep Your Property Looking Its Best")}</h2>
                <p className="text-gray-600 mb-6">
                  {t("Regular maintenance is key to preserving your property's value and appearance. Our scheduled maintenance programs can be customized to your specific needs and budget.")}
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{t("Quarterly, bi-annual, or annual service plans")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{t("Discounted rates for regular customers")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{t("Priority scheduling for maintenance clients")}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{t("Comprehensive property maintenance solutions")}</span>
                  </li>
                </ul>
                <Link to="/contact">
                  <button className="btn-primary">{t("Get a Custom Maintenance Plan")}</button>
                </Link>
              </div>
              <div>
                <img alt="Scheduled maintenance services" className="rounded-lg shadow-lg w-full" src="/lovable-uploads/a995557d-d6cd-4372-a7ad-a6006adb6647.png" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction title={t("Ready to Experience Our Premium Services?")} subtitle={t("Contact us today to discuss your specific needs and receive a customized cleaning solution for your property.")} />
    </Layout>
  );
};

export default Services;
