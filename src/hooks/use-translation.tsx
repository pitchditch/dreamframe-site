
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'pa';
type TranslationKey = string;
type TranslationMap = Record<TranslationKey, string>;
type TranslationsType = Record<Language, TranslationMap>;

// English and Punjabi translations
const translations: TranslationsType = {
  en: {
    // General
    "Contact Us": "Contact Us",
    "Have questions or ready to schedule a service? Get in touch with our team for exceptional pressure washing solutions.": "Have questions or ready to schedule a service? Get in touch with our team for exceptional pressure washing solutions.",
    "Get In Touch": "Get In Touch",
    "Send Us a Message": "Send Us a Message",
    "Location": "Location",
    "Langley, BC, Canada": "Langley, BC, Canada",
    "Serving the Fraser Valley and surrounding areas": "Serving the Fraser Valley and surrounding areas",
    "Phone": "Phone",
    "Monday-Friday: 8AM - 6PM": "Monday-Friday: 8AM - 6PM",
    "Saturday: 9AM - 5PM": "Saturday: 9AM - 5PM",
    "Email": "Email",
    "We typically respond within 24 hours": "We typically respond within 24 hours",
    "Service Areas": "Service Areas",
    "We proudly serve residential and commercial clients throughout:": "We proudly serve residential and commercial clients throughout:",
    "Langley": "Langley",
    "Surrey": "Surrey",
    "Abbotsford": "Abbotsford",
    "White Rock": "White Rock",
    "Maple Ridge": "Maple Ridge",
    "Burnaby": "Burnaby",
    "And surrounding communities": "And surrounding communities",
    
    // Form Fields
    "Your Name": "Your Name",
    "John Doe": "John Doe",
    "Email Address": "Email Address",
    "your.email@example.com": "your.email@example.com",
    "Phone Number": "Phone Number",
    "(123) 456-7890": "(123) 456-7890",
    "Your Message": "Your Message",
    "Tell us about your needs...": "Tell us about your needs...",
    "Services you're interested in:": "Services you're interested in:",
    "Window Cleaning": "Window Cleaning",
    "Gutter Cleaning": "Gutter Cleaning",
    "Roof Cleaning": "Roof Cleaning",
    "House Washing": "House Washing",
    "Commercial Services": "Commercial Services",
    "Sending...": "Sending...",
    "Send Message": "Send Message",
    "Message Sent!": "Message Sent!",
    "Thank you for reaching out. We'll get back to you shortly.": "Thank you for reaching out. We'll get back to you shortly.",
    
    // FAQ
    "Frequently Asked Questions": "Frequently Asked Questions",
    "Do you offer free quotes?": "Do you offer free quotes?",
    "Yes, we provide free, no-obligation quotes for all our services. Contact us to schedule an assessment.": "Yes, we provide free, no-obligation quotes for all our services. Contact us to schedule an assessment.",
    "What areas do you serve?": "What areas do you serve?",
    "We serve Langley, Surrey, Abbotsford, White Rock, Maple Ridge, Burnaby, and surrounding areas in BC.": "We serve Langley, Surrey, Abbotsford, White Rock, Maple Ridge, Burnaby, and surrounding areas in BC.",
    "How often should I have my gutters cleaned?": "How often should I have my gutters cleaned?",
    "We recommend cleaning gutters at least twice a year, typically in spring and fall, to prevent clogs and water damage.": "We recommend cleaning gutters at least twice a year, typically in spring and fall, to prevent clogs and water damage.",
    "Are your cleaning products eco-friendly?": "Are your cleaning products eco-friendly?",
    "Yes, we use environmentally-friendly cleaning solutions that effectively remove dirt and grime without harming plants or wildlife.": "Yes, we use environmentally-friendly cleaning solutions that effectively remove dirt and grime without harming plants or wildlife.",
    "How long does a typical service take?": "How long does a typical service take?",
    "Service times vary depending on the size of your property and the specific service. Most residential jobs are completed within a few hours.": "Service times vary depending on the size of your property and the specific service. Most residential jobs are completed within a few hours.",
    "Do you offer any guarantees?": "Do you offer any guarantees?",
    "Yes, we stand behind our work with a satisfaction guarantee. If you're not satisfied, we'll return to address any issues.": "Yes, we stand behind our work with a satisfaction guarantee. If you're not satisfied, we'll return to address any issues.",
    
    // Chat Assistant
    "BC Pressure Washing Assistant": "BC Pressure Washing Assistant",
    "Hi there! Ask me any questions about our pressure washing services.": "Hi there! Ask me any questions about our pressure washing services.",
    "BC Assistant": "BC Assistant",
    "Suggested questions:": "Suggested questions:",
    "Schedule a callback": "Schedule a callback",
    "Call us now: 778 808 7620": "Call us now: 778 808 7620",
    "Type your question...": "Type your question...",
    "Clear chat": "Clear chat",
    "I'd like to schedule a callback.": "I'd like to schedule a callback.",
    "Great! To schedule a callback, I'll need some information. What's your name?": "Great! To schedule a callback, I'll need some information. What's your name?",
    
    // Language Selector
    "English": "English",
    "Punjabi": "Punjabi",
    "Select Language": "Select Language",
  },
  pa: {
    // General
    "Contact Us": "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    "Have questions or ready to schedule a service? Get in touch with our team for exceptional pressure washing solutions.": "ਸਵਾਲ ਹਨ ਜਾਂ ਸੇਵਾ ਦਾ ਸਮਾਂ ਨਿਰਧਾਰਤ ਕਰਨ ਲਈ ਤਿਆਰ ਹੋ? ਵਧੀਆ ਪ੍ਰੈਸ਼ਰ ਵਾਸ਼ਿੰਗ ਸਮਾਧਾਨਾਂ ਲਈ ਸਾਡੀ ਟੀਮ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।",
    "Get In Touch": "ਸੰਪਰਕ ਵਿੱਚ ਰਹੋ",
    "Send Us a Message": "ਸਾਨੂੰ ਇੱਕ ਸੁਨੇਹਾ ਭੇਜੋ",
    "Location": "ਸਥਾਨ",
    "Langley, BC, Canada": "ਲੈਂਗਲੇ, ਬੀ.ਸੀ., ਕੈਨੇਡਾ",
    "Serving the Fraser Valley and surrounding areas": "ਫਰੇਜ਼ਰ ਵੈਲੀ ਅਤੇ ਆਸ-ਪਾਸ ਦੇ ਖੇਤਰਾਂ ਦੀ ਸੇਵਾ ਕਰ ਰਹੇ ਹਾਂ",
    "Phone": "ਫੋਨ",
    "Monday-Friday: 8AM - 6PM": "ਸੋਮਵਾਰ-ਸ਼ੁੱਕਰਵਾਰ: ਸਵੇਰੇ 8 - ਸ਼ਾਮ 6",
    "Saturday: 9AM - 5PM": "ਸ਼ਨੀਵਾਰ: ਸਵੇਰੇ 9 - ਸ਼ਾਮ 5",
    "Email": "ਈਮੇਲ",
    "We typically respond within 24 hours": "ਅਸੀਂ ਆਮ ਤੌਰ 'ਤੇ 24 ਘੰਟਿਆਂ ਦੇ ਅੰਦਰ ਜਵਾਬ ਦਿੰਦੇ ਹਾਂ",
    "Service Areas": "ਸੇਵਾ ਖੇਤਰ",
    "We proudly serve residential and commercial clients throughout:": "ਅਸੀਂ ਇਨ੍ਹਾਂ ਸਾਰੇ ਖੇਤਰਾਂ ਵਿੱਚ ਰਿਹਾਇਸ਼ੀ ਅਤੇ ਵਪਾਰਕ ਗਾਹਕਾਂ ਦੀ ਸੇਵਾ ਕਰਦੇ ਹਾਂ:",
    "Langley": "ਲੈਂਗਲੇ",
    "Surrey": "ਸਰੀ",
    "Abbotsford": "ਐਬਟਸਫੋਰਡ",
    "White Rock": "ਵ੍ਹਾਈਟ ਰੌਕ",
    "Maple Ridge": "ਮੇਪਲ ਰਿੱਜ",
    "Burnaby": "ਬਰਨਬੀ",
    "And surrounding communities": "ਅਤੇ ਆਸ-ਪਾਸ ਦੇ ਭਾਈਚਾਰੇ",
    
    // Form Fields
    "Your Name": "ਤੁਹਾਡਾ ਨਾਮ",
    "John Doe": "ਜੌਨ ਡੋ",
    "Email Address": "ਈਮੇਲ ਪਤਾ",
    "your.email@example.com": "ਤੁਹਾਡਾ.ਈਮੇਲ@example.com",
    "Phone Number": "ਫੋਨ ਨੰਬਰ",
    "(123) 456-7890": "(123) 456-7890",
    "Your Message": "ਤੁਹਾਡਾ ਸੁਨੇਹਾ",
    "Tell us about your needs...": "ਸਾਨੂੰ ਆਪਣੀਆਂ ਜ਼ਰੂਰਤਾਂ ਬਾਰੇ ਦੱਸੋ...",
    "Services you're interested in:": "ਸੇਵਾਵਾਂ ਜਿਨ੍ਹਾਂ ਵਿੱਚ ਤੁਸੀਂ ਦਿਲਚਸਪੀ ਰੱਖਦੇ ਹੋ:",
    "Window Cleaning": "ਵਿੰਡੋ ਕਲੀਨਿੰਗ",
    "Gutter Cleaning": "ਗਟਰ ਕਲੀਨਿੰਗ",
    "Roof Cleaning": "ਛੱਤ ਕਲੀਨਿੰਗ",
    "House Washing": "ਘਰ ਦੀ ਧੁਲਾਈ",
    "Commercial Services": "ਵਪਾਰਕ ਸੇਵਾਵਾਂ",
    "Sending...": "ਭੇਜ ਰਿਹਾ ਹੈ...",
    "Send Message": "ਸੁਨੇਹਾ ਭੇਜੋ",
    "Message Sent!": "ਸੁਨੇਹਾ ਭੇਜਿਆ ਗਿਆ!",
    "Thank you for reaching out. We'll get back to you shortly.": "ਸੰਪਰਕ ਕਰਨ ਲਈ ਧੰਨਵਾਦ। ਅਸੀਂ ਜਲਦੀ ਹੀ ਤੁਹਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰਾਂਗੇ।",
    
    // FAQ
    "Frequently Asked Questions": "ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ",
    "Do you offer free quotes?": "ਕੀ ਤੁਸੀਂ ਮੁਫਤ ਕੋਟੇਸ਼ਨ ਦਿੰਦੇ ਹੋ?",
    "Yes, we provide free, no-obligation quotes for all our services. Contact us to schedule an assessment.": "ਹਾਂ, ਅਸੀਂ ਆਪਣੀਆਂ ਸਾਰੀਆਂ ਸੇਵਾਵਾਂ ਲਈ ਮੁਫਤ, ਬਿਨਾਂ ਕਿਸੇ ਜ਼ਿੰਮੇਵਾਰੀ ਦੇ ਕੋਟੇਸ਼ਨ ਪ੍ਰਦਾਨ ਕਰਦੇ ਹਾਂ। ਮੁਲਾਂਕਣ ਦਾ ਸਮਾਂ ਨਿਰਧਾਰਤ ਕਰਨ ਲਈ ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।",
    "What areas do you serve?": "ਤੁਸੀਂ ਕਿਹੜੇ ਖੇਤਰਾਂ ਦੀ ਸੇਵਾ ਕਰਦੇ ਹੋ?",
    "We serve Langley, Surrey, Abbotsford, White Rock, Maple Ridge, Burnaby, and surrounding areas in BC.": "ਅਸੀਂ BC ਵਿੱਚ ਲੈਂਗਲੇ, ਸਰੀ, ਐਬਟਸਫੋਰਡ, ਵ੍ਹਾਈਟ ਰਾਕ, ਮੇਪਲ ਰਿੱਜ, ਬਰਨਬੀ, ਅਤੇ ਆਸ-ਪਾਸ ਦੇ ਖੇਤਰਾਂ ਦੀ ਸੇਵਾ ਕਰਦੇ ਹਾਂ।",
    "How often should I have my gutters cleaned?": "ਮੈਨੂੰ ਆਪਣੇ ਗਟਰਾਂ ਨੂੰ ਕਿੰਨੀ ਵਾਰ ਸਾਫ ਕਰਵਾਉਣਾ ਚਾਹੀਦਾ ਹੈ?",
    "We recommend cleaning gutters at least twice a year, typically in spring and fall, to prevent clogs and water damage.": "ਅਸੀਂ ਰੁਕਾਵਟਾਂ ਅਤੇ ਪਾਣੀ ਦੇ ਨੁਕਸਾਨ ਨੂੰ ਰੋਕਣ ਲਈ, ਗਟਰਾਂ ਨੂੰ ਸਾਲ ਵਿੱਚ ਘੱਟੋ-ਘੱਟ ਦੋ ਵਾਰ, ਆਮ ਤੌਰ 'ਤੇ ਬਸੰਤ ਅਤੇ ਪਤਝੜ ਵਿੱਚ, ਸਾਫ਼ ਕਰਨ ਦੀ ਸਿਫਾਰਸ਼ ਕਰਦੇ ਹਾਂ।",
    "Are your cleaning products eco-friendly?": "ਕੀ ਤੁਹਾਡੇ ਸਫਾਈ ਉਤਪਾਦ ਵਾਤਾਵਰਣ-ਅਨੁਕੂਲ ਹਨ?",
    "Yes, we use environmentally-friendly cleaning solutions that effectively remove dirt and grime without harming plants or wildlife.": "ਹਾਂ, ਅਸੀਂ ਵਾਤਾਵਰਣ-ਅਨੁਕੂਲ ਸਫਾਈ ਦੇ ਹੱਲ ਵਰਤਦੇ ਹਾਂ ਜੋ ਪੌਦਿਆਂ ਜਾਂ ਜੰਗਲੀ ਜੀਵਨ ਨੂੰ ਨੁਕਸਾਨ ਪਹੁੰਚਾਏ ਬਿਨਾਂ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਢੰਗ ਨਾਲ ਗੰਦਗੀ ਅਤੇ ਮੈਲ ਨੂੰ ਹਟਾਉਂਦੇ ਹਨ।",
    "How long does a typical service take?": "ਇੱਕ ਆਮ ਸੇਵਾ ਵਿੱਚ ਕਿੰਨਾ ਸਮਾਂ ਲੱਗਦਾ ਹੈ?",
    "Service times vary depending on the size of your property and the specific service. Most residential jobs are completed within a few hours.": "ਸੇਵਾ ਦਾ ਸਮਾਂ ਤੁਹਾਡੀ ਜਾਇਦਾਦ ਦੇ ਆਕਾਰ ਅਤੇ ਵਿਸ਼ੇਸ਼ ਸੇਵਾ ਦੇ ਆਧਾਰ 'ਤੇ ਵੱਖ-ਵੱਖ ਹੁੰਦਾ ਹੈ। ਜ਼ਿਆਦਾਤਰ ਰਿਹਾਇਸ਼ੀ ਕੰਮ ਕੁਝ ਘੰਟਿਆਂ ਦੇ ਅੰਦਰ ਪੂਰੇ ਹੋ ਜਾਂਦੇ ਹਨ।",
    "Do you offer any guarantees?": "ਕੀ ਤੁਸੀਂ ਕੋਈ ਗਾਰੰਟੀ ਦਿੰਦੇ ਹੋ?",
    "Yes, we stand behind our work with a satisfaction guarantee. If you're not satisfied, we'll return to address any issues.": "ਹਾਂ, ਅਸੀਂ ਸੰਤੁਸ਼ਟੀ ਦੀ ਗਾਰੰਟੀ ਨਾਲ ਆਪਣੇ ਕੰਮ ਦਾ ਸਮਰਥਨ ਕਰਦੇ ਹਾਂ। ਜੇ ਤੁਸੀਂ ਸੰਤੁਸ਼ਟ ਨਹੀਂ ਹੋ, ਤਾਂ ਅਸੀਂ ਕਿਸੇ ਵੀ ਸਮੱਸਿਆ ਨੂੰ ਹੱਲ ਕਰਨ ਲਈ ਵਾਪਸ ਆਵਾਂਗੇ।",
    
    // Chat Assistant
    "BC Pressure Washing Assistant": "ਬੀਸੀ ਪ੍ਰੈਸ਼ਰ ਵਾਸ਼ਿੰਗ ਅਸਿਸਟੈਂਟ",
    "Hi there! Ask me any questions about our pressure washing services.": "ਹੈਲੋ! ਸਾਡੀਆਂ ਪ੍ਰੈਸ਼ਰ ਵਾਸ਼ਿੰਗ ਸੇਵਾਵਾਂ ਬਾਰੇ ਮੈਨੂੰ ਕੋਈ ਵੀ ਸਵਾਲ ਪੁੱਛੋ।",
    "BC Assistant": "ਬੀਸੀ ਅਸਿਸਟੈਂਟ",
    "Suggested questions:": "ਸੁਝਾਏ ਗਏ ਸਵਾਲ:",
    "Schedule a callback": "ਕਾਲਬੈਕ ਦਾ ਸਮਾਂ ਨਿਰਧਾਰਤ ਕਰੋ",
    "Call us now: 778 808 7620": "ਹੁਣੇ ਕਾਲ ਕਰੋ: 778 808 7620",
    "Type your question...": "ਆਪਣਾ ਸਵਾਲ ਟਾਈਪ ਕਰੋ...",
    "Clear chat": "ਚੈਟ ਸਾਫ਼ ਕਰੋ",
    "I'd like to schedule a callback.": "ਮੈਂ ਕਾਲਬੈਕ ਦਾ ਸਮਾਂ ਨਿਰਧਾਰਤ ਕਰਨਾ ਚਾਹਾਂਗਾ/ਚਾਹਾਂਗੀ।",
    "Great! To schedule a callback, I'll need some information. What's your name?": "ਵਧੀਆ! ਕਾਲਬੈਕ ਦਾ ਸਮਾਂ ਨਿਰਧਾਰਤ ਕਰਨ ਲਈ, ਮੈਨੂੰ ਕੁਝ ਜਾਣਕਾਰੀ ਦੀ ਲੋੜ ਹੋਵੇਗੀ। ਤੁਹਾਡਾ ਨਾਮ ਕੀ ਹੈ?",
    
    // Language Selector
    "English": "ਅੰਗਰੇਜ਼ੀ",
    "Punjabi": "ਪੰਜਾਬੀ",
    "Select Language": "ਭਾਸ਼ਾ ਚੁਣੋ",
  }
};

type TranslationContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const defaultContext: TranslationContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
};

const TranslationContext = createContext<TranslationContextType>(defaultContext);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'pa') {
      setLanguage('pa');
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    // Return the translation for the key or the key itself if not found
    return translations[language][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
