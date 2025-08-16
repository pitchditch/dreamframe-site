
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroPersonalTouch = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border">
      <img 
        src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
        alt="Jayden Fisher - Owner" 
        className="w-10 h-10 rounded-full flex-shrink-0"
      />
      <div className="text-left">
        <p className="font-semibold text-gray-900 text-sm leading-tight">
          {t("Every Job is Personally Checked by Me.")} ✓
        </p>
        <p className="text-gray-600 text-xs">
          — Jayden Fisher, {t("Owner")}
        </p>
      </div>
    </div>
  );
};

export default HeroPersonalTouch;
