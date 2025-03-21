
import Layout from '@/components/Layout';
import PricingCard from '@/components/PricingCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import PriceCalculatorForm from '@/components/PriceCalculator/PriceCalculatorForm';

const Subscription = () => {
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
    <Layout hidePriceBanner>
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

        <div className="max-w-4xl mx-auto mb-16 bg-gray-50 rounded-lg shadow-sm p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Price Calculator</h2>
            <p className="text-gray-600">
              Get an instant estimate for your service needs using our step-by-step calculator.
            </p>
          </div>
          
          <PriceCalculatorForm />
        </div>

        <div className="max-w-3xl mx-auto">
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
    </Layout>
  );
};

export default Subscription;
