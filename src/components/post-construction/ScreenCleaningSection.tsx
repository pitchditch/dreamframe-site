
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from '@/components/ui/button';

const ScreenCleaningSection: React.FC = () => {
  const images = [
    "/lovable-uploads/5c38ab2e-3c2b-4fd1-9c94-b4715ce79479.png",
    "/lovable-uploads/50f8b489-144a-4e76-a0d2-b14543e5acf3.png",
    "/lovable-uploads/1c34be5d-1b8e-4e6b-b9c9-aab9c1c6b86a.png",
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-4">Residential Window Cleaning</h2>
            <p className="mb-4 text-gray-700 text-lg">
              We've cleaned over 500+ windows and screens for hundreds of satisfied customers in Surrey, White Rock, and throughout Metro Vancouver.
            </p>
            <ul className="mb-6 space-y-2">
              <li className="flex items-center">
                <span className="mr-2 text-bc-red">✓</span>
                <span>Safe, scratch-free window and screen cleaning</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-bc-red">✓</span>
                <span>Attention to detail on every window</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-bc-red">✓</span>
                <span>Streak-free finish guaranteed</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-bc-red">✓</span>
                <span>Residential and commercial properties</span>
              </li>
            </ul>
            <Link to="/calculator">
              <Button 
                variant="bc-red" 
                size="lg"
                className="text-lg mt-2 transition-transform duration-300 transform hover:scale-105"
              >
                Check Prices & Availability <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
          <div className="order-1 md:order-2">
            <Carousel className="w-full max-w-md mx-auto">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <div className="overflow-hidden rounded-xl">
                        <img 
                          src={image} 
                          alt="Window Cleaning" 
                          className="w-full aspect-[4/3] object-cover rounded-xl"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative static translate-y-0 mr-2" />
                <CarouselNext className="relative static translate-y-0" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScreenCleaningSection;
