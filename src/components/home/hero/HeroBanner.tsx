
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroBanner = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className={`inline-block bg-bc-red px-3 py-1.5 rounded-lg ${isMobile ? 'mb-2 mt-2' : 'mb-2 mt-2'} animate-on-scroll shadow-lg`}>
      <span className="text-white font-bold text-base sm:text-lg md:text-lg lg:text-xl leading-tight">
        {t("Tired of Dirty Siding & Grimy Driveways?")}
      </span>
    </div>
  );
};

export default HeroBanner;
