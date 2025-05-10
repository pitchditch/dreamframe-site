
import { ADD_ONS } from '../data/constants';
import { trackFormSubmission } from '@/utils/analytics';
import emailjs from '@emailjs/browser';
import { FormSubmissionData } from '../types/calculatorTypes';
import { useToast } from '@/hooks/use-toast';

export const calculateEstimateTotal = (size: string, services: string[], addOns: string[], getPricing: Function): number => {
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

  return estTotal;
};

export const formatAddOns = (addOns: string[]): string => {
  return addOns.length > 0 
    ? addOns.map(id => {
        const addon = ADD_ONS.find(a => a.id === id);
        return addon ? addon.name : id;
      }).join(', ') 
    : 'None';
};

export const submitFormData = async (
  formData: FormSubmissionData, 
  setSubmitting: (value: boolean) => void, 
  onSuccess: () => void,
  toast: ReturnType<typeof useToast>['toast']
): Promise<void> => {
  try {
    console.log('Sending data to EmailJS:', formData);

    // Validate required fields
    if (!formData.name || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and phone number.",
        variant: "destructive"
      });
      setSubmitting(false);
      return;
    }

    try {
      // Prepare data for EmailJS by converting arrays to strings if needed
      const emailjsData = {
        ...formData,
        // Convert arrays to strings for EmailJS
        services: Array.isArray(formData.services) ? formData.services.join(', ') : formData.services,
        addons: Array.isArray(formData.addons) ? formData.addons.join(', ') : formData.addons
      };
      
      console.log('Sending data to EmailJS with parameters:', {
        service_id: 'service_xrk4vas',
        template_id: 'template_b2y5ak4',
        user_id: 'MMzAmk5eWrjFgC_nP',
        template_params: emailjsData
      });
      
      // Send data to EmailJS with updated credentials
      const response = await emailjs.send(
        'service_xrk4vas',   // Updated EmailJS service ID
        'template_b2y5ak4',  // Updated EmailJS template ID
        emailjsData,         // The data being sent
        'MMzAmk5eWrjFgC_nP'  // Updated public key
      );
      console.log('EmailJS response:', response);

      // Track form submission
      trackFormSubmission('PriceCalculator', {
        property_size: formData.size,
        services_count: Array.isArray(formData.services) ? formData.services.length : 0,
        addons_count: Array.isArray(formData.addons) ? formData.addons.length : 0,
        estimate_amount: formData.estimate,
        status: 'success'
      });

      toast({
        title: "Quote Submitted Successfully!",
        description: "We will contact you shortly about your service quote.",
      });

      // Execute success callback
      onSuccess();
      
    } catch (emailError) {
      console.error('EmailJS error:', emailError);
      
      // Handle EmailJS errors
      if (emailError instanceof Error) {
        console.log('EmailJS error message:', emailError.message);
        
        toast({
          title: "Submission Error",
          description: `Error sending email: ${emailError.message}. Please try again or contact us directly.`,
          variant: "destructive"
        });
        
        setSubmitting(false);
      } else {
        throw emailError;
      }
    }
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
    
    setSubmitting(false);
  }
};
