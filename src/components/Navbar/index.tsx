
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';
import { MobileMenuButton } from './MobileMenuButton';
import CallButton from '../CallButton';
import { useTranslation } from '@/hooks/use-translation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverVideo, setIsOverVideo] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false); 
  const [isScrollingFast, setIsScrollingFast] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    // Set initial state
    const isHomePage = location.pathname === '/';
    setIsOverVideo(isHomePage && !isScrolled);
    setIsInitialized(true);

    const handleScroll = () => {
      // Detect scrolling speed
      const currentScrollY = window.scrollY;
      const scrollSpeed = Math.abs(currentScrollY - lastScrollY);
      setLastScrollY(currentScrollY);
      
      // Set scrolling fast flag if scrolling faster than threshold
      if (scrollSpeed > 15) {
        setIsScrollingFast(true);
        // Reset after short delay
        setTimeout(() => setIsScrollingFast(false), 500);
      }
      
      if (currentScrollY > 60) {
        setIsScrolled(true);
        setIsOverVideo(false); // Only apply transparent overlay when at the top
      } else {
        setIsScrolled(false);
        if (isHomePage) {
          setIsOverVideo(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call immediately to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, lastScrollY]);

  // Reset menu state on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isTransparent = isOverVideo || isScrollingFast;

  return (
    <header 
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        !isInitialized ? 'bg-white' : // Always start with white background
        isTransparent 
          ? 'bg-black/40 backdrop-blur-sm' 
          : 'bg-white shadow-md py-1'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo isOverVideo={isTransparent} />

        <div className="flex items-center justify-between flex-1 max-w-5xl ml-8">
          <NavbarDesktop 
            isOverVideo={isTransparent}
            isServicesMenuOpen={isServicesMenuOpen}
            setIsServicesMenuOpen={setIsServicesMenuOpen}
          />
          
          <div className="hidden md:block">
            <CallButton />
          </div>
          
          <MobileMenuButton 
            isOverVideo={isTransparent}
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
