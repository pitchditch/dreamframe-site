
import React from 'react';
import Layout from '@/components/Layout';
import ServiceAreaHero from '@/components/ServiceAreaHero';
import LocalTestimonials from '@/components/LocalTestimonials';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import TrustBadges from '@/components/TrustBadges';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Check } from 'lucide-react';
import FAQSection from '@/components/FAQSection';

const Surrey = () => {
  const { t } = useTranslation();
  
  const localTestimonials = [
    {
      name: "Robert Chen",
      location: "Fleetwood, Surrey",
      quote: "BC Pressure Washing did an amazing job on our driveway and house siding. They were prompt, professional, and the results were better than expected. Our home looks new again!",
      rating: 5,
      service: "Pressure Washing",
      profileImage: "/lovable-uploads/37b96fc3-a1ad-49b9-b3df-85633bef1d67.png"
    },
    {
      name: "Sarah Johnson",
      location: "Guildford, Surrey",
      quote: "We've tried other window cleaners in Surrey before, but none compare to BC Pressure Washing. Their attention to detail and friendly service keep us coming back every season.",
      rating: 5,
      service: "Window Cleaning",
      profileImage: "/lovable-uploads/74fff6dd-0d95-4d31-bb6a-606b14280b3a.png"
    },
    {
      name: "James Wilson",
      location: "South Surrey",
      quote: "After years of neglect, our roof was in pretty bad shape. BC Pressure Washing removed all the moss and algae, making our roof look almost brand new. Great value for the price!",
      rating: 5,
      service: "Roof Cleaning",
      profileImage: "/lovable-uploads/09e0bf79-aa0b-43bd-be2b-3a2b44bf5bc9.png"
    }
  ];
  
  const faqItems = [
    {
      question: "How often should I have my windows cleaned in Surrey?",
      answer: "For homes in Surrey, we recommend professional window cleaning 2-3 times per year. However, homes near construction sites or heavily treed areas may benefit from more frequent cleanings due to increased dirt and pollen."
    },
    {
      question: "Is pressure washing safe for all surfaces of my Surrey home?",
      answer: "Not all surfaces should be pressure washed at the same intensity. Our team is trained to adjust pressure levels for different surfaces, using soft washing techniques for delicate areas and full pressure for tough concrete surfaces."
    },
    {
      question: "Do you serve all neighborhoods in Surrey?",
      answer: "Yes, we provide our services to all areas of Surrey, including Fleetwood, Guildford, South Surrey, Newton, Whalley, Cloverdale, and surrounding neighborhoods."
    },
    {
      question: "How long will it take to clean my Surrey home?",
      answer: "Service time varies depending on the size of your property and services requested. Most residential jobs in Surrey are completed in a few hours. For larger properties or multiple services, we may schedule a full day."
    }
  ];
  
  return (
    <Layout
      title="Pressure Washing & Window Cleaning in Surrey, BC | BC Pressure Washing"
      description="Professional pressure washing, window cleaning, gutter cleaning and roof cleaning services in Surrey, BC. Locally owned and operated with 5-star reviews."
      canonicalUrl="/locations/surrey"
    >
      <ServiceAreaHero
        city="Surrey, BC"
        image="/lovable-uploads/ca94e1e6-7640-44e9-bc41-2389ccf948c1.png"
        subtitle="Surrey's top-rated exterior cleaning specialists for homes and businesses."
      />
      
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              {t("Surrey's Premier Exterior Cleaning Service")}
            </h2>
            
            <p className="text-lg mb-6">
              {t("From the tree-lined streets of Fleetwood to the upscale homes of South Surrey, BC Pressure Washing delivers exceptional exterior cleaning services tailored to Surrey's unique needs.")}
            </p>
            
            <p className="text-lg mb-6">
              {t("Our Surrey-based team understands the specific challenges local homeowners face, from the heavy rainfall and pine needles of Fraser Heights to the salt exposure in Ocean Park. We've developed specialized techniques to address these local conditions and provide long-lasting results.")}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
              <div>
                <h3 className="text-xl font-semibold mb-4">{t("Services We Provide in Surrey")}</h3>
                
                <ul className="space-y-3">
                  {[
                    "House Pressure Washing",
                    "Window Cleaning",
                    "Roof Moss Removal",
                    "Gutter Cleaning",
                    "Driveway & Concrete Cleaning",
                    "Deck & Patio Restoration",
                    "Commercial Property Maintenance",
                    "Post-Construction Cleanup"
                  ].map((service, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="text-bc-red mr-2 mt-1 flex-shrink-0" size={18} />
                      <span>{t(service)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">{t("Surrey Areas We Serve")}</h3>
                
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Fleetwood",
                    "Guildford",
                    "South Surrey",
                    "Newton",
                    "Whalley",
                    "Cloverdale",
                    "Fraser Heights",
                    "Panorama Ridge",
                    "Ocean Park",
                    "Crescent Beach"
                  ].map((area, idx) => (
                    <div key={idx} className="flex items-center">
                      <MapPin className="text-bc-red mr-1" size={16} />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Button asChild size="lg" className="bg-bc-red hover:bg-bc-red/90">
                <Link to="/contact">{t("Get a Free Surrey Quote")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Before & After Section */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t("See Our Surrey Transformations")}
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider 
              beforeImage="/lovable-uploads/3f865bfb-458a-4ab3-b2d3-a324d755ab27.png" 
              afterImage="/lovable-uploads/6792b6a1-2ada-44bf-8ccd-b2665245e13d.png" 
              altText="House exterior cleaning in Surrey"
            />
            
            <div className="mt-4 text-center text-lg text-gray-600">
              {t("Home in Fleetwood, Surrey - Pressure Washing Service")}
            </div>
          </div>
        </div>
      </div>
      
      {/* Local Testimonials */}
      <LocalTestimonials city="Surrey" testimonials={localTestimonials} />
      
      {/* Why Choose Us for Surrey */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">
              {t("Why Surrey Homeowners Choose BC Pressure Washing")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("Our local expertise and commitment to quality have made us Surrey's trusted choice for exterior cleaning.")}
            </p>
          </div>
          
          <TrustBadges />
          
          <div className="mt-12 max-w-4xl mx-auto bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-xl mb-4">{t("Surrey Service Schedule")}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-2">
                  <Clock className="text-bc-red mr-2" />
                  <h4 className="font-semibold">{t("Service Days")}</h4>
                </div>
                <p className="ml-8 text-gray-600">{t("Monday through Saturday")}</p>
                
                <div className="flex items-center mt-4 mb-2">
                  <Clock className="text-bc-red mr-2" />
                  <h4 className="font-semibold">{t("Hours")}</h4>
                </div>
                <p className="ml-8 text-gray-600">{t("8:00 AM - 6:00 PM")}</p>
              </div>
              
              <div>
                <div className="flex items-center mb-2">
                  <MapPin className="text-bc-red mr-2" />
                  <h4 className="font-semibold">{t("Response Time")}</h4>
                </div>
                <p className="ml-8 text-gray-600">
                  {t("Surrey estimates provided within 24-48 hours")}
                </p>
                
                <div className="flex items-center mt-4 mb-2">
                  <Check className="text-bc-red mr-2" />
                  <h4 className="font-semibold">{t("Same Week Service")}</h4>
                </div>
                <p className="ml-8 text-gray-600">
                  {t("Often available for Surrey residents")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Surrey FAQs */}
      <FAQSection 
        title={`Common Questions from Surrey Homeowners`}
        subtitle={`Find answers to frequently asked questions about our Surrey services`}
        faqs={faqItems}
        darkMode={false}
      />
      
      {/* Call To Action */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {t("Ready to Transform Your Surrey Home?")}
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            {t("Join hundreds of satisfied homeowners across Surrey who trust BC Pressure Washing for all their exterior cleaning needs.")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-bc-red hover:bg-bc-red/90">
              <Link to="/contact">{t("Get Your Free Surrey Quote")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <Link to="/testimonials">{t("Read More Reviews")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Surrey;
