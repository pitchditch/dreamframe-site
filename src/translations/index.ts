
import englishTranslations from './en';
import punjabiTranslations from './pa';
import hindiTranslations from './hi';

export type Language = 'en' | 'pa' | 'hi';
export type TranslationKey = string;
export type TranslationMap = Record<TranslationKey, string>;
export type TranslationsType = Record<Language, TranslationMap>;

const translations: TranslationsType = {
  en: englishTranslations,
  pa: punjabiTranslations,
  hi: hindiTranslations
};

export default translations;
