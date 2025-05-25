
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import LanguageSelector from '../LanguageSelector';
import { Calculator, ChevronDown } from 'lucide-react';
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

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget as HTMLElement;
    target.style.transform = 'scale(1.1)';
    target.style.color = '#dc2626';
    target.style.textShadow = '0 0 8px rgba(220, 38, 38, 0.6)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget as HTMLElement;
    target.style.transform = 'scale(1)';
    target.style.color = isOverVideo ? 'white' : 'black';
    target.style.textShadow = 'none';
  };

  const handleTriggerMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLElement;
    target.style.transform = 'scale(1.1)';
    target.style.color = '#dc2626';
    target.style.textShadow = '0 0 8px rgba(220, 38, 38, 0.6)';
  };

  const handleTriggerMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLElement;
    target.style.transform = 'scale(1)';
    target.style.color = isOverVideo ? 'white' : 'black';
    target.style.textShadow = 'none';
  };

  return (
    <div className="hidden md:flex items-center justify-between flex-1 px-8">
      <NavigationMenu>
        <NavigationMenuList className="flex items-center space-x-20">
          <NavigationMenuItem>
            <Link 
              to="/" 
              className={`transition-all duration-300 font-bold text-lg hover:scale-110 hover:text-bc-red hover:drop-shadow-lg ${
                isOverVideo ? 'text-white' : 'text-black'
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {t('Home')}
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link 
              to="/why-us" 
              className={`transition-all duration-300 font-bold text-lg hover:scale-110 hover:text-bc-red hover:drop-shadow-lg ${
                isOverVideo ? 'text-white' : 'text-black'
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {t('Why Us')}
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger 
              className={`transition-all duration-300 font-bold text-lg hover:scale-110 hover:text-bc-red hover:drop-shadow-lg bg-transparent border-none shadow-none p-0 h-auto data-[state=open]:bg-transparent hover:bg-transparent focus:bg-transparent ${
                isOverVideo ? 'text-white' : 'text-black'
              }`}
              onMouseEnter={handleTriggerMouseEnter}
              onMouseLeave={handleTriggerMouseLeave}
            >
              {t('Services')}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-[600px] p-6 bg-white/95 backdrop-blur-sm z-[60] mt-2">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Residential</h3>
                  <div className="space-y-3">
                    <Link to="/services/window-cleaning" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                      <img src="/lovable-uploads/3f12496a-a48d-49fe-b614-77435e9bab36.png" alt="Window Cleaning" className="w-8 h-8 object-cover" />
                      <span className="text-black hover:text-bc-red">{t('Window Cleaning')}</span>
                    </Link>
                    <Link to="/services/pressure-washing" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                      <img src="/lovable-uploads/5ac75bee-3951-47f2-9a3c-871acaf8f01b.png" alt="House Washing" className="w-8 h-8 object-cover" />
                      <span className="text-black hover:text-bc-red">{t('House Washing')}</span>
                    </Link>
                    <Link to="/services/gutter-cleaning" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                      <img src="/lovable-uploads/f899a443-8930-4364-b538-916f65545f84.png" alt="Gutter Cleaning" className="w-8 h-8 object-cover" />
                      <span className="text-black hover:text-bc-red">{t('Gutter Cleaning')}</span>
                    </Link>
                    <Link to="/services/roof-cleaning" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                      <img src="/lovable-uploads/51f10eb0-c939-49d5-8ab5-2235a162169e.png" alt="Roof Cleaning" className="w-8 h-8 object-cover" />
                      <span className="text-black hover:text-bc-red">{t('Roof Cleaning')}</span>
                    </Link>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Commercial</h3>
                  <div className="space-y-3">
                    <Link to="/services/commercial-window-cleaning" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                      <img src="/lovable-uploads/fe9ad8bf-d5d6-415e-9db8-ebbf40ad6fc5.png" alt="Commercial Window Cleaning" className="w-8 h-8 object-contain" />
                      <span className="text-black hover:text-bc-red">{t('Commercial Window Cleaning')}</span>
                    </Link>
                    <Link to="/services/commercial-pressure-washing" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                      <img src="/lovable-uploads/b4303ec4-9120-49a2-8553-835158e0ddea.png" alt="Commercial Pressure Washing" className="w-8 h-8 object-contain" />
                      <span className="text-black hover:text-bc-red">{t('Commercial Pressure Washing')}</span>
                    </Link>
                    <Link to="/services/post-construction-window-cleaning" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                      <img src="/lovable-uploads/9aaa04e0-6635-47e9-9412-f86e8c9190ce.png" alt="Post-Construction Cleaning" className="w-8 h-8 object-contain" />
                      <span className="text-black hover:text-bc-red">{t('Post-Construction Cleaning')}</span>
                    </Link>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link to="/services" className="text-bc-red hover:text-red-700 font-medium">
                      {t('See All Services')} →
                    </Link>
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger 
              className={`transition-all duration-300 font-bold text-lg hover:scale-110 hover:text-bc-red hover:drop-shadow-lg bg-transparent border-none shadow-none p-0 h-auto data-[state=open]:bg-transparent hover:bg-transparent focus:bg-transparent ${
                isOverVideo ? 'text-white' : 'text-black'
              }`}
              onMouseEnter={handleTriggerMouseEnter}
              onMouseLeave={handleTriggerMouseLeave}
            >
              {t('More')}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-[400px] p-6 bg-white/95 backdrop-blur-sm z-[60] mt-2">
              <div className="space-y-4">
                <Link to="/testimonials" className="block p-3 hover:bg-gray-50 rounded-md transition-colors">
                  <h4 className="font-medium text-black hover:text-bc-red">{t('Testimonials')}</h4>
                  <p className="text-sm text-gray-600">Read what our customers say</p>
                </Link>
                
                <Link to="/equipment" className="block p-3 hover:bg-gray-50 rounded-md transition-colors">
                  <h4 className="font-medium text-black hover:text-bc-red">{t('Our Equipment')}</h4>
                  <p className="text-sm text-gray-600">Professional-grade cleaning tools</p>
                </Link>
                
                <Link to="/why-us" className="block p-3 hover:bg-gray-50 rounded-md transition-colors">
                  <h4 className="font-medium text-black hover:text-bc-red">{t('Why Choose Us')}</h4>
                  <p className="text-sm text-gray-600">Learn about our company values</p>
                </Link>
                
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">{t('Leave a Review')}</h4>
                  <div className="flex space-x-3">
                    <a href="https://g.page/r/CbeicZxdYHsKEAI/review" target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-50 hover:bg-gray-100 rounded-md">
                      <img src="/lovable-uploads/c7a06e2a-86f1-4622-81b0-513491105641.png" alt="Google" className="h-6 w-6 object-contain" />
                    </a>
                    <a href="https://www.yelp.ca/writeareview/biz/BKJYWQSYBxvKcTA5hkHHsg" target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-50 hover:bg-gray-100 rounded-md">
                      <img src="/lovable-uploads/e8c22c20-e153-4bde-aeb8-f0ae12a4eae0.png" alt="Yelp" className="h-6 w-6 object-contain" />
                    </a>
                    <a href="https://www.bbb.org/ca/bc/white-rock/profile/window-cleaning/bc-pressure-washing-0037-2263134/customer-reviews" target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-50 hover:bg-gray-100 rounded-md">
                      <img src="/lovable-uploads/8f646c66-5a09-4335-a82d-e15a1d86a4c4.png" alt="BBB" className="h-6 w-6 object-contain" />
                    </a>
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      <div className="flex items-center space-x-6">
        <Link 
          to="/calculator" 
          className={`flex items-center gap-2 px-4 py-2 rounded-md border transition-all duration-300 font-bold hover:scale-105 hover:drop-shadow-lg ${
            isOverVideo 
              ? 'border-white text-white hover:bg-white hover:text-black' 
              : 'border-bc-red text-bc-red hover:bg-bc-red hover:text-white'
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Calculator size={16} />
          {t('Get a Quote')}
        </Link>
        
        <Link 
          to="/contact" 
          className={`transition-all duration-300 font-bold text-lg hover:scale-110 hover:text-bc-red hover:drop-shadow-lg ${
            isOverVideo ? 'text-white' : 'text-black'
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {t('Contact')}
        </Link>
        
        <LanguageSelector />
      </div>
    </div>
  );
};

export default NavbarDesktop;
