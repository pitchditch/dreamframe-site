
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import LanguageSelector from '../LanguageSelector';
import { Star } from 'lucide-react';
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

  return (
    <div className="hidden md:flex items-center justify-between flex-1">
      <div className="flex-1 flex justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center justify-center space-x-12">
            <NavigationMenuItem>
              <Link 
                to="/" 
                className={`transition-all duration-300 hover:scale-110 hover:text-bc-red font-bold text-xl tracking-wide ${
                  isOverVideo ? 'text-white drop-shadow-lg' : 'text-gray-800'
                }`}
              >
                {t('Home')}
              </Link>
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
              <NavigationMenuContent className="min-w-[800px] p-8 bg-white shadow-2xl border border-gray-200 z-[9999] mt-2">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 text-lg">Residential</h3>
                    <div className="space-y-4">
                      <Link to="/services/window-cleaning" className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <img src="/lovable-uploads/3f12496a-a48d-49fe-b614-77435e9bab36.png" alt="Window Cleaning" className="w-10 h-10 object-cover rounded" />
                        <span className="text-gray-700 group-hover:text-bc-red font-medium">{t('Window Cleaning')}</span>
                      </Link>
                      <Link to="/services/pressure-washing" className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <img src="/lovable-uploads/5ac75bee-3951-47f2-9a3c-871acaf8f01b.png" alt="House Washing" className="w-10 h-10 object-cover rounded" />
                        <span className="text-gray-700 group-hover:text-bc-red font-medium">{t('House Washing')}</span>
                      </Link>
                      <Link to="/services/gutter-cleaning" className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <img src="/lovable-uploads/f899a443-8930-4364-b538-916f65545f84.png" alt="Gutter Cleaning" className="w-10 h-10 object-cover rounded" />
                        <span className="text-gray-700 group-hover:text-bc-red font-medium">{t('Gutter Cleaning')}</span>
                      </Link>
                      <Link to="/services/roof-cleaning" className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <img src="/lovable-uploads/51f10eb0-c939-49d5-8ab5-2235a162169e.png" alt="Roof Cleaning" className="w-10 h-10 object-cover rounded" />
                        <span className="text-gray-700 group-hover:text-bc-red font-medium">{t('Roof Cleaning')}</span>
                      </Link>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 text-lg">Commercial</h3>
                    <div className="space-y-4">
                      <Link to="/services/commercial-window-cleaning" className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <img src="/lovable-uploads/fe9ad8bf-d5d6-415e-9db8-ebbf40ad6fc5.png" alt="Commercial Window Cleaning" className="w-10 h-10 object-contain rounded" />
                        <span className="text-gray-700 group-hover:text-bc-red font-medium">{t('Commercial Window Cleaning')}</span>
                      </Link>
                      <Link to="/services/commercial-pressure-washing" className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <img src="/lovable-uploads/b4303ec4-9120-49a2-8553-835158e0ddea.png" alt="Commercial Pressure Washing" className="w-10 h-10 object-contain rounded" />
                        <span className="text-gray-700 group-hover:text-bc-red font-medium">{t('Commercial Pressure Washing')}</span>
                      </Link>
                      <Link to="/services/post-construction-window-cleaning" className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group">
                        <img src="/lovable-uploads/9aaa04e0-6635-47e9-9412-f86e8c9190ce.png" alt="Post-Construction Cleaning" className="w-10 h-10 object-contain rounded" />
                        <span className="text-gray-700 group-hover:text-bc-red font-medium">{t('Post-Construction Cleaning')}</span>
                      </Link>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <Link to="/compare-services" className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group mb-2">
                        <img src="/lovable-uploads/945062d9-44b6-4de9-8837-15314feb633a.png" alt="Compare Services" className="w-6 h-6 object-contain text-bc-red" />
                        <span className="text-gray-700 group-hover:text-bc-red font-medium">{t('Compare Services')}</span>
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
              <NavigationMenuContent className="w-[600px] p-6 bg-white shadow-2xl border border-gray-200 z-[9999] mt-0">
                <div className="space-y-4">
                  <Link to="/testimonials" className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-md transition-colors">
                    <Star className="h-6 w-6 text-yellow-500" />
                    <div>
                      <h4 className="font-medium text-black hover:text-bc-red">{t('Testimonials')}</h4>
                      <p className="text-sm text-gray-600">Read what our customers say</p>
                    </div>
                  </Link>
                  
                  <Link to="/equipment" className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-md transition-colors">
                    <img src="/lovable-uploads/945062d9-44b6-4de9-8837-15314feb633a.png" alt="Equipment" className="h-6 w-6 object-contain" />
                    <div>
                      <h4 className="font-medium text-black hover:text-bc-red">{t('Our Equipment')}</h4>
                      <p className="text-sm text-gray-600">Professional-grade cleaning tools</p>
                    </div>
                  </Link>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <Star className="h-5 w-5 text-bc-red" />
                      {t('Leave a Review')}
                    </h4>
                    <div className="flex space-x-4">
                      <a href="https://g.page/r/CbeicZxdYHsKEAI/review" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                        <img src="/lovable-uploads/90d2177a-4c1d-4d8b-9873-f8ee94f4cd1f.png" alt="Google" className="h-6 w-6 object-contain" />
                        <span className="text-sm font-medium">Google</span>
                      </a>
                      <a href="https://www.yelp.ca/writeareview/biz/BKJYWQSYBxvKcTA5hkHHsg" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                        <img src="/lovable-uploads/b6d07b0f-96b7-4c0f-90b6-fef10d13439f.png" alt="Yelp" className="h-6 w-6 object-contain" />
                        <span className="text-sm font-medium">Yelp</span>
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
