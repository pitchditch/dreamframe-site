import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock,
  Droplets,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react';
import FAQSection from '../components/FAQSection';

const vehicleTypes = [
  {
    title: 'Service Vans & Pickups',
    description: 'Ideal for plumbing, HVAC, electrical, restoration, landscaping and other branded service fleets.',
    icon: Truck,
  },
  {
    title: 'Sprinters & Cube Trucks',
    description: 'Regular exterior washing for delivery, moving, rental and commercial service vehicles.',
    icon: Building2,
  },
  {
    title: 'Straight Trucks & Work Trucks',
    description: 'Scheduled cleaning for larger commercial vehicles that collect road film, mud and jobsite grime.',
    icon: Droplets,
  },
  {
    title: 'Mixed Fleets',
    description: 'One recurring plan can cover multiple vehicle sizes at the same yard or operating location.',
    icon: Sparkles,
  },
];

const scheduleOptions = [
  {
    title: 'Weekly',
    label: 'Highest appearance standard',
    description: 'Best for heavily used fleets, high-visibility branded vehicles and businesses that want vehicles consistently presentation-ready.',
  },
  {
    title: 'Biweekly',
    label: 'Most popular',
    description: 'A strong balance of appearance and cost for service vans, pickups and local commercial fleets.',
    featured: true,
  },
  {
    title: 'Monthly',
    label: 'Lower-frequency maintenance',
    description: 'Good for lighter-use fleets or companies that want scheduled cleaning without a high visit frequency.',
  },
];

const faqs = [
  {
    question: 'How much does fleet washing cost?',
    answer: 'Recurring fleet washing starts from about $40 per vehicle for qualifying fleets. Final pricing depends on vehicle size, fleet count, wash frequency, buildup, site access and the work required on each visit. Larger recurring fleets receive volume pricing.',
  },
  {
    question: 'How many vehicles do I need for fleet pricing?',
    answer: 'Fleet programs are designed for businesses with multiple vehicles washed at one location. We can quote smaller fleets, but the best per-vehicle pricing is available when more vehicles are completed during the same scheduled visit.',
  },
  {
    question: 'How often should fleet vehicles be washed?',
    answer: 'Most service fleets are a good fit for biweekly cleaning. Weekly service is useful for high-mileage, high-visibility or dirtier fleets, while monthly service can work well for lighter-use vehicles.',
  },
  {
    question: 'Do you come to our yard?',
    answer: 'Yes. Fleet washing is designed as an on-site service so vehicles can be cleaned where they are normally parked, reducing downtime and the need to send drivers through a separate wash facility.',
  },
  {
    question: 'Can you wash different vehicle sizes in the same fleet?',
    answer: 'Yes. We can build one fleet plan around pickups, service vans, Sprinters, cube trucks and larger work vehicles. The quote will show the appropriate rate for each vehicle class.',
  },
  {
    question: 'Can we change the number of vehicles on our plan?',
    answer: 'Yes. Fleet counts change. We can adjust the recurring service as vehicles are added, removed or temporarily unavailable, with pricing updated when the overall fleet size changes materially.',
  },
];

