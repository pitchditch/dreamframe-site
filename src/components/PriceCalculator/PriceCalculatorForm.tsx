import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PriceCalculatorIntro from './PriceCalculatorIntro';
import { Droplets, Home, CloudRain, Car, Building, Warehouse } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { TestimonialCarousel } from '../PriceCalculator/TestimonialCarousel';
import { 
  trackFormSubmission, 
  trackFormStep, 
  trackFormFieldInteraction 
} from '@/utils/analytics';

const PROPERTY_SIZES = [{
  id: 'small',
  label: '0–1800 sq. ft.',
  icon: <Home className="h-4 w-4" />
}, {
  id: 'medium',
  label: '1800–2800 sq. ft.',
  icon: <Home className="h-5 w-5" />
}, {
  id: 'large',
  label: '2800–3500 sq. ft.',
  icon: <Home className="h-6 w-6" />
}, {
  id: 'xlarge',
  label: 'Over 3500 sq. ft. (On-site quote required)',
  icon: <Building className="h-6 w-6" />
}];
const PRICING = {
  small: {
    'Window Cleaning (Outside)': 300,
    'Window Cleaning (Inside)': 300,
    'Both Window Sides': 547.2,
    'House Washing': 414.3,
    'House Wash + Windows': 664.2,
    'Driveway Washing': 300,
    'Driveway + House Washing': 635.4,
    'Deck Washing': 300,
    'Gutter Cleaning (Inside)': 300,
    'Gutter Cleaning (Outside)': 154,
    'Gutter Cleaning (Both)': 454,
    'Roof Cleaning': null
  },
  medium: {
    'Window Cleaning (Outside)': 357.3,
    'Window Cleaning (Inside)': 411.3,
    'Both Window Sides': 768.6,
    'House Washing': 627.3,
    'House Wash + Windows': 984.6,
    'Driveway Washing': 314.1,
    'Driveway + House Washing': 941.1,
    'Deck Washing': 300,
    'Gutter Cleaning (Inside)': 386.1,
    'Gutter Cleaning (Outside)': 300,
    'Gutter Cleaning (Both)': 682.2,
    'Roof Cleaning': null
  },
  large: {
    'Window Cleaning (Outside)': 431.1,
    'Window Cleaning (Inside)': 521.1,
    'Both Window Sides': 952.2,
    'House Washing': 888.3,
    'House Wash + Windows': 1319.4,
    'Driveway Washing': 384.3,
    'Driveway + House Washing': 1272.6,
    'Deck Washing': 300,
    'Gutter Cleaning (Inside)': 465.3,
    'Gutter Cleaning (Outside)': 357.3,
    'Gutter Cleaning (Both)': 822.6,
    'Roof Cleaning': null
  },
  xlarge: {
    'Roof Cleaning': null
  }
};

// Service icons mapping
const SERVICE_ICONS = {
  'Window Cleaning (Outside)': <Droplets className="h-5 w-5" />,
  'Window Cleaning (Inside)': <Droplets className="h-5 w-5" />,
  'Both Window Sides': <Droplets className="h-5 w-5" />,
  'House Washing': <Home className="h-5 w-5" />,
  'House Wash + Windows': <Home className="h-5 w-5" />,
  'Driveway Washing': <Car className="h-5 w-5" />,
  'Driveway + House Washing': <Home className="h-5 w-5" />,
  'Deck Washing': <CloudRain className="h-5 w-5" />,
  'Gutter Cleaning (Inside)': <Home className="h-5 w-5" />,
  'Gutter Cleaning (Outside)': <Home className="h-5 w-5" />,
  'Gutter Cleaning (Both)': <Home className="h-5 w-5" />,
  'Roof Cleaning': <CloudRain className="h-5 w-5" />
};

// Service categories for dropdowns
const SERVICE_CATEGORIES = [{
  name: 'Window Cleaning',
  services: ['Window Cleaning (Outside)', 'Window Cleaning (Inside)', 'Both Window Sides']
}, {
  name: 'House & Property Washing',
  services: ['House Washing', 'House Wash + Windows', 'Driveway Washing', 'Driveway + House Washing']
}, {
  name: 'Gutter Cleaning',
  services: ['Gutter Cleaning (Inside)', 'Gutter Cleaning (Outside)', 'Gutter Cleaning (Both)']
}, {
  name: 'Other Services',
  services: ['Deck Washing', 'Roof Cleaning']
}];

