import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { MessageCircle, X, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: "Hi there! I'm Jayden, how can I help you today?", timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatMessages = ["Have any questions?", "I'm here to help!", "Ask me anything about our services", "Get instant answers here"];
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample FAQ responses for the demonstration
  const faqResponses: Record<string, string> = {
    "window cleaning": "Our window cleaning services start at $149 for an average-sized home. We use pure water technology for streak-free results and offer both interior and exterior cleaning. Would you like me to help you get a custom quote?",
    "price": "Prices vary based on the specific service, property size, and condition. For window cleaning, prices start at $149, gutter cleaning starts at $129, and pressure washing services begin at $199. I'd be happy to help you get a custom quote for your property!",
    "gutter cleaning": "Our professional gutter cleaning service removes all debris, tests downspouts for proper flow, and includes a complete exterior rinse. Prices start at $129 for single-story homes. Would you like to schedule a service?",
    "pressure washing": "We offer pressure washing for driveways, siding, patios, and more. Our equipment uses appropriate pressure levels for each surface to avoid damage. Prices start at $199 depending on the area size and condition. Do you have a specific area needing cleaning?",
    "quote": "I'd be happy to help you get a quote! You can either use our online calculator to get an instant estimate, or I can take your information now and have Jayden contact you personally. Which would you prefer?",
    "same-day": "We offer same-day emergency service when available. For urgent requests, I recommend calling us directly at (778) 808-7620. Would you like me to check if we have any same-day availability?",
    "service area": "We proudly serve White Rock, Surrey, Langley, Delta, Abbotsford, and throughout the Lower Mainland. Our service vehicle is that distinctive red car you might have seen around White Rock! Is your property within our service area?",
    "hello": "Hello! Welcome to BC Pressure Washing. I'm here to answer any questions about our services. What can I help you with today?",
    "hi": "Hi there! How can I assist you with our exterior cleaning services today?",
    "contact": "You can reach us by phone at (778) 808-7620, email at info@bcpressurewashing.com, or through our contact form on the website. Would you like me to help you schedule a service or get a quote?",
    "eco-friendly": "Yes, we use environmentally friendly and biodegradable cleaning solutions that are safe for your property, family, pets, and surrounding plants while still delivering excellent cleaning results.",
    "damaged": "Our technicians are professionally trained to use appropriate pressure levels for different surfaces to prevent damage. For delicate areas, we employ soft washing techniques that effectively clean without causing harm.",
    "schedule": "You can schedule a service through our online booking form, by calling us directly at (778) 808-7620, or I can take your information now and have someone contact you to confirm a time. What works best for you?",
    "guarantee": "Yes! We stand behind our work with a 100% satisfaction guarantee. If you're not completely satisfied with our service, we'll return to address any issues at no additional cost.",
    "payment": "We accept multiple payment methods including credit cards, e-transfers, and cash. Payment is typically due upon completion of the service, though we may require a deposit for larger projects.",
    "appointment": "To schedule an appointment, you can use our online booking form, call (778) 808-7620, or I can take your information now. What service are you interested in scheduling?",
    "commercial": "Yes, we offer commercial services for businesses, strata properties, and multi-unit buildings including window cleaning, pressure washing, and building maintenance. Would you like information about our commercial services?"
  };

  useEffect(() => {
    const handleScroll = () => {
      // Find FAQ section specifically
      const faqSection = document.querySelector('h2')?.textContent?.includes('Frequently Asked Questions') ? 
        document.querySelector('h2')?.closest('section') : null;
        
      if (faqSection) {
        const faqRect = faqSection.getBoundingClientRect();
        // Show when FAQ section enters viewport
        if (faqRect.top <= window.innerHeight && faqRect.bottom >= 0) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        // If there's no FAQ section, show when user scrolls down 70% of the page
        if (window.scrollY > document.body.scrollHeight * 0.7) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    // Message rotation interval
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % chatMessages.length);
    }, 3000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(messageInterval);
    };
  }, [chatMessages.length]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage = {
      type: 'user' as const,
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const response = generateResponse(userMessage.content);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: response,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    // Add user question
    const userMessage = {
      type: 'user' as const,
      content: question,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const response = generateResponse(question);
      setMessages(prev => [...prev, {
        type: 'bot',
        content: response,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 800);
  };

  // Generate responses based on user input
  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Check for matches in FAQ responses
    for (const [keyword, response] of Object.entries(faqResponses)) {
      if (lowerInput.includes(keyword.toLowerCase())) {
        return response;
      }
    }
    
    // Check for specific patterns
    if (lowerInput.includes('cost') || lowerInput.includes('how much') || lowerInput.includes('price')) {
      return faqResponses.price;
    }
    
    if (lowerInput.includes('book') || lowerInput.includes('schedule') || lowerInput.includes('appointment')) {
      return faqResponses.schedule;
    }
    
    if (lowerInput.includes('safe') || lowerInput.includes('damage') || lowerInput.includes('harm')) {
      return faqResponses.damaged;
    }
    
    if (lowerInput.includes('today') || lowerInput.includes('tomorrow') || lowerInput.includes('emergency')) {
      return faqResponses["same-day"];
    }
    
    // Default response if no matches
    return "Thanks for your message! That's a great question about our services. For the most accurate information, I recommend calling us at (778) 808-7620 or filling out our contact form. Would you like me to help you with anything else?";
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-24 left-6 z-20">
      <Button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`chat-button rounded-full p-6 shadow-lg bg-transparent ${isOpen ? 'hover:bg-bc-red/10' : 'hover:bg-transparent'}`} 
        size="lg"
      >
        {isOpen ? (
          <div className="relative bg-white rounded-full p-2 shadow-lg border-2 border-bc-red">
            <X className="h-6 w-6 text-bc-red" />
          </div>
        ) : (
          <div className="relative">
            <img 
              alt="Chat Assistant" 
              className="h-20 w-20 rounded-full border-2 border-white shadow-md" 
              src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png" 
            />
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs px-1 rounded-full animate-pulse">
              1
            </div>
          </div>
        )}
      </Button>

      {!isOpen && (
        <div className="absolute bottom-24 left-0 bg-white rounded-lg shadow-lg p-3 max-w-[250px] animate-fade-in">
          <p className="text-sm">{chatMessages[messageIndex]}</p>
        </div>
      )}

      {isOpen && (
        <div className="absolute bottom-24 left-0 w-[350px] bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-bc-red p-4">
            <div className="flex items-center gap-3">
              <img 
                alt="Chat Assistant" 
                className="h-10 w-10 rounded-full border-2 border-white" 
                src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png" 
              />
              <div>
                <h4 className="font-semibold text-white">Chat with Jayden</h4>
                <p className="text-xs text-white/80">BC Pressure Washing</p>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] overflow-y-auto p-4" style={{ scrollBehavior: 'smooth' }}>
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-3 ${msg.type === 'user' ? 'text-right' : ''}`}
              >
                <div 
                  className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    msg.type === 'user' 
                      ? 'bg-bc-red text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-1 p-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 bg-gray-50">
            <div className="flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-bc-red"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-bc-red text-white py-2 px-4 rounded-r-lg hover:bg-red-700 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
          
          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2 font-medium">Common Questions:</p>
            <div className="space-y-2">
              <button 
                onClick={() => handleQuickQuestion("How much does window cleaning cost?")}
                className="w-full text-left text-sm bg-white p-2 rounded border border-gray-200 hover:bg-gray-50"
              >
                How much does window cleaning cost?
              </button>
              <button 
                onClick={() => handleQuickQuestion("Do you offer same-day service?")}
                className="w-full text-left text-sm bg-white p-2 rounded border border-gray-200 hover:bg-gray-50"
              >
                Do you offer same-day service?
              </button>
              <button 
                onClick={() => handleQuickQuestion("What areas do you service?")}
                className="w-full text-left text-sm bg-white p-2 rounded border border-gray-200 hover:bg-gray-50"
              >
                What areas do you service?
              </button>
            </div>
            
            <div className="mt-3 text-center">
              <Link to="/contact" className="text-sm text-bc-red hover:underline">
                Contact a real person →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
