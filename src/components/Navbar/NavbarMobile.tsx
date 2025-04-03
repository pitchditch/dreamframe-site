
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import CallButton from '../CallButton';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface NavbarMobileProps {
  isMenuOpen: boolean;
  isServicesMenuOpen: boolean;
  setIsServicesMenuOpen: (isOpen: boolean) => void;
}

export const NavbarMobile = ({ isMenuOpen, isServicesMenuOpen, setIsServicesMenuOpen }: NavbarMobileProps) => {
  const { t } = useTranslation();

  return (
    <div 
      className={`md:hidden transition-all duration-300 overflow-hidden bg-white ${
        isMenuOpen ? 'max-h-[500px] shadow-lg' : 'max-h-0'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col space-y-4">
          <Link to="/" className="py-2 text-gray-800 hover:text-bc-red transition-colors">
            {t('Home')}
          </Link>
          
          <div>
            <div 
              className="flex items-center justify-between py-2 text-gray-800 hover:text-bc-red transition-colors cursor-pointer"
              onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
            >
              <span>{t('Services')}</span>
              {isServicesMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
            
            <div className={`overflow-hidden transition-all duration-300 pl-4 ${
              isServicesMenuOpen ? 'max-h-[500px] py-2' : 'max-h-0'
            }`}>
              <div className="flex flex-col space-y-3 border-l-2 border-gray-200 pl-4">
                <Link to="/services/pressure-washing" className="text-gray-700 hover:text-bc-red transition-colors">
                  {t('Pressure Washing')}
                </Link>
                <Link to="/services/window-cleaning" className="text-gray-700 hover:text-bc-red transition-colors">
                  {t('Window Cleaning')}
                </Link>
                <Link to="/services/commercial-window-cleaning" className="text-gray-700 hover:text-bc-red transition-colors">
                  {t('Commercial Window Cleaning')}
                </Link>
                <Link to="/services/gutter-cleaning" className="text-gray-700 hover:text-bc-red transition-colors">
                  {t('Gutter Cleaning')}
                </Link>
                <Link to="/services/roof-cleaning" className="text-gray-700 hover:text-bc-red transition-colors">
                  {t('Roof Cleaning')}
                </Link>
              </div>
            </div>
          </div>
          
          <Link to="/blog" className="py-2 text-gray-800 hover:text-bc-red transition-colors">
            {t('Blog')}
          </Link>
          
          <Link to="/about" className="py-2 text-gray-800 hover:text-bc-red transition-colors">
            {t('About')}
          </Link>
          
          <Link to="/testimonials" className="py-2 text-gray-800 hover:text-bc-red transition-colors">
            {t('Testimonials')}
          </Link>
          
          <Link to="/contact" className="py-2 text-gray-800 hover:text-bc-red transition-colors">
            {t('Contact')}
          </Link>
          
          <div className="pt-2">
            <CallButton />
          </div>
        </nav>
      </div>
    </div>
  );
};
