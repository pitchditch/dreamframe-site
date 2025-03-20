
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import ServiceBenefits from '../../components/ServiceBenefits';
import ServiceProcess from '../../components/ServiceProcess';
import CallToAction from '../../components/CallToAction';
import { Link } from 'react-router-dom';
import { DropletIcon, Shield, Clock, ThumbsUp, Search, Droplets, Sparkles, ArrowRight, Navigation } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useEffect, useState } from 'react';

const PressureWashing = () => {
  const benefits = [
    {
      title: "Restore Original Beauty",
      description: "Remove years of built-up dirt, grime, algae, and mildew to reveal the original beauty of your home's exterior surfaces."
    },
    {
      title: "Prevent Costly Damage",
      description: "Regular cleaning prevents organic growth and contaminants from deteriorating your siding, brick, or other exterior materials."
    },
    {
      title: "Healthier Home Environment",
      description: "Eliminate mold, mildew, and allergens from exterior surfaces that can affect indoor air quality and trigger allergies."
    },
    {
      title: "Increase Property Value",
      description: "A clean exterior significantly enhances curb appeal and can increase your property's market value by up to 5-10%."
    },
    {
      title: "Prepare for Painting",
      description: "Create the perfect clean surface if you're planning to paint or stain your home's exterior in the near future."
    },
    {
      title: "Safe, Eco-Friendly Process",
      description: "Our soft washing techniques and biodegradable cleaning solutions are safe for your home, family, pets, and landscaping."
    }
  ];

  const processes = [
    {
      title: "Surface Inspection",
      description: "We carefully assess your home's exterior to determine the appropriate cleaning method and identify any areas needing special attention.",
      icon: <Search size={32} />
    },
    {
      title: "Soft Washing Application",
      description: "Using specialized equipment, we apply eco-friendly cleaning solutions that break down organic growth and contaminants.",
      icon: <Droplets size={32} />
    },
    {
      title: "Thorough Rinse",
      description: "We complete the process with a gentle, thorough rinse that removes all cleaning solutions and loosened contaminants.",
      icon: <Sparkles size={32} />
    }
  ];

  // Automatic slideshow for the top carousel
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
    <Layout>
      <ServiceHeader
        title="House Washing"
        description="Safe, effective pressure washing services to restore your home's exterior and protect your investment."
        icon={<DropletIcon size={48} />}
        imagePath="/lovable-uploads/ff4fb258-bc33-4114-83e8-05d0d9f02770.png"
      />

      {/* Swapped sections - Carousel now first */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <Carousel className="w-full" setApi={setApi}>
              <CarouselContent>
                <CarouselItem>
                  <img 
                    src="/lovable-uploads/ff4fb258-bc33-4114-83e8-05d0d9f02770.png" 
                    alt="House washing service" 
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img 
                    src="/lovable-uploads/1ea22860-90d1-4355-b94c-94bfdd2d1657.png" 
                    alt="Driveway pressure washing" 
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </CarouselItem>
                <CarouselItem>
                  <img 
                    src="/lovable-uploads/761663e4-04b5-48f6-8d47-235fbec8008d.png" 
                    alt="Pressure washing service" 
                    className="rounded-lg shadow-lg w-full h-auto"
                  />
                </CarouselItem>
              </CarouselContent>
              <div className="flex justify-center mt-4">
                <CarouselPrevious className="relative static mx-2" />
                <CarouselNext className="relative static mx-2" />
              </div>
            </Carousel>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Revitalize Your Home's Exterior</h2>
            <p className="text-gray-600 mb-6">
              Your home's exterior faces constant exposure to the elements, resulting in the accumulation of dirt, grime, algae, mold, and other contaminants over time. These not only detract from your home's appearance but can cause long-term damage to various exterior surfaces.
            </p>
            <p className="text-gray-600 mb-6">
              Our professional house washing service uses the "soft wash" approach – combining low pressure with specialized cleaning solutions to safely and effectively clean all exterior surfaces including vinyl siding, brick, stucco, wood, and more. This method delivers superior results while protecting delicate surfaces from damage.
            </p>
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <Shield className="text-bc-red mr-2" size={24} />
                <span className="font-medium">Fully Insured</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-bc-red mr-2" size={24} />
                <span className="font-medium">Prompt Service</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="text-bc-red mr-2" size={24} />
                <span className="font-medium">100% Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Dramatic Before & After Transformations</h2>
          <p className="section-subtitle">
            See the incredible difference our house washing services make on homes just like yours
          </p>
          
          <div className="mt-12 max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <img 
                        src="/lovable-uploads/ef45fd36-a81d-41a3-8184-d3a91694f5ca.png" 
                        alt="House washing before and after transformation" 
                        className="w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
                
                <CarouselItem>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <img 
                        src="/lovable-uploads/148003bb-352d-4ff8-af0b-2637eabaf9eb.png" 
                        alt="Siding cleaning before and after transformation" 
                        className="w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
                
                <CarouselItem>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <img 
                        src="/lovable-uploads/6485c6c5-3c65-46de-b9f2-c054c708124b.png" 
                        alt="House exterior washing before and after" 
                        className="w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
                
                <CarouselItem>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <img 
                        src="/lovable-uploads/43002110-e9f7-4e22-826e-a90e5dc6687e.png" 
                        alt="Vinyl siding pressure washing before and after" 
                        className="w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
                
                <CarouselItem>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <img 
                        src="/lovable-uploads/55261385-ad80-4322-9551-dbc3392a881c.png" 
                        alt="House siding pressure washing before and after" 
                        className="w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>

                <CarouselItem>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <img 
                        src="/lovable-uploads/0ed0aa87-882b-4618-8a15-18d4ed7e4838.png" 
                        alt="House siding pressure washing before and after transformation" 
                        className="w-full h-auto"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
                
                <CarouselItem>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <img 
                        src="/lovable-uploads/3dd77762-89a1-4273-ae3e-1c6fbc9894aa.png" 
                        alt="House exterior pressure washing before and after clean" 
                        className="w-full h-auto"
                      />
                    </CardContent>
                  </Card>
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
                Get Your Free Quote <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Benefits of Professional House Washing</h2>
          <p className="section-subtitle">
            Regular exterior cleaning provides numerous advantages for your home's appearance and longevity
          </p>
          <ServiceBenefits benefits={benefits} />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="section-title">Our House Washing Process</h2>
        <p className="section-subtitle">
          We follow a comprehensive approach to safely clean and restore your home's exterior
        </p>
        <ServiceProcess processes={processes} />
      </section>
      
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold mb-6 text-center">Driveway Pressure Washing</h2>
        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="md:w-1/2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img 
                  src="/lovable-uploads/fb43637a-3ca5-4495-997e-7cdb8fcaf83f.png" 
                  alt="Driveway pressure washing before and after" 
                  className="w-full h-auto"
                />
              </CardContent>
            </Card>
          </div>
          <div className="md:w-1/2">
            <div className="flex items-center mb-4">
              <Navigation className="text-bc-red mr-3" size={28} />
              <h3 className="text-2xl font-bold">Driveway Restoration</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Over time, driveways accumulate oil stains, tire marks, mold, mildew, and embedded dirt. Our high-pressure cleaning services effectively remove these tough stains, revealing the clean concrete or pavers underneath.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>Removes stubborn oil and grease stains</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>Eliminates slippery moss and algae</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>Prevents concrete deterioration</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">✓</span>
                <span>Optional sealing services available</span>
              </li>
            </ul>
            <Button asChild>
              <Link to="/contact">
                Request Driveway Cleaning <ArrowRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Additional Pressure Washing Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Fence Cleaning</h3>
              <p className="text-gray-600 mb-4">
                Restore wood, vinyl, or composite fencing to like-new condition with our specialized cleaning techniques.
              </p>
              <img 
                src="/lovable-uploads/254da245-ca71-40fe-b92b-267d40458f73.png" 
                alt="Fence cleaning" 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <Button variant="outline" asChild className="w-full">
                <Link to="/contact">
                  Learn More
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Deck & Patio Cleaning</h3>
              <p className="text-gray-600 mb-4">
                Safe and effective cleaning for wooden decks, composite decking, and concrete or stone patios.
              </p>
              <img 
                src="/lovable-uploads/efa781f2-757d-4950-bf2b-3686f7d24cb1.png" 
                alt="Deck cleaning" 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <Button variant="outline" asChild className="w-full">
                <Link to="/contact">
                  Learn More
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-2">Glass Awning Cleaning</h3>
              <p className="text-gray-600 mb-4">
                Professional glass awning and skylight cleaning to remove dirt, water spots, and debris for crystal clear results.
              </p>
              <img 
                src="/lovable-uploads/35c992fa-e658-4504-9244-560758af2df7.png" 
                alt="Glass awning cleaning before and after" 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <Button variant="outline" asChild className="w-full">
                <Link to="/contact">
                  Learn More
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <CallToAction />
    </Layout>
  );
};

export default PressureWashing;
