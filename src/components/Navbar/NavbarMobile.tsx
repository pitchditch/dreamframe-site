
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector';
import { useTranslation } from '@/hooks/use-translation';
import { useEffect } from 'react';

interface NavbarMobileProps {
  isMenuOpen: boolean;
  isServicesMenuOpen: boolean; 
  setIsServicesMenuOpen: (isOpen: boolean) => void;
}

export const NavbarMobile = ({ 
  isMenuOpen,
  isServicesMenuOpen,
  setIsServicesMenuOpen
}: NavbarMobileProps) => {
  const location = useLocation();
  const { t, language } = useTranslation();
  const isActive = (path: string) => location.pathname === path;
  
  // Effect to log mobile navigation rendering
  useEffect(() => {
    if (isMenuOpen) {
      console.log("Mobile menu opened");
    }
  }, [isMenuOpen]);
  
  // Get language-specific classes for Punjabi and Hindi
  const getLanguageClass = () => {
    if (language === 'pa') return 'font-pa-font';
    if (language === 'hi') return 'font-hi-font';
    return '';
  };
  
  return (
    <div className={`md:hidden bg-white shadow-lg animate-slide-down transition-all duration-300 ${isMenuOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
      <div className="px-4 pt-3 pb-4 space-y-2">
        <Link 
          to="/" 
          className={`block px-3 py-2 rounded-md text-base ${
            isActive('/') 
              ? 'bg-bc-red text-white' 
              : 'text-gray-700 hover:bg-gray-100 hover:text-bc-red'
          } ${getLanguageClass()}`}
        >
          {t('Home')}
        </Link>
        <button 
          className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-base ${
            isActive('/services') || location.pathname.includes('/services/') 
              ? 'bg-bc-red text-white' 
              : 'text-gray-700 hover:bg-gray-100 hover:text-bc-red'
          } ${getLanguageClass()}`}
          onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
        >
          <span>{t('Services')}</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isServicesMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isServicesMenuOpen && (
          <div className="pl-4 mt-1 mb-1">
            <div className={`py-1 text-sm font-medium text-gray-500 ${getLanguageClass()}`}>{t('Residential')}</div>
            <Link to="/services/window-cleaning" className={`block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red rounded-md ${getLanguageClass()}`}>{t('Window Cleaning')}</Link>
            <Link to="/services/gutter-cleaning" className={`block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red rounded-md ${getLanguageClass()}`}>{t('Gutter Cleaning')}</Link>
            <Link to="/services/pressure-washing" className={`block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red rounded-md ${getLanguageClass()}`}>{t('Pressure Washing')}</Link>
            <Link to="/services/roof-cleaning" className={`block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red rounded-md ${getLanguageClass()}`}>{t('Roof Cleaning')}</Link>
            
            <div className={`py-1 text-sm font-medium text-gray-500 mt-1 ${getLanguageClass()}`}>{t('Commercial')}</div>
            <Link to="/services/commercial-window-cleaning" className={`block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-bc-red rounded-md ${getLanguageClass()}`}>{t('Commercial Window Cleaning')}</Link>
          </div>
        )}
        
        <Link 
          to="/about" 
          className={`block px-3 py-2 rounded-md text-base ${
            isActive('/about') ? 'bg-bc-red text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-bc-red'
          } ${getLanguageClass()}`}
        >
          {t('About')}
        </Link>
        <Link 
          to="/testimonials" 
          className={`block px-3 py-2 rounded-md text-base ${
            isActive('/testimonials') ? 'bg-bc-red text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-bc-red'
          } ${getLanguageClass()}`}
        >
          {t('Testimonials')}
        </Link>
        <Link 
          to="/calculator" 
          className={`block px-3 py-2 rounded-md text-base ${
            isActive('/calculator') ? 'bg-bc-red text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-bc-red'
          } ${getLanguageClass()}`}
        >
          {t('Price Calculator')}
        </Link>
        <Link 
          to="/contact" 
          className={`block px-3 py-2 rounded-md text-base ${
            isActive('/contact') ? 'bg-bc-red text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-bc-red'
          } ${getLanguageClass()}`}
        >
          {t('Contact')}
        </Link>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <LanguageSelector />
        </div>
        
        <Link 
          to="/contact" 
          className="block px-3 py-3"
        >
          <button className={`btn-primary w-full ${getLanguageClass()}`}>{t('Get a Quote')}</button>
        </Link>
      </div>
    </div>
  );
};
