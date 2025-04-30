
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const GutterSticksSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img 
              src="/lovable-uploads/0e0f9d23-dc80-43e4-9599-eb9fc29013d0.png" 
              alt="Gutter stick installation" 
              className="rounded-lg shadow-lg max-w-full"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Gutter Protection System</h2>
            <p className="text-lg text-gray-700 mb-6">
              Say goodbye to clogged gutters and expensive repairs. Our gutter stick protection system is an affordable way to prevent leaves and debris from blocking your downspouts while still allowing water to flow freely.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="bg-bc-red rounded-full p-1 text-white mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Prevents clogged downspouts</span>
              </li>
              <li className="flex items-start">
                <div className="bg-bc-red rounded-full p-1 text-white mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Easy to install - just $70 per drain</span>
              </li>
              <li className="flex items-start">
                <div className="bg-bc-red rounded-full p-1 text-white mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Safer and more effective than mesh screens</span>
              </li>
              <li className="flex items-start">
                <div className="bg-bc-red rounded-full p-1 text-white mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Reduces maintenance costs and extends gutter life</span>
              </li>
            </ul>
            <Button asChild variant="bc-red" className="w-full sm:w-auto px-8 py-3 text-white font-medium">
              <Link to="/contact">Ask About Installation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GutterSticksSection;
