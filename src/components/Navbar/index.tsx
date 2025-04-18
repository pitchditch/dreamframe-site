
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';
import { MobileMenuButton } from './MobileMenuButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverVideo, setIsOverVideo] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isScrollingFast, setIsScrollingFast] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const isHomePage = location.pathname === '/';
    setIsOverVideo(isHomePage && !isScrolled);
    setIsInitialized(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollSpeed = Math.abs(currentScrollY - lastScrollY);
      setLastScrollY(currentScrollY);
      
      if (scrollSpeed > 15) {
        setIsScrollingFast(true);
        setTimeout(() => setIsScrollingFast(false), 500);
      }
      
      if (currentScrollY > 60) {
        setIsScrolled(true);
        setIsOverVideo(false);
      } else {
        setIsScrolled(false);
        if (isHomePage) {
          setIsOverVideo(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, lastScrollY]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isTransparent = isOverVideo || isScrollingFast;

  return (
    <header 
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        !isInitialized ? 'bg-white' : 
        isTransparent ? 'bg-transparent text-white' : 
        'bg-white text-black'
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
