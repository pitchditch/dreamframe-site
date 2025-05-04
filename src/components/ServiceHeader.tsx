
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
  youtubeId?: string; // For direct YouTube embedding
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
  youtubeId
}: ServiceHeaderProps) => {
  const isMobile = useIsMobile();
  
  // Use useEffect to add and remove the has-video-header class
  useEffect(() => {
    if (videoUrl || youtubeId) {
      document.body.classList.add('has-video-header');
      return () => {
        document.body.classList.remove('has-video-header');
      };
    }
  }, [videoUrl, youtubeId]);

  // Adjust title text size based on mobile view
  const titleClasses = isMobile
    ? "text-3xl md:text-5xl font-bold mb-4 text-white pt-20" // Added padding top for mobile
    : "text-4xl md:text-5xl font-bold mb-6 text-white text-shadow";

  return (
    <div className="relative w-full h-screen">
      {youtubeId ? (
        <>
          <div className="absolute inset-0 w-full h-full">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer`}
              title="Service Video"
              className="absolute inset-0 w-full h-full object-cover"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-4 max-w-xl mx-auto z-10">
              {icon && title && <div className="inline-block text-bc-red mb-2">{icon}</div>}
              {title && <h1 className={titleClasses}>{title}</h1>}
              {description && <p className="text-lg md:text-xl text-gray-200">{description}</p>}
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
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center p-4 max-w-xl mx-auto z-10">
              {icon && title && <div className="inline-block text-bc-red mb-2">{icon}</div>}
              {title && <h1 className={titleClasses}>{title}</h1>}
              {description && <p className="text-lg md:text-xl text-gray-200">{description}</p>}
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
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
