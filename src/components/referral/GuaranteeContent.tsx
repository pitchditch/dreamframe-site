
import { 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from '../ui/dialog';
import { UserCheck } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const GuaranteeContent = () => {
  const { t } = useTranslation();

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-bc-red">
          {t("Our Personal Guarantee")}
        </DialogTitle>
        <DialogDescription className="text-base">
          {t("We don't consider the job done until you're completely satisfied")}
        </DialogDescription>
      </DialogHeader>

      <div className="mt-6 space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <img 
              src="/lovable-uploads/3093e0ae-f262-4f3d-b079-3050df7ab446.png" 
              alt="Quality inspection" 
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold mb-2">{t("Our Promise To You:")}</h3>
            <p className="mb-4">{t("At BC Pressure Washing, we stand behind our work with a personal guarantee. Before you make any payment, we'll walk through the completed job together to ensure it meets your expectations.")}</p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <UserCheck size={20} className="text-bc-red mt-1 flex-shrink-0" />
                <p>{t("Personal walkthrough inspection with every job")}</p>
              </div>
              <div className="flex items-start gap-2">
                <UserCheck size={20} className="text-bc-red mt-1 flex-shrink-0" />
                <p>{t("No payment required until you're completely satisfied")}</p>
              </div>
              <div className="flex items-start gap-2">
                <UserCheck size={20} className="text-bc-red mt-1 flex-shrink-0" />
                <p>{t("Friendly, professional service with attention to detail")}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-4 flex items-center gap-4">
          <img 
            src="/lovable-uploads/3093e0ae-f262-4f3d-b079-3050df7ab446.png" 
            alt="Jayden Fisher" 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold">Jayden Fisher</h4>
            <p className="text-sm text-gray-600">
              {t("\"We personally guarantee your satisfaction with every service we provide.\"")}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuaranteeContent;
