
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { MessageCircle, X } from 'lucide-react';

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
        const faqSectionTop = faqSection.getBoundingClientRect().top;
        
        // Show chat assistant only after scrolling to the FAQ section
        if (faqSectionTop <= window.innerHeight) {
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
    
    // Setup FAQ section hover detection
    const setupFAQHoverDetection = () => {
      const faqSection = document.querySelector('section h2[class*="text"]')?.textContent?.includes('FAQ') 
        ? document.querySelector('section h2[class*="text"]')?.closest('section')
        : null;
      
      if (faqSection) {
        faqSection.addEventListener('mouseenter', () => setIsHoveringFAQ(true));
        faqSection.addEventListener('mouseleave', () => setIsHoveringFAQ(false));
      }
    };
    
    // Wait a bit for the DOM to be ready
    setTimeout(setupFAQHoverDetection, 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      const faqSection = document.querySelector('section h2[class*="text"]')?.textContent?.includes('FAQ') 
        ? document.querySelector('section h2[class*="text"]')?.closest('section')
        : null;
      
      if (faqSection) {
        faqSection.removeEventListener('mouseenter', () => setIsHoveringFAQ(true));
        faqSection.removeEventListener('mouseleave', () => setIsHoveringFAQ(false));
      }
    };
  }, []);

  // Auto-open the chat when hovering over FAQ
  useEffect(() => {
    if (isHoveringFAQ && !isOpen && isVisible) {
      setIsOpen(true);
    }
  }, [isHoveringFAQ, isOpen, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
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
