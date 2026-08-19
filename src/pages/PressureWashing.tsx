import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { AddressAutocomplete } from '@/components/AddressAutocomplete';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowRight,
  Building2,
  Camera,
  Car,
  CheckCircle2,
  Droplets,
  Gauge,
  Home,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import FAQSection from '../components/FAQSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CallToAction from '../components/CallToAction';

const services = [
  {
    title: 'Driveways & Concrete',
    description: 'Lift built-up grime, tire marks, organic growth and surface staining from concrete driveways and walkways.',
    icon: Car,
    href: '/calculator?source=pressure-washing-page&campaign=driveways-concrete',
    cta: 'Price driveway cleaning',
  },
  {
    title: 'Patios, Pavers & Paths',
    description: 'Restore high-traffic outdoor surfaces using the correct pressure, nozzle and cleaning pattern for the material.',
    icon: Sparkles,
    href: '/calculator?source=pressure-washing-page&campaign=patios-pavers-paths',
    cta: 'Price patio cleaning',
  },
  {
    title: 'House Soft Washing',
    description: 'Safely clean siding, stucco and painted exteriors with low pressure instead of blasting delicate surfaces.',
    icon: Home,
    href: '/services/house-washing',
    cta: 'View house washing',
  },
  {
    title: 'Commercial Surfaces',
    description: 'Professional exterior cleaning for storefronts, entries, sidewalks, loading areas and other commercial surfaces.',
    icon: Building2,
    href: '/services/commercial-pressure-washing',
    cta: 'View commercial cleaning',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Property Assessment',
    description: 'We inspect the surface, drainage, nearby landscaping and any areas that need special protection.',
  },
  {
    number: '02',
    title: 'Preparation & Treatment',
    description: 'We move light items, protect sensitive areas and apply the appropriate pre-treatment where needed.',
  },
  {
    number: '03',
    title: 'Professional Cleaning',
    description: 'We use surface cleaners, controlled pressure or soft washing based on the material being cleaned.',
  },
  {
    number: '04',
    title: 'Final Rinse & Review',
    description: 'The area is rinsed, checked by the owner and documented with before-and-after photos.',
  },
];

