
import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, X, Send, Loader2, Info, Home, DollarSign, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar } from './ui/avatar';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  options?: string[];
}

type HouseSize = '0-1800 sqft' | '1800-2800 sqft' | '2800-3500 sqft' | 'More than 3500 sqft';

const ChatAssistant = () => {
  const { t, language } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: t("Hi! I'm here to help with window cleaning, pressure washing, roof cleaning, and gutter cleaning. Would you like more details about a service or are you ready for an estimate?"),
      options: [t("Get More Information"), t("Get an Estimate")]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHouseSize, setSelectedHouseSize] = useState<HouseSize | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Common questions for suggestion bubbles - expanded list for rotation
  const commonQuestions = [
    t("How much is window cleaning?"),
    t("What's involved in house washing?"),
    t("How do you clean roofs?"),
    t("Do you clean gutters?"),
    t("How much for pressure washing?"),
    t("Do you offer discounts?"),
    t("How to book a service?"),
    t("Are you insured?")
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Rotate questions every 4 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuestionIndex(prevIndex => 
        prevIndex === commonQuestions.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    
    return () => clearInterval(intervalId);
  }, [commonQuestions.length]);

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage = { role: 'user' as const, content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Process the message and provide a response based on context
      let response: Message;
      
      if (messageText.toLowerCase().includes('window cleaning') || messageText === t("Tell me about window cleaning.")) {
        response = {
          role: 'assistant',
          content: t("We offer interior and exterior window cleaning for both residential and commercial properties. Our cleaning uses safe, high-quality products that leave your windows sparkling! Would you like to know more about house size or get an estimate for your home?"),
          options: [t("Get an Estimate"), t("Ask Another Question")]
        };
      } else if (messageText.toLowerCase().includes('house washing') || messageText === t("What's involved in house washing?")) {
        response = {
          role: 'assistant',
          content: t("House washing involves cleaning the exterior of your home using soft washing or pressure washing. We remove dirt, mold, and stains from siding, ensuring your home looks fresh and clean. Would you like to get an estimate or ask more questions?"),
          options: [t("Get an Estimate"), t("Ask Another Question")]
        };
      } else if (messageText.toLowerCase().includes('roof') || messageText === t("How do you clean roofs?")) {
        response = {
          role: 'assistant',
          content: t("We use a soft washing method to clean roofs, removing moss, algae, and dirt. The process is gentle, protecting your roof from damage. Would you like to book an estimate for roof cleaning?"),
          options: [t("Schedule Roof Cleaning Estimate"), t("Ask Another Question")]
        };
      } else if (messageText === t("Get More Information")) {
        response = {
          role: 'assistant',
          content: t("What specific service would you like to learn more about?"),
          options: [t("Window Cleaning"), t("House Washing"), t("Roof Cleaning"), t("Gutter Cleaning"), t("Pressure Washing")]
        };
      } else if (messageText === t("Get an Estimate")) {
        response = {
          role: 'assistant',
          content: t("Great! To provide the most accurate estimate, could you tell me your house size?"),
          options: [t("0-1800 sqft"), t("1800-2800 sqft"), t("2800-3500 sqft"), t("More than 3500 sqft")]
        };
      } else if (['0-1800 sqft', '1800-2800 sqft', '2800-3500 sqft', 'More than 3500 sqft'].includes(messageText)) {
        setSelectedHouseSize(messageText as HouseSize);
        response = {
          role: 'assistant',
          content: t(`For a ${messageText} house, we can help with window cleaning, house washing, driveway pressure washing, deck washing, and gutter cleaning. Each of these services is designed to leave your property looking like new. Would you like to get an estimate now?`),
          options: [t("Yes, get an estimate"), t("Ask about services")]
        };
      } else if (messageText.toLowerCase().includes('price') || messageText.toLowerCase().includes('cost') || messageText === t("How much is window cleaning?")) {
        const size = selectedHouseSize || '0-1800 sqft';
        response = {
          role: 'assistant',
          content: t(`For a ${size} house, window cleaning is $300 outside, $300 inside, or $547.20 for both. Would you like to schedule this service?`),
          options: [t("Book Window Cleaning"), t("Ask Another Question")]
        };
      } else if (messageText === t("Book Window Cleaning") || messageText.toLowerCase().includes('book') || messageText === t("Book Now") || messageText === t("Schedule Roof Cleaning Estimate")) {
        response = {
          role: 'assistant',
          content: t("Awesome! Click below to book your service. Every job is checked by Jayden Fisher, and we're fully insured!"),
          options: [t("Book Now"), t("Talk to a Human")]
        };
      } else if (messageText === t("Talk to a Human")) {
        response = {
          role: 'assistant',
          content: t("Our team is ready to help you! You can reach us by phone at 778-808-7620 or by email at info@bcpressurewashing.com. Would you like us to call you instead?"),
          options: [t("Yes, call me"), t("I'll call you")]
        };
      } else {
        // Fallback for questions we don't understand
        response = {
          role: 'assistant',
          content: t("I want to make sure you get the best answer! Would you like to talk to a real person?"),
          options: [t("Talk to a Human"), t("See More FAQs")]
        };
      }
      
      // Add assistant response after a short delay to simulate typing
      setTimeout(() => {
        setMessages(prev => [...prev, response]);
        setIsLoading(false);
      }, 800);
      
    } catch (error) {
      console.error('Error processing message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: t('Sorry, I encountered an error processing your request.'),
        options: [t("Talk to a Human")]
      }]);
      setIsLoading(false);
    }
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Bot Button with contained suggestion bubble */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-row-reverse items-center">
        {/* Chat Button - avatar image */}
        <div 
          onClick={() => setIsOpen(true)}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <img 
            src="/lovable-uploads/dd2d0fe6-317b-4070-99d9-d9be62b17f2e.png" 
            alt="Chat with us"
            className="h-14 w-14 rounded-full object-cover shadow-lg"
          />
        </div>
        
        {/* Question bubble positioned to the left of the chat button */}
        {!isOpen && (
          <div 
            onClick={() => {
              setIsOpen(true);
              setTimeout(() => handleSendMessage(commonQuestions[currentQuestionIndex]), 500);
            }}
            className="question-bubble mr-3"
          >
            <span className="mr-2">💬</span>
            {commonQuestions[currentQuestionIndex]}
          </div>
        )}
      </div>

      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-80 sm:w-96 h-[500px] z-50 flex flex-col shadow-xl rounded-lg overflow-hidden">
          <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border-2 border-white">
                <img 
                  src="/lovable-uploads/dd2d0fe6-317b-4070-99d9-d9be62b17f2e.png" 
                  alt="Jayden Fisher"
                  className="h-full w-full object-cover"
                />
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">{t("BC Pressure Washing Assistant")}</h3>
                <p className="text-xs text-blue-100">{t("Operated by Jayden Fisher")}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 rounded-full hover:bg-blue-600"
            >
              <X className="h-4 w-4 text-white" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex items-start gap-2",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 border border-gray-200">
                    <img 
                      src="/lovable-uploads/dd2d0fe6-317b-4070-99d9-d9be62b17f2e.png" 
                      alt="Jayden Fisher"
                      className="h-full w-full object-cover"
                    />
                  </Avatar>
                )}
                <div className="flex flex-col gap-2 max-w-[80%]">
                  <div 
                    className={cn(
                      "rounded-lg p-3",
                      message.role === 'user' 
                        ? "bg-blue-500 text-white rounded-tr-none ml-auto" 
                        : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
                    )}
                  >
                    {message.content}
                  </div>
                  
                  {message.options && message.role === 'assistant' && (
                    <div className="flex flex-wrap gap-2">
                      {message.options.map((option, optIdx) => (
                        <Button
                          key={optIdx}
                          variant="outline"
                          size="sm"
                          className="text-xs py-1 h-auto border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100"
                          onClick={() => handleOptionClick(option)}
                        >
                          {option === "Book Now" && <DollarSign className="h-3 w-3 mr-1" />}
                          {option === "Talk to a Human" && <Phone className="h-3 w-3 mr-1" />}
                          {option === "Get More Information" && <Info className="h-3 w-3 mr-1" />}
                          {option === "Get an Estimate" && <Home className="h-3 w-3 mr-1" />}
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8 bg-blue-500">
                    <User className="h-4 w-4 text-white" />
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2">
                <Avatar className="h-8 w-8 border border-gray-200">
                  <img 
                    src="/lovable-uploads/dd2d0fe6-317b-4070-99d9-d9be62b17f2e.png" 
                    alt="Jayden Fisher"
                    className="h-full w-full object-cover"
                  />
                </Avatar>
                <div className="bg-white text-gray-800 rounded-lg rounded-tl-none p-3 max-w-[80%] border border-gray-200">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-gray-500">{t("Typing...")}</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <Textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("Type your message...")}
                className="min-h-10 resize-none"
                disabled={isLoading}
              />
              <Button 
                onClick={() => handleSendMessage()} 
                disabled={isLoading || !input.trim()}
                className="h-10 w-10 p-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatAssistant;
