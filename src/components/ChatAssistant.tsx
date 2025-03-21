
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
  different: "We take pride in our attention to detail, eco-friendly cleaning solutions, and customer satisfaction guarantee. Plus, we customize our approach based on your property's needs.",
  presence: "Not necessarily! As long as we have access to the areas that need cleaning, you can go about your day while we take care of everything.",
  needsCleaning: "If you notice dirt, discoloration, mold, streaks, or clogged gutters, it's time for a professional cleaning. Regular maintenance prevents damage and costly repairs.",
  weekends: "Yes, we offer flexible scheduling, including weekends, to accommodate your needs.",
  payment: "We accept cash, credit/debit cards, and online payments for your convenience.",
  fallback: "Thanks for your question. For specific information, please give us a call at 778 808 7620 or fill out our contact form, and we'll get back to you promptly."
};

// Detailed responses for specific service questions
const DETAILED_RESPONSES = {
  // Pressure Washing
  oilStains: "Yes! We use specialized cleaning solutions and high-pressure techniques to break down and remove oil stains effectively.",
  pestProblems: "Definitely! It can remove spider webs, wasp nests, and other insect buildups around your home or business.",
  diyPressureWash: "While DIY pressure washing is possible, improper techniques can cause damage. Our professional service ensures a safe and thorough clean.",
  waterType: "We use both, depending on the surface and the type of stain. Hot water is great for grease and oil, while cold water works well for general cleaning.",
  surfaces: "We clean driveways, sidewalks, patios, decks, fences, siding, and more!",
  damageSurfaces: "Not at all! We adjust pressure levels based on the surface to ensure a deep clean without damage.",
  frequencyPressureWash: "We recommend at least once a year to maintain your home's curb appeal and prevent buildup of dirt and mold.",
  
  // Window Cleaning
  highRise: "We specialize in low- to mid-rise buildings, but we can discuss options for taller structures.",
  hardWater: "We use professional-grade solutions that break down mineral deposits and restore your glass to its original clarity.",
  energyBills: "Yes! Clean windows allow more natural light in, reducing the need for artificial lighting and improving energy efficiency.",
  interiorExterior: "Yes! We offer streak-free cleaning for both interior and exterior windows.",
  windowTypes: "We clean all types, including standard windows, skylights, glass doors, and storefronts.",
  windowChemicals: "We use eco-friendly, streak-free cleaning solutions that are safe for your home and the environment.",
  
  // Gutter Cleaning
  foundationDamage: "Yes! Overflowing water from clogged gutters can erode your foundation and lead to cracks or leaks in your basement.",
  gutterGuards: "Yes, we offer gutter guard installation to help minimize debris buildup and reduce the need for frequent cleaning.",
  neglectedGutters: "You risk water damage, mold growth, pest infestations, and even structural issues over time.",
  gutterImportance: "Clogged gutters can lead to water damage, roof leaks, and foundation issues. Regular cleaning helps prevent costly repairs.",
  cleaningFrequency: "At least twice a year—typically in the spring and fall.",
  debrisRemoval: "Yes! We make sure to clear out all debris and leave your property looking spotless.",
  
  // Roof Cleaning
  resaleValue: "Absolutely! A clean roof enhances curb appeal and can make a great first impression for potential buyers.",
  solarPanels: "Yes! We provide safe cleaning for solar panels to ensure they work efficiently and generate maximum energy.",
  serviceTime: "It depends on the size of the roof and the level of buildup, but most jobs take between 2–4 hours.",
  roofCleaning: "Roof cleaning removes algae, moss, and debris, helping to extend your roof's lifespan and improve your home's appearance.",
  highPressure: "No! We use a soft wash system to clean roofs safely without causing damage.",
  shingles: "Not at all! Our gentle cleaning process protects shingles while effectively removing dirt and growth.",
  
  // Commercial Services
  afterHours: "Yes! We can clean your commercial property outside of business hours to minimize disruption.",
  hoaServices: "Yes! We work with property managers and HOAs to maintain clean and attractive communities.",
  allergies: "Yes! Removing mold, pollen, and dust from surfaces can improve air quality and reduce allergy symptoms.",
  bothHomesBusiness: "Yes! We provide professional cleaning services for residential properties, offices, storefronts, apartment complexes, and more.",
  maintenancePlans: "Yes! We offer routine cleaning plans to keep your home or business looking its best year-round.",
  insurance: "Absolutely! We are fully insured for your peace of mind."
};

