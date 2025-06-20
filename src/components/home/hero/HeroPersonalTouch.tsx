
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroPersonalTouch = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`flex flex-col sm:flex-row items-start justify-start gap-4 ${isMobile ? 'my-6 mb-8' : 'my-8 mb-12'} animate-on-scroll delay-700 ${isMobile ? 'max-w-full' : ''}`}>
      <div className={`bg-black/40 backdrop-blur-sm ${isMobile ? 'p-5 rounded-xl max-w-full' : 'p-4 md:p-5 lg:p-7 rounded-xl max-w-lg'} border border-white/30 shadow-lg w-full sm:w-auto flex flex-row items-center`}>
        <img 
          src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
          alt="Jayden Fisher - Owner" 
          className={`${isMobile ? 'w-16 h-16' : 'w-14 h-14 md:w-18 md:h-18 lg:w-22 lg:h-22'} rounded-full border-2 border-white shadow-md mr-4 md:mr-5 flex-shrink-0`}
        />
        <div className="text-left">
          <p className={`font-bold text-white ${isMobile ? 'text-base leading-tight' : 'text-sm sm:text-base md:text-lg lg:text-xl'} drop-shadow-md leading-tight`} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            {t("Every Job is Personally Checked by Me.")}
          </p>
          <p className={`text-white font-medium ${isMobile ? 'text-sm mt-1' : 'text-sm md:text-base mt-1'}`} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            — Jayden Fisher, {t("Owner")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroPersonalTouch;
