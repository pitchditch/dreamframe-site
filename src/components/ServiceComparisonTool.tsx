
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslation } from '@/hooks/use-translation';
import { Link } from 'react-router-dom';

interface ServiceFeature {
  name: string;
  included: boolean[];
  tooltip?: string;
}

interface ServicePackage {
  name: string;
  price: string;
  description: string;
  popular?: boolean;
  url: string;
}

const ServiceComparisonTool = () => {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<'window' | 'pressure' | 'gutter' | 'roof'>('window');
  
  // Services data 
  const services = {
    window: {
      title: "Window Cleaning",
      packages: [
        {
          name: "Essential",
          price: "$149",
          description: "Basic exterior window cleaning",
          url: "/services/window-cleaning"
        },
        {
          name: "Complete Clean",
          price: "$249",
          description: "Interior and exterior cleaning with screen cleaning",
          popular: true,
          url: "/services/window-cleaning"
        },
        {
          name: "Premium",
          price: "$349",
          description: "Complete clean plus track and sill deep cleaning",
          url: "/services/window-cleaning"
        }
      ],
      features: [
        { name: "Exterior Window Cleaning", included: [true, true, true] },
        { name: "Interior Window Cleaning", included: [false, true, true] },
        { name: "Screen Cleaning", included: [false, true, true] },
        { name: "Window Track Cleaning", included: [false, false, true], tooltip: "Deep cleaning of window tracks and sills" },
        { name: "Hard Water Stain Removal", included: [false, false, true] },
        { name: "Mirror Cleaning", included: [false, true, true] },
        { name: "Skylight Cleaning", included: [false, false, true] }
      ]
    },
    pressure: {
      title: "Pressure Washing",
      packages: [
        {
          name: "Basic Wash",
          price: "$199",
          description: "Driveway and walkway cleaning",
          url: "/services/pressure-washing"
        },
        {
          name: "House Wash",
          price: "$349",
          description: "House siding, driveway, and walkway",
          popular: true,
          url: "/services/pressure-washing"
        },
        {
          name: "Complete Property",
          price: "$599",
          description: "House, driveway, patio, fence, and more",
          url: "/services/pressure-washing"
        }
      ],
      features: [
        { name: "Driveway Cleaning", included: [true, true, true] },
        { name: "Walkway Cleaning", included: [true, true, true] },
        { name: "House Siding Cleaning", included: [false, true, true] },
        { name: "Patio/Deck Cleaning", included: [false, false, true] },
        { name: "Fence Cleaning", included: [false, false, true] },
        { name: "Moss Treatment", included: [false, true, true] },
        { name: "Concrete Sealing", included: [false, false, true], tooltip: "Protective sealant applied to extend cleanliness" }
      ]
    },
    gutter: {
      title: "Gutter Cleaning",
      packages: [
        {
          name: "Basic",
          price: "$149",
          description: "Gutter debris removal",
          url: "/services/gutter-cleaning"
        },
        {
          name: "Standard",
          price: "$249",
          description: "Debris removal plus downspout flushing",
          popular: true,
          url: "/services/gutter-cleaning"
        },
        {
          name: "Premium",
          price: "$349",
          description: "Complete service with gutter brightening",
          url: "/services/gutter-cleaning"
        }
      ],
      features: [
        { name: "Gutter Debris Removal", included: [true, true, true] },
        { name: "Downspout Flushing", included: [false, true, true] },
        { name: "Gutter Exterior Cleaning", included: [false, false, true] },
        { name: "Gutter Fastener Check", included: [false, true, true] },
        { name: "Roof Valley Cleaning", included: [false, false, true] },
        { name: "Minor Repairs", included: [false, false, true], tooltip: "Small leaks and loose fasteners" },
        { name: "Gutter Guard Inspection", included: [false, true, true] }
      ]
    },
    roof: {
      title: "Roof Cleaning",
      packages: [
        {
          name: "Basic",
          price: "$299",
          description: "Basic moss and debris removal",
          url: "/services/roof-cleaning"
        },
        {
          name: "Standard",
          price: "$499",
          description: "Thorough cleaning with preventative treatment",
          popular: true,
          url: "/services/roof-cleaning"
        },
        {
          name: "Complete Care",
          price: "$699",
          description: "Deluxe service with inspection and repair",
          url: "/services/roof-cleaning"
        }
      ],
      features: [
        { name: "Moss Removal", included: [true, true, true] },
        { name: "Debris Clearing", included: [true, true, true] },
        { name: "Algae Treatment", included: [false, true, true] },
        { name: "Preventative Treatment", included: [false, true, true] },
        { name: "Gutter Cleaning", included: [false, false, true] },
        { name: "Roof Inspection", included: [false, true, true] },
        { name: "Minor Repairs", included: [false, false, true], tooltip: "Replacing missing shingles, sealing small leaks" }
      ]
    }
  };
  
  const currentService = services[selectedService];
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">{t("Compare Our Service Packages")}</h2>
      
      {/* Service type selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <Button 
          variant={selectedService === 'window' ? 'default' : 'outline'} 
          onClick={() => setSelectedService('window')}
          className={selectedService === 'window' ? 'bg-bc-red hover:bg-bc-red/90' : ''}
        >
          {t("Window Cleaning")}
        </Button>
        <Button 
          variant={selectedService === 'pressure' ? 'default' : 'outline'}
          onClick={() => setSelectedService('pressure')}
          className={selectedService === 'pressure' ? 'bg-bc-red hover:bg-bc-red/90' : ''}
        >
          {t("Pressure Washing")}
        </Button>
        <Button 
          variant={selectedService === 'gutter' ? 'default' : 'outline'}
          onClick={() => setSelectedService('gutter')}
          className={selectedService === 'gutter' ? 'bg-bc-red hover:bg-bc-red/90' : ''}
        >
          {t("Gutter Cleaning")}
        </Button>
        <Button 
          variant={selectedService === 'roof' ? 'default' : 'outline'}
          onClick={() => setSelectedService('roof')}
          className={selectedService === 'roof' ? 'bg-bc-red hover:bg-bc-red/90' : ''}
        >
          {t("Roof Cleaning")}
        </Button>
      </div>
      
      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Package Headers */}
          <thead>
            <tr>
              <th className="w-1/4 px-4 py-2 text-left"></th>
              {currentService.packages.map((pkg, idx) => (
                <th key={idx} className="w-1/4 px-4 py-2 text-center">
                  {pkg.popular && (
                    <div className="bg-bc-red text-white text-xs uppercase py-1 px-2 rounded-full mb-2 mx-auto w-max">
                      {t("Most Popular")}
                    </div>
                  )}
                  <div className="text-xl font-bold">{t(pkg.name)}</div>
                  <div className="text-2xl font-bold text-bc-red my-1">{pkg.price}</div>
                  <div className="text-sm text-gray-600 mb-4">{t(pkg.description)}</div>
                  <Button asChild variant={pkg.popular ? "bc-red" : "outline"} className="mb-2">
                    <Link to={pkg.url}>{t("Select")}</Link>
                  </Button>
                </th>
              ))}
            </tr>
          </thead>
          
          {/* Features */}
          <tbody>
            {currentService.features.map((feature, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <span>{t(feature.name)}</span>
                    {feature.tooltip && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="ml-2 w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t(feature.tooltip)}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </td>
                
                {feature.included.map((isIncluded, i) => (
                  <td key={i} className="px-4 py-4 text-center border-t border-gray-200">
                    {isIncluded ? (
                      <Check className="mx-auto text-green-500 w-6 h-6" />
                    ) : (
                      <X className="mx-auto text-gray-300 w-5 h-5" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 text-center">
        <p className="mb-4">{t("Not sure which package is right for you? Contact us for a personalized recommendation.")}</p>
        <Button asChild variant="default" size="lg" className="bg-bc-red hover:bg-bc-red/90">
          <Link to="/contact">{t("Get a Custom Quote")}</Link>
        </Button>
      </div>
    </div>
  );
};

export default ServiceComparisonTool;
