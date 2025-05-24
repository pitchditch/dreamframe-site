
import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import translations, { Language, TranslationKey } from '../translations';

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

// Get browser language or stored preference
const getBrowserLanguage = (): Language => {
  const savedLanguage = localStorage.getItem('preferred_language');
  if (savedLanguage && ['en', 'pa', 'hi', 'fr'].includes(savedLanguage)) {
    return savedLanguage as Language;
  }
  
  // Check if user is on mobile for auto-detection of Punjabi
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Detect browser language
  const browserLang = navigator.language.split('-')[0];
  
  // If on mobile and browser language indicates Punjabi region or language
  if (isMobile && (browserLang === 'pa' || navigator.language === 'en-IN')) {
    return 'pa';
  }
  
  // Regular language detection for other cases
  if (browserLang === 'pa') return 'pa';
  if (browserLang === 'hi') return 'hi';
  if (browserLang === 'fr') return 'fr';
  
  return 'en';
};

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(getBrowserLanguage());

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem('preferred_language', language);
    document.documentElement.lang = language;
    
    // Add language class to body for CSS targeting
    document.body.classList.remove('lang-en', 'lang-pa', 'lang-hi', 'lang-fr');
    document.body.classList.add(`lang-${language}`);
    
    // Log the language change to help with debugging
    console.log(`Language changed to: ${language}`);
  }, [language]);

  // Translation function
  const t = useCallback((key: TranslationKey): string => {
    if (!translations[language]) {
      console.log(`No translations found for language: ${language}`);
      return key;
    }
    
    const translatedText = translations[language][key];
    if (!translatedText) {
      console.log(`No translation found for key: ${key} in language: ${language}`);
      return key;
    }
    
    return translatedText;
  }, [language]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
