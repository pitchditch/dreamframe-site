import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MessageCircle, Send, X, HelpCircle } from 'lucide-react';
import { Input } from './ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

const ChatAssistant = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showQuestionMark, setShowQuestionMark] = useState(true);
  const [messages, setMessages] = useState<{text: string, fromUser: boolean}[]>([
    {text: "Hi there! I'm Jayden, the owner of BC Pressure Washing. How can I help you today?", fromUser: false}
  ]);
  const [newMessage, setNewMessage] = useState('');
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const faqSection = document.querySelector('#faq-section');
      if (faqSection) {
        const rect = faqSection.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom >= 0);
        if (rect.top < window.innerHeight && !showTooltip) {
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 3000);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  // Hide question mark when suggestions are shown or chat is open
  useEffect(() => {
    setShowQuestionMark(!showSuggestions && !isOpen);
  }, [showSuggestions, isOpen]);

  // Chat suggestions with prepared answers
  const suggestionsData = [
    {
      question: "How do you clean windows without streaks?",
      answer: "We use a professional-grade water-fed pole system with pure water technology. This allows us to clean windows without using chemicals, leaving no streaks or residue. For higher windows, we use squeegees and microfiber cloths with eco-friendly cleaning solutions."
    },
    {
      question: "How often should I pressure wash my home?",
      answer: "For homes in the Surrey and White Rock area, we recommend pressure washing your home's exterior once a year to prevent buildup of moss, algae, and dirt. However, north-facing surfaces or homes surrounded by trees may benefit from cleaning every 6-8 months due to faster growth of organic material."
    },
    {
      question: "What's your roof cleaning process?",
      answer: "We use a soft washing technique for roof cleaning that's safe for all roof types. We apply a biodegradable cleaning solution that kills moss and algae at the root, then gently rinse without high pressure to protect your shingles. This method provides longer-lasting results than pressure washing alone."
    },
    {
      question: "Do you offer commercial services?",
      answer: "Yes, we provide comprehensive commercial cleaning services including storefront window cleaning, building exterior washing, parking lot cleaning, and regular maintenance programs. We work with businesses of all sizes and can schedule services outside business hours for minimal disruption."
    },
    {
      question: "What sets your service apart from others?",
      answer: "Unlike other companies, we're fully insured, use commercial-grade equipment, environmentally friendly cleaning products, and have specialized training for different surfaces. Plus, as the owner, I personally inspect every job to ensure our high standards are met. We also offer a satisfaction guarantee on all our services."
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {text: newMessage, fromUser: true}]);
    setNewMessage('');
    
    // Find a matching prepared answer or use a default response
    setTimeout(() => {
      const lowerCaseMessage = newMessage.toLowerCase();
      const matchingSuggestion = suggestionsData.find(suggestion => 
        lowerCaseMessage.includes(suggestion.question.toLowerCase().split(' ').slice(0, 3).join(' '))
      );
      
      const response = matchingSuggestion ? 
        matchingSuggestion.answer : 
        "Thanks for your question! I'd be happy to help with that. Could you provide a few more details so I can better assist you?";
      
      setMessages(prev => [...prev, {text: response, fromUser: false}]);
    }, 1000);
  };

  // Function to handle clicking on a suggestion
  const handleSuggestionClick = (suggestion: string) => {
    setMessages(prev => [...prev, {text: suggestion, fromUser: true}]);
    setIsOpen(true);
    setShowSuggestions(false);
    
    // Get the corresponding answer for this suggestion
    setTimeout(() => {
      const matchingSuggestion = suggestionsData.find(item => item.question === suggestion);
      const response = matchingSuggestion ? 
        matchingSuggestion.answer : 
        "Thanks for your question! I'd be happy to help with that. Could you provide a few more details so I can better assist you?";
      
      setMessages(prev => [...prev, {text: response, fromUser: false}]);
    }, 1000);
  };

  return (
    <>
      {showTooltip && (
        <div className="fixed bottom-24 right-8 bg-white rounded-lg shadow-lg p-4 z-50 animate-fade-in">
          <p className="text-sm">Got questions? Let's chat! 👋</p>
        </div>
      )}
      {/* Transparent Chat Suggestions */}
      {showSuggestions && (
        <div 
          className="fixed bottom-24 right-8 bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-lg p-4 z-40 max-w-xs animate-fade-in"
          onMouseLeave={() => setShowSuggestions(false)}
        >
          <p className="text-sm font-medium text-gray-700 mb-2">Need help? Ask me:</p>
          <div className="space-y-2">
            {suggestionsData.slice(0, 3).map((suggestion, idx) => (
              <button 
                key={idx} 
                onClick={() => handleSuggestionClick(suggestion.question)}
                className="text-sm w-full text-left px-3 py-2 rounded bg-white hover:bg-gray-50 border border-gray-200 transition-all hover:shadow-md"
              >
                {suggestion.question}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Floating Chat Button - Made Larger with Overlapping Question Mark */}
      <Button 
        onClick={() => {
          setIsOpen(true);
          setShowSuggestions(false);
        }} 
        className="fixed bottom-6 right-6 h-16 w-16 md:h-20 md:w-20 rounded-full shadow-lg p-0 overflow-visible bg-white hover:bg-gray-100 z-50 chat-button group"
        onMouseEnter={() => setShowSuggestions(true)}
      >
        <Avatar className="h-full w-full border-3 border-bc-red relative">
          <AvatarImage src="/lovable-uploads/f69ce980-a64c-43c2-9d3b-7a93c47e127b.png" alt="Jayden" className="object-cover" />
          <AvatarFallback className="bg-bc-red text-white text-sm">BC</AvatarFallback>
        </Avatar>
        
        {/* Pulsing question mark that shows when not hovering and chat is closed */}
        {showQuestionMark && (
          <div className="absolute -top-2 -right-2 bg-bc-red rounded-full h-7 w-7 flex items-center justify-center shadow-md animate-pulse z-10">
            <HelpCircle className="text-white h-5 w-5" />
          </div>
        )}
      </Button>
      
      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] md:max-w-[550px] p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-bc-red text-white">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-white">
                <AvatarImage src="/lovable-uploads/f69ce980-a64c-43c2-9d3b-7a93c47e127b.png" alt="Jayden" className="object-cover" />
                <AvatarFallback className="bg-white text-bc-red text-xs">BC</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-xl">Chat with BC Pressure Washing</DialogTitle>
                <p className="text-sm text-white/80">Customer Support</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)} 
              className="absolute right-4 top-4 text-white hover:bg-red-700/50 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </DialogHeader>
          
          <div className="flex flex-col h-[450px] md:h-[500px]">
            {/* Messages Area */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.fromUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.fromUser && (
                    <Avatar className="w-10 h-10 mr-2 mt-1 flex-shrink-0">
                      <AvatarImage src="/lovable-uploads/f69ce980-a64c-43c2-9d3b-7a93c47e127b.png" alt="Jayden" className="object-cover" />
                      <AvatarFallback className="bg-bc-red text-white text-xs">BC</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div 
                    className={`rounded-lg px-4 py-3 max-w-[80%] text-base ${
                      message.fromUser 
                        ? 'bg-bc-red text-white rounded-tr-none' 
                        : 'bg-gray-200 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Suggestions - show only for first few messages */}
            {messages.length < 3 && (
              <div className="p-3 border-t bg-gray-50">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestionsData.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion.question)}
                      className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      {suggestion.question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 text-base"
              />
              <Button type="submit" size="icon" className="bg-bc-red hover:bg-red-700 h-12 w-12">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatAssistant;
