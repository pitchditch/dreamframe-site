
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import LanguageSelector from '../LanguageSelector';
import { ChevronDown, ChevronUp, Home, Box, Star, Wrench, Scale, Calculator } from 'lucide-react';

interface NavbarMobileProps {
  isMenuOpen: boolean;
  isServicesMenuOpen: boolean;
  setIsServicesMenuOpen: (isOpen: boolean) => void;
}

export const NavbarMobile = ({ isMenuOpen, isServicesMenuOpen, setIsServicesMenuOpen }: NavbarMobileProps) => {
  const { t } = useTranslation();
  
  // Add state for more dropdown
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  return (
    <>
      <div 
        className={`md:hidden fixed left-0 right-0 z-40 transition-all duration-300 overflow-hidden bg-white ${
          isMenuOpen ? 'max-h-[90vh] shadow-lg top-28' : 'max-h-0 top-28'
        }`}
      >
        <div className="container mx-auto px-4 py-4 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center gap-2 py-3 px-2 text-gray-800 hover:text-bc-red transition-colors hover:bg-gray-50 rounded-md font-medium">
              <Home className="w-5 h-5" />
              <span>{t('Home')}</span>
            </Link>
            
            <Link to="/why-us" className="flex items-center gap-2 py-3 px-2 text-gray-800 hover:text-bc-red transition-colors hover:bg-gray-50 rounded-md font-medium">
              <img 
                src="/lovable-uploads/4b1c2d66-50f8-40ca-abe3-c072141788ed.png" 
                alt="Logo Icon" 
                className="w-5 h-5 object-contain" 
              />
              <span>{t('Why Us')}</span>
            </Link>
            
            {/* Services Dropdown */}
            <div className="pb-2">
              <div 
                className="flex items-center justify-between py-3 px-2 text-gray-800 hover:text-bc-red transition-colors cursor-pointer hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
              >
                <span>{t('Services')}</span>
                {isServicesMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              <div className={`overflow-hidden transition-all duration-300 pl-4 ${
                isServicesMenuOpen ? 'max-h-[1000px] py-2' : 'max-h-0'
              }`}>
                <div className="flex flex-col space-y-1 pl-4">
                  <div className="text-xs font-semibold text-gray-500 uppercase py-2">Residential Services</div>
                  
                  <Link to="/services/window-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/165b02c3-f25e-42d7-aa8f-7cf0a7ed27a9.png" alt="Window Cleaning Icon" className="w-8 h-8 object-cover" />
                    </div>
                    <span>{t('Window Cleaning')}</span>
                  </Link>
                  <Link to="/services/pressure-washing" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/bed5edc5-3ddc-443c-b591-b46a2d863422.png" alt="House Soft Wash Icon" className="w-8 h-8 object-cover" />
                    </div>
                    <span>{t('Pressure Washing')}</span>
                  </Link>
                  <Link to="/services/gutter-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/4c194a64-57a3-4315-baab-181509b591a1.png" alt="Gutter Cleaning Icon" className="w-8 h-8 object-cover" />
                    </div>
                    <span>{t('Gutter Cleaning')}</span>
                  </Link>
                  <Link to="/services/roof-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/19292b37-93b3-4443-abf4-b0f8928efab4.png" alt="Roof Cleaning Icon" className="w-8 h-8 object-cover" />
                    </div>
                    <span>{t('Roof Cleaning')}</span>
                  </Link>
                  <Link to="/services/driveway-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/5e800a2b-cb89-4b90-8102-ff82838f2dc1.png" alt="Driveway Cleaning Icon" className="w-8 h-8 object-cover" />
                    </div>
                    <span>{t('Driveway Cleaning')}</span>
                  </Link>
                  <Link to="/services/fence-washing" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/b1066466-b276-4928-9c97-88a44a2cbf57.png" alt="Fence Washing Icon" className="w-8 h-8 object-cover" />
                    </div>
                    <span>{t('Fence Washing')}</span>
                  </Link>
                  
                  <div className="text-xs font-semibold text-gray-500 uppercase py-2 mt-2">Commercial Services</div>
                  
                  <Link to="/services/commercial-window-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/5b1d271e-15e2-4bf4-87ce-4ad9e9aadc75.png" alt="Commercial Window Cleaning Icon" className="w-8 h-8 object-contain" />
                    </div>
                    <span>{t('Commercial Window Cleaning')}</span>
                  </Link>
                  <Link to="/services/commercial-pressure-washing" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/0cd8002e-089f-4aee-9688-39cf7966604e.png" alt="Commercial Pressure Washing Icon" className="w-8 h-8 object-contain" />
                    </div>
                    <span>{t('Commercial Pressure Washing')}</span>
                  </Link>
                  <Link to="/services/post-construction-window-cleaning" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <div className="p-1.5 rounded-md flex items-center justify-center w-10 h-10">
                      <img src="/lovable-uploads/9aaa04e0-6635-47e9-9412-f86e8c9190ce.png" alt="Post-Construction Cleaning Icon" className="w-8 h-8 object-contain" />
                    </div>
                    <span>{t('Post-Construction Cleaning')}</span>
                  </Link>
                  
                  <Link to="/services" className="flex items-center gap-2 text-bc-red hover:text-red-700 transition-colors py-2 px-2 hover:bg-gray-50 rounded-md mt-2 font-medium">
                    <Box size={20} />
                    <span>{t('See All Services')}</span>
                  </Link>
                  
                  <Link to="/compare-services" className="flex items-center gap-2 text-bc-red hover:text-red-700 transition-colors py-2 px-2 hover:bg-gray-50 rounded-md font-medium mb-4">
                    <Scale size={20} />
                    <span>{t('Compare Services')}</span>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* More Menu Dropdown */}
            <div className="pb-2">
              <div 
                className="flex items-center justify-between py-3 px-2 text-gray-800 hover:text-bc-red transition-colors cursor-pointer hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              >
                <span>{t('More')}</span>
                {isMoreMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              
              <div className={`overflow-hidden transition-all duration-300 pl-4 ${
                isMoreMenuOpen ? 'max-h-[500px] py-2' : 'max-h-0'
              }`}>
                <div className="flex flex-col space-y-4 pl-4">
                  <Link to="/testimonials" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <Star size={20} className="text-bc-red" />
                    <span>{t('Testimonials')}</span>
                  </Link>
                  
                  <Link to="/equipment" className="flex items-center gap-2 text-black hover:text-bc-red transition-colors py-2 px-2 hover:bg-gray-50 rounded-md">
                    <Wrench size={20} className="text-bc-red" />
                    <span>{t('Our Equipment')}</span>
                  </Link>
                  
                  <div className="pt-2 border-t border-gray-100">
                    <h4 className="font-medium text-gray-900 pb-2 text-sm">{t('Leave a Review')}</h4>
                    <div className="flex space-x-3">
                      <a href="https://g.page/r/CbeicZxdYHsKEAI/review" target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-50 hover:bg-gray-100 rounded-md">
                        <img src="/lovable-uploads/16f0c875-4a0c-44b6-8c3c-c995877476e9.png" alt="Google" className="h-6 w-6 object-contain" />
                      </a>
                      <a href="https://www.yelp.ca/writeareview/biz/BKJYWQSYBxvKcTA5hkHHsg" target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-50 hover:bg-gray-100 rounded-md">
                        <img src="/lovable-uploads/a012b0c4-8ea4-4bcd-a39d-e62c2c8d1a97.png" alt="Yelp" className="h-8 w-8 object-contain" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Link to="/contact" className="py-3 px-2 text-gray-800 hover:text-bc-red transition-colors hover:bg-gray-50 rounded-md font-medium">
              {t('Contact')}
            </Link>
            
            <div className="pt-4 flex flex-col gap-3">
              <div className="text-base">
                <LanguageSelector />
              </div>
              
              <button 
                onClick={() => window.location.href = '/calculator'} 
                className="flex items-center gap-2 py-3 px-2 text-white bg-bc-red hover:bg-red-700 transition-colors rounded-md font-medium justify-center text-base"
              >
                <Calculator className="w-5 h-5" />
                <span>Price Calculator</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavbarMobile;
