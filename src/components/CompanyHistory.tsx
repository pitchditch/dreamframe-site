
import React from 'react';
import { Calendar, Award, Home, Hammer } from 'lucide-react';

const CompanyHistory = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Journey</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-bc-red rounded-full">
              <Calendar className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Established</h3>
            <p className="text-gray-600">Founded in White Rock with a mission to deliver exceptional cleaning services.</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-600 rounded-full">
              <Award className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Excellence</h3>
            <p className="text-gray-600">Built our reputation on delivering high-quality results with attention to detail.</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-green-600 rounded-full">
              <Home className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Community</h3>
            <p className="text-gray-600">Proudly serving our local community with personalized and friendly service.</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-yellow-500 rounded-full">
              <Hammer className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-gray-600">Continuously improving our methods and equipment to deliver better results.</p>
          </div>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/lovable-uploads/e0f67b72-91c6-428d-a7a0-8cde935e35d8.png" 
              alt="Owner" 
              className="w-20 h-20 rounded-full border-4 border-bc-red object-cover"
            />
          </div>
          <p className="text-lg italic mb-4">
            "Our company began with a simple goal: to provide exceptional cleaning services that truly transform properties. Today, we're proud to be the trusted choice for exterior cleaning throughout the Lower Mainland."
          </p>
          <p className="font-bold text-bc-red">— Jayden Fisher, Owner</p>
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;
