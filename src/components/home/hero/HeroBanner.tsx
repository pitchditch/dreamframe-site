
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroBanner = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`inline-block bg-bc-red px-10 py-5 rounded-xl ${isMobile ? 'mb-8 mt-12' : 'mb-10 md:mb-12 mt-20 md:mt-24'} animate-on-scroll shadow-lg`}>
      <span className="text-white font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
        {t("Tired of Dirty Siding & Grimy Driveways?")}
      </span>
    </div>
  );
};

export default HeroBanner;
