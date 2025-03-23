
import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Phone, MessageCircle, Calendar, ArrowRight, HelpCircle, User, Info } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { extractInfoFromMessage, useChatFormData } from '@/hooks/use-chat-form-data';

type MessageType = {
  type: 'user' | 'bot';
  text: string;
  isTyping?: boolean;
};

type ChatStep = 
  | 'greeting' 
  | 'booking' 
  | 'qa' 
  | 'human-support' 
  | 'question-detail'
  | 'follow-up';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [chatHistory, setChatHistory] = useState<MessageType[]>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [activeSuggestions, setActiveSuggestions] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatStep>('greeting');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const { t } = useTranslation();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { formData, setFormValue, setServiceValue, clearFormData } = useChatFormData();

  const suggestions = [
    t("Have a question?"),
    t("Need help with a quote?"),
    t("Want to learn more about our services?"),
    t("Looking for pricing information?"),
    t("Wondering about our availability?")
  ];

  // Common questions and answers for the bot
  const faqData = [
    // Service Area Questions
    { question: "What areas do you serve?", answer: "We serve the entire Greater Vancouver area including Vancouver, Burnaby, Richmond, Surrey, Coquitlam, North Vancouver, West Vancouver, Langley, White Rock, Delta, and surrounding communities. Our service area extends from West Vancouver to Chilliwack and everywhere in between." },
    { question: "Do you service my area?", answer: "We service the entire Lower Mainland, from West Vancouver to Chilliwack, and from White Rock to Squamish. Please let us know your specific location, and we can confirm if we service your area." },
    { question: "Do you service Vancouver?", answer: "Yes! Vancouver is one of our primary service areas. We provide all our services throughout Vancouver." },
    { question: "Do you service Burnaby?", answer: "Yes! We regularly service Burnaby with all our cleaning services." },
    { question: "Do you service Surrey?", answer: "Absolutely! Surrey is within our service area, and we provide all our cleaning solutions there." },
    { question: "Do you service White Rock?", answer: "Yes, we provide all our services to White Rock and the surrounding South Surrey area." },
    { question: "Do you service Langley?", answer: "Yes, we regularly visit Langley for residential and commercial cleaning services." },
    { question: "Do you service North Vancouver?", answer: "Yes, North Vancouver is within our service area for all cleaning services." },
    { question: "Do you service West Vancouver?", answer: "Yes, we provide all our cleaning services to West Vancouver properties." },
    { question: "Do you service Richmond?", answer: "Yes, Richmond is one of our core service areas." },
    { question: "Do you service Coquitlam?", answer: "Yes, we regularly provide services to Coquitlam and the Tri-Cities area." },
    { question: "Do you service Delta?", answer: "Yes, Delta is within our service area for all cleaning services." },
    { question: "Do you service Abbotsford?", answer: "Yes, we extend our services to Abbotsford." },
    { question: "Do you service Whistler?", answer: "Yes, we do travel to Whistler for larger cleaning projects. Please note that there may be an additional travel fee for Whistler services." },
    
    // Quote and Pricing Questions
    { question: "How much does pressure washing cost?", answer: "Pricing varies based on the size of the area and the specific service needed. For a residential driveway, prices typically start at $250, while full house exteriors start at $350. We offer free quotes - just call us at 778-808-7620 or use our quote calculator on the website." },
    { question: "How much does window cleaning cost?", answer: "Window cleaning prices start at $199 for a small home and vary based on the number of windows, their accessibility, and condition. For an accurate quote, please use our calculator or call us directly." },
    { question: "How much does gutter cleaning cost?", answer: "Gutter cleaning starts at $149 for a small single-story home. The final price depends on the length of gutters, number of stories, and roof complexity. Use our online calculator for an instant estimate." },
    { question: "How much does roof cleaning cost?", answer: "Roof cleaning starts at $350 for small homes. The price varies based on roof size, pitch, accessibility, and the amount of moss/debris. Request a quote through our calculator for an accurate estimate." },
    { question: "How do I get a quote?", answer: "You can get a free quote in three ways: 1) Use our online calculator to get an instant estimate, 2) Call us directly at 778-808-7620, or 3) Click the 'Book Now' button here in the chat, and we'll guide you through the process." },
    { question: "Is the quote free?", answer: "Yes! All our quotes are completely free and no-obligation. We'll provide an accurate estimate based on your specific needs and property." },
    { question: "Can I get an on-site quote?", answer: "Absolutely! For more complex jobs, we're happy to provide an on-site estimate. This allows us to see your property firsthand and provide the most accurate quote possible." },
    { question: "Do you offer discounts?", answer: "Yes, we offer discounts for combined services (for example, booking window cleaning and gutter cleaning together). We also have a referral program where you can save 50% on your next service when you refer a friend." },
    
    // Available Services Questions
    { question: "What services do you offer?", answer: "We offer four main services: 1) Window Cleaning - streak-free interior and exterior cleaning for all window types, 2) Pressure Washing - for driveways, patios, decks, siding, and more, 3) Gutter Cleaning - thorough cleaning and unclogging of gutters, and 4) Roof Cleaning - moss removal and gentle cleaning for all roof types." },
    { question: "What services are available?", answer: "Our services include professional window cleaning, pressure washing, gutter cleaning, and roof cleaning for both residential and commercial properties. We can combine services for better value." },
    { question: "What's included in a window cleaning?", answer: "Our window cleaning service includes: cleaning all interior and exterior glass surfaces, wiping down frames and tracks, cleaning screens, and wiping down window sills. We use professional-grade tools and eco-friendly solutions for a streak-free finish." },
    { question: "What's included in a pressure washing service?", answer: "Our pressure washing service includes: thorough cleaning of specified surfaces using appropriate pressure levels, pre-treatment of stains or growth, environmentally friendly cleaning solutions when needed, and a final rinse. We can clean driveways, walkways, patios, decks, siding, and more." },
    { question: "What's included in a gutter cleaning?", answer: "Our gutter cleaning service includes: removal of all debris from gutters and downspouts, flushing the system to ensure proper water flow, checking for basic issues like loose brackets or minor leaks, and cleanup of all removed debris." },
    { question: "What's included in a roof cleaning?", answer: "Our roof cleaning service includes: removal of moss, algae, and debris using appropriate methods for your roof type, application of preventative treatments to discourage future growth (optional), and cleanup of all removed material. We use a soft wash technique that's safe for all roof materials." },
    { question: "Do you clean solar panels?", answer: "Yes! We offer specialized cleaning for solar panels that helps maintain their efficiency. We use gentle, non-abrasive cleaning methods that won't damage your panels but will remove dirt and debris that reduce their power generation." },
    { question: "Do you clean skylights?", answer: "Yes, we clean skylights as part of our window cleaning service. Skylights often collect more dirt and debris than vertical windows, so regular cleaning is important to maintain natural light in your home." },
    
    // Booking and Availability Questions
    { question: "How do I book a service?", answer: "You can book a service by using our online calculator/booking form, calling us at 778-808-7620, or clicking the 'Book Now' button here in this chat. We'll guide you through selecting your service, property details, and scheduling a convenient time." },
    { question: "What's your availability?", answer: "We typically book 1-2 weeks in advance during peak season (spring/summer) and have more immediate availability during fall/winter. For the most current availability, please call us or proceed with the online booking where you'll see available dates." },
    { question: "How far in advance should I book?", answer: "We recommend booking at least 1-2 weeks in advance to secure your preferred date and time, especially during our busy spring and summer seasons. For urgent needs, please call us directly as we sometimes have last-minute openings." },
    { question: "Do you work weekends?", answer: "Yes, we offer weekend appointments! We understand many homeowners prefer weekend service. Weekend slots fill up quickly, so we recommend booking those times well in advance." },
    { question: "Do you work year-round?", answer: "Yes! We provide our services year-round. While certain services like window cleaning and pressure washing are more popular in spring and summer, we can perform all our services throughout the year, weather permitting." },
    
    // Payment and Process Questions
    { question: "How does the process work?", answer: "Our process is simple: 1) Book your service online or by phone, 2) Receive confirmation and a reminder before your appointment, 3) Our professional team arrives at the scheduled time and completes the service, 4) We walk through the completed work with you to ensure your satisfaction, 5) Payment is collected after you're fully satisfied." },
    { question: "What payment methods do you accept?", answer: "We accept multiple payment methods for your convenience: cash, check, all major credit cards, debit cards, e-transfer, and mobile payment options like Apple Pay and Google Pay." },
    { question: "Do I need to be home for the service?", answer: "It depends on the service. For exterior-only services like pressure washing or gutter cleaning, you don't need to be present as long as we have access to water spigots and the areas to be cleaned. For window cleaning that includes interiors, someone should be home to provide access." },
    { question: "What happens if it rains on my service day?", answer: "If weather conditions prevent us from completing your service safely or effectively, we'll contact you to reschedule for the next available date that works for you. There's no charge for weather-related rescheduling." },
    { question: "Do you provide any guarantees?", answer: "Yes! We offer a satisfaction guarantee on all our services. We don't consider the job complete until you're fully satisfied with the results. If you notice any issues within 48 hours of service completion, we'll return to address them at no additional cost." },
    
    // Calculator-Related Questions
    { question: "What size is considered a small property?", answer: "A small property is typically up to 1,500 sq. ft. This usually includes smaller homes, townhouses, or condos with fewer windows and smaller exterior areas." },
    { question: "What size is considered a medium property?", answer: "A medium property is typically between 1,500-2,500 sq. ft. This includes average-sized single-family homes with a standard number of windows and exterior areas." },
    { question: "What size is considered a large property?", answer: "A large property is typically between 2,500-3,500 sq. ft. This includes larger single-family homes with more windows and extensive exterior areas." },
    { question: "What is an extra-large property?", answer: "An extra-large property is typically over 3,500 sq. ft. This includes mansions, estate homes, and properties with numerous windows and expansive exterior areas requiring more time and resources to clean." },
    { question: "What's the difference between residential and commercial services?", answer: "Residential services are tailored for homes and smaller properties, while commercial services are designed for businesses, storefronts, and larger buildings that may require different equipment, scheduling, and approaches." },
    { question: "Why do you need my contact information?", answer: "We collect your contact information to provide you with an accurate quote, confirm appointment details, send reminders, and follow up after service to ensure your satisfaction." },
    { question: "Do you need my full address for a quote?", answer: "Yes, having your full address helps us provide the most accurate quote as we can check your property on Google Maps, assess access issues, and determine travel distances. For very precise quotes, we might suggest an on-site assessment." },
    
    // Additional common questions
    { question: "Are your cleaning methods safe for my home or business?", answer: "Absolutely! We use professional-grade, eco-friendly cleaning solutions that are safe for your property, landscaping, and pets." },
    { question: "How do I schedule a service?", answer: "You can schedule a service by calling us, filling out our online form, or messaging us here!" },
    { question: "Can I bundle multiple services together?", answer: "Absolutely! We offer package deals for pressure washing, window cleaning, gutter cleaning, and roof cleaning." },
    { question: "Do you offer any warranties or guarantees?", answer: "Yes! We stand by our work with a 100% satisfaction guarantee. If you're not happy, we'll make it right." },
    { question: "What should I do to prepare for a cleaning service?", answer: "We recommend moving fragile items, vehicles, and outdoor furniture away from the cleaning area. For window cleaning, please ensure we have access to both inside and outside." },
    { question: "Do you offer seasonal or annual maintenance plans?", answer: "Yes! We offer scheduled maintenance plans to keep your home or business looking great year-round." },
    { question: "Are you insured?", answer: "Yes, we are fully insured for your peace of mind and protection." },
  ];

  // Suggested questions based on current step
  const getStepSuggestions = (step: ChatStep) => {
    switch (step) {
      case 'greeting':
        return [
          "Book a Service",
          "Ask a Question",
          "Talk to a Human"
        ];
      case 'qa':
        return [
          "What areas do you serve?",
          "What services do you offer?",
          "How much does it cost?",
          "How do I get a quote?"
        ];
      case 'follow-up':
        return [
          "Yes, Book Now",
          "Ask Another Question",
          "Talk to a Human"
        ];
      case 'human-support':
        return [
          "Call Us",
          "Leave a Message",
          "Go Back"
        ];
      default:
        return updateSuggestedQuestions(message);
    }
  };

  // Dynamic suggested questions based on user input
  const updateSuggestedQuestions = (inputText: string) => {
    if (!inputText.trim()) {
      return [
        "What services do you offer?",
        "What areas do you service?",
        "How much does it cost?",
        "How do I book a service?"
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
          "What areas do you service?",
          "How much does it cost?",
          "How do I book a service?"
        ];
  };

  useEffect(() => {
    if (currentStep === 'question-detail') {
      setActiveSuggestions(updateSuggestedQuestions(message));
    } else {
      setActiveSuggestions(getStepSuggestions(currentStep));
    }
  }, [message, currentStep]);

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
      setCurrentStep('greeting');
      setTimeout(() => {
        setMessages([
          { 
            type: 'bot', 
            text: "Hi! I'm Jayden from BC Pressure Washing. Looking to book a service or have a question? I can help with both." 
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

  // Process user messages for form data
  const processUserMessageForFormData = (text: string) => {
    const extractedData = extractInfoFromMessage(text);
    
    // Update form data store with extracted information
    Object.entries(extractedData).forEach(([key, value]) => {
      if (key === 'services' && Array.isArray(value)) {
        value.forEach(service => setServiceValue(service, true));
      } else if (key !== 'services') {
        setFormValue(key as any, value as any);
      }
    });
    
    // If we extracted useful information, let the user know
    if (Object.keys(extractedData).length > 0) {
      toast({
        title: "Information Saved",
        description: "We've saved your information for when you're ready to book.",
        duration: 3000,
      });
    }
  };

  const handleBookingOption = () => {
    setCurrentStep('booking');
    const newMessages = [...messages, { type: 'user' as const, text: "I'd like to book a service" }];
    
    setMessages(newMessages);
    
    // Add a typing indicator
    setTimeout(() => {
      setMessages([...newMessages, { type: 'bot' as const, text: "", isTyping: true }]);
      
      const responseText = "Great! Our online booking form will guide you through the process, including house size, service type, and date. Click below to get started.";
      
      // Simulate typing effect
      simulateTyping(responseText, () => {
        // This gets called when typing is complete
      });
    }, 500);
  };

  const handleQAOption = () => {
    setCurrentStep('qa');
    const newMessages = [...messages, { type: 'user' as const, text: "I have a question" }];
    
    setMessages(newMessages);
    
    // Add a typing indicator
    setTimeout(() => {
      setMessages([...newMessages, { type: 'bot' as const, text: "", isTyping: true }]);
      
      const responseText = "I can answer questions about our services, pricing, availability, and more. What do you need help with?";
      
      // Simulate typing effect
      simulateTyping(responseText, () => {
        // This gets called when typing is complete
      });
    }, 500);
  };

  const handleHumanSupportOption = () => {
    setCurrentStep('human-support');
    const newMessages = [...messages, { type: 'user' as const, text: "I'd like to speak with a human" }];
    
    setMessages(newMessages);
    
    // Add a typing indicator
    setTimeout(() => {
      setMessages([...newMessages, { type: 'bot' as const, text: "", isTyping: true }]);
      
      const responseText = "I'm happy to connect you with a team member. How would you like to chat?";
      
      // Simulate typing effect
      simulateTyping(responseText, () => {
        // This gets called when typing is complete
      });
    }, 500);
  };

  const redirectToCalculator = () => {
    // We'll redirect to the calculator with form data already in store
    navigate('/calculator');
    setIsOpen(false);
  };

  const handleFollowUpOption = (option: string) => {
    const newMessages = [...messages, { type: 'user' as const, text: option }];
    setMessages(newMessages);
    
    setTimeout(() => {
      setMessages([...newMessages, { type: 'bot' as const, text: "", isTyping: true }]);
      
      let responseText = "";
      
      if (option === "Yes, Book Now") {
        setCurrentStep('booking');
        responseText = "Great! I've prepared the booking form with the information you've shared. Click below to complete your booking.";
      } else if (option === "Ask Another Question") {
        setCurrentStep('qa');
        responseText = "I'm happy to answer more questions. What else would you like to know?";
      } else if (option === "Talk to a Human") {
        setCurrentStep('human-support');
        responseText = "I'm happy to connect you with a team member. How would you like to chat?";
      }
      
      simulateTyping(responseText, () => {});
    }, 500);
  };

  const handleHumanSupportDetailOption = (option: string) => {
    const newMessages = [...messages, { type: 'user' as const, text: option }];
    setMessages(newMessages);
    
    setTimeout(() => {
      setMessages([...newMessages, { type: 'bot' as const, text: "", isTyping: true }]);
      
      let responseText = "";
      
      if (option === "Call Us") {
        responseText = "You can reach us directly at 778-808-7620. We're available Monday to Saturday, 8am to 6pm.";
      } else if (option === "Leave a Message") {
        responseText = "Please visit our contact page to send us a message. We'll get back to you within 24 hours: https://bcpressurewashing.ca/contact";
      } else if (option === "Go Back") {
        setCurrentStep('greeting');
        responseText = "No problem! What would you like to do?";
      }
      
      simulateTyping(responseText, () => {});
    }, 500);
  };
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMessage = message;
    setMessage('');
    
    // Add user message to the chat
    const newMessages = [...messages, { type: 'user' as const, text: userMessage }];
    setMessages(newMessages);
    
    // Process the message for form data extraction
    processUserMessageForFormData(userMessage);
    
    // Find matching FAQs
    const lowerCaseMessage = userMessage.toLowerCase();
    const matchingFaq = faqData.find(faq => 
      faq.question.toLowerCase().includes(lowerCaseMessage) || 
      lowerCaseMessage.includes(faq.question.toLowerCase().replace(/\?/g, ''))
    );
    
    setCurrentStep('question-detail');
    
    // Add a typing indicator
    setTimeout(() => {
      setMessages([...newMessages, { type: 'bot' as const, text: "", isTyping: true }]);
      
      // If we found a matching FAQ, use that answer
      let responseText = "";
      
      if (matchingFaq) {
        responseText = matchingFaq.answer;
      } else {
        // Generic response if no match found
        responseText = "I don't have a specific answer for that question. Would you like to speak with one of our team members who can help you better? You can call us at 778-808-7620 or click 'Talk to a Human' below.";
      }
      
      // Add suggestions for follow-up based on the context
      responseText += "\n\nDoes that help with your question?";
      
      // Simulate typing effect
      simulateTyping(responseText, () => {
        setCurrentStep('follow-up');
      });
    }, 500);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    if (currentStep === 'greeting') {
      if (suggestion === "Book a Service") {
        handleBookingOption();
      } else if (suggestion === "Ask a Question") {
        handleQAOption();
      } else if (suggestion === "Talk to a Human") {
        handleHumanSupportOption();
      }
    } else if (currentStep === 'follow-up') {
      handleFollowUpOption(suggestion);
    } else if (currentStep === 'human-support') {
      handleHumanSupportDetailOption(suggestion);
    } else {
      // For QA or question-detail steps
      setMessage(suggestion);
      handleSendMessage();
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end">
      {/* Chat Trigger Button */}
      {!isOpen && showSuggestion && (
        <div className="mb-3 bg-white rounded-lg shadow-lg p-3 max-w-xs animate-fadeIn">
          <p className="text-gray-800">{suggestions[currentSuggestion]}</p>
        </div>
      )}
      
      <button
        onClick={toggleChat}
        className={`flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-gray-700 rotate-45' : 'bg-bc-red hover:bg-red-700'
        } h-14 w-14`}
      >
        {isOpen ? (
          <X className="text-white" size={24} />
        ) : (
          <MessageCircle className="text-white" size={24} />
        )}
      </button>
      
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl flex flex-col max-h-[80vh] border border-gray-200 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-bc-red text-white p-4 flex items-center">
            <Avatar className="h-8 w-8 mr-3">
              <AvatarImage src="/lovable-uploads/761663e4-04b5-48f6-8d47-235fbec8008d.png" alt="Logo" />
              <AvatarFallback>JF</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{t("BC Pressure Washing")}</h3>
              <p className="text-xs text-gray-100">{t("Usually responds in minutes")}</p>
            </div>
            <button onClick={toggleChat} className="ml-auto text-white hover:text-gray-200">
              <X size={20} />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50" style={{ maxHeight: 'calc(80vh - 180px)' }}>
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`mb-4 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.type === 'bot' && (
                  <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                    <AvatarImage src="/lovable-uploads/761663e4-04b5-48f6-8d47-235fbec8008d.png" alt="Agent" />
                    <AvatarFallback>JF</AvatarFallback>
                  </Avatar>
                )}
                <div 
                  className={`rounded-lg px-4 py-2 max-w-[85%] ${
                    msg.type === 'user' 
                      ? 'bg-bc-red text-white rounded-tr-none' 
                      : 'bg-gray-200 text-gray-800 rounded-tl-none'
                  } ${msg.isTyping ? 'animate-pulse' : ''}`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  {msg.isTyping && (
                    <div className="flex space-x-1 mt-1 justify-center items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  )}
                </div>
                {msg.type === 'user' && (
                  <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Suggested Questions or Actions */}
          {activeSuggestions.length > 0 && (
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex flex-wrap gap-2">
                {activeSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1.5 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Booking Button for booking step */}
          {currentStep === 'booking' && (
            <div className="p-3 border-t border-gray-200 bg-white">
              <Button 
                onClick={redirectToCalculator}
                className="w-full bg-bc-red hover:bg-red-700"
              >
                <Calendar className="mr-2" size={16} />
                Book Now
              </Button>
            </div>
          )}
          
          {/* Chat Input */}
          <div className="p-3 border-t border-gray-200 bg-white flex items-center">
            <input
              type="text"
              placeholder={t("Type your message...")}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-bc-red"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`ml-2 rounded-full w-10 h-10 flex items-center justify-center ${
                message.trim() ? 'bg-bc-red text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
