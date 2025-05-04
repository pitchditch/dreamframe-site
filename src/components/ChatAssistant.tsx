
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { MessageCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      // Find satisfaction guarantee section or FAQ section
      const faqSection = document.querySelector('h2')?.textContent?.includes('Frequently Asked Questions') 
        ? document.querySelector('h2')?.closest('section')
        : null;
        
      const satisfactionSection = document.querySelector('section h2')?.textContent?.includes('Satisfaction') 
        ? document.querySelector('section h2')?.closest('section')
        : null;
      
      if (faqSection) {
        const faqRect = faqSection.getBoundingClientRect();
        // Show when FAQ section enters viewport
        if (faqRect.top <= window.innerHeight && faqRect.bottom >= 0) {
          setIsVisible(true);
        } else if (!satisfactionSection) {
          setIsVisible(false);
        }
      } else if (satisfactionSection) {
        const satisfactionRect = satisfactionSection.getBoundingClientRect();
        // Show chat assistant when satisfaction guarantee section is in view or user scrolls past it
        if (satisfactionRect.top <= window.innerHeight || window.scrollY > satisfactionRect.top) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        // If there's no satisfaction guarantee or FAQ section, show when user scrolls down 70% of the page
        if (window.scrollY > (document.body.scrollHeight * 0.7)) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
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
        className={`chat-button rounded-full p-6 shadow-lg ${isOpen ? 'bg-bc-red hover:bg-bc-red/90' : 'bg-navy hover:bg-navy/90'}`}
        size="lg"
      >
        {isOpen ? (
          <X className="h-8 w-8 text-white" />
        ) : (
          <div className="relative">
            <img 
              src="/lovable-uploads/2159ece1-41e3-4490-934d-771a1e1a10e0.png" 
              alt="Chat Assistant" 
              className="h-12 w-12 rounded-full border-2 border-white"
            />
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs px-1 rounded-full animate-pulse">
              1
            </div>
          </div>
        )}
      </Button>

      {!isOpen && (
        <div className="absolute bottom-24 right-0 bg-white rounded-lg shadow-lg p-3 max-w-[250px] animate-fade-in">
          <p className="text-sm">{chatMessages[messageIndex]}</p>
        </div>
      )}

      {isOpen && (
        <div className="absolute bottom-24 right-0 w-[350px] bg-white rounded-xl shadow-xl p-5 border border-gray-200">
          <div className="flex items-center gap-4 mb-5">
            <img
              src="/lovable-uploads/2159ece1-41e3-4490-934d-771a1e1a10e0.png"
              alt="BC Pressure Washing Assistant"
              className="w-20 h-20 rounded-full object-cover border-2 border-bc-red"
            />
            <div>
              <h4 className="font-semibold text-lg">Chat with Jayden</h4>
              <p className="text-sm text-gray-600">{chatMessages[messageIndex]}</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-5">
            <div className="bg-gray-100 rounded-lg p-3 hover:bg-gray-200 transition-all cursor-pointer animate-pulse">
              How much does window cleaning cost?
            </div>
            <div className="bg-gray-100 rounded-lg p-3 hover:bg-gray-200 transition-all cursor-pointer animate-pulse" style={{ animationDelay: "0.5s" }}>
              Do you offer same-day service?
            </div>
            <div className="bg-gray-100 rounded-lg p-3 hover:bg-gray-200 transition-all cursor-pointer animate-pulse" style={{ animationDelay: "1s" }}>
              What areas do you service?
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              to="/contact" 
              className="w-full bg-bc-red hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium block transition-all hover:scale-110"
            >
              Start Chat
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
