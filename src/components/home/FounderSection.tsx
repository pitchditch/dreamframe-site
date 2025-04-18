
import React from 'react';

const FounderSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">👋 Meet the Founder</h2>
          <div className="w-24 h-1 bg-bc-red mx-auto"></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl mx-auto">
          <div className="md:w-1/2">
            <img 
              src="/lovable-uploads/4b5d343d-9019-4709-9661-a5341edd7db7.png" 
              alt="Jayden Fisher - Founder of BC Pressure Washing" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">Jayden Fisher – Owner & Operator of BC Pressure Washing</h3>
            <p className="text-gray-700 mb-4">
              What started with a squeegee, a dream, and some serious door-knocking hustle quickly grew into a full-time business. Two years ago, I went door-to-door offering exterior cleaning services in White Rock and Surrey — and thanks to amazing clients and a reputation for quality work, BC Pressure Washing was born.
            </p>
            <p className="text-gray-700 mb-4">
              Today, we use state-of-the-art equipment, offer competitive pricing, and back every job with a 100% satisfaction guarantee — if you're not happy, we'll re-clean at no extra charge. Whether it's crystal-clear windows or spotless driveways, we treat every home like it's our own.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/c74311b2-46a2-482b-93d0-1c36dd1c0695.png" 
                  alt="Licensed and Insured"
                  className="w-40 h-40 object-contain"
                />
              </div>
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/cbc1a352-c1be-4b9f-b751-65974751292b.png" 
                  alt="Eco-Friendly Cleaning"
                  className="w-40 h-40 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
