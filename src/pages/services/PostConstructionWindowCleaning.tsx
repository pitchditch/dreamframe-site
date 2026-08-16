import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Building2, CheckCircle2, MapPin } from 'lucide-react';
import Layout from '../../components/Layout';
import HeroSection from '@/components/post-construction/HeroSection';
import BenefitsSection from '@/components/post-construction/BenefitsSection';
import BeforeAfterSection from '@/components/post-construction/BeforeAfterSection';
import BookingSection from '@/components/post-construction/BookingSection';
import FAQSection from '@/components/post-construction/FAQSection';
import CTABanner from '@/components/home/CTABanner';
import LocationBanner from '@/components/LocationBanner';

const serviceAreas = ['Surrey', 'White Rock', 'Langley', 'Delta', 'Vancouver'];

const PostConstructionWindowCleaning: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Post-Construction Window Cleaning',
    serviceType: 'Post-construction and renovation window cleaning',
    provider: {
      '@type': 'LocalBusiness',
      name: 'BC Pressure Washing',
      url: 'https://www.bcpressurewashing.ca',
      telephone: '+1-778-808-7620',
    },
    areaServed: serviceAreas.map((city) => ({ '@type': 'City', name: city })),
    url: 'https://www.bcpressurewashing.ca/post-construction-window-cleaning',
  };

  return (
    <Layout
      title="Post-Construction Window Cleaning Surrey, White Rock & Langley | BC Pressure Washing"
      description="Post-construction window cleaning for new builds and renovations in Surrey, White Rock, Langley, Delta and Vancouver. Remove stickers, silicone, paint, drywall dust and construction residue safely."
      canonicalUrl="/post-construction-window-cleaning"
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <HeroSection />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-bc-red font-semibold uppercase tracking-wide mb-2">New Builds & Renovations</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Post-Construction Window Cleaning Across the Lower Mainland</h2>
            <p className="text-lg text-gray-600">
              Construction leaves more than ordinary dust behind. We clean finished glass, frames and accessible tracks after new builds, renovations and tenant improvements so the windows are presentation-ready for homeowners, builders and property managers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-gray-50 border rounded-xl p-6 md:p-8">
              <Building2 className="w-8 h-8 text-bc-red mb-4" />
              <h3 className="text-2xl font-bold mb-4">Construction Residue We Remove</h3>
              <div className="space-y-3">
                {[
                  'Builder stickers, labels and adhesive residue',
                  'Paint specks and light overspray',
                  'Silicone and caulking residue',
                  'Drywall dust and fine construction debris',
                  'Protective-film adhesive and tape marks',
                  'Dust and residue on accessible frames, sills and tracks',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border rounded-xl p-6 md:p-8">
              <MapPin className="w-8 h-8 text-bc-red mb-4" />
              <h3 className="text-2xl font-bold mb-4">Local Service Areas</h3>
              <p className="text-gray-600 mb-5">
                We provide post-construction window cleaning throughout Surrey, White Rock, Langley, Delta and Vancouver for residential and commercial projects.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {serviceAreas.map((city) => (
                  <div key={city} className="bg-white border rounded-lg px-4 py-3 font-medium text-center">
                    {city}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 border-l-4 border-bc-red bg-red-50/50 p-6 rounded-r-xl">
            <h2 className="text-2xl font-bold mb-3">Post-Construction Window Cleaning in Surrey, White Rock & Langley</h2>
            <p className="text-gray-700 leading-relaxed">
              If you are searching for post-construction window cleaning in Surrey, construction window cleaning in White Rock, or new-build window cleaning in Langley, this service is specifically designed for the residue left after construction and renovation work—not just routine window maintenance.
            </p>
          </div>
        </div>
      </section>

      <BenefitsSection />
      <BeforeAfterSection />
      <FAQSection />
      <BookingSection />
      <CTABanner />
      <LocationBanner />
    </Layout>
  );
};

export default PostConstructionWindowCleaning;
