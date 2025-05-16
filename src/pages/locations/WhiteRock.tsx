
import Layout from '@/components/Layout';
import ServiceHeader from '@/components/ServiceHeader';
import { MapPin, Phone, Star, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ServiceBenefits from '@/components/ServiceBenefits';
import CallToAction from '@/components/CallToAction';
import { useTranslation } from '@/hooks/use-translation';
import { useEffect } from 'react';

const WhiteRock = () => {
  const { t } = useTranslation();
  
  useEffect(() => {
    // Update page metadata for SEO
    document.title = "White Rock Window Cleaning & Pressure Washing Services | BC Pressure Washing";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional window cleaning and pressure washing services in White Rock, BC. Residential and commercial window cleaning, house washing, roof cleaning and more. Local, trusted White Rock cleaning experts.');
    }
  }, []);

  return (
    <Layout>
      <ServiceHeader
        title="White Rock Window Cleaning Services"
        description="Professional window cleaning and exterior cleaning services for White Rock residents and businesses"
        imagePath="/lovable-uploads/9044bb24-865d-4974-8d4a-8807df54ea8c.png"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge-pill mb-4">Local White Rock Service</div>
              <h2 className="text-3xl font-bold mb-6">White Rock's #1 Window Cleaning Experts</h2>
              <p className="text-gray-600 mb-6">
                At BC Pressure Washing, we're proud to be White Rock's premier window cleaning company, serving our local community with exceptional glass cleaning services for over 10 years. Our deep understanding of White Rock's unique coastal climate conditions allows us to deliver superior streak-free results for your windows.
              </p>
              <p className="text-gray-600 mb-6">
                Whether you're dealing with salt air buildup, water spots from ocean spray, or mineral deposits on your glass - common issues for White Rock properties - our locally-based team has the expertise to restore crystal clear visibility to every window of your home or business.
              </p>
              <div className="flex items-center mb-6">
                <MapPin className="text-bc-red mr-2" />
                <span className="font-medium">Based in White Rock - Serving all of White Rock, South Surrey and surrounding areas</span>
              </div>
              <div className="flex items-center">
                <Phone className="text-bc-red mr-2" />
                <span className="font-medium">Call your local White Rock team today: 778 808 7620</span>
              </div>
            </div>
            <div>
              <img 
                src="/lovable-uploads/76968d4f-c862-4989-a3e3-b74ac31968e2.png" 
                alt="White Rock Window Cleaning Services" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-bc-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="badge-pill mx-auto w-fit mb-4">Popular Services in White Rock</div>
            <h2 className="text-3xl font-bold">Window Cleaning Services for White Rock Properties</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mt-4">
              Our comprehensive window cleaning services are tailored to address the specific needs of White Rock homes and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-bc-red mb-4">
                <Sun size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Residential Window Cleaning</h3>
              <p className="text-gray-600 mb-4">
                White Rock homes with ocean views deserve crystal clear windows. Our streak-free cleaning process removes salt spray, hard water spots, and all buildup to maximize your beautiful views.
              </p>
              <Link to="/services/window-cleaning" className="text-bc-red font-medium flex items-center">
                Learn more <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-bc-red mb-4">
                <Building size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Commercial Window Cleaning</h3>
              <p className="text-gray-600 mb-4">
                For White Rock businesses, clean windows create a professional impression. Our commercial window cleaning services keep storefronts, offices, and multi-story buildings looking their best.
              </p>
              <Link to="/services/commercial-window-cleaning" className="text-bc-red font-medium flex items-center">
                Learn more <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-bc-red mb-4">
                <Droplets size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Interior/Exterior Glass</h3>
              <p className="text-gray-600 mb-4">
                Complete window cleaning services for White Rock properties. We clean both interior and exterior glass, screens, tracks, and frames for a thorough, comprehensive clean.
              </p>
              <Link to="/services/window-cleaning" className="text-bc-red font-medium flex items-center">
                Learn more <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/lovable-uploads/302cbdcc-ad2e-496b-bb73-502eb77f353a.png" 
                alt="White Rock Ocean View Windows" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <div className="badge-pill mb-4">White Rock Window Specialists</div>
              <h2 className="text-3xl font-bold mb-6">Why White Rock Properties Need Professional Window Cleaning</h2>
              <p className="text-gray-600 mb-6">
                White Rock's beautiful coastal location presents unique challenges for window maintenance:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="text-bc-red flex-shrink-0 mr-3 mt-1" size={20} />
                  <div>
                    <span className="font-medium">Salt Air Exposure:</span> Ocean salt creates a film on windows that regular cleaning can't remove, requiring our specialized solutions.
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-bc-red flex-shrink-0 mr-3 mt-1" size={20} />
                  <div>
                    <span className="font-medium">Hard Water Spots:</span> White Rock's mineral-rich water leaves stubborn spots on glass that require professional treatment.
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-bc-red flex-shrink-0 mr-3 mt-1" size={20} />
                  <div>
                    <span className="font-medium">Ocean Views:</span> Many White Rock homes feature premium ocean views that deserve to be enjoyed through perfectly clean windows.
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-bc-red flex-shrink-0 mr-3 mt-1" size={20} />
                  <div>
                    <span className="font-medium">Property Value Protection:</span> Regular professional window cleaning maintains White Rock's property values, which are among the highest in BC.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="py-16 bg-bc-gray">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Benefits of Professional Window Cleaning in White Rock</h2>
          <p className="section-subtitle">
            Professional window cleaning offers numerous advantages for White Rock residents and businesses
          </p>
          <ServiceBenefits benefits={[
            {
              title: "Crystal Clear Views",
              description: "Enjoy White Rock's stunning ocean panoramas through perfectly clean, streak-free windows that maximize visibility."
            },
            {
              title: "Extended Window Lifespan",
              description: "Protect your investment by removing corrosive salt deposits and mineral buildup that can permanently damage glass surfaces."
            },
            {
              title: "Enhanced Curb Appeal",
              description: "Maintain your White Rock property's pristine appearance with spotless windows that reflect your attention to detail."
            },
            {
              title: "Local Expertise",
              description: "Benefit from our specialized knowledge of White Rock's unique coastal challenges and how they affect your windows."
            }
          ]} />
        </div>
      </div>
      
      <section className="py-16 bg-bc-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="badge-pill mx-auto w-fit mb-4">Local Service Areas</div>
            <h2 className="text-3xl font-bold">White Rock Neighborhoods We Serve</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mt-4">
              Our White Rock window cleaning services cover all local neighborhoods and surrounding areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {[
              "White Rock Beach", "East Beach", "West Beach", "Uptown White Rock", 
              "Centennial Park", "Hillside", "Marine Drive", "Five Corners",
              "Lower Johnston", "Upper Johnston", "Semiahmoo", "South Surrey Border"
            ].map((area, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-center">
                  <MapPin className="text-bc-red mr-2" size={18} />
                  <span className="font-medium">{area}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1 lg:col-span-2">
              <div className="badge-pill mb-4">White Rock Community</div>
              <h2 className="text-3xl font-bold mb-6">White Rock's Most Trusted Window Cleaners Since 2013</h2>
              <p className="text-gray-600 mb-4">
                As a locally owned and operated business based in White Rock, we're deeply committed to helping our neighbors maintain beautiful, well-preserved properties with crystal clear windows. Our team members live in the White Rock area and understand the unique challenges that local homeowners and businesses face.
              </p>
              <p className="text-gray-600 mb-4">
                We've built our reputation on providing exceptional window cleaning services throughout White Rock, from the beachfront properties along Marine Drive to the hillside homes with panoramic ocean views. Our knowledge of local architecture, building materials, and environmental conditions ensures that we deliver optimal results for every White Rock property we service.
              </p>
              <p className="text-gray-600 mb-6">
                When you choose BC Pressure Washing, you're supporting a local White Rock business that reinvests in our community. We're proud members of the White Rock Business Improvement Association and regularly participate in community events and initiatives.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Award className="text-bc-red mr-2" />
                  <span className="font-medium">White Rock Business Excellence Award Winner</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-bc-red mr-2" />
                  <span className="font-medium">5-Star Rated on Google by White Rock Residents</span>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="bg-bc-gray p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">White Rock Window Cleaning FAQ</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-bc-red flex-shrink-0 mr-3 mt-1" size={20} />
                    <div>
                      <span className="font-medium">How often should White Rock homes have their windows cleaned?</span>
                      <p className="text-sm mt-1">For optimal results, we recommend quarterly cleaning for oceanfront properties and bi-annual cleaning for homes further inland.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-bc-red flex-shrink-0 mr-3 mt-1" size={20} />
                    <div>
                      <span className="font-medium">Do you clean high windows in White Rock homes?</span>
                      <p className="text-sm mt-1">Yes! We have specialized equipment to safely clean windows up to 5 stories high without using ladders.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-bc-red flex-shrink-0 mr-3 mt-1" size={20} />
                    <div>
                      <span className="font-medium">Do you offer same-day service in White Rock?</span>
                      <p className="text-sm mt-1">Yes, we often have same-day availability for White Rock residents. Call us to check today's schedule!</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction
        title="Ready for Spotless Windows in White Rock?"
        subtitle="Contact us today for a free, no-obligation quote tailored to your White Rock property's specific needs."
      />
    </Layout>
  );
};

export default WhiteRock;

import { Sun, Droplets, Building, ArrowRight } from 'lucide-react';
