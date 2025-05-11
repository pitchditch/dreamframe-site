
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FounderSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-4">Meet the Owner</h2>
              <h3 className="text-xl text-bc-red font-medium mb-6">Exterior Cleaning Is My Passion</h3>
              <p className="mb-4 text-gray-700">
                Hi, I'm Jayden — owner and operator of BC Pressure Washing. I founded this company with a clear mission: to deliver premium exterior cleaning services with the care, precision, and accountability you can only get from someone who does the work themselves.
              </p>
              <p className="mb-4 text-gray-700">
                I grew up in White Rock and went to Semiahmoo Secondary up to Grade 10 before moving to Abbotsford. Now I'm back living along Marine Drive and proudly serving the White Rock and South Surrey communities once again.
              </p>
              <p className="mb-6 text-gray-700">
                Unlike other companies that send random crews, I personally complete every service — from start to finish. With over 3 years of hands-on experience, I use only <Link to="/why-us" className="text-bc-red hover:underline">professional-grade equipment</Link> and treat every home like it's my own. You'll always know exactly who's showing up, and that the job will be done right.
              </p>
              <Link 
                to="/about" 
                className="inline-flex items-center text-bc-red font-medium hover:underline"
              >
                <span>Learn more about our story</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="relative">
                <img 
                  src="/lovable-uploads/116727c7-867b-4c6c-b291-da7848be87ac.png" 
                  alt="Jayden Fisher - Owner of BC Pressure Washing" 
                  className="w-full h-auto rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-bc-red text-white py-3 px-6 rounded-lg shadow-lg hidden md:block">
                  <p className="font-medium">Jayden Fisher</p>
                  <p className="text-sm">Owner & Operator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
