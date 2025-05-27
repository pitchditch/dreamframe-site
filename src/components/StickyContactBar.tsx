
import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, X, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from './ui/button';
import { Input } from './ui/input';

const StickyContactBar = () => {
  const { t } = useTranslation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const premiumSection = document.querySelector('[data-section="premium-solutions"]');
      const faqSection = document.querySelector('[data-section="faq"]');
      
      if (premiumSection && faqSection) {
        const premiumTop = premiumSection.getBoundingClientRect().top;
        const faqTop = faqSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Show when premium section is visible and hide when FAQ section is in view
        const shouldShow = premiumTop <= windowHeight && faqTop > windowHeight * 0.2;
        setIsVisible(shouldShow);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    console.log('Sending message:', message);
    setMessage('');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-4 z-50 mb-4 bg-white rounded-lg shadow-xl border w-80 h-96 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b bg-bc-red text-white rounded-t-lg">
            <h3 className="font-semibold">Chat with us!</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:bg-red-600"
            >
              <X size={18} />
            </Button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm">Hi! I'm here to help you with any questions about our pressure washing services. What can I help you with today?</p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="sm" className="bg-bc-red hover:bg-red-700">
                <Send size={16} />
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-bc-red text-white shadow-lg border-t-2 border-red-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm font-semibold">
                {t("Ready for a Free Quote?")}
              </div>
              <div className="hidden sm:block text-xs opacity-90">
                {t("Same-day service available in Surrey & White Rock")}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="flex items-center gap-1 bg-yellow-400 text-gray-900 px-3 py-2 rounded-full font-semibold text-sm hover:bg-yellow-300 transition-colors"
              >
                <MessageCircle size={16} />
                <span className="hidden sm:inline">{t("Chat")}</span>
              </button>
              
              <a
                href="tel:778-808-7620"
                className="flex items-center gap-1 bg-white text-bc-red px-3 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
              >
                <Phone size={16} />
                <span className="hidden sm:inline">{t("Call")}</span>
              </a>
              
              <Link
                to="/calculator"
                className="flex items-center gap-1 bg-green-500 text-white px-3 py-2 rounded-full font-semibold text-sm hover:bg-green-600 transition-colors"
              >
                <MessageCircle size={16} />
                <span className="hidden sm:inline">{t("Quote")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StickyContactBar;
