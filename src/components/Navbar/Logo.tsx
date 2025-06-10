
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  isOverVideo: boolean;
}

export const Logo = ({ isOverVideo }: LogoProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  useEffect(() => {
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

  return (
    <Link to="/" className="flex items-center mr-auto">
      <div className="logo-container relative flex items-center perspective-1000 py-2 md:py-4">
        {isOverVideo ? (
          // White logo for hero section with transparent background
          <img
            src="/lovable-uploads/1382a332-34e7-4830-bc43-d3dd1045dab9.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className={`h-16 md:h-32 w-auto object-contain max-w-[280px] md:max-w-[420px] hover:scale-105 duration-300 ${isSpinning ? 'animate-spin-coin' : ''}`}
            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))' }}
          />
        ) : (
          // Black/red logo for scrolled state with white background
          <img
            src="/lovable-uploads/61d60d2a-3ff0-4399-8e84-4ab645a84a24.png"
            alt="BC Pressure Washing Property Maintenance logo"
            className={`h-16 md:h-32 w-auto object-contain max-w-[280px] md:max-w-[420px] hover:scale-105 duration-300 ${isSpinning ? 'animate-spin-coin' : ''}`}
          />
        )}
      </div>
    </Link>
  );
};

export default Logo;
