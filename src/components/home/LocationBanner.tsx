
import { MapPin, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { CityData } from '@/data/cities';

interface LocationBannerProps {
  detectedCity: CityData;
  currentCity: string;
}

export const LocationBanner = ({ detectedCity, currentCity }: LocationBannerProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-bc-red to-red-600 text-white py-3 px-4 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm md:text-base">
            We detected you're in <strong>{currentCity}</strong>! 
            {detectedCity && (
              <>
                {" "}We provide services in <strong>{detectedCity.name}</strong>.
              </>
            )}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {detectedCity && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="bg-white text-bc-red hover:bg-gray-100 text-xs md:text-sm"
            >
              <Link to={`/${detectedCity.slug}`}>
                View {detectedCity.name} Services
              </Link>
            </Button>
          )}
          
          <button
            onClick={() => setDismissed(true)}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Dismiss location banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
