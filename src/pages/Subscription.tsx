
import { useState } from 'react';
import Layout from '@/components/Layout';
import PricingCard from '@/components/PricingCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Percent, Calendar, Tag, ShieldCheck } from 'lucide-react';

const Subscription = () => {
  const [distance, setDistance] = useState<number>(0);
  const gasCost = Math.ceil(distance / 100) * 20;

  const monthlyFeatures = [
    { text: "Professional window cleaning", included: true },
    { text: "30-day service guarantee", included: true },
    { text: "Consistent monthly scheduling", included: true },
    { text: "Priority scheduling", included: true },
    { text: "Glue/tape removal (+$25)", included: false },
    { text: "First month deep cleaning (+$25)", included: false },
  ];

  const yearlyFeatures = [
    { text: "Professional window cleaning", included: true },
    { text: "30-day service guarantee", included: true },
    { text: "Consistent monthly scheduling", included: true },
    { text: "Priority scheduling", included: true },
    { text: "One free deep cleaning session", included: true },
    { text: "10% discount on additional services", included: true },
  ];

  const premiumFeatures = [
    { text: "Professional window cleaning", included: true },
    { text: "30-day service guarantee", included: true },
    { text: "Consistent monthly scheduling", included: true },
    { text: "Priority scheduling", included: true },
    { text: "Glue/tape removal included", included: true },
    { text: "Quarterly deep cleaning included", included: true },
    { text: "15% discount on additional services", included: true },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="badge-pill mx-auto w-fit">Maintenance Plans</div>
          <h1 className="text-4xl font-bold mt-4 mb-4">Maintenance Subscriptions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Keep your storefront windows spotless year-round with our professional maintenance plans. 
            Choose the option that works best for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="animate-on-scroll">
            <PricingCard
              title="Monthly Plan"
              subtitle="Perfect for small storefronts"
              price="$50/month"
              features={monthlyFeatures}
              link="/contact?plan=monthly"
              buttonText="Subscribe Monthly"
            />
          </div>
          <div className="animate-on-scroll">
            <PricingCard
              title="Annual Plan"
              subtitle="Save $120 with yearly billing"
              price="$600/year"
              features={yearlyFeatures}
              popular={true}
              link="/contact?plan=yearly"
              buttonText="Subscribe Yearly"
            />
          </div>
          <div className="animate-on-scroll">
            <PricingCard
              title="Premium Plan"
              subtitle="All-inclusive maintenance"
              price="$75/month"
              features={premiumFeatures}
              link="/contact?plan=premium"
              buttonText="Get Premium"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="shadow-md mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="text-bc-red" /> Gas Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                We charge $20 per 100 km of travel distance. Calculate your additional gas cost below:
              </p>
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="w-full md:w-2/3">
                  <Label htmlFor="distance" className="mb-2 block">Distance (kilometers)</Label>
                  <Input 
                    id="distance" 
                    type="number" 
                    min="0"
                    placeholder="Enter travel distance" 
                    value={distance || ""}
                    onChange={(e) => setDistance(Number(e.target.value))}
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <Button 
                    className="w-full bg-bc-red hover:bg-red-700"
                    onClick={() => setDistance(0)}
                  >
                    Reset
                  </Button>
                </div>
              </div>
              {distance > 0 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <p className="font-semibold">Estimated gas cost: <span className="text-bc-red">${gasCost}</span></p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="text-bc-red" /> Add-on Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-red-100 p-1 rounded-full mr-3 mt-1">
                      <Percent size={16} className="text-bc-red" />
                    </div>
                    <div>
                      <p className="font-semibold">Glue/Tape Removal</p>
                      <p className="text-gray-600">$25 additional fee</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-red-100 p-1 rounded-full mr-3 mt-1">
                      <Calendar size={16} className="text-bc-red" />
                    </div>
                    <div>
                      <p className="font-semibold">First Month Deep Cleaning</p>
                      <p className="text-gray-600">$25 additional fee for initial thorough cleaning</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="text-bc-red" /> Our Guarantee
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  We're committed to providing reliable, high-quality service for your business:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-red-100 p-1 rounded-full mr-3 mt-0.5">
                      <ShieldCheck size={16} className="text-bc-red" />
                    </div>
                    <p>Guaranteed monthly service</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-red-100 p-1 rounded-full mr-3 mt-0.5">
                      <ShieldCheck size={16} className="text-bc-red" />
                    </div>
                    <p>Satisfaction guarantee or we'll return to fix any issues</p>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-red-100 p-1 rounded-full mr-3 mt-0.5">
                      <ShieldCheck size={16} className="text-bc-red" />
                    </div>
                    <p>Consistent scheduling with advance reminders</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Subscription;
