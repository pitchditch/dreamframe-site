
import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30">
          <Globe className="h-4 w-4 mr-2" />
          <span>{t('Select Language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className={language === 'en' ? "bg-slate-100" : ""}
        >
          <span className="mr-2">🇺🇸</span> {t('English')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('pa')}
          className={language === 'pa' ? "bg-slate-100" : ""}
        >
          <span className="mr-2">🇮🇳</span> {t('Punjabi')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
