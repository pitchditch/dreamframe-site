
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, Droplets, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const SoftWashingVsPressureSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Droplets className="h-8 w-8 text-blue-600" />
            <span className="text-4xl">🧼</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Soft Washing vs. Pressure Washing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            What's the Difference – and Why It Matters for Your Home
          </p>
          <p className="text-lg text-gray-700 mt-4 max-w-4xl mx-auto">
            Not all exterior cleaning is created equal. At BC Pressure Washing, we use both soft washing and pressure washing depending on the surface and level of grime. Here's how they differ:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Soft Washing Card */}
          <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Droplets className="h-8 w-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Soft Washing</h3>
                <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                  Gentle & Effective
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Ideal for:</span>
                  </div>
                  <p className="text-gray-700 ml-7">Siding, roofs, painted surfaces, vinyl, and wood</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Method:</span>
                  </div>
                  <p className="text-gray-700 ml-7">Low-pressure rinse + eco-safe cleaning solution</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Purpose:</span>
                  </div>
                  <p className="text-gray-700 ml-7">Kills mold, algae, mildew, and organic buildup</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Won't damage:</span>
                  </div>
                  <p className="text-gray-700 ml-7">Paint, shingles, or delicate finishes</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  We always use soft washing on roofs and home exteriors to preserve materials and deliver long-lasting results.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Pressure Washing Card */}
          <Card className="border-2 border-orange-200 hover:border-orange-300 transition-colors">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="h-8 w-8 text-orange-600" />
                <h3 className="text-2xl font-bold text-gray-900">Pressure Washing</h3>
                <span className="text-sm bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-medium">
                  Powerful & Deep Cleaning
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Ideal for:</span>
                  </div>
                  <p className="text-gray-700 ml-7">Concrete driveways, patios, pavers, decks</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Method:</span>
                  </div>
                  <p className="text-gray-700 ml-7">High-pressure water spray</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-gray-900">Purpose:</span>
                  </div>
                  <p className="text-gray-700 ml-7">Removes tough dirt, grease, moss, and surface stains</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span className="font-semibold text-gray-900">Used with caution:</span>
                  </div>
                  <p className="text-gray-700 ml-7">Only where safe for hard surfaces</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-800 font-medium">
                  Our team uses commercial-grade surface cleaners to make your driveway look brand new — without striping or damage.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Which Is Right Section */}
        <div className="text-center bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <h3 className="text-2xl font-bold text-gray-900">Which Is Right for You?</h3>
          </div>
          <p className="text-lg text-gray-700 mb-6">
            Don't worry — we assess every job personally to choose the right method. That's why every job is inspected by Jayden, the owner himself.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/calculator">
                🔎 Get Free Estimate
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Link to="/services/pressure-washing">
                Learn More About Our Methods
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoftWashingVsPressureSection;
