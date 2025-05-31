
import React from 'react';
import { Check, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const WindowCleaningComparisonTable = () => {
  const comparisonData = [
    { feature: 'Verified Local Owner', us: true, shackShine: false, menInKilts: false },
    { feature: 'Water-Fed Pole Up to 60 ft', us: true, shackShine: false, menInKilts: false },
    { feature: 'Purified Water Technology', us: true, shackShine: false, menInKilts: false },
    { feature: 'Transparent Online Pricing', us: true, shackShine: false, menInKilts: false },
    { feature: 'Personalized Follow-up', us: true, shackShine: false, menInKilts: false },
    { feature: 'Same-Day Response', us: true, shackShine: false, menInKilts: false }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Why Surrey Homeowners Choose BC Pressure Washing
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare our professional window cleaning service with other providers in Surrey and White Rock
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-900 py-4 px-6">Feature</TableHead>
                  <TableHead className="font-semibold text-white py-4 px-6 text-center bg-bc-red">BC Pressure Washing</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4 px-6 text-center">Shack Shine</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4 px-6 text-center">Men in Kilts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, index) => (
                  <TableRow key={index} className="border-b border-gray-100">
                    <TableCell className="py-4 px-6 font-medium text-gray-900">
                      {row.feature}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-center bg-red-50">
                      {row.us ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-center">
                      {row.shackShine ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-center">
                      {row.menInKilts ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="text-center mt-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 max-w-2xl mx-auto">
              <p className="text-green-800 font-medium italic">
                "I almost booked Shack Shine but Jayden's team gave me a better price and personal service. So glad I chose BC Pressure Washing!"
              </p>
              <p className="text-green-700 text-sm mt-2">— Sarah M., White Rock</p>
            </div>
            
            <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold px-8 py-6">
              <Link to="/calculator">See the Difference – Get My Free Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WindowCleaningComparisonTable;
