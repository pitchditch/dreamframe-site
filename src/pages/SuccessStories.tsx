
import React from 'react';
import Layout from '@/components/Layout';
import ClientSuccessStory, { ClientSuccessStoryProps } from '@/components/ClientSuccessStory';
import { useTranslation } from '@/hooks/use-translation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SuccessStories = () => {
  const { t } = useTranslation();
  
  const successStories: ClientSuccessStoryProps[] = [
    {
      clientName: "James Wilson",
      location: "White Rock, BC",
      service: "House Washing",
      challenge: "Our house had developed significant algae and mildew stains on the north-facing siding, making it look old and uncared for. Previous attempts with store-bought cleaners didn't work.",
      solution: "BC Pressure Washing used their soft washing technique with professional-grade cleaning solutions to safely remove all the algae and mildew without damaging our siding.",
      testimonial: "The results were amazing! Our house looks brand new again. The team was professional, on time, and cleaned up everything when they finished.",
      rating: 5,
      profileImage: "/lovable-uploads/37b96fc3-a1ad-49b9-b3df-85633bef1d67.png",
      beforeAfterImages: [
        "/lovable-uploads/3f865bfb-458a-4ab3-b2d3-a324d755ab27.png",
        "/lovable-uploads/6792b6a1-2ada-44bf-8ccd-b2665245e13d.png"
      ]
    },
    {
      clientName: "Sarah Martinez",
      location: "Surrey, BC",
      service: "Window Cleaning",
      challenge: "We have a lot of large windows with hard water stains that we couldn't remove ourselves. Some were in hard-to-reach places, making DIY cleaning dangerous.",
      solution: "The BC Pressure Washing team used their water-fed pole system to safely reach all our windows and their special solutions removed years of mineral buildup.",
      testimonial: "I can't believe how much brighter our home is now! The windows are crystal clear, and they even cleaned the frames and sills at no extra charge.",
      rating: 5,
      profileImage: "/lovable-uploads/74fff6dd-0d95-4d31-bb6a-606b14280b3a.png",
      beforeAfterImages: [
        "/lovable-uploads/281422a1-6eb1-4353-9f93-de7d6163152e.png",
        "/lovable-uploads/8f51f55c-a8ce-472b-b398-1a35211096d3.png"
      ],
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      clientName: "Michael Chen",
      location: "Langley, BC",
      service: "Roof Cleaning",
      challenge: "Our roof was covered in moss and debris, causing concern about potential leaks and damage. We didn't want to risk walking on the roof ourselves.",
      solution: "BC Pressure Washing safely removed all moss and debris using their specialized equipment and environmentally friendly treatments to prevent regrowth.",
      testimonial: "They saved us from what could have been an expensive roof replacement! The team was knowledgeable, professional, and did a thorough job with no damage to our shingles.",
      rating: 5,
      profileImage: "/lovable-uploads/09e0bf79-aa0b-43bd-be2b-3a2b44bf5bc9.png",
      beforeAfterImages: [
        "/lovable-uploads/ac700f26-0c3f-4bb6-9297-862295529d82.png",
        "/lovable-uploads/3ff52f8f-29e2-421b-983b-b72c1ab34b52.png"
      ]
    },
    {
      clientName: "Jennifer Thompson",
      location: "White Rock, BC",
      service: "Gutter Cleaning",
      challenge: "Our gutters were completely clogged, causing water to overflow and damage our flowerbeds. The previous service we used left a mess all over our property.",
      solution: "BC Pressure Washing thoroughly cleaned our gutters and downspouts, ensuring proper water flow, and they cleaned up all debris from our property afterwards.",
      testimonial: "Finally a service that cleans up after themselves! Our gutters are working perfectly now, and I appreciated how they took before and after photos to show us the results.",
      rating: 5,
      profileImage: "/lovable-uploads/4c1d610e-379a-49cb-9f37-ef1b48a248f4.png",
      beforeAfterImages: [
        "/lovable-uploads/c99d75a8-0821-423a-b3a9-08133341c74f.png",
        "/lovable-uploads/8456f0a6-f534-4cc6-96ec-3c56bec589c2.png"
      ]
    }
  ];
  
  return (
    <Layout
      title="Client Success Stories | BC Pressure Washing"
      description="Real success stories from our satisfied clients across White Rock, Surrey and Metro Vancouver. See how we've transformed properties with our professional pressure washing and cleaning services."
    >
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("Client Success Stories")}</h1>
          <p className="text-xl max-w-3xl mx-auto">
            {t("Real stories from real clients. See how we've helped homeowners across Metro Vancouver solve their toughest exterior cleaning challenges.")}
          </p>
        </div>
      </div>
      
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All Stories</TabsTrigger>
                <TabsTrigger value="house-washing">House Washing</TabsTrigger>
                <TabsTrigger value="window-cleaning">Window Cleaning</TabsTrigger>
                <TabsTrigger value="roof-cleaning">Roof Cleaning</TabsTrigger>
                <TabsTrigger value="gutter-cleaning">Gutter Cleaning</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {successStories.map((story, index) => (
                  <ClientSuccessStory key={index} {...story} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="house-washing" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {successStories
                  .filter(story => story.service === "House Washing")
                  .map((story, index) => (
                    <ClientSuccessStory key={index} {...story} />
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="window-cleaning" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {successStories
                  .filter(story => story.service === "Window Cleaning")
                  .map((story, index) => (
                    <ClientSuccessStory key={index} {...story} />
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="roof-cleaning" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {successStories
                  .filter(story => story.service === "Roof Cleaning")
                  .map((story, index) => (
                    <ClientSuccessStory key={index} {...story} />
                  ))
                }
              </div>
            </TabsContent>
            
            <TabsContent value="gutter-cleaning" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {successStories
                  .filter(story => story.service === "Gutter Cleaning")
                  .map((story, index) => (
                    <ClientSuccessStory key={index} {...story} />
                  ))
                }
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-12">
            <p className="text-xl mb-6">{t("Ready to experience these results for yourself?")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="bc-red">
                <Link to="/contact">{t("Get Your Free Quote")}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/services">{t("Explore Our Services")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessStories;
