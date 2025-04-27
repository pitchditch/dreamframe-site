
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useTranslation } from '@/hooks/use-translation';

const ImageCarousel = () => {
  const { t } = useTranslation();
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (!api) return;

    // Start autoplay with 3 second delay
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">{t("Our Pressure Washing Services")}</h2>
        <p className="text-lg text-center text-gray-600 mb-10">
          {t("Professional pressure washing solutions for your home and commercial property")}
        </p>
        
        <div className="mt-8 w-full">
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              <CarouselItem>
                <img 
                  src="/lovable-uploads/04bd3905-2c86-4062-9cec-ddbddead79ab.png" 
                  alt="Commercial Pressure Washing in Vancouver | Professional Building Cleaning by BC Pressure Washing" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </CarouselItem>
              <CarouselItem>
                <img 
                  src="/lovable-uploads/116727c7-867b-4c6c-b291-da7848be87ac.png" 
                  alt="Window Washing in White Rock | Professional Glass Cleaning by BC Pressure Washing" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </CarouselItem>
              <CarouselItem>
                <img 
                  src="/lovable-uploads/df1d5443-a527-44af-b261-a7bfde6064f7.png" 
                  alt="Surface Cleaning in South Surrey | Professional Pressure Washing by BC Pressure Washing" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </CarouselItem>
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static mx-2" />
              <CarouselNext className="relative static mx-2" />
            </div>
          </Carousel>
        </div>
        
        <div className="mt-8 text-center">
          <Button asChild>
            <Link to="/contact" className="mt-6">
              {t("Get Your Free Quote")} <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
