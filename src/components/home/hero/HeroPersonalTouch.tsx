
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroPersonalTouch = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`flex flex-col sm:flex-row items-start justify-start gap-4 ${isMobile ? 'my-6 mb-8' : 'my-8 mb-12'} animate-on-scroll delay-700 ${isMobile ? 'max-w-full' : ''}`}>
      <div className={`bg-black/50 backdrop-blur-sm ${isMobile ? 'p-4 rounded-lg max-w-full' : 'p-5 md:p-6 lg:p-7 rounded-lg max-w-2xl'} border border-white/30 shadow-lg w-full sm:w-auto flex flex-row items-center`}>
        <img 
          src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
          alt="Jayden Fisher - Owner" 
          className={`${isMobile ? 'w-16 h-16' : 'w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28'} rounded-full border-2 border-white shadow-md mr-4 md:mr-5 flex-shrink-0`}
        />
        <div className="text-left">
          <p className={`font-bold text-white ${isMobile ? 'text-base leading-tight' : 'text-lg md:text-xl lg:text-2xl'} drop-shadow-md leading-tight`} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            {t("Every Job is Personally Checked by Me.")}
          </p>
          <p className={`text-white font-medium ${isMobile ? 'text-sm mt-1' : 'text-base md:text-lg mt-2'}`} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            — Jayden Fisher, {t("Owner")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroPersonalTouch;
