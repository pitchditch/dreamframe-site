import React from 'react';
import Layout from '../../components/Layout';
import CallToAction from '../../components/CallToAction';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Droplets } from 'lucide-react';
import MoreServicesSection from '../../components/MoreServicesSection';
import CitiesCarousel from '@/components/CitiesCarousel';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
const WindowCleaning = () => {
  const faqs = [{
    question: "How often should I have my windows professionally cleaned?",
    answer: "We recommend professional window cleaning twice a year for most homes. However, properties in areas with high pollen, near construction, or close to the ocean may benefit from quarterly cleaning to maintain optimal clarity and prevent mineral buildup."
  }, {
    question: "What is the water-fed pole system?",
    answer: "Our water-fed pole system uses purified water to clean windows up to five stories high without chemicals. The purified water naturally attracts dirt and dries spot-free, leaving your windows crystal clear without streaks or residue."
  }, {
    question: "Do you clean the screens and tracks too?",
    answer: "Yes! Our comprehensive window cleaning service includes cleaning the glass, frames, sills, screens, and tracks. We ensure every component is thoroughly cleaned for a complete window cleaning experience."
  }, {
    question: "Will your cleaning solutions harm my plants or lawn?",
    answer: "No, we use environmentally friendly, biodegradable cleaning solutions that are safe for your landscaping, pets, and family while still delivering exceptional results."
  }, {
    question: "How long does window cleaning take?",
    answer: "The time required depends on the number and size of windows, their condition, and accessibility. A typical residential service takes between 2-4 hours. We'll provide a more accurate timeframe when scheduling your appointment."
  }];
  return <Layout title="Professional Window Cleaning in Surrey & White Rock" description="Expert window cleaning services for crystal clear, streak-free windows. Using pure water technology and professional equipment for stunning results.">
      {/* Hero Section */}
      <div className="relative w-full h-screen">
        <img src="/lovable-uploads/3c677903-190c-483b-8e1d-b3e33c7231f9.png" alt="Professional Window Cleaning in Surrey & White Rock" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-end justify-center pb-20">
          <div className="text-center max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow">Professional Window Cleaning</h1>
            <p className="text-lg md:text-xl text-white text-shadow-sm mb-8">Crystal clear, streak-free windows using our advanced pure water technology</p>
            <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold">
              <Link to="/calculator">Check Prices & Availability</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                <Droplets size={16} className="mr-1" /> Pure Water Technology
              </div>
              <h2 className="text-3xl font-bold mb-6">Streak-Free Window Cleaning</h2>
              <p className="text-gray-600 mb-6">
                Dirty windows can drastically reduce the amount of natural light entering your home or business, and diminish your view of the outside world. Our professional window cleaning service restores clarity and brilliance to your windows, enhancing the appearance and value of your property.
              </p>
              <p className="text-gray-600 mb-6">
                Using our advanced pure water technology and professional-grade equipment, we deliver exceptional results that last longer than traditional cleaning methods. Our process removes all dirt, dust, pollen, water spots, and other contaminants to leave your windows perfectly clean.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1" size={20} />
                  <span>Crystal clear, streak-free results</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1" size={20} />
                  <span>Interior and exterior window cleaning</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1" size={20} />
                  <span>Screen, track, and frame cleaning</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1" size={20} />
                  <span>Window sill and ledge detailing</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-bc-red mr-2 mt-1" size={20} />
                  <span>Hard water stain removal options</span>
                </li>
              </ul>
            </div>
            <div>
              <img alt="Window cleaning with pure water technology" className="rounded-lg shadow-xl w-full" src="/lovable-uploads/ac4de5e1-110f-43da-9a26-3454d0529608.jpg" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Window Cleaning Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a comprehensive approach to ensure your windows are perfectly clean, from assessment to final inspection.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <span className="font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Assessment</h3>
                <p className="text-gray-600">
                  We carefully assess your windows to identify any special needs or challenges, and determine the best cleaning approach.
                </p>
              </CardContent>
            </Card>
            
            <Card className="transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <span className="font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Pure Water Cleaning</h3>
                <p className="text-gray-600">
                  Using our water-fed pole system, we clean external windows with purified water that leaves no streaks or residue behind.
                </p>
              </CardContent>
            </Card>
            
            <Card className="transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <span className="font-bold text-lg">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Detailed Finishing</h3>
                <p className="text-gray-600">
                  We clean all frames, sills, and tracks, and perform a final inspection to ensure perfect clarity from every angle.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <FAQSection title="Frequently Asked Questions" subtitle="Get answers to common questions about our window cleaning services" faqs={faqs} />
      
      <MoreServicesSection />
      
      <CitiesCarousel />
      
      <div className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d167326.78631723323!2d-122.96968737170609!3d49.10482983753625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485d910ff12a495%3A0x50135152a7b0560!2sSurrey%2C%20BC!5e0!3m2!1sen!2sca!4v1657051523264!5m2!1sen!2sca" width="800" height="400" style={{
            border: 0
          }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Service Area Map" className="rounded-lg shadow-lg"></iframe>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <CallToAction title="Ready for Crystal Clear Windows?" subtitle="Contact us today for a free quote on professional window cleaning for your home or business." />
    </Layout>;
};
export default WindowCleaning;