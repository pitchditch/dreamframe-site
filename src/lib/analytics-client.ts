
/**
 * Analytics client for tracking user events and page views
 */

// Function to track page views
export const trackPage = (path: string, title?: string) => {
  try {
    console.log(`📊 Page View: ${path}`, { title });
    
    // If window.gtag is available, track with Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-YOUR_TRACKING_ID', {
        page_path: path,
        page_title: title
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
    
    // You can add initialization code for analytics services here
    
    // Track initial page view
    trackPage(window.location.pathname, document.title);
  } catch (error) {
    console.error('Error initializing analytics:', error);
  }
};
