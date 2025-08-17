
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

      {/* Background - Full screen video covering entire viewport */}
      <div className="fixed inset-0 w-full h-full z-0">
        <div className="relative w-full h-full overflow-hidden">
          {isMobile ? (
            <img 
              src="/lovable-uploads/677394c3-fa6d-4696-9a7e-9e6de1bedfec.png"
              alt="BC Pressure Washing Service with quote form"
              className={`absolute w-full h-full object-cover object-center transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="eager"
              fetchPriority="high"
              style={{ objectPosition: '50% 50%' }}
            />
          ) : (
            <>
              {/* Poster image for instant loading */}
              <img 
                src="/lovable-uploads/677394c3-fa6d-4696-9a7e-9e6de1bedfec.png"
                alt="BC Pressure Washing Service with quote form"
                className={`absolute w-full h-full object-cover object-center transition-opacity duration-300 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
                loading="eager"
                fetchPriority="high"
              />
              <div 
                className={`absolute inset-0 transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
              >
                <div 
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: '120vw',
                    height: '67.5vw',
                    minWidth: '213.33vh',
                    minHeight: '140vh',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <iframe 
                    id="hero-video"
                    className="w-full h-full"
                    style={{ pointerEvents: 'none' }}
                    src="https://www.youtube.com/embed/GJZpuELGJpI?autoplay=1&mute=1&controls=0&loop=1&playlist=GJZpuELGJpI&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&fs=0&disablekb=1&enablejsapi=1&preload=metadata"
                    title="Pressure Washing Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    loading="eager"
                  ></iframe>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HeroBackground;
