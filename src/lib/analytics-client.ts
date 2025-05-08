
/**
 * Analytics client for tracking user events and page views
 */

// GA4 Tracking ID
const GA_TRACKING_ID = 'G-XTJFNK4L59';

// Function to track page views
export const trackPage = (path: string, title?: string) => {
  try {
    console.log(`📊 Page View: ${path}`, { title });
    
    // If window.gtag is available, track with Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: path,
        page_title: title || document.title
      });
    }
    
    // You can add additional analytics services here
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Function to track events
export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  try {
    console.log(`📊 Event: ${eventName}`, eventParams);
    
    // If window.gtag is available, track with Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
    
    // You can add additional analytics services here
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Function to initialize analytics
export const initAnalytics = () => {
  try {
    console.log('Analytics client initialized');
    
    // We don't need to reinitialize GA4 here since it's already set up in index.html
    // and App.tsx, but we can use this function to set up additional analytics services
    
    // Track initial page view
    trackPage(window.location.pathname, document.title);
  } catch (error) {
    console.error('Error initializing analytics:', error);
  }
};

// Form tracking helper
export const trackFormView = (formName: string, formData: Record<string, any> = {}) => {
  trackEvent('form_view', {
    form_name: formName,
    ...formData
  });
};

// Form submission tracking helper with enhanced parameters
export const trackFormSubmit = (formName: string, formData: Record<string, any> = {}) => {
  trackEvent('form_submit', {
    form_name: formName,
    ...formData
  });
};
