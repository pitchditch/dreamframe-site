
/**
 * Format add-ons array into a readable string
 */
export const formatAddOns = (addOns: string[]): string => {
  if (!addOns || addOns.length === 0) {
    return 'None';
  }

  // Convert kebab case to title case
  return addOns.map(addOn => {
    return addOn
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }).join(', ');
};

/**
 * Calculate estimate total based on selections
 */
export const calculateEstimateTotal = (
  size: any, 
  services: string[], 
  addOns: string[],
  getPricing?: any
): number => {
  let total = 0;
  
  // Base prices for services
  const servicePrices: Record<string, number> = {
    'window-cleaning': 175,
    'gutter-cleaning': 150,
    'pressure-washing': 200,
    'roof-cleaning': 350,
    'Window Cleaning (Outside)': 150,
    'Window Cleaning (Inside)': 150,
    'Both Window Sides': 250,
    'House Washing': 225,
    'House Wash + Windows': 350,
    'Driveway Washing': 175,
    'Driveway + House Washing': 350,
    'Deck Washing': 175,
    'Gutter Cleaning (Inside)': 125,
    'Gutter Cleaning (Outside)': 125,
    'Gutter Cleaning (Both)': 200,
    'Roof Cleaning': 350,
  };
  
  // Add-on prices
  const addOnPrices: Record<string, number> = {
    'screen-cleaning': 50,
    'track-cleaning': 40,
    'gutter-guards': 75,
    'moss-treatment': 125,
    'fascia-cleaning': 99,
    'window-track': 49,
  };
  
  // Size multipliers
  const sizeMultipliers: Record<string, number> = {
    'small': 0.8,
    'medium': 1,
    'large': 1.3,
    'extra-large': 1.6,
    'x-large': 1.6,
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
  
  // Apply size multiplier if size is a string
  if (typeof size === 'string' && sizeMultipliers[size]) {
    total *= sizeMultipliers[size];
  } else if (size?.houseSize && sizeMultipliers[size.houseSize]) {
    // Or if size is an object with a houseSize property
    total *= sizeMultipliers[size.houseSize];
  }
  
  return Math.round(total);
};

/**
 * Submit form data to backend
 */
export const submitFormData = async (
  formData: any,
  setSubmitting: (state: boolean) => void,
  onSuccess: () => void,
  toast: any
) => {
  try {
    console.log('Submitting form data:', formData);
    
    // Send to our Supabase edge function
    const response = await fetch('/api/send-confirmations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        phone: formData.phone,
        name: formData.name,
        formType: 'Price Calculator Quote',
        message: formData.message || '',
        estimateTotal: formData.estimateTotal,
        services: formData.services,
        addOns: formData.addOns,
        houseSize: formData.houseSize,
        address: formData.address,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    const result = await response.json();
    console.log('Form submitted successfully:', result);
    
    toast({
      title: 'Quote Request Submitted!',
      description: 'We\'ll contact you shortly with your personalized quote.',
    });
    
    onSuccess();
  } catch (error) {
    console.error('Error submitting form:', error);
    
    // Fallback to EmailJS if our API fails
    try {
      const emailjs = await import('@emailjs/browser');
      
      await emailjs.send(
        'service_xrk4vas',
        'template_cpivz2k',
        formData,
        'MMzAmk5eWrjFgC_nP'
      );
      
      toast({
        title: 'Quote Request Submitted!',
        description: 'We\'ll contact you shortly with your personalized quote.',
      });
      
      onSuccess();
    } catch (fallbackError) {
      console.error('Fallback email service also failed:', fallbackError);
      toast({
        title: 'Submission Failed',
        description: 'There was a problem submitting your request. Please try again.',
        variant: 'destructive'
      });
      setSubmitting(false);
    }
  }
};
