
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import PriceCalculatorForm from './PriceCalculator/PriceCalculatorForm';
import PriceCalculatorIntro from './PriceCalculator/PriceCalculatorIntro';
import { useIsMobile } from '@/hooks/use-mobile';

interface Props {
  open?: boolean;
  onClose?: () => void;
  showCalculator?: boolean;
  buttonText?: string;
  className?: string;
  showCallJaydenNow?: boolean;
  children?: React.ReactNode;
}

const PriceCalculatorOverlay: React.FC<Props> = ({ 
  open: externalOpen, 
  onClose: externalOnClose, 
  showCalculator = false,
  buttonText,
  className,
  showCallJaydenNow,
  children
}) => {
  const [open, setOpen] = useState(externalOpen || false);
  const [step, setStep] = useState(showCalculator ? 'calculator' : 'intro');
  const isMobile = useIsMobile();
  
  const handleClose = () => {
    if (externalOnClose) {
      externalOnClose();
    } else {
      setOpen(false);
    }
    // Reset to intro after closing, but with a delay to avoid animation issues
    setTimeout(() => {
      setStep('intro');
    }, 300);
  };
  
  const handleContinue = () => {
    setStep('calculator');
  };
  
  const handleComplete = () => {
    // Add a small delay before closing to let the success toast be visible
    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  
  // If open is controlled externally, use that value
  const isOpen = externalOpen !== undefined ? externalOpen : open;
  
  if (buttonText) {
    return (
      <>
        <button 
          onClick={handleOpen}
          className={`special-offers-button ${className || ''}`}
        >
          {buttonText}
        </button>
        <Dialog open={isOpen} onOpenChange={(isOpen) => {
          if (!isOpen) handleClose();
          else handleOpen();
        }}>
          <DialogContent
            className={`p-0 overflow-hidden max-w-3xl w-[95vw] ${
              step === 'calculator' ? 'max-h-[90vh] overflow-y-auto' : ''
            }`}
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>

            <div className="h-full w-full">
              {step === 'intro' ? (
                <PriceCalculatorIntro onContinue={handleContinue} />
              ) : (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Get Your Free Estimate</h2>
                  <div className="flex flex-col items-center mb-6">
                    <img 
                      src="/lovable-uploads/c5219e28-4a09-4d72-bef9-e96193360fa6.png" 
                      alt="Jayden Fisher - Owner" 
                      className="w-32 h-32 rounded-full object-cover mb-2 border-2 border-bc-red"
                    />
                    <span className="font-semibold text-lg">Jayden Fisher</span>
                    <div className="text-gray-600">Owner & Lead Technician</div>
                  </div>
                  <PriceCalculatorForm onComplete={handleComplete} />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => {
      if (!isOpen) handleClose();
    }}>
      <DialogContent
        className={`p-0 overflow-hidden max-w-3xl w-[95vw] ${
          step === 'calculator' ? 'max-h-[90vh] overflow-y-auto' : ''
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10"
        >
          <X className="h-6 w-6" />
          <span className="sr-only">Close</span>
        </button>

        <div className="h-full w-full">
          {step === 'intro' ? (
            <PriceCalculatorIntro onContinue={handleContinue} />
          ) : (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Get Your Free Estimate</h2>
              <div className="flex flex-col items-center mb-6">
                <img 
                  src="/lovable-uploads/c5219e28-4a09-4d72-bef9-e96193360fa6.png" 
                  alt="Jayden Fisher - Owner" 
                  className="w-32 h-32 rounded-full object-cover mb-2 border-2 border-bc-red"
                />
                <span className="font-semibold text-lg">Jayden Fisher</span>
                <div className="text-gray-600">Owner & Lead Technician</div>
              </div>
              <PriceCalculatorForm onComplete={handleComplete} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PriceCalculatorOverlay;
