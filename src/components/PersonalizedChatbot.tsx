import React, { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const PersonalizedChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: "Hi! I'm Jayden, the owner of BC Pressure Washing. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  
  const suggestedQuestions = [
    "What services do you offer?",
    "How much does pressure washing cost?",
    "Do you offer free quotes?",
    "What areas do you service?",
    "How quickly can you schedule service?"
  ];

  const handleSendMessage = (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: getBotResponse(message),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('service') || msg.includes('what')) {
      return "We offer residential pressure washing, commercial building cleaning, and fleet & vehicle washing. Each service is personally quality-checked by me!";
    } else if (msg.includes('cost') || msg.includes('price')) {
      return "Our pricing varies by service type and property size. I'd be happy to give you a free quote! You can use our online calculator or call me at (778) 808-7620.";
    } else if (msg.includes('quote') || msg.includes('free')) {
      return "Absolutely! All quotes are free with no obligation. You can get an instant estimate using our online calculator, or I can come out for a detailed assessment.";
    } else if (msg.includes('area') || msg.includes('location')) {
      return "We service all of British Columbia! From Vancouver to Victoria and everywhere in between. Same-day service is often available.";
    } else if (msg.includes('schedule') || msg.includes('quick')) {
      return "We often have same-day availability! Call me directly at (778) 808-7620 and I'll work with your schedule. Customer satisfaction is our priority.";
    } else {
      return "Thanks for your question! For the most accurate information, feel free to call me directly at (778) 808-7620. I personally handle all customer inquiries and ensure quality service.";
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {/* Question Preview Bubble */}
          <div className="bg-white rounded-lg shadow-lg p-3 max-w-xs border animate-bounce">
            <p className="text-sm text-gray-700 font-medium">
              {suggestedQuestions[Math.floor(Date.now() / 5000) % suggestedQuestions.length]}
            </p>
          </div>
          
          {/* Chat Button */}
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-bc-red hover:bg-red-700 text-white rounded-full w-16 h-16 shadow-lg relative"
            size="sm"
          >
            {/* Spinning Site Icon */}
            <div className="absolute -top-2 -right-2 w-8 h-8 animate-spin">
              <img
                src="/lovable-uploads/98b90447-5bf8-4f23-9c41-b0960ed96040.png"
                alt="BC Logo"
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* User Face */}
            <img
              src="/lovable-uploads/1754fca8-1ad9-4011-8753-e3e8a5d4184b.png"
              alt="Jayden Fisher"
              className="w-12 h-12 rounded-full object-cover"
            />
          </Button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl border flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-bc-red text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <img
                src="/lovable-uploads/1754fca8-1ad9-4011-8753-e3e8a5d4184b.png"
                alt="Jayden Fisher"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">Chat with Jayden</h3>
                <p className="text-xs opacity-90">Owner, BC Pressure Washing</p>
              </div>
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
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isUser
                      ? 'bg-bc-red text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Suggested Questions */}
          <div className="px-4 py-2 border-t bg-gray-50">
            <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-1">
              {suggestedQuestions.slice(0, 3).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(question)}
                  className="text-xs bg-white border rounded-full px-2 py-1 hover:bg-gray-100 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          
          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && inputMessage.trim() && handleSendMessage(inputMessage)}
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bc-red"
              />
              <Button
                onClick={() => inputMessage.trim() && handleSendMessage(inputMessage)}
                className="bg-bc-red hover:bg-red-700 text-white px-4 py-2 text-sm"
                disabled={!inputMessage.trim()}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalizedChatbot;