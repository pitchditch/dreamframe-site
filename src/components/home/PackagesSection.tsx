
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Check, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

// House size data for rotating display
const houseSizes = [
  { size: 'small', label: 'Small House', sqft: '1800 SQFT', icon: '🏠' },
  { size: 'medium', label: 'Medium House', sqft: '1900 SQFT', icon: '🏠🏠' },
  { size: 'large', label: 'Large House', sqft: '2800 SQFT', icon: '🏠🏠🏠' },
];

const PackagesSection = () => {
  const navigate = useNavigate();
  const [currentSizeIndex, setCurrentSizeIndex] = useState(0);
  const currentSize = houseSizes[currentSizeIndex];
  
  // Rotate house sizes every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSizeIndex((prevIndex) => (prevIndex + 1) % houseSizes.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
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
      size: `Based on a ${currentSize.sqft} ${currentSize.label}`,
      features: features.map((name, i) => ({ name, included: i < 2 })),
      services: ["window-cleaning", "gutter-cleaning"],
      discountPercent: 5,
      savings: 105,
      image: "/lovable-uploads/931d71f9-6756-4b2d-aeed-7004b3fcdcdb.png",
      imageAlt: "Window Cleaning in White Rock | Streak-Free Window Washing by BC Pressure Washing"
    },
    {
      title: "Ultimate Clean",
      price: "$1,200",
      size: `Based on a ${currentSize.sqft} ${currentSize.label}`,
      // Explicitly mark "Roof Soft Wash" as not included
      features: features.map((name) => ({ 
        name, 
        included: name !== "Roof Soft Wash" 
      })),
      services: ["window-cleaning", "gutter-cleaning", "pressure-washing"],
      isPrimary: true,
      discountPercent: 10,
      savings: 240,
      image: "/lovable-uploads/a8d9837b-5c66-4e74-a9a9-34e018c71a02.png",
      imageAlt: "Pressure Washing in White Rock | Professional Exterior Cleaning by BC Pressure Washing"
    },
    {
      title: "Premium Package",
      price: "$1,600",
      size: `Based on a ${currentSize.sqft} ${currentSize.label}`,
      features: features.map(name => ({ name, included: true })),
      services: ["window-cleaning", "gutter-cleaning", "pressure-washing", "roof-cleaning"],
      discountPercent: 15,
      savings: 434,
      image: "/lovable-uploads/ca94e1e6-7640-44e9-bc41-2389ccf948c1.png",
      imageAlt: "Roof Cleaning in Langley | Moss Removal & Roof Maintenance by BC Pressure Washing"
    }
  ];
  
  const handleSelectPackage = (pkg: any) => {
    // Store package selection in sessionStorage
    sessionStorage.setItem('selectedPackage', JSON.stringify({
      title: pkg.title,
      services: pkg.services,
      discountApplied: true,
      discountPercent: pkg.discountPercent || 10,
      savings: pkg.savings
    }));
    
    // Open calculator overlay instead of navigating
    const calculatorOverlay = document.querySelector('.special-offers-button') as HTMLButtonElement;
    if (calculatorOverlay) {
      calculatorOverlay.click();
    } else {
      // Fallback to navigating to calculator page
      navigate('/calculator');
    }
  };

  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="badge-pill mx-auto w-fit animate-on-scroll">Yearly Maintenance</div>
        <h2 className="section-title animate-on-scroll">Choose the Right Package for Your Home</h2>
        <p className="section-subtitle animate-on-scroll">
          Our subscription packages are designed to keep your property looking its best year-round with regular maintenance.
        </p>
        
        <div className="text-center my-8 animate-on-scroll">
          <div className="inline-flex items-center justify-center bg-white px-4 py-2 rounded-full shadow-sm">
            <Clock className="text-bc-red mr-2" size={18} />
            <span className="text-sm font-medium">Currently showing prices for: </span>
            <span className="ml-2 font-bold text-bc-red">
              {currentSize.icon} {currentSize.label} ({currentSize.sqft})
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {packages.map((pkg, index) => (
            <div 
              key={index} 
              className={`animate-on-scroll ${pkg.isPrimary ? 'md:-mt-4 md:-mb-4' : ''}`}
            >
              <Card className={`h-full overflow-hidden flex flex-col ${pkg.isPrimary ? 'border-2 border-bc-red shadow-xl' : 'border shadow'}`}>
                {pkg.isPrimary && (
                  <div className="bg-yellow-400 text-black text-xs font-bold text-center py-1">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={pkg.image} 
                    alt={pkg.imageAlt} 
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 flex items-center justify-center ${pkg.isPrimary ? 'bg-bc-red/70' : 'bg-black/50'}`}>
                    <h3 className="text-white text-2xl font-bold">{pkg.title}</h3>
                  </div>
                </div>
                
                <CardHeader className={`${pkg.isPrimary ? 'bg-bc-red text-white' : 'bg-white'} text-center pb-2`}>
                  <div className="text-3xl font-bold">{pkg.price}</div>
                  <p className={`text-sm ${pkg.isPrimary ? 'text-white/80' : 'text-gray-500'}`}>{pkg.size}</p>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  {pkg.savings > 0 && (
                    <div className={`text-sm ${pkg.isPrimary ? 'text-bc-red' : 'text-green-600'} font-medium mb-4 bg-green-50 p-2 rounded-md border border-green-100`}>
                      Save ${pkg.savings} with this package!
                    </div>
                  )}
                  
                  <ul className="space-y-3 mt-4">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          {pkg.features[idx].included ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <span className="h-5 w-5 text-gray-300">✕</span>
                          )}
                        </div>
                        <span className={`ml-2 ${pkg.features[idx].included ? 'text-gray-700' : 'text-gray-400 line-through'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pt-2 pb-6">
                  <button 
                    onClick={() => handleSelectPackage(pkg)}
                    className={`w-full py-3 px-4 rounded-md font-medium transition-all flex items-center justify-center ${
                      pkg.isPrimary 
                        ? 'bg-bc-red text-white hover:bg-red-700' 
                        : 'bg-white text-bc-red border border-bc-red hover:bg-gray-50'
                    }`}
                  >
                    Get Started
                    <ArrowRight className="ml-2" size={16} />
                  </button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
