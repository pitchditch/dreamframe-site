
import { useIsMobile } from '@/hooks/use-mobile';

interface HeroBackgroundProps {
  videoLoaded: boolean;
  isLoading: boolean;
}

const HeroBackground = ({ videoLoaded, isLoading }: HeroBackgroundProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60 z-30 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-medium">Loading...</p>
          </div>
        </div>
      )}

      {/* Background - Different for mobile and desktop */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full overflow-hidden">
          {isMobile ? (
            <img 
              src="/lovable-uploads/e3e4437c-41cc-499d-9568-1c0d05fadbff.png"
              alt="Professional pressure washing service in action"
              className={`absolute w-full h-full object-cover object-bottom transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="eager"
              fetchPriority="high"
              style={{ objectPosition: '50% 100%' }}
            />
          ) : (
            <>
              {/* Poster image for instant loading */}
              <img 
                src="/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png"
                alt="BC Pressure Washing Service"
                className={`absolute w-full h-full object-cover object-center transition-opacity duration-300 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
                loading="eager"
                fetchPriority="high"
              />
              <iframe 
                id="hero-desktop-video"
                className={`absolute w-full h-full top-0 left-0 transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ 
                  transform: window.innerWidth >= 768 && window.innerWidth <= 1024 ? 'scale(1.2)' : 'scale(1.5)',
                  transformOrigin: 'center center'
                }}
                src="https://www.youtube.com/embed/GJZpuELGJpI?autoplay=1&mute=1&controls=0&loop=1&playlist=GJZpuELGJpI&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer&preload=metadata"
                title="Pressure Washing Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="eager"
              ></iframe>
            </>
          )}
        </div>
        <div className={`absolute inset-0 bg-gradient-to-b ${isMobile ? 'from-black/80 via-black/60 to-black/80' : 'from-black/70 via-black/40 to-black/60'}`}></div>
      </div>
    </>
  );
};

export default HeroBackground;
