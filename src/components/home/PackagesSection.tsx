
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, ArrowRight, Check, Building, Home } from "lucide-react";

interface PackageSizePrice {
  size: string;
  regular: number;
  discounted: number;
}

interface PackageProps {
  title: string;
  includes: string[];
  prices: PackageSizePrice[];
  isPrimary?: boolean;
  onSelectPackage: (packageData: any) => void;
}

const PackageCard = ({ 
  title, 
  includes,
  prices,
  isPrimary = false,
  onSelectPackage
}: PackageProps) => {
  const [activePriceIndex, setActivePriceIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePriceIndex((prevIndex) => (prevIndex + 1) % prices.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [prices.length]);
  
  const activePrice = prices[activePriceIndex];
  
  const getHouseIcon = (size: string) => {
    if (size.includes('0-1800')) {
      return <Home className="w-4 h-4 mr-1" />;
    } else if (size.includes('1800-2800')) {
      return <Home className="w-5 h-5 mr-1" />;
    } else {
      return <Building className="w-5 h-5 mr-1" />;
    }
  };

  return (
    <Card className={`${isPrimary ? 'border-bc-red shadow-md' : 'border-gray-200'} h-full flex flex-col relative transform transition-transform duration-300 hover:scale-105`}>
      <div className="absolute -top-3 right-6 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
        <Flame className="w-3 h-3 mr-1" />
        20% Off if Booked Before May 1st!
      </div>
      <CardHeader className={`${isPrimary ? 'bg-bc-red text-white' : 'bg-gray-50'} rounded-t-lg`}>
        <CardTitle className="text-xl font-bold text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pt-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Includes:</h4>
            <ul className="space-y-2">
              {includes.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className={`${isPrimary ? 'text-bc-red' : 'text-green-600'} mt-1 mr-2 h-4 w-4 flex-shrink-0`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Pricing:</h4>
            <div className="bg-gray-50 p-3 rounded-md border border-gray-100 transition-all duration-300">
              <div className="flex items-center mb-1">
                {getHouseIcon(activePrice.size)}
                <span className="font-medium">{activePrice.size}:</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 line-through mr-2">${activePrice.regular.toFixed(2)}</span>
                <span className="text-bc-red font-bold">${activePrice.discounted.toFixed(2)}</span>
              </div>
              <div className="text-sm text-green-600 mt-1">
                Save ${(activePrice.regular - activePrice.discounted).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-6">
        <Button 
          onClick={() => onSelectPackage({
            title,
            includes,
            prices
          })}
          variant={isPrimary ? "bc-red" : "default"}
          className="w-full"
        >
          Select This Package
        </Button>
      </CardFooter>
    </Card>
  );
};

const PackagesSection = () => {
  const navigate = useNavigate();
  
  const packages = [
    {
      title: "Essential Clean",
      includes: [
        "Exterior Window Cleaning", 
        "Gutter Cleaning"
      ],
      prices: [
        { size: "0-1800 sqft", regular: 657.30, discounted: 525.84 },
        { size: "1800-2800 sqft", regular: 1143.30, discounted: 914.64 },
        { size: "2800-3500 sqft", regular: 1386.40, discounted: 1109.12 }
      ],
      services: ["window-cleaning", "gutter-cleaning"],
      discountPercent: 20
    },
    {
      title: "Ultimate Clean",
      includes: [
        "House Washing", 
        "Driveway Pressure Washing", 
        "Exterior Window Cleaning", 
        "Gutter Cleaning"
      ],
      prices: [
        { size: "0-1800 sqft", regular: 1677.00, discounted: 1341.60 },
        { size: "1800-2800 sqft", regular: 2553.00, discounted: 2042.40 },
        { size: "2800-3500 sqft", regular: 3480.60, discounted: 2784.48 }
      ],
      services: ["pressure-washing", "window-cleaning", "gutter-cleaning"],
      isPrimary: true,
      discountPercent: 20
    },
    {
      title: "Full Home Refresh",
      includes: [
        "House Washing", 
        "Exterior Window Cleaning", 
        "Gutter Cleaning"
      ],
      prices: [
        { size: "0-1800 sqft", regular: 1041.60, discounted: 833.28 },
        { size: "1800-2800 sqft", regular: 1611.90, discounted: 1289.52 },
        { size: "2800-3500 sqft", regular: 2207.70, discounted: 1766.16 }
      ],
      services: ["pressure-washing", "window-cleaning", "gutter-cleaning"],
      discountPercent: 20
    }
  ];
  
  const handleSelectPackage = (pkg: any) => {
    // Store package selection in sessionStorage with the services and discount
    const sizeIndex = 0; // Default to first size option
    
    sessionStorage.setItem('selectedPackage', JSON.stringify({
      title: pkg.title,
      services: pkg.services,
      discountApplied: true,
      discountPercent: pkg.discountPercent || 20,
      discountMessage: "20% Spring Special Discount Applied!",
      savings: (pkg.prices[sizeIndex].regular - pkg.prices[sizeIndex].discounted).toFixed(2),
      expirationDate: "May 1st, 2025"
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
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="badge-pill mx-auto w-fit animate-on-scroll">Spring Special Packages</div>
        <h2 className="section-title animate-on-scroll">Save 20% on Our Spring Cleaning Packages</h2>
        <p className="section-subtitle animate-on-scroll">
          Choose from our carefully designed packages and save on multiple services. Limited time offer expires May 1st, 2025.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {/* Reordering packages: Essential Clean, Ultimate Clean (Primary), Full Home Refresh */}
          <div className="animate-on-scroll">
            <PackageCard 
              {...packages[0]} 
              onSelectPackage={() => handleSelectPackage(packages[0])}
            />
          </div>
          <div className="animate-on-scroll">
            <PackageCard 
              {...packages[1]} 
              onSelectPackage={() => handleSelectPackage(packages[1])}
            />
          </div>
          <div className="animate-on-scroll">
            <PackageCard 
              {...packages[2]} 
              onSelectPackage={() => handleSelectPackage(packages[2])}
            />
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Don't see what you need? We offer customized packages to fit your specific requirements.
          </p>
          <Link to="/calculator">
            <Button variant="outline" className="mx-auto">
              Create Custom Package <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
