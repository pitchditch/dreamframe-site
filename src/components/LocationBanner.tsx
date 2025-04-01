
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const LocationBanner = () => {
  return (
    <section className="bg-gray-900 text-white py-6 location-banner">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center text-center md:text-left gap-4 md:gap-12">
          <h3 className="text-xl md:text-2xl font-bold flex items-center">
            <MapPin className="h-5 w-5 md:h-6 md:w-6 text-bc-red mr-2" />
            Areas We Service
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-6 text-sm md:text-base">
            <Link to="/locations/white-rock" className="hover:text-bc-red transition-colors">
              White Rock, BC
            </Link>
            <Link to="/locations/surrey" className="hover:text-bc-red transition-colors">
              Surrey, BC
            </Link>
            <Link to="/locations/langley" className="hover:text-bc-red transition-colors">
              Langley, BC
            </Link>
            <Link to="/locations/south-surrey" className="hover:text-bc-red transition-colors">
              South Surrey, BC
            </Link>
            <Link to="/locations/metro-vancouver" className="hover:text-bc-red transition-colors">
              Metro Vancouver
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationBanner;
