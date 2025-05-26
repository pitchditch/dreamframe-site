
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const isMobile = useIsMobile();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Hide chat assistant when in hero section (first 100vh)
      const shouldHide = window.scrollY < window.innerHeight;
      setIsVisible(!shouldHide);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    console.log('Sending message:', message);
    setMessage('');
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed ${isMobile ? 'bottom-20 right-4' : 'bottom-6 right-6'} z-[999] flex flex-col items-end`}>
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-xl border w-80 h-96 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b bg-bc-red text-white rounded-t-lg">
            <h3 className="font-semibold">Chat with us!</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
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
            <div ref={messagesEndRef} />
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
      
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-14 h-14 bg-bc-red hover:bg-red-700 shadow-lg"
      >
        <MessageCircle size={24} className="text-white" />
      </Button>
    </div>
  );
};

export default ChatAssistant;
