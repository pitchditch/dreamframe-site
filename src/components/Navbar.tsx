import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { useScroll } from '@/hooks/use-scroll';
import logo from '/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [servicesDropdownActive, setServicesDropdownActive] = useState(false);
  const [locationsDropdownActive, setLocationsDropdownActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesDropdownOpen, setMobileServicesDropdownOpen] = useState(false);
  const [mobileLocationsDropdownOpen, setMobileLocationsDropdownOpen] = useState(false);
  const [logoRotation, setLogoRotation] = useState(false);
  const scrolled = useScroll(50);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navbarClass = `fixed top-0 left-0 w-full transition-all duration-300 ease-in-out ${scrolled || location.pathname !== '/' ? 'bg-white shadow-md text-gray-800' : 'bg-transparent text-white'} ${location.pathname === '/' && document.body.classList.contains('has-video-header') && !scrolled ? 'bg-transparent text-white' : ''}`;
  const navLinkClass = `text-sm font-medium hover:text-bc-red transition-colors duration-200`;

  const servicesDropdown = [
    { name: "Pressure Washing", href: "/services/pressure-washing" },
    { name: "Window Cleaning", href: "/services/window-cleaning" },
    { name: "Gutter Cleaning", href: "/services/gutter-cleaning" },
    { name: "Roof Cleaning", href: "/services/roof-cleaning" },
    { name: "Soft Washing", href: "/services/soft-washing" },
    { name: "Commercial Services", href: "/services/commercial-pressure-washing" },
  ];

  const locationsDropdown = [
    { name: "White Rock", href: "/locations/white-rock" },
    { name: "Surrey", href: "/locations/surrey" },
  ];

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    const rotateLogoAfterIdle = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setLogoRotation(true);
        setTimeout(() => {
          setLogoRotation(false);
        }, 1500);
      }, 30000);
    };

    const resetTimer = () => {
      rotateLogoAfterIdle();
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('click', resetTimer);

    rotateLogoAfterIdle();

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('click', resetTimer);
    };
  }, []);
  
  return (
    <div className={`flex items-center w-full justify-between px-4 md:px-6 py-2 z-40 ${navbarClass}`}>
      <div className="flex items-center">
        <Link to="/" className="flex-none">
          <img 
            src={logo} 
            alt="BC Pressure Washing logo" 
            className={`h-16 w-auto ${logoRotation ? 'logo-spin' : ''}`}
          />
        </Link>
      </div>
      
      <div className="lg:hidden">
        <Button variant="outline" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </Button>
      </div>
      
      <div className="hidden lg:flex lg:gap-x-6">
        <Link to="/" className={`${navLinkClass} ${location.pathname === '/' ? 'text-bc-red font-semibold' : ''}`}>
          Home
        </Link>
        <div className="relative group">
          <button 
            className={`${navLinkClass} flex items-center gap-x-1 group ${servicesDropdownActive ? 'text-bc-red font-semibold' : ''}`}
            onMouseEnter={() => setServicesDropdownActive(true)}
            onMouseLeave={() => setServicesDropdownActive(false)}
          >
            Services
            <svg className={`h-5 w-5 ${servicesDropdownActive ? 'rotate-180' : ''} transition-transform duration-200`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
          {servicesDropdownActive && (
            <div 
              className="absolute z-10 mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5"
              onMouseEnter={() => setServicesDropdownActive(true)}
              onMouseLeave={() => setServicesDropdownActive(false)}
            >
              {servicesDropdown.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setServicesDropdownActive(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="relative group">
          <button 
            className={`${navLinkClass} flex items-center gap-x-1 group ${locationsDropdownActive ? 'text-bc-red font-semibold' : ''}`}
            onMouseEnter={() => setLocationsDropdownActive(true)}
            onMouseLeave={() => setLocationsDropdownActive(false)}
          >
            Locations
            <svg className={`h-5 w-5 ${locationsDropdownActive ? 'rotate-180' : ''} transition-transform duration-200`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
          {locationsDropdownActive && (
            <div 
              className="absolute z-10 mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5"
              onMouseEnter={() => setLocationsDropdownActive(true)}
              onMouseLeave={() => setLocationsDropdownActive(false)}
            >
              {locationsDropdown.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setLocationsDropdownActive(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/why-choose-us" className={`${navLinkClass} ${location.pathname === '/why-choose-us' ? 'text-bc-red font-semibold' : ''}`}>
          Why Us
        </Link>
        <Link to="/contact" className={`${navLinkClass} ${location.pathname === '/contact' ? 'text-bc-red font-semibold' : ''}`}>
          Contact
        </Link>
      </div>

      <div className={`lg:hidden ${mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity duration-300" onClick={() => setMobileMenuOpen(false)}></div>
        
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <img className="h-12 w-auto" src={logo} alt="BC Pressure Washing" />
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
          
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/"
                  className="-mx-3 block rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                
                <div className="-mx-3">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50"
                    onClick={() => setMobileServicesDropdownOpen(!mobileServicesDropdownOpen)}
                  >
                    Services
                    <svg
                      className={`h-5 w-5 flex-none ${mobileServicesDropdownOpen ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {mobileServicesDropdownOpen && (
                    <div className="mt-2 space-y-2">
                      {servicesDropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="-mx-3">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50"
                    onClick={() => setMobileLocationsDropdownOpen(!mobileLocationsDropdownOpen)}
                  >
                    Locations
                    <svg
                      className={`h-5 w-5 flex-none ${mobileLocationsDropdownOpen ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {mobileLocationsDropdownOpen && (
                    <div className="mt-2 space-y-2">
                      {locationsDropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                
                <Link
                  to="/why-choose-us"
                  className="-mx-3 block rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Why Us
                </Link>
                <Link
                  to="/contact"
                  className="-mx-3 block rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
