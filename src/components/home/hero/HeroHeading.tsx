
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroHeading = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'mb-8' : 'mb-10 md:mb-12'}`}>
      {/* Main heading */}
      <h1 className={`${isMobile ? 'text-3xl leading-tight' : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'} font-bold ${isMobile ? 'mb-6' : 'mb-8 md:mb-10'} animate-on-scroll leading-tight`}>
        <span className="text-white">
          {isMobile ? (
            <>
              {t("Make Your Home")} <span className="text-bc-red drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 0 0 2px rgba(255,255,255,0.1)' }}>{t("Shine Instantly")}</span>
            </>
          ) : (
            <>
              {t("Make Your Home")} <span className="text-bc-red drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 0 0 2px rgba(255,255,255,0.1)' }}>{t("Shine Instantly")}</span>
            </>
          )}
        </span>
      </h1>
      
      {/* Subtitle */}
      <p className={`${isMobile ? 'text-lg leading-relaxed mb-6' : 'text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 md:mb-10'} animate-on-scroll delay-100 max-w-4xl font-medium text-white drop-shadow-md`} style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
        {isMobile 
          ? t("Fast, friendly pressure washing for homes & businesses in White Rock, Surrey & Metro Vancouver. We'll blast away dirt, mold & grime!")
          : t("Fast, fully insured service backed by a satisfaction guarantee. We'll make your property sparkle!")
        }
      </p>
    </div>
  );
};

export default HeroHeading;
