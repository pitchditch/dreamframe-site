
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';
import { MobileMenuButton } from './MobileMenuButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Pages with hero sections
  const heroPages = [
    '/', 
    '/why-us', 
    '/services/gutter-cleaning', 
    '/services/roof-cleaning',
    '/services/window-cleaning',
    '/services/pressure-washing',
    '/services/post-construction-window-cleaning',
    '/services/commercial-window-cleaning',
    '/services/commercial-pressure-washing',
    '/vancouver-window-cleaning',
    '/contact'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.6;
      
      // Only make transparent AFTER passing the hero section on hero pages
      const shouldBeTransparent = heroPages.includes(location.pathname) && currentScrollY > heroHeight;
      
      setIsTransparent(shouldBeTransparent);
      setIsScrolled(currentScrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesMenuOpen(false);
    
    // Reset transparency state when route changes
    setIsTransparent(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isTransparent 
        ? 'bg-transparent h-28 md:h-36 border-none' 
        : 'bg-white/95 backdrop-blur-sm shadow-md h-28 md:h-32 border-b border-gray-200'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        <Logo isOverVideo={false} />
        <NavbarDesktop isOverVideo={false} />
        <div className="md:hidden">
          <MobileMenuButton isOverVideo={false} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
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
