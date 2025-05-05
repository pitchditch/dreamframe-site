
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import LanguageSelector from '../LanguageSelector';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
        className={`md:hidden fixed top-20 left-0 right-0 z-30 transition-all duration-300 overflow-hidden bg-white ${
          isMenuOpen ? 'max-h-[800px] shadow-lg' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            <Link to="/why-us" className="flex items-center gap-2 py-3 px-2 text-black hover:text-bc-red transition-colors hover:bg-gray-50 rounded-md">
              <img 
                src="/lovable-uploads/85f5bd3c-680e-4957-9722-6bc6070f7d51.png" 
                alt="Logo Icon" 
                className="w-5 h-5 object-contain animate-spin-slow" 
              />
              <span className="font-medium">{t('Why Us')}</span>
            </Link>
            
            <div className="border-b border-gray-100 pb-2">
              <div 
                className="flex items-center justify-between py-3 px-2 text-black hover:text-bc-red transition-colors cursor-pointer hover:bg-gray-50 rounded-md"
                onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
              >
                <span className="font-medium">{t('Residential')}</span>
                {isServicesMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              <div className={`overflow-hidden transition-all duration-300 pl-4 ${
                isServicesMenuOpen ? 'max-h-[500px] py-2' : 'max-h-0'
              }`}>
                <div className="flex flex-col space-y-4 border-l-2 border-gray-100 pl-4">
                  <Link to="/services/window-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/3f12496a-a48d-49fe-b614-77435e9bab36.png" alt="Window Cleaning Icon" className="w-8 h-8 object-cover" />
                    </div>
                    <span>{t('Window Cleaning')}</span>
                  </Link>
                  <Link to="/services/pressure-washing" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/5ac75bee-3951-47f2-9a3c-871acaf8f01b.png" alt="House Washing Icon" className="w-8 h-8 object-cover" />
                    </div>
                    <span>{t('House Washing')}</span>
                  </Link>
                  <Link to="/services/gutter-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/f899a443-8930-4364-b538-916f65545f84.png" alt="Gutter Cleaning Icon" className="w-8 h-8 object-cover" />
                    </div>
                    <span>{t('Gutter Cleaning')}</span>
                  </Link>
                  <Link to="/services/roof-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/51f10eb0-c939-49d5-8ab5-2235a162169e.png" alt="Roof Cleaning Icon" className="w-8 h-8 object-cover" />
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
                <span className="font-medium">{t('Commercial')}</span>
                {isCommercialMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              <div className={`overflow-hidden transition-all duration-300 pl-4 ${
                isCommercialMenuOpen ? 'max-h-[500px] py-2' : 'max-h-0'
              }`}>
                <div className="flex flex-col space-y-4 border-l-2 border-gray-100 pl-4">
                  <Link to="/services/commercial-window-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/fe9ad8bf-d5d6-415e-9db8-ebbf40ad6fc5.png" alt="Commercial Window Cleaning Icon" className="w-8 h-8 object-contain" />
                    </div>
                    <span>{t('Commercial Window Cleaning')}</span>
                  </Link>
                  <Link to="/services/commercial-pressure-washing" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/b4303ec4-9120-49a2-8553-835158e0ddea.png" alt="Commercial Pressure Washing Icon" className="w-8 h-8 object-contain" />
                    </div>
                    <span>{t('Commercial Pressure Washing')}</span>
                  </Link>
                  <Link to="/services/post-construction-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/9aaa04e0-6635-47e9-9412-f86e8c9190ce.png" alt="Post-Construction Cleaning Icon" className="w-8 h-8 object-contain" />
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
              <LanguageSelector />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavbarMobile;
