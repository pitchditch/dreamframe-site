
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'pa' || savedLanguage === 'en') {
      setLanguage(savedLanguage as Language);
    } else {
      // Default to English if no language is set
      setLanguage('en');
      localStorage.setItem('language', 'en');
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: TranslationKey): string => {
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
