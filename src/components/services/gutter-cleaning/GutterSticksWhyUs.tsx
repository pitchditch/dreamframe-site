
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

const GutterSticksSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Gutter Sticks - Affordable Gutter Protection</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              A budget-friendly solution to prevent clogged gutters and downspouts while allowing proper water flow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
            <div>
              <img 
                src="/lovable-uploads/389fa651-dd54-4695-ba4d-5b28bd32f0fe.png" 
                alt="Gutter Stick installation" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-bc-red">Simple & Effective Protection</h3>
              <p className="text-gray-700 mb-6">
                Gutter Sticks are perforated guards that prevent leaves, needles, and debris from entering your gutters and downspouts, while still allowing water to flow through freely.
              </p>
              
              <ul className="space-y-3 mb-6">
                {['Prevents clogged downspouts', 'Easy to install', 'Affordable at just $70 per drain', 'Long-lasting protection', 'No need for frequent gutter cleaning'].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                <h4 className="font-semibold mb-2">Professional Installation Available</h4>
                <p className="text-sm text-gray-600">
                  We can install Gutter Sticks for just $70 per drain - a small investment to avoid frequent cleaning and potential water damage!
                </p>
              </div>
              
              <Link 
                to="/contact" 
                className="inline-flex items-center bg-bc-red hover:bg-red-700 text-white py-2 px-6 rounded-lg font-medium transition-all"
              >
                Ask About Gutter Sticks Installation <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <img 
                src="/lovable-uploads/af21559a-6418-4931-bf51-38534b28d548.png" 
                alt="Gutter Stick installation in gutter" 
                className="rounded-lg shadow-md w-full h-auto mb-4"
              />
              <h4 className="font-semibold text-center">Perfect Fit For Any Gutter</h4>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <div className="flex items-start mb-4">
                  <div className="bg-red-100 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-red-800 mb-1">NOT Recommended: Screen Netting</h4>
                    <p className="text-gray-700">
                      Unlike screen netting (shown below) that collapses and traps debris on top, Gutter Sticks protect without the common problems of mesh solutions.
                    </p>
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <img 
                    src="/lovable-uploads/f2394649-5dc2-4fb3-a07d-9873c079b34f.png" 
                    alt="Screen netting problems" 
                    className="w-1/3 rounded-lg mr-4" 
                  />
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✕</span>
                      <span>Collapses under debris weight</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✕</span>
                      <span>Causes water overflow</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✕</span>
                      <span>Actually increases cleaning frequency</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✕</span>
                      <span>Creates nesting areas for pests</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GutterSticksSection;