const FleetWashing = () => {
  return (
    <Layout
      title="Fleet Washing Surrey & Vancouver | Mobile Commercial Vehicle Washing"
      description="Mobile fleet washing for service vans, pickups, Sprinters and commercial vehicles across Surrey, Delta, Langley, White Rock and Metro Vancouver. Weekly, biweekly and monthly plans with volume pricing."
      image="/lovable-uploads/3da7ac70-3771-4584-b170-acc52f801bf8.png"
      canonicalUrl="/services/fleet-washing"
    >
      <section className="relative overflow-hidden bg-gray-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.22),transparent_38%)]" />
        <div className="absolute -right-20 top-20 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -right-5 top-36 h-52 w-52 rounded-full border border-red-500/20" />

        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center max-w-7xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold backdrop-blur-sm mb-6">
                <Truck className="h-4 w-4 text-red-400" />
                Mobile Fleet Washing · Lower Mainland
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Keep Your Entire Fleet Clean Without Sending Vehicles to a Wash
              </h1>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mb-8">
                Scheduled on-site washing for service vans, pickups, Sprinters and commercial vehicles. Built for recurring fleets that want cleaner branded vehicles with less downtime.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-9">
                <Button asChild size="lg" variant="bc-red" className="min-h-12 px-7 text-base font-semibold">
                  <Link to="/contact">
                    Get a Fleet Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="min-h-12 border-white/50 bg-white/5 px-7 text-base text-white hover:bg-white hover:text-gray-950">
                  <a href="tel:7788087620">
                    <Phone className="mr-2 h-5 w-5" />
                    778-808-7620
                  </a>
                </Button>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 text-sm text-gray-100">
                {['Weekly, biweekly or monthly', 'Volume fleet pricing', 'On-site at your yard'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 md:p-7 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-5">
                  <div>
                    <p className="text-sm text-gray-400">Recurring fleet plans</p>
                    <p className="text-2xl font-bold">From $40 / vehicle</p>
                  </div>
                  <div className="rounded-2xl bg-red-500/15 p-3">
                    <Truck className="h-7 w-7 text-red-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="rounded-2xl bg-black/25 p-4">
                    <CalendarDays className="h-5 w-5 text-red-400 mb-3" />
                    <p className="font-bold">Recurring</p>
                    <p className="text-sm text-gray-400">Predictable service dates</p>
                  </div>
                  <div className="rounded-2xl bg-black/25 p-4">
                    <MapPin className="h-5 w-5 text-red-400 mb-3" />
                    <p className="font-bold">At Your Yard</p>
                    <p className="text-sm text-gray-400">Less vehicle downtime</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    ['5–9 vehicles', 'Fleet pricing'],
                    ['10–24 vehicles', 'Lower per-unit rate'],
                    ['25+ vehicles', 'Custom contract'],
                  ].map(([size, value]) => (
                    <div key={size} className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3">
                      <span className="text-gray-300">{size}</span>
                      <span className="font-semibold text-white">{value}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-500 mt-4">Pricing varies by vehicle size, condition, frequency and site requirements.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-bc-red font-semibold tracking-wide uppercase text-sm">Commercial Fleet Cleaning</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-950 mt-3 mb-5">Built for Fleets That Work Every Day</h2>
            <p className="text-lg text-gray-600">
              Instead of treating every vehicle as a separate job, we clean multiple units in one visit and build the schedule around your operation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {vehicleTypes.map(({ title, description, icon: Icon }) => (
              <Card key={title} className="h-full border-gray-200 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-5">
                    <Icon className="h-6 w-6 text-bc-red" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-950 mb-3">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div>
              <span className="text-bc-red font-semibold tracking-wide uppercase text-sm">Why Recurring Fleet Washing</span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-950 mt-3 mb-6">One Schedule. The Whole Fleet.</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Clean branded vehicles make a better impression on customers, but sending every van or truck to a separate wash costs driver time. On-site fleet washing keeps the process centralized.
              </p>

              <div className="space-y-5">
                {[
                  ['Less downtime', 'Vehicles are washed where they are parked instead of being driven off-site.'],
                  ['Consistent appearance', 'Recurring service helps keep road film, mud and general buildup from getting out of hand.'],
                  ['Simpler billing', 'One fleet account and one scheduled service instead of individual washes.'],
                  ['Flexible fleet counts', 'Plans can be adjusted as vehicles are added, removed or temporarily unavailable.'],
                ].map(([title, description]) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="rounded-full bg-red-100 p-2 mt-0.5">
                      <CheckCircle2 className="h-5 w-5 text-bc-red" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-950 mb-1">{title}</h3>
                      <p className="text-gray-600">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-gray-950 text-white p-7 md:p-9 shadow-xl">
              <div className="flex items-center gap-3 mb-7">
                <ShieldCheck className="h-8 w-8 text-red-400" />
                <div>
                  <p className="text-sm text-gray-400">BC Pressure Washing</p>
                  <h3 className="text-2xl font-bold">Fleet Service Standard</h3>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  'Exterior wash of agreed vehicle surfaces',
                  'Consistent wash process across the fleet',
                  'Site and access review before recurring service begins',
                  'Owner-checked service quality',
                  'Custom frequency based on fleet usage',
                  'Volume pricing for recurring accounts',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-white/[0.06] px-4 py-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-bc-red font-semibold tracking-wide uppercase text-sm">Choose Your Frequency</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-950 mt-3 mb-4">Fleet Washing Plans</h2>
            <p className="text-lg text-gray-600">Start with the schedule that matches how quickly your vehicles get dirty. We can adjust it after the first few visits.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {scheduleOptions.map((option) => (
              <Card key={option.title} className={`relative h-full ${option.featured ? 'border-2 border-bc-red shadow-xl md:-translate-y-2' : 'border-gray-200 shadow-sm'}`}>
                {option.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-bc-red px-4 py-1 text-xs font-bold text-white uppercase tracking-wide">
                    Recommended
                  </div>
                )}
                <CardContent className="p-7 md:p-8">
                  <Clock className={`h-7 w-7 mb-5 ${option.featured ? 'text-bc-red' : 'text-gray-700'}`} />
                  <h3 className="text-2xl font-bold text-gray-950 mb-1">{option.title}</h3>
                  <p className="text-sm font-semibold text-bc-red mb-4">{option.label}</p>
                  <p className="text-gray-600 leading-relaxed">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <span className="text-red-400 font-semibold tracking-wide uppercase text-sm">Fleet Pricing</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">The More We Wash at One Stop, the Better the Economics</h2>
              <p className="text-lg text-gray-300 max-w-3xl">
                Recurring plans start from about $40 per vehicle for qualifying fleets. We quote the account based on fleet size, vehicle classes, frequency, buildup and site access so you know the expected cost before the first service.
              </p>
            </div>
            <Button asChild size="lg" variant="bc-red" className="min-h-12 px-8 whitespace-nowrap">
              <Link to="/contact">Request Fleet Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      <FAQSection
        title="Fleet Washing FAQs"
        subtitle="Common questions about recurring mobile fleet cleaning."
        faqs={faqs}
        largeButtons
      />

      <section className="py-16 md:py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Truck className="h-12 w-12 mx-auto mb-5" />
            <h2 className="text-3xl md:text-5xl font-bold mb-5">Have 5+ Vehicles at One Location?</h2>
            <p className="text-lg md:text-xl text-red-50 mb-8">
              Send us the vehicle count, vehicle types, yard location and preferred frequency. We will build a straightforward fleet-washing quote around your operation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="min-h-12 bg-white text-red-700 hover:bg-gray-100 px-8 font-semibold">
                <Link to="/contact">
                  Get a Fleet Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-h-12 border-white/70 bg-transparent text-white hover:bg-white hover:text-red-700 px-8">
                <a href="tel:7788087620">Call 778-808-7620</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FleetWashing;
