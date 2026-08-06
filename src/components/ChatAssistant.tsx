import React, { useEffect, useRef, useState } from 'react';
import {
  Calculator,
  Clock,
  MapPin,
  MessageCircle,
  Send,
  X,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to help you with any questions about our pressure washing services. What can I help you with today?",
      isBot: true,
    },
  ]);
  const isMobile = useIsMobile();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const shouldHide = window.scrollY < window.innerHeight;
      setIsVisible(!shouldHide);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
    };
    setMessages((previousMessages) => [...previousMessages, newMessage]);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: 'Thanks for your message! For the fastest response, please call us at (778) 808-7620 or get an instant quote using our calculator.',
        isBot: true,
      };
      setMessages((previousMessages) => [...previousMessages, botResponse]);
    }, 1000);

    setMessage('');
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
  };

  const suggestedQuestions = [
    {
      icon: <Calculator size={16} />,
      text: 'Want a quick quote? Drop your address and check prices',
      action: () => {
        window.location.href = '/calculator';
      },
    },
    {
      icon: <Clock size={16} />,
      text: "What's your availability this week?",
      message: "What's your availability this week?",
    },
    {
      icon: <MapPin size={16} />,
      text: 'Do you service my area?',
      message: "Do you service my area? I'm located in",
    },
  ];

  if (!isVisible) return null;

  return (
    <div
      className={`fixed ${
        isMobile ? 'bottom-20 right-4' : 'bottom-6 right-6'
      } z-[999] flex flex-col items-end`}
    >
      {isOpen && (
        <div
          className={`mb-4 flex flex-col rounded-lg border bg-white shadow-xl ${
            isMobile ? 'h-96 w-80' : 'h-[500px] w-96'
          }`}
        >
          <div className="flex items-center justify-between rounded-t-lg border-b bg-bc-red p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-white/15">
                <MessageCircle size={18} aria-hidden="true" />
              </div>
              <h3 className="font-semibold">Chat Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-red-600"
              aria-label="Close chat assistant"
            >
              <X size={18} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((chatMessage) => (
                <div
                  key={chatMessage.id}
                  className={`flex ${
                    chatMessage.isBot ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      chatMessage.isBot
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-bc-red text-white'
                    }`}
                  >
                    <p className="text-sm">{chatMessage.text}</p>
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-medium text-gray-500">Quick options:</p>
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        question.action
                          ? question.action()
                          : handleSuggestedQuestion(
                              question.message || question.text,
                            )
                      }
                      className="flex w-full items-center gap-2 rounded-lg bg-gray-50 p-2 text-left text-xs transition-colors hover:bg-gray-100"
                    >
                      <span className="text-bc-red">{question.icon}</span>
                      <span className="text-gray-700">{question.text}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="border-t p-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="flex-1"
                aria-label="Chat message"
              />
              <Button
                type="submit"
                size="sm"
                className="bg-bc-red hover:bg-red-700"
                aria-label="Send message"
              >
                <Send size={16} />
              </Button>
            </div>
          </form>
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-14 w-14 rounded-full bg-bc-red shadow-lg hover:bg-red-700"
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={28} className="text-white" />
        )}
      </Button>
    </div>
  );
};

export default ChatAssistant;
