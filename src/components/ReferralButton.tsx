
import React from 'react';
import { Button } from './ui/button';
import { Gift } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import ReferralProgramDialog from './ReferralProgramDialog';
import { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';

const ReferralButton: React.FC = () => {
  const isMobile = useIsMobile();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { t } = useTranslation();
  
  return (
    <>
      <div className="fixed bottom-32 right-4 z-[900] flex flex-col items-end gap-2">
        <Button
          onClick={() => setDialogOpen(true)}
          variant="secondary"
          size={isMobile ? "sm" : "lg"}
          className="rounded-full shadow-lg bg-white border-2 border-bc-red text-bc-red hover:bg-gray-50 animate-pulse"
        >
          <Gift className="mr-2" size={isMobile ? 16 : 20} />
          <span className={isMobile ? "text-xs" : "text-sm"}>{t("Refer & Save 50%")}</span>
        </Button>
      </div>
      
      <ReferralProgramDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
};

export default ReferralButton;
