
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation } from '@/hooks/use-translation';

type MessageType = {
  type: 'user' | 'bot';
  text: string;
};

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [chatHistory, setChatHistory] = useState<MessageType[]>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const { t } = useTranslation();

  const suggestions = [
    t("Have a question?"),
    t("Need help with a quote?"),
    t("Want to learn more about our services?")
  ];

  useEffect(() => {
    const suggestionTimer = setTimeout(() => {
      setShowSuggestion(true);
    }, 3000);

    const suggestionRotator = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % suggestions.length);
    }, 4000);

    return () => {
      clearTimeout(suggestionTimer);
      clearInterval(suggestionRotator);
    };
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          { type: 'bot', text: t("Hi there! Ask me any questions about our services.") }
        ]);
      }, 300);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const userMessage: MessageType = { type: 'user', text: message };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setMessage('');
    
    // Simple bot response for demo purposes
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { type: 'bot', text: "Thanks for your message! One of our team members will get back to you shortly." }
      ]);
    }, 1000);
  };

  const clearChat = () => {
    setChatHistory([...messages]);
    setMessages([
      { type: 'bot', text: t("Hi there! Ask me any questions about our services.") }
    ]);
  };

  return (
    <>
      <div className="fixed bottom-24 right-6 md:right-10 z-40 flex flex-col items-end">
        {showSuggestion && !isOpen && (
          <div 
            className="chat-suggestion bg-white rounded-lg shadow-lg p-3 mb-3 text-sm max-w-xs animate-fade-in-right"
            style={{ 
              animation: 'fadeIn 0.5s ease-out, float 2s ease-in-out infinite',
              transformOrigin: 'center bottom'
            }}
          >
            {suggestions[currentSuggestion]}
          </div>
        )}
        
        {isOpen && (
          <div className="bg-white rounded-lg shadow-2xl w-80 md:w-96 mb-3 overflow-hidden animate-fade-in-up">
            <div className="bg-bc-red text-white p-3 flex justify-between items-center">
              <div className="flex items-center">
                <img 
                  src="/lovable-uploads/54d1a62d-6e33-4c85-9c4c-9af1a07e58c2.png" 
                  alt="Chat Assistant" 
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="font-medium">{t("BC Pressure Washing Assistant")}</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleChat}
                className="text-white hover:bg-red-700/20 h-8 w-8"
              >
                <X size={18} />
              </Button>
            </div>
            
            <div className="h-72 overflow-y-auto p-3 bg-gray-50">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`mb-3 ${msg.type === 'user' ? 'text-right' : ''}`}
                >
                  <div 
                    className={`inline-block p-3 rounded-lg ${
                      msg.type === 'user' 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t p-3">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("Type your question...")}
                  className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bc-red"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="bg-bc-red hover:bg-red-700"
                >
                  <Send size={18} />
                </Button>
              </form>
              
              <div className="mt-2 flex justify-between items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearChat}
                  className="text-xs text-gray-500"
                >
                  {t("Clear chat")}
                </Button>
                <a 
                  href="tel:+17788087620" 
                  className="text-xs text-bc-red hover:underline"
                >
                  {t("Call us now: 778 808 7620")}
                </a>
              </div>
            </div>
          </div>
        )}
        
        <Button 
          onClick={toggleChat} 
          className={`rounded-full h-14 w-14 flex items-center justify-center shadow-lg ${isOpen ? 'bg-red-600 hover:bg-red-700' : 'bg-bc-red hover:bg-red-700'}`}
        >
          <MessageCircle size={24} className="text-white" />
        </Button>
      </div>

      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        .animate-fade-in-up {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-fade-in-right {
          animation: fadeIn 0.3s ease-out;
        }
        `}
      </style>
    </>
  );
};

export default ChatAssistant;
