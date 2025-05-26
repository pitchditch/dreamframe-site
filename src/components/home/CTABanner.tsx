
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Phone, Calendar, MessageCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CTABanner: React.FC = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Find the Premium Solutions section
      const premiumSection = document.querySelector('[data-section="premium-solutions"]') || 
                           document.querySelector('h2')?.textContent?.includes('Premium Cleaning Solutions') ? 
                           document.querySelector('h2')?.closest('section') : null;
      
      // Find the Satisfaction Guarantee section by its text content
      const satisfactionSection = Array.from(document.querySelectorAll('h2')).find(h2 => 
        h2.textContent?.includes('100% Satisfaction Guarantee')
      )?.closest('section');
      
      let shouldShow = false;
      
      if (premiumSection) {
        const premiumRect = premiumSection.getBoundingClientRect();
        // Show banner when Premium Solutions section enters viewport
        shouldShow = premiumRect.top <= window.innerHeight;
      } else {
        // Fallback: show after scrolling 80% of viewport height
        shouldShow = window.scrollY > window.innerHeight * 0.8;
      }
      
      // Hide banner when satisfaction guarantee section enters viewport (stop above it)
      if (satisfactionSection && shouldShow) {
        const satisfactionRect = satisfactionSection.getBoundingClientRect();
        if (satisfactionRect.top <= window.innerHeight + 80) { // Stop 80px above satisfaction section
          shouldShow = false;
        }
      }
      
      setIsVisible(shouldShow);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <>
      <section className="bg-gradient-to-r from-bc-red to-red-700 py-4 fixed bottom-0 left-0 right-0 z-[1000] shadow-2xl border-t-2 border-white/20">
        <div className="container mx-auto px-4">
          <div className={`flex items-center ${isMobile ? 'flex-col gap-4' : 'flex-row'}`}>
            <div className={`flex items-center ${isMobile ? 'w-full justify-center' : ''}`}>
              <div className="relative">
                <img 
                  src="/lovable-uploads/5f0b8643-4703-4237-9723-b6f07a39a74b.png"
                  alt="Jayden Fisher, Owner" 
                  className="w-12 h-12 rounded-full mr-4 border-3 border-white object-cover shadow-lg" 
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              
              <div className="text-white">
                <p className="font-bold text-base sm:text-lg mb-1">Ready for a free quote?</p>
                <p className="text-sm sm:text-base text-white/90">Get a response within 24 hours</p>
              </div>
            </div>
            
            <div className={`flex gap-3 ${isMobile ? 'w-full justify-center' : 'ml-auto'}`}>
              <Button 
                size={isMobile ? "default" : "lg"}
                variant="secondary" 
                className="bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm gap-2 font-medium shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => setShowChatbot(true)}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm sm:text-base">Chat</span>
              </Button>
              
              <Button 
                asChild 
                size={isMobile ? "default" : "lg"}
                variant="secondary" 
                className="bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm gap-2 font-medium shadow-lg transition-all duration-200 hover:scale-105"
              >
                <a href="tel:+16047860399">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm sm:text-base">Call</span>
                </a>
              </Button>
              
              <Button 
                asChild 
                size={isMobile ? "default" : "lg"}
                variant="secondary" 
                className="bg-white text-bc-red hover:bg-gray-50 border-2 border-white gap-2 font-bold shadow-lg transition-all duration-200 hover:scale-105"
              >
                <Link to="/contact">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm sm:text-base">Get Quote</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Modal */}
      {showChatbot && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md h-96 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-bc-red to-red-700 text-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-lg">Chat with BC Pressure Washing!</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChatbot(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0 rounded-full"
              >
                ×
              </Button>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-bc-red">
                  <p className="text-sm text-gray-700">Hi! I'm here to help you with any questions about our pressure washing services. What can I help you with today?</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t bg-white">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bc-red"
                />
                <Button size="default" className="bg-bc-red hover:bg-red-700 px-6">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CTABanner;
