
import englishTranslations from './en';
import punjabiTranslations from './pa';
import hindiTranslations from './hi';
import frenchTranslations from './fr';

export type Language = 'en' | 'pa' | 'hi' | 'fr';
export type TranslationKey = string;
export type TranslationMap = Record<TranslationKey, string>;
export type TranslationsType = Record<Language, TranslationMap>;

const translations: TranslationsType = {
  en: englishTranslations,
  pa: punjabiTranslations,
  hi: hindiTranslations,
  fr: frenchTranslations
};

export default translations;
