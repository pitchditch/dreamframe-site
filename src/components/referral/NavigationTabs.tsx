
import { Share2, UserCheck } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface NavigationTabsProps {
  activeTab: 'referral' | 'guarantee';
  setActiveTab: (tab: 'referral' | 'guarantee') => void;
}

const NavigationTabs = ({ activeTab, setActiveTab }: NavigationTabsProps) => {
  const { t } = useTranslation();

  return (
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
  );
};

export default NavigationTabs;
