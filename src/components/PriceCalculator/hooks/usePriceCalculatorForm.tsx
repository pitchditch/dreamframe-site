
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { trackFormStep } from '@/utils/analytics';
import { getPricing } from '../utils/pricingUtils';
import { ADD_ONS } from '../data/constants';
import { ContactInfo, FormSubmissionData } from '../types/calculatorTypes';
import { calculateEstimateTotal, formatAddOns, submitFormData } from '../utils/calculatorUtils';

// Use export type for re-exporting types when isolatedModules is enabled
export type { ContactInfo } from '../types/calculatorTypes';

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

  const calculateAndSetEstimateTotal = () => {
    const total = calculateEstimateTotal(size, services, addOns, getPricing);
    setEstimateTotal(total);
    return total;
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
    // Validation check
    if (!contact.name || !contact.phone) {
      toast({
        title: "Required Fields Missing",
        description: "Please provide your name and phone number.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    console.log('Starting form submission...');
    
    // Calculate the estimate total before sending
    const total = calculateAndSetEstimateTotal();
    console.log('Calculated total:', total);

    // Format services and add-ons for better readability in email
    const formattedServices = services.join(', ');
    const formattedAddOns = formatAddOns(addOns);

    // Prepare email template parameters with all form data
    const templateParams: FormSubmissionData = {
      name: contact.name,
      email: contact.email || 'Not provided',
      phone: contact.phone,
      referredBy: contact.referredBy || 'None',
      address: address,
      size: size,
      services: services,  // Keep as array to match FormSubmissionData type
      addons: addOns,      // Keep as array to match FormSubmissionData type
      notes: contact.notes || 'None',
      estimate: total ? `${total}` : 'To be determined'
    };

    // Submit the form data
    await submitFormData(
      templateParams, 
      setSubmitting, 
      () => {
        setStep(5);
        if (onComplete) onComplete();
      }
    );
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
    calculateAndSetEstimateTotal,
    handleFormSubmit,
    resetForm
  };
};
