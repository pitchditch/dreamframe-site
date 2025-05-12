
import { ReactNode, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface ServiceHeaderProps {
  title: ReactNode;
  description: string;
  icon?: ReactNode;
  imagePath?: string;
  videoUrl?: string;
  darkOverlay?: boolean;
  showButton?: boolean;
  buttonPosition?: 'center' | 'bottom';
  youtubeId?: string; // For mobile YouTube embedding
  youtubeDesktopId?: string; // For desktop YouTube embedding
}

const ServiceHeader = ({
  title,
  description,
  icon,
  imagePath,
  videoUrl,
  darkOverlay = false,
  showButton = true,
  buttonPosition = 'center',
  youtubeId,
  youtubeDesktopId
}: ServiceHeaderProps) => {
  const isMobile = useIsMobile();
  
  // Use useEffect to add and remove the has-video-header class
  useEffect(() => {
    if (videoUrl || youtubeId || youtubeDesktopId) {
      document.body.classList.add('has-video-header');
      return () => {
        document.body.classList.remove('has-video-header');
      };
    }
  }, [videoUrl, youtubeId, youtubeDesktopId]);

  // Adjust title text size based on mobile view
  const titleClasses = isMobile
    ? "text-3xl md:text-5xl font-bold mb-4 text-white pt-16 text-shadow-lg" // Reduced padding top for mobile
    : "text-4xl md:text-5xl font-bold mb-6 text-white text-shadow-lg"; // Enhanced text shadow for better readability

  // Determine YouTube ID based on the device and provided IDs
  const getYouTubeIdForService = () => {
    // If desktop ID is provided and we're on desktop, use that
    if (!isMobile && youtubeDesktopId) {
      return youtubeDesktopId;
    }
    
    // For mobile or if no desktop ID provided
    if (youtubeId) return youtubeId;
    
    // Special cases for specific services when no ID provided
    if (!youtubeId && !youtubeDesktopId && isMobile && title) {
      const titleStr = typeof title === 'string' ? title.toLowerCase() : '';
      
      if (titleStr.includes('pressure washing') || titleStr.includes('house washing')) {
        return 'HuXyYAxC4Fs'; // Updated Pressure Washing
      } else if (titleStr.includes('gutter')) {
        return 'EdMlx1sYJDc'; // Updated Gutter Guards
      } else if (titleStr.includes('roof')) {
        return 'twtzf2gRdFU'; // Updated Roof Cleaning
      }
    }
    
    return null;
  };
  
  const effectiveYoutubeId = getYouTubeIdForService();

  return (
    <div className="relative w-full h-screen">
      {effectiveYoutubeId ? (
        <>
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${effectiveYoutubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${effectiveYoutubeId}&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer`}
              title="Service Video"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ 
                border: 0, 
                transform: isMobile ? 'scale(1.4)' : 'scale(1.5)', // Reduced scale for mobile to prevent too much zoom
              }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="absolute inset-0 bg-black bg-opacity-60"></div> {/* Increased opacity for better text contrast */}
          </div>
          <div className="absolute inset-0 flex items-center justify-center pt-16">
            <div className="text-center p-4 max-w-xl mx-auto z-10">
              {icon && title && <div className="inline-block text-bc-red mb-2">{icon}</div>}
              {title && <h1 className={titleClasses}>{title}</h1>}
              {description && <p className="text-lg md:text-xl text-white text-shadow-sm">{description}</p>}
              {showButton && buttonPosition === 'center' && (
                <div className="mt-8">
                  <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold">
                    <Link to="/calculator">Check Prices & Availability</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
          {showButton && buttonPosition === 'bottom' && (
            <div className="absolute bottom-10 w-full flex justify-center z-10">
              <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold px-8 py-6 shadow-lg">
                <Link to="/calculator">Check Prices & Availability</Link>
              </Button>
            </div>
          )}
        </>
      ) : videoUrl ? (
        <>
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="text-center p-4 max-w-xl mx-auto z-10">
              {icon && title && <div className="inline-block text-bc-red mb-2">{icon}</div>}
              {title && <h1 className={titleClasses}>{title}</h1>}
              {description && <p className="text-lg md:text-xl text-white text-shadow-sm">{description}</p>}
              {showButton && buttonPosition === 'center' && (
                <div className="mt-8">
                  <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold">
                    <Link to="/calculator">Check Prices & Availability</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
          {showButton && buttonPosition === 'bottom' && (
            <div className="absolute bottom-10 w-full flex justify-center z-10">
              <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold px-8 py-6 shadow-lg">
                <Link to="/calculator">Check Prices & Availability</Link>
              </Button>
            </div>
          )}
        </>
      ) : (
        <>
          <img 
            src={imagePath}
            alt={typeof title === 'string' ? title : 'Service header image'}
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {darkOverlay && (
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60" />
          )}
          
          <div className="relative h-full w-full flex items-center justify-center flex-col pb-20 z-10">
            <div className="text-center max-w-4xl px-4">
              {icon && title && <div className="inline-block text-bc-red mb-4">{icon}</div>}
              {title && <h1 className={titleClasses}>{title}</h1>}
              {description && <p className="text-lg md:text-xl text-white text-shadow-sm mb-8">{description}</p>}
              {showButton && buttonPosition === 'center' && (
                <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold">
                  <Link to="/calculator">Check Prices & Availability</Link>
                </Button>
              )}
            </div>
          </div>
          
          {showButton && buttonPosition === 'bottom' && (
            <div className="absolute bottom-10 w-full flex justify-center z-10">
              <Button asChild variant="bc-red" size="lg" className="text-lg font-semibold px-8 py-6 shadow-lg">
                <Link to="/calculator">Check Prices & Availability</Link>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ServiceHeader;
