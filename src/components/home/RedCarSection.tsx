
import React from 'react';

const RedCarSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="/lovable-uploads/d8cafee6-2600-4290-9874-200435673474.png" 
                alt="BC Pressure Washing Service Vehicle at White Rock Beach" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Have You Seen Our Red Car?</h2>
              <p className="text-gray-700 mb-4">
                That's me! As a local exterior cleaning expert serving White Rock and the Lower Mainland, you've probably spotted our distinctive red company vehicle along Marine Drive or throughout the neighborhood.
              </p>
              <p className="text-gray-700 mb-4">
                We're proud to be your local window cleaning, pressure washing, and exterior maintenance specialists - delivering premium results with a personal touch.
              </p>
              <div className="flex items-center p-4 bg-gray-100 rounded-lg">
                <img 
                  src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
                  alt="Owner" 
                  className="w-16 h-16 rounded-full mr-4 border-2 border-bc-red"
                />
                <div>
                  <p className="font-semibold">"I'm personally committed to the quality of every service we provide."</p>
                  <p className="text-bc-red">— Jayden Fisher, Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RedCarSection;
