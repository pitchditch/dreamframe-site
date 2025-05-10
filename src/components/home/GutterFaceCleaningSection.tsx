
import React from 'react';

const GutterFaceCleaningSection = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Gutter Face Cleaning Tips</h2>
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/3">
              <img 
                src="/lovable-uploads/f899a443-8930-4364-b538-916f65545f84.png" 
                alt="Gutter Cleaning" 
                className="rounded-lg w-full h-auto shadow-md"
              />
            </div>
            <div className="md:w-2/3">
              <h3 className="text-xl font-semibold mb-3 text-bc-red">Keep Your Gutters Looking Brand New</h3>
              <div className="space-y-4">
                <p className="text-gray-700">
                  <strong>Be careful of algae on light-coloured gutters!</strong> Even after cleaning, algae can leave watermarks that are difficult to remove, permanently affecting your gutter's appearance.
                </p>
                <p className="text-gray-700">
                  Regular maintenance is key to preserving your gutter's appearance and functionality. We recommend scheduling professional gutter cleaning at least twice a year to prevent buildup and staining.
                </p>
                <p className="text-gray-700">
                  Our professional services include thorough gutter face cleaning that removes all traces of algae and prevents watermark formation, keeping your property looking pristine year-round.
                </p>
              </div>
              <div className="mt-6">
                <a 
                  href="/calculator" 
                  className="bg-bc-red hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium inline-block transition-all"
                >
                  Schedule Regular Cleaning
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GutterFaceCleaningSection;
