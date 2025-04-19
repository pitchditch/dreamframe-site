
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import LanguageSelector from '../LanguageSelector';
import { ChevronDown, ChevronUp, Phone } from 'lucide-react';
import PriceCalculatorOverlay from '../PriceCalculatorOverlay';

interface NavbarMobileProps {
  isMenuOpen: boolean;
  isServicesMenuOpen: boolean;
  setIsServicesMenuOpen: (isOpen: boolean) => void;
}

export const NavbarMobile = ({ isMenuOpen, isServicesMenuOpen, setIsServicesMenuOpen }: NavbarMobileProps) => {
  const { t } = useTranslation();

  return (
    <>
      <div 
        className={`md:hidden transition-all duration-300 overflow-hidden bg-white ${
          isMenuOpen ? 'max-h-[600px] shadow-lg' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            <div>
              <div 
                className="flex items-center justify-between py-2 text-black hover:text-bc-red transition-colors cursor-pointer"
                onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
              >
                <span>{t('Residential & Commercial Services')}</span>
                {isServicesMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              <div className={`overflow-hidden transition-all duration-300 pl-4 ${
                isServicesMenuOpen ? 'max-h-[500px] py-2' : 'max-h-0'
              }`}>
                <div className="flex flex-col space-y-3 border-l-2 border-gray-200 pl-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase mt-2">{t('Residential')}</div>
                  <Link to="/services/window-cleaning" className="text-black hover:text-bc-red transition-colors">
                    {t('Window Cleaning')}
                  </Link>
                  <Link to="/services/pressure-washing" className="text-black hover:text-bc-red transition-colors">
                    {t('Pressure Washing')}
                  </Link>
                  <Link to="/services/gutter-cleaning" className="text-black hover:text-bc-red transition-colors">
                    {t('Gutter Cleaning')}
                  </Link>
                  <Link to="/services/roof-cleaning" className="text-black hover:text-bc-red transition-colors">
                    {t('Roof Cleaning')}
                  </Link>
                  
                  <div className="text-xs font-semibold text-gray-500 uppercase mt-4">{t('Commercial')}</div>
                  <Link to="/services/commercial-window-cleaning" className="text-black hover:text-bc-red transition-colors">
                    {t('Commercial Window Cleaning')}
                  </Link>
                  <Link to="/services/commercial-pressure-washing" className="text-black hover:text-bc-red transition-colors">
                    {t('Commercial Pressure Washing')}
                  </Link>
                </div>
              </div>
            </div>
            
            <Link to="/why-us" className="py-2 text-black hover:text-bc-red transition-colors">
              {t('Why Us')}
            </Link>
            
            <Link to="/contact" className="py-2 text-black hover:text-bc-red transition-colors">
              {t('Contact')}
            </Link>
            
            <div className="pt-4 flex flex-col gap-4">
              <PriceCalculatorOverlay 
                buttonText="Get a Free Quote" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium text-center" 
              />
              <LanguageSelector />
            </div>
          </nav>
        </div>
      </div>

      {/* Floating Call Button for Mobile */}
      <a 
        href="tel:7788087620"
        className="fixed bottom-6 right-6 md:hidden z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg animate-pulse"
      >
        <Phone className="h-6 w-6" />
      </a>
    </>
  );
};
