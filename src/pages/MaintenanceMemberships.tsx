import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CalendarCheck,
  Camera,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Home,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import Layout from '@/components/Layout';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { AddressAutocomplete } from '@/components/AddressAutocomplete';
import { Button } from '@/components/ui/button';

interface AddressDetails {
  formatted_address: string;
  latitude: number;
  longitude: number;
  city: string;
  postalCode: string;
}

type PlanId = 'essential-home-care' | 'seasonal-home-protection' | 'complete-home-protection';

interface Plan {
  id: PlanId;
  name: string;
  eyebrow: string;
  description: string;
  schedule: string;
  features: string[];
  badge?: string;
}

const plans: Plan[] = [
  {
    id: 'essential-home-care',
    name: 'Essential Home Care',
    eyebrow: 'Simple annual upkeep',
    description: 'For homeowners who want the highest-visibility maintenance handled on a dependable schedule.',
    schedule: 'Typical schedule: one gutter service and one exterior window service each year.',
    features: [
      'Exterior window cleaning',
      'Interior gutter cleaning',
      'Before-and-after service photos',
      'Annual scheduling reminder',
      'Owner-checked completion',
    ],
  },
  {
    id: 'seasonal-home-protection',
    name: 'Seasonal Home Protection',
    eyebrow: 'Best for Metro Vancouver weather',
    description: 'Seasonal drainage care plus annual exterior cleaning for homes exposed to rain, trees and organic growth.',
    schedule: 'Typical schedule: gutters twice yearly, windows yearly and a house soft wash yearly.',
    features: [
      'Two interior gutter cleanings per year',
      'Exterior window cleaning',
      'House soft washing',
      'Priority seasonal scheduling',
      'Before-and-after service photos',
    ],
    badge: 'Most Popular',
  },
  {
    id: 'complete-home-protection',
    name: 'Complete Home Protection',
    eyebrow: 'Whole-property maintenance',
    description: 'A complete exterior-care plan covering drainage, glass, siding and high-use hard surfaces.',
    schedule: 'Typical schedule: seasonal gutters, annual windows, annual soft wash and annual driveway cleaning.',
    features: [
      'Everything in Seasonal Home Protection',
      'Driveway pressure washing',
      'Annual roof condition review',
      'Roof-treatment recommendation when needed',
      'Priority booking and maintenance reminders',
    ],
    badge: 'Most Complete',
  },
];

const faqs = [
  {
    question: 'Why is pricing personalized by address?',
    answer:
      'Home size, roofline, access, window count, gutter length and surface area can change the amount of work required. We review the property before presenting the exact plan price.',
  },
  {
    question: 'Do I have to choose a plan before entering my address?',
    answer:
      'No. The plans are visible first so you can compare what is included. Selecting a plan simply tells us which option you want priced for your property.',
  },
  {
    question: 'Is roof cleaning performed every year?',
    answer:
      'Not automatically. Roof work should be based on roof condition. Complete Home Protection includes a roof condition review and a recommendation when treatment or controlled moss removal is appropriate.',
  },
  {
    question: 'What happens if weather affects a scheduled visit?',
    answer:
      'Unsafe or unsuitable work is rescheduled. Maintenance customers receive priority when a weather delay requires a new service date.',
  },
  {
    question: 'How are payments and cancellation handled?',
    answer:
      'The written plan shows the service calendar, payment timing and cancellation terms before you approve anything. No plan is activated from this page alone.',
  },
  {
    question: 'Is the 2-year moss-free guarantee included?',
    answer:
      'The guarantee applies only to qualifying roof-treatment work and is confirmed in writing after the roof condition and treatment scope are reviewed.',
  },
];

