
/**
 * Utility functions for Google Analytics tracking
 */

/**
 * Track a form submission event in Google Analytics
 * 
 * @param formName - The name of the form being submitted (e.g., 'contact', 'maintenance')
 * @param formData - Optional data to include with the event (don't include sensitive information)
 */
export const trackFormSubmission = (formName: string, formData?: Record<string, any>) => {
  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics not loaded, skipping event tracking');
    return;
  }
  
  try {
    // Only include non-sensitive data like form types or categories
    const safeData = formData ? {
      form_type: formData.form_type || formName,
      service_type: formData.service_type,
      property_type: formData.propertyType,
      // Avoid including personal data like emails, names, addresses, etc.
    } : {};
    
    // Track the form submission event
    window.gtag('event', 'form_submission', {
      'event_category': 'Forms',
      'event_label': formName,
      ...safeData
    });
    
    console.log(`Tracked form submission: ${formName}`);
  } catch (error) {
    console.error('Error tracking form submission:', error);
  }
};
