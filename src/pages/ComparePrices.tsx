
import React from 'react';
import Layout from '../components/Layout';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CallToAction from '../components/CallToAction';
import { useTranslation } from '@/hooks/use-translation';
import ServiceAreasCarousel from '../components/ServiceAreasCarousel';

const ComparePrices = () => {
  const { t } = useTranslation();

  return (
    <Layout
      title="Compare Service Prices & Packages | BC Pressure Washing"
      description="Compare our competitive pricing and service packages with other providers. Transparent pricing and superior value from a local, dedicated team."
    >
      <div className="pt-28 md:pt-36 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">Compare Our Services & Pricing</h1>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              See how our transparent pricing and high-quality service packages compare to other options in the market.
            </p>

            {/* Service Bundles Section */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Service Bundles & Packages</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Basic Package */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 transition-transform hover:shadow-xl hover:-translate-y-1">
                  <div className="bg-gray-50 p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Essential Package</h3>
                    <p className="text-gray-600 mb-4">Perfect for regular maintenance</p>
                    <div className="text-4xl font-bold text-bc-red">$199</div>
                    <p className="text-sm text-gray-500 mt-2">Starting price for most homes</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Exterior Window Cleaning</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Tracks & Sills Cleaned</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Screen Cleaning</span>
                      </li>
                      <li className="flex items-start text-gray-400">
                        <svg className="w-5 h-5 text-gray-300 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        <span>Interior Windows</span>
                      </li>
                      <li className="flex items-start text-gray-400">
                        <svg className="w-5 h-5 text-gray-300 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        <span>Gutter Cleaning</span>
                      </li>
                    </ul>
                    <Button asChild className="w-full mt-6 bg-bc-red hover:bg-red-700">
                      <Link to="/calculator">Get a Quote</Link>
                    </Button>
                  </div>
                </div>
                
                {/* Popular Package */}
                <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-bc-red transform scale-105 z-10">
                  <div className="bg-bc-red text-white p-6 text-center relative">
                    <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 transform translate-y-2 rotate-45">
                      POPULAR
                    </div>
                    <h3 className="text-xl font-bold mb-2">Complete Package</h3>
                    <p className="text-gray-100 mb-4">Our most popular choice</p>
                    <div className="text-4xl font-bold">$349</div>
                    <p className="text-sm text-gray-200 mt-2">Best value for most homes</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Interior & Exterior Window Cleaning</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Tracks, Sills & Frames Cleaned</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Screen Cleaning & Maintenance</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Gutter Cleaning</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Gutter Face Cleaning</span>
                      </li>
                    </ul>
                    <Button asChild className="w-full mt-6 bg-bc-red hover:bg-red-700">
                      <Link to="/calculator">Get a Quote</Link>
                    </Button>
                  </div>
                </div>
                
                {/* Premium Package */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 transition-transform hover:shadow-xl hover:-translate-y-1">
                  <div className="bg-gray-50 p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Premium Package</h3>
                    <p className="text-gray-600 mb-4">Complete exterior care</p>
                    <div className="text-4xl font-bold text-bc-red">$599</div>
                    <p className="text-sm text-gray-500 mt-2">Full service for larger homes</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Interior & Exterior Window Cleaning</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Deep Clean Tracks & Frames</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Gutter Cleaning & Flushing</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>House Washing (Siding/Exterior)</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>Driveway Pressure Washing</span>
                      </li>
                    </ul>
                    <Button asChild className="w-full mt-6 bg-bc-red hover:bg-red-700">
                      <Link to="/calculator">Get a Quote</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Competitive Pricing Comparison */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How We Compare</h2>
              <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
                We offer higher quality service at competitive prices compared to national franchise operations. Here's why we deliver better value:
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-4 border text-left w-1/3">Feature</th>
                      <th className="p-4 border text-center">
                        <div className="flex items-center justify-center">
                          <img src="/lovable-uploads/85f5bd3c-680e-4957-9722-6bc6070f7d51.png" alt="BC Pressure Washing Logo" className="h-8 w-8 mr-2" />
                          <span>BC Pressure Washing</span>
                        </div>
                      </th>
                      <th className="p-4 border text-center">
                        <div>Shack Shine</div>
                        <div className="text-xs text-gray-500">(National Franchise)</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 border font-medium">Local Ownership</td>
                      <td className="p-4 border text-center bg-green-50">
                        <div className="flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>100% Locally Owned & Operated</span>
                        </div>
                      </td>
                      <td className="p-4 border text-center">
                        <div className="flex items-center justify-center">
                          <svg className="w-6 h-6 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                          <span>Franchise Model</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border font-medium">Quality Priority</td>
                      <td className="p-4 border text-center bg-green-50">
                        <div className="flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>Quality First Approach</span>
                        </div>
                      </td>
                      <td className="p-4 border text-center">
                        <div className="flex items-center justify-center">
                          <svg className="w-6 h-6 text-yellow-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                          </svg>
                          <span>Volume-Based Approach</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border font-medium">Service Time Per Job</td>
                      <td className="p-4 border text-center bg-green-50">
                        <div className="flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>Thorough, Not Rushed</span>
                        </div>
                      </td>
                      <td className="p-4 border text-center">
                        <div className="flex items-center justify-center">
                          <svg className="w-6 h-6 text-yellow-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                          </svg>
                          <span>Often Rushed</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border font-medium">Pricing</td>
                      <td className="p-4 border text-center bg-green-50">
                        <div className="flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>Competitive & Transparent</span>
                        </div>
                      </td>
                      <td className="p-4 border text-center">
                        <div className="flex items-center justify-center">
                          <svg className="w-6 h-6 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                          <span>20-30% Higher</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border font-medium">Owner Involvement</td>
                      <td className="p-4 border text-center bg-green-50">
                        <div className="flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>Owner On-Site for Quality Control</span>
                        </div>
                      </td>
                      <td className="p-4 border text-center">
                        <div className="flex items-center justify-center">
                          <svg className="w-6 h-6 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                          <span>Corporate Structure</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border font-medium">Franchise Fees Added</td>
                      <td className="p-4 border text-center bg-green-50">
                        <div className="flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>No Franchise Fees</span>
                        </div>
                      </td>
                      <td className="p-4 border text-center">
                        <div className="flex items-center justify-center">
                          <svg className="w-6 h-6 text-red-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                          <span>Franchise Fees Included in Price</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border font-medium">Equipment Quality</td>
                      <td className="p-4 border text-center bg-green-50">
                        <div className="flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          <span>Professional-Grade Tools</span>
                        </div>
                      </td>
                      <td className="p-4 border text-center">
                        <div className="flex items-center justify-center">
                          <svg className="w-6 h-6 text-yellow-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                          </svg>
                          <span>Varies by Franchise</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            {/* Our Commitment Section */}
            <section className="mb-16 bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Service Commitment</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  At BC Pressure Washing, we stand firmly behind our work with a simple promise: <strong>we're not satisfied until you're satisfied</strong>. We're not a franchise operation with corporate quotas to meet. We're your neighbors, locally owned and operated, committed to delivering exceptional quality on every job.
                </p>
                <p className="text-gray-600">
                  Our reputation depends on your satisfaction, which is why we take the time to do the job right. We don't rush through jobs to meet daily quotas or maximize volume. Instead, we focus on thorough, careful work that delivers outstanding results every time.
                </p>
                <div className="border-l-4 border-bc-red pl-4 italic text-gray-700 mt-6">
                  "We don't just clean your windows and exterior – we care for your home as if it were our own."
                </div>
              </div>
            </section>
            
            {/* FAQ Section */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Common Questions</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button className="flex justify-between items-center w-full p-4 text-left font-medium bg-gray-50 hover:bg-gray-100">
                    <span>Why are you more affordable than franchise operations?</span>
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </button>
                  <div className="p-4 bg-white">
                    <p className="text-gray-600">
                      As a local business, we don't have the overhead costs of franchise fees, corporate marketing expenses, or multi-layered management. This allows us to offer competitive pricing while maintaining higher quality standards and spending more time on each job. We pass these savings directly to you while delivering superior results.
                    </p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button className="flex justify-between items-center w-full p-4 text-left font-medium bg-gray-50 hover:bg-gray-100">
                    <span>Do you offer price matching?</span>
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </button>
                  <div className="p-4 bg-white">
                    <p className="text-gray-600">
                      We're confident in our pricing structure which reflects the quality of our work. While we may not always be the cheapest option, we provide the best value. That said, we're happy to review competitive quotes and discuss how our services compare. Our focus is on quality and customer satisfaction rather than being the lowest-priced provider.
                    </p>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button className="flex justify-between items-center w-full p-4 text-left font-medium bg-gray-50 hover:bg-gray-100">
                    <span>What if I'm not satisfied with the work?</span>
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </button>
                  <div className="p-4 bg-white">
                    <p className="text-gray-600">
                      We stand behind our work 100%. If you're not completely satisfied with any aspect of our service, simply let us know within 7 days and we'll return to make it right at no additional cost. Our reputation is built on customer satisfaction, and we take that commitment seriously.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          
          <ServiceAreasCarousel />
        </div>
      </div>
      
      <CallToAction 
        title="Ready to Experience the Difference?" 
        subtitle="Contact us today for a free, no-obligation quote and discover why more homeowners choose BC Pressure Washing." 
      />
    </Layout>
  );
};

export default ComparePrices;
