
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroPersonalTouch = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`flex flex-col sm:flex-row items-start justify-start gap-4 ${isMobile ? 'my-3 mb-4' : 'my-2 mb-4'} animate-on-scroll delay-700 ${isMobile ? 'max-w-full' : ''}`}>
      <div className={`bg-black/60 backdrop-blur-sm ${isMobile ? 'p-4 rounded-lg max-w-full' : 'p-4 md:p-5 rounded-lg max-w-2xl'} border border-white/40 shadow-2xl w-full sm:w-auto flex flex-row items-center`}>
        <img 
          src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
          alt="Jayden Fisher - Owner" 
          className={`${isMobile ? 'w-12 h-12' : 'w-12 h-12 md:w-14 md:h-14'} rounded-full border-3 border-white shadow-lg mr-4 flex-shrink-0`}
        />
        <div className="text-left">
          <p className={`font-bold text-white ${isMobile ? 'text-sm leading-tight' : 'text-sm md:text-base lg:text-base'} drop-shadow-lg leading-tight mb-1`} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            {t("Every Job is Personally Checked by Me.")}
          </p>
          <p className={`text-white font-medium ${isMobile ? 'text-xs mt-1' : 'text-xs md:text-sm mt-1'}`} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            — Jayden Fisher, {t("Owner")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroPersonalTouch;
