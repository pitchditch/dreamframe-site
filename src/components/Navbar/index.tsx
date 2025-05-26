
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from '../Logo';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';
import { MobileMenuButton } from './MobileMenuButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Pages with hero sections that need transparent navbar initially
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
      const heroHeight = window.innerHeight * 0.8; // Hero section height
      
      // Only be transparent when on a hero page AND still in the hero section
      const shouldBeTransparent = heroPages.includes(location.pathname) && currentScrollY < heroHeight;
      
      setIsOverHero(shouldBeTransparent);
      setIsScrolled(currentScrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesMenuOpen(false);
    
    // Reset hero state when route changes
    const isOnHeroPage = heroPages.includes(location.pathname);
    setIsOverHero(isOnHeroPage);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled || !isOverHero ? 'bg-white/95 backdrop-blur-sm shadow-md h-20 md:h-24' : 'bg-transparent h-20 md:h-24'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        <Logo isOverVideo={isOverHero && !isScrolled} />
        <NavbarDesktop isOverVideo={isOverHero && !isScrolled} />
        <div className="md:hidden">
          <MobileMenuButton isOverVideo={isOverHero && !isScrolled} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
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
