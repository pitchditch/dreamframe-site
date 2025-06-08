
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface PromotionalBannerProps {
  offer?: string;
  endDate?: Date;
  onClose?: () => void;
}

const PromotionalBanner = ({ 
  offer = "🎉 Limited Time Offer: 20% OFF All Services!", 
  endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  onClose 
}: PromotionalBannerProps) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-bc-red to-red-600 text-white py-3 px-4 relative">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <span className="font-bold text-lg">{offer}</span>
          <div className="flex items-center gap-4">
            <span className="text-sm">Ends in:</span>
            <div className="flex gap-2">
              <div className="bg-white/20 px-2 py-1 rounded text-sm font-mono">
                <span className="font-bold">{timeLeft.days.toString().padStart(2, '0')}</span>
                <span className="text-xs ml-1">D</span>
              </div>
              <div className="bg-white/20 px-2 py-1 rounded text-sm font-mono">
                <span className="font-bold">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-xs ml-1">H</span>
              </div>
              <div className="bg-white/20 px-2 py-1 rounded text-sm font-mono">
                <span className="font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-xs ml-1">M</span>
              </div>
              <div className="bg-white/20 px-2 py-1 rounded text-sm font-mono">
                <span className="font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-xs ml-1">S</span>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="text-white hover:text-gray-200 transition-colors p-1"
          aria-label="Close banner"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default PromotionalBanner;
