
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPage } from '@/lib/analytics-client';

/**
 * Hook to track page views when route changes
 * This hook must be used inside a component wrapped with BrowserRouter
 */
const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when location changes
    trackPage(location.pathname);
    
    // Also track in Google Analytics directly
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: location.pathname
      });
    }
  }, [location]);

  // Return nothing as this is just a utility hook
  return null;
};

export default usePageTracking;
