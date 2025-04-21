
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import ServiceAreaMap from '@/components/ServiceAreaMap';

const RoofCleaning = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout image="/roof-cleaning.jpg">
      <Helmet>
        <title>Roof Soft Washing Surrey & White Rock | Safe & Effective Moss Removal</title>
        <meta name="description" content="Safe and effective roof cleaning with soft wash system in Surrey & White Rock. Remove moss, algae, and grime without damaging your shingles. Fully insured." />
        <meta name="keywords" content="roof cleaning Surrey, soft wash roof White Rock, moss removal, safe roof washing, roof maintenance" />
      </Helmet>

      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Roof Soft Washing in Surrey & White Rock</h1>
        <p className="text-lg mb-6 text-center max-w-3xl mx-auto">
          Don’t let moss, algae, or grime damage your roof or shorten its lifespan. Our soft wash roof cleaning method uses low-pressure and eco-safe solutions to gently remove buildup without harming your shingles.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mt-10">
          <div>
            <h2 className="text-2xl font-semibold mb-3">What We Remove:</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Moss and algae growth</li>
              <li>Black streaks and organic staining</li>
              <li>Dirt, debris, and roof grime</li>
              <li>Gutter edge mold (optional add-on)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Why Soft Wash?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Low pressure protects roof shingles</li>
              <li>Eco-friendly sodium hypochlorite solution</li>
              <li>Extends the life of your roof</li>
              <li>No damage, guaranteed</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Why Choose BC Pressure Washing?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            We're fully insured, locally trusted, and every roof is personally checked by Jayden Fisher after the job is done. Serving Surrey, White Rock, and surrounding communities.
          </p>
          <Button size="lg" className="text-lg px-8 py-4">Request a Roof Cleaning Estimate</Button>
        </div>
      </section>

      <section className="w-full py-12 flex flex-col items-center bg-white">
        <div className="w-full max-w-4xl mx-auto relative">
          <div className="absolute top-3 left-0 w-full flex justify-center z-10 pointer-events-none">
            <div className="bg-bc-red text-white rounded-lg px-6 py-3 text-lg font-semibold shadow-lg shadow-bc-red/10 border-2 border-yellow-400 max-w-lg mx-auto">
              Proudly serving Surrey, White Rock & Nearby Communities
            </div>
          </div>
          <div className="pt-14 pb-2">
            <ServiceAreaMap />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RoofCleaning;
