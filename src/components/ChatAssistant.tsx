
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageCircle, Send, X } from 'lucide-react';
import { Input } from './ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [messages, setMessages] = useState<{text: string, fromUser: boolean}[]>([
    {text: "Hi there! I'm Jayden, the owner of BC Pressure Washing. How can I help you today?", fromUser: false}
  ]);
  const [newMessage, setNewMessage] = useState('');
  const isMobile = useIsMobile();

  // Show suggestions when hovering over chat button (desktop only)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && !isMobile) {
        setShowSuggestions(true);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [isOpen, isMobile]);

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
      {/* Transparent Chat Suggestions (desktop only) */}
      {showSuggestions && !isMobile && (
        <div 
          className="fixed bottom-24 right-28 bg-white bg-opacity-70 backdrop-blur-sm rounded-lg shadow-lg p-4 z-40 max-w-xs animate-fade-in"
          onMouseLeave={() => setShowSuggestions(false)}
          style={{ bottom: '100px', right: '100px' }} // Position away from special offers button
        >
          <p className="text-sm font-medium text-gray-700 mb-2">Need help? Ask me:</p>
          <div className="space-y-2">
            {suggestionsData.slice(0, 3).map((suggestion, idx) => (
              <button 
                key={idx} 
                onClick={() => handleSuggestionClick(suggestion.question)}
                className="text-sm w-full text-left px-3 py-2 rounded bg-white bg-opacity-80 hover:bg-opacity-100 border border-gray-200 transition-all hover:shadow-md"
              >
                {suggestion.question}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Floating Chat Button */}
      <Button 
        onClick={() => {
          setIsOpen(true);
          setShowSuggestions(false);
        }} 
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg p-0 overflow-hidden bg-white hover:bg-gray-100 z-50 chat-button"
        onMouseEnter={() => {
          if (!isMobile) setShowSuggestions(true);
        }}
      >
        <Avatar className="h-full w-full border-2 border-bc-red">
          <AvatarImage src="/lovable-uploads/f69ce980-a64c-43c2-9d3b-7a93c47e127b.png" alt="Jayden" className="object-cover" />
          <AvatarFallback className="bg-bc-red text-white text-xs">BC</AvatarFallback>
        </Avatar>
      </Button>
      
      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-bc-red text-white">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src="/lovable-uploads/f69ce980-a64c-43c2-9d3b-7a93c47e127b.png" alt="Jayden" className="object-cover" />
                <AvatarFallback className="bg-white text-bc-red text-xs">BC</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle>Chat with BC Pressure Washing</DialogTitle>
                <p className="text-xs text-white/80">Customer Support</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)} 
              className="absolute right-4 top-4 text-white hover:bg-red-700/50 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <div className="flex flex-col h-[400px]">
            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.fromUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.fromUser && (
                    <Avatar className="w-8 h-8 mr-2 mt-1 flex-shrink-0">
                      <AvatarImage src="/lovable-uploads/f69ce980-a64c-43c2-9d3b-7a93c47e127b.png" alt="Jayden" className="object-cover" />
                      <AvatarFallback className="bg-bc-red text-white text-xs">BC</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div 
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
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
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-bc-red hover:bg-red-700">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatAssistant;
