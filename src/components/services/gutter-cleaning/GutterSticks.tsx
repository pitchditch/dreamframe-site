
import React from 'react';

const GutterSticks = () => {
  return (
    <div className="mt-12 w-full">
      <h3 className="text-2xl font-bold mb-4">Gutter Sticks - Revolutionary Gutter Protection</h3>
      <p className="text-gray-600 mb-6">
        Gutter Sticks are an innovative and cost-effective way to keep debris out of your gutters while allowing water to flow freely. These perforated devices fit perfectly in your gutters to prevent clogging without the high cost of full gutter guards.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img 
            src="/lovable-uploads/6c46b1c6-d454-4f21-9a94-93b485c538e7.png" 
            alt="Gutter Stick installation demonstration" 
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-3">Simple & Effective Design</h4>
          <p className="text-gray-600 mb-4">
            Gutter Sticks feature a perforated design that allows water to flow through while blocking leaves, pine needles, and other debris. The holes are specifically sized to optimize water flow while preventing clogs.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Easy to install in minutes</li>
            <li>No special tools required</li>
            <li>Fits most standard residential gutters</li>
            <li>Prevents downspout clogging</li>
          </ul>
          
          <div className="mt-6">
            <h4 className="text-xl font-semibold mb-3">Professional Installation</h4>
            <p className="text-gray-600 mb-4">
              While Gutter Sticks are designed for easy DIY installation, our team can professionally install them for you, ensuring perfect fit and optimal performance. We recommend installing Gutter Sticks after a thorough gutter cleaning service.
            </p>
          </div>
          
          <div className="mt-6">
            <h5 className="text-lg font-semibold text-blue-800 mb-2">Customer Satisfaction</h5>
            <p className="italic text-gray-700">
              "Since installing Gutter Sticks last year, I haven't had to clean my gutters once. They've kept all the big debris out while allowing water to flow perfectly."
            </p>
            <p className="text-right text-sm text-gray-600 mt-2">- John D., White Rock</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GutterSticks;
