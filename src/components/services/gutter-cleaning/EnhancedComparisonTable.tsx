
import React from 'react';
import { Check, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GutterCleaningQuoteOverlay from '@/components/forms/GutterCleaningQuoteOverlay';

const EnhancedComparisonTable = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Choose Your Gutter Protection Level
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Compare our gutter protection options to find the perfect solution for your home
          </p>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-bc-red to-red-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center font-semibold">
                    <div className="space-y-2">
                      <div>Gutter Sticks</div>
                      <div className="text-sm bg-white/20 px-2 py-1 rounded">Budget Option</div>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    <div className="space-y-2">
                      <div>Gutter Guards</div>
                      <div className="text-sm bg-yellow-400 text-black px-2 py-1 rounded flex items-center gap-1 justify-center">
                        <Star className="w-4 h-4 fill-current" />
                        Premium
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Prevents Leaf Buildup</td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Easy Installation</td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-gray-500">Professional Required</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Blocks Small Debris</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-orange-600">Partial</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Removable for Cleaning</td>
                  <td className="px-6 py-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Reduces Cleaning Frequency</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-orange-600">50%</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm text-green-600 font-semibold">90%</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">Warranty</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm">1 Year</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-semibold">5 Years</span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 font-bold text-lg">Starting Price</td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-2xl font-bold text-green-600">$199</div>
                    <div className="text-sm text-gray-500">+ Installation</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="text-2xl font-bold text-bc-red">$499</div>
                    <div className="text-sm text-gray-500">Installed</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4 text-center">
                    <GutterCleaningQuoteOverlay 
                      buttonText="Get Quote" 
                      variant="default"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <GutterCleaningQuoteOverlay 
                      buttonText="Get Quote" 
                      variant="bc-red"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Not sure which option is right for you? Our experts can help you choose based on your specific needs.
            </p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a href="tel:7788087620">
                Call for Free Consultation: (778) 808-7620
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedComparisonTable;
