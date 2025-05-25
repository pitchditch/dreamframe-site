
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Check, MoveRight } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "../ui/carousel";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import SmartScheduler from '../SmartScheduler';

const slides = [
  {
    image: "/lovable-uploads/a237ac38-d3a7-42b4-853b-65512e02a031.png",
    title: "",
    description: ""
  },
  {
    image: "/lovable-uploads/8bfa7c48-74fb-490c-89e1-e15d87fdcc6d.png",
    title: "",
    description: ""
  },
  {
    image: "/lovable-uploads/fa16ee2d-1381-4719-80d7-0bec536ba4d8.png",
    title: "",
    description: ""
  }
];

const ScreenCleaningSection: React.FC = () => {
  const [api, setApi] = useState<any>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!api) return;
    
    // Setup autoplay
    const autoplay = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3000);

    return () => clearInterval(autoplay);
  }, [api]);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startCount = 0;
          const interval = setInterval(() => {
            startCount += 1;
            if (startCount <= 500) {
              setCount(startCount);
            } else {
              clearInterval(interval);
            }
          }, 5);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  return (
    <>
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Residential Window Cleaning</h2>
                
                <div className="mb-8 relative">
                  <div 
                    ref={counterRef}
                    className="text-6xl md:text-8xl font-bold text-bc-red mb-4 flex items-center"
                  >
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.2,
                        ease: [0, 0.71, 0.2, 1.01]
                      }}
                    >
                      {count}
                    </motion.span>
                    <motion.span 
                      className="text-3xl md:text-4xl ml-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    >
                      +
                    </motion.span>
                    <motion.div
                      className="absolute -top-6 -right-6 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold rotate-12"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 1.2
                      }}
                    >
                      Satisfied Clients
                    </motion.div>
                  </div>
                  
                  <p className="text-gray-700 mb-6 text-lg">
                    Experience premium residential window cleaning services that leave your windows
                    sparkling and streak-free. Our professional team uses advanced techniques 
                    and high-quality products for exceptional results.
                  </p>
                </div>
                
                <Card className="mb-8 border-l-4 border-l-bc-red">
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {[
                        "Thorough screen removal and cleaning",
                        "Pressure washing for tough debris",
                        "Frame cleaning and restoration",
                        "Streak-free window finishes",
                        "Reinstallation with perfect alignment"
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-bc-red mt-1 mr-2 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Link to="/calculator">
                  <Button 
                    variant="bc-red"
                    size="lg"
                    className="text-white group"
                  >
                    Check Prices & Availability
                    <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
              
              <div className="relative">
                <Carousel
                  opts={{
                    loop: true,
                    align: "center",
                  }}
                  className="w-full"
                  setApi={setApi}
                >
                  <CarouselContent>
                    {slides.map((slide, index) => (
                      <CarouselItem key={index}>
                        <motion.div 
                          className="relative"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <img 
                            src={slide.image} 
                            alt="Window cleaning service" 
                            className="rounded-lg shadow-xl w-full h-[400px] object-cover"
                          />
                        </motion.div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 bg-white/80" />
                  <CarouselNext className="right-2 bg-white/80" />
                </Carousel>
                
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                  <p className="text-bc-red font-semibold text-lg mb-1">Complete Package</p>
                  <p className="text-gray-700">Windows + Screens = Perfect Finish</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Smart Scheduler Section */}
      <SmartScheduler />
    </>
  );
};

export default ScreenCleaningSection;
