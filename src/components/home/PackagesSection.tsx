
import { Link } from 'react-router-dom';

const PackageCard = ({ 
  title, 
  price, 
  size, 
  features, 
  isPrimary = false 
}: { 
  title: string; 
  price: string; 
  size: string; 
  features: { name: string; included: boolean }[];
  isPrimary?: boolean;
}) => {
  return (
    <div className={`${isPrimary ? 'bg-bc-red text-white' : 'bg-white'} p-8 rounded-lg shadow-md ${!isPrimary && 'border border-gray-100'} relative`}>
      {isPrimary && (
        <div className="absolute -top-3 right-6 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
          POPULAR
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-3xl font-bold mb-2">{price}</p>
      <p className={`${isPrimary ? 'text-gray-200' : 'text-gray-500'} text-sm mb-6`}>{size}</p>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className={`flex items-center ${!isPrimary && (feature.included ? 'text-gray-700' : 'text-gray-400')}`}>
            <svg 
              className={`w-5 h-5 mr-2 ${
                isPrimary 
                  ? 'text-white' 
                  : feature.included ? 'text-bc-red' : 'text-gray-300'
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {feature.name}
          </li>
        ))}
      </ul>
      
      <Link to="/contact">
        <button className={isPrimary 
          ? "bg-white text-bc-red px-6 py-3 rounded-md font-medium w-full hover:bg-gray-100 transition-colors"
          : "btn-primary w-full"
        }>
          Get Started
        </button>
      </Link>
    </div>
  );
};

const PackagesSection = () => {
  const features = [
    "Window Cleaning",
    "Gutter Cleaning",
    "Exterior House Wash",
    "Roof Soft Wash",
    "Driveway Power Wash"
  ];

  const packages = [
    {
      title: "Starter Package",
      price: "$700",
      size: "Based on a 1800 SQFT. House",
      features: features.map((name, i) => ({ name, included: i < 2 }))
    },
    {
      title: "Upgraded Package",
      price: "$1,200",
      size: "Based on a 1900 SQFT. House",
      features: features.map(name => ({ name, included: true })),
      isPrimary: true
    },
    {
      title: "Premium Package",
      price: "$1,600",
      size: "Based on a 1900 SQFT+ House",
      features: features.map(name => ({ name, included: true }))
    }
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="badge-pill mx-auto w-fit animate-on-scroll">Yearly Maintenance</div>
        <h2 className="section-title animate-on-scroll">Choose the Right Package for Your Home</h2>
        <p className="section-subtitle animate-on-scroll">
          Our subscription packages are designed to keep your property looking its best year-round with regular maintenance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {packages.map((pkg, index) => (
            <div key={index} className="animate-on-scroll">
              <PackageCard {...pkg} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
