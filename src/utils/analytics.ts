
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
    
    // Log submission to console for debugging purposes
    console.log(`Form submission: ${formName}`, formData ? JSON.stringify(formData) : '');
    
    // If you want to implement a fallback tracking solution:
    try {
      // Create a custom event that can be tracked even without GA
      const event = new CustomEvent('form_submission', { 
        detail: { 
          form: formName, 
          data: formData 
        } 
      });
      document.dispatchEvent(event);
      
      // Store submission in localStorage for potential later tracking
      const submissions = JSON.parse(localStorage.getItem('form_submissions') || '[]');
      submissions.push({
        timestamp: new Date().toISOString(),
        form: formName,
        data: formData ? {
          form_type: formData.form_type || formName,
          service_type: formData.service_type,
          property_type: formData.propertyType,
          // Avoid including personal data
        } : {}
      });
      localStorage.setItem('form_submissions', JSON.stringify(submissions));
    } catch (error) {
      console.error('Error with fallback tracking:', error);
    }
    
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

/**
 * Setup Google Analytics if not already initialized
 */
export const setupAnalytics = (measurementId: string) => {
  if (typeof window.gtag !== 'function') {
    // Only load GA script if it doesn't exist
    if (!document.getElementById('ga-script')) {
      // Create and append the GA script
      const script = document.createElement('script');
      script.id = 'ga-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);
      
      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      
      window.gtag('js', new Date());
      window.gtag('config', measurementId);
      
      console.log('Google Analytics initialized');
    }
  }
};

/**
 * Track a page view event
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics not loaded, skipping page view tracking');
    return;
  }
  
  try {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle || document.title
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Add global type for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
