
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';

interface ServicesDropdownProps {
  isOverVideo: boolean;
  isServicesMenuOpen: boolean;
  setIsServicesMenuOpen: (isOpen: boolean) => void;
}

export const ServicesDropdown = ({ 
  isOverVideo,
  isServicesMenuOpen,
  setIsServicesMenuOpen
}: ServicesDropdownProps) => {
  const location = useLocation();
  const { t, language } = useTranslation();
  const isActive = location.pathname.includes('/services');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Get language-specific classes for Punjabi and Hindi
  const getLanguageClass = () => {
    if (language === 'pa') return 'font-pa-font';
    if (language === 'hi') return 'font-hi-font';
    return '';
  };
  
  const toggleDropdown = () => {
    setIsServicesMenuOpen(!isServicesMenuOpen);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsServicesMenuOpen]);
  
  // Close dropdown when navigating
  useEffect(() => {
    setIsServicesMenuOpen(false);
  }, [location.pathname, setIsServicesMenuOpen]);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className={`flex items-center font-medium ${getLanguageClass()} ${
          isActive 
            ? "text-bc-red"
            : isOverVideo
              ? "text-white hover:text-white/80"
              : "text-gray-700 hover:text-bc-red"
        }`}
      >
        <span>{t('Services')}</span>
        <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isServicesMenuOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isServicesMenuOpen && (
        <div className="absolute z-20 mt-2 py-2 w-64 bg-white rounded-md shadow-lg border border-gray-200">
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{t('Residential')}</div>
          
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
          
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{t('Commercial')}</div>
          <Link 
            to="/services/commercial-window-cleaning" 
            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red ${getLanguageClass()}`}
          >
            {t('Commercial Window Cleaning')}
          </Link>
        </div>
      )}
    </div>
  );
};
