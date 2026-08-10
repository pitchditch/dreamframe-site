import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Camera,
  CheckCircle2,
  Droplets,
  Home,
  Layers3,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Waves,
} from 'lucide-react';
import Layout from '@/components/Layout';
import FAQSection from '@/components/FAQSection';
import CallToAction from '@/components/CallToAction';
import { Button } from '@/components/ui/button';

const serviceOptions = [
  {
    icon: Sparkles,
    title: 'Exterior Window Cleaning',
    description:
      'Purified-water cleaning for exterior glass, including upper-storey windows that can be reached safely from the ground.',
    features: ['Exterior glass', 'Frames rinsed', 'Spot-free finish'],
  },
  {
    icon: Home,
    title: 'Interior & Exterior',
    description:
      'A complete clean for homeowners who want bright glass from both sides and a clearer view throughout the home.',
    features: ['Interior and exterior glass', 'Sills wiped', 'Detailed final inspection'],
  },
  {
    icon: Layers3,
    title: 'Detail Add-ons',
    description:
      'Add the areas that need extra attention without paying for services your property does not need.',
    features: ['Screens', 'Tracks and frames', 'Skylights, doors and railings'],
  },
];

const localChallenges = [
  {
    icon: Waves,
    title: 'Coastal residue',
    description:
      'Ocean air and wind can leave a dull film on exposed glass, especially near Marine Drive and the waterfront.',
  },
  {
    icon: Droplets,
    title: 'Rain and mineral spotting',
    description:
      'Frequent rain, sprinkler overspray and drying minerals can make otherwise clean windows look cloudy.',
  },
  {
    icon: Building2,
    title: 'Large view windows',
    description:
      'White Rock homes often use oversized glass to capture the view, making streaks and missed edges more noticeable.',
  },
];

const neighbourhoods = [
  'Marine Drive',
  'East Beach',
  'West Beach',
  'Five Corners',
  'Uptown White Rock',
  'Centennial Park',
  'Hillside',
  'Semiahmoo',
  'White Rock Beach',
  'South Surrey border',
];

const faqs = [
  {
    question: 'How much does window cleaning cost in White Rock?',
    answer:
      'Pricing depends on the number of windows, storeys, access and whether you want exterior-only or interior-and-exterior cleaning. Enter your address in our quote tool to see pricing options, then Jayden checks the details before the job is confirmed.',
  },
  {
    question: 'Do you clean salt and ocean residue from windows?',
    answer:
      'Yes. We clean the normal salt film, dirt and organic residue that build up on coastal windows. Existing scratches, failed window seals and permanent glass damage cannot be removed through standard cleaning, and we will point those out when visible.',
  },
  {
    question: 'Can you clean upper-storey exterior windows?',
    answer:
      'Yes, when the windows can be reached safely with our professional water-fed pole equipment. Unusual access conditions are reviewed before the appointment so the correct method can be planned.',
  },
  {
    question: 'Do you clean screens, tracks and frames?',
    answer:
      'Yes. Screens, tracks, detailed frame cleaning, glass doors, skylights and glass railings can be selected as add-ons so your quote matches the work you actually need.',
  },
  {
    question: 'Do I need to be home?',
    answer:
      'Not for most exterior-only appointments, provided we have access to the property and an outdoor water source. Interior cleaning requires someone to provide access.',
  },
  {
    question: 'Do you serve businesses and storefronts in White Rock?',
    answer:
      'Yes. We clean storefront and commercial glass and can set up recurring service for businesses that need weekly, biweekly or monthly cleaning.',
  },
];

