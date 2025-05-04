
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
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

  // Sample images for the carousel
  const images = [
    {
      src: "/lovable-uploads/1c34be5d-1b8e-4e6b-b9c9-aab9c1c6b86a.png",
      alt: "Pressure washing before and after driveway",
      title: "Driveway Transformation"
    },
    {
      src: "/lovable-uploads/8a7d4e73-fa89-44ab-8814-ecaed5b1d23c.png",
      alt: "House washing before and after",
      title: "House Siding Restoration"
    },
    {
      src: "/lovable-uploads/4b31a7a4-ec16-4996-a49e-ee4b41fe0713.png",
      alt: "Deck pressure washing",
      title: "Deck Cleaning"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Recent Pressure Washing Projects</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          See the dramatic before and after results we've achieved for homeowners throughout Surrey and White Rock.
        </p>

        <Carousel setApi={setApi} className="max-w-3xl mx-auto">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-2">
                  <div className="overflow-hidden rounded-lg">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-auto object-cover" 
                    />
                    <div className="p-4 bg-white">
                      <h3 className="font-bold text-lg">{image.title}</h3>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>

        <div className="text-center mt-8">
          <Button asChild variant="bc-red">
            <Link to="/calculator">
              Request Your Free Quote <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
