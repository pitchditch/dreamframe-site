
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield, Clock } from 'lucide-react';

const ServiceDescription = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Professional Window Cleaning for Commercial Properties</h2>
          <p className="text-gray-600 mb-6">
            Our commercial window cleaning services are designed to meet the unique needs of businesses, office buildings, retail stores, and multi-story properties. Using specialized equipment and techniques, we deliver spotless, streak-free results that enhance your property's appearance and professionalism.
          </p>
          <p className="text-gray-600 mb-6">
            We understand that clean windows make a significant difference in how customers perceive your business. Our services help you maintain a polished, professional appearance while extending the life of your windows and maximizing natural light in your commercial space.
          </p>
          <div className="flex items-center space-x-8 mb-8">
            <div className="flex items-center">
              <Shield className="text-bc-red mr-2" size={24} />
              <span className="font-medium">Fully Insured</span>
            </div>
            <div className="flex items-center">
              <Clock className="text-bc-red mr-2" size={24} />
              <span className="font-medium">Flexible Scheduling</span>
            </div>
          </div>
          <Button asChild variant="bc-red">
            <Link to="/calculator">Get a Free Quote</Link>
          </Button>
        </div>
        <div className="md:w-1/2">
          <img 
            src="/lovable-uploads/d9f3e980-9bd8-4f15-afb2-6df7cb095002.png" 
            alt="Commercial Window Cleaning" 
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceDescription;
