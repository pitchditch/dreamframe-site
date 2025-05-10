
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { trackFormStep, trackFormSubmission } from '@/utils/analytics';
import emailjs from '@emailjs/browser';
import { getPricing } from '../utils/pricingUtils';
import { ADD_ONS } from '../data/constants';

export interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  referredBy: string;
  notes: string;
}

export const usePriceCalculatorForm = (initialStep = 0, onComplete?: () => void) => {
  const [step, setStep] = useState(initialStep);
  const [size, setSize] = useState<string>('');
  const [services, setServices] = useState<string[]>([]);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState<ContactInfo>({
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

  const calculateEstimateTotal = () => {
    let estTotal = 0;

    if (size && services.length > 0) {
      // Calculate base price based on selected services and size
      for (const service of services) {
        estTotal += getPricing(service, size);
      }
      
      // Add pricing for add-ons
      for (const addon of addOns) {
        const addonInfo = ADD_ONS.find(a => a.id === addon);
        if (addonInfo && addonInfo.price) {
          estTotal += addonInfo.price;
        }
      }
    }

    setEstimateTotal(estTotal);
    return estTotal;
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

  const handleFormSubmit = async () => {
    setSubmitting(true);
    calculateEstimateTotal();

    try {
      const templateParams = {
        address: address,
        property_size: size,
        services: services.join(', '),
        add_ons: addOns.length > 0 ? addOns.join(', ') : 'None',
        customer_name: contact.name,
        phone: contact.phone,
        email: contact.email || 'Not provided',
        referred_by: contact.referredBy || 'None',
        notes: contact.notes || 'None',
        estimate_total: estimateTotal ? `$${estimateTotal}` : 'To be determined'
      };

      await emailjs.send(
        'service_qp184qj',
        'template_820fxcj',
        templateParams,
        'w0cDPAeLXkNj47ZkP'
      );

      trackFormSubmission('PriceCalculator', 'success', {
        property_size: size,
        services_count: services.length,
        addons_count: addOns.length,
        estimate_amount: estimateTotal
      });

      toast({
        title: "Quote Submitted Successfully!",
        description: "We will contact you shortly about your service quote.",
      });

      setStep(5);
      if (onComplete) onComplete();
    } catch (error) {
      console.error('Error submitting form:', error);
      
      trackFormSubmission('PriceCalculator', 'error', {
        error_message: error instanceof Error ? error.message : 'Unknown error'
      });
      
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your quote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return {
    step,
    setStep,
    size,
    setSize,
    services,
    setServices,
    addOns,
    setAddOns,
    address,
    setAddress,
    contact,
    setContact,
    submitting,
    estimateTotal,
    calculateEstimateTotal,
    handleFormSubmit,
    resetForm
  };
};
