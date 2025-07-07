
import React from 'react';
import { Check, X, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CompetitorComparisonChart = () => {
  const features = [
    { feature: 'Eco-Friendly Cleaning Solutions', bcPressure: true, shackShine: false, menInKilts: false },
    { feature: 'Water-Fed Pole System', bcPressure: true, shackShine: true, menInKilts: false },
    { feature: 'Local Owner-Operated', bcPressure: true, shackShine: false, menInKilts: false },
    { feature: 'Same-Day Service Available', bcPressure: true, shackShine: false, menInKilts: true },
    { feature: 'Fully Insured (WCB + Liability)', bcPressure: true, shackShine: true, menInKilts: true },
    { feature: 'Free Estimates', bcPressure: true, shackShine: false, menInKilts: true },
    { feature: '100% Satisfaction Guarantee', bcPressure: true, shackShine: true, menInKilts: false },
    { feature: 'Competitive Pricing', bcPressure: true, shackShine: false, menInKilts: true },
    { feature: 'Local White Rock Based', bcPressure: true, shackShine: false, menInKilts: false }
  ];

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Choose BC Pressure Washing?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how we compare to other exterior cleaning services in Metro Vancouver
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {/* Header Cards */}
            <Card className="bg-bc-red border-bc-red text-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-center">
                  <div className="mb-2">
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <div className="font-bold text-lg">BC Pressure Washing</div>
                    <div className="text-sm opacity-90">Local White Rock Experts</div>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-center">
                  <div className="mb-2">
                    <div className="flex justify-center mb-2">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                      {[...Array(2)].map((_, i) => (
                        <Star key={i + 3} className="w-4 h-4 text-gray-400" />
                      ))}
                    </div>
                    <div className="font-bold text-lg">Shack Shine</div>
                    <div className="text-sm text-gray-400">Franchise Chain</div>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-center">
                  <div className="mb-2">
                    <div className="flex justify-center mb-2">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                      <Star className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="font-bold text-lg">Men in Kilts</div>
                    <div className="text-sm text-gray-400">National Franchise</div>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
            
            {/* CTA Card */}
            <Card className="bg-gradient-to-b from-green-600 to-green-700 border-green-600 text-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-center">
                  <div className="font-bold text-lg mb-2">Choose the Local Leader</div>
                  <Button 
                    asChild 
                    variant="secondary" 
                    className="w-full bg-white text-green-700 hover:bg-gray-100 font-semibold"
                  >
                    <Link to="/calculator">
                      Get Your Quote
                    </Link>
                  </Button>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Comparison Table */}
          <Card className="bg-white text-gray-900">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <tbody>
                    {features.map((row, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-200`}>
                        <td className="px-6 py-4 font-medium text-left">{row.feature}</td>
                        <td className="px-6 py-4 text-center">
                          {row.bcPressure ? (
                            <Check className="w-6 h-6 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-6 h-6 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {row.shackShine ? (
                            <Check className="w-6 h-6 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-6 h-6 text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {row.menInKilts ? (
                            <Check className="w-6 h-6 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-6 h-6 text-red-500 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="text-gray-300 mb-4">
              Ready to experience the BC Pressure Washing difference?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-bc-red hover:bg-red-700">
                <a href="tel:7788087620">Call (778) 808-7620</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                <Link to="/calculator">Get Free Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitorComparisonChart;