// Service-specific questions suggestions
const QUESTION_SUGGESTIONS = {
  pressure: [
    "What surfaces can you pressure wash?",
    "Will pressure washing damage my surfaces?",
    "How often should I pressure wash my property?",
    "Can pressure washing remove oil stains from my driveway?",
    "Will pressure washing help with pest problems?",
    "Can I pressure wash my property myself?",
    "Do you use hot or cold water for pressure washing?"
  ],
  window: [
    "Do you clean both interior and exterior windows?",
    "What type of windows can you clean?",
    "Do you use chemicals for window cleaning?",
    "Do you clean high-rise windows?",
    "How do you handle hard water stains on windows?",
    "Will window cleaning help reduce my energy bills?"
  ],
  gutter: [
    "Why is gutter cleaning important?",
    "How often should I clean my gutters?",
    "Do you remove debris from my property after cleaning?",
    "Can clogged gutters cause foundation damage?",
    "Do you install gutter guards?",
    "What happens if I don't clean my gutters regularly?"
  ],
  roof: [
    "Why should I clean my roof?",
    "Do you use high-pressure washing on roofs?",
    "Will roof cleaning affect my shingles?",
    "Will roof cleaning help my home's resale value?",
    "Do you clean solar panels?",
    "How long does a roof cleaning service take?"
  ],
  commercial: [
    "Do you clean both homes and businesses?",
    "Do you offer maintenance plans?",
    "Are you insured?",
    "Do you offer after-hours cleaning for businesses?",
    "Do you provide services for HOAs and apartment complexes?",
    "Can regular exterior cleaning help with allergies?"
  ],
  general: [
    "What services do you offer?",
    "Do you offer free estimates?",
    "Are your cleaning methods safe for my home or business?",
    "How do I schedule a service?",
    "What makes your cleaning service different from others?",
    "Do I need to be home for the service?",
    "How do I know if my property needs cleaning?",
    "Do you work on weekends?",
    "What payment methods do you accept?"
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
    
    // Helper function to find a match in detailed responses
    const findDetailedResponse = () => {
      // Pressure washing specific questions
      if (lowerQuestion.includes("oil stain")) return DETAILED_RESPONSES.oilStains;
      if (lowerQuestion.includes("pest") || lowerQuestion.includes("spider") || lowerQuestion.includes("insect")) return DETAILED_RESPONSES.pestProblems;
      if ((lowerQuestion.includes("diy") || lowerQuestion.includes("myself") || lowerQuestion.includes("self")) && lowerQuestion.includes("pressure")) return DETAILED_RESPONSES.diyPressureWash;
      if (lowerQuestion.includes("hot") || lowerQuestion.includes("cold") || lowerQuestion.includes("water type")) return DETAILED_RESPONSES.waterType;
      if (lowerQuestion.includes("surface") && lowerQuestion.includes("pressure")) return DETAILED_RESPONSES.surfaces;
      if (lowerQuestion.includes("damage") && lowerQuestion.includes("pressure")) return DETAILED_RESPONSES.damageSurfaces;
      if (lowerQuestion.includes("often") && lowerQuestion.includes("pressure")) return DETAILED_RESPONSES.frequencyPressureWash;
      
      // Window cleaning specific questions
      if (lowerQuestion.includes("high") && lowerQuestion.includes("rise")) return DETAILED_RESPONSES.highRise;
      if (lowerQuestion.includes("hard water") || lowerQuestion.includes("mineral")) return DETAILED_RESPONSES.hardWater;
      if (lowerQuestion.includes("energy") || lowerQuestion.includes("bill")) return DETAILED_RESPONSES.energyBills;
      if ((lowerQuestion.includes("interior") || lowerQuestion.includes("inside")) && (lowerQuestion.includes("exterior") || lowerQuestion.includes("outside")) && lowerQuestion.includes("window")) return DETAILED_RESPONSES.interiorExterior;
      if (lowerQuestion.includes("type") && lowerQuestion.includes("window")) return DETAILED_RESPONSES.windowTypes;
      if ((lowerQuestion.includes("chemical") || lowerQuestion.includes("solution")) && lowerQuestion.includes("window")) return DETAILED_RESPONSES.windowChemicals;
      
      // Gutter cleaning specific questions
      if (lowerQuestion.includes("foundation") && lowerQuestion.includes("damage")) return DETAILED_RESPONSES.foundationDamage;
      if (lowerQuestion.includes("guard") && lowerQuestion.includes("gutter")) return DETAILED_RESPONSES.gutterGuards;
      if ((lowerQuestion.includes("neglect") || lowerQuestion.includes("don't") || lowerQuestion.includes("dont")) && lowerQuestion.includes("gutter")) return DETAILED_RESPONSES.neglectedGutters;
      if ((lowerQuestion.includes("important") || lowerQuestion.includes("why")) && lowerQuestion.includes("gutter")) return DETAILED_RESPONSES.gutterImportance;
      if ((lowerQuestion.includes("often") || lowerQuestion.includes("frequency")) && lowerQuestion.includes("gutter")) return DETAILED_RESPONSES.cleaningFrequency;
      if (lowerQuestion.includes("debris") && lowerQuestion.includes("gutter")) return DETAILED_RESPONSES.debrisRemoval;
      
      // Roof cleaning specific questions
      if (lowerQuestion.includes("resale") || lowerQuestion.includes("value") || lowerQuestion.includes("sell")) return DETAILED_RESPONSES.resaleValue;
      if (lowerQuestion.includes("solar")) return DETAILED_RESPONSES.solarPanels;
      if ((lowerQuestion.includes("long") || lowerQuestion.includes("time") || lowerQuestion.includes("duration")) && lowerQuestion.includes("roof")) return DETAILED_RESPONSES.serviceTime;
      if ((lowerQuestion.includes("why") || lowerQuestion.includes("reason")) && lowerQuestion.includes("roof")) return DETAILED_RESPONSES.roofCleaning;
      if (lowerQuestion.includes("high") && lowerQuestion.includes("pressure") && lowerQuestion.includes("roof")) return DETAILED_RESPONSES.highPressure;
      if (lowerQuestion.includes("shingle")) return DETAILED_RESPONSES.shingles;
      
      // Commercial services specific questions
      if (lowerQuestion.includes("after") && (lowerQuestion.includes("hour") || lowerQuestion.includes("business"))) return DETAILED_RESPONSES.afterHours;
      if (lowerQuestion.includes("hoa") || lowerQuestion.includes("apartment") || lowerQuestion.includes("complex")) return DETAILED_RESPONSES.hoaServices;
      if (lowerQuestion.includes("allerg")) return DETAILED_RESPONSES.allergies;
      if ((lowerQuestion.includes("home") && lowerQuestion.includes("business")) || (lowerQuestion.includes("residential") && lowerQuestion.includes("commercial"))) return DETAILED_RESPONSES.bothHomesBusiness;
      if (lowerQuestion.includes("maintenance") || lowerQuestion.includes("plan") || lowerQuestion.includes("routine")) return DETAILED_RESPONSES.maintenancePlans;
      if (lowerQuestion.includes("insur") || lowerQuestion.includes("liabil")) return DETAILED_RESPONSES.insurance;
      
      return null;
    };
    
    // Check for detailed responses first
    const detailedResponse = findDetailedResponse();
    if (detailedResponse) {
      response = detailedResponse;
    } 
    // If no detailed response, check general responses
    else if (lowerQuestion.includes("hi") || lowerQuestion.includes("hello") || lowerQuestion.includes("hey")) {
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
    } else if (lowerQuestion.includes("different") || lowerQuestion.includes("unique") || lowerQuestion.includes("special")) {
      response = RESPONSES.different;
    } else if (lowerQuestion.includes("home") && (lowerQuestion.includes("presence") || lowerQuestion.includes("be there"))) {
      response = RESPONSES.presence;
    } else if (lowerQuestion.includes("need") && lowerQuestion.includes("cleaning")) {
      response = RESPONSES.needsCleaning;
    } else if (lowerQuestion.includes("weekend")) {
      response = RESPONSES.weekends;
    } else if (lowerQuestion.includes("payment") || lowerQuestion.includes("pay") || lowerQuestion.includes("accept")) {
      response = RESPONSES.payment;
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
    } else if (lowerValue.length > 0) {
      // Show general questions if typing but no specific service mentioned
      newSuggestions = QUESTION_SUGGESTIONS.general.slice(0, 3);
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
