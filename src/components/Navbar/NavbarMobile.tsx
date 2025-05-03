
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import LanguageSelector from '../LanguageSelector';
import { ChevronDown, ChevronUp, Droplets, Home, MessageSquare, Phone, Wind } from 'lucide-react';
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
          isMenuOpen ? 'max-h-[800px] shadow-lg' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            <Link to="/why-us" className="flex items-center gap-2 py-3 px-2 text-black hover:text-bc-red transition-colors hover:bg-gray-50 rounded-md">
              <Home className="w-5 h-5" />
              <span className="font-medium">{t('Why Us')}</span>
            </Link>
            
            <div className="border-b border-gray-100 pb-2">
              <div 
                className="flex items-center justify-between py-3 px-2 text-black hover:text-bc-red transition-colors cursor-pointer hover:bg-gray-50 rounded-md"
                onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
              >
                <span className="font-medium">{t('Services')}</span>
                {isServicesMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              <div className={`overflow-hidden transition-all duration-300 pl-4 ${
                isServicesMenuOpen ? 'max-h-[500px] py-2' : 'max-h-0'
              }`}>
                <div className="flex flex-col space-y-4 border-l-2 border-gray-100 pl-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase mt-2">{t('Residential')}</div>
                  <Link to="/services/window-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="bg-blue-50 p-1.5 rounded-md">
                      <Droplets className="w-5 h-5 text-blue-500" />
                    </div>
                    <span>{t('Window Cleaning')}</span>
                  </Link>
                  <Link to="/services/pressure-washing" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="bg-red-50 p-1.5 rounded-md">
                      <Home className="w-5 h-5 text-bc-red" />
                    </div>
                    <span>{t('House Washing')}</span>
                  </Link>
                  <Link to="/services/gutter-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="bg-green-50 p-1.5 rounded-md">
                      <Wind className="w-5 h-5 text-green-600" />
                    </div>
                    <span>{t('Gutter Cleaning')}</span>
                  </Link>
                  <Link to="/services/roof-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="bg-amber-50 p-1.5 rounded-md">
                      <Home className="w-5 h-5 text-amber-700" />
                    </div>
                    <span>{t('Roof Cleaning')}</span>
                  </Link>
                  
                  <div className="text-xs font-semibold text-gray-500 uppercase mt-4 pt-2 border-t border-gray-100">{t('Commercial')}</div>
                  <Link to="/services/commercial-window-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="bg-blue-50 p-1.5 rounded-md">
                      <Droplets className="w-5 h-5 text-blue-600" />
                    </div>
                    <span>{t('Commercial Window Cleaning')}</span>
                  </Link>
                  <Link to="/services/commercial-pressure-washing" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="bg-blue-50 p-1.5 rounded-md">
                      <Home className="w-5 h-5 text-blue-700" />
                    </div>
                    <span>{t('Commercial Pressure Washing')}</span>
                  </Link>
                </div>
              </div>
            </div>
            
            <Link to="/contact" className="py-3 px-2 text-black hover:text-bc-red transition-colors hover:bg-gray-50 rounded-md font-medium">
              {t('Contact')}
            </Link>
            
            <div className="pt-4 flex flex-col gap-3 border-t border-gray-100">
              <a href="/contact" className="w-full bg-bc-red hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium text-center transition-all flex items-center justify-center gap-2">
                <MessageSquare size={18} />
                {t("Get a Free Quote")}
              </a>
              <a href="tel:7788087620" className="flex items-center justify-center gap-2 w-full border border-gray-300 py-3 px-4 rounded-lg font-medium text-center transition-all hover:bg-gray-50">
                <Phone size={18} />
                778-808-7620
              </a>
              <LanguageSelector />
            </div>
          </nav>
        </div>
      </div>
      {/* Bottom-right floating Free Quote button for mobile only */}
      <div className="fixed bottom-6 right-6 md:hidden z-50 flex flex-row gap-4 justify-end px-4">
        <a href="tel:7788087620" className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all">
          <Phone size={24} />
        </a>
        <Link to="/contact" className="bg-bc-red text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all">
          <MessageSquare size={24} />
        </Link>
      </div>
    </>
  );
};
