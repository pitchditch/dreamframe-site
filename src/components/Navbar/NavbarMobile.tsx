
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import { ChevronDown, ChevronUp, Star, Phone } from 'lucide-react';
import LanguageSelector from '../LanguageSelector';

interface NavbarMobileProps {
  isMenuOpen: boolean;
  isServicesMenuOpen: boolean;
  setIsServicesMenuOpen: (open: boolean) => void;
}

export const NavbarMobile = ({ isMenuOpen, isServicesMenuOpen, setIsServicesMenuOpen }: NavbarMobileProps) => {
  const { t } = useTranslation();

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
      <div className="px-4 py-4 space-y-2">
        <Link
          to="/"
          className="block px-4 py-3 text-gray-700 hover:text-bc-red transition-colors font-medium text-lg"
        >
          {t('Home')}
        </Link>
        
        <Link
          to="/why-us"
          className="block px-4 py-3 text-gray-700 hover:text-bc-red transition-colors font-medium text-lg"
        >
          {t('Why Us')}
        </Link>

        <div>
          <button
            onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
            className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-bc-red transition-colors font-medium text-lg"
          >
            {t('Services')}
            {isServicesMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {isServicesMenuOpen && (
            <div className="pl-4 pb-2 space-y-2">
              <Link
                to="/services/window-cleaning"
                className="block px-4 py-2 text-gray-600 hover:text-bc-red transition-colors"
              >
                {t('Window Cleaning')}
              </Link>
              <Link
                to="/services/gutter-cleaning"
                className="block px-4 py-2 text-gray-600 hover:text-bc-red transition-colors"
              >
                {t('Gutter Cleaning')}
              </Link>
              <Link
                to="/services/pressure-washing"
                className="block px-4 py-2 text-gray-600 hover:text-bc-red transition-colors"
              >
                {t('House Washing')}
              </Link>
              <Link
                to="/services/roof-cleaning"
                className="block px-4 py-2 text-gray-600 hover:text-bc-red transition-colors"
              >
                {t('Roof Cleaning')}
              </Link>
              <Link
                to="/services/driveway-cleaning"
                className="block px-4 py-2 text-gray-600 hover:text-bc-red transition-colors"
              >
                {t('Driveway Pressure Washing')}
              </Link>
              <Link
                to="/services/fence-washing"
                className="block px-4 py-2 text-gray-600 hover:text-bc-red transition-colors"
              >
                {t('Fence Washing')}
              </Link>
              <Link
                to="/services/commercial-window-cleaning"
                className="block px-4 py-2 text-gray-600 hover:text-bc-red transition-colors"
              >
                {t('Commercial Services')}
              </Link>
              <Link
                to="/compare-services"
                className="block px-4 py-2 text-bc-red hover:text-red-700 transition-colors font-medium"
              >
                {t('Compare Services')}
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/testimonials"
          className="block px-4 py-3 text-gray-700 hover:text-bc-red transition-colors font-medium text-lg"
        >
          {t('Testimonials')}
        </Link>
        
        <Link
          to="/equipment"
          className="block px-4 py-3 text-gray-700 hover:text-bc-red transition-colors font-medium text-lg"
        >
          {t('Our Equipment')}
        </Link>

        <Link
          to="/contact"
          className="block px-4 py-3 text-gray-700 hover:text-bc-red transition-colors font-medium text-lg"
        >
          {t('Contact')}
        </Link>

        <div className="pt-4 border-t border-gray-200">
          <h4 className="px-4 py-2 font-medium text-gray-900 flex items-center gap-2">
            <Star className="h-5 w-5 text-bc-red" />
            {t('Leave a Review')}
          </h4>
          <div className="flex space-x-4 px-4 py-2">
            <a 
              href="https://g.page/r/CbeicZxdYHsKEAI/review" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
            >
              <img src="/lovable-uploads/90d2177a-4c1d-4d8b-9873-f8ee94f4cd1f.png" alt="Google" className="h-6 w-6 object-contain" />
              <span className="text-sm font-medium">Google</span>
            </a>
            <a 
              href="https://www.yelp.ca/writeareview/biz/BKJYWQSYBxvKcTA5hkHHsg" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
            >
              <img src="/lovable-uploads/b6d07b0f-96b7-4c0f-90b6-fef10d13439f.png" alt="Yelp" className="h-6 w-6 object-contain" />
              <span className="text-sm font-medium">Yelp</span>
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <LanguageSelector />
        </div>

        <a
          href="tel:7788087620"
          className="flex items-center justify-center gap-2 bg-bc-red text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium text-lg mt-4"
        >
          <Phone size={20} />
          (778) 808-7620
        </a>
      </div>
    </div>
  );
};

export default NavbarMobile;
