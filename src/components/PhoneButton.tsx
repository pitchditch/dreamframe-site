
import { Phone } from 'lucide-react';
import { trackPageView } from '@/utils/analytics';

const PhoneButton = () => {
  const handleCallClick = () => {
    // Track phone call events
    try {
      trackPageView('/virtual/phone-call-button');
    } catch (error) {
      console.error('Error tracking phone call:', error);
    }
  };
  
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
      <a
        href="tel:7788087620"
        onClick={handleCallClick}
        className="flex items-center gap-2 bg-bc-red hover:bg-red-700 text-white px-6 py-4 rounded-full shadow-lg transition-all"
        aria-label="Call us now"
      >
        <Phone size={20} />
        <span className="font-semibold">Call Jayden: 778-808-7620</span>
      </a>
    </div>
  );
};

export default PhoneButton;
