
import React from 'react';
import { Calendar, Award, Home, Hammer } from 'lucide-react';

const CompanyHistory = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
          
          <div className="relative border-l-2 border-bc-red pl-8 pb-8">
            {/* Start */}
            <div className="mb-12 relative">
              <div className="absolute -left-10 bg-bc-red text-white rounded-full p-2">
                <Calendar size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">Founded in 2021</h3>
              <p className="text-gray-600">
                BC Pressure Washing started as a door-to-door service, founded with a passion for 
                delivering spotless results and excellent customer service in the White Rock and Surrey areas.
              </p>
            </div>
            
            {/* Education */}
            <div className="mb-12 relative">
              <div className="absolute -left-10 bg-bc-red text-white rounded-full p-2">
                <Award size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">Semiahmoo Alumni</h3>
              <p className="text-gray-600">
                Proud graduate of Semiahmoo Secondary School, with deep roots in the White Rock community 
                and a commitment to serving local neighborhoods with quality cleaning services.
              </p>
            </div>
            
            {/* Construction Background */}
            <div className="mb-12 relative">
              <div className="absolute -left-10 bg-bc-red text-white rounded-full p-2">
                <Hammer size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">Construction Industry Experience</h3>
              <p className="text-gray-600">
                Gained valuable experience working for Willowbrook Roofing LTD, my father's roofing company, 
                from a young age. This background in construction provides unique insights into property maintenance 
                and the importance of proper cleaning techniques.
              </p>
            </div>
            
            {/* Today */}
            <div className="relative">
              <div className="absolute -left-10 bg-bc-red text-white rounded-full p-2">
                <Home size={20} />
              </div>
              <h3 className="text-xl font-bold mb-2">Growing Company</h3>
              <p className="text-gray-600">
                Today, BC Pressure Washing has grown into a trusted name for residential and commercial 
                cleaning services throughout Metro Vancouver, maintaining the same dedication to quality 
                and customer satisfaction that we started with.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;
