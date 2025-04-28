import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';

interface ServicesDropdownProps {
  isOpen: boolean;
  isOverVideo: boolean;
  isScrolled: boolean;
}

export const ServicesDropdown = ({ 
  isOpen,
  isOverVideo,
  isScrolled
}: ServicesDropdownProps) => {
  const location = useLocation();
  const { t, language } = useTranslation();
  
  const getLanguageClass = () => {
    return language === 'en' ? '' : 'text-sm';
  };

  return (
    <div className="relative">
      {isOpen && (
        <div className="absolute z-20 mt-2 py-2 w-72 bg-white rounded-md shadow-lg border border-gray-200">
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">{t('Residential Services')}</div>
          <Link 
            to="/services/window-cleaning" 
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red"
          >
            <img src="/lovable-uploads/3bbb2a82-8f0f-468b-b416-042dbfae3145.png" className="w-5 h-5 mr-2" />
            {t('Window Cleaning')}
          </Link>
          <Link 
            to="/services/roof-cleaning" 
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red"
          >
            <img src="/lovable-uploads/8b1b9d63-323b-425e-8f2e-c21170d50537.png" className="w-5 h-5 mr-2" />
            {t('Roof Cleaning')}
          </Link>
          <Link 
            to="/services/pressure-washing" 
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red"
          >
            <img src="/lovable-uploads/9a04becd-ee50-401d-95aa-812e1cda523e.png" className="w-5 h-5 mr-2" />
            {t('House Washing')}
          </Link>
          <Link 
            to="/services/gutter-cleaning" 
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red"
          >
            <img src="/lovable-uploads/482d914e-ea81-411b-a10b-5cdaebdbc554.png" className="w-5 h-5 mr-2" />
            {t('Gutter Cleaning')}
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
        </div>
      )}
    </div>
  );
};

export default ServicesDropdown;
