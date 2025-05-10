
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
        const servicePrice = getPricing(size, service);
        if (typeof servicePrice === 'number') {
          estTotal += servicePrice;
        }
      }
      
      // Add pricing for add-ons
      for (const addon of addOns) {
        const addonInfo = ADD_ONS.find(a => a.id === addon);
        if (addonInfo && addonInfo.price) {
          estTotal += addonInfo.price;
        }
      }
      
      // Apply bundle discount if eligible
      if (services.filter(s => s !== 'Roof Cleaning').length >= 3) {
        estTotal -= 200; // $200 bundle discount
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
    console.log('Starting form submission...');
    
    // Calculate the estimate total before sending
    const total = calculateEstimateTotal();
    console.log('Calculated total:', total);

    try {
      // Format services and add-ons for better readability in email
      const formattedServices = services.join(', ');
      const formattedAddOns = addOns.length > 0 
        ? addOns.map(id => {
            const addon = ADD_ONS.find(a => a.id === id);
            return addon ? addon.name : id;
          }).join(', ') 
        : 'None';

      // Prepare email template parameters with all form data
      const templateParams = {
        address: address,
        property_size: size,
        services: formattedServices,
        add_ons: formattedAddOns,
        customer_name: contact.name,
        phone: contact.phone,
        email: contact.email || 'Not provided',
        referred_by: contact.referredBy || 'None',
        notes: contact.notes || 'None',
        estimate_total: total ? `$${total}` : 'To be determined'
      };

      // Log the data being sent to help with debugging
      console.log('Sending data to EmailJS:', templateParams);

      // Send the email using EmailJS
      const response = await emailjs.send(
        'service_qp184qj',
        'template_820fxcj',
        templateParams,
        'w0cDPAeLXkNj47ZkP'
      );
      
      console.log('EmailJS response:', response);

      // Track form submission
      trackFormSubmission('PriceCalculator', {
        property_size: size,
        services_count: services.length,
        addons_count: addOns.length,
        estimate_amount: total,
        status: 'success'
      });

      toast({
        title: "Quote Submitted Successfully!",
        description: "We will contact you shortly about your service quote.",
      });

      // Move to thank you step after successful submission
      setStep(5);
      if (onComplete) onComplete();
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Track form submission error
      trackFormSubmission('PriceCalculator', {
        error_message: error instanceof Error ? error.message : 'Unknown error',
        status: 'error'
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
