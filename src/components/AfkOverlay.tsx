
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { X, HelpCircle, Calculator, Wrench } from 'lucide-react';

const AfkOverlay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
    const updateActivity = () => {
      setLastActivity(Date.now());
    };

    const events = ['mousedown', 'keypress', 'click'];
    
    // Add event listeners for user activity (removed mousemove, scroll, touchstart)
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    // Check for inactivity every 30 seconds
    const interval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;
      
      // Show overlay after 1 minute (60000ms) of inactivity
      if (timeSinceLastActivity >= 60000 && !isVisible) {
        setIsVisible(true);
      }
    }, 30000);

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
      clearInterval(interval);
    };
  }, [lastActivity, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setLastActivity(Date.now());
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative animate-scale-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
        
        <div className="text-center">
          <div className="mb-6">
            <HelpCircle className="mx-auto h-16 w-16 text-bc-red mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Need Help?</h2>
            <p className="text-gray-600">
              We noticed you've been browsing for a while. Let us help you find what you're looking for!
            </p>
          </div>
          
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
        </div>
      </div>
    </div>
  );
};

export default AfkOverlay;
