
import React from 'react';

const RoofCleaningFAQ = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Is roof cleaning necessary?</h3>
            <p className="text-gray-700">
              Yes! Regular roof cleaning extends the life of your roof by preventing damage from moss, algae, and debris. It also maintains your home's curb appeal and can prevent costly repairs.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">How often should I have my roof cleaned?</h3>
            <p className="text-gray-700">
              Most homes benefit from roof cleaning every 2-3 years, though this can vary based on your surroundings. Homes in shaded areas or under many trees may need more frequent cleaning.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Will roof cleaning damage my shingles?</h3>
            <p className="text-gray-700">
              Our low-pressure cleaning method is specifically designed to be safe for all roof types, including asphalt shingles. We never use pressure washing on shingle roofs, which can damage or dislodge shingles.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Are your cleaning solutions safe for plants and pets?</h3>
            <p className="text-gray-700">
              Yes. We use eco-friendly cleaning solutions and take care to protect surrounding landscaping, plants, and property during the cleaning process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoofCleaningFAQ;
