
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { MessageCircle, HelpCircle, X } from 'lucide-react';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringFAQ, setIsHoveringFAQ] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Find FAQ section
      const faqSection = document.querySelector('section h2[class*="text"]')?.textContent?.includes('FAQ') 
        ? document.querySelector('section h2[class*="text"]')?.closest('section')
        : null;
      
      if (faqSection) {
        const faqSectionRect = faqSection.getBoundingClientRect();
        const faqSectionInView = faqSectionRect.top < window.innerHeight && faqSectionRect.bottom > 0;
        
        // Show chat assistant when FAQ is in view or we've scrolled past it
        if (faqSectionInView || faqSectionRect.bottom <= 0) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        // If there's no FAQ section, don't show the chat assistant
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor FAQ section hover
  useEffect(() => {
    const handleFAQHover = () => {
      const faqItems = document.querySelectorAll('[data-state="closed"]');
      
      faqItems.forEach(item => {
        item.addEventListener('mouseenter', () => setIsHoveringFAQ(true));
        item.addEventListener('mouseleave', () => setIsHoveringFAQ(false));
      });
      
      return () => {
        faqItems.forEach(item => {
          item.removeEventListener('mouseenter', () => setIsHoveringFAQ(true));
          item.removeEventListener('mouseleave', () => setIsHoveringFAQ(false));
        });
      };
    };
    
    // Set up hover detection after a short delay to ensure DOM is ready
    const timer = setTimeout(handleFAQHover, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      {/* Floating hint when hovering FAQ items */}
      {isHoveringFAQ && !isOpen && (
        <div className="absolute right-16 bottom-3 bg-white rounded-lg shadow-lg p-3 mb-2 animate-pulse whitespace-nowrap">
          <div className="flex items-center gap-2">
            <HelpCircle className="text-bc-red" size={16} />
            <span className="text-sm font-medium">Have questions? Click to chat!</span>
          </div>
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`chat-button rounded-full p-3 shadow-lg ${isOpen ? 'bg-bc-red hover:bg-bc-red/90' : 'bg-navy hover:bg-navy/90'}`}
        size="lg"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </Button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[300px] bg-white rounded-lg shadow-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/lovable-uploads/c5219e28-4a09-4d72-bef9-e96193360fa6.png"
              alt="BC Pressure Washing Assistant"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold">Have any questions?</h4>
              <p className="text-sm text-gray-600">I'm here to help!</p>
            </div>
          </div>
          <div className="text-center text-sm text-gray-600">
            Click the button below to start a conversation
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
