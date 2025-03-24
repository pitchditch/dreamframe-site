
import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from './ui/button';

const LanguageSelector = () => {
  const { t } = useTranslation();

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 text-sm md:text-base px-2 md:px-3 py-1 md:py-2"
    >
      <Globe className="h-4 w-4 mr-1 md:mr-2" />
      <span>English</span>
    </Button>
  );
};

export default LanguageSelector;
