import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Phone, MessageCircle, Calendar, ArrowRight, HelpCircle, User, Info } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { extractInfoFromMessage, useChatFormData } from '@/hooks/use-chat-form-data';

type MessageType = {
  type: 'user' | 'bot';
  text: string;
  isTyping?: boolean;
};

type ChatStep = 
  | 'greeting' 
  | 'booking' 
  | 'qa' 
  | 'human-support' 
  | 'question-detail'
  | 'follow-up';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [chatHistory, setChatHistory] = useState<MessageType[]>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [activeSuggestions, setActiveSuggestions] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<ChatStep>('greeting');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const { t } = useTranslation();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { formData, setFormValue, setServiceValue, clearFormData } = useChatFormData();

  const suggestions = [
    t("Have a question?"),
    t("Need help with a quote?"),
    t("Want to learn more about our services?"),
    t("Looking for pricing information?"),
    t("Wondering about our availability?")
  ];

  // Common questions and answers for the bot
  const faqData = [
    // Service Area Questions
    { question: "What areas do you serve?", answer: "We serve the entire Greater Vancouver area including Vancouver, Burnaby, Richmond, Surrey, Coquitlam, North Vancouver, West Vancouver, Langley, White Rock, Delta, and surrounding communities. Our service area extends from West Vancouver to Chilliwack and everywhere in between." },
    { question: "Do you service my area?", answer: "We service the entire Lower Mainland, from West Vancouver to Chilliwack, and from White Rock to Squamish. Please let us know your specific location, and we can confirm if we service your area." },
    { question: "Do you service Vancouver?", answer: "Yes! Vancouver is one of our primary service areas. We provide all our services throughout Vancouver." },
    { question: "Do you service Burnaby?", answer: "Yes! We regularly service Burnaby with all our cleaning services." },
    { question: "Do you service Surrey?", answer: "Absolutely! Surrey is within our service area, and we provide all our cleaning solutions there." },
    { question: "Do you service White Rock?", answer: "Yes, we provide all our services to White Rock and the surrounding South Surrey area." },
    { question: "Do you service Langley?", answer: "Yes, we regularly visit Langley for residential and commercial cleaning services." },
    { question: "Do you service North Vancouver?", answer: "Yes, North Vancouver is within our service area for all cleaning services." },
    { question: "Do you service West Vancouver?", answer: "Yes, we provide all our cleaning services to West Vancouver properties." },
    { question: "Do you service Richmond?", answer: "Yes, Richmond is one of our core service areas." },
    { question: "Do you service Coquitlam?", answer: "Yes, we regularly provide services to Coquitlam and the Tri-Cities area." },
    { question: "Do you service Delta?", answer: "Yes, Delta is within our service area for all cleaning services." },
    { question: "Do you service Abbotsford?", answer: "Yes, we extend our services to Abbotsford." },
    { question: "Do you service Whistler?", answer: "Yes, we do travel to Whistler for larger cleaning projects. Please note that there may be an additional travel fee for Whistler services." },
    
    // Quote and Pricing Questions
    { question: "How much does pressure washing cost?", answer: "Pricing varies based on the size of the area and the specific service needed. For a residential driveway, prices typically start at $250, while full house exteriors start at $350. We offer free quotes - just call us at 778-808-7620 or use our quote calculator on the website." },
    { question: "How much does window cleaning cost?", answer: "Window cleaning prices start at $199 for a small home and vary based on the number of windows, their accessibility, and condition. For an accurate quote, please use our calculator or call us directly." },
    { question: "How much does gutter cleaning cost?", answer: "Gutter cleaning starts at $149 for a small single-story home. The final price depends on the length of gutters, number of stories, and roof complexity. Use our online calculator for an instant estimate." },
    { question: "How much does roof cleaning cost?", answer: "Roof cleaning starts at $350 for small homes. The price varies based on roof size, pitch, accessibility, and the amount of moss/debris. Request a quote through our calculator for an accurate estimate." },
    { question: "How do I get a quote?", answer: "You can get a free quote in three ways: 1) Use our online calculator to get an instant estimate, 2) Call us directly at 778-808-7620, or 3) Click the 'Book Now' button here in the chat, and we'll guide you through the process." },
    { question: "Is the quote free?", answer: "Yes! All our quotes are completely free and no-obligation. We'll provide an accurate estimate based on your specific needs and property." },
    { question: "Can I get an on-site quote?", answer: "Absolutely! For more complex jobs, we're happy to provide an on-site estimate. This allows us to see your property firsthand and provide the most accurate quote possible." },
    { question: "Do you offer discounts?", answer: "Yes, we offer discounts for combined services (for example, booking window cleaning and gutter cleaning together). We also have a referral program where you can save 50% on your next service when you refer a friend." },
    
    // Available Services Questions
    { question: "What services do you offer?", answer: "We offer four main services: 1) Window Cleaning - streak-free interior and exterior cleaning for all window types, 2) Pressure Washing - for driveways, patios, decks, siding, and more, 3) Gutter Cleaning - thorough cleaning and unclogging of gutters, and 4) Roof Cleaning - moss removal and gentle cleaning for all roof types." },
    { question: "What services are available?", answer: "Our services include professional window cleaning, pressure washing, gutter cleaning, and roof cleaning for both residential and commercial properties. We can combine services for better value." },
    { question: "What's included in a window cleaning?", answer: "Our window cleaning service includes: cleaning all interior and exterior glass surfaces, wiping down frames and tracks, cleaning screens, and wiping down window sills. We use professional-grade tools and eco-friendly solutions for a streak-free finish." },
    { question: "What's included in a pressure washing service?", answer: "Our pressure washing service includes: thorough cleaning of specified surfaces using appropriate pressure levels, pre-treatment of stains or growth, environmentally friendly cleaning solutions when needed, and a final rinse. We can clean driveways, walkways, patios, decks, siding, and more." },
    { question: "What's included in a gutter cleaning?", answer: "Our gutter cleaning service includes: removal of all debris from gutters and downspouts, flushing the system to ensure proper water flow, checking for basic issues like loose brackets or minor leaks, and cleanup of all removed debris." },
    { question: "What's included in a roof cleaning?", answer: "Our roof cleaning service includes: removal of moss, algae, and debris using appropriate methods for your roof type, application of preventative treatments to discourage future growth (optional), and cleanup of all removed material. We use a soft wash technique that's safe for all roof materials." },
    { question: "Do you clean solar panels?", answer: "Yes! We offer specialized cleaning for solar panels that helps maintain their efficiency. We use gentle, non-abrasive cleaning methods that won't damage your panels but will remove dirt and debris that reduce their power generation." },
    { question: "Do you clean skylights?", answer: "Yes, we clean skylights as part of our window cleaning service. Skylights often collect more dirt and debris than vertical windows, so regular cleaning is important to maintain natural light in your home." },
    
    // Booking and Availability Questions
    { question: "How do I book a service?", answer: "You can book a service by using our online calculator/booking form, calling us at 778-808-7620, or clicking the 'Book Now' button here in this chat. We'll guide you through selecting your service, property details, and scheduling a convenient time." },
    { question: "What's your availability?", answer: "We typically book 1-2 weeks in advance during peak season (spring/summer) and have more immediate availability during fall/winter. For the most current availability, please call us or proceed with the online booking where you'll see available dates." },
    { question: "How far in advance should I book?", answer: "We recommend booking at least 1-2 weeks in advance to secure your preferred date and time, especially during our busy spring and summer seasons. For urgent needs, please call us directly as we sometimes have last-minute openings." },
    { question: "Do you work weekends?", answer: "Yes, we offer weekend appointments! We understand many homeowners prefer weekend service. Weekend slots fill up quickly, so we recommend booking those times well in advance." },
    { question: "Do you work year-round?", answer: "Yes! We provide our services year-round. While certain services like window cleaning and pressure washing are more popular in spring and summer, we can perform all our services throughout the year, weather permitting." },
    
    // Payment and Process Questions
    { question: "How does the process work?", answer: "Our process is simple: 1) Book your service online or by phone, 2) Receive confirmation and a reminder before your appointment, 3) Our professional team arrives at the scheduled time and completes the service, 4) We walk through the completed work with you to ensure your satisfaction, 5) Payment is collected after you're fully satisfied." },
    { question: "What payment methods do you accept?", answer: "We accept multiple payment methods for your convenience: cash, check, all major credit cards, debit cards, e-transfer, and mobile payment options like Apple Pay and Google Pay." },
    { question: "Do I need to be home for the service?", answer: "It depends on the service. For exterior-only services like pressure washing or gutter cleaning, you don't need to be present as long as we have access to water spigots and the areas to be cleaned. For window cleaning that includes interiors, someone should be home to provide access." },
    { question: "What happens if it rains on my service day?", answer: "If weather conditions prevent us from completing your service safely or effectively, we'll contact you to reschedule for the next available date that works for you. There's no charge for weather-related rescheduling." },
    { question: "Do you provide any guarantees?", answer: "Yes! We offer a satisfaction guarantee on all our services. We don't consider the job complete until you're fully satisfied with the results. If you notice any issues within 48 hours of service completion, we'll return to address them at no additional cost." },
    { question: "What areas do you serve?", answer: "We proudly serve the entire Greater Vancouver area, including Vancouver, Burnaby, Richmond, Surrey, Coquitlam, and surrounding communities." },
    { question: "How much does pressure washing cost?", answer: "The cost of pressure washing depends on the size and surface area of the space. Contact us for a free quote!" },
    { question: "Do you offer commercial services?", answer: "Yes, we offer commercial pressure washing services. Contact us today to learn more!" },
    { question: "How long does a typical job take?", answer: "A typical pressure washing job takes between 1 and 4 hours, depending on the size of the space." },
    { question: "Is pressure washing safe for all surfaces?", answer: "Yes, pressure washing is safe for most surfaces. We will assess the surface before beginning work to ensure that it can withstand the pressure." },
    { question: "Do you use eco-friendly cleaning solutions?", answer: "Yes, we use eco-friendly cleaning solutions that are safe for your family and pets." },
    { question: "How often should I have my property pressure washed?", answer: "We recommend having your property pressure washed at least once a year to remove dirt, grime, and algae." },
    { question: "Can you remove oil stains from my driveway?", answer: "Yes, we can remove oil stains from your driveway using specialized cleaning solutions." },
    { question: "Do you offer any guarantees?", answer: "Yes, we offer a 100% satisfaction guarantee. If you are not happy with our work, we will make it right." },
    { question: "What should I do to prepare for your service?", answer: "Please remove any furniture or other items from the area to be pressure washed." },
    { question: "Can you clean my solar panels?", answer: "Yes, we can clean your solar panels using a soft-bristled brush and deionized water." },
    { question: "What payment methods do you accept?", answer: "We accept cash, check, credit card, and e-transfer." },
    { question: "What services do you offer?", answer: "We offer pressure washing, window cleaning, gutter cleaning, and roof cleaning services." },
    { question: "Do you offer free estimates?", answer: "Yes! Contact us today for a free, no-obligation estimate." },
    { question: "Are your cleaning methods safe for my home or business?", answer: "Absolutely! We use professional-grade, eco-friendly cleaning solutions that are safe for your property, landscaping, and pets." },
    { question: "How do I schedule a service?", answer: "You can schedule a service by calling us, filling out our online form, or messaging us here!" },
    { question: "How far in advance should I book a service?", answer: "We recommend booking at least a week in advance, but we do our best to accommodate last-minute requests!" },
    { question: "Can I bundle multiple services together?", answer: "Absolutely! We offer package deals for pressure washing, window cleaning, gutter cleaning, and roof cleaning." },
    { question: "Do you offer any warranties or guarantees?", answer: "Yes! We stand by our work with a 100% satisfaction guarantee. If you're not happy, we'll make it right." },
    { question: "What should I do to prepare for a cleaning service?", answer: "We recommend moving fragile items, vehicles, and outdoor furniture away from the cleaning area. For window cleaning, please ensure we have access to both inside and outside." },
    { question: "Do you offer seasonal or annual maintenance plans?", answer: "Yes! We offer scheduled maintenance plans to keep your home or business looking great year-round." },
    { question: "What makes your cleaning service different from others?", answer: "We take pride in our attention to detail, eco-friendly cleaning solutions, and customer satisfaction guarantee. Plus, we customize our approach based on your property's needs." },
    { question: "Do I need to be home for the service?", answer: "Not necessarily! As long as we have access to the areas that need cleaning, you can go about your day while we take care of everything." },
    { question: "How do I know if my property needs cleaning?", answer: "If you notice dirt, discoloration, mold, streaks, or clogged gutters, it's time for a professional cleaning. Regular maintenance prevents damage and costly repairs." },
    { question: "Do you work on weekends?", answer: "Yes, we offer flexible scheduling, including weekends, to accommodate your needs." },
    { question: "What payment methods do you accept?", answer: "We accept cash, credit/debit cards, and online payments for your convenience." },
    { question: "What surfaces can you pressure wash?", answer: "We clean driveways, sidewalks, patios, decks, fences, siding, and more!" },
    { question: "Will pressure washing damage my surfaces?", answer: "Not at all! We adjust pressure levels based on the surface to ensure a deep clean without damage." },
    { question: "How often should I pressure wash my property?", answer: "We recommend at least once a year to maintain your home's curb appeal and prevent buildup of dirt and mold." },
    { question: "Can pressure washing remove rust stains?", answer: "Yes! We use specialized cleaning solutions to safely remove rust stains from concrete, driveways, and other surfaces." },
    { question: "Is pressure washing safe for painted surfaces?", answer: "It depends on the paint and the surface. We use low-pressure techniques for painted areas to prevent chipping or peeling." },
    { question: "Can pressure washing help prevent slips and falls?", answer: "Absolutely! Removing algae, moss, and buildup from driveways, walkways, and patios reduces the risk of slipping." },
    { question: "Can you remove old gum from sidewalks?", answer: "Yes! Our high-pressure cleaning method effectively removes stuck-on gum from sidewalks and other surfaces." },
    { question: "How long does a pressure washing job take?", answer: "The time varies based on the size and condition of the area, but most jobs take 1–4 hours." },
    { question: "Can pressure washing remove oil stains from my driveway?", answer: "Yes! We use specialized cleaning solutions and high-pressure techniques to break down and remove oil stains effectively." },
    { question: "Will pressure washing help with pest problems?", answer: "Definitely! It can remove spider webs, wasp nests, and other insect buildups around your home or business." },
    { question: "Can I pressure wash my property myself?", answer: "While DIY pressure washing is possible, improper techniques can cause damage. Our professional service ensures a safe and thorough clean." },
    { question: "Do you use hot or cold water for pressure washing?", answer: "We use both, depending on the surface and the type of stain. Hot water is great for grease and oil, while cold water works well for general cleaning." },
    { question: "Do you clean both interior and exterior windows?", answer: "Yes! We offer streak-free cleaning for both interior and exterior windows." },
    { question: "What type of windows can you clean?", answer: "We clean all types, including standard windows, skylights, glass doors, and storefronts." },
    { question: "Do you use chemicals for window cleaning?", answer: "We use eco-friendly, streak-free cleaning solutions that are safe for your home and the environment." },
    { question: "Do you clean windows in cold weather?", answer: "Yes! We offer window cleaning year-round, using solutions that prevent freezing in colder months." },
    { question: "Do you remove screens before cleaning the windows?", answer: "Yes! We carefully remove screens, clean them separately, and reinstall them after the job." },
    { question: "Can you remove paint or sticker residue from windows?", answer: "Yes! We use safe techniques to remove paint splatters, adhesive residue, and other stubborn marks." },
    { question: "Do you clean window tracks and frames?", answer: "Yes! We don't just clean the glass—we also wipe down frames, sills, and tracks for a complete clean." },
    { question: "How often should I have my windows professionally cleaned?", answer: "We recommend every 3–6 months for homes and at least monthly for businesses." },
    { question: "Do you clean high-rise windows?", answer: "We specialize in low- to mid-rise buildings, but we can discuss options for taller structures." },
    { question: "How do you handle hard water stains on windows?", answer: "We use professional-grade solutions that break down mineral deposits and restore your glass to its original clarity." },
    { question: "Will window cleaning help reduce my energy bills?", answer: "Yes! Clean windows allow more natural light in, reducing the need for artificial lighting and improving energy efficiency." },
    { question: "Why is gutter cleaning important?", answer: "Clogged gutters can lead to water damage, roof leaks, and foundation issues. Regular cleaning helps prevent costly repairs." },
    { question: "How often should I clean my gutters?", answer: "At least twice a year—typically in the spring and fall." },
    { question: "Do you remove debris from my property after cleaning?", answer: "Yes! We make sure to clear out all debris and leave your property looking spotless." },
    { question: "Do you check for gutter damage while cleaning?", answer: "Yes! We inspect your gutters for leaks, cracks, or sagging and notify you of any issues we find." },
    { question: "What do you do with the debris you remove from gutters?", answer: "We bag up and dispose of all debris so your property is left clean and tidy." },
    { question: "Can you fix loose or damaged gutters?", answer: "While we specialize in cleaning, we can reattach loose gutters and advise on needed repairs." },
    { question: "How can I prevent my gutters from clogging so often?", answer: "We recommend installing gutter guards and scheduling regular cleanings to keep debris out." },
    { question: "Do I need to clean my gutters if I don't have trees near my house?", answer: "Yes! Leaves aren't the only problem—dirt, roof granules, and debris can still clog your gutters over time." },
    { question: "Can clogged gutters cause foundation damage?", answer: "Yes! Overflowing water from clogged gutters can erode your foundation and lead to cracks or leaks in your basement." },
    { question: "Do you install gutter guards?", answer: "Yes, we offer gutter guard installation to help minimize debris buildup and reduce the need for frequent cleaning." },
    { question: "What happens if I don't clean my gutters regularly?", answer: "You risk water damage, mold growth, pest infestations, and even structural issues over time." },
    { question: "Why should I clean my roof?", answer: "Roof cleaning removes algae, moss, and debris, helping to extend your roof's lifespan and improve your home's appearance." },
    { question: "Do you use high-pressure washing on roofs?", answer: "No! We use a soft wash system to clean roofs safely without causing damage." },
    { question: "Will roof cleaning affect my shingles?", answer: "Not at all! Our gentle cleaning process protects shingles while effectively removing dirt and growth." },
    { question: "What are those black streaks on my roof?", answer: "Those are algae stains, which can damage your shingles over time. Our roof cleaning service safely removes them." },
    { question: "Will roof cleaning help lower my energy bills?", answer: "Yes! A clean roof reflects more sunlight, keeping your home cooler and reducing energy costs." },
    { question: "How do you clean a roof without damaging it?", answer: "We use a soft wash method, which applies a special cleaning solution at low pressure to remove stains and buildup without harming shingles." },
    { question: "Can you remove moss from my roof?", answer: "Yes! Our roof treatment safely removes moss and prevents regrowth." },
    { question: "How long will my roof stay clean after a professional cleaning?", answer: "Most roofs stay clean for 2–5 years, depending on environmental factors and maintenance." },
    { question: "Will roof cleaning help my home's resale value?", answer: "Absolutely! A clean roof enhances curb appeal and can make a great first impression for potential buyers." },
    { question: "Do you clean solar panels?", answer: "Yes! We provide safe cleaning for solar panels to ensure they work efficiently and generate maximum energy." },
    { question: "How long does a roof cleaning service take?", answer: "It depends on the size of the roof and the level of buildup, but most jobs take between 2–4 hours." },
    { question: "Do you clean both homes and businesses?", answer: "Yes! We provide professional cleaning services for residential properties, offices, storefronts, apartment complexes, and more." },
    { question: "Do you offer maintenance plans?", answer: "Yes! We offer routine cleaning plans to keep your home or business looking its best year-round." },
    { question: "Are you insured?", answer: "Absolutely! We are fully insured for your peace of mind." },
    { question: "Do you offer discounts for businesses with multiple locations?", answer: "Yes! We offer special pricing for businesses that need regular cleaning at multiple sites." },
    { question: "How does commercial window cleaning differ from residential?", answer: "Commercial cleaning often involves larger windows, higher access points, and more frequent service to maintain a professional appearance." },
    { question: "Do you offer cleaning for apartment complexes and HOAs?", answer: "Yes! We provide exterior cleaning services for residential communities, including common areas." },
    { question: "How can regular exterior cleaning benefit my business?", answer: "Clean storefronts and sidewalks create a positive first impression, attract customers, and help maintain property value." },
    { question: "Do you provide cleaning services for newly constructed buildings?", answer: "Yes! We offer post-construction cleaning to remove dirt, dust, and debris from new builds." },
    { question: "Do you offer after-hours cleaning for businesses?", answer: "Yes! We can clean your commercial property outside of business hours to minimize disruption." },
    { question: "Do you provide services for HOAs and apartment complexes?", answer: "Yes! We work with property managers and HOAs to maintain clean and attractive communities." },
    { question: "Can regular exterior cleaning help with allergies?", answer: "Yes! Removing mold, pollen, and dust from surfaces can improve air quality and reduce allergy symptoms." }
  ];

  // Suggested questions based on current step
  const getStepSuggestions = (step: ChatStep) => {
    switch (step) {
      case 'greeting':
        return [
          "Book a Service",
          "Ask a Question",
          "Talk to a Human"
        ];
      case 'qa':
        return [
          "What areas do you serve?",
          "What services do you offer?",
          "How much does it cost?",
          "How do I get a quote?"
        ];
      case 'follow-up':
        return [
          "Yes, Book Now",
          "Ask Another Question",
          "Talk to a Human"
        ];
      case 'human-support':
        return [
          "Call Us",
          "Leave a Message",
          "Go Back"
        ];
      default:
        return updateSuggestedQuestions(message);
    }
  };

  // Dynamic suggested questions based on user input
  const updateSuggestedQuestions = (inputText: string) => {
    if (!inputText.trim()) {
      return [
        "What services do you offer?",
        "What areas do you service?",
        "How much does it cost?",
        "How do I book a service?"
      ];
    
    }
    
    const inputLower = inputText.toLowerCase();
    const matchingQuestions = faqData
      .filter(faq => faq.question.toLowerCase().includes(inputLower))
      .map(faq => faq.question)
      .slice(0, 4);
    
    return matchingQuestions.length > 0 
      ? matchingQuestions 
      : [
          "What services do you offer?",
          "What areas do you service?",
          "How much does it cost?",
          "How do I book a service?"
        ];
  };

  useEffect(() => {
    if (currentStep === 'question-detail') {
      setActiveSuggestions(updateSuggestedQuestions(message));
    } else {
      setActiveSuggestions(getStepSuggestions(currentStep));
    }
  }, [message, currentStep]);

  useEffect(() => {
    const suggestionTimer = setTimeout(() => {
      setShowSuggestion(true);
    }, 3000);

    const suggestionRotator = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % suggestions.length);
    }, 4000);

    return () => {
      clearTimeout(suggestionTimer);
      clearInterval(suggestionRotator);
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setCurrentStep('greeting');
      setTimeout(() => {
        setMessages([
          { 
            type: 'bot', 
            text: "Hi! I'm Jayden from BC Pressure Washing. Looking to book a service or have a question? I can help with both." 
          }
        ]);
      }, 300);
    }
  };

  const simulateTyping = (text: string, onComplete: () => void) => {
    let i = 0;
    const typing = setInterval(() => {
      if (i <= text.length) {
        setMessages(prev => {
          const newMessages = [...prev];
          // Update the last message's text with more characters
          if (newMessages.length > 0 && newMessages[newMessages.length - 1].isTyping) {
            newMessages[newMessages.length - 1].text = text.substring(0, i);
            if (i === text.length) {
              newMessages[newMessages.length - 1].isTyping = false;
              clearInterval(typing);
              onComplete();
            }
          }
          return newMessages;
        });
        i += Math.floor(Math.random() * 3) + 1; // Random typing speed
      } else {
        clearInterval(typing);
        onComplete();
      }
    }, 50);
  };

  // Process user messages for form data
  const processUserMessageForFormData = (text: string) => {
    const extractedData = extractInfoFromMessage(text);
    
    // Update form data store with extracted information
    Object.entries(extractedData).forEach(([key, value]) => {
      if (key === 'services' && Array.isArray(value)) {
        value.forEach(service => setServiceValue(service, true));
      } else if (key !== 'services') {
        setFormValue(key as any, value as any);
      }
    });
  };

  const handleBookingOption = () => {
    setCurrentStep('booking');
    const newMessages = [...messages, { type: 'user' as const, text: "I'd like to book a service" }];
    
    setMessages(newMessages);
    
    // Add a typing indicator
    setTimeout(() => {
      setMessages([...newMessages, { type: 'bot' as const, text: "", isTyping: true }]);
      
      const responseText = "Great! Our online booking form will guide you through the process, including house size, service type, and date. Click below to get started.";
      
      // Simulate typing effect
      simulateTyping(responseText, () => {
        // This gets called when typing is complete
      });
    }, 500);
  };

  const handleQAOption = () => {
    setCurrentStep('qa');
    const newMessages = [...messages, { type: 'user' as const, text: "I have a question" }];
    
    setMessages(newMessages);
    
    // Add a typing indicator
    setTimeout(() => {
      setMessages([...newMessages, { type: 'bot' as const, text: "", isTyping: true }]);
      
      const responseText = "I can answer questions about our services, pricing, availability, and more. What do you need help with?";
      
      // Simulate typing effect
      simulateTyping(responseText, () => {
        // This gets called when typing is complete
      });
    }, 500);
  };

  const handleHumanSupportOption = () => {
    setCurrentStep('human-support');
    const newMessages = [...messages, { type: 'user' as const, text: "I'd like to speak with a human" }];
    
    setMessages(newMessages);
    
    // Add a typing indicator
    setTimeout(() => {
      setMessages([...newMessages, { type: 'bot' as const, text: "", isTyping: true }]);
      
      const responseText = "I'm happy to connect you with a team member. How would you like to chat?";
      
      // Simulate typing effect
      simulateTyping(responseText, () => {
        // This gets called when typing is complete
      });
    }, 500);
  };

  const redirectToCalculator = () => {
    // We'll redirect to the calculator with form data already in store
    navigate('/calculator');
    setIsOpen(false);
  };

  const handleFollowUpOption = (option: string) => {
    const newMessages = [...messages, { type: 'user' as const, text: option }];
    setMessages(newMessages);
    
    setTimeout(() => {
      setMessages([...newMessages, { type: 'bot' as const, text: "", isTyping: true }]);
      
      let responseText = "";
      
      if (option === "Yes, Book Now") {
        setCurrentStep('booking');
        responseText = "Great! I've prepared the booking form with the information you've shared. Click below to complete your booking.";
      } else if (option === "Ask Another Question") {
        setCurrentStep('qa');
        responseText = "I'm happy to answer more questions. What else would you like to know?";
      } else if (option === "Talk to a Human") {
        setCurrentStep('human-support');
        responseText = "I'm happy to connect you with a team member. How would you like to chat?";
      }
      
      simulateTyping(responseText, () => {});
    }, 500);
  };

  const handleHumanSupportDetailOption = (option: string) => {
    const newMessages = [...messages, { type: 'user' as const, text: option }];
    setMessages(newMessages);
    
    setTimeout(() => {
      setMessages([...newMessages, { type: 'bot' as const, text: "", isTyping: true }]);
      
      let responseText = "";
      
      if (option === "Call Us") {
        responseText = "You can reach us directly at 778-808-7620. We're available Monday to Saturday, 8am to 6pm.";
      } else if (option === "Leave a Message") {
        responseText = "Please visit our contact page to send us a message. We'll get back to you within 24 hours: https://bcpressurewashing.ca/contact";
      } else if (option === "Go Back") {
        setCurrentStep('greeting');
        responseText = "No problem! What would you like to do?";
      }
      
      simulateTyping(responseText, () => {});
    }, 500);
