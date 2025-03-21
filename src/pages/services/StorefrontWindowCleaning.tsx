
import Layout from '../../components/Layout';
import ServiceHeader from '../../components/ServiceHeader';
import ServiceBenefits from '../../components/ServiceBenefits';
import ServiceProcess from '../../components/ServiceProcess';
import CallToAction from '../../components/CallToAction';
import { Building, Shield, Clock, ThumbsUp, Droplets, SparkleIcon, CheckCircle, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const StorefrontWindowCleaning = () => {
  const benefits = [
    {
      title: "Enhance Curb Appeal",
      description: "Clean storefront windows create a positive first impression for customers, making your business more inviting and professional."
    },
    {
      title: "Increase Foot Traffic",
      description: "Crystal clear windows allow potential customers to see your displays and products clearly, encouraging them to enter your store."
    },
    {
      title: "Improve Natural Lighting",
      description: "Clean windows allow maximum natural light to enter your business, creating a brighter, more inviting atmosphere and reducing energy costs."
    },
    {
      title: "Project a Professional Image",
      description: "Well-maintained storefronts reflect positively on your business, showing attention to detail and commitment to quality."
    },
    {
      title: "Protect Your Investment",
      description: "Regular cleaning prevents contaminants from etching and damaging your glass, extending the lifespan of your storefront windows."
    },
    {
      title: "Affordable Maintenance Plans",
      description: "Our monthly subscription options make it easy and affordable to keep your storefront looking its best year-round."
    }
  ];

  const processes = [
    {
      title: "Initial Assessment",
      description: "We evaluate your storefront's specific needs, including window type, size, accessibility, and any special requirements.",
      icon: <CheckCircle size={32} />
    },
    {
      title: "Professional Cleaning",
      description: "Our technicians use professional-grade equipment and techniques to remove dirt, fingerprints, smudges, and water spots.",
      icon: <Droplets size={32} />
    },
    {
      title: "Detail Work",
      description: "We clean frames, tracks, and sills, and can remove stubborn materials like tape residue, paint, or construction debris as needed.",
      icon: <SparkleIcon size={32} />
    }
  ];

  return (
    <Layout>
      <ServiceHeader
        title="Storefront Window Cleaning"
        description="Professional window cleaning services for retail stores, restaurants, and small businesses."
        icon={<Store size={48} />}
        imagePath="/lovable-uploads/a01ad13c-3959-46f2-ac1b-afea971ea288.png"
      />

      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Professional Storefront Window Cleaning Services</h2>
            <p className="text-gray-600 mb-6">
              Your storefront windows are the first thing customers see when approaching your business. Clean, streak-free windows not only enhance your curb appeal but also create a positive first impression that can significantly impact your business success.
            </p>
            <p className="text-gray-600 mb-6">
              Our professional storefront window cleaning service is designed specifically for retail stores, restaurants, and small businesses. We understand the unique challenges of maintaining a clean, professional appearance while working around your business hours and customer traffic.
            </p>
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <Shield className="text-bc-red mr-2" size={24} />
                <span className="font-medium">Fully Insured</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-bc-red mr-2" size={24} />
                <span className="font-medium">Flexible Scheduling</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="text-bc-red mr-2" size={24} />
                <span className="font-medium">100% Satisfaction</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="/lovable-uploads/53fdc933-8bfe-49d3-be7c-8ea0f62e8c23.png" 
              alt="Storefront window cleaning service" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Benefits of Professional Storefront Window Cleaning</h2>
          <p className="section-subtitle">
            Regular storefront window maintenance provides numerous advantages for your business
          </p>
          <ServiceBenefits benefits={benefits} />
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="section-title">Our Storefront Window Cleaning Process</h2>
        <p className="section-subtitle">
          We follow a comprehensive approach to deliver spotless windows for your business
        </p>
        <ServiceProcess processes={processes} />
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Comprehensive Cleaning Services</h3>
              <p className="text-gray-600 mb-6">
                Our storefront window cleaning service includes more than just glass cleaning. We take care of all window elements to ensure a complete, professional finish.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <img 
                  src="/lovable-uploads/bf42d980-47f9-4b65-a765-447b0273d9cc.png" 
                  alt="Window cleaning professional removing stickers" 
                  className="rounded-lg shadow-sm w-full h-auto"
                />
                <div className="space-y-2">
                  <p className="font-medium text-gray-800">Our service includes:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-bc-red mr-2">✓</span>
                      <span>Window glass (interior & exterior)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-bc-red mr-2">✓</span>
                      <span>Frames and tracks</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-bc-red mr-2">✓</span>
                      <span>Window sills</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-bc-red mr-2">✓</span>
                      <span>Entry doors and glass</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-bc-red mr-2">+$25</span>
                      <span>Sticker/tape removal</span>
                    </li>
                  </ul>
                </div>
              </div>
              <Button asChild>
                <Link to="/contact">
                  Request a Quote
                </Link>
              </Button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Monthly Maintenance Plans</h3>
              <p className="text-gray-600 mb-6">
                Keep your business looking its best year-round with our affordable storefront maintenance plans starting at just $50 per month.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <img 
                  src="/lovable-uploads/53fdc933-8bfe-49d3-be7c-8ea0f62e8c23.png" 
                  alt="Clean storefront windows" 
                  className="rounded-lg shadow-sm w-full h-auto"
                />
                <div className="space-y-2">
                  <p className="font-medium text-gray-800">Plan benefits:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-bc-red mr-2">✓</span>
                      <span>Monthly professional cleaning</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-bc-red mr-2">✓</span>
                      <span>Consistent scheduling</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-bc-red mr-2">✓</span>
                      <span>Priority service</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-bc-red mr-2">✓</span>
                      <span>Save with yearly payment</span>
                    </li>
                  </ul>
                </div>
              </div>
              <Button asChild>
                <Link to="/subscription">
                  View Subscription Plans
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </Layout>
  );
};

export default StorefrontWindowCleaning;
