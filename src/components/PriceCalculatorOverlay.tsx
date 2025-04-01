
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import PriceCalculatorForm from './PriceCalculator/PriceCalculatorForm';
import { Gift } from 'lucide-react';

interface PriceCalculatorOverlayProps {
  buttonText?: string;
  variant?: 'default' | 'bc-red';
  className?: string;
  icon?: boolean;
}

const PriceCalculatorOverlay = ({ 
  buttonText = "Check Price & Availability", 
  variant = 'default',
  className = "",
  icon = false
}: PriceCalculatorOverlayProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {variant === 'bc-red' ? (
          <Button 
            className={`bg-bc-red hover:bg-red-700 text-white special-offers-button ${className}`}
          >
            {icon && <Gift className="mr-2 h-4 w-4" />}
            {buttonText}
          </Button>
        ) : variant === 'default' ? (
          <Button 
            className={`special-offers-button ${className}`}
          >
            {icon && <Gift className="mr-2 h-4 w-4" />}
            {buttonText}
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className={`special-offers-button ${className}`}
          >
            {icon && <Gift className="mr-2 h-4 w-4" />}
            {buttonText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 bg-gray-50 border-b">
          <DialogTitle className="text-2xl font-bold text-center">Get Your Free Quote</DialogTitle>
          <DialogDescription className="text-center">
            Complete this quick form to receive an instant estimate for your service.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
          <PriceCalculatorForm onComplete={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceCalculatorOverlay;
