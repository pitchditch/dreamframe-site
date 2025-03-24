
import { createContext, useContext, useState, ReactNode } from 'react';
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
  // We're now only using English, removing Punjabi
  const [language, setLanguage] = useState<Language>('en');

  // Translation function - just returns English translations or the key if not found
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
