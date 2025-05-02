
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
  const [isPastHeroSection, setIsPastHeroSection] = useState(false);
  const location = useLocation();

  // Pages with dark backgrounds that need white text
  const darkOverlayPages = [
    '/', 
    '/why-us', 
    '/services/gutter-cleaning', 
    '/services/roof-cleaning',
    '/services/window-cleaning',
    '/services/pressure-washing',
    '/services/post-construction-window-cleaning',
    '/services/commercial-window-cleaning',
    '/services/commercial-pressure-washing',
    '/contact'
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const shouldBeOverVideo = darkOverlayPages.includes(location.pathname) && currentScrollY < 60;
      setIsOverVideo(shouldBeOverVideo);
      setIsScrolled(currentScrollY > 10);
      
      // Check if we're past the hero section
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const heroHeight = heroSection.clientHeight;
        setIsPastHeroSection(currentScrollY > heroHeight - 100); // 100px buffer before reaching the end
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesMenuOpen(false);
    
    // Reset isOverVideo state when route changes
    const isOnDarkPage = darkOverlayPages.includes(location.pathname);
    setIsOverVideo(isOnDarkPage);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      (isScrolled && isPastHeroSection) || !isOverVideo ? 'bg-white/95 backdrop-blur-sm shadow-md h-24' : 'h-28'
    }`}>
      <div className="container mx-auto px-4 flex items-center h-full">
        <Logo isOverVideo={isOverVideo && !isPastHeroSection && !isScrolled} />
        <div className="flex items-center justify-between flex-1 ml-8">
          <NavbarDesktop isOverVideo={isOverVideo && !isPastHeroSection && !isScrolled} />
          <MobileMenuButton isOverVideo={isOverVideo && !isPastHeroSection && !isScrolled} isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
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
