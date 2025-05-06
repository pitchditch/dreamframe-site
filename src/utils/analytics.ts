
/**
 * Utility functions for Google Analytics tracking and form submissions
 */
import emailjs from 'emailjs-com';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_k22rhvk';
const EMAILJS_TEMPLATE_ID = 'template_default';  // You'll need to create this template in EmailJS
const EMAILJS_USER_ID = 'user_id'; // Replace with your actual EmailJS user ID

/**
 * Send form data via EmailJS
 * 
 * @param formName - The name of the form being submitted
 * @param formData - Data collected from the form
 */
export const sendFormViaEmail = (formName: string, formData: Record<string, any>) => {
  // Create a template parameters object for EmailJS
  const templateParams = {
    form_name: formName,
    user_email: formData.email || 'No email provided',
    user_name: formData.name || formData.fullName || 'Website visitor',
    phone: formData.phone || 'Not provided',
    service_type: formData.service || formData.serviceType || 'Not specified',
    property_type: formData.propertyType || 'Not specified',
    message: formData.message || 'No message provided',
    postal_code: formData.postalCode || 'Not provided',
    submission_time: new Date().toLocaleString(),
    ...formData // Include all other form fields
  };

  // Send email to business owner
  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_USER_ID)
    .then((result) => {
      console.log('Email sent successfully:', result);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });

  // Send confirmation email to customer if they provided an email
  if (formData.email) {
    const confirmationParams = {
      to_email: formData.email,
      to_name: formData.name || formData.fullName || 'Valued Customer',
      quote_type: formData.service || formData.serviceType || 'service',
      confirmation_message: 'Your quote request has been received. Jayden will personally review and confirm your final quote.',
    };

    emailjs.send(EMAILJS_SERVICE_ID, 'template_confirmation', confirmationParams, EMAILJS_USER_ID)
      .then((result) => {
        console.log('Confirmation email sent successfully:', result);
      })
      .catch((error) => {
        console.error('Error sending confirmation email:', error);
      });
  }
};

/**
 * Track a form submission event in Google Analytics and send email
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
  } else {
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
  }
  
  // Send form data via email
  if (formData) {
    sendFormViaEmail(formName, formData);
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

/**
 * Track a specific form field interaction
 */
export const trackFormFieldInteraction = (formName: string, fieldName: string, action: 'focus' | 'change' | 'blur' | 'click') => {
  if (typeof window.gtag !== 'function') {
    return;
  }
  
  try {
    window.gtag('event', 'form_field_interaction', {
      'event_category': 'Form Fields',
      'event_label': `${formName} - ${fieldName}`,
      'action': action
    });
  } catch (error) {
    console.error('Error tracking form field interaction:', error);
  }
};

/**
 * Track a form step completion (for multi-step forms)
 */
export const trackFormStep = (formName: string, stepNumber: number, stepName?: string) => {
  if (typeof window.gtag !== 'function') {
    return;
  }
  
  try {
    window.gtag('event', 'form_step', {
      'event_category': 'Multi-Step Forms',
      'event_label': formName,
      'step_number': stepNumber,
      'step_name': stepName || `Step ${stepNumber}`
    });
  } catch (error) {
    console.error('Error tracking form step:', error);
  }
};

/**
 * Track when a form is abandoned (user leaves page without submitting)
 */
export const trackFormAbandonment = (formName: string, lastStep?: number, timeSpent?: number) => {
  if (typeof window.gtag !== 'function') {
    return;
  }
  
  try {
    window.gtag('event', 'form_abandonment', {
      'event_category': 'Forms',
      'event_label': formName,
      'last_step': lastStep,
      'time_spent': timeSpent
    });
  } catch (error) {
    console.error('Error tracking form abandonment:', error);
  }
};

// Add global type for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
