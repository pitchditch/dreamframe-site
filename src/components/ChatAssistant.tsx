
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { MessageCircle, X } from 'lucide-react';

const questions = [
  "Have any questions?",
  "Looking for a quote?",
  "Need help with your property?",
  "Want to know our service areas?",
  "Interested in our satisfaction guarantee?",
];

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestion((prev) => {
        const currentIndex = questions.indexOf(prev);
        return questions[(currentIndex + 1) % questions.length];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`chat-button rounded-full p-3 shadow-lg ${isOpen ? 'bg-bc-red hover:bg-bc-red/90' : 'bg-navy hover:bg-navy/90'}`}
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
              alt="Jayden Fisher - BC Pressure Washing"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold">Jayden Fisher</h4>
              <p className="text-sm text-gray-600 animate-fade-in">{currentQuestion}</p>
            </div>
          </div>
          <div className="text-center text-sm text-gray-600">
            Click the button below to start a conversation
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
