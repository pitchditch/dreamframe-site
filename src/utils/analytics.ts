// Import any necessary libraries
import { trackEvent } from '@/lib/analytics-client';

// Track form submissions
export const trackFormSubmission = (formName: string, formData: Record<string, any>) => {
  try {
    console.log(`Form submission tracked: ${formName}`, formData);
    // Send to Google Analytics or other tracking service if needed
    trackEvent('form_submission', {
      form_name: formName,
      ...formData
    });
  } catch (error) {
    console.error('Error tracking form submission:', error);
  }
};

// Track form field interactions
export const trackFormFieldInteraction = (
  formName: string, 
  fieldName: string, 
  interactionType: 'focus' | 'change' | 'blur' | 'click'
) => {
  try {
    console.log(`Form field interaction tracked: ${formName} - ${fieldName} - ${interactionType}`);
    // Send to Google Analytics or other tracking service if needed
    trackEvent('form_field_interaction', {
      form_name: formName,
      field_name: fieldName,
      interaction_type: interactionType
    });
  } catch (error) {
    console.error('Error tracking form field interaction:', error);
  }
};

// Track page views
export const trackPageView = (path: string) => {
  try {
    console.log(`Page view tracked: ${path}`);
    // Send to Google Analytics or other tracking service if needed
    trackEvent('page_view', {
      path: path,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Track button clicks
export const trackButtonClick = (buttonName: string, buttonData?: Record<string, any>) => {
  try {
    console.log(`Button click tracked: ${buttonName}`, buttonData);
    trackEvent('button_click', {
      button_name: buttonName,
      ...buttonData
    });
  } catch (error) {
    console.error('Error tracking button click:', error);
  }
};

// Track service selection
export const trackServiceSelection = (serviceName: string, serviceData?: Record<string, any>) => {
  try {
    console.log(`Service selected: ${serviceName}`, serviceData);
    trackEvent('service_selection', {
      service_name: serviceName,
      ...serviceData
    });
  } catch (error) {
    console.error('Error tracking service selection:', error);
  }
};

// Track calculator usage
export const trackCalculatorUsage = (calculatorData: Record<string, any>) => {
  try {
    console.log('Calculator usage tracked:', calculatorData);
    trackEvent('calculator_usage', calculatorData);
  } catch (error) {
    console.error('Error tracking calculator usage:', error);
  }
};
