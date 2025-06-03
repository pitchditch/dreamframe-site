
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { X, HelpCircle, Calculator, Wrench, Cookie } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const AfkOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [dataCollection, setDataCollection] = useState(false);
  const [outsideHoverTimer, setOutsideHoverTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if cookies were already accepted
    const accepted = localStorage.getItem('cookies-accepted');
    if (accepted) {
      setCookiesAccepted(true);
    }

    // Check display count
    const displayCount = parseInt(localStorage.getItem('afk-overlay-count') || '0');
    if (displayCount >= 3) {
      return; // Don't show overlay if already shown 3 times
    }

    const updateActivity = () => {
      setLastActivity(Date.now());
    };

    const events = ['mousedown', 'keypress', 'click'];
    
    // Add event listeners for user activity (but not scroll)
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    // Check for inactivity every 30 seconds
    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;
      
      // Show overlay after 1 minute (60000ms) of inactivity
      if (timeSinceLastActivity >= 60000 && !isVisible && displayCount < 3) {
        setIsVisible(true);
        // Increment display count
        localStorage.setItem('afk-overlay-count', (displayCount + 1).toString());
      }
    }, 30000);

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
      clearInterval(interval);
      if (outsideHoverTimer) {
        clearTimeout(outsideHoverTimer);
      }
    };
  }, [lastActivity, isVisible, outsideHoverTimer]);

  const handleClose = () => {
    setIsVisible(false);
    setLastActivity(Date.now());
  };

  const handleAcceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true');
    if (dataCollection) {
      localStorage.setItem('data-collection-accepted', 'true');
    }
    setCookiesAccepted(true);
    handleClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close if clicking on the overlay background (not the modal content)
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleOverlayHover = () => {
    // Start timer when hovering outside the modal
    if (outsideHoverTimer) {
      clearTimeout(outsideHoverTimer);
    }
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);
    setOutsideHoverTimer(timer);
  };

  const handleModalHover = () => {
    // Clear timer when hovering over modal content
    if (outsideHoverTimer) {
      clearTimeout(outsideHoverTimer);
      setOutsideHoverTimer(null);
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      onMouseEnter={handleOverlayHover}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative animate-scale-in"
        onMouseEnter={handleModalHover}
        onMouseLeave={handleOverlayHover}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="text-center">
          <div className="mb-6">
            {!cookiesAccepted ? (
              <>
                <Cookie className="mx-auto h-16 w-16 text-bc-red mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Accept Cookies</h2>
                <p className="text-gray-600 mb-4">
                  We use cookies to improve your experience and provide better services.
                </p>
                
                <div className="flex items-center space-x-2 mb-6 text-left">
                  <Checkbox 
                    id="data-collection" 
                    checked={dataCollection}
                    onCheckedChange={(checked) => setDataCollection(checked as boolean)}
                  />
                  <label htmlFor="data-collection" className="text-sm text-gray-600">
                    Allow data collection for analytics and service improvement
                  </label>
                </div>

                <div className="space-y-3">
                  <Button onClick={handleAcceptCookies} variant="bc-red" size="lg" className="w-full">
                    Accept Cookies
                  </Button>
                  
                  <Button onClick={handleClose} variant="outline" size="lg" className="w-full">
                    Decline
                  </Button>
                </div>
              </>
            ) : (
              <>
                <HelpCircle className="mx-auto h-16 w-16 text-bc-red mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Need Help?</h2>
                <p className="text-gray-600">
                  We noticed you've been browsing for a while. Let us help you find what you're looking for!
                </p>
              </>
            )}
          </div>
          
          {cookiesAccepted && (
            <>
              <div className="space-y-3 mb-6">
                <Button asChild variant="bc-red" size="lg" className="w-full">
                  <Link to="/calculator" onClick={handleClose}>
                    <Calculator className="mr-2 h-5 w-5" />
                    Get Price Calculator
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="w-full border-bc-red text-bc-red hover:bg-bc-red hover:text-white">
                  <Link to="/services" onClick={handleClose}>
                    <Wrench className="mr-2 h-5 w-5" />
                    Browse All Services
                  </Link>
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-3">Or call us directly:</p>
                <a 
                  href="tel:7788087620" 
                  className="inline-flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  onClick={handleClose}
                >
                  📞 (778) 808-7620
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AfkOverlay;
