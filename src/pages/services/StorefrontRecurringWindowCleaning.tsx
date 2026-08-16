import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Building2, CalendarDays, CheckCircle2, Clock3, MapPin, Sparkles } from 'lucide-react';
import Layout from '../../components/Layout';
import ServiceHeader from '@/components/ServiceHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const serviceAreas = [
  'White Rock',
  'Surrey',
  'Langley',
  'Delta',
  'Vancouver',
];

const schedules = [
  {
    name: 'Weekly',
    description: 'Best for busy restaurants, cafés, retail shops and high-traffic storefronts that need consistently clear glass.',
  },
  {
    name: 'Bi-Weekly',
    description: 'A strong fit for most retail and professional storefronts that want reliable upkeep without over-servicing.',
  },
  {
    name: 'Monthly',
    description: 'Ideal for lower-traffic locations that still need a polished, professional appearance on a predictable schedule.',
  },
];

const StorefrontRecurringWindowCleaning = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Storefront Window Cleaning',
    serviceType: 'Recurring storefront and commercial window cleaning',
    provider: {
      '@type': 'LocalBusiness',
      name: 'BC Pressure Washing',
      url: 'https://www.bcpressurewashing.ca',
      telephone: '+1-778-808-7620',
    },
    areaServed: serviceAreas.map((city) => ({ '@type': 'City', name: city })),
    url: 'https://www.bcpressurewashing.ca/storefront-window-cleaning',
  };

  return (
    <Layout
      title="Storefront Window Cleaning Surrey, White Rock & Langley | BC Pressure Washing"
      description="Recurring storefront window cleaning for businesses in Surrey, White Rock, Langley, Delta and Vancouver. Weekly, bi-weekly and monthly service with flexible scheduling."
      canonicalUrl="/storefront-window-cleaning"
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <ServiceHeader
        title="Recurring Storefront Window Cleaning"
        description="Professional storefront window cleaning for Surrey, White Rock, Langley, Delta and Vancouver businesses—with weekly, bi-weekly and monthly schedules built around your hours."
        imagePath="/lovable-uploads/598eb62a-290d-41ec-8c69-abae60a5a757.png"
        icon={<Building2 size={36} />}
        showButton={false}
        darkOverlay={true}
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-bc-red font-semibold uppercase tracking-wide mb-2">Commercial Window Maintenance</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Keep Your Storefront Clean Without Rebooking Every Time</h2>
            <p className="text-lg text-gray-600">
              We maintain exterior and accessible interior storefront glass on a recurring schedule so your entrance, display windows and doors stay clean throughout the month.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {schedules.map((schedule) => (
              <Card key={schedule.name} className="h-full shadow-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <CalendarDays className="w-8 h-8 text-bc-red mb-4" />
                  <h3 className="text-2xl font-bold mb-3">{schedule.name} Service</h3>
                  <p className="text-gray-600">{schedule.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-5">Storefront Window Cleaning Built Around Business Hours</h2>
              <p className="text-gray-600 text-lg mb-6">
                Recurring commercial cleaning should be easy to manage. We can schedule service before opening, during quieter periods or after business hours when practical.
              </p>
              <div className="space-y-4">
                {[
                  'Exterior storefront glass and entrance doors',
                  'Interior glass by request',
                  'Frames, edges and accessible sills',
                  'Spot and fingerprint removal on high-touch glass',
                  'Flexible recurring schedules for single or multiple locations',
                  'Reliable service for retail, restaurants, cafés, offices and showrooms',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="shadow-lg">
              <CardContent className="p-7">
                <Clock3 className="w-8 h-8 text-bc-red mb-4" />
                <h3 className="text-2xl font-bold mb-3">Need a Custom Frequency?</h3>
                <p className="text-gray-600 mb-5">
                  Seasonal, twice-monthly and custom commercial schedules are available when weekly, bi-weekly or monthly service does not fit your location.
                </p>
                <Button asChild className="bg-bc-red hover:bg-red-700 text-white w-full">
                  <Link to="/calculator">Get a Storefront Quote</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <MapPin className="w-8 h-8 text-bc-red mx-auto mb-3" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Storefront Window Cleaning Service Areas</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We serve storefronts and commercial properties throughout the Lower Mainland, with a focus on Surrey, White Rock and Langley.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {serviceAreas.map((city) => (
              <div key={city} className="border rounded-lg p-5 text-center bg-gray-50">
                <Sparkles className="w-5 h-5 text-bc-red mx-auto mb-2" />
                <h3 className="font-bold">{city}</h3>
                <p className="text-sm text-gray-600 mt-1">Storefront window cleaning</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gray-50 border rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-3">Local Commercial Search Coverage</h2>
            <p className="text-gray-700 leading-relaxed">
              Looking for storefront window cleaning in Surrey, storefront window cleaning in White Rock, or commercial window cleaning in Langley? BC Pressure Washing provides recurring glass cleaning for customer-facing businesses across these markets, along with Delta and Vancouver.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-950 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Set Up Recurring Storefront Cleaning</h2>
          <p className="text-gray-300 text-lg mb-7">
            Tell us where your business is, how much glass you have and how often you want service. We’ll recommend a practical cleaning schedule.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-white">
              <Link to="/calculator">Check Pricing & Availability</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              <a href="tel:7788087620">Call (778) 808-7620</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StorefrontRecurringWindowCleaning;
