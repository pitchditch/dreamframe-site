
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { trackFormSubmission } from "@/utils/analytics";
import emailjs from '@emailjs/browser';

export interface AddressData {
  street: string;
  city: string;
  postalCode: string;
}

export interface SizeData {
  houseSize: string;
  stories: string;
  windowCount: string;
}

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export const usePriceCalculatorForm = (initialStep = 0, onComplete?: () => void) => {
  const [step, setStep] = useState<number>(initialStep);
  const [address, setAddress] = useState<AddressData>({ street: '', city: '', postalCode: '' });
  const [size, setSize] = useState<SizeData>({ houseSize: 'medium', stories: '2', windowCount: '15' });
  const [services, setServices] = useState<string[]>([]);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [contact, setContact] = useState<ContactData>({ name: '', email: '', phone: '', notes: '' });
  const [preferredDate, setPreferredDate] = useState<Date | undefined>(undefined);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { toast } = useToast();

  // Calculate the estimated total based on selections
  const estimateTotal = () => {
    let total = 0;
    
    // Base prices for services
    const servicePrices: Record<string, number> = {
      'window-cleaning': 175,
      'gutter-cleaning': 150,
      'pressure-washing': 200,
      'roof-cleaning': 350,
    };
    
    // Add-on prices
    const addOnPrices: Record<string, number> = {
      'screen-cleaning': 50,
      'track-cleaning': 40,
      'gutter-guards': 75,
      'moss-treatment': 125,
    };
    
    // Size multipliers
    const sizeMultipliers: Record<string, number> = {
      small: 0.8,
      medium: 1,
      large: 1.3,
      'extra-large': 1.6,
    };
    
    // Stories multipliers
    const storyMultipliers: Record<string, number> = {
      '1': 0.9,
      '2': 1,
      '3': 1.3,
      '4+': 1.7,
    };
    
    // Calculate base price from services
    services.forEach(service => {
      if (servicePrices[service]) {
        total += servicePrices[service];
      }
    });
    
    // Add add-on prices
    addOns.forEach(addOn => {
      if (addOnPrices[addOn]) {
        total += addOnPrices[addOn];
      }
    });
    
    // Apply size multiplier
    if (size.houseSize && sizeMultipliers[size.houseSize]) {
      total *= sizeMultipliers[size.houseSize];
    }
    
    // Apply story multiplier
    if (size.stories && storyMultipliers[size.stories]) {
      total *= storyMultipliers[size.stories];
    }
    
    return Math.round(total);
  };

  const handleFormSubmit = () => {
    setSubmitting(true);
    
    // Track form submission
    trackFormSubmission('quote_request', {
      form_type: 'calculator',
      services: services.join(','),
      addons: addOns.join(','),
      house_size: size.houseSize,
      stories: size.stories,
      preferred_date: preferredDate ? preferredDate.toISOString() : 'Not specified'
    });
    
    // Format service names for email
    const serviceNames = {
      'window-cleaning': 'Window Cleaning',
      'gutter-cleaning': 'Gutter Cleaning',
      'pressure-washing': 'Pressure Washing',
      'roof-cleaning': 'Roof Cleaning',
    };
    
    const addOnNames = {
      'screen-cleaning': 'Screen Cleaning',
      'track-cleaning': 'Track Cleaning',
      'gutter-guards': 'Gutter Guards',
      'moss-treatment': 'Moss Treatment',
    };
    
    const formattedServices = services
      .map(s => serviceNames[s as keyof typeof serviceNames] || s)
      .join(', ');
      
    const formattedAddOns = addOns
      .map(a => addOnNames[a as keyof typeof addOnNames] || a)
      .join(', ') || 'None';
    
    // Prepare the data for email
    const templateParams = {
      from_name: contact.name,
      from_email: contact.email,
      phone: contact.phone,
      address: `${address.street}, ${address.city}, ${address.postalCode}`,
      house_size: size.houseSize,
      stories: size.stories,
      window_count: size.windowCount || 'Not specified',
      services: formattedServices,
      add_ons: formattedAddOns,
      total_estimate: `$${estimateTotal()}`,
      preferred_date: preferredDate ? new Date(preferredDate).toLocaleDateString() : 'Not specified',
      notes: contact.notes || 'None',
      subject: 'New Quote Request from Website Calculator'
    };
    
    // Send email using EmailJS
    emailjs.send(
      'service_xrk4vas',
      'template_cpivz2k',
      templateParams,
      'MMzAmk5eWrjFgC_nP'
    )
    .then((response) => {
      console.log('Email sent successfully:', response);
      toast({
        title: "Quote Request Submitted!",
        description: "We'll contact you shortly to confirm your service details.",
      });
      
      if (onComplete) {
        onComplete();
      } else {
        setStep(5); // Show completion screen
      }
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
    })
    .finally(() => {
      setSubmitting(false);
    });
  };

  const resetForm = () => {
    setStep(0);
    setAddress({ street: '', city: '', postalCode: '' });
    setSize({ houseSize: 'medium', stories: '2', windowCount: '15' });
    setServices([]);
    setAddOns([]);
    setContact({ name: '', email: '', phone: '', notes: '' });
    setPreferredDate(undefined);
  };

  return {
    step,
    setStep,
    address,
    setAddress,
    size,
    setSize,
    services,
    setServices,
    addOns,
    setAddOns,
    contact,
    setContact,
    preferredDate,
    setPreferredDate,
    submitting,
    estimateTotal,
    handleFormSubmit,
    resetForm,
  };
};

export default usePriceCalculatorForm;
