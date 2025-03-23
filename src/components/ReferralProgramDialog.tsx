
import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogClose
} from './ui/dialog';
import NavigationTabs from './referral/NavigationTabs';
import ReferralContent from './referral/ReferralContent';
import GuaranteeContent from './referral/GuaranteeContent';

interface ReferralProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReferralProgramDialog = ({ open, onOpenChange }: ReferralProgramDialogProps) => {
  const [activeTab, setActiveTab] = useState<'referral' | 'guarantee'>('referral');

  const referralImages = [
    "/lovable-uploads/7e1a9bdf-7cca-4b17-857e-6acaedd8309c.png",
    "/lovable-uploads/50c2db1c-d293-4826-95da-7b717ef4280d.png",
    "/lovable-uploads/41660181-42c5-445c-83e3-23681140d569.png",
    "/lovable-uploads/45a70e02-ffa7-448e-8f24-49018c195812.png"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-3xl p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Tabs */}
          <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Content */}
          <div className="p-6 md:w-3/4">
            <DialogClose className="absolute right-4 top-4" />
            
            {activeTab === 'referral' && (
              <ReferralContent referralImages={referralImages} />
            )}

            {activeTab === 'guarantee' && (
              <GuaranteeContent />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralProgramDialog;
