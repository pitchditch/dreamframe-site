
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import PriceCalculatorForm from './PriceCalculator/PriceCalculatorForm';
import { useTranslation } from '@/hooks/use-translation';

interface PriceCalculatorOverlayProps {
  buttonText?: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "bc-red";
}

const PriceCalculatorOverlay = ({ 
  buttonText, 
  className,
  variant = "default" 
}: PriceCalculatorOverlayProps) => {
  const { t } = useTranslation();
  const displayText = buttonText || t('Check Price & Availability');

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={variant} className={className || "bg-bc-red hover:bg-red-700 text-white py-3 px-6 text-lg font-medium rounded-lg shadow-md transform hover:translate-y-[-2px] transition-all duration-300"}>
          {displayText}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md md:max-w-xl lg:max-w-2xl border border-transparent bg-background/95 backdrop-blur-sm">
        <div className="pt-6 pb-16 overflow-y-auto max-h-[90vh]">
          <PriceCalculatorForm />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PriceCalculatorOverlay;
