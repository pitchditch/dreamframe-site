
import React from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';
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
          className="bg-white/90 backdrop-blur-sm border border-gray-300 hover:bg-white text-sm md:text-base px-2 md:px-3 py-1 md:py-2 shadow-md"
        >
          {language === 'en' ? (
            <span className="flex items-center">
              <img src="https://flagcdn.com/w20/ca.png" width="20" alt="Canadian flag" className="h-4" />
              <span className="ml-1 font-medium">English</span>
            </span>
          ) : language === 'fr' ? (
            <span className="flex items-center">
              <img src="https://flagcdn.com/w20/fr.png" width="20" alt="French flag" className="h-4" />
              <span className="ml-1 font-medium">Français</span>
            </span>
          ) : language === 'pa' ? (
            <span className="flex items-center">
              <img src="https://flagcdn.com/w20/in.png" width="20" alt="Indian flag" className="h-4" />
              <span className="ml-1 font-medium">ਪੰਜਾਬੀ</span>
            </span>
          ) : (
            <span className="flex items-center">
              <img src="https://flagcdn.com/w20/in.png" width="20" alt="Indian flag" className="h-4" />
              <span className="ml-1 font-medium">हिंदी</span>
            </span>
          )}
          <Globe className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-white/95 backdrop-blur-sm">
        <DropdownMenuItem onClick={() => setLanguage('en')} className="flex items-center gap-2 cursor-pointer">
          <img src="https://flagcdn.com/w20/ca.png" width="20" alt="Canadian flag" className="h-4" />
          <span>English</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('fr')} className="flex items-center gap-2 cursor-pointer">
          <img src="https://flagcdn.com/w20/fr.png" width="20" alt="French flag" className="h-4" />
          <span>Français (French)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('pa')} className="flex items-center gap-2 cursor-pointer">
          <img src="https://flagcdn.com/w20/in.png" width="20" alt="Indian flag" className="h-4" />
          <span>ਪੰਜਾਬੀ (Punjabi)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('hi')} className="flex items-center gap-2 cursor-pointer">
          <img src="https://flagcdn.com/w20/in.png" width="20" alt="Indian flag" className="h-4" />
          <span>हिंदी (Hindi)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
