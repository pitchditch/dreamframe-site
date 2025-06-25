

export const trackPageView = (path: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: document.title,
      page_location: window.location.href
    });
  }
};

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export const trackFormSubmission = (formName: string, formData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submission', {
      form_name: formName,
      ...formData
    });
  }
};

export const trackFormFieldInteraction = (formName: string, fieldName: string, interactionType: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_field_interaction', {
      form_name: formName,
      field_name: fieldName,
      interaction_type: interactionType
    });
  }
};

export const trackFormStep = (formName: string, stepData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_step', {
      form_name: formName,
      ...stepData
    });
  }
};

declare global {
  interface Window {
    gtag: (command: string, eventName: string, parameters?: Record<string, any>) => void;
  }
}