const MaintenanceMemberships = () => {
  const navigate = useNavigate();
  const packageSectionRef = useRef<HTMLElement>(null);
  const plannerSectionRef = useRef<HTMLElement>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanId | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<AddressDetails | null>(null);

  const selectedPlanDetails = useMemo(
    () => plans.find((plan) => plan.id === selectedPlan) ?? null,
    [selectedPlan],
  );

  const scrollToPackages = () => {
    packageSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectPlan = (planId: PlanId) => {
    setSelectedPlan(planId);
    window.setTimeout(() => {
      plannerSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  };

  const continueToQuote = () => {
    if (!selectedPlan || !selectedAddress) return;

    localStorage.setItem(
      'maintenancePlanSelection',
      JSON.stringify({
        planId: selectedPlan,
        planName: selectedPlanDetails?.name,
        address: selectedAddress,
        selectedAt: new Date().toISOString(),
      }),
    );

    const params = new URLSearchParams({
      plan: selectedPlan,
      address: selectedAddress.formatted_address,
    });
    navigate(`/contact?${params.toString()}`);
  };

  return (
    <Layout
      title="Home Exterior Maintenance Plans Surrey & White Rock | BC Pressure Washing"
      description="Compare scheduled exterior maintenance plans for gutters, windows, soft washing, driveway cleaning and roof care in Surrey, White Rock and Metro Vancouver."
      canonicalUrl="/maintenance-memberships"
    >
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.24),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.14),transparent_36%)]" />
        <div className="relative container mx-auto px-4 py-20 md:py-28 text-center">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold">
            <ShieldCheck className="h-4 w-4 text-red-400" />
            BC Home Protection Plans
          </div>
          <h1 className="mx-auto max-w-5xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Keep your home protected without remembering every service
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            Compare the plans first, then enter your address for a property-specific recommendation and exact pricing.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={scrollToPackages} size="lg" className="min-h-12 bg-bc-red px-7 text-base hover:bg-red-700">
              See What Is Included <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={() => plannerSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              size="lg"
              variant="outline"
              className="min-h-12 border-white/30 bg-white/5 px-7 text-base text-white hover:bg-white/10 hover:text-white"
            >
              Get My Personalized Plans
            </Button>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 text-sm text-slate-200 sm:grid-cols-3">
            {['Owner-checked work', 'Licensed & insured', 'Service photos included'].map((item) => (
              <div key={item} className="flex items-center justify-center gap-2">
                <Check className="h-4 w-4 text-green-400" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={packageSectionRef} className="scroll-mt-28 bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-[0.2em] text-bc-red">Compare before you enter details</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-5xl">Choose the level of protection that fits your home</h2>
            <p className="mt-5 text-lg text-slate-600">
              Exact pricing is based on the property. No hardcoded package price is shown until the home and service scope are reviewed.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-3">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <article
                  key={plan.id}
                  className={`relative flex h-full flex-col rounded-2xl border bg-white p-7 shadow-sm transition-all ${
                    isSelected
                      ? 'border-bc-red ring-2 ring-red-100 shadow-xl'
                      : 'border-slate-200 hover:-translate-y-1 hover:shadow-lg'
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute right-5 top-5 rounded-full bg-bc-red px-3 py-1 text-xs font-bold text-white">
                      {plan.badge}
                    </span>
                  )}
                  <p className="pr-24 text-sm font-semibold text-bc-red">{plan.eyebrow}</p>
                  <h3 className="mt-2 text-2xl font-bold text-slate-950">{plan.name}</h3>
                  <p className="mt-4 text-slate-600">{plan.description}</p>
                  <div className="mt-5 rounded-xl bg-slate-100 p-4 text-sm font-medium leading-6 text-slate-700">
                    <CalendarCheck className="mr-2 inline h-4 w-4 text-bc-red" />
                    {plan.schedule}
                  </div>
                  <ul className="mt-6 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-7 text-sm font-semibold text-slate-500">Pricing based on home size and condition</p>
                  <Button
                    onClick={() => selectPlan(plan.id)}
                    className={`mt-4 min-h-12 w-full ${
                      isSelected ? 'bg-slate-900 hover:bg-slate-800' : 'bg-bc-red hover:bg-red-700'
                    }`}
                  >
                    {isSelected ? 'Selected' : `Choose ${plan.name}`}
                  </Button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section ref={plannerSectionRef} className="scroll-mt-28 bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-3xl bg-slate-950 p-6 text-white shadow-2xl md:grid-cols-[0.9fr_1.1fr] md:p-12">
            <div>
              <p className="font-semibold uppercase tracking-[0.2em] text-red-400">Personalized plan</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Get the exact plan for your property</h2>
              <p className="mt-5 text-slate-300">
                Select a plan and property address. We will carry your choice into the existing quote flow for a final property review.
              </p>
              <div className="mt-7 space-y-4 text-sm text-slate-200">
                <div className="flex gap-3"><MapPin className="h-5 w-5 text-red-400" /> Property-specific service scope</div>
                <div className="flex gap-3"><CircleDollarSign className="h-5 w-5 text-red-400" /> Exact price before approval</div>
                <div className="flex gap-3"><Clock3 className="h-5 w-5 text-red-400" /> Service schedule shown in writing</div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 text-slate-950 md:p-8">
              <label className="text-sm font-semibold text-slate-700">Selected plan</label>
              <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold">
                {selectedPlanDetails?.name ?? 'Choose one of the plans above'}
              </div>

              <label className="mt-5 block text-sm font-semibold text-slate-700">Property address</label>
              <AddressAutocomplete
                onAddressSelect={setSelectedAddress}
                placeholder="Start typing your home address..."
                className="mt-2"
              />

              {selectedAddress && (
                <p className="mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-800">
                  <Check className="mr-2 inline h-4 w-4" /> {selectedAddress.formatted_address}
                </p>
              )}

              <Button
                onClick={continueToQuote}
                disabled={!selectedPlan || !selectedAddress}
                className="mt-6 min-h-12 w-full bg-bc-red text-base hover:bg-red-700"
              >
                Continue for Exact Pricing <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="mt-3 text-center text-xs leading-5 text-slate-500">
                This does not enroll you or charge you. The service scope and terms are reviewed before approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">What membership service looks like</h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-4">
            {[
              { icon: Home, title: 'Property review', text: 'We confirm the home size, access and service scope.' },
              { icon: CalendarCheck, title: 'Written schedule', text: 'You see when each included service is expected.' },
              { icon: Camera, title: 'Photo updates', text: 'Before-and-after photos document completed work.' },
              { icon: Sparkles, title: 'Ongoing protection', text: 'Priority reminders reduce missed seasonal maintenance.' },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <Icon className="h-7 w-7 text-bc-red" />
                <h3 className="mt-4 text-lg font-bold text-slate-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">Maintenance-plan questions</h2>
              <p className="mt-4 text-slate-600">Clear answers before you choose or approve a plan.</p>
            </div>
            <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5 md:px-8">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-950">
                    {faq.question}
                    <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 max-w-3xl leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bc-red py-14 text-white">
        <div className="container mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:text-left">
          <div>
            <h2 className="text-3xl font-bold">Ready to see your personalized options?</h2>
            <p className="mt-2 text-red-100">Compare first. Approve only after the exact scope, schedule and price are clear.</p>
          </div>
          <Button onClick={scrollToPackages} size="lg" className="min-h-12 bg-white text-bc-red hover:bg-slate-100">
            Compare Plans <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default MaintenanceMemberships;
