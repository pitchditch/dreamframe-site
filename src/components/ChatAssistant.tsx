
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

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

  // Common questions and answers for the bot
  const faqData = [
    { question: "What areas do you serve?", answer: "We serve the entire Greater Vancouver area including Vancouver, Burnaby, Richmond, Surrey, Coquitlam, and surrounding areas." },
    { question: "How much does pressure washing cost?", answer: "Pricing varies based on the size of the area and the specific service needed. We offer free quotes - just call us at 778-808-7620 or use our quote calculator on the website." },
    { question: "Do you offer commercial services?", answer: "Yes! We provide pressure washing services for both residential and commercial properties, with specialized solutions for businesses." },
    { question: "How long does a typical job take?", answer: "Most residential jobs are completed in 1-4 hours, depending on the size of the property and services requested. Commercial jobs may take longer." },
    { question: "Is pressure washing safe for all surfaces?", answer: "Not all surfaces can handle the same pressure. We evaluate each surface and use appropriate techniques and equipment to ensure effective cleaning without damage." },
    { question: "Do you use eco-friendly cleaning solutions?", answer: "Yes, we use environmentally friendly cleaning solutions that effectively remove dirt, mold, and stains without harming your landscaping or the environment." }
  ];

  // Suggested question buttons
  const suggestedQuestions = [
    "What areas do you serve?",
    "How much does pressure washing cost?",
    "Do you offer commercial services?", 
    "How long does a typical job take?"
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
          { 
            type: 'bot', 
            text: "Hey there! 👋 I'm the AI version of Jayden Fisher, here to help with all your pressure washing questions! I can answer anything about our services, but if you need the real deal, Jayden is just a call away at 778-808-7620. What can I help you with today?" 
          }
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
    
    // Check if the user's message matches any FAQ
    const matchingFaq = faqData.find(faq => 
      message.toLowerCase().includes(faq.question.toLowerCase())
    );
    
    setTimeout(() => {
      if (matchingFaq) {
        setMessages([
          ...newMessages,
          { type: 'bot', text: matchingFaq.answer }
        ]);
      } else {
        setMessages([
          ...newMessages,
          { type: 'bot', text: "Thanks for your question! For a personalized response, please call Jayden at 778-808-7620. We're eager to help with all your pressure washing needs!" }
        ]);
      }
    }, 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    const userMessage: MessageType = { type: 'user', text: question };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    
    // Find the matching FAQ
    const matchingFaq = faqData.find(faq => 
      question.toLowerCase().includes(faq.question.toLowerCase())
    );
    
    setTimeout(() => {
      if (matchingFaq) {
        setMessages([
          ...newMessages,
          { type: 'bot', text: matchingFaq.answer }
        ]);
      } else {
        setMessages([
          ...newMessages,
          { type: 'bot', text: "Thanks for your question! For a personalized response, please call Jayden at 778-808-7620. We're eager to help with all your pressure washing needs!" }
        ]);
      }
    }, 1000);
  };

  const clearChat = () => {
    setChatHistory([...messages]);
    setMessages([
      { 
        type: 'bot', 
        text: "Hey there! 👋 I'm the AI version of Jayden Fisher, here to help with all your pressure washing questions! I can answer anything about our services, but if you need the real deal, Jayden is just a call away at 778-808-7620. What can I help you with today?" 
      }
    ]);
  };

  return (
    <>
      <div className="fixed bottom-24 right-6 md:right-10 z-40 flex flex-col items-end space-y-4">
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
                <Avatar className="h-10 w-10 mr-2 border-2 border-white">
                  <AvatarImage src="/lovable-uploads/f2a8fb4d-7253-4cb8-a13c-30140d7ccaf4.png" alt="Jayden Fisher" />
                  <AvatarFallback>JF</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">Jayden Fisher</span>
                  <span className="text-xs opacity-90">BC Pressure Washing</span>
                </div>
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
            
            <div className="h-72 overflow-y-auto p-3 bg-gray-50" id="chat-messages">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`mb-3 ${msg.type === 'user' ? 'text-right' : ''}`}
                >
                  <div 
                    className={`inline-block p-3 rounded-lg max-w-[85%] ${
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
            
            <div className="p-2 border-t">
              <div className="mb-2 overflow-x-auto pb-2">
                <ToggleGroup type="single" className="inline-flex space-x-1 min-w-max">
                  {suggestedQuestions.map((question, index) => (
                    <ToggleGroupItem 
                      key={index} 
                      value={`question-${index}`}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs py-1 px-2 border rounded bg-gray-50 whitespace-nowrap"
                    >
                      {question}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
              
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
          className="rounded-full h-14 w-14 flex items-center justify-center shadow-lg bg-bc-red hover:bg-red-700 fixed bottom-8 right-6 md:right-10 z-40"
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
        
        #chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        
        #chat-messages::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        #chat-messages::-webkit-scrollbar-thumb {
          background: #dedede;
          border-radius: 3px;
        }
        
        #chat-messages::-webkit-scrollbar-thumb:hover {
          background: #c1c1c1;
        }
        `}
      </style>
    </>
  );
};

export default ChatAssistant;
