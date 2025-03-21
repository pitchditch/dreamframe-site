
import { useState } from "react";
import { Bot, X, Send, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { toast } from "@/hooks/use-toast";

// Pre-defined responses for common questions
const RESPONSES = {
  greeting: "Hello! How can I help you with your pressure washing needs today?",
  services: "We offer window cleaning, gutter cleaning, roof cleaning, house washing, and commercial services. Would you like specific information about any of these?",
  pricing: "Our pricing varies based on the specific service and property size. Would you like a free quote? You can submit details through our contact form or use our price calculator.",
  locations: "We proudly serve Langley, Surrey, Abbotsford, White Rock, Maple Ridge, Burnaby, and surrounding areas in the Fraser Valley.",
  contact: "You can reach us by phone at 778 808 7620, by email at info@bcpressurewashing.ca, or by filling out the contact form on this page.",
  hours: "We're available Monday-Friday from 8AM - 6PM and Saturday from 9AM - 5PM.",
  quote: "We offer free, no-obligation quotes for all our services. You can request one through our contact form or call us directly.",
  fallback: "Thanks for your question. For specific information, please give us a call at 778 808 7620 or fill out our contact form, and we'll get back to you promptly."
};

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! Ask me any questions about our pressure washing services.",
      isUser: false,
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    
    // Generate AI response
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 500);
  };

  const generateResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("hi") || lowerQuestion.includes("hello") || lowerQuestion.includes("hey")) {
      return RESPONSES.greeting;
    } else if (lowerQuestion.includes("service") || lowerQuestion.includes("offer") || lowerQuestion.includes("provide")) {
      return RESPONSES.services;
    } else if (lowerQuestion.includes("price") || lowerQuestion.includes("cost") || lowerQuestion.includes("how much")) {
      return RESPONSES.pricing;
    } else if (lowerQuestion.includes("area") || lowerQuestion.includes("location") || lowerQuestion.includes("where")) {
      return RESPONSES.locations;
    } else if (lowerQuestion.includes("contact") || lowerQuestion.includes("reach") || lowerQuestion.includes("phone") || lowerQuestion.includes("email")) {
      return RESPONSES.contact;
    } else if (lowerQuestion.includes("hours") || lowerQuestion.includes("time") || lowerQuestion.includes("open") || lowerQuestion.includes("available")) {
      return RESPONSES.hours;
    } else if (lowerQuestion.includes("quote") || lowerQuestion.includes("estimate")) {
      return RESPONSES.quote;
    } else {
      return RESPONSES.fallback;
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        text: "Hi there! Ask me any questions about our pressure washing services.",
        isUser: false,
      },
    ]);
    toast({
      title: "Chat cleared",
      description: "Your conversation has been reset.",
    });
  };

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end">
      {isOpen ? (
        <Card className="w-80 md:w-96 shadow-xl border border-gray-200 mb-4 animate-in slide-in-from-bottom-10 duration-300">
          <div className="bg-bc-red p-3 flex justify-between items-center rounded-t-lg">
            <div className="flex items-center gap-2 text-white">
              <Bot size={18} />
              <span className="font-medium">BC Pressure Washing Assistant</span>
            </div>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-white hover:bg-red-700"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </Button>
          </div>

          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-bc-red text-white rounded-tr-none'
                        : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
                    }`}
                  >
                    {!message.isUser && (
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="/lovable-uploads/761663e4-04b5-48f6-8d47-235fbec8008d.png" alt="BC Logo" />
                          <AvatarFallback>BC</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-gray-700">BC Assistant</span>
                      </div>
                    )}
                    <p className={`text-sm ${message.isUser ? 'text-white' : 'text-gray-800'}`}>
                      {message.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex gap-2">
              <Input
                placeholder="Type your question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" size="icon" className="bg-bc-red hover:bg-red-700">
                <Send size={18} />
              </Button>
            </form>

            <div className="px-3 pb-3 pt-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-gray-500 hover:text-gray-700"
                onClick={clearChat}
              >
                Clear chat
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button 
          className="rounded-full h-14 w-14 bg-bc-red hover:bg-red-700 shadow-lg animate-bounce"
          onClick={() => setIsOpen(true)}
          aria-label="Chat with AI assistant"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </Button>
      )}
    </div>
  );
};

export default ChatAssistant;
