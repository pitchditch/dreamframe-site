
/**
 * Analytics client for tracking user events and page views
 */

// GA4 Tracking ID
const GA_TRACKING_ID = 'G-XTJFNK4L59';

// Facebook Pixel ID (to be configured)
const FB_PIXEL_ID = ''; // Add your Facebook Pixel ID here

// Initialize Facebook Pixel
const initFacebookPixel = () => {
  if (typeof window !== 'undefined' && FB_PIXEL_ID && !window.fbq) {
    // Facebook Pixel Code
    (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', FB_PIXEL_ID);
    window.fbq('track', 'PageView');
  }
};

// Function to track page views
export const trackPage = (path: string, title?: string) => {
  try {
    console.log(`📊 Page View: ${path}`, { title });
    
    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: path,
        page_title: title || document.title
      });
    }
    
    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq && FB_PIXEL_ID) {
      window.fbq('track', 'PageView');
    }
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Function to track events
export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  try {
    console.log(`📊 Event: ${eventName}`, eventParams);
    
    // Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
    
    // Facebook Pixel - Map common events
    if (typeof window !== 'undefined' && window.fbq && FB_PIXEL_ID) {
      const fbEventMap: Record<string, string> = {
        'form_submit': 'Lead',
        'quote_request': 'Lead',
        'quote_sent': 'Purchase',
        'contact_form': 'Contact',
        'phone_click': 'Contact',
        'email_click': 'Contact',
      };
      
      const fbEvent = fbEventMap[eventName] || 'CustomEvent';
      if (fbEvent === 'CustomEvent') {
        window.fbq('trackCustom', eventName, eventParams);
      } else {
        window.fbq('track', fbEvent, eventParams);
      }
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

// Function to initialize analytics
export const initAnalytics = () => {
  try {
    console.log('Analytics client initialized');
    
    // Initialize Facebook Pixel
    initFacebookPixel();
    
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

// Quote tracking helpers
export const trackQuoteRequest = (quoteData: Record<string, any> = {}) => {
  trackEvent('quote_request', {
    event_category: 'engagement',
    event_label: 'quote_requested',
    value: quoteData.total_amount || 0,
    ...quoteData
  });
};

export const trackQuoteSent = (quoteData: Record<string, any> = {}) => {
  trackEvent('quote_sent', {
    event_category: 'conversion',
    event_label: 'quote_sent',
    value: quoteData.total_amount || 0,
    currency: 'CAD',
    ...quoteData
  });
};
