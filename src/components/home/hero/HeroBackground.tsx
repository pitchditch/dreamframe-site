
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

      {/* Background - Positioned to show bottom corners */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full overflow-hidden">
          <img 
            src="/lovable-uploads/3774dac7-a537-41d3-b86b-eee5ae6dfd89.png"
            alt="Beautiful house with red BC Pressure Washing car in suburban neighborhood"
            className={`absolute w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="eager"
            fetchPriority="high"
            style={{ 
              objectPosition: isMobile ? '50% 10%' : '50% 15%'
            }}
          />
        </div>
        <div className={`absolute inset-0 bg-gradient-to-b ${isMobile ? 'from-black/80 via-black/60 to-black/80' : 'from-black/70 via-black/40 to-black/60'}`}></div>
      </div>
    </>
  );
};

export default HeroBackground;
