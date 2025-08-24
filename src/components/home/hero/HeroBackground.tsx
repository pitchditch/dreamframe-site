import { useIsMobile } from '@/hooks/use-mobile';

interface HeroBackgroundProps {
  videoLoaded: boolean;
  isLoading: boolean;
}

const HeroBackground = ({ videoLoaded, isLoading }: HeroBackgroundProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 bg-black z-30 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-medium">Loading...</p>
          </div>
        </div>
      )}

      {/* Background Video/Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {isMobile ? (
          <img 
            src="/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png"
            alt="BC Pressure Washing Service"
            className="w-full h-full object-cover"
            loading="eager"
          />
        ) : (
          <>
            {/* Fallback image */}
            <img 
              src="/lovable-uploads/e57e6764-cc42-4943-8a89-4d56f9c96469.png"
              alt="BC Pressure Washing Service"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
              loading="eager"
            />
            {/* YouTube Video */}
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <iframe 
                className="absolute inset-0 w-full h-full object-cover"
                style={{ 
                  width: '300vh',  
                  height: '169vw',
                  minHeight: '100vh',
                  minWidth: '100vw',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none'
                }}
                src="https://www.youtube.com/embed/GJZpuELGJpI?autoplay=1&mute=1&controls=0&loop=1&playlist=GJZpuELGJpI&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&title=0&byline=0&portrait=0"
                title=""
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </>
        )}
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
    </div>
  );
};

export default HeroBackground;