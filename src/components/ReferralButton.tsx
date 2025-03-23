
import { useState } from 'react';
import { Gift } from 'lucide-react';
import { Button } from './ui/button';
import ReferralProgramDialog from './ReferralProgramDialog';
import { useTranslation } from '@/hooks/use-translation';

const ReferralButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)} 
        className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-5 py-2 flex items-center gap-2 fixed bottom-24 right-6 z-30 shadow-lg md:right-10"
      >
        <Gift size={20} />
        <span>{t("Special Offers")}</span>
      </Button>

      <ReferralProgramDialog 
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
};

export default ReferralButton;
