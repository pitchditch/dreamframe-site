
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
    document.title = "White Rock Pressure Washing Services | BC Pressure Washing";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional pressure washing services in White Rock, BC. Driveway cleaning, house washing, roof cleaning and more. Local, trusted White Rock pressure washing company.');
    }
  }, []);

  return (
    <Layout>
      <ServiceHeader
        title="White Rock Pressure Washing Services"
        description="Professional pressure washing and exterior cleaning services for White Rock residents and businesses"
        imagePath="/lovable-uploads/9044bb24-865d-4974-8d4a-8807df54ea8c.png"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="badge-pill mb-4">Local White Rock Service</div>
              <h2 className="text-3xl font-bold mb-6">Your Trusted White Rock Pressure Washing Experts</h2>
              <p className="text-gray-600 mb-6">
                At BC Pressure Washing, we're proud to be White Rock's premier pressure washing company, serving our local community with exceptional cleaning services for over 10 years. Our deep understanding of White Rock's unique coastal climate conditions allows us to deliver superior results for your property.
              </p>
              <p className="text-gray-600 mb-6">
                Whether you're dealing with salt air corrosion, moss growth on your roof, or algae on your siding - common issues for White Rock properties - our locally-based team has the expertise to restore your home or business to pristine condition.
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
                src="/lovable-uploads/9044bb24-865d-4974-8d4a-8807df54ea8c.png" 
                alt="White Rock Pressure Washing Services" 
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
            <h2 className="text-3xl font-bold">Pressure Washing Services for White Rock Properties</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mt-4">
              Our comprehensive pressure washing services are tailored to address the specific needs of White Rock homes and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-bc-red mb-4">
                <DropletIcon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Driveway & Patio Cleaning</h3>
              <p className="text-gray-600 mb-4">
                White Rock driveways and patios can quickly accumulate dirt, algae, and moss due to our coastal climate. Our specialized cleaning restores your concrete, pavers, or stonework to like-new condition.
              </p>
              <Link to="/services/driveway-cleaning" className="text-bc-red font-medium flex items-center">
                Learn more <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-bc-red mb-4">
                <Home size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">House Washing</h3>
              <p className="text-gray-600 mb-4">
                White Rock homes face unique challenges from salt air, sea spray, and our damp climate. Our gentle soft washing technique safely removes dirt, algae, and stains from all types of siding.
              </p>
              <Link to="/services/house-washing" className="text-bc-red font-medium flex items-center">
                Learn more <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-bc-red mb-4">
                <CloudRain size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Roof Cleaning</h3>
              <p className="text-gray-600 mb-4">
                Black streaks and moss growth are common on White Rock roofs due to our humid climate. Our eco-friendly roof cleaning solutions eliminate these issues while extending your roof's lifespan.
              </p>
              <Link to="/services/roof-cleaning" className="text-bc-red font-medium flex items-center">
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
                src="/lovable-uploads/dcf682db-4e98-4608-b2f1-871ded513f5c.jpg" 
                alt="White Rock Beach Properties" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <div className="badge-pill mb-4">White Rock Specialists</div>
              <h2 className="text-3xl font-bold mb-6">Why White Rock Properties Need Regular Pressure Washing</h2>
              <p className="text-gray-600 mb-6">
                White Rock's beautiful coastal location presents unique challenges for property maintenance:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="text-bc-red flex-shrink-0 mr-3 mt-1" size={20} />
                  <div>
                    <span className="font-medium">Salt Air Exposure:</span> Prolonged exposure to salt air can deteriorate exterior surfaces, leading to premature aging and damage.
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-bc-red flex-shrink-0 mr-3 mt-1" size={20} />
                  <div>
                    <span className="font-medium">High Humidity:</span> White Rock's humid climate creates perfect conditions for moss, algae, and mildew growth on exterior surfaces.
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-bc-red flex-shrink-0 mr-3 mt-1" size={20} />
                  <div>
                    <span className="font-medium">Ocean Spray:</span> Properties near the beach experience mineral deposits from ocean spray, which can stain and deteriorate surfaces over time.
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-bc-red flex-shrink-0 mr-3 mt-1" size={20} />
                  <div>
                    <span className="font-medium">Property Value Protection:</span> Regular pressure washing maintains White Rock's property values, which are among the highest in BC.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ServiceBenefits 
        title="Benefits of Professional Pressure Washing in White Rock"
        benefits={[
          {
            title: "Preserve Property Value",
            description: "Maintain your White Rock property's value with regular professional cleaning that prevents deterioration and enhances curb appeal."
          },
          {
            title: "Prevent Costly Damage",
            description: "Avoid expensive repairs by removing harmful contaminants before they can cause structural damage to your White Rock home."
          },
          {
            title: "Healthier Environment",
            description: "Eliminate allergens, mold, and mildew from your property's exterior, creating a healthier living environment for your family."
          },
          {
            title: "Local Expertise",
            description: "Benefit from our specialized knowledge of White Rock's unique climate challenges and how they affect different surfaces and materials."
          }
        ]}
      />

      <section className="py-16 bg-bc-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="badge-pill mx-auto w-fit mb-4">Local Service Areas</div>
            <h2 className="text-3xl font-bold">White Rock Neighborhoods We Serve</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mt-4">
              Our White Rock pressure washing services cover all local neighborhoods and surrounding areas.
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
              <h2 className="text-3xl font-bold mb-6">Proudly Serving White Rock Since 2013</h2>
              <p className="text-gray-600 mb-4">
                As a locally owned and operated business based in White Rock, we're deeply committed to helping our neighbors maintain beautiful, well-preserved properties. Our team members live in the White Rock area and understand the unique challenges that local homeowners and businesses face.
              </p>
              <p className="text-gray-600 mb-4">
                We've built our reputation on providing exceptional pressure washing services throughout White Rock, from the beachfront properties along Marine Drive to the hillside homes with panoramic ocean views. Our knowledge of local architecture, building materials, and environmental conditions ensures that we deliver optimal results for every White Rock property we service.
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
                <h3 className="text-xl font-bold mb-4">White Rock Quick Facts</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-bc-red flex-shrink-0 mr-3 mt-1" size={20} />
                    <div>
                      <span className="font-medium">Average Home Age:</span> 35+ years, requiring special care for exterior cleaning
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-bc-red flex-shrink-0 mr-3 mt-1" size={20} />
                    <div>
                      <span className="font-medium">Annual Rainfall:</span> 1,300+ mm, contributing to moss and algae growth
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-bc-red flex-shrink-0 mr-3 mt-1" size={20} />
                    <div>
                      <span className="font-medium">Coastal Influence:</span> Salt air affects all exterior surfaces within 3km of shoreline
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-bc-red flex-shrink-0 mr-3 mt-1" size={20} />
                    <div>
                      <span className="font-medium">Property Value:</span> Average White Rock home value over $1.2M, making maintenance essential
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction
        title="Ready to Restore Your White Rock Property?"
        subtitle="Contact us today for a free, no-obligation quote tailored to your White Rock property's specific needs."
      />
    </Layout>
  );
};

export default WhiteRock;

import { DropletIcon, CloudRain, Home, ArrowRight } from 'lucide-react';
