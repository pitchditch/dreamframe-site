
import { Shield, Clock, ThumbsUp } from 'lucide-react';

const ServiceDescription = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Professional Window Cleaning for Commercial Properties</h2>
          <p className="text-gray-600 mb-6">
            Clean, streak-free windows make a significant difference in how clients, customers, and employees perceive your business. Our commercial window cleaning service uses advanced pure water technology and specialized equipment to safely clean windows at any height, providing exceptional results without disrupting your business operations.
          </p>
          <p className="text-gray-600 mb-6">
            Whether you manage a small retail store, a multi-story office building, or a large commercial complex, our professional team has the expertise and equipment to keep your windows spotless year-round. We offer flexible scheduling including after-hours and weekend service to minimize disruption to your business.
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
            src="/lovable-uploads/40094f62-8278-4c5c-8d34-9b01a159f13b.png" 
            alt="Commercial window cleaning service showing window, frame and screen cleaning" 
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceDescription;
