
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const location = useLocation();
  
  // Determine if we're on the home page with hero section
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  useEffect(() => {
    // Preload both logo images immediately and aggressively
    const preloadImages = async () => {
      const whiteLogoImg = new Image();
      const blackLogoImg = new Image();
      
      const whiteLogoLoaded = new Promise((resolve) => {
        whiteLogoImg.onload = resolve;
        whiteLogoImg.onerror = resolve; // resolve even on error to avoid blocking
      });
      
      const blackLogoLoaded = new Promise((resolve) => {
        blackLogoImg.onload = resolve;
        blackLogoImg.onerror = resolve; // resolve even on error to avoid blocking
      });
      
      // Set high priority and start loading immediately
      whiteLogoImg.loading = 'eager';
      blackLogoImg.loading = 'eager';
      whiteLogoImg.src = "/lovable-uploads/3161ca6e-9a0c-4915-87c6-e21f8d3282e4.png";
      blackLogoImg.src = "/lovable-uploads/1b56d472-a76b-4691-b0ef-4513152966ae.png";
      
      // Wait for both images to load
      await Promise.all([whiteLogoLoaded, blackLogoLoaded]);
      setImagesPreloaded(true);
    };
    
    preloadImages();

    // Track user activity
    const handleActivity = () => {
      setIsSpinning(false);
      setLastActivity(Date.now());
    };

    // Add event listeners for user activity
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    // Check for inactivity every second
    const intervalId = setInterval(() => {
      const inactiveTime = Date.now() - lastActivity;
      if (inactiveTime > 30000) { // 30 seconds
        setIsSpinning(true);
      }
    }, 1000);

    return () => {
      // Clean up event listeners
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      clearInterval(intervalId);
    };
  }, [lastActivity]);

  // Determine which logo to show - white logo in hero sections, black logo everywhere else
  const shouldShowWhiteLogo = isOverVideo;

  return (
    <Link to="/" className="flex items-center mr-auto">
      <div className="logo-container relative flex items-center perspective-1000 py-2 md:py-4">
        {shouldShowWhiteLogo ? (
          // White logo for hero section - same size as black logo
          <img
            src="/lovable-uploads/3161ca6e-9a0c-4915-87c6-e21f8d3282e4.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className={`h-16 md:h-20 w-auto object-contain max-w-[180px] md:max-w-[225px] hover:scale-105 duration-300 ${isSpinning ? 'animate-spin-coin' : ''}`}
            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}
            loading="eager"
            fetchPriority="high"
          />
        ) : (
          // Black logo for after hero section - same size as white logo
          <img
            src="/lovable-uploads/1b56d472-a76b-4691-b0ef-4513152966ae.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className={`h-16 md:h-20 w-auto object-contain max-w-[180px] md:max-w-[225px] hover:scale-105 duration-300 ${isSpinning ? 'animate-spin-coin' : ''}`}
            loading="eager"
            fetchPriority="high"
          />
        )}
      </div>
    </Link>
  );
};

export default Logo;
