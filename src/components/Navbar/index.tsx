
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';
import { MobileMenuButton } from './MobileMenuButton';
import LanguageSelector from '../LanguageSelector';
import { useTranslation } from '@/hooks/use-translation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverVideo, setIsOverVideo] = useState(false); 
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
        // Only set isOverVideo if we're on the home page
        if (location.pathname === '/') {
          setIsOverVideo(true);
        }
      } else {
        setIsScrolled(false);
        // Only update isOverVideo if we're on the home page
        if (location.pathname === '/') {
          setIsOverVideo(false);
        }
      }
    };

    // Initialize on mount - only set to transparent on home page
    setIsOverVideo(location.pathname === '/');

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Check for video header when route changes
  useEffect(() => {
    // Only set to transparent on home page
    setIsOverVideo(location.pathname === '/');
  }, [location.pathname]);

  // Close mobile menu when navigation occurs
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        isOverVideo 
        ? 'bg-transparent backdrop-blur-sm' 
        : isScrolled 
          ? 'bg-white shadow-md py-1' 
          : 'bg-white py-2'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo isOverVideo={isOverVideo} />

        <div className="flex items-center space-x-4">
          <NavbarDesktop 
            isOverVideo={isOverVideo}
            isServicesMenuOpen={isServicesMenuOpen}
            setIsServicesMenuOpen={setIsServicesMenuOpen}
          />
          
          <div className="hidden md:block">
            <LanguageSelector />
          </div>
          
          <MobileMenuButton 
            isOverVideo={isOverVideo}
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
          />
        </div>
      </div>

      <NavbarMobile 
        isMenuOpen={isMenuOpen}
        isServicesMenuOpen={isServicesMenuOpen}
        setIsServicesMenuOpen={setIsServicesMenuOpen}
      />
    </header>
  );
};

export default Navbar;
