
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { NavbarDesktop } from './NavbarDesktop';
import { NavbarMobile } from './NavbarMobile';
import { MobileMenuButton } from './MobileMenuButton';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
  const [isOverVideo, setIsOverVideo] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // All pages will have dark overlays that need white text
  const darkOverlayPages = [
    '/',
    '/home',
    '/why-us',
    '/services/gutter-cleaning',
    '/services/roof-cleaning',
    '/services/window-cleaning',
    '/services/pressure-washing',
    '/services/post-construction-window-cleaning',
    '/services/commercial-pressure-washing',
    '/services/commercial-window-cleaning',
    '/contact',
    '/about',
    '/testimonials',
    '/services'
  ];

  useEffect(() => {
    const handleScroll = () => {
      // For any page with a hero section
      const heroSection = document.querySelector('.hero-section');
      
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsScrolled(heroBottom <= 0);
        setIsOverVideo(heroBottom > 0);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesMenuOpen(false);
    setIsOverVideo(true); // Start with white logo on page change
    setIsScrolled(false); // Reset scroll state on page change
    
    // Force recalculation after page load
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 100);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 h-32 ${
        isScrolled 
          ? 'bg-white shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center h-full">
        <Logo isOverVideo={isOverVideo} isScrolled={isScrolled} />
        <div className="flex items-center justify-between flex-1 ml-8">
          <NavbarDesktop isOverVideo={isOverVideo} isScrolled={isScrolled} />
          <MobileMenuButton isOverVideo={isOverVideo && !isScrolled} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
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
