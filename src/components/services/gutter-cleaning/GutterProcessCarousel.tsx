
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const GutterProcessCarousel = () => {
  const processSteps = [
    {
      step: 1,
      title: "Initial Assessment",
      description: "We thoroughly inspect your gutters to identify clogs, damage, and potential issues before beginning the cleaning process.",
      image: "/lovable-uploads/d4b8bd58-58f9-4c12-a772-ba4f86bdc3ac.png",
      bgColor: "bg-blue-50"
    },
    {
      step: 2,
      title: "Professional Cleaning",
      description: "Using specialized tools and techniques, we remove all debris, leaves, and buildup from your gutters and downspouts.",
      image: "/lovable-uploads/d4b8bd58-58f9-4c12-a772-ba4f86bdc3ac.png",
      bgColor: "bg-green-50"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Professional Gutter Cleaning Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We follow a systematic approach to ensure your gutters are thoroughly cleaned and functioning properly.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {processSteps.map((step) => (
                <CarouselItem key={step.step} className="md:basis-1/2 lg:basis-1/2">
                  <Card className={`h-full ${step.bgColor} border-0 shadow-lg`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 bg-bc-red text-white rounded-full flex items-center justify-center font-bold mr-3">
                            {step.step}
                          </div>
                          <h3 className="text-xl font-bold">{step.title}</h3>
                        </div>
                        
                        <div className="relative mb-4 rounded-lg overflow-hidden">
                          <img 
                            src={step.image} 
                            alt={step.title}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                        
                        <p className="text-gray-700 flex-grow">{step.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default GutterProcessCarousel;
