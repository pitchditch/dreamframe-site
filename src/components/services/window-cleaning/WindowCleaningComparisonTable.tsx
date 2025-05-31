
import React from 'react';
import { Check, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const WindowCleaningComparisonTable = () => {
  const comparisonData = [
    { feature: 'Water-Fed Pole Up to 60 ft', others: false, us: true },
    { feature: 'Purified Water Technology', others: false, us: true },
    { feature: 'Fully Insured & Trained', others: false, us: true },
    { feature: 'Streak-Free Guarantee', others: false, us: true },
    { feature: 'Local Surrey/White Rock Service', others: false, us: true },
    { feature: 'Same-Day Response', others: false, us: true }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Why Choose BC Pressure Washing?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how our professional window cleaning service compares to other cleaners in Surrey and White Rock
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-900 py-4 px-6">Feature</TableHead>
                  <TableHead className="font-semibold text-gray-900 py-4 px-6 text-center">Other Cleaners</TableHead>
                  <TableHead className="font-semibold text-white py-4 px-6 text-center bg-bc-red">BC Pressure Washing</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, index) => (
                  <TableRow key={index} className="border-b border-gray-100">
                    <TableCell className="py-4 px-6 font-medium text-gray-900">
                      {row.feature}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-center">
                      {row.others ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="py-4 px-6 text-center bg-red-50">
                      {row.us ? (
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
            <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold px-8 py-6">
              <Link to="/calculator">See the Difference – Book a Spotless Clean</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WindowCleaningComparisonTable;
