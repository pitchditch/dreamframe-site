import React, { useState, useEffect, useRef } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

type MessageType = {
  type: 'user' | 'bot';
  text: string;
  isTyping?: boolean;
};

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [chatHistory, setChatHistory] = useState<MessageType[]>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [activeSuggestions, setActiveSuggestions] = useState<string[]>([]);
  const { t } = useTranslation();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestions = [
    t("Have a question?"),
    t("Need help with a quote?"),
    t("Want to learn more about our services?"),
    t("Looking for pricing information?"),
    t("Wondering about our availability?")
  ];

  // Common questions and answers for the bot
  const faqData = [
    // General Questions
    { question: "What areas do you serve?", answer: "We serve the entire Greater Vancouver area including Vancouver, Burnaby, Richmond, Surrey, Coquitlam, and surrounding areas." },
    { question: "How much does pressure washing cost?", answer: "Pricing varies based on the size of the area and the specific service needed. We offer free quotes - just call us at 778-808-7620 or use our quote calculator on the website." },
    { question: "Do you offer commercial services?", answer: "Yes! We provide pressure washing services for both residential and commercial properties, with specialized solutions for businesses." },
    { question: "How long does a typical job take?", answer: "Most residential jobs are completed in 1-4 hours, depending on the size of the property and services requested. Commercial jobs may take longer." },
    { question: "Is pressure washing safe for all surfaces?", answer: "Not all surfaces can handle the same pressure. We evaluate each surface and use appropriate techniques and equipment to ensure effective cleaning without damage." },
    { question: "Do you use eco-friendly cleaning solutions?", answer: "Yes, we use environmentally friendly cleaning solutions that effectively remove dirt, mold, and stains without harming your landscaping or the environment." },
    { question: "How often should I have my property pressure washed?", answer: "Most properties benefit from annual pressure washing, but this can vary based on your local environment. Areas with more moisture, shade, or organic debris may need cleaning more frequently." },
    { question: "Can you remove oil stains from my driveway?", answer: "Yes, we can remove most oil stains from driveways and other concrete surfaces using specialized cleaning solutions and techniques. For deep-set or older stains, we may recommend a two-step treatment process." },
    { question: "Do you offer any guarantees?", answer: "Absolutely! We stand behind our work with a 100% satisfaction guarantee. We don't consider the job complete until you're fully satisfied with the results." },
    { question: "What should I do to prepare for your service?", answer: "Before we arrive, please ensure the work area is clear of personal items, vehicles, and pets. Make sure water spigots are accessible and functioning if our service requires water access." },
    { question: "Can you clean my solar panels?", answer: "Yes, we offer specialized cleaning for solar panels that helps maintain their efficiency. We use gentle, non-abrasive cleaning methods that won't damage your panels." },
    { question: "What payment methods do you accept?", answer: "We accept cash, check, credit cards, e-transfer, and mobile payment options like Apple Pay and Google Pay for your convenience." },
    { question: "What services do you offer?", answer: "We specialize in pressure washing, window cleaning, gutter cleaning, and roof cleaning for both residential and commercial properties." },
    { question: "Do you offer free estimates?", answer: "Yes! Contact us today for a free, no-obligation estimate." },
    { question: "Are your cleaning methods safe for my home or business?", answer: "Absolutely! We use professional-grade, eco-friendly cleaning solutions that are safe for your property, landscaping, and pets." },
    { question: "How do I schedule a service?", answer: "You can schedule a service by calling us, filling out our online form, or messaging us here!" },
    { question: "How far in advance should I book a service?", answer: "We recommend booking at least a week in advance, but we do our best to accommodate last-minute requests!" },
    { question: "Can I bundle multiple services together?", answer: "Absolutely! We offer package deals for pressure washing, window cleaning, gutter cleaning, and roof cleaning." },
    { question: "Do you offer any warranties or guarantees?", answer: "Yes! We stand by our work with a 100% satisfaction guarantee. If you're not happy, we'll make it right." },
    { question: "What should I do to prepare for a cleaning service?", answer: "We recommend moving fragile items, vehicles, and outdoor furniture away from the cleaning area. For window cleaning, please ensure we have access to both inside and outside." },
    { question: "Do you offer seasonal or annual maintenance plans?", answer: "Yes! We offer scheduled maintenance plans to keep your home or business looking great year-round." },
    { question: "What makes your cleaning service different from others?", answer: "We take pride in our attention to detail, eco-friendly cleaning solutions, and customer satisfaction guarantee. Plus, we customize our approach based on your property's needs." },
    { question: "Do I need to be home for the service?", answer: "Not necessarily! As long as we have access to the areas that need cleaning, you can go about your day while we take care of everything." },
    { question: "How do I know if my property needs cleaning?", answer: "If you notice dirt, discoloration, mold, streaks, or clogged gutters, it's time for a professional cleaning. Regular maintenance prevents damage and costly repairs." },
    { question: "Do you work on weekends?", answer: "Yes, we offer flexible scheduling, including weekends, to accommodate your needs." },
    { question: "What payment methods do you accept?", answer: "We accept cash, credit/debit cards, and online payments for your convenience." },
    
    // Pressure Washing
    { question: "What surfaces can you pressure wash?", answer: "We clean driveways, sidewalks, patios, decks, fences, siding, and more!" },
    { question: "Will pressure washing damage my surfaces?", answer: "Not at all! We adjust pressure levels based on the surface to ensure a deep clean without damage." },
    { question: "How often should I pressure wash my property?", answer: "We recommend at least once a year to maintain your home's curb appeal and prevent buildup of dirt and mold." },
    { question: "Can pressure washing remove rust stains?", answer: "Yes! We use specialized cleaning solutions to safely remove rust stains from concrete, driveways, and other surfaces." },
    { question: "Is pressure washing safe for painted surfaces?", answer: "It depends on the paint and the surface. We use low-pressure techniques for painted areas to prevent chipping or peeling." },
    { question: "Can pressure washing help prevent slips and falls?", answer: "Absolutely! Removing algae, moss, and buildup from driveways, walkways, and patios reduces the risk of slipping." },
    { question: "Can you remove old gum from sidewalks?", answer: "Yes! Our high-pressure cleaning method effectively removes stuck-on gum from sidewalks and other surfaces." },
    { question: "How long does a pressure washing job take?", answer: "The time varies based on the size and condition of the area, but most jobs take 1–4 hours." },
    { question: "Can pressure washing remove oil stains from my driveway?", answer: "Yes! We use specialized cleaning solutions and high-pressure techniques to break down and remove oil stains effectively." },
    { question: "Will pressure washing help with pest problems?", answer: "Definitely! It can remove spider webs, wasp nests, and other insect buildups around your home or business." },
    { question: "Can I pressure wash my property myself?", answer: "While DIY pressure washing is possible, improper techniques can cause damage. Our professional service ensures a safe and thorough clean." },
    { question: "Do you use hot or cold water for pressure washing?", answer: "We use both, depending on the surface and the type of stain. Hot water is great for grease and oil, while cold water works well for general cleaning." },
    
    // Window Cleaning
    { question: "Do you clean both interior and exterior windows?", answer: "Yes! We offer streak-free cleaning for both interior and exterior windows." },
    { question: "What type of windows can you clean?", answer: "We clean all types, including standard windows, skylights, glass doors, and storefronts." },
    { question: "Do you use chemicals for window cleaning?", answer: "We use eco-friendly, streak-free cleaning solutions that are safe for your home and the environment." },
    { question: "Do you clean windows in cold weather?", answer: "Yes! We offer window cleaning year-round, using solutions that prevent freezing in colder months." },
    { question: "Do you remove screens before cleaning the windows?", answer: "Yes! We carefully remove screens, clean them separately, and reinstall them after the job." },
    { question: "Can you remove paint or sticker residue from windows?", answer: "Yes! We use safe techniques to remove paint splatters, adhesive residue, and other stubborn marks." },
    { question: "Do you clean window tracks and frames?", answer: "Yes! We don't just clean the glass—we also wipe down frames, sills, and tracks for a complete clean." },
    { question: "How often should I have my windows professionally cleaned?", answer: "We recommend every 3–6 months for homes and at least monthly for businesses." },
    { question: "Do you clean high-rise windows?", answer: "We specialize in low- to mid-rise buildings, but we can discuss options for taller structures." },
    { question: "How do you handle hard water stains on windows?", answer: "We use professional-grade solutions that break down mineral deposits and restore your glass to its original clarity." },
    { question: "Will window cleaning help reduce my energy bills?", answer: "Yes! Clean windows allow more natural light in, reducing the need for artificial lighting and improving energy efficiency." },
    
    // Gutter Cleaning
    { question: "Why is gutter cleaning important?", answer: "Clogged gutters can lead to water damage, roof leaks, and foundation issues. Regular cleaning helps prevent costly repairs." },
    { question: "How often should I clean my gutters?", answer: "At least twice a year—typically in the spring and fall." },
    { question: "Do you remove debris from my property after cleaning?", answer: "Yes! We make sure to clear out all debris and leave your property looking spotless." },
    { question: "Do you check for gutter damage while cleaning?", answer: "Yes! We inspect your gutters for leaks, cracks, or sagging and notify you of any issues we find." },
    { question: "What do you do with the debris you remove from gutters?", answer: "We bag up and dispose of all debris so your property is left clean and tidy." },
    { question: "Can you fix loose or damaged gutters?", answer: "While we specialize in cleaning, we can reattach loose gutters and advise on needed repairs." },
    { question: "How can I prevent my gutters from clogging so often?", answer: "We recommend installing gutter guards and scheduling regular cleanings to keep debris out." },
    { question: "Do I need to clean my gutters if I don't have trees near my house?", answer: "Yes! Leaves aren't the only problem—dirt, roof granules, and debris can still clog your gutters over time." },
    { question: "Can clogged gutters cause foundation damage?", answer: "Yes! Overflowing water from clogged gutters can erode your foundation and lead to cracks or leaks in your basement." },
    { question: "Do you install gutter guards?", answer: "Yes, we offer gutter guard installation to help minimize debris buildup and reduce the need for frequent cleaning." },
    { question: "What happens if I don't clean my gutters regularly?", answer: "You risk water damage, mold growth, pest infestations, and even structural issues over time." },
    
    // Roof Cleaning
    { question: "Why should I clean my roof?", answer: "Roof cleaning removes algae, moss, and debris, helping to extend your roof's lifespan and improve your home's appearance." },
    { question: "Do you use high-pressure washing on roofs?", answer: "No! We use a soft wash system to clean roofs safely without causing damage." },
    { question: "Will roof cleaning affect my shingles?", answer: "Not at all! Our gentle cleaning process protects shingles while effectively removing dirt and growth." },
    { question: "What are those black streaks on my roof?", answer: "Those are algae stains, which can damage your shingles over time. Our roof cleaning service safely removes them." },
    { question: "Will roof cleaning help lower my energy bills?", answer: "Yes! A clean roof reflects more sunlight, keeping your home cooler and reducing energy costs." },
    { question: "How do you clean a roof without damaging it?", answer: "We use a soft wash method, which applies a special cleaning solution at low pressure to remove stains and buildup without harming shingles." },
    { question: "Can you remove moss from my roof?", answer: "Yes! Our roof treatment safely removes moss and prevents regrowth." },
    { question: "How long will my roof stay clean after a professional cleaning?", answer: "Most roofs stay clean for 2–5 years, depending on environmental factors and maintenance." },
    { question: "Will roof cleaning help my home's resale value?", answer: "Absolutely! A clean roof enhances curb appeal and can make a great first impression for potential buyers." },
    { question: "Do you clean solar panels?", answer: "Yes! We provide safe cleaning for solar panels to ensure they work efficiently and generate maximum energy." },
    { question: "How long does a roof cleaning service take?", answer: "It depends on the size of the roof and the level of buildup, but most jobs take between 2–4 hours." },
    
    // Residential & Commercial Cleaning
    { question: "Do you clean both homes and businesses?", answer: "Yes! We provide professional cleaning services for residential properties, offices, storefronts, apartment complexes, and more." },
    { question: "Do you offer maintenance plans?", answer: "Yes! We offer routine cleaning plans to keep your home or business looking its best year-round." },
    { question: "Are you insured?", answer: "Absolutely! We are fully insured for your peace of mind." },
    { question: "Do you offer discounts for businesses with multiple locations?", answer: "Yes! We offer special pricing for businesses that need regular cleaning at multiple sites." },
    { question: "How does commercial window cleaning differ from residential?", answer: "Commercial cleaning often involves larger windows, higher access points, and more frequent service to maintain a professional appearance." },
    { question: "Do you offer cleaning for apartment complexes and HOAs?", answer: "Yes! We provide exterior cleaning services for residential communities, including common areas." },
    { question: "How can regular exterior cleaning benefit my business?", answer: "Clean storefronts and sidewalks create a positive first impression, attract customers, and help maintain property value." },
    { question: "Do you provide cleaning services for newly constructed buildings?", answer: "Yes! We offer post-construction cleaning to remove dirt, dust, and debris from new builds." },
    { question: "Do you offer after-hours cleaning for businesses?", answer: "Yes! We can clean your commercial property outside of business hours to minimize disruption." },
    { question: "Do you provide services for HOAs and apartment complexes?", answer: "Yes! We work with property managers and HOAs to maintain clean and attractive communities." },
    { question: "Can regular exterior cleaning help with allergies?", answer: "Yes! Removing mold, pollen, and dust from surfaces can improve air quality and reduce allergy symptoms." }
  ];

  // Dynamic suggested questions based on user input
  const updateSuggestedQuestions = (inputText: string) => {
    if (!inputText.trim()) {
      return [
        "What services do you offer?",
        "How much does pressure washing cost?",
        "Do you offer free estimates?",
        "How often should I clean my gutters?"
      ];
    }
    
    const inputLower = inputText.toLowerCase();
    const matchingQuestions = faqData
      .filter(faq => faq.question.toLowerCase().includes(inputLower))
      .map(faq => faq.question)
      .slice(0, 4);
    
    return matchingQuestions.length > 0 
      ? matchingQuestions 
      : [
          "What services do you offer?",
          "How much does pressure washing cost?",
          "Do you offer free estimates?",
          "How often should I clean my gutters?"
        ];
  };

  useEffect(() => {
    setActiveSuggestions(updateSuggestedQuestions(message));
  }, [message]);

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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

  const simulateTyping = (text: string, onComplete: () => void) => {
    let i = 0;
    const typing = setInterval(() => {
      if (i <= text.length) {
        setMessages(prev => {
          const newMessages = [...prev];
          // Update the last message's text with more characters
          if (newMessages.length > 0 && newMessages[newMessages.length - 1].isTyping) {
            newMessages[newMessages.length - 1].text = text.substring(0, i);
            if (i === text.length) {
              newMessages[newMessages.length - 1].isTyping = false;
              clearInterval(typing);
              onComplete();
            }
          }
          return newMessages;
        });
        i += Math.floor(Math.random() * 3) + 1; // Random typing speed
      } else {
        clearInterval(typing);
        onComplete();
      }
    }, 50);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const userMessage: MessageType = { type: 'user', text: message };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setMessage('');
    
    // Add a typing indicator
    setTimeout(() => {
      setMessages([...newMessages, { type: 'bot', text: "", isTyping: true }]);
      
      // Check if the user's message matches any FAQ
      const matchingFaq = faqData.find(faq => 
        message.toLowerCase().includes(faq.question.toLowerCase()) ||
        faq.question.toLowerCase().includes(message.toLowerCase())
      );
      
      const responseText = matchingFaq 
        ? matchingFaq.answer 
        : "Thanks for your question! For a personalized response, please call Jayden at 778-808-7620. We're eager to help with all your pressure washing needs!";
      
      // Simulate typing effect
      simulateTyping(responseText, () => {
        // This will be called when typing is complete
      });
    }, 500);
  };

  const handleSuggestedQuestion = (question: string) => {
    const userMessage: MessageType = { type: 'user', text: question };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    
    // Add a typing indicator
    setTimeout(() => {
      setMessages([...newMessages, { type: 'bot', text: "", isTyping: true }]);
      
      // Find the matching FAQ
      const matchingFaq = faqData.find(faq => 
        question.toLowerCase().includes(faq.question.toLowerCase()) ||
        faq.question.toLowerCase().includes(question.toLowerCase())
      );
      
      const responseText = matchingFaq 
        ? matchingFaq.answer 
        : "Thanks for your question! For a personalized response, please call Jayden at 778-808-7620. We're eager to help with all your pressure washing needs!";
      
      // Simulate typing effect
      simulateTyping(responseText, () => {
        // This will be called when typing is complete
      });
    }, 500);
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
    <div className="fixed bottom-6 right-6 md:right-10 z-50 flex items-end">
      {showSuggestion && !isOpen && (
        <div 
          className="chat-suggestion bg-white/60 backdrop-blur-md rounded-lg shadow-lg p-3 mb-3 text-sm max-w-xs animate-fade-in-right mr-4"
          style={{ 
            animation: 'fadeIn 0.5s ease-out, float 2s ease-in-out infinite',
            transformOrigin: 'center bottom'
          }}
        >
          {suggestions[currentSuggestion]}
        </div>
      )}
      
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 md:w-96 mb-3 mr-4 overflow-hidden animate-fade-in-up border border-gray-200">
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
          
          <div className="h-80 overflow-y-auto p-3 bg-gray-50" id="chat-messages">
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
                  {msg.isTyping && (
                    <span className="typing-indicator">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-2 border-t">
            <div className="mb-2 overflow-x-auto pb-2">
              <ToggleGroup type="single" className="inline-flex space-x-1 min-w-max">
                {activeSuggestions.map((question, index) => (
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
          
          <style jsx>{`
            .typing-indicator {
              display: inline-flex;
              align-items: center;
              margin-left: 5px;
            }
            .dot {
              width: 4px;
              height: 4px;
              border-radius: 50%;
              background-color: currentColor;
              margin: 0 1px;
              opacity: 0.7;
              animation: pulse 1.5s infinite;
            }
            .dot:nth-child(2) {
              animation-delay: 0.2s;
            }
            .dot:nth-child(3) {
              animation-delay: 0.4s;
            }
            @keyframes pulse {
              0%, 100% { opacity: 0.4; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.2); }
            }
          `}</style>
        </div>
      )}
      
      <Avatar 
        className="h-14 w-14 border-2 border-white shadow-lg cursor-pointer hover:scale-105 transition-transform"
        onClick={toggleChat}
      >
        <AvatarImage 
          src="/lovable-uploads/f2a8fb4d-7253-4cb8-a13c-30140d7ccaf4.png" 
          alt="Jayden Fisher" 
          className="object-cover"
        />
        <AvatarFallback>JF</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ChatAssistant;
