
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { trackFormStep } from '@/utils/analytics';
import { getPricing } from '../utils/pricingUtils';
import { ADD_ONS } from '../data/constants';
import { ContactInfo, FormSubmissionData } from '../types/calculatorTypes';
import { calculateEstimateTotal, formatAddOns, submitFormData } from '../utils/calculatorUtils';

export type { ContactInfo } from '../types/calculatorTypes';

export const usePriceCalculatorForm = (initialStep = 0, onComplete?: () => void, prefillData: any = {}) => {
  const [step, setStep] = useState(initialStep);
  const [size, setSize] = useState<string>(prefillData.houseSize || '');
  const [services, setServices] = useState<string[]>([]);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [address, setAddress] = useState(prefillData.postalCode || '');
  const [contact, setContact] = useState<ContactInfo>({
    name: '',
    phone: '',
    email: '',
    referredBy: '',
    notes: ''
  });
  const [preferredDate, setPreferredDate] = useState<Date | undefined>();
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
      step === 3 ? 'Photos Upload' :
      step === 4 ? 'Date Selection' :
      step === 5 ? 'Contact Info' :
      step === 6 ? 'Summary' :
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
    setPhotos([]);
    setAddress('');
    setContact({
      name: '',
      phone: '',
      email: '',
      referredBy: '',
      notes: ''
    });
    setPreferredDate(undefined);
    setEstimateTotal(null);
  };

  const handleFormSubmit = async () => {
    if (!contact.name || !contact.phone) {
      toast({
        title: 'Missing Info',
        description: 'Please enter your name and phone number.',
        variant: 'destructive'
      });
      return;
    }

    setSubmitting(true);
    console.log('Form submission initiated');

    try {
      const total = calculateAndSetEstimateTotal();

      const templateParams: FormSubmissionData = {
        name: contact.name,
        email: contact.email || 'Not provided',
        phone: contact.phone,
        referredBy: contact.referredBy || 'None',
        address: address || 'Not provided',
        size: size || 'Not selected',
        services: services.length > 0 ? services : ['None'],
        addons: addOns.length > 0 ? addOns : ['None'],
        notes: contact.notes || 'None',
        estimate: total ? `${total}` : 'To be determined',
        photoCount: photos.length.toString()
      };

      console.log('Submitting form data:', templateParams);
      
      await submitFormData(
        templateParams, 
        setSubmitting, 
        () => {
          console.log('Form submitted successfully, moving to thank you step');
          setStep(7);
          if (onComplete) onComplete();
        },
        toast
      );
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: 'Submission Failed',
        description: 'Something went wrong while submitting the form. Please try again.',
        variant: 'destructive'
      });
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
    photos,
    setPhotos,
    address,
    setAddress,
    contact,
    setContact,
    preferredDate,
    setPreferredDate,
    submitting,
    estimateTotal,
    calculateAndSetEstimateTotal,
    handleFormSubmit,
    resetForm
  };
};
