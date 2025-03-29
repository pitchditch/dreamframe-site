
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

  return (
    <>
      {/* Floating Chat Button */}
      <Button 
        onClick={() => setIsOpen(true)} 
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-bc-red hover:bg-red-700 z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
      
      {/* Chat Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
          <DialogHeader className="p-4 border-b bg-bc-red text-white">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src="/lovable-uploads/7000bc3f-00cd-43c9-a2c1-714b6cc52a9d.png" alt="Jayden Fisher" />
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
          
          <div className="flex flex-col h-[350px]">
            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.fromUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.fromUser && (
                    <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                      <AvatarImage src="/lovable-uploads/7000bc3f-00cd-43c9-a2c1-714b6cc52a9d.png" alt="Jayden Fisher" />
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
