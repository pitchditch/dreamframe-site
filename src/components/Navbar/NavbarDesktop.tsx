
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import LanguageSelector from '../LanguageSelector';
import { Star, Scale } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavbarDesktopProps {
  isOverVideo: boolean;
}

export const NavbarDesktop = ({ isOverVideo }: NavbarDesktopProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="hidden md:flex items-center justify-between flex-1">
      <div className="flex-1 flex justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center justify-center space-x-12">
            <NavigationMenuItem>
              <button
                onClick={handleHomeClick}
                className={`transition-all duration-300 hover:scale-110 hover:text-bc-red font-bold text-xl tracking-wide ${
                  isOverVideo ? 'text-white drop-shadow-lg' : 'text-gray-800'
                }`}
              >
                {t('Home')}
              </button>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link 
                to="/why-us" 
                className={`transition-all duration-300 hover:scale-110 hover:text-bc-red font-bold text-xl tracking-wide ${
                  isOverVideo ? 'text-white drop-shadow-lg' : 'text-gray-800'
                }`}
              >
                {t('Why Us')}
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className={`transition-all duration-300 hover:scale-110 hover:text-bc-red font-bold text-xl tracking-wide bg-transparent border-none shadow-none p-0 h-auto data-[state=open]:bg-transparent ${
                  isOverVideo ? 'text-white drop-shadow-lg' : 'text-gray-800'
                }`}
              >
                {t('Services')}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-[700px] p-6 bg-white shadow-2xl border border-gray-200 z-[9999] mt-2">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 text-lg">Residential Services</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Link to="/services/window-cleaning" className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <img src="/lovable-uploads/7953abed-398c-4bf0-af74-01e2136d48f9.png" alt="Window Cleaning" className="w-10 h-10 object-cover rounded transition-transform duration-200 group-hover:scale-110" />
                        <span className="text-gray-800 group-hover:text-bc-red font-semibold text-sm text-center">{t('Window Cleaning')}</span>
                      </Link>
                      <Link to="/services/gutter-cleaning" className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <img src="/lovable-uploads/3500ca28-2d00-490d-a36f-a357780967ed.png" alt="Gutter Cleaning" className="w-10 h-10 object-cover rounded transition-transform duration-200 group-hover:scale-110" />
                        <span className="text-gray-800 group-hover:text-bc-red font-semibold text-sm text-center">{t('Gutter Cleaning')}</span>
                      </Link>
                      <Link to="/services/pressure-washing" className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <img src="/lovable-uploads/5c1d510e-49fe-495f-8955-30f8be70c60c.png" alt="House Washing" className="w-10 h-10 object-cover rounded transition-transform duration-200 group-hover:scale-110" />
                        <span className="text-gray-800 group-hover:text-bc-red font-semibold text-sm text-center">{t('House Washing')}</span>
                      </Link>
                      <Link to="/services/roof-cleaning" className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <img src="/lovable-uploads/6f995cec-d81a-4f01-8b36-7aee59878ddd.png" alt="Roof Cleaning" className="w-10 h-10 object-cover rounded transition-transform duration-200 group-hover:scale-110" />
                        <span className="text-gray-800 group-hover:text-bc-red font-semibold text-sm text-center">{t('Roof Cleaning')}</span>
                      </Link>
                      <Link to="/services/driveway-cleaning" className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <img src="/lovable-uploads/5f62bf7c-303e-456d-8438-f69479508411.png" alt="Driveway Pressure Washing" className="w-10 h-10 object-cover rounded transition-transform duration-200 group-hover:scale-110" />
                        <span className="text-gray-800 group-hover:text-bc-red font-semibold text-sm text-center">{t('Driveway Pressure Washing')}</span>
                      </Link>
                      <Link to="/services/fence-washing" className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <img src="/lovable-uploads/db2d8d0c-21a4-47e8-a7d1-b6a7e95c13e9.png" alt="Fence Washing" className="w-10 h-10 object-cover rounded transition-transform duration-200 group-hover:scale-110" />
                        <span className="text-gray-800 group-hover:text-bc-red font-semibold text-sm text-center">{t('Fence Washing')}</span>
                      </Link>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 text-lg">Commercial Services</h3>
                    <div className="space-y-3">
                      <Link to="/services/commercial-window-cleaning" className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <img src="/lovable-uploads/fe9ad8bf-d5d6-415e-9db8-ebbf40ad6fc5.png" alt="Commercial Window Cleaning" className="w-10 h-10 object-contain rounded transition-transform duration-200 group-hover:scale-110" />
                        <span className="text-gray-800 group-hover:text-bc-red font-semibold">{t('Commercial Window Cleaning')}</span>
                      </Link>
                      <Link to="/services/commercial-pressure-washing" className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <img src="/lovable-uploads/0cd8002e-089f-4aee-9688-39cf7966604e.png" alt="Commercial Pressure Washing" className="w-10 h-10 object-contain rounded transition-transform duration-200 group-hover:scale-110" />
                        <span className="text-gray-800 group-hover:text-bc-red font-semibold">{t('Commercial Pressure Washing')}</span>
                      </Link>
                      <Link to="/services/post-construction-window-cleaning" className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <img src="/lovable-uploads/9aaa04e0-6635-47e9-9412-f86e8c9190ce.png" alt="Post-Construction Cleaning" className="w-10 h-10 object-contain rounded transition-transform duration-200 group-hover:scale-110" />
                        <span className="text-gray-800 group-hover:text-bc-red font-semibold">{t('Post-Construction Cleaning')}</span>
                      </Link>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <Link to="/compare-services" className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group mb-2">
                        <Scale className="w-6 h-6 text-bc-red transition-transform duration-200 group-hover:scale-110" />
                        <span className="text-gray-800 group-hover:text-bc-red font-semibold">{t('Compare Services')}</span>
                      </Link>
                      <Link to="/services" className="text-bc-red hover:text-red-700 font-medium text-sm">
                        {t('See All Services')} →
                      </Link>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className={`transition-all duration-300 hover:scale-110 hover:text-bc-red font-bold text-xl tracking-wide bg-transparent border-none shadow-none p-0 h-auto data-[state=open]:bg-transparent ${
                  isOverVideo ? 'text-white drop-shadow-lg' : 'text-gray-800'
                }`}
              >
                {t('More')}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="w-[600px] p-8 bg-white shadow-2xl border border-gray-200 z-[9999] mt-0">
                <div className="space-y-6">
                  <Link to="/testimonials" className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-md transition-colors group">
                    <Star className="h-8 w-8 text-yellow-500 transition-transform duration-200 group-hover:scale-110" />
                    <div>
                      <h4 className="font-medium text-black hover:text-bc-red text-lg">{t('Testimonials')}</h4>
                      <p className="text-sm text-gray-600">Read what our customers say</p>
                    </div>
                  </Link>
                  
                  <Link to="/equipment" className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-md transition-colors group">
                    <img src="/lovable-uploads/945062d9-44b6-4de9-8837-15314feb633a.png" alt="Equipment" className="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-110" />
                    <div>
                      <h4 className="font-medium text-black hover:text-bc-red text-lg">{t('Our Equipment')}</h4>
                      <p className="text-sm text-gray-600">Professional-grade cleaning tools</p>
                    </div>
                  </Link>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2 text-lg">
                      <Star className="h-6 w-6 text-bc-red" />
                      {t('Leave a Review')}
                    </h4>
                    <div className="flex space-x-6">
                      <a href="https://g.page/r/CbeicZxdYHsKEAI/review" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors group">
                        <img src="/lovable-uploads/90d2177a-4c1d-4d8b-9873-f8ee94f4cd1f.png" alt="Google" className="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-110" />
                        <span className="text-base font-medium">Google</span>
                      </a>
                      <a href="https://www.yelp.ca/writeareview/biz/BKJYWQSYBxvKcTA5hkHHsg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors group">
                        <img src="/lovable-uploads/b6d07b0f-96b7-4c0f-90b6-fef10d13439f.png" alt="Yelp" className="h-8 w-8 object-contain transition-transform duration-200 group-hover:scale-110" />
                        <span className="text-base font-medium">Yelp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      <div className="flex items-center space-x-8">
        <Link 
          to="/contact" 
          className={`transition-all duration-300 hover:scale-110 hover:text-bc-red font-bold text-xl tracking-wide ${
            isOverVideo ? 'text-white drop-shadow-lg' : 'text-gray-800'
          }`}
        >
          {t('Contact')}
        </Link>
        
        <LanguageSelector />
      </div>
    </div>
  );
};

export default NavbarDesktop;
