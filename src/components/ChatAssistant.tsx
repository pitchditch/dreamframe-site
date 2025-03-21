
import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, MessageSquare, CalendarRange, Phone } from "lucide-react";
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
  schedule: "We'd be happy to schedule a service for you! You can book an appointment by calling us at 778 808 7620, or I can help you schedule a call with our team. Would you like to schedule a call now?",
  scheduleCall: "Great! What's the best date and time for our team to call you? Also, could you provide your name and phone number so we can reach out to you?",
  fallback: "Thanks for your question. For specific information, please give us a call at 778 808 7620 or fill out our contact form, and we'll get back to you promptly."
};

// Service-specific questions suggestions
const QUESTION_SUGGESTIONS = {
  pressure: [
    "What surfaces can you pressure wash?",
    "Will pressure washing damage my surfaces?",
    "How often should I pressure wash my property?"
  ],
  window: [
    "Do you clean both interior and exterior windows?",
    "What type of windows can you clean?",
    "Do you use chemicals for window cleaning?"
  ],
  gutter: [
    "Why is gutter cleaning important?",
    "How often should I clean my gutters?",
    "Do you remove debris from my property after cleaning?"
  ],
  roof: [
    "Why should I clean my roof?",
    "Do you use high-pressure washing on roofs?",
    "Will roof cleaning affect my shingles?"
  ],
  commercial: [
    "Do you clean both homes and businesses?",
    "Do you offer maintenance plans?",
    "Are you insured?"
  ]
};

type Message = {
  id: string;
  text: string;
  isUser: boolean;
};

