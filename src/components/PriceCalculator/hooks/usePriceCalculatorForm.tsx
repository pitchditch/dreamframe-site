
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

    if (size !== 'xlarge') {
      // Add service prices
      for (const s of services) {
        const price = getPricing(size, s);
        if (typeof price === 'number') estTotal += price;
      }

      // Add selected add-ons to the total
      addOns.forEach(addonId => {
        const addon = ADD_ONS.find(a => a.id === addonId);
        if (addon) estTotal += addon.price;
      });
      
      // Apply bundle discount if eligible
      const eligibleBundleDiscount = services.filter(s => s !== 'Roof Cleaning').length >= 3;
      if (eligibleBundleDiscount) {
        estTotal -= 200;
      }
    }

    return estTotal;
  };

  const handleFormSubmit = async () => {
    setSubmitting(true);

    console.log('📧 Contact Info:', contact);
    console.log('📧 Address:', address);
    console.log('📧 Size:', size);
    console.log('📧 Services:', services);
    console.log('📧 Add-ons:', addOns);

    const estTotal = calculateEstimateTotal();
    setEstimateTotal(estTotal);

    trackFormSubmission('PriceCalculator', {
      form_type: 'PriceCalculator',
      service_type: services.join(', '),
      property_type: size,
      total_estimate: estTotal,
      addons: addOns.length > 0 ? addOns.join(', ') : 'none',
      discount_applied: services.filter(s => s !== 'Roof Cleaning').length >= 3 ? 'yes' : 'no'
    });

    try {
      // Create form data object for EmailJS
      const templateParams = {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        referredBy: contact.referredBy,
        notes: contact.notes,
        address: address,
        services: services.join(', '),
        size: size,
        addons: addOns.length > 0 ? addOns.join(', ') : 'none',
        estimate: estTotal.toFixed(2)
      };
      
      console.log('📧 Sending email with EmailJS:', templateParams);
      
      // Send the email using EmailJS
      const response = await emailjs.send(
        "service_xrk4vas",  // Service ID from index.html
        "template_b2y5ak4", // Template ID from index.html
        templateParams,
        "MMzAmk5eWrjFgC_nP"  // Public key from index.html
      );
      
      console.log('📧 Email sent successfully:', response);
      
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
    handleFormSubmit,
    resetForm
  };
};
