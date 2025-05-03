import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useTranslation } from '@/hooks/use-translation';
const ImageCarousel = () => {
  const {
    t
  } = useTranslation();
  const [api, setApi] = useState<any>(null);
  useEffect(() => {
    if (!api) return;

    // Start autoplay with 3 second delay
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [api]);
  return;
};
export default ImageCarousel;