type CallbackInfo = {
  name: string;
  phone: string;
  date: string;
  time: string;
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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSchedulingCall, setIsSchedulingCall] = useState(false);
  const [callbackInfo, setCallbackInfo] = useState<CallbackInfo>({
    name: "",
    phone: "",
    date: "",
    time: ""
  });
  const [schedulingStep, setSchedulingStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    
    // If we're in scheduling mode, handle the scheduling flow
    if (isSchedulingCall) {
      handleSchedulingResponse(inputValue);
    } else {
      // Generate regular AI response
      generateResponse(inputValue);
    }
    
    setInputValue("");
    setSuggestions([]);
  };

  const generateResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    let response = "";
    
    // Determine the appropriate response
    if (lowerQuestion.includes("hi") || lowerQuestion.includes("hello") || lowerQuestion.includes("hey")) {
      response = RESPONSES.greeting;
    } else if (lowerQuestion.includes("service") || lowerQuestion.includes("offer") || lowerQuestion.includes("provide")) {
      response = RESPONSES.services;
    } else if (lowerQuestion.includes("price") || lowerQuestion.includes("cost") || lowerQuestion.includes("how much")) {
      response = RESPONSES.pricing;
    } else if (lowerQuestion.includes("area") || lowerQuestion.includes("location") || lowerQuestion.includes("where")) {
      response = RESPONSES.locations;
    } else if (lowerQuestion.includes("contact") || lowerQuestion.includes("reach") || lowerQuestion.includes("phone") || lowerQuestion.includes("email")) {
      response = RESPONSES.contact;
    } else if (lowerQuestion.includes("hours") || lowerQuestion.includes("time") || lowerQuestion.includes("open") || lowerQuestion.includes("available")) {
      response = RESPONSES.hours;
    } else if (lowerQuestion.includes("quote") || lowerQuestion.includes("estimate")) {
      response = RESPONSES.quote;
    } else if (lowerQuestion.includes("book") || lowerQuestion.includes("schedule") || lowerQuestion.includes("appointment")) {
      response = RESPONSES.schedule;
    } else {
      response = RESPONSES.fallback;
    }
    
    // Add AI response after a short delay
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
      
      // If the response was about scheduling, follow up with scheduling options
      if (response === RESPONSES.schedule) {
        setTimeout(() => {
          const schedulingPrompt = {
            id: (Date.now() + 2).toString(),
            text: "Would you like to schedule a callback from our team?",
            isUser: false,
          };
          setMessages((prev) => [...prev, schedulingPrompt]);
        }, 1000);
      }
    }, 500);
  };

  const handleSchedulingResponse = (input: string) => {
    const response = input.toLowerCase();
    
    // Logic for handling different steps of the scheduling process
    if (schedulingStep === 0) {
      // Collecting name
      setCallbackInfo(prev => ({ ...prev, name: input }));
      setSchedulingStep(1);
      
      setTimeout(() => {
        const nextPrompt = {
          id: Date.now().toString(),
          text: "Great! Now, what's your phone number?",
          isUser: false,
        };
        setMessages(prev => [...prev, nextPrompt]);
      }, 500);
    } else if (schedulingStep === 1) {
      // Collecting phone
      setCallbackInfo(prev => ({ ...prev, phone: input }));
      setSchedulingStep(2);
      
      setTimeout(() => {
        const nextPrompt = {
          id: Date.now().toString(),
          text: "Thanks! What date would you prefer for the callback?",
          isUser: false,
        };
        setMessages(prev => [...prev, nextPrompt]);
      }, 500);
    } else if (schedulingStep === 2) {
      // Collecting date
      setCallbackInfo(prev => ({ ...prev, date: input }));
      setSchedulingStep(3);
      
      setTimeout(() => {
        const nextPrompt = {
          id: Date.now().toString(),
          text: "What time works best for you?",
          isUser: false,
        };
        setMessages(prev => [...prev, nextPrompt]);
      }, 500);
    } else if (schedulingStep === 3) {
      // Collecting time and finalizing
      setCallbackInfo(prev => ({ ...prev, time: input }));
      setSchedulingStep(0);
      setIsSchedulingCall(false);
      
      // Confirmation message
      setTimeout(() => {
        const confirmationMessage = {
          id: Date.now().toString(),
          text: `Thank you! We've scheduled a callback for ${callbackInfo.name} at ${input} on ${callbackInfo.date}. We'll call you at ${callbackInfo.phone}. Is there anything else I can help you with?`,
          isUser: false,
        };
        setMessages(prev => [...prev, confirmationMessage]);
        
        // In a real implementation, this information would be sent to a backend
        toast({
          title: "Callback Scheduled",
          description: `A callback has been scheduled for ${callbackInfo.date} at ${input}.`,
        });
      }, 500);
    }
  };

  const startSchedulingCall = () => {
    setIsSchedulingCall(true);
    const scheduleMessage = {
      id: Date.now().toString(),
      text: "I'd like to schedule a callback.",
      isUser: true,
    };
    
    setMessages((prev) => [...prev, scheduleMessage]);
    
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: "Great! To schedule a callback, I'll need some information. What's your name?",
        isUser: false,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 500);
  };

  const selectSuggestion = (suggestion: string) => {
    const userMessage = {
      id: Date.now().toString(),
      text: suggestion,
      isUser: true,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setSuggestions([]);
    
    // Generate response for the selected suggestion
    setTimeout(() => {
      generateResponse(suggestion);
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Check if the input includes any service keywords and show relevant suggestions
    const lowerValue = value.toLowerCase();
    let newSuggestions: string[] = [];
    
    if (lowerValue.includes("pressure") || lowerValue.includes("wash")) {
      newSuggestions = QUESTION_SUGGESTIONS.pressure;
    } else if (lowerValue.includes("window")) {
      newSuggestions = QUESTION_SUGGESTIONS.window;
    } else if (lowerValue.includes("gutter")) {
      newSuggestions = QUESTION_SUGGESTIONS.gutter;
    } else if (lowerValue.includes("roof")) {
      newSuggestions = QUESTION_SUGGESTIONS.roof;
    } else if (lowerValue.includes("commercial") || lowerValue.includes("business")) {
      newSuggestions = QUESTION_SUGGESTIONS.commercial;
    } else {
      newSuggestions = [];
    }
    
    setSuggestions(newSuggestions);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        text: "Hi there! Ask me any questions about our pressure washing services.",
        isUser: false,
      },
    ]);
    setIsSchedulingCall(false);
    setSchedulingStep(0);
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
              <div ref={messagesEndRef} />
            </div>

            {suggestions.length > 0 && (
              <div className="p-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-md text-gray-700"
                      onClick={() => selectSuggestion(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-2 border-t border-gray-200">
              <Button
                variant="outline"
                size="sm"
                className="w-full mb-2 text-xs gap-1 bg-gray-50 hover:bg-gray-100"
                onClick={startSchedulingCall}
              >
                <CalendarRange size={14} />
                Schedule a callback
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs gap-1 bg-gray-50 hover:bg-gray-100"
                onClick={() => window.location.href = "tel:+17788087620"}
              >
                <Phone size={14} />
                Call us now: 778 808 7620
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex gap-2">
              <Input
                placeholder="Type your question..."
                value={inputValue}
                onChange={handleInputChange}
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
