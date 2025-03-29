
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ServiceFeatures = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">No Ladders Necessary!</h3>
            <p className="text-gray-600 mb-6">
              Our water-fed pole system can reach windows up to 70 feet high, eliminating the need for ladders or lifts in most cases. This technology not only improves safety but also provides superior cleaning results without leaving water spots or streaks.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>Safer than traditional ladder cleaning</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>Reaches windows up to 70 feet high</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>No water spots or streaks</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>Less intrusive to your business operations</span>
              </li>
            </ul>
            <Button asChild>
              <Link to="/contact">
                Request a Quote
              </Link>
            </Button>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Maintenance Programs</h3>
            <p className="text-gray-600 mb-6">
              Keep your commercial property looking its best year-round with our customized maintenance programs. Regular cleaning prevents buildup of dirt, pollutants, and hard water stains that can damage glass over time.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>Monthly, quarterly, or bi-annual service plans</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>Discounted rates for regular service</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>Flexible scheduling to suit your business hours</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>Comprehensive service reports with each visit</span>
              </li>
            </ul>
            <Button asChild>
              <Link to="/contact">
                Schedule Maintenance
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
