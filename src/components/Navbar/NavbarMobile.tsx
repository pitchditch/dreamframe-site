
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import LanguageSelector from '../LanguageSelector';
import { ChevronDown, ChevronUp, Store, Building, User2, HardHat } from 'lucide-react';
import PriceCalculatorOverlay from '../PriceCalculatorOverlay';
// Removed import { Phone } from 'lucide-react';

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
            <Link to="/why-us" className="flex items-center gap-2 py-2 text-black hover:text-bc-red transition-colors">
              <User2 className="w-5 h-5" />
              <span>{t('Why Us')}</span>
            </Link>
            
            <div>
              <div 
                className="flex items-center justify-between py-2 text-black hover:text-bc-red transition-colors cursor-pointer"
                onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
              >
                <span>{t('Services')}</span>
                {isServicesMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              <div className={`overflow-hidden transition-all duration-300 pl-4 ${
                isServicesMenuOpen ? 'max-h-[500px] py-2' : 'max-h-0'
              }`}>
                <div className="flex flex-col space-y-4 border-l-2 border-gray-200 pl-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase mt-2">{t('Residential')}</div>
                  <Link to="/services/window-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors">
                    <Store className="w-5 h-5" />
                    <span>{t('Window Cleaning')}</span>
                  </Link>
                  <Link to="/services/pressure-washing" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors">
                    <Building className="w-5 h-5" />
                    <span>{t('House Washing')}</span>
                  </Link>
                  <Link to="/services/gutter-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors">
                    <HardHat className="w-5 h-5" />
                    <span>{t('Gutter Cleaning')}</span>
                  </Link>
                  <Link to="/services/roof-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors">
                    <Store className="w-5 h-5" />
                    <span>{t('Roof Cleaning')}</span>
                  </Link>
                  
                  <div className="text-xs font-semibold text-gray-500 uppercase mt-4">{t('Commercial')}</div>
                  <Link to="/services/commercial-window-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors">
                    <Store className="w-5 h-5" />
                    <span>{t('Commercial Window Cleaning')}</span>
                  </Link>
                  <Link to="/services/commercial-pressure-washing" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors">
                    <Building className="w-5 h-5" />
                    <span>{t('Commercial Pressure Washing')}</span>
                  </Link>
                </div>
              </div>
            </div>
            
            <Link to="/contact" className="py-2 text-black hover:text-bc-red transition-colors">
              {t('Contact')}
            </Link>
            
            <div className="pt-4 flex flex-col gap-3">
              <PriceCalculatorOverlay 
                buttonText={t("Get a Free Quote")} 
                className="w-full bg-bc-red hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium text-center transition-all" 
              />
              <LanguageSelector />
            </div>
          </nav>
        </div>
      </div>
      {/* Bottom-right floating Free Quote button for mobile only */}
      <div className="fixed bottom-6 right-6 md:hidden z-50 flex flex-row gap-4 justify-end px-4">
        <PriceCalculatorOverlay 
          buttonText={t("Free Quote")}
          className="bg-bc-red text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all"
        />
      </div>
    </>
  );
};

