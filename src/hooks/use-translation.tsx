
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

// Enhanced browser language detection
const getBrowserLanguage = (): Language => {
  const savedLanguage = localStorage.getItem('preferred_language');
  if (savedLanguage && ['en', 'pa', 'hi', 'fr'].includes(savedLanguage)) {
    console.log('Using saved language:', savedLanguage);
    return savedLanguage as Language;
  }
  
  // Check if user is on mobile for auto-detection of Punjabi
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Get full browser language and locale
  const browserLang = navigator.language.toLowerCase();
  const shortLang = browserLang.split('-')[0];
  
  console.log('Browser language detected:', browserLang, 'Short:', shortLang, 'Is mobile:', isMobile);
  
  // Enhanced Punjabi detection
  if (shortLang === 'pa' || browserLang.includes('pa') || 
      (isMobile && (browserLang === 'en-in' || browserLang.includes('india')))) {
    console.log('Auto-detecting Punjabi');
    return 'pa';
  }
  
  // Hindi detection
  if (shortLang === 'hi' || browserLang.includes('hi')) {
    console.log('Auto-detecting Hindi');
    return 'hi';
  }
  
  // French detection (Canadian French)
  if (shortLang === 'fr' || browserLang === 'fr-ca') {
    console.log('Auto-detecting French');
    return 'fr';
  }
  
  console.log('Defaulting to English');
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
    console.log('Available translations for this language:', Object.keys(translations[language] || {}));
  }, [language]);

  // Translation function that depends on language state
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

  const contextValue = {
    language,
    setLanguage: useCallback((lang: Language) => {
      console.log('Setting language to:', lang);
      setLanguage(lang);
    }, []),
    t
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
