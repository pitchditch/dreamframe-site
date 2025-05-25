
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';

interface ServicesDropdownProps {
  isOpen: boolean;
}

export const ServicesDropdown = ({ 
  isOpen
}: ServicesDropdownProps) => {
  const location = useLocation();
  const { t, language } = useTranslation();
  
  // Get language-specific classes for Punjabi and Hindi
  const getLanguageClass = () => {
    if (language === 'pa') return 'font-pa-font';
    if (language === 'hi') return 'font-hi-font';
    return '';
  };
  
  return (
    <div className="relative">
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1 py-3 w-80 bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100 mb-2">
            {t('Residential Services')}
          </div>
          
          <Link 
            to="/services/window-cleaning" 
            className={`block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors ${getLanguageClass()}`}
          >
            {t('Window Cleaning')}
          </Link>
          <Link 
            to="/services/gutter-cleaning" 
            className={`block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors ${getLanguageClass()}`}
          >
            {t('Gutter Cleaning')}
          </Link>
          <Link 
            to="/services/pressure-washing" 
            className={`block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors ${getLanguageClass()}`}
          >
            {t('Pressure Washing')}
          </Link>
          <Link 
            to="/services/roof-cleaning" 
            className={`block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors ${getLanguageClass()}`}
          >
            {t('Roof Cleaning')}
          </Link>
          
          <div className="border-t border-gray-100 mx-3 my-3"></div>
          
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            {t('Commercial Services')}
          </div>
          <Link 
            to="/services/commercial-window-cleaning" 
            className={`block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors ${getLanguageClass()}`}
          >
            {t('Commercial Window Cleaning')}
          </Link>
          <Link 
            to="/services/commercial-pressure-washing" 
            className={`block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors ${getLanguageClass()}`}
          >
            {t('Commercial Pressure Washing')}
          </Link>
          <Link 
            to="/services/post-construction-cleaning" 
            className={`block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors ${getLanguageClass()}`}
          >
            {t('Post-Construction Cleaning')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default ServicesDropdown;
