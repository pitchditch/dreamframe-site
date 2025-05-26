
import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import ReferralProgramDialog from './ReferralProgramDialog';
import { useTranslation } from '@/hooks/use-translation';

const ReferralButton: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="fixed bottom-6 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-30 flex items-center gap-2 font-bold text-sm border-2 border-yellow-600"
        aria-label={t('Refer and Save Program')}
      >
        <Gift size={20} className="animate-bounce" />
        <span className="hidden sm:inline">{t('Refer & Save')}</span>
        <span className="sm:hidden">{t('Save')}</span>
      </button>

      <ReferralProgramDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </>
  );
};

export default ReferralButton;
