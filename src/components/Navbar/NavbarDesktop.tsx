
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import { Phone, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarDesktopProps {
  isOverVideo: boolean;
}

export const NavbarDesktop = ({ isOverVideo }: NavbarDesktopProps) => {
  const { t } = useTranslation();

  const textColor = isOverVideo ? 'text-white' : 'text-gray-800';
  const hoverColor = isOverVideo ? 'hover:text-gray-200' : 'hover:text-bc-red';

  const moreItems = [
    { name: t('Testimonials'), href: '/testimonials' },
    { name: t('Our Equipment'), href: '/equipment' },
  ];

  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link
        to="/"
        className={`${textColor} ${hoverColor} transition-all duration-200 hover:scale-110 font-medium`}
      >
        {t('Home')}
      </Link>
      
      <Link
        to="/why-us"
        className={`${textColor} ${hoverColor} transition-all duration-200 hover:scale-110 font-medium`}
      >
        {t('Why Us')}
      </Link>

      <Link
        to="/services"
        className={`${textColor} ${hoverColor} transition-all duration-200 hover:scale-110 font-medium`}
      >
        {t('Services')}
      </Link>

      {/* More Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className={`flex items-center ${textColor} ${hoverColor} transition-all duration-200 hover:scale-110 font-medium`}>
          {t('More')} <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 hover:scale-110" />
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="bg-white border border-gray-200 shadow-lg rounded-md w-80 z-50"
          align="center"
          sideOffset={0}
        >
          {moreItems.map((item) => (
            <DropdownMenuItem key={item.name} asChild>
              <Link
                to={item.href}
                className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-bc-red transition-colors w-full"
              >
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
          
          {/* Review Links Section */}
          <div className="border-t border-gray-100 pt-2 mt-2">
            <div className="px-6 py-2">
              <h4 className="font-medium text-gray-900 text-sm">{t('Leave a Review')}</h4>
              <div className="flex items-center space-x-3 mt-2">
                <a href="https://g.page/r/CbeicZxdYHsKEAI/review" target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                  <img src="/lovable-uploads/c7a06e2a-86f1-4622-81b0-513491105641.png" alt="Google" className="h-6 w-6 object-contain" />
                </a>
                <a href="https://www.yelp.ca/writeareview/biz/BKJYWQSYBxvKcTA5hkHHsg" target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                  <img src="/lovable-uploads/e8c22c20-e153-4bde-aeb8-f0ae12a4eae0.png" alt="Yelp" className="h-6 w-6 object-contain" />
                </a>
                <a href="https://trustedpros.ca/company/bc-pressure-washing-whiterock" target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                  <img src="https://trustedpros.ca/images/badge/logo-l-b.png" alt="TrustedPros" className="h-6 w-6 object-contain" />
                </a>
                <a href="https://www.bbb.org/ca/bc/white-rock/profile/window-cleaning/bc-pressure-washing-0037-2263134/customer-reviews" target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                  <img src="/lovable-uploads/8f646c66-5a09-4335-a82d-e15a1d86a4c4.png" alt="BBB" className="h-6 w-6 object-contain" />
                </a>
              </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link
        to="/contact"
        className={`${textColor} ${hoverColor} transition-all duration-200 hover:scale-110 font-medium`}
      >
        {t('Contact')}
      </Link>

      {/* Phone Number */}
      <a
        href="tel:7788087620"
        className="flex items-center bg-bc-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 hover:scale-105"
      >
        <Phone size={16} className="mr-2 transition-transform duration-200 hover:scale-110" />
        (778) 808-7620
      </a>
    </div>
  );
};
