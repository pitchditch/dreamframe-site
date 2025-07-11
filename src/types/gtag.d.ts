
// Type definitions for Google Analytics gtag.js
interface Window {
  gtag?: (
    command: 'config' | 'event' | 'set',
    targetId: string,
    config?: Record<string, any> | EventParams
  ) => void;
  dataLayer?: any[];
}

interface EventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}
