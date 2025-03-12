
import { useState } from 'react';
import Layout from '@/components/Layout';
import TestimonialCard from '@/components/TestimonialCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropletIcon, Home, Landmark, Wind } from 'lucide-react';

// Define the testimonial data structure
interface Testimonial {
  id: number;
  service: 'gutter-cleaning' | 'window-cleaning' | 'pressure-washing' | 'roof-cleaning';
  rating: number;
  quote: string;
  name: string;
  location: string;
}

const Testimonials = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Testimonial data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      service: 'gutter-cleaning',
      rating: 5,
      quote: "I was really impressed with this service! They came out and cleaned my gutters so quickly. We've had some heavy rain, and everything is draining properly now. Super professional and thorough. I'll definitely use them again next season!",
      name: "James Wilson",
      location: "Langley, BC"
    },
    {
      id: 2,
      service: 'window-cleaning',
      rating: 5,
      quote: "Hands down, the best window cleaning service I've had. My windows are so clear, and the entire house feels brighter. The team was punctual, friendly, and did an excellent job. Will absolutely book again!",
      name: "Sarah Thompson",
      location: "Surrey, BC"
    },
    {
      id: 3,
      service: 'pressure-washing',
      rating: 5,
      quote: "My driveway looks brand new! The team did a fantastic job pressure washing my driveway and patio. They took their time, didn't rush, and made sure everything looked perfect. Highly recommend them for any pressure washing needs!",
      name: "Michael Roberts",
      location: "Abbotsford, BC"
    },
    {
      id: 4,
      service: 'roof-cleaning',
      rating: 5,
      quote: "I didn't realize how dirty my roof had gotten until these guys came out! They were quick, careful, and did a great job removing moss and debris. My roof looks so much better now. I'm really happy with the results.",
      name: "Emily Johnson",
      location: "White Rock, BC"
    },
    {
      id: 5,
      service: 'gutter-cleaning',
      rating: 5,
      quote: "Had my gutters cleaned today, and I couldn't be happier with the service. They showed up on time, cleaned everything thoroughly, and even pointed out some things I should keep an eye on. Very professional!",
      name: "David Miller",
      location: "Coquitlam, BC"
    },
    {
      id: 6,
      service: 'window-cleaning',
      rating: 5,
      quote: "I'm so happy with how my windows turned out! They were a little streaky before, but now they're spotless. The crew was really friendly, and they took care not to make a mess inside. Will definitely call again!",
      name: "Jennifer Davis",
      location: "Burnaby, BC"
    },
    {
      id: 7,
      service: 'pressure-washing',
      rating: 5,
      quote: "I thought my deck was beyond saving, but these guys proved me wrong. After pressure washing, it looks amazing—like new! They worked quickly, but didn't rush, and made sure to get every corner. So glad I found them!",
      name: "Robert Anderson",
      location: "North Vancouver, BC"
    },
    {
      id: 8,
      service: 'roof-cleaning',
      rating: 5,
      quote: "I was worried about the condition of my roof, and they came through! The team cleaned it up, removed moss, and left it looking like new. They were professional, polite, and got the job done right.",
      name: "Lisa Martinez",
      location: "Richmond, BC"
    },
    {
      id: 9,
      service: 'gutter-cleaning',
      rating: 5,
      quote: "Great service! My gutters were overflowing, and these guys came in and cleaned them out quickly. They also took care of the mess and left everything spotless. Highly recommend!",
      name: "Thomas Clark",
      location: "Delta, BC"
    },
    {
      id: 10,
      service: 'window-cleaning',
      rating: 5,
      quote: "Wow, what a difference! My windows have never been this clean. They showed up on time, were super polite, and the job was done right. My whole house looks brighter. I'll definitely hire them again.",
      name: "Amanda White",
      location: "Maple Ridge, BC"
    },
    {
      id: 11,
      service: 'pressure-washing',
      rating: 5,
      quote: "These guys pressure washed my house, and it looks amazing! The exterior was covered in dirt and mold, and now it's sparkling clean. They were on time, respectful, and got the job done quickly. So happy with the results.",
      name: "Daniel Lewis",
      location: "Port Coquitlam, BC"
    },
    {
      id: 12,
      service: 'roof-cleaning',
      rating: 5,
      quote: "I had a lot of moss buildup on my roof, and these professionals came out and cleaned it all off. They were careful with the process and made sure everything was spotless. My roof looks so much better now!",
      name: "Karen Walker",
      location: "New Westminster, BC"
    },
    {
      id: 13,
      service: 'gutter-cleaning',
      rating: 5,
      quote: "I'm so relieved to have my gutters cleaned before the rain hits! The team showed up right on time, cleaned everything efficiently, and didn't leave a mess. Very happy with the service!",
      name: "Jason Brown",
      location: "Langley, BC"
    },
    {
      id: 14,
      service: 'window-cleaning',
      rating: 5,
      quote: "I've had a few window cleaning services before, but none were as thorough as this one. They really took their time and cleaned every corner. I can see out of my windows perfectly now, and my house looks amazing!",
      name: "Stephanie Scott",
      location: "Surrey, BC"
    },
    {
      id: 15,
      service: 'pressure-washing',
      rating: 5,
      quote: "I'm beyond impressed with the pressure washing on my driveway and sidewalks. It was covered in dirt and stains, but now it looks brand new. The team was super friendly, and the results were definitely worth it.",
      name: "Eric Turner",
      location: "Abbotsford, BC"
    },
    {
      id: 16,
      service: 'roof-cleaning',
      rating: 5,
      quote: "I had no idea my roof was in such bad shape until these guys cleaned it! They did an excellent job removing moss and debris. My roof looks so much better, and I feel much more confident about it now.",
      name: "Michelle Taylor",
      location: "White Rock, BC"
    },
    {
      id: 17,
      service: 'gutter-cleaning',
      rating: 5,
      quote: "These guys were awesome. I called them when I noticed my gutters were clogged, and they came out right away. They did a great job cleaning everything and even gave me tips on keeping them clear. Will definitely use them again!",
      name: "Peter Harris",
      location: "Coquitlam, BC"
    },
    {
      id: 18,
      service: 'window-cleaning',
      rating: 5,
      quote: "My windows look incredible! They were very dirty and streaky before, but now they're spotless. The team was quick, polite, and made sure to take care around my furniture. I highly recommend this service!",
      name: "Olivia Robinson",
      location: "Burnaby, BC"
    },
    {
      id: 19,
      service: 'pressure-washing',
      rating: 5,
      quote: "I had my fence and patio pressure washed, and the difference is night and day. They removed years of dirt and stains in no time. The crew was polite and efficient. I'll be calling them again for future cleanings.",
      name: "Christopher Lee",
      location: "North Vancouver, BC"
    },
    {
      id: 20,
      service: 'roof-cleaning',
      rating: 5,
      quote: "My roof looks so much better now after they cleaned it! They took their time, worked carefully, and made sure everything was perfect. Super happy with the results and will definitely hire them again.",
      name: "Jessica Martin",
      location: "Richmond, BC"
    },
  ];

  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(testimonial => testimonial.service === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-black text-white mb-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('/images/testimonials-hero.jpg')` }}
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
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section mb-16">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience Our Quality Service?</h2>
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
    </Layout>
  );
};

export default Testimonials;
