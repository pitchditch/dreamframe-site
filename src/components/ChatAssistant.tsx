
import { useState, useEffect } from 'react';
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
      // Find satisfaction guarantee section
      const satisfactionSection = document.querySelector('section h2')?.textContent?.includes('Satisfaction') 
        ? document.querySelector('section h2')?.closest('section')
        : null;
      
      if (satisfactionSection) {
        const satisfactionRect = satisfactionSection.getBoundingClientRect();
        // Show chat assistant when satisfaction guarantee section is in view or user scrolls past it
        if (satisfactionRect.top <= window.innerHeight || window.scrollY > satisfactionRect.top) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        // If there's no satisfaction guarantee section, show when user scrolls down 70% of the page
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
        className={`chat-button rounded-full p-4 shadow-lg ${isOpen ? 'bg-bc-red hover:bg-bc-red/90' : 'bg-navy hover:bg-navy/90'}`}
        size="lg"
      >
        {isOpen ? (
          <X className="h-7 w-7 text-white" />
        ) : (
          <MessageCircle className="h-7 w-7 text-white" />
        )}
      </Button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] bg-white rounded-xl shadow-xl p-5 border border-gray-200">
          <div className="flex items-center gap-4 mb-5">
            <img
              src="/lovable-uploads/e0f67b72-91c6-428d-a7a0-8cde935e35d8.png"
              alt="BC Pressure Washing Assistant"
              className="w-16 h-16 rounded-full object-cover border-2 border-bc-red"
            />
            <div>
              <h4 className="font-semibold text-lg">Chat with Jayden</h4>
              <p className="text-sm text-gray-600">{chatMessages[messageIndex]}</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-5">
            <div className="bg-gray-100 rounded-lg p-3 hover:bg-gray-200 transition-all cursor-pointer">
              How much does window cleaning cost?
            </div>
            <div className="bg-gray-100 rounded-lg p-3 hover:bg-gray-200 transition-all cursor-pointer">
              Do you offer same-day service?
            </div>
            <div className="bg-gray-100 rounded-lg p-3 hover:bg-gray-200 transition-all cursor-pointer">
              What areas do you service?
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              to="/contact" 
              className="w-full bg-bc-red hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium block transition-all hover:scale-105"
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
