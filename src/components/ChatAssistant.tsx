
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { MessageCircle, X } from 'lucide-react';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const chatMessages = [
    "Have any questions?",
    "I'm here to help!",
    "Ask me anything about our services",
    "Get instant answers here"
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Find FAQ section
      const faqSection = document.querySelector('section h2[class*="text"]')?.textContent?.includes('FAQ') 
        ? document.querySelector('section h2[class*="text"]')?.closest('section')
        : null;
      
      if (faqSection) {
        const faqRect = faqSection.getBoundingClientRect();
        // Show chat assistant when FAQ section is in view
        if (faqRect.top <= window.innerHeight && faqRect.bottom >= 0) {
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
    
    // Message rotation interval
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % chatMessages.length);
    }, 3000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(messageInterval);
    }
  }, [chatMessages.length]);

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
              src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
              alt="BC Pressure Washing Assistant"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold">Chat with Jayden</h4>
              <p className="text-sm text-gray-600">{chatMessages[messageIndex]}</p>
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
