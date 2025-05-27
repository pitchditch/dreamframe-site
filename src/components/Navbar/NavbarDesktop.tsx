
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslation } from '@/hooks/use-translation';

interface NavbarDesktopProps {
  isOverVideo: boolean;
}

export const NavbarDesktop: React.FC<NavbarDesktopProps> = ({ isOverVideo }) => {
  const { t } = useTranslation();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const textColor = isOverVideo ? 'text-white hover:text-bc-red' : 'text-gray-900 hover:text-bc-red';
  const bgColor = isOverVideo ? 'bg-white/10 backdrop-blur-sm' : 'bg-white';

  const services = [
    { name: t("Window Cleaning"), href: "/services/window-cleaning" },
    { name: t("Pressure Washing"), href: "/services/pressure-washing" },
    { name: t("Gutter Cleaning"), href: "/services/gutter-cleaning" },
    { name: t("Roof Cleaning"), href: "/services/roof-cleaning" },
    { name: t("Commercial Window Cleaning"), href: "/services/commercial-window-cleaning" },
    { name: t("Commercial Pressure Washing"), href: "/services/commercial-pressure-washing" },
    { name: t("Post-Construction Window Cleaning"), href: "/services/post-construction-window-cleaning" }
  ];

  const moreItems = [
    { name: t("About"), href: "/about" },
    { name: t("Why Choose Us"), href: "/why-us" },
    { name: t("Equipment"), href: "/equipment" },
    { name: t("Testimonials"), href: "/testimonials" },
    { name: t("Process"), href: "/process" },
    { name: t("Compare Services"), href: "/compare-prices" },
    { name: t("Blog"), href: "/blog" },
    { name: t("Service Areas"), href: "/locations/metro-vancouver" }
  ];

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link to="/" className={`font-semibold transition-colors duration-200 ${textColor}`}>
        {t("Home")}
      </Link>
      
      {/* Services Dropdown */}
      <div 
        className="relative"
        onMouseEnter={() => setIsServicesOpen(true)}
        onMouseLeave={() => setIsServicesOpen(false)}
      >
        <button className={`font-semibold transition-colors duration-200 flex items-center ${textColor}`}>
          {t("Services")} <ChevronDown className="ml-1 h-4 w-4" />
        </button>
        {isServicesOpen && (
          <div className={`absolute top-full left-0 mt-2 w-80 ${bgColor} border border-gray-200 rounded-lg shadow-xl z-50 py-2`}>
            {services.map((service) => (
              <Link
                key={service.href}
                to={service.href}
                className="block px-4 py-3 text-gray-900 hover:bg-gray-50 hover:text-bc-red transition-colors duration-200 text-sm font-medium"
              >
                {service.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* More Dropdown */}
      <div 
        className="relative"
        onMouseEnter={() => setIsMoreOpen(true)}
        onMouseLeave={() => setIsMoreOpen(false)}
      >
        <button className={`font-semibold transition-colors duration-200 flex items-center ${textColor}`}>
          {t("More")} <ChevronDown className="ml-1 h-4 w-4" />
        </button>
        {isMoreOpen && (
          <div className={`absolute top-full left-0 mt-2 w-64 ${bgColor} border border-gray-200 rounded-lg shadow-xl z-50 py-2`}>
            {moreItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-4 py-3 text-gray-900 hover:bg-gray-50 hover:text-bc-red transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Link to="/contact" className={`font-semibold transition-colors duration-200 ${textColor}`}>
        {t("Contact")}
      </Link>

      <a
        href="tel:778-808-7620"
        className="flex items-center gap-2 bg-bc-red text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-red-700 transition-colors duration-200"
      >
        <Phone size={16} />
        <span className="hidden lg:inline">{t("Call Now")}</span>
      </a>
    </nav>
  );
};
