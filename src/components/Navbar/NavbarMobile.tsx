
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { MobileMenuButton } from './MobileMenuButton';
import { X, Phone, ChevronDown, Home, Building, Droplets, Window } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface NavbarMobileProps {
  isMenuOpen: boolean;
  isServicesMenuOpen: boolean;
  setIsServicesMenuOpen: (value: boolean) => void;
}

const NavbarMobile = ({ isMenuOpen, isServicesMenuOpen, setIsServicesMenuOpen }: NavbarMobileProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
      <div className="flex justify-between items-center py-4 px-4">
        <Link to="/" onClick={closeMenu} className="z-20" aria-label="BC Pressure Washing">
          <Logo isOverVideo={false} />
        </Link>
        <div className="flex items-center z-20">
          <a href="tel:7788087620" className="mr-4 bg-bc-red text-white p-2 rounded-full">
            <Phone size={20} />
          </a>
          <MobileMenuButton isOverVideo={false} isMenuOpen={isOpen} toggleMenu={toggleMenu} />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-10 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-30 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-xl">{t("Menu")}</h2>
          <button 
            onClick={closeMenu}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/" onClick={closeMenu} className="block py-2 hover:text-bc-red">
                {t("Home")}
              </Link>
            </li>
            
            <li>
              <Accordion type="single" collapsible className="border-b border-gray-100">
                <AccordionItem value="services" className="border-none">
                  <AccordionTrigger className="py-2 hover:text-bc-red">
                    {t("Services")}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="ml-4 space-y-1">
                      <h3 className="text-sm font-semibold text-gray-500 py-1">{t("Residential")}</h3>
                      <Link 
                        to="/services/window-cleaning" 
                        onClick={closeMenu}
                        className="block py-2 text-gray-600 hover:text-bc-red flex items-center"
                      >
                        <Window className="w-4 h-4 mr-2 text-bc-red" />
                        {t("Window Cleaning")}
                      </Link>
                      <Link 
                        to="/services/pressure-washing" 
                        onClick={closeMenu}
                        className="block py-2 text-gray-600 hover:text-bc-red flex items-center"
                      >
                        <Droplets className="w-4 h-4 mr-2 text-bc-red" />
                        {t("Pressure Washing")}
                      </Link>
                      <Link 
                        to="/services/gutter-cleaning" 
                        onClick={closeMenu}
                        className="block py-2 text-gray-600 hover:text-bc-red flex items-center"
                      >
                        <Home className="w-4 h-4 mr-2 text-bc-red" />
                        {t("Gutter Cleaning")}
                      </Link>
                      <Link 
                        to="/services/roof-cleaning" 
                        onClick={closeMenu}
                        className="block py-2 text-gray-600 hover:text-bc-red flex items-center"
                      >
                        <Home className="w-4 h-4 mr-2 text-bc-red rotate-180" />
                        {t("Roof Cleaning")}
                      </Link>
                      
                      <h3 className="text-sm font-semibold text-gray-500 py-1 mt-2">{t("Commercial")}</h3>
                      <Link 
                        to="/services/commercial-window-cleaning" 
                        onClick={closeMenu}
                        className="block py-2 text-gray-600 hover:text-bc-red flex items-center"
                      >
                        <Building className="w-4 h-4 mr-2 text-bc-red" />
                        {t("Commercial Window Cleaning")}
                      </Link>
                      <Link 
                        to="/services/commercial-pressure-washing" 
                        onClick={closeMenu}
                        className="block py-2 text-gray-600 hover:text-bc-red flex items-center"
                      >
                        <Building className="w-4 h-4 mr-2 text-bc-red" />
                        {t("Commercial Pressure Washing")}
                      </Link>
                      <Link 
                        to="/services/post-construction-window-cleaning" 
                        onClick={closeMenu}
                        className="block py-2 text-gray-600 hover:text-bc-red flex items-center"
                      >
                        <Building className="w-4 h-4 mr-2 text-bc-red" />
                        {t("Post-Construction Cleaning")}
                      </Link>
                      <Link 
                        to="/service-comparison" 
                        onClick={closeMenu}
                        className="block py-2 font-semibold text-bc-red"
                      >
                        {t("Compare Services")}
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>
            
            <li>
              <Link to="/why-us" onClick={closeMenu} className="block py-2 hover:text-bc-red">
                {t("Why Us")}
              </Link>
            </li>
            
            <li>
              <Link to="/blog" onClick={closeMenu} className="block py-2 hover:text-bc-red">
                {t("Blog")}
              </Link>
            </li>
            
            <li>
              <Accordion type="single" collapsible className="border-b border-gray-100">
                <AccordionItem value="more" className="border-none">
                  <AccordionTrigger className="py-2 hover:text-bc-red">
                    {t("More")}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="ml-4 space-y-1">
                      <Link 
                        to="/online-booking" 
                        onClick={closeMenu}
                        className="block py-2 text-gray-600 hover:text-bc-red"
                      >
                        {t("Online Booking")}
                      </Link>
                      <Link 
                        to="/success-stories" 
                        onClick={closeMenu}
                        className="block py-2 text-gray-600 hover:text-bc-red"
                      >
                        {t("Success Stories")}
                      </Link>
                      <Link 
                        to="/testimonials" 
                        onClick={closeMenu}
                        className="block py-2 text-gray-600 hover:text-bc-red"
                      >
                        {t("Testimonials")}
                      </Link>
                      <Link 
                        to="/referrals" 
                        onClick={closeMenu}
                        className="block py-2 text-gray-600 hover:text-bc-red"
                      >
                        {t("Referral Program")}
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>
            
            <li className="border-b border-gray-100">
              <Link to="/contact" onClick={closeMenu} className="block py-2 hover:text-bc-red">
                {t("Contact")}
              </Link>
            </li>
          </ul>
          
          <div className="mt-6">
            <Button asChild className="w-full" variant="bc-red">
              <Link to="/contact" onClick={closeMenu}>
                {t("Get a Free Quote")}
              </Link>
            </Button>
          </div>
          
          <div className="mt-4">
            <Button asChild className="w-full" variant="outline">
              <Link to="/online-booking" onClick={closeMenu}>
                {t("Book Online")}
              </Link>
            </Button>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>{t("Follow us:")}</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="https://www.facebook.com/bcpressurewashing" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bc-red">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.instagram.com/bc.pressure.washing" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bc-red">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@bc.pressure.washing" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-bc-red">
                <span className="sr-only">YouTube</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavbarMobile;
