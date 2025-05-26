
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import LanguageSelector from '../LanguageSelector';
import { HelpCircle, Star, ChevronDown } from 'lucide-react';
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

  const navTextClass = `transition-all duration-300 hover:scale-105 hover:text-bc-red font-bold text-lg tracking-wide ${
    isOverVideo ? 'text-white drop-shadow-lg' : 'text-gray-800'
  }`;

  const dropdownTriggerClass = `transition-all duration-300 hover:scale-105 hover:text-bc-red font-bold text-lg tracking-wide bg-transparent border-none shadow-none p-0 h-auto ${
    isOverVideo ? 'text-white drop-shadow-lg' : 'text-gray-800'
  }`;

  return (
    <div className="hidden md:flex items-center justify-between flex-1">
      <div className="flex-1 flex justify-end">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center justify-center space-x-8">
            <NavigationMenuItem>
              <Link 
                to="/" 
                className={navTextClass}
              >
                {t('Home')}
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link 
                to="/why-us" 
                className={navTextClass}
              >
                {t('Why Us')}
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className={dropdownTriggerClass}
              >
                {t('Residential')} <ChevronDown className="ml-1 h-4 w-4" />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-[400px] p-6 bg-white shadow-2xl border border-gray-200 z-[9999] opacity-100">
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
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger 
                className={dropdownTriggerClass}
              >
                {t('Commercial')} <ChevronDown className="ml-1 h-4 w-4" />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="min-w-[400px] p-6 bg-white shadow-2xl border border-gray-200 z-[9999] opacity-100">
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
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link 
                to="/contact" 
                className={navTextClass}
              >
                {t('Contact')}
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      <div className="flex items-center ml-8">
        <LanguageSelector />
      </div>
    </div>
  );
};

export default NavbarDesktop;
