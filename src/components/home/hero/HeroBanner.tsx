
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroBanner = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`inline-block bg-bc-red px-8 py-4 rounded-xl ${isMobile ? 'mb-6 mt-20' : 'mb-8 md:mb-10 mt-36 md:mt-40'} animate-on-scroll shadow-lg`}>
      <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
        {t("Tired of Dirty Siding & Grimy Driveways?")}
      </span>
    </div>
  );
};

export default HeroBanner;
