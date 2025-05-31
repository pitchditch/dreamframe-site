
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
  const [showContactBar, setShowContactBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show contact bar after scrolling past 50% of viewport height
      if (scrollY > windowHeight * 0.5) {
        setShowContactBar(true);
      } else {
        setShowContactBar(false);
      }
      
      // Hide when at the very bottom to avoid overlap with footer
      const documentHeight = document.documentElement.scrollHeight;
      const scrolledToBottom = scrollY + windowHeight >= documentHeight - 100;
      
      if (scrolledToBottom) {
        setShowContactBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    console.log('Sending message:', message);
    setMessage('');
  };

  if (!showContactBar) return null;

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
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-bc-red via-red-600 to-bc-red text-white shadow-lg border-t-2 border-red-700">
        <div className="container mx-auto px-4 py-2 md:py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-sm md:text-lg lg:text-xl font-bold mb-1">
                {t("Ready to Transform Your Property?")}
              </h3>
              <p className="text-xs md:text-sm lg:text-base opacity-90">
                {t("Get your free quote today. Same-day service available!")}
              </p>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="flex items-center gap-1 md:gap-2 bg-yellow-400 text-gray-900 px-2 md:px-4 py-2 md:py-3 rounded-full font-semibold text-xs md:text-sm hover:bg-yellow-300 transition-colors shadow-lg"
              >
                <MessageCircle size={14} className="md:w-[18px] md:h-[18px]" />
                <span>{t("Chat")}</span>
              </button>
              
              <a
                href="tel:778-808-7620"
                className="flex items-center gap-1 md:gap-2 bg-white text-bc-red px-2 md:px-4 py-2 md:py-3 rounded-full font-semibold text-xs md:text-sm hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Phone size={14} className="md:w-[18px] md:h-[18px]" />
                <span>{t("Call (778) 808-7620")}</span>
              </a>
              
              <Link
                to="/calculator"
                className="flex items-center gap-1 md:gap-2 bg-green-500 text-white px-2 md:px-4 py-2 md:py-3 rounded-full font-semibold text-xs md:text-sm hover:bg-green-600 transition-colors shadow-lg"
              >
                <MessageCircle size={14} className="md:w-[18px] md:h-[18px]" />
                <span className="hidden sm:inline">{t("Get Free Quote Online")}</span>
                <span className="sm:hidden">{t("Quote")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StickyContactBar;
