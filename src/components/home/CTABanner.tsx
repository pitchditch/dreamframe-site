
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Phone, Calendar, MessageCircle, X, Send } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const faqData = [
  {
    category: "GENERAL SERVICES",
    questions: [
      {
        q: "What services do you offer?",
        a: "We offer pressure washing, soft washing, window cleaning (interior/exterior), gutter cleaning, roof moss removal, siding treatment, and more."
      },
      {
        q: "What areas do you serve?",
        a: "Surrey, Coquitlam, Vancouver, White Rock, Langley — and surrounding areas in the Lower Mainland."
      },
      {
        q: "Are you insured and licensed?",
        a: "Yes. We're fully insured and licensed to protect you and your property."
      },
      {
        q: "Do you offer free quotes?",
        a: "Yes! Call, text, or fill out our online form and we'll respond within 24 hours."
      },
      {
        q: "Do I need to be home for the service?",
        a: "Not always. For exterior work, we can proceed if we have access to water and the areas needing service."
      }
    ]
  },
  {
    category: "PRESSURE WASHING",
    questions: [
      {
        q: "What surfaces can be pressure washed?",
        a: "Driveways, sidewalks, patios, decks, siding, fences, retaining walls, concrete, brick, and more."
      },
      {
        q: "Will pressure washing damage my home?",
        a: "No. We use controlled pressure and soft wash techniques for delicate areas like siding and roofs."
      },
      {
        q: "How often should I pressure wash my home?",
        a: "Once per year is recommended to prevent buildup of dirt, algae, mold, and mildew."
      },
      {
        q: "Can you remove oil stains?",
        a: "We use commercial-grade degreasers and hot water — results vary by surface but expect a major improvement."
      },
      {
        q: "Do you offer driveway or garage pad cleaning?",
        a: "Yes. We specialize in concrete surface restoration including garages and driveways."
      }
    ]
  },
  {
    category: "WINDOW CLEANING",
    questions: [
      {
        q: "Do you clean windows inside and out?",
        a: "Yes. We offer interior and exterior window cleaning as well as screen and track cleaning."
      },
      {
        q: "Can you clean windows on tall homes or buildings?",
        a: "Yes. We use water-fed poles to reach windows up to 5 stories safely from the ground."
      },
      {
        q: "How often should I clean my windows?",
        a: "Every 3–6 months for best clarity and lifespan."
      },
      {
        q: "Do you clean window tracks and frames?",
        a: "Yes — full detailing of tracks, sills, and screens is available."
      },
      {
        q: "Will you leave streaks or drips?",
        a: "No. We use purified water systems and squeegees for a spotless finish."
      }
    ]
  },
  {
    category: "GUTTER CLEANING",
    questions: [
      {
        q: "How do I know if my gutters need cleaning?",
        a: "Overflowing water, sagging, or plants growing in gutters are all signs it's time."
      },
      {
        q: "Do you flush downspouts?",
        a: "Yes — we fully clear and flush all downspouts to ensure proper flow."
      },
      {
        q: "How often should I clean my gutters?",
        a: "At least twice a year — spring and fall are ideal."
      },
      {
        q: "Do you clean gutters by hand?",
        a: "We use hand-cleaning and specialized vacuums depending on the job, always ensuring a thorough result."
      },
      {
        q: "Will you take photos of the finished work?",
        a: "Yes — we can provide before/after photos for transparency and peace of mind."
      }
    ]
  },
  {
    category: "ROOF CLEANING",
    questions: [
      {
        q: "What's included in your roof cleaning?",
        a: "Moss removal, algae treatment, debris removal, and optional preventative spray."
      },
      {
        q: "Will roof cleaning damage my shingles?",
        a: "No. We use soft washing, not high-pressure, which is safe for all roofing materials."
      },
      {
        q: "How often should I clean my roof?",
        a: "Every 1–2 years depending on moss and weather conditions in your area."
      },
      {
        q: "Can you clean tile, metal, or cedar shake roofs?",
        a: "Yes — we tailor our methods to your specific roof type."
      },
      {
        q: "Do you apply moss treatment?",
        a: "Yes, we offer post-cleaning moss prevention spray that lasts 6–12 months."
      }
    ]
  },
  {
    category: "BOOKING & PAYMENTS",
    questions: [
      {
        q: "How do I book a service?",
        a: "Call or text us at 778-808-7620, or request a quote at BCPressureWashing.ca."
      },
      {
        q: "How far in advance should I book?",
        a: "We recommend booking 3–7 days in advance. Same-week and weekend appointments are often available."
      },
      {
        q: "What payment methods do you accept?",
        a: "Credit/debit, e-transfer, and cash. Invoices are provided."
      },
      {
        q: "Do you charge for quotes?",
        a: "No — all estimates are free with no obligation."
      },
      {
        q: "Do you offer discounts for multiple services?",
        a: "Yes! Bundle and save up to 20%."
      }
    ]
  }
];

