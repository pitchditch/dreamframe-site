
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';
import { MobileMenuButton } from './MobileMenuButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isOverVideo, setIsOverVideo] = useState(false);
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
      const heroHeight = window.innerHeight * 0.8;
      
      // Check if we're in a hero section area
      const isInHeroArea = heroPages.includes(location.pathname) && currentScrollY < heroHeight;
      
      setIsOverVideo(isInHeroArea);
      setIsScrolled(currentScrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesMenuOpen(false);
    
    // Set initial state for hero pages
    const isHeroPage = heroPages.includes(location.pathname);
    setIsOverVideo(isHeroPage);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Check if we're on gutter cleaning page for special blue background
  const isGutterCleaningPage = location.pathname === '/services/gutter-cleaning';

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isOverVideo 
        ? isGutterCleaningPage 
          ? 'bg-gradient-to-br from-blue-900 to-gray-900 h-28 md:h-36' 
          : 'bg-transparent h-28 md:h-36'
        : 'bg-white/95 backdrop-blur-sm h-28 md:h-32'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        <Logo isOverVideo={isOverVideo} />
        <NavbarDesktop isOverVideo={isOverVideo} />
        <div className="md:hidden">
          <MobileMenuButton isOverVideo={isOverVideo} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
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
