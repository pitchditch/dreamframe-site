
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageCircle, Send, X } from 'lucide-react';
import { Input } from './ui/input';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, fromUser: boolean}[]>([
    {text: "Hi there! I'm Jayden, the owner of BC Pressure Washing. How can I help you today?", fromUser: false}
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Chat suggestions
  const suggestions = [
    "What services do you offer?",
    "Can I get a free quote?",
    "What areas do you serve?",
    "How soon can you schedule a service?",
    "Do you offer commercial services?"
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {text: newMessage, fromUser: true}]);
    setNewMessage('');
    
    // Simulate response
    setTimeout(() => {
      // Simulate bot response
      const responses = [
        "I'd be happy to provide you with a free quote! Could you tell me more about what services you need?",
        "Thanks for your interest! We serve White Rock, Surrey, and surrounding areas. When would you like to schedule a service?",
        "Great question! Our pressure washing service includes thorough cleaning of your exterior surfaces using professional equipment and eco-friendly cleaning solutions.",
        "I'll need a bit more information to provide an accurate quote. Would you prefer if I called you to discuss your project?",
        "We can typically schedule a service within 2-3 business days. Does that timeline work for you?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, {text: randomResponse, fromUser: false}]);
    }, 1000);
  };

  // Function to handle clicking on a suggestion
  const handleSuggestionClick = (suggestion: string) => {
    setMessages(prev => [...prev, {text: suggestion, fromUser: true}]);
    
    // Simulate response
    setTimeout(() => {
      let response = "";
      
      // Custom responses based on the suggestion
      if (suggestion.includes("services do you offer")) {
        response = "We offer a variety of services including window cleaning, pressure washing, gutter cleaning, and roof cleaning for both residential and commercial properties!";
      } else if (suggestion.includes("free quote")) {
        response = "Absolutely! We provide free, no-obligation quotes. You can use our online calculator or I can collect some basic information about your project and provide an estimate.";
      } else if (suggestion.includes("areas do you serve")) {
        response = "We serve White Rock, Surrey, Langley, and the greater Metro Vancouver area. Are you located in one of these areas?";
      } else if (suggestion.includes("How soon")) {
        response = "We can typically schedule services within 2-3 business days, depending on current demand. For urgent needs, we try our best to accommodate!";
      } else if (suggestion.includes("commercial")) {
        response = "Yes, we offer specialized commercial services for businesses of all sizes, including window cleaning, exterior washing, and more. Do you have a commercial property that needs our attention?";
      } else {
        response = "Thanks for your question! I'd be happy to help with that. Could you provide a few more details so I can better assist you?";
      }
      
      setMessages(prev => [...prev, {text: response, fromUser: false}]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button 
        onClick={() => setIsOpen(true)} 
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg p-0 overflow-hidden bg-white hover:bg-gray-100 z-50"
      >
        <img 
          src="/lovable-uploads/d173e141-19f8-4b80-a02e-e2472f49e7fe.png" 
          alt="Jayden" 
          className="h-full w-full object-cover"
        />
      </Button>
      
      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-bc-red text-white">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src="/lovable-uploads/d173e141-19f8-4b80-a02e-e2472f49e7fe.png" alt="Jayden Fisher" />
                <AvatarFallback>JF</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle>Chat with Jayden</DialogTitle>
                <p className="text-xs text-white/80">Owner, BC Pressure Washing</p>
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
                    <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                      <AvatarImage src="/lovable-uploads/d173e141-19f8-4b80-a02e-e2472f49e7fe.png" alt="Jayden Fisher" />
                      <AvatarFallback>JF</AvatarFallback>
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
            
            {/* Suggestions */}
            {messages.length < 3 && (
              <div className="p-3 border-t bg-gray-50">
                <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="question-bubble"
                    >
                      {suggestion}
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
