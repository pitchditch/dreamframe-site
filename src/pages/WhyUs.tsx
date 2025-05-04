
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Shield, Star, Clock, Award, Heart, HandHeart, Scale, Leaf, DollarSign, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ReferralButton from '@/components/ReferralButton';
import { Link } from 'react-router-dom';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import CompanyHistory from '@/components/CompanyHistory';

const WhyUs = () => {
  return (
    <Layout title="Why Choose BC Pressure Washing | White Rock & Surrey's Top-Rated Exterior Cleaning" description="Discover why BC Pressure Washing is the most trusted exterior cleaning service in White Rock, Surrey and the Lower Mainland. Locally owned, fully insured, and quality guaranteed.">
      <Helmet>
        <title>Why Choose BC Pressure Washing | White Rock & Surrey's Top-Rated Exterior Cleaning</title>
        <meta name="description" content="Discover why BC Pressure Washing is the most trusted exterior cleaning service in White Rock, Surrey and the Lower Mainland. Locally owned, fully insured, and quality guaranteed." />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <img 
          src="/lovable-uploads/03642137-2e8b-4e37-a4e2-39bb157cbe53.png"
          alt="BC Pressure Washing Service Vehicle" 
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Why Choose BC Pressure Washing</h1>
            <p className="text-xl text-white mb-8">Experience the difference of working with White Rock & Surrey's most trusted exterior cleaning company.</p>
            <Button asChild variant="bc-red" size="lg" className="text-lg font-medium px-8 py-6">
              <Link to="/calculator">Get Your Free Quote</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* What Sets Us Apart */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What Sets Us Apart</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">We're not just another pressure washing company. Here's why homeowners and businesses throughout the Lower Mainland choose us.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="text-blue-600 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Fully Insured & Licensed</h3>
              <p className="text-gray-700">We carry comprehensive liability insurance and WCB coverage for your complete protection and peace of mind.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                <Star className="text-yellow-600 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">5-Star Rated Service</h3>
              <p className="text-gray-700">We maintain an exceptional reputation with hundreds of 5-star reviews from satisfied customers throughout Surrey and White Rock.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Heart className="text-green-600 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Locally Owned & Operated</h3>
              <p className="text-gray-700">We're your neighbors, not a franchise. We understand local conditions and take personal pride in our work.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <HandHeart className="text-red-600 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">100% Satisfaction Guarantee</h3>
              <p className="text-gray-700">If you're not completely satisfied with our work, we'll come back and make it right at no additional cost to you.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <Award className="text-purple-600 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Professional Equipment</h3>
              <p className="text-gray-700">We invest in commercial-grade equipment and cleaning solutions to deliver superior results every time.</p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
                <Clock className="text-indigo-600 h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Prompt & Reliable</h3>
              <p className="text-gray-700">We respect your time with prompt arrivals, efficient service, and clear communication throughout the process.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Our Core Values</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">The principles that guide everything we do at BC Pressure Washing.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <Scale className="mr-2 text-bc-red" /> Integrity
              </h3>
              <p className="text-gray-700">We believe in honest pricing, transparent communication, and doing what we say we'll do, every time.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <Award className="mr-2 text-bc-red" /> Excellence
              </h3>
              <p className="text-gray-700">We're committed to delivering exceptional results that exceed your expectations on every project.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <Leaf className="mr-2 text-bc-red" /> Sustainability
              </h3>
              <p className="text-gray-700">We use eco-friendly cleaning solutions and water-saving techniques that are safe for your family and the environment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Equipment Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Professional Equipment</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">We invest in the best equipment to ensure superior results on every project.</p>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/lovable-uploads/5f513861-3c9c-4e8c-a0f1-254574396881.png" 
                alt="Professional pressure washing equipment" 
                className="rounded-lg shadow-md w-full"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Commercial-Grade Tools</h3>
              <p className="text-gray-700 mb-6">Our professional equipment allows us to tackle any exterior cleaning job with precision and efficiency. We regularly maintain and upgrade our tools to ensure we deliver the best possible results.</p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-bc-red rounded-full p-2 flex-shrink-0">
                    <Wrench className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">High-Powered Pressure Washers</h4>
                    <p className="text-gray-600">Industrial-grade equipment with adjustable pressure settings for different surfaces.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-bc-red rounded-full p-2 flex-shrink-0">
                    <Wrench className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Pure Water Systems</h4>
                    <p className="text-gray-600">Advanced filtration technology for spotless, streak-free window cleaning.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 bg-bc-red rounded-full p-2 flex-shrink-0">
                    <Wrench className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Specialized Surface Cleaners</h4>
                    <p className="text-gray-600">Custom tools designed for different materials and cleaning challenges.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <CompanyHistory />

      {/* Service Area Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Areas We Service</h2>
          <ServiceAreaMap />
        </div>
      </section>
      
      {/* Why We're Different */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why We're Different</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-2xl font-bold mb-4">Not a Franchise, Better Value</h3>
              <p className="text-lg mb-4">Unlike big franchise operations like Men In Kilts or Shackshine, we don't have corporate overhead or franchise fees to pay. That means better pricing for our customers without sacrificing quality.</p>
              <p className="text-lg mb-6">When you work with BC Pressure Washing, you're working directly with the business owner who has a personal stake in your satisfaction.</p>
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="text-bc-red h-5 w-5" />
                <span>Lower prices than franchise companies</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="text-bc-red h-5 w-5" />
                <span>No hidden fees or surprise charges</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="text-bc-red h-5 w-5" />
                <span>Superior value for your investment</span>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-bc-red mb-1">30%</div>
                  <p className="text-sm">Average savings compared to franchise companies</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-bc-red mb-1">100%</div>
                  <p className="text-sm">Satisfaction guarantee on all services</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-bc-red mb-1">14+</div>
                  <p className="text-sm">Years of industry experience</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-bc-red mb-1">1,000+</div>
                  <p className="text-sm">Happy customers in White Rock & Surrey</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button asChild variant="bc-red" size="lg" className="text-lg px-8 py-6">
              <Link to="/calculator">Get Your Free Quote Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience the BC Pressure Washing Difference</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Join hundreds of satisfied customers who trust us with their exterior cleaning needs.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="bc-red" size="lg" className="text-lg px-8 py-6">
              <Link to="/calculator">Get a Free Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <a href="tel:7788087620">Call Us: 778-808-7620</a>
            </Button>
          </div>
        </div>
      </section>

      <ReferralButton />
    </Layout>
  );
};

export default WhyUs;
