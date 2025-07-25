
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Calculator, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to help you with any questions about our pressure washing services. What can I help you with today?",
      isBot: true
    }
  ]);
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
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    const newMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thanks for your message! For the fastest response, please call us at (778) 808-7620 or get an instant quote using our calculator.",
        isBot: true
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
    
    console.log('Sending message:', message);
    setMessage('');
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
  };

  const suggestedQuestions = [
    {
      icon: <Calculator size={16} />,
      text: "Want a quick quote? Drop your address and check prices",
      action: () => window.location.href = '/calculator'
    },
    {
      icon: <Clock size={16} />,
      text: "What's your availability this week?",
      message: "What's your availability this week?"
    },
    {
      icon: <MapPin size={16} />,
      text: "Do you service my area?",
      message: "Do you service my area? I'm located in"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className={`fixed ${isMobile ? 'bottom-20 right-4' : 'bottom-6 right-6'} z-[999] flex flex-col items-end`}>
      {isOpen && (
        <div className={`mb-4 bg-white rounded-lg shadow-xl border ${isMobile ? 'w-80 h-96' : 'w-96 h-[500px]'} flex flex-col`}>
          <div className="flex items-center justify-between p-4 border-b bg-bc-red text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                <img 
                  src="/lovable-uploads/8d37a2ea-bb53-4dca-93a9-e0c6323c5249.png" 
                  alt="Chat Assistant"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold">Chat with us!</h3>
            </div>
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
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isBot 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'bg-bc-red text-white'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              
              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="space-y-2 mt-4">
                  <p className="text-xs text-gray-500 font-medium">Quick options:</p>
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => question.action ? question.action() : handleSuggestedQuestion(question.message || question.text)}
                      className="w-full flex items-center gap-2 p-2 text-xs bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                    >
                      <span className="text-bc-red">{question.icon}</span>
                      <span className="text-gray-700">{question.text}</span>
                    </button>
                  ))}
                </div>
              )}
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
        className="rounded-full w-14 h-14 bg-bc-red hover:bg-red-700 shadow-lg relative overflow-hidden"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src="/lovable-uploads/8d37a2ea-bb53-4dca-93a9-e0c6323c5249.png" 
              alt="Chat Assistant"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </Button>
    </div>
  );
};

export default ChatAssistant;
