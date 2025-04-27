
import { useState } from 'react';
import { Button } from './ui/button';
import { MessageCircle, X } from 'lucide-react';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`chat-button rounded-full p-3 ${isOpen ? 'bg-bc-red hover:bg-bc-red/90' : 'bg-navy hover:bg-navy/90'}`}
        size="lg"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </Button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[300px] bg-white rounded-lg shadow-lg p-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/lovable-uploads/c5219e28-4a09-4d72-bef9-e96193360fa6.png"
              alt="BC Pressure Washing Assistant"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold">Have any questions?</h4>
              <p className="text-sm text-gray-600">I'm here to help!</p>
            </div>
          </div>
          {/* Add chat functionality here later */}
          <div className="text-center text-sm text-gray-600">
            Click the button below to start a conversation
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