const faqs = [
  {
    question: 'What surfaces can you pressure wash?',
    answer: 'Pressure washing is best suited to durable hard surfaces such as concrete driveways, walkways, patios and some pavers. We assess each surface before cleaning and use lower pressure or soft washing where high pressure could cause damage.',
  },
  {
    question: 'Do you pressure wash house siding?',
    answer: 'We normally soft wash house siding rather than using high pressure. Soft washing combines controlled low pressure with the correct cleaning solution to remove organic growth without forcing water behind siding or damaging finishes.',
  },
  {
    question: 'Will pressure washing remove every stain?',
    answer: 'Most dirt, organic growth and surface buildup can be significantly improved. Deep oil, rust, paint, fertilizer or permanent discolouration may require specialty treatment and cannot always be removed completely. We will identify those limitations before work begins.',
  },
  {
    question: 'Do I need to be home during the service?',
    answer: 'Usually not. We need access to the work area and an exterior water supply. We can confirm the scope remotely and send before-and-after photos when the job is complete.',
  },
  {
    question: 'How is pressure washing priced?',
    answer: 'Driveway pressure washing starts from $350. Final pricing depends on the surface type, total area, buildup, access and any specialty treatment required. Instant pricing is available for many residential properties through our online quote tool.',
  },
  {
    question: 'Are you insured?',
    answer: 'Yes. BC Pressure Washing is fully insured, and each project is reviewed to ensure the correct cleaning method is used for the property.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Pressure Washing',
  serviceType: 'Pressure washing and exterior surface cleaning',
  url: 'https://www.bcpressurewashing.ca/services/pressure-washing',
  description: 'Professional pressure washing for driveways, patios, walkways and durable exterior surfaces in Surrey, White Rock and Metro Vancouver.',
  provider: {
    '@type': 'LocalBusiness',
    name: 'BC Pressure Washing',
    url: 'https://www.bcpressurewashing.ca',
    telephone: '+1-778-808-7620',
  },
  areaServed: [
    { '@type': 'City', name: 'Surrey' },
    { '@type': 'City', name: 'White Rock' },
    { '@type': 'AdministrativeArea', name: 'Metro Vancouver' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.bcpressurewashing.ca/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Services',
      item: 'https://www.bcpressurewashing.ca/services',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Pressure Washing',
      item: 'https://www.bcpressurewashing.ca/services/pressure-washing',
    },
  ],
};

const PressureWashing = () => {
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState('');

  const goToInstantQuote = () => {
    const params = new URLSearchParams({
      source: 'pressure-washing-page',
      campaign: 'hero-instant-quote',
    });

    if (selectedAddress) {
      params.set('address', selectedAddress);
    }

    navigate(`/calculator?${params.toString()}`);
  };

  return (
    <Layout
      title="Pressure Washing Surrey & White Rock, BC | Driveways & Patios"
      description="Professional pressure washing in Surrey, White Rock and Metro Vancouver for driveways, patios, walkways and exterior surfaces. Fully insured, owner-checked results."
      image="/lovable-uploads/4bc56646-a50c-4c86-aeeb-997bd1c1c579.png"
      canonicalUrl="/services/pressure-washing"
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <section className="relative min-h-[78vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/lovable-uploads/4bc56646-a50c-4c86-aeeb-997bd1c1c579.png')",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />

        <div className="relative z-10 container mx-auto px-4 py-24 md:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm mb-5">
              <ShieldCheck className="h-4 w-4 text-green-400" />
              Fully Insured · Owner-Checked Exterior Cleaning
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
              Pressure Washing in Surrey & White Rock
            </h1>

            <p className="text-lg md:text-2xl text-gray-100 leading-relaxed max-w-3xl mb-5">
              Restore driveways, patios, walkways and exterior surfaces with the right pressure for the material—not maximum pressure on everything.
            </p>

            <div className="inline-flex items-baseline gap-2 rounded-xl border border-white/15 bg-black/35 px-4 py-3 text-white backdrop-blur-sm mb-6">
              <span className="text-sm uppercase tracking-wide text-gray-300">Driveway cleaning</span>
              <span className="text-2xl font-black">From $350</span>
            </div>

            <div className="max-w-2xl rounded-2xl border border-white/15 bg-white/95 p-3 sm:p-4 shadow-2xl mb-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <AddressAutocomplete
                  className="flex-1"
                  placeholder="Enter your service address"
                  onAddressSelect={(address) => setSelectedAddress(address.formatted_address)}
                />
                <Button
                  size="lg"
                  variant="bc-red"
                  className="min-h-11 px-6 font-semibold whitespace-nowrap"
                  onClick={goToInstantQuote}
                >
                  Get Instant Price
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <p className="mt-2 px-1 text-xs text-gray-600">No obligation. Your address carries into the quote calculator automatically.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button asChild size="lg" variant="outline" className="min-h-12 border-white/60 bg-black/20 px-7 text-base text-white hover:bg-white hover:text-gray-950">
                <a href="tel:7788087620">
                  <Phone className="mr-2 h-5 w-5" />
                  Call 778-808-7620
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-h-12 border-white/30 bg-white/10 px-7 text-base text-white hover:bg-white hover:text-gray-950">
                <Link to="/calculator?source=pressure-washing-page&campaign=hero-secondary">Quote Without Address</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-white">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                Surface-Safe Methods
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                Before/After Photos
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                Local Metro Vancouver Service
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-bc-red font-semibold tracking-wide uppercase text-sm">Exterior Cleaning Services</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-950 mt-3 mb-5">
              The Right Cleaning Method for Every Surface
            </h2>
            <p className="text-lg text-gray-600">
              Each surface is assessed first, then cleaned with controlled pressure, soft washing or a professional surface cleaner.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {services.map(({ title, description, icon: Icon, href, cta }) => (
              <Link key={title} to={href} className="group block h-full rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-bc-red focus-visible:ring-offset-2">
                <Card className="h-full border-gray-200 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-5">
                      <Icon className="h-6 w-6 text-bc-red" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-950 mb-3">{title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-5 flex-1">{description}</p>
                    <span className="inline-flex items-center font-semibold text-bc-red">
                      {cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-950 text-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="relative">
              <img
                src="/lovable-uploads/1506ac4e-54db-4e14-b30f-42311bfee2be.png"
                alt="Professional exterior house washing service in Metro Vancouver"
                className="w-full aspect-[4/3] object-cover rounded-2xl shadow-2xl"
                loading="lazy"
              />
              <div className="absolute -bottom-5 left-5 right-5 sm:left-auto sm:right-5 sm:w-64 rounded-xl border border-white/15 bg-black/80 p-4 backdrop-blur-md shadow-xl">
                <div className="flex items-center gap-3">
                  <Camera className="h-8 w-8 text-bc-red" />
                  <div>
                    <p className="font-bold">Photo-Documented</p>
                    <p className="text-sm text-gray-300">Before and after every job</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-red-400 font-semibold tracking-wide uppercase text-sm">Professional From Start to Finish</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-6">More Than Just Spraying Water</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Good exterior cleaning comes from preparation, correct chemistry, controlled pressure and careful rinsing—not simply using the strongest machine available.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-red-500/15 p-2 mt-0.5">
                    <Gauge className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Pressure Matched to the Surface</h3>
                    <p className="text-gray-400">Concrete, pavers, siding and painted surfaces are not treated the same way.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-red-500/15 p-2 mt-0.5">
                    <Droplets className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Pre-Treatment and Even Cleaning</h3>
                    <p className="text-gray-400">Professional surface-cleaning equipment helps reduce striping and produces a more uniform finish.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-red-500/15 p-2 mt-0.5">
                    <ShieldCheck className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Property Protection</h3>
                    <p className="text-gray-400">Sensitive areas, landscaping and nearby finishes are considered before cleaning begins.</p>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" variant="bc-red" className="mt-9 min-h-12 px-7">
                <Link to="/calculator?source=pressure-washing-page&campaign=results-section">Check Price & Availability</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-950 mb-4">Pressure Washing vs. Soft Washing</h2>
            <p className="text-lg text-gray-600">Both methods are useful. The surface determines which one should be used.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-gray-200 shadow-md">
              <CardContent className="p-7 md:p-9">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-5">
                  <Gauge className="h-6 w-6 text-orange-700" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Pressure Washing</h3>
                <p className="text-gray-600 mb-6">Best for durable hard surfaces that can safely handle mechanical cleaning force.</p>
                <ul className="space-y-3 text-gray-700">
                  {['Concrete driveways', 'Walkways and patios', 'Selected pavers and hardscapes', 'Commercial flatwork'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 shadow-md">
              <CardContent className="p-7 md:p-9">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                  <Droplets className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Soft Washing</h3>
                <p className="text-gray-600 mb-6">Best for delicate exterior materials where high pressure could damage finishes or force water into the building envelope.</p>
                <ul className="space-y-3 text-gray-700">
                  {['Vinyl and painted siding', 'Stucco and delicate finishes', 'Home exterior washing', 'Organic staining and growth'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-bc-red font-semibold tracking-wide uppercase text-sm">What to Expect</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-950 mt-3 mb-4">Our Exterior Cleaning Process</h2>
            <p className="text-lg text-gray-600">A clear process protects your property and produces a cleaner, more consistent result.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {processSteps.map((step) => (
              <div key={step.number} className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="text-5xl font-black text-red-100 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-gray-950 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="px-4 py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-gray-950 to-gray-800 px-6 py-10 md:px-12 md:py-12 text-white shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-3xl">
              <p className="text-red-400 font-semibold uppercase tracking-wide text-sm mb-3">Scheduled Home Care</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Keep the Exterior Clean Without Starting Over Every Year</h2>
              <p className="text-gray-300 text-lg">Bundle pressure washing with window, gutter, soft-wash and roof care through a personalized home maintenance plan.</p>
            </div>
            <Button asChild size="lg" variant="bc-red" className="min-h-12 px-7 flex-shrink-0">
              <Link to="/maintenance-memberships">
                View Maintenance Plans
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <FAQSection
        title="Pressure Washing Frequently Asked Questions"
        subtitle="Answers about surfaces, methods, pricing and what to expect on service day"
        faqs={faqs}
      />

      <CallToAction
        title="Ready to Restore Your Driveway or Exterior?"
        subtitle="Get instant pricing for professional pressure washing in Surrey, White Rock and Metro Vancouver."
        backgroundImage="/lovable-uploads/4bc56646-a50c-4c86-aeeb-997bd1c1c579.png"
      />
    </Layout>
  );
};

export default PressureWashing;
