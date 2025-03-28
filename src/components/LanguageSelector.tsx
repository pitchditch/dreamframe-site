
import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSelector = () => {
  const { language, setLanguage, t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 text-sm md:text-base px-2 md:px-3 py-1 md:py-2"
        >
          <Globe className="h-4 w-4 mr-1 md:mr-2" />
          <span>
            {language === 'en' ? 'English' : 
             language === 'pa' ? 'ਪੰਜਾਬੀ' : 
             'हिंदी'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('pa')}>
          ਪੰਜਾਬੀ (Punjabi)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('hi')}>
          हिंदी (Hindi)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
