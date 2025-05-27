
import React from 'react';
import Layout from '../components/Layout';
import { Star, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

const CompareServices = () => {
  const { t } = useTranslation();

  const serviceComparison = [
    {
      feature: "Local Ownership",
      bcPressureWashing: { available: true, description: "100% Locally Owned & Operated" },
      competitors: { available: false, description: "Franchise Model" }
    },
    {
      feature: "Quality Priority",
      bcPressureWashing: { available: true, description: "Quality First Approach" },
      competitors: { available: false, description: "Volume-Based Approach" }
    },
    {
      feature: "Service Time Per Job",
      bcPressureWashing: { available: true, description: "Thorough, Not Rushed" },
      competitors: { available: false, description: "Often Rushed" }
    },
    {
      feature: "Owner Involvement",
      bcPressureWashing: { available: true, description: "Owner On-Site for Quality Control" },
      competitors: { available: false, description: "Corporate Structure" }
    },
    {
      feature: "Franchise Fees",
      bcPressureWashing: { available: true, description: "No Franchise Fees" },
      competitors: { available: false, description: "Franchise Fees Included in Price" }
    },
    {
      feature: "Equipment Quality",
      bcPressureWashing: { available: true, description: "Professional-Grade Tools" },
      competitors: { available: true, description: "Varies by Franchise" }
    }
  ];

  return (
    <Layout
      title="Compare Our Services | BC Pressure Washing"
      description="See how BC Pressure Washing compares to other service providers. Local ownership, quality focus, and competitive pricing."
    >
      <div className="pt-28 md:pt-36 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">{t("Compare Our Services")}</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t("See why BC Pressure Washing delivers superior value compared to franchise operations and other service providers.")}
              </p>
            </div>

            {/* Service Packages Section */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{t("Service Packages")}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Essential Package */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                  <div className="bg-gray-50 p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">{t("Essential Package")}</h3>
                    <p className="text-gray-600 mb-4">{t("Perfect for regular maintenance")}</p>
                    <div className="text-4xl font-bold text-bc-red">$199</div>
                    <p className="text-sm text-gray-500 mt-2">{t("Starting price for most homes")}</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{t("Exterior Window Cleaning")}</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{t("Tracks & Sills Cleaned")}</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{t("Screen Cleaning")}</span>
                      </li>
                    </ul>
                    <Button asChild className="w-full mt-6 bg-bc-red hover:bg-red-700">
                      <Link to="/calculator">{t("Get a Quote")}</Link>
                    </Button>
                  </div>
                </div>
                
                {/* Complete Package */}
                <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-bc-red transform scale-105 relative">
                  <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-12">
                    {t("POPULAR")}
                  </div>
                  <div className="bg-bc-red text-white p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">{t("Complete Package")}</h3>
                    <p className="text-gray-100 mb-4">{t("Our most popular choice")}</p>
                    <div className="text-4xl font-bold">$349</div>
                    <p className="text-sm text-gray-200 mt-2">{t("Best value for most homes")}</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{t("Interior & Exterior Window Cleaning")}</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{t("Tracks, Sills & Frames Cleaned")}</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{t("Gutter Cleaning")}</span>
                      </li>
                    </ul>
                    <Button asChild className="w-full mt-6 bg-bc-red hover:bg-red-700">
                      <Link to="/calculator">{t("Get a Quote")}</Link>
                    </Button>
                  </div>
                </div>
                
                {/* Premium Package */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                  <div className="bg-gray-50 p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">{t("Premium Package")}</h3>
                    <p className="text-gray-600 mb-4">{t("Complete exterior care")}</p>
                    <div className="text-4xl font-bold text-bc-red">$599</div>
                    <p className="text-sm text-gray-500 mt-2">{t("Full service for larger homes")}</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{t("Interior & Exterior Window Cleaning")}</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{t("Gutter Cleaning & Flushing")}</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{t("House Washing (Siding/Exterior)")}</span>
                      </li>
                    </ul>
                    <Button asChild className="w-full mt-6 bg-bc-red hover:bg-red-700">
                      <Link to="/calculator">{t("Get a Quote")}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Competitive Comparison */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{t("How We Compare")}</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg shadow-lg">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-4 border text-left font-semibold">{t("Feature")}</th>
                      <th className="p-4 border text-center">
                        <div className="flex items-center justify-center">
                          <img src="/lovable-uploads/85f5bd3c-680e-4957-9722-6bc6070f7d51.png" alt="BC Pressure Washing Logo" className="h-8 w-8 mr-2" />
                          <span className="font-semibold">BC Pressure Washing</span>
                        </div>
                      </th>
                      <th className="p-4 border text-center">
                        <div className="font-semibold">{t("Competitors")}</div>
                        <div className="text-xs text-gray-500">{t("(Franchise Operations)")}</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceComparison.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="p-4 border font-medium">{t(item.feature)}</td>
                        <td className="p-4 border text-center">
                          <div className={`flex items-center justify-center ${item.bcPressureWashing.available ? 'text-green-600' : 'text-red-600'}`}>
                            {item.bcPressureWashing.available ? (
                              <Check className="w-5 h-5 mr-2" />
                            ) : (
                              <X className="w-5 h-5 mr-2" />
                            )}
                            <span className="text-sm">{t(item.bcPressureWashing.description)}</span>
                          </div>
                        </td>
                        <td className="p-4 border text-center">
                          <div className={`flex items-center justify-center ${item.competitors.available ? 'text-green-600' : 'text-red-600'}`}>
                            {item.competitors.available ? (
                              <Check className="w-5 h-5 mr-2" />
                            ) : (
                              <X className="w-5 h-5 mr-2" />
                            )}
                            <span className="text-sm">{t(item.competitors.description)}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center bg-bc-red text-white p-8 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("Ready to Experience the Difference?")}</h2>
              <p className="text-lg mb-6">{t("Contact us today for a free, no-obligation quote.")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="secondary" size="lg">
                  <Link to="/calculator">{t("Get Free Quote")}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-bc-red">
                  <Link to="/contact">{t("Contact Us")}</Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompareServices;
