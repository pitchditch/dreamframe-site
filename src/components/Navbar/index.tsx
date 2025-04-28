
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

  // Pages with dark backgrounds that need white text
  const darkOverlayPages = [
    '/', 
    '/why-us', 
    '/services/gutter-cleaning', 
    '/services/roof-cleaning',
    '/services/window-cleaning',
    '/services/pressure-washing',
    '/services/post-construction-window-cleaning'
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Check if we're past the hero section
      const founderSection = document.querySelector('.founder-section');
      const heroSection = document.querySelector('.hero-section');
      
      if (founderSection && location.pathname === '/') {
        // For homepage, change at founder section
        const founderTop = founderSection.getBoundingClientRect().top;
        setIsScrolled(founderTop <= 0);
        setIsOverVideo(founderTop > 0);
      } else if (heroSection) {
        // For other pages, change after hero section
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
    const isOnDarkPage = darkOverlayPages.includes(location.pathname);
    setIsOverVideo(isOnDarkPage);
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
        <Logo isOverVideo={isOverVideo && !isScrolled} />
        <div className="flex items-center justify-between flex-1 ml-8">
          <NavbarDesktop isOverVideo={isOverVideo && !isScrolled} isScrolled={isScrolled} />
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
