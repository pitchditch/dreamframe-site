
import React from 'react';

const BeforeAfterSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See the Difference
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our post construction window cleaning transforms your property from construction-ready to move-in ready.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">What We Remove:</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-bc-red mr-2">•</span>
                <span>Construction stickers and labels</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">•</span>
                <span>Paint splatter and overspray</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">•</span>
                <span>Adhesive residue</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">•</span>
                <span>Concrete and mortar splatter</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">•</span>
                <span>Dust and debris build-up</span>
              </li>
              <li className="flex items-start">
                <span className="text-bc-red mr-2">•</span>
                <span>Fingerprints and smudges</span>
              </li>
            </ul>
          </div>
          <div>
            <img 
              src="/lovable-uploads/6fed146a-76ba-45a2-b2e9-e14badedae9e.png"
              alt="Post construction window cleaning results"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
