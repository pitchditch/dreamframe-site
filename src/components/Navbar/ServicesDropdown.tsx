
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
        <div className="absolute z-20 mt-2 py-2 w-72 bg-white rounded-md shadow-lg border border-gray-200">
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{t('Residential Services')}</div>
          
          <Link 
            to="/services/window-cleaning" 
            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red ${getLanguageClass()}`}
          >
            {t('Window Cleaning')}
          </Link>
          <Link 
            to="/services/gutter-cleaning" 
            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red ${getLanguageClass()}`}
          >
            {t('Gutter Cleaning')}
          </Link>
          <Link 
            to="/services/pressure-washing" 
            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red ${getLanguageClass()}`}
          >
            {t('Pressure Washing')}
          </Link>
          <Link 
            to="/services/roof-cleaning" 
            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red ${getLanguageClass()}`}
          >
            {t('Roof Cleaning')}
          </Link>
          
          <div className="border-t border-gray-100 mx-2 my-2"></div>
          
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{t('Commercial Services')}</div>
          <Link 
            to="/services/commercial-window-cleaning" 
            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red ${getLanguageClass()}`}
          >
            {t('Commercial Window Cleaning')}
          </Link>
          <Link 
            to="/services/commercial-pressure-washing" 
            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red ${getLanguageClass()}`}
          >
            {t('Commercial Pressure Washing')}
          </Link>
          <Link 
            to="/services/post-construction-cleaning" 
            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red ${getLanguageClass()}`}
          >
            {t('Post-Construction Cleaning')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default ServicesDropdown;
