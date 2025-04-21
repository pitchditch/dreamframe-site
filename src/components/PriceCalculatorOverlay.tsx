
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import PriceCalculatorForm from './PriceCalculator/PriceCalculatorForm';
import { Gift, Phone } from 'lucide-react';

interface PriceCalculatorOverlayProps {
  buttonText?: string;
  variant?: 'default' | 'outline' | 'bc-red';
  className?: string;
  icon?: boolean;
  onComplete?: () => void;
  showCallJaydenNow?: boolean;
}

const PriceCalculatorOverlay = ({ 
  buttonText = "Check Price & Availability", 
  variant = 'default',
  className = "",
  icon = false,
  onComplete,
  showCallJaydenNow = false,
}: PriceCalculatorOverlayProps) => {
  const [open, setOpen] = useState(false);
  
  const handleComplete = () => {
    setOpen(false);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col">
          {variant === 'bc-red' ? (
            <Button className={`bg-bc-red hover:bg-red-700 text-white special-offers-button ${className}`}>
              {icon && <Gift className="mr-2 h-4 w-4" />}
              {buttonText}
            </Button>
          ) : variant === 'outline' ? (
            <Button variant="outline" className={`special-offers-button ${className}`}>
              {icon && <Gift className="mr-2 h-4 w-4" />}
              {buttonText}
            </Button>
          ) : (
            <Button className={`special-offers-button ${className}`}>
              {icon && <Gift className="mr-2 h-4 w-4" />}
              {buttonText}
            </Button>
          )}
          {showCallJaydenNow && (
            <a
              href="tel:7788087620"
              className="mt-2 flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white text-base font-semibold rounded-lg px-5 py-2 shadow w-full transition-all"
              style={{ minHeight: '44px' }}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Jayden Now
            </a>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 bg-gray-50 border-b">
          <DialogTitle className="text-2xl font-bold text-center">Get Your Free Quote</DialogTitle>
          <DialogDescription className="text-center">
            Complete this quick form to receive an instant estimate for your service.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
          <PriceCalculatorForm onComplete={handleComplete} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceCalculatorOverlay;