// Add-on services
const ADD_ONS = [{
  id: 'moss-treatment',
  name: 'Moss Treatment',
  price: 149
}, {
  id: 'gutter-guards',
  name: 'Gutter Guards Installation',
  price: 299
}, {
  id: 'fascia-cleaning',
  name: 'Fascia Cleaning',
  price: 99
}, {
  id: 'window-track',
  name: 'Window Track Cleaning',
  price: 49
}, {
  id: 'screen-cleaning',
  name: 'Screen Cleaning',
  price: 39
}];
const SERVICE_KEYS = Object.keys(PRICING.small);
const PROMOS = [{
  title: "Bundle & Save – $200 OFF",
  description: "Book 3 or more services and get an instant $200 discount on your total. Mix and match from: Window Cleaning (Inside/Outside), House Washing, Driveway Cleaning, Gutter Cleaning, Deck Washing. No code needed — discount is automatic.",
  color: "bg-yellow-400 text-black"
}, {
  title: "Referral Program – Refer & Earn",
  description: "Refer a friend and get $50 off your next service when they book. They just need to mention your name during booking.",
  color: "bg-blue-100 text-blue-900"
}];
function getPricing(size: string, service: string): number | null {
  // Only handle "Roof Cleaning" as on-site estimate
  if (service === 'Roof Cleaning') {
    return null;
  }
  if (size === 'xlarge') {
    return null;
  }

  // Fix the TypeScript error by using proper type annotations
  const pricingMap = PRICING[size as keyof typeof PRICING];
  return pricingMap && pricingMap[service as keyof typeof pricingMap] || null;
}
function formatCurrency(n: number | null) {
  if (!n && n !== 0) return "On-site quote required";
  return `$${n.toLocaleString(undefined, {
    minimumFractionDigits: 2
  })}`;
}
interface PriceCalculatorFormProps {
  onComplete?: () => void;
  initialStep?: string;
}

