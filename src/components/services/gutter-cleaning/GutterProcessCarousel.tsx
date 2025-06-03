
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const GutterProcessCarousel = () => {
  const processSteps = [
    {
      id: 1,
      title: "Before: Clogged Gutters",
      description: "Gutters filled with leaves, debris, and standing water",
      image: "/lovable-uploads/6d61cdcf-cec8-483a-8f31-2c02ad8a67f0.png",
      alt: "Clogged gutters before professional cleaning in Surrey BC"
    },
    {
      id: 2,
      title: "After: Clean & Clear",
      description: "Spotless gutters with proper water flow restored",
      image: "/lovable-uploads/7ab353eb-4733-4841-a5dd-c656ebd963db.png",
      alt: "Clean gutters after professional cleaning in White Rock BC"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Professional Results</h2>
        
        <div className="max-w-4xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {processSteps.map((step) => (
                <CarouselItem key={step.id}>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img 
                          src={step.image} 
                          alt={step.alt}
                          className="w-full h-96 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                          <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                          <p className="text-gray-200">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default GutterProcessCarousel;