const CTABanner: React.FC = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState<Array<{type: 'user' | 'bot', message: string}>>([]);
  
  useEffect(() => {
    const handleScroll = () => {
      const premiumSection = document.querySelector('[data-section="premium-solutions"]') || 
                           document.querySelector('h2')?.textContent?.includes('Premium Cleaning Solutions') ? 
                           document.querySelector('h2')?.closest('section') : null;
      
      const satisfactionSection = Array.from(document.querySelectorAll('h2')).find(h2 => 
        h2.textContent?.includes('100% Satisfaction Guarantee')
      )?.closest('section');
      
      let shouldShow = false;
      
      if (premiumSection) {
        const premiumRect = premiumSection.getBoundingClientRect();
        shouldShow = premiumRect.top <= window.innerHeight;
      } else {
        shouldShow = window.scrollY > window.innerHeight * 0.8;
      }
      
      if (satisfactionSection && shouldShow) {
        const satisfactionRect = satisfactionSection.getBoundingClientRect();
        if (satisfactionRect.top <= window.innerHeight + 80) {
          shouldShow = false;
        }
      }
      
      setIsVisible(shouldShow);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced typo-tolerant search function
  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  const findAnswer = (input: string): string => {
    const lowerInput = input.toLowerCase().trim();
    
    // Direct match first
    for (const category of faqData) {
      for (const faq of category.questions) {
        if (faq.q.toLowerCase().includes(lowerInput) || 
            faq.a.toLowerCase().includes(lowerInput) ||
            lowerInput.includes(faq.q.toLowerCase().split(' ').slice(0, 3).join(' '))) {
          return faq.a;
        }
      }
    }

    // Fuzzy matching for typos
    let bestMatch = { answer: '', distance: Infinity };
    const inputWords = lowerInput.split(' ');
    
    for (const category of faqData) {
      for (const faq of category.questions) {
        const questionWords = faq.q.toLowerCase().split(' ');
        const answerWords = faq.a.toLowerCase().split(' ');
        
        // Check each input word against question and answer words
        for (const inputWord of inputWords) {
          if (inputWord.length > 2) { // Only check words longer than 2 characters
            for (const qWord of questionWords) {
              const distance = levenshteinDistance(inputWord, qWord);
              if (distance <= 2 && distance < bestMatch.distance) {
                bestMatch = { answer: faq.a, distance };
              }
            }
            for (const aWord of answerWords) {
              const distance = levenshteinDistance(inputWord, aWord);
              if (distance <= 2 && distance < bestMatch.distance) {
                bestMatch = { answer: faq.a, distance };
              }
            }
          }
        }
      }
    }

    if (bestMatch.answer) {
      return bestMatch.answer;
    }

    // Keyword-based responses with typo tolerance
    const keywords = {
      'price|cost|quote|pricing|estimate': "We offer free quotes! Call or text us at 778-808-7620, or request a quote online and we'll respond within 24 hours.",
      'area|location|serve|service area|where': "We serve Surrey, Coquitlam, Vancouver, White Rock, Langley — and surrounding areas in the Lower Mainland.",
      'service|services|what|offer|do': "We offer pressure washing, soft washing, window cleaning (interior/exterior), gutter cleaning, roof moss removal, siding treatment, and more.",
      'book|schedule|appointment|booking': "You can book by calling/texting 778-808-7620 or requesting a quote online. We recommend booking 3–7 days in advance.",
      'insur|licens|insurance|license': "Yes, we're fully insured and licensed to protect you and your property.",
      'window|windows|clean': "We offer interior and exterior window cleaning as well as screen and track cleaning using purified water systems for a spotless finish.",
      'pressure|wash|washing|house': "We offer pressure washing and soft washing for driveways, sidewalks, patios, decks, siding, and more using controlled pressure techniques.",
      'gutter|gutters|downspout': "We provide complete gutter cleaning including hand-cleaning, flushing downspouts, and can provide before/after photos.",
      'roof|moss|algae': "Our roof cleaning includes moss removal, algae treatment, debris removal, and optional preventative spray using safe soft washing techniques.",
      'payment|pay|accept|methods': "We accept credit/debit, e-transfer, and cash. All estimates are free with no obligation.",
      'time|long|duration|take': "Most jobs take 1–3 hours depending on service type and property size.",
      'commercial|business|strata': "Yes, we offer commercial services including storefronts, office buildings, apartment complexes, and strata properties with flexible scheduling.",
      'discount|deal|promotion|save': "Yes! Bundle multiple services and save up to 20%. We also offer seasonal promotions.",
      'guarantee|satisfaction|not satisfied': "We stand by our work with a 100% satisfaction guarantee. If you're not satisfied, we'll come back and make it right at no charge.",
      'contact|call|phone|reach': "Call or text us at 778-808-7620, or visit BCPressureWashing.ca. We usually respond within 1 hour during business hours."
    };

    for (const [pattern, response] of Object.entries(keywords)) {
      const regex = new RegExp(pattern, 'i');
      if (regex.test(lowerInput)) {
        return response;
      }
    }

    // Default response
    return "I'd be happy to help! For specific questions, please call us at 778-808-7620 or request a free quote online. Our team will respond within 24 hours with detailed information.";
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    const answer = findAnswer(userInput);
    setConversation(prev => [
      ...prev,
      { type: 'user', message: userInput },
      { type: 'bot', message: answer }
    ]);
    setUserInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <section className="bg-bc-red py-3 fixed bottom-0 left-0 right-0 z-[1000] shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <img 
              src="/lovable-uploads/5f0b8643-4703-4237-9723-b6f07a39a74b.png"
              alt="Jayden Fisher, Owner" 
              className="w-10 h-10 rounded-full mr-3 border-2 border-white object-cover" 
            />
            
            <div className="text-white flex-1">
              <p className="font-bold text-sm sm:text-base">Ready for a free quote?</p>
              <p className="text-xs sm:text-sm">Get a response within 24 hours</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setChatOpen(true)}
              size="sm" 
              variant="secondary" 
              className="bg-white text-bc-red hover:bg-gray-100 border-none gap-1 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Chat</span>
            </Button>
            
            <Button asChild size="sm" variant="secondary" className="gap-1 whitespace-nowrap">
              <a href="tel:+17788087620">
                <Phone className="w-4 h-4" />
                <span className="text-xs sm:text-sm">Call</span>
              </a>
            </Button>
            
            <Button asChild size="sm" variant="secondary" className="bg-white text-bc-red hover:bg-gray-100 border-none gap-1 whitespace-nowrap">
              <Link to="/contact">
                <Calendar className="w-4 h-4" />
                <span className="text-xs sm:text-sm">Quote</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black/50 z-[1001] flex items-end justify-center">
          <div className="bg-white rounded-t-xl w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b bg-bc-red text-white rounded-t-xl relative">
              <img 
                src="/lovable-uploads/d8e87e6e-db66-4486-a489-11108ff306fb.png"
                alt="BC Logo" 
                className="absolute top-2 left-2 w-8 h-8 object-contain" 
              />
              <h3 className="font-semibold ml-10">BC Pressure Washing Assistant</h3>
              <Button 
                onClick={() => setChatOpen(false)}
                size="sm"
                variant="ghost"
                className="text-white hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px]">
              {conversation.length === 0 && (
                <div className="text-center text-gray-600 py-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-bc-red" />
                  <p className="mb-2">Hi! I'm here to help answer your questions.</p>
                  <p className="text-sm">Ask me about our services, pricing, areas we serve, or anything else!</p>
                  <p className="text-xs mt-2 text-gray-500">Don't worry about typos - I'll understand!</p>
                </div>
              )}
              
              {conversation.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-bc-red text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bc-red"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-bc-red hover:bg-red-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CTABanner;
