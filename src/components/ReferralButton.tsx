
import React from 'react';
import { Button } from './ui/button';
import { Gift, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ReferralProgramDialog from './ReferralProgramDialog';
import { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Link } from 'react-router-dom';

const ReferralButton: React.FC = () => {
  const isMobile = useIsMobile();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { t } = useTranslation();
  
  return (
    <>
      <div className={`fixed ${isMobile ? 'bottom-32 right-2' : 'bottom-40 right-4'} z-[45] flex flex-col items-end gap-2`}>
        <Button
          asChild
          variant="secondary"
          size={isMobile ? "sm" : "lg"}
          className="rounded-full shadow-lg bg-white border-2 border-bc-red text-bc-red hover:bg-gray-50 animate-pulse relative"
        >
          <Link to="/#referral-program">
            <Gift className="mr-2" size={isMobile ? 16 : 20} />
            <span className={isMobile ? "text-xs" : "text-sm"}>{t("Refer & Save 50%")}</span>
          </Link>
        </Button>
      </div>
      
      <ReferralProgramDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
};

export default ReferralButton;
