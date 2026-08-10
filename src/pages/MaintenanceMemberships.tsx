import { useMemo, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarCheck,
  Camera,
  Check,
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

const serviceCadences = [
  {
    service: 'Window Cleaning',
    oneTime: 'Available',
    annual: 'Available',
    biannual: 'Recommended',
    quarterly: 'By request',
    note: 'Biannual is the main residential maintenance option for most homes.',
  },
  {
    service: 'Gutter Cleaning',
    oneTime: 'Available',
    annual: 'Available',
    biannual: 'Recommended',
    quarterly: 'By request',
    note: 'Twice-yearly service is useful for homes exposed to trees and heavy seasonal debris.',
  },
  {
    service: 'House Soft Washing',
    oneTime: 'Available',
    annual: 'Available',
    biannual: 'Not standard',
    quarterly: 'Not standard',
    note: 'Usually handled once yearly or only when the exterior condition calls for it.',
  },
  {
    service: 'Driveway / Hard Surfaces',
    oneTime: 'Available',
    annual: 'Available',
    biannual: 'By request',
    quarterly: 'Not standard',
    note: 'Best sold as a one-time service or annual maintenance add-on.',
  },
  {
    service: 'Roof Cleaning',
    oneTime: 'Condition based',
    annual: 'Review only',
    biannual: 'No',
    quarterly: 'No',
    note: 'Roof cleaning is not automatically repeated. Treatment is recommended only when the roof condition requires it.',
  },
];

const plans: Plan[] = [
  {
    id: 'essential-home-care',
    name: 'Essential Home Care',
    eyebrow: 'Simple annual upkeep',
    description: 'For homeowners who want the most visible routine maintenance handled on a dependable schedule.',
    schedule: 'Typical schedule: one gutter service and one exterior window service each year.',
    features: [
      'Exterior window cleaning once yearly',
      'Interior gutter cleaning once yearly',
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
      'Exterior window cleaning once yearly',
      'House soft washing once yearly',
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
      'Driveway pressure washing once yearly',
      'Annual roof condition review',
      'Roof-treatment recommendation when needed',
      'Priority booking and maintenance reminders',
    ],
    badge: 'Most Complete',
  },
];

const faqs = [
  {
    question: 'Do you offer monthly residential cleaning plans?',
    answer:
      'Not as the standard public residential option. Residential service is normally sold as one-time, annual, biannual or, where appropriate, quarterly maintenance. True monthly, biweekly and weekly recurring service is mainly reserved for storefront and commercial properties.',
  },
  {
    question: 'Can I still pay monthly?',
    answer:
      'If monthly installments are offered for a residential plan, they are a payment schedule for the agreed annual service plan, not a month-to-month cleaning subscription. The written plan shows the full annual service scope, payment schedule and cancellation terms before approval.',
  },
  {
    question: 'Why is pricing personalized by address?',
    answer:
      'Home size, roofline, access, window count, gutter length and surface area can change the amount of work required. We review the property before presenting the exact plan price.',
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
      description="Compare annual, biannual and seasonal exterior maintenance plans for windows, gutters, soft washing, driveways and roof care in Surrey, White Rock and Metro Vancouver."
      canonicalUrl="/maintenance-memberships"
    >
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.24),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.14),transparent_36%)]" />
        <div className="relative container mx-auto px-4 py-20 text-center md:py-28">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold">
            <ShieldCheck className="h-4 w-4 text-red-400" />
            Residential Maintenance Plans
          </div>
          <h1 className="mx-auto max-w-5xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Scheduled home care without a confusing monthly subscription
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-200">
            Choose one-time, annual, biannual or selected quarterly maintenance. Residential service frequency is matched to what the property actually needs.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              onClick={() => packageSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              size="lg"
              className="min-h-12 bg-bc-red px-7 text-base hover:bg-red-700"
            >
              Compare Home Plans <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-12 border-white/30 bg-white/5 px-7 text-base text-white hover:bg-white/10 hover:text-white">
              <Link to="/services/commercial-window-cleaning">Commercial Recurring Service</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-[0.2em] text-bc-red">Individual service options</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">Choose the frequency that matches the service</h2>
            <p className="mt-4 text-slate-600">
              Biannual service is the strongest standard residential recurring option for windows and gutters. Monthly residential cleaning is not promoted as a cancel-anytime subscription.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-slate-950 text-white">
                  <tr>
                    <th className="px-5 py-4">Service</th>
                    <th className="px-5 py-4">One-Time</th>
                    <th className="px-5 py-4">Annual</th>
                    <th className="px-5 py-4">Biannual</th>
                    <th className="px-5 py-4">Quarterly</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceCadences.map((item) => (
                    <tr key={item.service} className="border-t border-slate-200 align-top">
                      <td className="px-5 py-5">
                        <p className="font-bold text-slate-950">{item.service}</p>
                        <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">{item.note}</p>
                      </td>
                      <td className="px-5 py-5 text-sm text-slate-700">{item.oneTime}</td>
                      <td className="px-5 py-5 text-sm text-slate-700">{item.annual}</td>
                      <td className="px-5 py-5 text-sm font-semibold text-slate-900">{item.biannual}</td>
                      <td className="px-5 py-5 text-sm text-slate-700">{item.quarterly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section ref={packageSectionRef} className="scroll-mt-28 bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-[0.2em] text-bc-red">Whole-home plans</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-5xl">Bundle the services your property actually needs</h2>
            <p className="mt-5 text-lg text-slate-600">
              Exact pricing is calculated from the property and included service scope rather than forcing every home into the same fixed package price.
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
                  <p className="mt-7 text-sm font-semibold text-slate-500">Property-specific pricing before approval</p>
                  <Button
                    onClick={() => selectPlan(plan.id)}
                    className={`mt-4 min-h-12 w-full ${isSelected ? 'bg-slate-900 hover:bg-slate-800' : 'bg-bc-red hover:bg-red-700'}`}
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
                Select a plan and address. The final quote shows the actual service schedule and price before anything is approved.
              </p>
              <div className="mt-7 space-y-4 text-sm text-slate-200">
                <div className="flex gap-3"><MapPin className="h-5 w-5 text-red-400" /> Property-specific service scope</div>
                <div className="flex gap-3"><CircleDollarSign className="h-5 w-5 text-red-400" /> Exact price before approval</div>
                <div className="flex gap-3"><Clock3 className="h-5 w-5 text-red-400" /> Written annual service schedule</div>
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
                No plan is activated and no charge is made from this page.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-slate-950 md:text-4xl">What maintenance service looks like</h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-4">
            {[
              { icon: Home, title: 'Property review', text: 'We confirm the home size, access and exact service scope.' },
              { icon: CalendarCheck, title: 'Written schedule', text: 'Annual, biannual or selected quarterly visits are shown before approval.' },
              { icon: Camera, title: 'Photo updates', text: 'Before-and-after photos document completed work.' },
              { icon: Sparkles, title: 'Priority care', text: 'Maintenance customers receive scheduling reminders and priority seasonal booking.' },
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
              <p className="font-semibold uppercase tracking-[0.2em] text-bc-red">Questions</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">Maintenance plan FAQ</h2>
            </div>
            <div className="mt-10 space-y-4">
              {faqs.map((faq) => (
                <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <summary className="cursor-pointer list-none font-bold text-slate-950">{faq.question}</summary>
                  <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MaintenanceMemberships;
