
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  const { t } = useTranslation();
  const [isCommercialMenuOpen, setIsCommercialMenuOpen] = useState(false);

  const toggleServicesMenu = () => setIsServicesMenuOpen(!isServicesMenuOpen);
  const toggleCommercialMenu = () => setIsCommercialMenuOpen(!isCommercialMenuOpen);

  return (
    <div
      className={`md:hidden fixed top-32 left-0 right-0 bg-white z-50 shadow-lg transition-transform duration-300 transform ${
        isMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex flex-col space-y-3">
          <li>
            <Link 
              to="/why-us" 
              className="flex items-center py-3 px-4 hover:bg-gray-100 rounded-lg"
            >
              {t('Why Us')}
            </Link>
          </li>
          
          <li>
            <button
              type="button"
              className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-100 rounded-lg"
              onClick={toggleServicesMenu}
            >
              <span>{t('Residential Services')}</span>
              {isServicesMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {isServicesMenuOpen && (
              <ul className="pl-4 mt-2 space-y-2">
                <li>
                  <Link 
                    to="/services/window-cleaning" 
                    className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-lg"
                  >
                    <img
                      src="/lovable-uploads/31217c0f-9d2d-449d-b4d1-b1a75487da35.png"
                      alt="Window Cleaning Icon"
                      className="w-8 h-8 mr-3"
                    />
                    {t('Window Cleaning')}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services/pressure-washing" 
                    className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-lg"
                  >
                    <img
                      src="/lovable-uploads/c9a98dc4-52bc-424c-83d5-05456902d442.png"
                      alt="House Washing Icon"
                      className="w-8 h-8 mr-3"
                    />
                    {t('House Washing')}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services/gutter-cleaning" 
                    className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-lg"
                  >
                    <img
                      src="/lovable-uploads/5d4a1166-dcf6-4ed8-8032-1790c7085c29.png"
                      alt="Gutter Cleaning Icon"
                      className="w-8 h-8 mr-3"
                    />
                    {t('Gutter Cleaning')}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services/roof-cleaning" 
                    className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-lg"
                  >
                    <img
                      src="/lovable-uploads/0e0f9d23-dc80-43e4-9599-eb9fc29013d0.png"
                      alt="Roof Cleaning Icon"
                      className="w-8 h-8 mr-3"
                    />
                    {t('Roof Cleaning')}
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <button
              type="button"
              className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-100 rounded-lg"
              onClick={toggleCommercialMenu}
            >
              <span>{t('Commercial Services')}</span>
              {isCommercialMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            
            {isCommercialMenuOpen && (
              <ul className="pl-4 mt-2 space-y-2">
                <li>
                  <Link 
                    to="/services/commercial-window-cleaning" 
                    className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-lg"
                  >
                    {t('Commercial Window Cleaning')}
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services/commercial-pressure-washing" 
                    className="flex items-center py-2 px-4 hover:bg-gray-100 rounded-lg"
                  >
                    {t('Commercial Pressure Washing')}
                  </Link>
                </li>
              </ul>
            )}
          </li>
                   
          <li>
            <Link 
              to="/contact" 
              className="flex items-center py-3 px-4 hover:bg-gray-100 rounded-lg"
            >
              {t('Contact')}
            </Link>
          </li>
          
          <li>
            <Link 
              to="/calculator" 
              className="flex items-center justify-center py-3 px-4 bg-bc-red text-white font-medium rounded-lg hover:bg-red-700"
            >
              {t('Get a Free Quote')}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavbarMobile;
