
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import { MapPin } from 'lucide-react';

interface ServiceAreaHeroProps {
  city: string;
  image: string;
  subtitle?: string;
  cta?: string;
}

const ServiceAreaHero = ({ city, image, subtitle, cta }: ServiceAreaHeroProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="flex items-center justify-center mb-4">
          <MapPin className="h-8 w-8 text-bc-red mr-2" />
          <h2 className="text-lg font-medium uppercase tracking-wider">
            {t("Proudly Serving")}
          </h2>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
          {city}
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto text-center mb-8">
          {subtitle || t(`Professional exterior cleaning services in ${city} and surrounding areas.`)}
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-bc-red hover:bg-bc-red/90">
            <Link to="/contact">{t("Get a Free Quote")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
            <a href="tel:7788087620">{t("Call Us: 778-808-7620")}</a>
          </Button>
        </div>
        
        {/* Rating Badge */}
        <div className="mt-10 flex justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 inline-flex items-center">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-2">★★★★★</span>
              <span className="text-white font-semibold">5.0</span>
            </div>
            <div className="mx-3 h-6 w-px bg-white/20"></div>
            <span className="text-gray-200">{t("Highest rated in")} {city}</span>
          </div>
        </div>
      </div>
      
      {/* Bottom triangular shape */}
      <svg 
        className="absolute bottom-0 left-0 right-0 w-full text-white" 
        height="60" 
        preserveAspectRatio="none" 
        viewBox="0 0 1200 120"
        fill="currentColor"
      >
        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
      </svg>
    </div>
  );
};

export default ServiceAreaHero;
