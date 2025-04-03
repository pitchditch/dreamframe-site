
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
  const [isInitialized, setIsInitialized] = useState(false); 
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    // Set initial state
    const isHomePage = location.pathname === '/';
    setIsOverVideo(isHomePage);
    setIsInitialized(true);

    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
        if (isHomePage) {
          setIsOverVideo(true);
        }
      } else {
        setIsScrolled(false);
        if (isHomePage) {
          setIsOverVideo(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Reset menu state on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        !isInitialized ? 'bg-white' : // Always start with white background
        isOverVideo 
          ? 'bg-black/40 backdrop-blur-sm' 
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
