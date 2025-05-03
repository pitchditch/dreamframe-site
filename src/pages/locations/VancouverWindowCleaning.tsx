
import React from 'react';
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Building, Home, Check, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import CallToAction from '@/components/CallToAction';
import ServiceAreaMap from '@/components/ServiceAreaMap';
import FAQSection from '@/components/FAQSection';
import WindowCleaningForm from '@/components/forms/WindowCleaningForm';

const VancouverWindowCleaning = () => {
  const vancouverFaqs = [
    {
      question: "How much does window cleaning cost in Vancouver?",
      answer: "The cost of window cleaning in Vancouver varies based on building type, number of windows, accessibility, and level of cleaning required. For residential properties, prices typically start at $175, while commercial properties are priced based on a custom quote. Contact us for a detailed estimate for your specific needs."
    },
    {
      question: "Do you clean high-rise buildings in downtown Vancouver?",
      answer: "Yes, we specialize in high-rise window cleaning throughout Vancouver's downtown core. We use professional water-fed pole systems that can reach up to 5 stories, and rope access techniques for taller buildings. Our team is fully trained and insured for high-rise work."
    },
    {
      question: "How often should commercial buildings in Vancouver have their windows cleaned?",
      answer: "For commercial buildings in Vancouver, we recommend quarterly window cleaning to maintain a professional appearance year-round. However, buildings in high-traffic areas or near construction sites may benefit from more frequent cleaning. We offer customized maintenance programs to suit your building's specific needs."
    },
    {
      question: "Do you clean windows for strata buildings throughout Vancouver?",
      answer: "Yes, we provide comprehensive window cleaning services for strata buildings throughout Vancouver and the Lower Mainland. We work with strata councils and property management companies to develop cleaning schedules that meet the needs of residents while staying within budget constraints."
    },
    {
      question: "What methods do you use for cleaning Vancouver skyscraper windows?",
      answer: "For Vancouver skyscrapers, we employ multiple specialized techniques including rope access, suspended platforms, and water-fed pole systems. Our pure water technology ensures streak-free results even on tall buildings, while our professional team follows all safety protocols for high-rise window cleaning."
    }
  ];

  return (
    <Layout 
      title="Professional Window Cleaning in Vancouver – Commercial & Residential" 
      description="Expert window cleaning services in Vancouver. From storefronts to skyscrapers, we deliver crystal clear, streak-free results for commercial and residential properties."
    >
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-screen">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lovable-uploads/3b7f859d-741e-4313-8d41-239c5e9b6ca9.png" 
            alt="Vancouver skyline reflection in clean windows" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl">
            Professional Window Cleaning in Vancouver
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            We serve Vancouver with expert commercial and residential window cleaning. From storefronts to skyscrapers — we've got it covered.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md">
              <Building className="mr-2" size={20} />
              <span>Commercial</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md">
              <Home className="mr-2" size={20} />
              <span>Residential</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md">
              <MapPin className="mr-2" size={20} />
              <span>All Vancouver Areas</span>
            </div>
          </div>
          <Button asChild variant="bc-red" size="lg" className="text-lg w-fit">
            <Link to="/calculator">Get a Quote in Vancouver</Link>
          </Button>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vancouver Window Cleaning Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive window cleaning solutions for all types of properties throughout Vancouver
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6">Commercial Services</h3>
              
              <div className="space-y-6">
                <Card className="border-l-4 border-l-bc-red shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold mb-2">High-Rise Buildings</h4>
                    <p className="text-gray-600 mb-4">
                      Specialized cleaning for Vancouver's tallest skyscrapers and office towers. Our professional team uses advanced equipment and safety protocols to deliver streak-free results on buildings of any height.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" size={18} />
                        <span>Rope access techniques for unlimited height access</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" size={18} />
                        <span>Pure water technology for streak-free results</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" size={18} />
                        <span>Fully insured and WCB covered technicians</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-bc-red shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold mb-2">Low-Rise Storefronts</h4>
                    <p className="text-gray-600 mb-4">
                      Keep your Vancouver storefront windows spotless to attract customers and maintain a professional image. Our regular maintenance plans keep your business looking its best year-round.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" size={18} />
                        <span>Interior and exterior cleaning</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" size={18} />
                        <span>Signage and display window detailing</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" size={18} />
                        <span>Flexible scheduling to avoid business hours</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-bc-red shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold mb-2">Strata Buildings</h4>
                    <p className="text-gray-600 mb-4">
                      Comprehensive window cleaning services for Vancouver strata buildings. We work with property managers to create customized cleaning schedules that meet the needs of all residents.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" size={18} />
                        <span>Custom maintenance programs</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" size={18} />
                        <span>Scheduling that minimizes disruption</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" size={18} />
                        <span>Competitive rates for ongoing contracts</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Residential Services</h3>
              
              <div className="mb-8">
                <Card className="border-l-4 border-l-bc-red shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-semibold mb-2">Home Window Cleaning</h4>
                    <p className="text-gray-600 mb-4">
                      Transform your Vancouver home with our detailed residential window cleaning. We clean your windows inside and out, leaving them crystal clear and streak-free.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" size={18} />
                        <span>Interior and exterior cleaning</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" size={18} />
                        <span>Screen and track cleaning</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" size={18} />
                        <span>Skylights and hard-to-reach windows</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <img 
                src="/lovable-uploads/d5e09b82-8bfc-4af1-b49f-2ddea1c35ca4.png" 
                alt="Water-fed pole window cleaning system in Vancouver" 
                className="w-full rounded-lg shadow-lg mb-6"
              />
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold mb-2">Water-Fed Pole System</h4>
                <p className="mb-4">Our advanced water-fed pole system allows us to clean windows up to 5 stories without ladders!</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="text-bc-red mr-2 mt-1" size={18} />
                    <span>No ladders necessary!</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-bc-red mr-2 mt-1" size={18} />
                    <span>No water spots or streaks!</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-bc-red mr-2 mt-1" size={18} />
                    <span>Eco-friendly pure water technology</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Before & After Gallery</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-10">
            See the dramatic difference our professional window cleaning makes
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* You can add before/after images here - using placeholder for now */}
            <Card className="overflow-hidden">
              <div className="h-64 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Before/After Image 1
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">Downtown Office Building</h3>
                <p className="text-sm text-gray-600">Quarterly maintenance cleaning</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="h-64 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Before/After Image 2
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">Yaletown Condo Complex</h3>
                <p className="text-sm text-gray-600">Strata building exterior cleaning</p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <div className="h-64 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Before/After Image 3
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">West End Storefront</h3>
                <p className="text-sm text-gray-600">Monthly maintenance program</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="border-bc-red text-bc-red hover:bg-bc-red hover:text-white">
              <Link to="/services/window-cleaning">View More Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Areas We Serve in Vancouver</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-10">
            We provide window cleaning services throughout Vancouver and surrounding areas
          </p>
          
          <ServiceAreaMap />
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center text-sm">
            <div className="p-2 bg-gray-50 rounded">Downtown</div>
            <div className="p-2 bg-gray-50 rounded">Kitsilano</div>
            <div className="p-2 bg-gray-50 rounded">Yaletown</div>
            <div className="p-2 bg-gray-50 rounded">Gastown</div>
            <div className="p-2 bg-gray-50 rounded">West End</div>
            <div className="p-2 bg-gray-50 rounded">Coal Harbour</div>
            <div className="p-2 bg-gray-50 rounded">Mount Pleasant</div>
            <div className="p-2 bg-gray-50 rounded">Fairview</div>
            <div className="p-2 bg-gray-50 rounded">Point Grey</div>
            <div className="p-2 bg-gray-50 rounded">Kerrisdale</div>
            <div className="p-2 bg-gray-50 rounded">East Vancouver</div>
            <div className="p-2 bg-gray-50 rounded">Dunbar</div>
            <div className="p-2 bg-gray-50 rounded">UBC</div>
            <div className="p-2 bg-gray-50 rounded">Shaughnessy</div>
            <div className="p-2 bg-gray-50 rounded">False Creek</div>
          </div>
        </div>
      </section>

      {/* Split Section with Form */}
      <section className="py-16 bg-gray-50" id="quote">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get a Window Cleaning Quote in Vancouver</h2>
              <p className="text-gray-600 mb-8">
                Whether you need commercial high-rise window cleaning or residential service, we provide customized solutions and competitive pricing for all Vancouver properties.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="bg-bc-red/10 p-2 rounded-full mr-4">
                    <Check className="text-bc-red" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Commercial Specialists</h4>
                    <p className="text-gray-600">From small storefronts to downtown skyscrapers</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-bc-red/10 p-2 rounded-full mr-4">
                    <Check className="text-bc-red" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Fully Insured & WCB Covered</h4>
                    <p className="text-gray-600">Your property is protected with our comprehensive coverage</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-bc-red/10 p-2 rounded-full mr-4">
                    <Check className="text-bc-red" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Maintenance Programs</h4>
                    <p className="text-gray-600">Regular cleaning schedules at discounted rates</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-3">Have a larger project?</h3>
                <p className="mb-4">Call us directly for custom quotes on commercial buildings, strata complexes, or special requirements.</p>
                <Button asChild variant="bc-red" size="lg" className="w-full">
                  <a href="tel:7788087620">Call (778) 808-7620</a>
                </Button>
              </div>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Request a Quote</h3>
                  <WindowCleaningForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        title="Vancouver Window Cleaning FAQs" 
        subtitle="Common questions about our window cleaning services in Vancouver" 
        faqs={vancouverFaqs} 
      />

      {/* Call to Action */}
      <CallToAction 
        title="Ready for Crystal Clear Windows in Vancouver?" 
        subtitle="Contact us today for a free quote on professional window cleaning for your home or business." 
      />
    </Layout>
  );
};

export default VancouverWindowCleaning;
