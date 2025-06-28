
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroPersonalTouch = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`flex flex-col sm:flex-row items-start justify-start gap-4 ${isMobile ? 'my-8 mb-10' : 'my-12 mb-16'} animate-on-scroll delay-700 ${isMobile ? 'max-w-full' : ''}`}>
      <div className={`bg-black/50 backdrop-blur-sm ${isMobile ? 'p-5 rounded-lg max-w-full' : 'p-6 md:p-7 lg:p-8 rounded-lg max-w-2xl'} border border-white/30 shadow-lg w-full sm:w-auto flex flex-row items-center`}>
        <img 
          src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
          alt="Jayden Fisher - Owner" 
          className={`${isMobile ? 'w-20 h-20' : 'w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36'} rounded-full border-2 border-white shadow-md mr-5 md:mr-6 flex-shrink-0`}
        />
        <div className="text-left">
          <p className={`font-bold text-white ${isMobile ? 'text-lg leading-tight' : 'text-xl md:text-2xl lg:text-3xl'} drop-shadow-md leading-tight`} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            {t("Every Job is Personally Checked by Me.")}
          </p>
          <p className={`text-white font-medium ${isMobile ? 'text-base mt-2' : 'text-lg md:text-xl mt-3'}`} style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            — Jayden Fisher, {t("Owner")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroPersonalTouch;
