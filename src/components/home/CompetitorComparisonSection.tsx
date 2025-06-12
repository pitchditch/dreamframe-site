
import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';

const CompetitorComparisonSection = () => {
  const comparisonData = [
    {
      feature: 'Pure Water-Fed Pole System',
      bcPressureWashing: { status: 'yes', text: 'Yes' },
      shackShine: { status: 'no', text: 'No' },
      menInKilts: { status: 'sometimes', text: 'Sometimes' }
    },
    {
      feature: 'Eco-Friendly House Wash',
      bcPressureWashing: { status: 'yes', text: 'Biodegradable' },
      shackShine: { status: 'sometimes', text: 'Limited' },
      menInKilts: { status: 'sometimes', text: 'Limited' }
    },
    {
      feature: 'Owner Operated',
      bcPressureWashing: { status: 'yes', text: 'Yes' },
      shackShine: { status: 'no', text: 'No' },
      menInKilts: { status: 'no', text: 'No' }
    },
    {
      feature: 'Personalized Estimates',
      bcPressureWashing: { status: 'yes', text: 'Google Maps / On-site' },
      shackShine: { status: 'no', text: 'Standardized' },
      menInKilts: { status: 'sometimes', text: 'Varies' }
    },
    {
      feature: 'Same-Day Quotes',
      bcPressureWashing: { status: 'yes', text: 'Yes' },
      shackShine: { status: 'no', text: 'No' },
      menInKilts: { status: 'sometimes', text: 'Sometimes' }
    },
    {
      feature: 'Local Expertise',
      bcPressureWashing: { status: 'yes', text: 'White Rock Based' },
      shackShine: { status: 'no', text: 'Franchised' },
      menInKilts: { status: 'no', text: 'Franchised' }
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'yes':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'no':
        return <X className="w-5 h-5 text-red-600" />;
      case 'sometimes':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'yes':
        return 'text-green-700 bg-green-50';
      case 'no':
        return 'text-red-700 bg-red-50';
      case 'sometimes':
        return 'text-yellow-700 bg-yellow-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Why White Rock Homeowners Choose BC Pressure Washing Over the Competition
          </h2>
          <p className="text-lg text-gray-600">
            Compare our professional services with other providers in White Rock and Surrey
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 min-w-[200px]">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-white bg-bc-red min-w-[180px]">BC Pressure Washing</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900 min-w-[150px]">Shack Shine</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900 min-w-[150px]">Men In Kilts</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">{row.feature}</td>
                      <td className={`py-4 px-6 text-center ${row.bcPressureWashing.status === 'yes' ? 'bg-red-50' : ''}`}>
                        <div className="flex items-center justify-center gap-2">
                          {getStatusIcon(row.bcPressureWashing.status)}
                          <span className="font-medium">{row.bcPressureWashing.text}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {getStatusIcon(row.shackShine.status)}
                          <span>{row.shackShine.text}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          {getStatusIcon(row.menInKilts.status)}
                          <span>{row.menInKilts.text}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {comparisonData.map((row, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">{row.feature}</h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className={`flex items-center justify-between p-3 rounded-lg ${getStatusColor(row.bcPressureWashing.status)}`}>
                    <span className="font-medium">BC Pressure Washing</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(row.bcPressureWashing.status)}
                      <span className="text-sm font-medium">{row.bcPressureWashing.text}</span>
                    </div>
                  </div>
                  <div className={`flex items-center justify-between p-3 rounded-lg ${getStatusColor(row.shackShine.status)}`}>
                    <span className="font-medium">Shack Shine</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(row.shackShine.status)}
                      <span className="text-sm">{row.shackShine.text}</span>
                    </div>
                  </div>
                  <div className={`flex items-center justify-between p-3 rounded-lg ${getStatusColor(row.menInKilts.status)}`}>
                    <span className="font-medium">Men In Kilts</span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(row.menInKilts.status)}
                      <span className="text-sm">{row.menInKilts.text}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 max-w-2xl mx-auto">
              <p className="text-green-800 font-medium italic">
                "We compared BC Pressure Washing with Shack Shine and chose BC for their personal service and better equipment. Best decision ever!"
              </p>
              <p className="text-green-700 text-sm mt-2">— Sarah M., White Rock</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitorComparisonSection;
