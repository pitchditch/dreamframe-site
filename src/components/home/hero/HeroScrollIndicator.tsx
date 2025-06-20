
import { useTranslation } from '@/hooks/use-translation';

interface HeroScrollIndicatorProps {
  videoLoaded: boolean;
  isLoading: boolean;
}

const HeroScrollIndicator = ({ videoLoaded, isLoading }: HeroScrollIndicatorProps) => {
  const { t } = useTranslation();

  return (
    <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-20 ${videoLoaded && !isLoading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
      <span className="text-white text-sm mb-2 bg-black/50 px-4 py-2 rounded-full font-medium shadow-lg backdrop-blur-sm border border-white/20" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
        {t("Scroll Up")}
      </span>
      <div className="h-10 w-6 border-2 border-white rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm shadow-lg">
        <div className="h-2 w-1 bg-white rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default HeroScrollIndicator;
