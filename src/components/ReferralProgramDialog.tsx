
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogClose
} from './ui/dialog';
import { Button } from './ui/button';
import { Share2, MessageSquare, Phone, UserCheck } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface ReferralProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReferralProgramDialog = ({ open, onOpenChange }: ReferralProgramDialogProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'referral' | 'guarantee'>('referral');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-3xl p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Tabs */}
          <div className="bg-slate-100 p-4 md:w-1/4">
            <div 
              className={`p-3 rounded-md cursor-pointer mb-2 flex items-center gap-2 ${activeTab === 'referral' ? 'bg-white shadow-md' : 'hover:bg-white/50'}`}
              onClick={() => setActiveTab('referral')}
            >
              <Share2 size={18} className="text-bc-red" />
              <span>{t("Referral Program")}</span>
            </div>
            <div 
              className={`p-3 rounded-md cursor-pointer flex items-center gap-2 ${activeTab === 'guarantee' ? 'bg-white shadow-md' : 'hover:bg-white/50'}`}
              onClick={() => setActiveTab('guarantee')}
            >
              <UserCheck size={18} className="text-bc-red" />
              <span>{t("Our Guarantee")}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:w-3/4">
            <DialogClose className="absolute right-4 top-4" />
            
            {activeTab === 'referral' && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-bc-red">
                    {t("Refer a Friend & Save 50%")}
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    {t("Get your windows cleaned at 50% off when you recommend a friend!")}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6 space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <img 
                        src="/lovable-uploads/cd976364-60c1-46ed-a80e-c660a4d1d652.png" 
                        alt="Referral program" 
                        className="rounded-lg shadow-md w-full h-auto"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="text-lg font-semibold mb-2">{t("How It Works:")}</h3>
                      <ol className="list-decimal ml-5 space-y-2">
                        <li>{t("Recommend our services to a friend, family member, or neighbor")}</li>
                        <li>{t("When they book a service, have them mention your name")}</li>
                        <li>{t("Receive 50% off your next window cleaning service")}</li>
                        <li>{t("Your friend gets the highest quality service in the area")}</li>
                      </ol>
                      
                      <div className="mt-6 flex flex-col gap-3">
                        <Button className="flex items-center gap-2">
                          <Phone size={16} />
                          {t("Call to Refer a Friend")}
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <MessageSquare size={16} />
                          {t("Contact Us About a Referral")}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      {t("*Terms and conditions apply. Offer valid for existing customers only. The 50% discount applies to window cleaning services only and cannot be combined with other offers. Your friend must complete their first service before the discount can be applied to your next service.")}
                    </p>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'guarantee' && (
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
                        src="/lovable-uploads/5c38ab2e-3c2b-4fd1-9c94-b4715ce79479.png" 
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
                      src="/lovable-uploads/b7450abb-2473-4cb5-84d4-c23e63957f5f.png" 
                      alt="Our team" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">Mike & Brandon</h4>
                      <p className="text-sm text-gray-600">
                        {t("\"We personally guarantee your satisfaction with every service we provide.\"")}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralProgramDialog;