const PriceCalculatorForm: React.FC<PriceCalculatorFormProps> = ({
  onComplete,
  initialStep
}) => {
  // Initialize step based on initialStep prop if provided
  const [step, setStep] = useState(initialStep === "address" ? 0 : 0);

  // Step data
  const [size, setSize] = useState<string>('');
  const [services, setServices] = useState<string[]>([]);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState({
    name: '',
    phone: '',
    email: '',
    referredBy: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);

  // Use effect to pre-fill the postal code if available
  useEffect(() => {
    const savedPostalCode = sessionStorage.getItem('postalCode') || localStorage.getItem('postalCode');
    if (savedPostalCode) {
      // Pre-fill the postal code field
      setContact(prev => ({
        ...prev,
        phone: savedPostalCode
      }));
    }
  }, []);

  // Track form step changes
  useEffect(() => {
    trackFormStep('PriceCalculator', step + 1, 
      step === 0 ? 'Address' : 
      step === 1 ? 'Property Size' : 
      step === 2 ? 'Services Selection' : 
      step === 3 ? 'Contact Info' : 
      'Summary'
    );
  }, [step]);

  // Bundle discount
  const eligibleBundleDiscount = services.filter(s => s !== 'Roof Cleaning').length >= 3;
  let estimateSummary: Record<string, number | null> = {};
  let estTotal = 0;
  if (step === 4 && size !== 'xlarge') {
    for (const s of services) {
      const p = getPricing(size, s);
      estimateSummary[s] = p;
      if (typeof p === 'number') estTotal += p;
    }

    // Add selected add-ons to the total
    addOns.forEach(addonId => {
      const addon = ADD_ONS.find(a => a.id === addonId);
      if (addon) {
        estimateSummary[addon.name] = addon.price;
        estTotal += addon.price;
      }
    });
    if (eligibleBundleDiscount) {
      estTotal -= 200;
      estimateSummary['Bundle Discount'] = -200;
    }
  }

  // Handle exclusive combinations (e.g., Both Windows disables Window Inside/Outside)
  const serviceDisabled = (service: string): boolean => {
    if (services.includes('Both Window Sides')) {
      if (service === 'Window Cleaning (Outside)' || service === 'Window Cleaning (Inside)') return true;
    }
    if (services.includes('House Wash + Windows')) {
      if (service === 'House Washing' || service === 'Both Window Sides') return true;
    }
    if (services.includes('Driveway + House Washing')) {
      if (service === 'Driveway Washing' || service === 'House Washing') return true;
    }
    if (services.includes('Gutter Cleaning (Both)')) {
      if (service === 'Gutter Cleaning (Inside)' || service === 'Gutter Cleaning (Outside)') return true;
    }
    if (service === 'Roof Cleaning' && size !== 'xlarge' && size !== '') {
      // Allow selection but price will state "On-site quote required"
      return false;
    }
    if (size === 'xlarge' && service !== 'Roof Cleaning') return true;
    return false;
  };
  
  function handleServiceChange(service: string) {
    if (serviceDisabled(service)) return;
    // Uncheck mutually exclusive services
    const updated = services.includes(service) ? services.filter(s => s !== service) : [...services.filter(s => {
      if (service === 'Both Window Sides' && (s === 'Window Cleaning (Outside)' || s === 'Window Cleaning (Inside)')) return false;
      if ((service === 'Window Cleaning (Outside)' || service === 'Window Cleaning (Inside)') && s === 'Both Window Sides') return false;
      if (service === 'House Wash + Windows' && (s === 'House Washing' || s === 'Both Window Sides')) return false;
      if ((service === 'House Washing' || s === 'Both Window Sides') && s === 'House Wash + Windows') return false;
      if (service === 'Driveway + House Washing' && (s === 'Driveway Washing' || s === 'House Washing')) return false;
      if ((service === 'Driveway Washing' || s === 'House Washing') && s === 'Driveway + House Washing') return false;
      if (service === 'Gutter Cleaning (Both)' && (s === 'Gutter Cleaning (Inside)' || s === 'Gutter Cleaning (Outside)')) return false;
      if ((service === 'Gutter Cleaning (Inside)' || s === 'Gutter Cleaning (Outside)') && s === 'Gutter Cleaning (Both)') return false;
      return true;
    }), service];
    setServices(updated);
    
    // Track service selection
    trackFormFieldInteraction('PriceCalculator', `Service: ${service}`, 'change');
  }
  
  function handleAddOnChange(addonId: string) {
    setAddOns(prev => prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]);
    
    // Track addon selection
    const addon = ADD_ONS.find(a => a.id === addonId);
    if (addon) {
      trackFormFieldInteraction('PriceCalculator', `Add-on: ${addon.name}`, 'change');
    }
  }

  const handleFormSubmit = async () => {
    setSubmitting(true);
    
    // Track the form submission
    trackFormSubmission('PriceCalculator', {
      form_type: 'PriceCalculator',
      service_type: services.join(', '),
      property_type: size,
      total_estimate: estTotal,
      addons: addOns.length > 0 ? addOns.join(', ') : 'none',
      discount_applied: eligibleBundleDiscount ? 'yes' : 'no'
    });
    
    // Submit form with a slight delay to simulate processing
    setTimeout(() => {
      setSubmitting(false);
      if (onComplete) onComplete();
      setStep(5);
    }, 1200);
  };

  // -- Render steps
  return (
    <div className="max-w-2xl mx-auto w-full mt-16">
      {/* Main disclaimer at the top */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6 text-sm">
        <p className="font-semibold mb-1">About Our Pricing</p>
        <p>The prices shown are starting estimates based on typical home sizes. After you submit this form, we'll review your property using Google Maps or schedule an on-site assessment for a formal quote based on your specific needs.</p>
      </div>
    
      <PriceCalculatorIntro />

      {/* Banners */}
      <div className="flex flex-col gap-4 mb-8">
        {PROMOS.map((promo, idx) => <div key={idx} className={`rounded-lg px-4 py-3 shadow-sm font-semibold ${promo.color}`} style={{
        fontSize: idx === 0 ? "1.10rem" : undefined
      }}>
            <span className="font-bold">{promo.title}</span>
            <span className="block text-sm font-medium">{promo.description}</span>
          </div>)}
      </div>

      {/* Main content with form and testimonials */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Main form area - takes 4 columns on larger screens */}
        <div className="lg:col-span-4">
          {/* Stepper indicator */}
          <div className="flex items-center justify-center mb-6 gap-2 text-xs">
            {[...Array(5)].map((_, n) => <div key={n} className={`h-2 w-8 rounded-full transition-all duration-300 ${step === n ? 'bg-bc-red' : 'bg-gray-300'}`} />)}
          </div>

          {/* Step 1: Address (moved from step 3 to step 1) */}
          {step === 0 && <div>
              <h3 className="text-xl font-bold mb-2">Step 1: Where do you need service?</h3>
              <p className="mb-4 text-gray-600">
                Enter your address to get a customized quote for your property.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Street Address</label>
                  <input 
                    type="text" 
                    value={address} 
                    onChange={e => {
                      setAddress(e.target.value);
                      trackFormFieldInteraction('PriceCalculator', 'Street Address', 'change');
                    }} 
                    onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Street Address', 'focus')}
                    onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Street Address', 'blur')}
                    className="w-full border p-3 rounded-lg" 
                    placeholder="1234 Main St" 
                    autoFocus 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input 
                      type="text" 
                      value={contact.name || ''} 
                      onChange={e => {
                        setContact({...contact, name: e.target.value});
                        trackFormFieldInteraction('PriceCalculator', 'City', 'change');
                      }} 
                      onFocus={() => trackFormFieldInteraction('PriceCalculator', 'City', 'focus')}
                      onBlur={() => trackFormFieldInteraction('PriceCalculator', 'City', 'blur')}
                      className="w-full border p-3 rounded-lg" 
                      placeholder="Vancouver" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Postal Code</label>
                    <input 
                      type="text" 
                      value={contact.phone || ''} 
                      onChange={e => {
                        setContact({...contact, phone: e.target.value});
                        trackFormFieldInteraction('PriceCalculator', 'Postal Code', 'change');
                      }} 
                      onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Postal Code', 'focus')}
                      onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Postal Code', 'blur')}
                      className="w-full border p-3 rounded-lg" 
                      placeholder="V1A 1A1" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email (Optional)</label>
                  <input 
                    type="email" 
                    value={contact.email || ''} 
                    onChange={e => {
                      setContact({...contact, email: e.target.value});
                      trackFormFieldInteraction('PriceCalculator', 'Email', 'change');
                      // Store email in session storage
                      if (e.target.value) {
                        sessionStorage.setItem('userEmail', e.target.value);
                      }
                    }} 
                    onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Email', 'focus')}
                    onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Email', 'blur')}
                    className="w-full border p-3 rounded-lg" 
                    placeholder="you@example.com" 
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We'll send your quote here, even if you don't complete the form
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={() => setStep(1)} disabled={!address.trim()}>
                  Next
                </Button>
              </div>
            </div>}

          {/* Step 2: Size (moved from step 1 to step 2) */}
          {step === 1 && <div>
              <h3 className="text-xl font-bold mb-2">Step 2: What Size Is Your Home?</h3>
              <p className="mb-6 text-gray-600">
                Prices are starting estimates. For homes over 3500 sq. ft., we'll provide an on-site quote.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROPERTY_SIZES.map(sz => (
                  <Card 
                    key={sz.id} 
                    className={`p-4 cursor-pointer flex items-center justify-between hover:border-blue-500 transition-all ${size === sz.id ? 'border-2 border-blue-500 bg-blue-50' : ''}`} 
                    onClick={() => {
                      setSize(sz.id);
                      trackFormFieldInteraction('PriceCalculator', `Property Size: ${sz.label}`, 'change');
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`text-blue-600 ${size === sz.id ? 'scale-110' : ''}`}>
                        {sz.icon}
                      </div>
                      <span className="font-semibold">{sz.label}</span>
                    </div>
                    {size === sz.id && <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                      </svg>}
                  </Card>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button onClick={() => setStep(2)} disabled={!size}>
                  Next
                </Button>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <strong>"Starting at" Pricing:</strong> The prices shown are starting at rates based on typical home sizes. Once you provide your address, we will calculate a more accurate quote for you. For larger or complex jobs, we may visit in person.
              </div>
            </div>}

          {/* Step 3: Services (moved from step 2 to step 3) */}
          {step === 2 && 
            <div>
              <h3 className="text-xl font-bold mb-2">Step 3: Choose Your Services</h3>
              <p className="mb-4 text-gray-600">
                Choose all that apply. Prices update based on your home size.
              </p>
              
              {/* Service Categories Accordion */}
              <Accordion type="single" collapsible className="w-full mb-4">
                {SERVICE_CATEGORIES.map((category, idx) => <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-lg font-medium py-3">
                      {category.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 gap-2 pt-2">
                        {category.services.map(service => <label key={service} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all select-none 
                              ${serviceDisabled(service) ? 'opacity-40 bg-gray-100 pointer-events-none' : services.includes(service) ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-300'}`}>
                            <input type="checkbox" checked={services.includes(service)} disabled={serviceDisabled(service)} className="form-checkbox accent-blue-600" onChange={() => handleServiceChange(service)} style={{
                      width: 20,
                      height: 20
                    }} />
                            <div className="flex items-center gap-2">
                              {SERVICE_ICONS[service as keyof typeof SERVICE_ICONS]}
                              <span className="font-medium">{service}</span>
                            </div>
                            <span className="ml-auto font-semibold text-blue-700 text-sm">
                              {service === 'Roof Cleaning' || size === 'xlarge' ? 'On-site quote required' : `Starting at ${formatCurrency(getPricing(size, service))}`}
                            </span>
                          </label>)}
                      </div>
                    </AccordionContent>
                  </AccordionItem>)}

                {/* Add-ons Section */}
                <AccordionItem value="add-ons">
                  <AccordionTrigger className="text-lg font-medium py-3">
                    Request Add-ons
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 gap-2 pt-2">
                      {ADD_ONS.map(addon => <label key={addon.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all select-none
                            ${addOns.includes(addon.id) ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-300'}`}>
                          <input type="checkbox" checked={addOns.includes(addon.id)} className="form-checkbox accent-blue-600" onChange={() => handleAddOnChange(addon.id)} style={{
                      width: 20,
                      height: 20
                    }} />
                          <span className="font-medium">{addon.name}</span>
                          <span className="ml-auto font-semibold text-blue-700 text-sm">
                            Starting at ${addon.price.toFixed(2)}
                          </span>
                        </label>)}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)} disabled={services.length === 0}>
                  Next
                </Button>
              </div>
              <div className="mt-3 text-xs text-gray-500">
                <p>
                  <strong>How We Create Your Custom Quote:</strong>
                </p>
                <ul className="list-disc list-inside pl-2">
                  <li>
                    <strong>Google Maps Estimate:</strong> For standard homes, we'll generate your estimate using Google Maps and your provided address.
                  </li>
                  <li>
                    <strong>On-Site Estimate:</strong> For roof cleaning or homes over 3500 sq. ft., we'll provide an on-site quote for best accuracy.
                  </li>
                </ul>
              </div>
            </div>
          }

          {/* Step 4: Contact Info (no address field since we moved it to step 1) */}
          {step === 3 && 
            <div>
              <h3 className="text-xl font-bold mb-2">Step 4: Contact Info</h3>
              <p className="mb-4 text-gray-600">Please provide your contact details so we can follow up with your quote.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input 
                  type="text" 
                  className="border p-3 rounded-lg" 
                  placeholder="Name" 
                  value={contact.name} 
                  onChange={e => {
                    setContact(v => ({...v, name: e.target.value}));
                    trackFormFieldInteraction('PriceCalculator', 'Name', 'change');
                  }}
                  onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Name', 'focus')}
                  onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Name', 'blur')}
                  required 
                />
                <input 
                  type="tel" 
                  className="border p-3 rounded-lg" 
                  placeholder="Phone" 
                  value={contact.phone} 
                  onChange={e => {
                    setContact(v => ({...v, phone: e.target.value}));
                    trackFormFieldInteraction('PriceCalculator', 'Phone', 'change');
                  }}
                  onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Phone', 'focus')}
                  onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Phone', 'blur')}
                  required 
                />
                <input 
                  type="text" 
                  className="border p-3 rounded-lg" 
                  placeholder="Referral Name (optional)" 
                  value={contact.referredBy} 
                  onChange={e => {
                    setContact(v => ({...v, referredBy: e.target.value}));
                    trackFormFieldInteraction('PriceCalculator', 'Referral', 'change');
                  }}
                  onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Referral', 'focus')}
                  onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Referral', 'blur')}
                />
              </div>
              <textarea 
                className="border w-full min-h-[60px] max-h-32 p-3 rounded-lg" 
                placeholder="Any other info you'd like to share? (optional)" 
                value={contact.notes} 
                onChange={e => {
                  setContact(v => ({...v, notes: e.target.value}));
                  trackFormFieldInteraction('PriceCalculator', 'Notes', 'change');
                }}
                onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Notes', 'focus')}
                onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Notes', 'blur')}
              />
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={() => setStep(4)} disabled={!contact.name || !contact.phone}>
                  Next
                </Button>
              </div>
            </div>
          }

          {/* Step 5: Estimate Summary */}
          {step === 4 && 
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold mb-2">Step 5: Estimate Summary</h3>
              <p className="mb-4 text-gray-600">
                Here's your custom quote summary. We'll confirm final pricing based on your home layout and needs.
              </p>
              <div className="bg-gray-50 px-4 py-4 rounded-lg mb-4">
                {Object.entries(estimateSummary).map(([name, val]) => <div className="flex justify-between py-1 border-b last:border-none" key={name}>
                    <span className="font-medium">{name}</span>
                    <span className={`font-bold ${val && val < 0 ? 'text-green-700' : 'text-bc-red'}`}>
                      {typeof val === 'number' && val < 0 ? `- $${Math.abs(val)}` : formatCurrency(val)}
                    </span>
                  </div>)}
                <div className="flex justify-between pt-3 mt-3 border-t text-lg font-bold">
                  <span>Final Total Estimate</span>
                  <span className="text-bc-red">{formatCurrency(estTotal)}</span>
                </div>
                <div className="mt-2 text-xs text-gray-500 leading-relaxed">
                  All prices are starting estimates. Your quote may vary based on home layout and condition—<br />
                  we'll confirm before booking. <span className="font-semibold">Final quote confirmed by Jayden.</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-6">
                <Button 
                  className="w-full" 
                  onClick={handleFormSubmit} 
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Get My Custom Quote"}
                </Button>
                <a 
                  href="tel:7788087620" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg text-center font-semibold shadow"
                  onClick={() => trackFormFieldInteraction('PriceCalculator', 'Call Button', 'click')}
                >
                  Call Jayden Now
                </a>
              </div>
              <div className="text-sm text-gray-500 mt-5">
                You'll hear back from Jayden or the team shortly.<br />
                Want to talk to someone now? Call us at <span className="underline">778-808-7620</span>.<br />
                No spam, no pressure—just a clear and honest quote.
              </div>
            </div>
          }

          {step > 4 && 
            <div className="text-center py-10">
              <h3 className="text-2xl font-bold mb-4 text-green-700">Thank you!</h3>
              <p className="mb-2 text-gray-600">We've received your request. Jayden or a team member will contact you soon.</p>
              <a 
                href="tel:7788087620" 
                className="w-fit px-6 py-3 inline-block bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-lg font-bold shadow mt-3"
                onClick={() => trackFormFieldInteraction('PriceCalculator', 'Final Call Button', 'click')}
              >
                Call Jayden Now
              </a>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default PriceCalculatorForm;
