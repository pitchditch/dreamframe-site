
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ServiceCard from '../components/ServiceCard';
import CallToAction from '../components/CallToAction';
import { Droplets, Home, CloudRain, Car, Building, Warehouse } from 'lucide-react';

const Services = () => {
  return (
    <Layout>
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="badge-pill mx-auto w-fit mb-4">Our Professional Services</div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Premium Cleaning Solutions for Every Surface</h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            We offer a comprehensive range of pressure washing services tailored to meet the unique needs of both residential and commercial properties.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Residential Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Droplets size={24} />}
              title="Window Cleaning"
              description="Professional window cleaning using purified water for crystal clear, streak-free results on homes and buildings of all sizes."
              link="/services/window-cleaning"
              image="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86"
            />
            <ServiceCard
              icon={<Home size={24} />}
              title="Gutter Cleaning"
              description="Thorough gutter cleaning to prevent damage and maintain proper drainage, extending the life of your gutter system."
              link="/services/gutter-cleaning"
              image="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb"
            />
            <ServiceCard
              icon={<CloudRain size={24} />}
              title="House Washing"
              description="Safe, low-pressure house washing that removes dirt, algae, and mildew without damaging your home's exterior."
              link="/services/house-washing"
              image="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
            />
            <ServiceCard
              icon={<Home size={24} />}
              title="Roof Cleaning"
              description="Gentle roof cleaning to remove moss, algae, and debris, protecting your roof and extending its lifespan."
              link="/services/roof-cleaning"
              image="https://images.unsplash.com/photo-1504893524553-b855bce32c67"
            />
            <ServiceCard
              icon={<Car size={24} />}
              title="Driveway Cleaning"
              description="Deep cleaning to remove oil stains, tire marks, and built-up grime from your driveway and walkways."
              link="/services/driveway-cleaning"
              image="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
            />
            <ServiceCard
              icon={<Droplets size={24} />}
              title="Deck/Patio Cleaning"
              description="Specialized cleaning for wood and composite decks and patios to restore their beauty and extend their life."
              link="/services/deck-cleaning"
              image="https://images.unsplash.com/photo-1458668383970-8ddd3927deed"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Commercial Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Building size={24} />}
              title="Commercial Window Cleaning"
              description="Professional window cleaning services for office buildings, retail stores, and other commercial properties."
              link="/services/commercial-window-cleaning"
              image="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
            />
            <ServiceCard
              icon={<Warehouse size={24} />}
              title="Parking Lot Cleaning"
              description="Professional parking lot cleaning services that enhance your property's appearance, safety, and longevity."
              link="/services/parking-lot-cleaning"
              image="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
            />
            <ServiceCard
              icon={<Building size={24} />}
              title="Commercial Building Washing"
              description="Exterior cleaning for commercial buildings to maintain professional appearance and structural integrity."
              link="/services/commercial-building-washing"
              image="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="bg-bc-gray p-8 md:p-12 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="badge-pill mb-4">Scheduled Maintenance</div>
                <h2 className="text-3xl font-bold mb-4">Keep Your Property Looking Its Best</h2>
                <p className="text-gray-600 mb-6">
                  Regular maintenance is key to preserving your property's value and appearance. Our scheduled maintenance programs can be customized to your specific needs and budget.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Quarterly, bi-annual, or annual service plans</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Discounted rates for regular customers</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Priority scheduling for maintenance clients</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-bc-red mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Comprehensive property maintenance solutions</span>
                  </li>
                </ul>
                <Link to="/contact">
                  <button className="btn-primary">Get a Custom Maintenance Plan</button>
                </Link>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843" 
                  alt="Scheduled maintenance services" 
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction
        title="Ready to Experience Our Premium Services?"
        subtitle="Contact us today to discuss your specific needs and receive a customized cleaning solution for your property."
      />
    </Layout>
  );
};

export default Services;