const WhiteRockWindowCleaning = () => {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Window Cleaning in White Rock, BC',
    serviceType: 'Residential and commercial window cleaning',
    provider: {
      '@type': 'LocalBusiness',
      name: 'BC Pressure Washing',
      telephone: '+1-778-808-7620',
      url: 'https://www.bcpressurewashing.ca',
      areaServed: {
        '@type': 'City',
        name: 'White Rock',
      },
    },
    areaServed: [
      { '@type': 'City', name: 'White Rock' },
      { '@type': 'Place', name: 'South Surrey' },
    ],
    url: 'https://www.bcpressurewashing.ca/white-rock-window-cleaning',
  };

  return (
    <Layout
      title="Window Cleaning White Rock, BC | Instant Quote"
      description="Professional window cleaning in White Rock for homes, condos and storefronts. Exterior or inside-and-out options, owner-checked quotes and easy online pricing."
      canonicalUrl="/white-rock-window-cleaning"
      image="/lovable-uploads/f7abf414-3ad9-4c10-a077-7cbb8881d937.png"
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <section className="relative isolate min-h-[720px] overflow-hidden bg-slate-950 pt-28 md:min-h-[760px] md:pt-32">
        <img
          src="/lovable-uploads/f7abf414-3ad9-4c10-a077-7cbb8881d937.png"
          alt="Professional exterior window cleaning on a White Rock home"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20" />

        <div className="container mx-auto flex min-h-[590px] items-center px-4 pb-16 md:pb-20">
          <div className="max-w-3xl text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <MapPin className="h-4 w-4 text-bc-red" />
              Locally owned in White Rock
            </div>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
              Window Cleaning in White Rock, BC
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100 md:text-2xl">
              Clear the salt film, rain marks and everyday buildup from your view with professional exterior or inside-and-out window cleaning.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="bc-red" className="h-14 px-7 text-base font-bold">
                <Link to="/calculator">
                  Check Prices & Availability
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 border-white bg-white/10 px-7 text-base font-bold text-white backdrop-blur hover:bg-white hover:text-slate-950"
              >
                <a href="tel:+17788087620">
                  <Phone className="mr-2 h-5 w-5" />
                  778-808-7620
                </a>
              </Button>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 text-sm sm:grid-cols-3">
              {[
                ['Fully insured & WCB', ShieldCheck],
                ['Owner-checked work', BadgeCheck],
                ['Before-and-after photos', Camera],
              ].map(([label, Icon]) => (
                <div key={label as string} className="flex items-center gap-2 font-semibold text-slate-100">
                  <Icon className="h-5 w-5 text-bc-red" />
                  <span>{label as string}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-8 px-4 md:-mt-10">
        <div className="container mx-auto grid overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-3">
          {[
            ['1', 'Enter your address', 'Start with your property so the quote is tied to the correct home.'],
            ['2', 'Choose what gets cleaned', 'Select exterior-only, inside-and-out and any detail add-ons.'],
            ['3', 'Jayden checks the quote', 'The details are reviewed before your appointment is finalized.'],
          ].map(([number, title, description], index) => (
            <div
              key={number}
              className={`p-6 md:p-8 ${index < 2 ? 'border-b border-slate-200 md:border-b-0 md:border-r' : ''}`}
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bc-red font-black text-white">
                  {number}
                </span>
                <h2 className="text-lg font-bold text-slate-950">{title}</h2>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-bc-red">Choose the right clean</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
              Window cleaning options for White Rock properties
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Build the service around your property instead of paying for a one-size-fits-all package.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {serviceOptions.map(({ icon: Icon, title, description, features }) => (
              <article
                key={title}
                className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-bc-red">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-black text-slate-950">{title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{description}</p>
                <ul className="mt-6 space-y-3">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 font-semibold text-slate-800">
                      <CheckCircle2 className="h-5 w-5 flex-none text-bc-red" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild size="lg" variant="bc-red" className="h-13 px-7 font-bold">
              <Link to="/calculator">
                Build My Window Cleaning Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-slate-950 py-20 text-white md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-bc-red">Built for the coast</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                White Rock glass faces different conditions
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-300">
                Waterfront wind, frequent rain and large view windows make consistent technique and careful detailing matter more here.
              </p>

              <div className="mt-9 space-y-6">
                {localChallenges.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-white/10 text-bc-red">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{title}</h3>
                      <p className="mt-1 leading-relaxed text-slate-300">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-5 rounded-3xl bg-bc-red/20 blur-3xl" />
              <img
                src="/lovable-uploads/4a9921b9-2dd2-42b8-ade9-61bbeeb18898.png"
                alt="Window cleaning equipment producing a clear streak-free finish"
                className="relative aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl"
              />
              <div className="relative mx-5 -mt-8 rounded-xl border border-white/10 bg-white p-5 text-slate-950 shadow-xl md:mx-8">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-6 w-6 flex-none text-bc-red" />
                  <div>
                    <p className="font-black">Property-specific access review</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      Storeys, slopes, balconies and restricted access are considered before the appointment—not after arrival.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-bc-red">Local coverage</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
                Serving all of White Rock
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                From ocean-facing homes to uptown condos and storefronts, we quote each property based on its real window count and access.
              </p>
              <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex gap-3">
                  <MapPin className="h-6 w-6 flex-none text-bc-red" />
                  <div>
                    <p className="font-black text-slate-950">White Rock and nearby South Surrey</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      Unsure whether your address is covered? Enter it in the quote tool and the service area is checked automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {neighbourhoods.map((area) => (
                <div
                  key={area}
                  className="flex min-h-24 items-center justify-center rounded-xl border border-slate-200 bg-white p-4 text-center font-bold text-slate-800 shadow-sm"
                >
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-bc-red shadow-2xl">
            <div className="grid items-center lg:grid-cols-[1.15fr_0.85fr]">
              <div className="p-8 text-white md:p-12">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-white/75">Fast, clear quoting</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
                  See pricing without booking an estimate visit
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90">
                  Enter your White Rock address, select the cleaning options you need and submit the property details for owner review.
                </p>
                <Button asChild size="lg" className="mt-8 h-14 bg-white px-7 font-black text-bc-red hover:bg-slate-100">
                  <Link to="/calculator">
                    Check My Address
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="h-full min-h-72">
                <img
                  src="/lovable-uploads/302cbdcc-ad2e-496b-bb73-502eb77f353a.png"
                  alt="White Rock waterfront and local service area"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection
        title="White Rock Window Cleaning FAQ"
        subtitle="Straight answers about pricing, access and what is included"
        faqs={faqs}
      />

      <CallToAction
        title="Ready for Clearer Windows in White Rock?"
        subtitle="Check pricing online or call Jayden to discuss your property."
        backgroundImage="/lovable-uploads/26f6a625-a200-4106-8f94-579be5c566b6.png"
      />
    </Layout>
  );
};

export default WhiteRockWindowCleaning;
