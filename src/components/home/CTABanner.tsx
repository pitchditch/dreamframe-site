
import React, { useEffect, useState } from 'react';
import { Phone, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';

const CTABanner: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find the Premium Solutions section
      const premiumSection = document.querySelector('[data-component="premium-solutions"]') || 
                            document.querySelector('section:has-text("Premium Solutions")') ||
                            document.getElementById('premium-solutions');
      
      if (premiumSection) {
        const rect = premiumSection.getBoundingClientRect();
        // Show banner when Premium Solutions section comes into view
        setIsVisible(rect.top <= window.innerHeight);
      } else {
        // Fallback: show after scrolling 800px (approximate position of Premium Solutions)
        setIsVisible(window.scrollY > 800);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/85f5bd3c-680e-4957-9722-6bc6070f7d51.png" 
              alt="BC Pressure Washing" 
              className="w-12 h-12 rounded-full object-cover border-2 border-bc-red"
            />
            <div className="hidden sm:block">
              <h3 className="font-bold text-gray-900 text-sm">{t('Ready to Get Started?')}</h3>
              <p className="text-xs text-gray-600">{t('Free quotes • Same-day service')}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <a 
              href="tel:+17788815165" 
              className="flex items-center gap-2 bg-bc-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors text-sm"
            >
              <Phone size={16} />
              <span className="hidden sm:inline">{t('Call Now')}</span>
              <span className="sm:hidden">{t('Call')}</span>
            </a>
            
            <Link 
              to="/calculator"
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-sm"
            >
              <Calculator size={16} />
              <span className="hidden sm:inline">{t('Get Quote')}</span>
              <span className="sm:hidden">{t('Quote')}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTABanner;
