
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import LanguageSelector from '../LanguageSelector';
import { ChevronDown, ChevronUp, Phone } from 'lucide-react';

interface NavbarMobileProps {
  isMenuOpen: boolean;
  isServicesMenuOpen: boolean;
  setIsServicesMenuOpen: (isOpen: boolean) => void;
}

export const NavbarMobile = ({ isMenuOpen, isServicesMenuOpen, setIsServicesMenuOpen }: NavbarMobileProps) => {
  const { t } = useTranslation();
  
  // Add state for commercial services dropdown
  const [isCommercialMenuOpen, setIsCommercialMenuOpen] = useState(false);

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
              <img src="/lovable-uploads/aa6c65c1-a6f5-4b3f-baac-ecc0679d3ce0.png" alt="Logo Icon" className="w-5 h-5 object-contain" />
              <span className="font-medium">{t('Why Us')}</span>
            </Link>
            
            <div className="border-b border-gray-100 pb-2">
              <div 
                className="flex items-center justify-between py-3 px-2 text-black hover:text-bc-red transition-colors cursor-pointer hover:bg-gray-50 rounded-md"
                onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
              >
                <span className="font-medium">{t('Residential Services')}</span>
                {isServicesMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              <div className={`overflow-hidden transition-all duration-300 pl-4 ${
                isServicesMenuOpen ? 'max-h-[500px] py-2' : 'max-h-0'
              }`}>
                <div className="flex flex-col space-y-4 border-l-2 border-gray-100 pl-4">
                  <Link to="/services/window-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="bg-blue-50 p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/6d229797-2f4e-4913-b90f-6ee2a95ca9f4.png" alt="Window Cleaning Icon" className="w-6 h-6 object-contain" />
                    </div>
                    <span>{t('Window Cleaning')}</span>
                  </Link>
                  <Link to="/services/pressure-washing" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="bg-red-50 p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/abc92e05-fffa-4cad-bb3c-94b74a37bfde.png" alt="House Washing Icon" className="w-6 h-6 object-contain" />
                    </div>
                    <span>{t('House Washing')}</span>
                  </Link>
                  <Link to="/services/gutter-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="bg-green-50 p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/0d6ef232-ef53-475d-a323-3faf6f19982b.png" alt="Gutter Cleaning Icon" className="w-6 h-6 object-contain" />
                    </div>
                    <span>{t('Gutter Cleaning')}</span>
                  </Link>
                  <Link to="/services/roof-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="bg-amber-50 p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/b908cb50-e502-4c70-835b-c1deb98ff6fa.png" alt="Roof Cleaning Icon" className="w-6 h-6 object-contain" />
                    </div>
                    <span>{t('Roof Cleaning')}</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Commercial Services Section */}
            <div className="border-b border-gray-100 pb-2">
              <div 
                className="flex items-center justify-between py-3 px-2 text-black hover:text-bc-red transition-colors cursor-pointer hover:bg-gray-50 rounded-md"
                onClick={() => setIsCommercialMenuOpen(!isCommercialMenuOpen)}
              >
                <span className="font-medium">{t('Commercial Services')}</span>
                {isCommercialMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              <div className={`overflow-hidden transition-all duration-300 pl-4 ${
                isCommercialMenuOpen ? 'max-h-[500px] py-2' : 'max-h-0'
              }`}>
                <div className="flex flex-col space-y-4 border-l-2 border-gray-100 pl-4">
                  <Link to="/services/commercial-window-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="bg-blue-50 p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/6d229797-2f4e-4913-b90f-6ee2a95ca9f4.png" alt="Commercial Window Cleaning Icon" className="w-6 h-6 object-contain" />
                    </div>
                    <span>{t('Commercial Window Cleaning')}</span>
                  </Link>
                  <Link to="/services/commercial-pressure-washing" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="bg-blue-50 p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/abc92e05-fffa-4cad-bb3c-94b74a37bfde.png" alt="Commercial Pressure Washing Icon" className="w-6 h-6 object-contain" />
                    </div>
                    <span>{t('Commercial Pressure Washing')}</span>
                  </Link>
                  <Link to="/services/post-construction-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="bg-amber-50 p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/6d229797-2f4e-4913-b90f-6ee2a95ca9f4.png" alt="Post-Construction Cleaning Icon" className="w-6 h-6 object-contain" />
                    </div>
                    <span>{t('Post-Construction Cleaning')}</span>
                  </Link>
                </div>
              </div>
            </div>
            
            <Link to="/contact" className="py-3 px-2 text-black hover:text-bc-red transition-colors hover:bg-gray-50 rounded-md font-medium">
              {t('Contact')}
            </Link>
            
            <div className="pt-4 flex flex-col gap-3 border-t border-gray-100">
              <a href="tel:7788087620" className="flex items-center justify-center gap-2 w-full bg-bc-red hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium text-center transition-all">
                <Phone size={18} />
                778-808-7620
              </a>
              <LanguageSelector />
            </div>
          </nav>
        </div>
      </div>
      {/* Bottom-right floating Call button for mobile only */}
      <div className="fixed bottom-6 right-6 md:hidden z-50 flex flex-row gap-4 justify-end px-4">
        <a href="tel:7788087620" className="bg-bc-red text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-all">
          <Phone size={24} />
        </a>
      </div>
    </>
  );
};
