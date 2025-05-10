
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import PriceCalculatorIntro from './PriceCalculatorIntro';
import { trackFormSubmission, trackFormStep } from '@/utils/analytics';
import { PROMOS, ADD_ONS } from './data/constants';
import StepAddressInput from './steps/StepAddressInput';
import StepSizeInput from './steps/StepSizeInput';
import StepServicesInput from './steps/StepServicesInput';
import StepContactInput from './steps/StepContactInput';
import StepSummary from './steps/StepSummary';
import StepThankYou from './steps/StepThankYou';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { getPricing } from './utils/pricingUtils';

interface PriceCalculatorFormProps {
  onComplete?: () => void;
  initialStep?: string;
}

const PriceCalculatorForm: React.FC<PriceCalculatorFormProps> = ({
  onComplete,
  initialStep
}) => {
  const [step, setStep] = useState(0);
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
  const [estimateTotal, setEstimateTotal] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedPostalCode = sessionStorage.getItem('postalCode') || localStorage.getItem('postalCode');
    if (savedPostalCode) {
      setContact(prev => ({
        ...prev,
        phone: savedPostalCode
      }));
    }
  }, []);

  useEffect(() => {
    if (initialStep === 'services') setStep(2);
    else if (initialStep === 'contact') setStep(3);
    else if (initialStep === 'summary') setStep(4);
    else setStep(0);
  }, [initialStep]);

  useEffect(() => {
    trackFormStep(
      'PriceCalculator',
      step + 1,
      step === 0 ? 'Address' :
      step === 1 ? 'Property Size' :
      step === 2 ? 'Services Selection' :
      step === 3 ? 'Contact Info' :
      step === 4 ? 'Summary' :
      'Thank You'
    );
  }, [step]);

  const handleFormSubmit = async () => {
    setSubmitting(true);

    console.log('📧 Contact Info:', contact);
    console.log('📧 Address:', address);
    console.log('📧 Size:', size);
    console.log('📧 Services:', services);
    console.log('📧 Add-ons:', addOns);

    let estTotal = 0;

    if (size !== 'xlarge') {
      for (const s of services) {
        const price = getPricing(size, s);
        if (typeof price === 'number') estTotal += price;
      }

      addOns.forEach(addonId => {
        const addon = ADD_ONS.find(a => a.id === addonId);
        if (addon) estTotal += addon.price;
      });

      const eligibleBundleDiscount = services.filter(s => s !== 'Roof Cleaning').length >= 3;
      if (eligibleBundleDiscount) {
        estTotal -= 200;
      }
    }

    setEstimateTotal(estTotal);

    trackFormSubmission('PriceCalculator', {
      form_type: 'PriceCalculator',
      service_type: services.join(', '),
      property_type: size,
      total_estimate: estTotal,
      addons: addOns.length > 0 ? addOns.join(', ') : 'none',
      discount_applied: services.filter(s => s !== 'Roof Cleaning').length >= 3 ? 'yes' : 'no'
    });

    if (
      !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_USER_ID
    ) {
      console.error("Missing EmailJS environment variables");
      toast({
        title: "Configuration Error",
        description: "Unable to send email due to missing configuration. Please try again later.",
        variant: "destructive"
      });
      setSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          referredBy: contact.referredBy,
          notes: contact.notes,
          address,
          services: services.join(', '),
          size,
          addons: addOns.length > 0 ? addOns.join(', ') : 'none',
          estimate: estTotal.toFixed(2)
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      );
      console.log('📧 Email sent successfully');
      toast({
        title: "Quote Submitted",
        description: "Your quote request has been sent successfully!",
        duration: 5000,
      });
    } catch (error) {
      console.error('❌ EmailJS Error:', error);
      toast({
        title: "Error Sending Quote",
        description: "There was an error sending your quote. Please try again.",
        variant: "destructive",
      });
    }

    setTimeout(() => {
      setSubmitting(false);
      if (onComplete) onComplete();
      setStep(5);
    }, 1200);
  };

  const resetForm = () => {
    setStep(0);
    setSize('');
    setServices([]);
    setAddOns([]);
    setAddress('');
    setContact({
      name: '',
      phone: '',
      email: '',
      referredBy: '',
      notes: ''
    });
    setEstimateTotal(null);
  };
  
  const renderStep = () => {
    switch (step) {
      case 0:
        return <StepAddressInput 
          address={address} 
          setAddress={setAddress}
          contact={contact}
          setContact={setContact}
          onNextStep={() => setStep(1)} 
        />;
      case 1:
        return <StepSizeInput 
          size={size} 
          setSize={setSize} 
          onNextStep={() => setStep(2)} 
          onPrevStep={() => setStep(0)} 
        />;
      case 2:
        return <StepServicesInput 
          size={size}
          services={services} 
          setServices={setServices} 
          addOns={addOns}
          setAddOns={setAddOns}
          onNextStep={() => setStep(3)} 
          onPrevStep={() => setStep(1)} 
        />;
      case 3:
        return <StepContactInput 
          contact={contact} 
          setContact={setContact} 
          onNextStep={() => setStep(4)} 
          onPrevStep={() => setStep(2)} 
        />;
      case 4:
        return <StepSummary 
          address={address}
          size={size}
          services={services}
          addOns={addOns}
          contact={contact}
          onPrevStep={() => setStep(3)}
          onSubmit={handleFormSubmit}
          submitting={submitting}
          estimateTotal={estimateTotal}
        />;
      case 5:
        return <StepThankYou 
          estimateTotal={estimateTotal} 
          onStartNew={resetForm} 
        />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <PriceCalculatorIntro />
      <div className="p-6">
        {renderStep()}
      </div>
    </div>
  );
};

export default PriceCalculatorForm;
