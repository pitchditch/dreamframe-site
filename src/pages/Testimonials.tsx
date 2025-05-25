
import { useState } from 'react';
import Layout from '@/components/Layout';
import TestimonialCard from '@/components/TestimonialCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropletIcon, Home, Landmark, Wind } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

const Testimonials = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(testimonial => testimonial.service === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-black text-white mb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('/lovable-uploads/fa3b438e-d980-439e-9d0f-e829e376fcf7.png')` }}
        />
        {/* Licensed & Insured badge, top-right on hero */}
        <img 
          src="/lovable-uploads/a1f01b41-c73a-4644-8580-6399a42951bf.png"
          alt="Licensed & Insured"
          className="absolute top-8 right-8 w-32 h-32 md:w-40 md:h-40 object-contain z-20 drop-shadow-lg"
          style={{ pointerEvents: 'none' }}
        />
        <div className="relative container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">What Our Customers Say</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            Real feedback from our valued clients across the Greater Vancouver area.
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto px-4 py-12 mb-16">
        <div className="mb-12 text-center">
          <h2 className="section-title">Customer Testimonials</h2>
          <p className="section-subtitle">
            Don't just take our word for it. Here's what our customers have to say about our services.
          </p>

          {/* Filter Tabs */}
          <Tabs 
            defaultValue="all"
            className="max-w-3xl mx-auto mt-8"
            onValueChange={setActiveCategory}
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-transparent">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-bc-red data-[state=active]:text-white"
              >
                All Reviews
              </TabsTrigger>
              <TabsTrigger 
                value="gutter-cleaning" 
                className="data-[state=active]:bg-bc-red data-[state=active]:text-white"
              >
                <Wind className="w-4 h-4 mr-2" />
                Gutter Cleaning
              </TabsTrigger>
              <TabsTrigger 
                value="window-cleaning" 
                className="data-[state=active]:bg-bc-red data-[state=active]:text-white"
              >
                <DropletIcon className="w-4 h-4 mr-2" />
                Window Cleaning
              </TabsTrigger>
              <TabsTrigger 
                value="pressure-washing" 
                className="data-[state=active]:bg-bc-red data-[state=active]:text-white"
              >
                <Home className="w-4 h-4 mr-2" />
                Pressure Washing
              </TabsTrigger>
              <TabsTrigger 
                value="roof-cleaning" 
                className="data-[state=active]:bg-bc-red data-[state=active]:text-white"
              >
                <Landmark className="w-4 h-4 mr-2" />
                Roof Cleaning
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.quote}
              name={testimonial.name}
              location={testimonial.location}
              rating={testimonial.rating}
              beforeAfterImage={testimonial.beforeAfterImage}
              profileImage={testimonial.profileImage}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section bg-bc-black mb-16">
        <div 
          className="relative bg-cover bg-center py-16"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/lovable-uploads/1a1f8b2e-bcc7-4d88-ae7c-ed4024c70ae4.png')`,
            backgroundPosition: 'center'
          }}
        >
          <div className="container mx-auto px-4 py-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Experience Our Quality Service?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              Join our satisfied customers and see the difference our professional services can make for your home.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button asChild className="bg-bc-red hover:bg-red-700 text-white px-6 py-6 h-auto text-lg">
                <a href="/contact">Get a Free Quote</a>
              </Button>
              <Button asChild variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 px-6 py-6 h-auto text-lg">
                <a href="/services">Explore Our Services</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Testimonials;
