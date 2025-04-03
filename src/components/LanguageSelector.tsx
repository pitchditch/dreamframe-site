
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
          {language === 'en' ? (
            <span className="flex items-center gap-1">
              <img src="https://flagcdn.com/w20/ca.png" width="20" alt="Canadian flag" className="h-4" />
              <span>English</span>
            </span>
          ) : language === 'pa' ? (
            <span className="flex items-center gap-1">
              <img src="https://flagcdn.com/w20/in.png" width="20" alt="Indian flag" className="h-4" />
              <span>ਪੰਜਾਬੀ</span>
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <img src="https://flagcdn.com/w20/in.png" width="20" alt="Indian flag" className="h-4" />
              <span>हिंदी</span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem onClick={() => setLanguage('en')} className="flex items-center gap-2">
          <img src="https://flagcdn.com/w20/ca.png" width="20" alt="Canadian flag" className="h-4" />
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('pa')} className="flex items-center gap-2">
          <img src="https://flagcdn.com/w20/in.png" width="20" alt="Indian flag" className="h-4" />
          ਪੰਜਾਬੀ (Punjabi)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('hi')} className="flex items-center gap-2">
          <img src="https://flagcdn.com/w20/in.png" width="20" alt="Indian flag" className="h-4" />
          हिंदी (Hindi)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
